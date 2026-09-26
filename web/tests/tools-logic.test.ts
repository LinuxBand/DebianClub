import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  analyzeCommandRisk,
  buildMirrorSnippet,
  classNames,
  desktopRecommendation,
  hasRecordKey,
  highestRisk,
  installRecommendation,
  normalizeToolHash,
  parseToolHash,
  partitionPlan,
  toolHashIds,
  toolIdByHash,
  upgradeRecommendation,
} from '../components/tools/logic.ts';

describe('toolHashIds mapping', () => {
  it('maps every tool id to its URL fragment and back', () => {
    assert.deepEqual(toolIdByHash[toolHashIds.mirror], 'mirror');
    assert.equal(toolHashIds.safety, 'command-safety');
    assert.equal(toolHashIds.partition, 'partitions');
    assert.equal(toolHashIds.skills, 'ai-skills');
  });
});

describe('parseToolHash', () => {
  it('parses id and query parameters from a URL fragment', () => {
    const state = parseToolHash('#mirrors?release=bookworm&mirror=tuna');
    assert.equal(state.id, 'mirrors');
    assert.equal(state.params.get('release'), 'bookworm');
    assert.equal(state.params.get('mirror'), 'tuna');
  });

  it('tolerates a missing fragment marker and query', () => {
    assert.equal(parseToolHash('upgrade').id, 'upgrade');
    assert.equal(parseToolHash('#install').params.get('device'), null);
  });

  it('decodes encoded ids and falls back on malformed escapes', () => {
    assert.equal(normalizeToolHash('#%63ommand-safety'), 'command-safety');
    assert.equal(normalizeToolHash('#%zz-broken'), '%zz-broken');
  });
});

describe('buildMirrorSnippet', () => {
  it('emits deb822 stanzas for the archive and security suites', () => {
    const snippet = buildMirrorSnippet('trixie', 'ustc', 'firmware');
    assert.match(snippet, /URIs: https:\/\/mirrors\.ustc\.edu\.cn\/debian\nSuites: trixie trixie-updates/);
    assert.match(snippet, /URIs: https:\/\/mirrors\.ustc\.edu\.cn\/debian-security\nSuites: trixie-security/);
    assert.equal(snippet.match(/Components: main non-free-firmware/g)?.length, 2);
    assert.equal(snippet.match(/Signed-By: \/usr\/share\/keyrings\/debian-archive-keyring\.gpg/g)?.length, 2);
  });

  it('keeps the official security URL for mirrors without their own security archive', () => {
    const snippet = buildMirrorSnippet('bookworm', 'jaist', 'full');
    assert.match(snippet, /URIs: https:\/\/security\.debian\.org\/debian-security\nSuites: bookworm-security/);
    assert.match(snippet, /Components: main contrib non-free non-free-firmware/);
  });
});

describe('analyzeCommandRisk', () => {
  it('flags remote script pipes as critical', () => {
    const findings = analyzeCommandRisk('curl -fsSL https://example.com/install.sh | sh');
    assert.equal(findings[0]?.level, 'critical');
    assert.equal(findings[0]?.id, 'remote-script-pipe');
    assert.equal(findings[0]?.line, 1);
  });

  it('flags rm -rf on root and $HOME as critical plus recursive deletion warning', () => {
    const ids = analyzeCommandRisk('rm -rf /').map((f) => f.id);
    assert.ok(ids.includes('delete-root-or-home'));
    assert.ok(ids.includes('recursive-force-delete'));
  });

  it('flags destructive disk writes', () => {
    const ids = analyzeCommandRisk('dd if=debian.iso of=/dev/sda').map((f) => f.id);
    assert.ok(ids.includes('destructive-disk-write'));
  });

  it('flags SSH security downgrades and firewall flushes as warnings', () => {
    const findings = analyzeCommandRisk('PasswordAuthentication yes\niptables -F');
    const levels = findings.map((f) => f.level);
    assert.ok(levels.includes('warning'));
    const ids = findings.map((f) => f.id);
    assert.ok(ids.includes('ssh-security-downgrade'));
    assert.ok(ids.includes('firewall-flush'));
  });

  it('reports review-level findings for sudo and records line numbers', () => {
    const findings = analyzeCommandRisk('# comment only\n\napt update\nsudo reboot');
    const sudo = findings.find((f) => f.id === 'sudo-or-third-party-source');
    assert.equal(sudo?.line, 4);
    assert.equal(sudo?.command, 'sudo reboot');
  });

  it('returns nothing for safe or commented input', () => {
    assert.deepEqual(analyzeCommandRisk(''), []);
    assert.deepEqual(analyzeCommandRisk('# rm -rf /\nls -la'), []);
  });
});

describe('highestRisk', () => {
  it('returns null without findings and picks the highest severity', () => {
    assert.equal(highestRisk([]), null);
    const findings = analyzeCommandRisk('chmod 777 /tmp/share\ncurl -fsSL https://x.example | sh');
    assert.equal(highestRisk(findings), 'critical');
  });
});

describe('installRecommendation', () => {
  it('prefers VM/Live USB verification for low risk or VM devices', () => {
    assert.match(installRecommendation('vm', 'daily', 'direct', 'zh').title, /虚拟机|Live USB/);
    assert.match(installRecommendation('laptop', 'daily', 'low', 'en').title, /VM or Live USB/);
  });

  it('recommends minimal netinst for servers', () => {
    assert.match(installRecommendation('server', 'daily', 'balanced', 'zh').title, /最小服务器安装/);
    assert.match(installRecommendation('desktop', 'server', 'balanced', 'en').title, /minimal server/);
  });

  it('defers GPU drivers for local AI workloads on real hardware', () => {
    assert.match(installRecommendation('laptop', 'ai', 'balanced', 'zh').title, /GPU 驱动/);
  });

  it('falls back to a full stable install', () => {
    assert.match(installRecommendation('desktop', 'dev', 'direct', 'zh').title, /完整安装 Debian 13/);
  });
});

describe('desktopRecommendation', () => {
  it('recommends Xfce for old hardware or lightweight workflows', () => {
    assert.equal(desktopRecommendation('old', 'simple', 'zh').packages, 'sudo apt install task-xfce-desktop');
    assert.equal(desktopRecommendation('modern', 'light', 'en').title, 'Xfce');
  });

  it('recommends KDE for customization and GNOME otherwise', () => {
    assert.equal(desktopRecommendation('modern', 'custom', 'en').title, 'KDE Plasma');
    assert.equal(desktopRecommendation('modern', 'simple', 'zh').title, 'GNOME');
    assert.equal(desktopRecommendation('modest', 'creative', 'en').title, 'GNOME');
  });
});

describe('partitionPlan', () => {
  it('lists base partitions for a standard single-boot install', () => {
    const plan = partitionPlan('standard', 'single', 'none', 'zh');
    assert.equal(plan[0]?.[0], 'EFI');
    assert.equal(plan[1]?.[1], '可合并到 /');
    assert.equal(plan[2]?.[1], '50-80 GB');
    assert.equal(plan.length, 4);
  });

  it('reserves /boot for full-disk encryption and adds a data row for multi-disk', () => {
    const encrypted = partitionPlan('standard', 'single', 'full', 'en');
    assert.equal(encrypted[1]?.[1], '1 GB');

    const multi = partitionPlan('multi', 'single', 'none', 'zh');
    assert.equal(multi.length, 5);
    assert.match(multi[4]?.[0] ?? '', /数据盘/);
  });

  it('mentions existing EFI for dual boot', () => {
    const plan = partitionPlan('standard', 'dual', 'none', 'en');
    assert.match(plan[0]?.[1] ?? '', /existing EFI/);
  });
});

describe('upgradeRecommendation', () => {
  it('tells trixie users to stay put', () => {
    assert.match(upgradeRecommendation('trixie', 'keep', 'internal', 'zh').title, /保持 Debian 13/);
  });

  it('plans bookworm migration with public-facing urgency', () => {
    const internal = upgradeRecommendation('bookworm', 'keep', 'internal', 'en');
    assert.match(internal.title, /Stay on Debian 12 briefly/);
    const publik = upgradeRecommendation('bookworm', 'trixie', 'public', 'zh');
    assert.match(publik.schedule, /常规安全支持结束前完成升级/);
  });

  it('routes bullseye through bookworm in two steps', () => {
    assert.match(upgradeRecommendation('bullseye', 'trixie', 'internal', 'zh').title, /先升 Debian 12/);
  });

  it('prefers reinstall for buster and older', () => {
    assert.match(upgradeRecommendation('buster', 'trixie', 'public', 'en').title, /reinstalling or replacing/);
  });

  it('always includes read-only pre-upgrade checks', () => {
    const result = upgradeRecommendation('bookworm', 'trixie', 'internal', 'en');
    assert.ok(result.checks.includes('cat /etc/debian_version'));
    assert.ok(result.checks.includes('dpkg --audit'));
  });
});

describe('hasRecordKey', () => {
  it('narrows known keys and rejects unknown or null keys', () => {
    assert.ok(hasRecordKey(toolHashIds, 'mirror'));
    assert.equal(hasRecordKey(toolHashIds, 'nonexistent'), false);
    assert.equal(hasRecordKey(toolHashIds, null), false);
  });
});
