import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const maxSearchFileBytes = 25 * 1024 * 1024;
const requiredLocales = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];
const localizedEntryPages = ['tools', 'scenarios', 'hardware', 'versions', 'release-readiness', 'deployment'];
const localizedEntryFiles = localizedEntryPages.flatMap((page) =>
  requiredLocales.map((locale) => (locale === 'zh' ? `out/${page}.html` : `out/${locale}/${page}.html`)),
);
const requiredFiles = [
  '_migration/smoke-check.mjs',
  'out/index.html',
  'out/en.html',
  'out/ai/skills.html',
  'out/en/ai/skills.html',
  ...localizedEntryFiles,
  'out/scenarios/nas-file-sharing.html',
  'out/en/scenarios/nas-file-sharing.html',
  'out/scenarios/local-ai-inference.html',
  'out/en/scenarios/local-ai-inference.html',
  'out/scenarios/ops-jump-box.html',
  'out/en/scenarios/ops-jump-box.html',
  'out/_headers',
  'out/skills.json',
  'out/sitemap.xml',
  'out/robots.txt',
];

const deploymentTextChecks = [
  {
    path: 'DEPLOY.md',
    checks: [
      ['corepack prepare pnpm@9.15.9 --activate', 'Cloudflare build pins pnpm version'],
      ['pnpm install --frozen-lockfile', 'Cloudflare install command is locked'],
      ['Build output directory** | `out`', 'Cloudflare output directory is documented'],
      ['corepack pnpm release:check', 'release gate is documented'],
      ['corepack pnpm smoke:check', 'smoke gate is documented'],
      ['--project-name debianclub', 'CLI deploy project name matches wrangler.toml'],
    ],
  },
  {
    path: 'package.json',
    checks: [
      ['"release:check": "node _migration/release-check.mjs"', 'release check script exists'],
      ['"smoke:check": "node _migration/smoke-check.mjs"', 'smoke check script exists'],
    ],
  },
  {
    path: '_migration/smoke-check.mjs',
    checks: [
      ["'/tools#command-safety'", 'smoke covers Chinese command safety tool deep link'],
      ["'/en/tools#command-safety'", 'smoke covers English command safety tool deep link'],
      ["'/tools#command-safety?command=sudo%20apt%20update'", 'smoke covers Chinese prefilled command safety link'],
      ["'/en/tools#command-safety?command=sudo%20apt%20update'", 'smoke covers English prefilled command safety link'],
      ["'/tools#ai-skills'", 'smoke covers Chinese AI Skills tool deep link'],
      ["'/en/tools#ai-skills'", 'smoke covers English AI Skills tool deep link'],
      ["'/tools#ai-skills?target=agents&replace=true'", 'smoke covers Chinese AI Skills config deep link'],
      ["'/en/tools#ai-skills?target=local&replace=false'", 'smoke covers English AI Skills config deep link'],
      ["'/tools#mirrors?release=bookworm&mirror=official&components=full'", 'smoke covers Chinese mirror config deep link'],
      ["'/en/tools#mirrors?release=bookworm&mirror=debian-de&components=firmware'", 'smoke covers English mirror config deep link'],
      ["'/tools#install?device=server&goal=server&risk=low'", 'smoke covers Chinese install config deep link'],
      ["'/en/tools#install?device=laptop&goal=ai&risk=balanced'", 'smoke covers English install config deep link'],
      ["'/tools#desktop?hardware=old&workflow=light'", 'smoke covers Chinese desktop config deep link'],
      ["'/en/tools#desktop?hardware=modern&workflow=creative'", 'smoke covers English desktop config deep link'],
      ["'/tools#partitions?disk=multi&boot=dual&encryption=full'", 'smoke covers Chinese partition config deep link'],
      ["'/en/tools#partitions?disk=standard&boot=single&encryption=home'", 'smoke covers English partition config deep link'],
      ["'/tools#troubleshoot?symptom=display'", 'smoke covers Chinese troubleshooting config deep link'],
      ["'/en/tools#troubleshoot?symptom=performance'", 'smoke covers English troubleshooting config deep link'],
      ["requiredIds: ['/tools', '/ai/skills']", 'smoke verifies Chinese search shard contains key pages'],
      ["requiredTerms: ['Debian Interactive Tools', 'DebianClub AI Skills']", 'smoke verifies English search shard contains key terms'],
    ],
  },
  {
    path: 'components/InteractiveTools.tsx',
    checks: [
      ["mirror: 'mirrors'", 'mirror tool hash is mapped'],
      ["install: 'install'", 'install tool hash is mapped'],
      ["desktop: 'desktop'", 'desktop tool hash is mapped'],
      ["partition: 'partitions'", 'partition tool hash is mapped'],
      ["troubleshoot: 'troubleshoot'", 'troubleshooting tool hash is mapped'],
      ["safety: 'command-safety'", 'command safety tool hash is mapped'],
      ["skills: 'ai-skills'", 'AI Skills tool hash is mapped'],
      ['function normalizeToolHash', 'tool hash parsing is centralized'],
      ['function parseToolHash', 'tool hash parameters are parsed from the URL fragment'],
      ['function useCopiedFeedback', 'copy buttons share one copied-state feedback helper'],
      ['window.clearTimeout(timeoutRef.current)', 'copied-state feedback clears stale timers'],
      ["hashState.params.get('release')", 'mirror tool can preload release from the URL fragment'],
      ["hashState.params.get('mirror')", 'mirror tool can preload mirror from the URL fragment'],
      ["hashState.params.get('components')", 'mirror tool can preload components from the URL fragment'],
      ["window.addEventListener('hashchange', syncMirrorStateFromHash)", 'mirror tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.mirror}?release=${release}&mirror=${mirror}&components=${components}`', 'mirror tool share links keep config in the URL fragment'],
      ["hashState.params.get('device')", 'install tool can preload device from the URL fragment'],
      ["hashState.params.get('goal')", 'install tool can preload goal from the URL fragment'],
      ["hashState.params.get('risk')", 'install tool can preload risk from the URL fragment'],
      ["window.addEventListener('hashchange', syncInstallStateFromHash)", 'install tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.install}?device=${device}&goal=${goal}&risk=${risk}`', 'install tool share links keep config in the URL fragment'],
      ["hashState.params.get('hardware')", 'desktop tool can preload hardware from the URL fragment'],
      ["hashState.params.get('workflow')", 'desktop tool can preload workflow from the URL fragment'],
      ["window.addEventListener('hashchange', syncDesktopStateFromHash)", 'desktop tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.desktop}?hardware=${hardware}&workflow=${workflow}`', 'desktop tool share links keep config in the URL fragment'],
      ["hashState.params.get('disk')", 'partition tool can preload disk from the URL fragment'],
      ["hashState.params.get('boot')", 'partition tool can preload boot mode from the URL fragment'],
      ["hashState.params.get('encryption')", 'partition tool can preload encryption from the URL fragment'],
      ["window.addEventListener('hashchange', syncPartitionStateFromHash)", 'partition tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.partition}?disk=${disk}&boot=${boot}&encryption=${encryption}`', 'partition tool share links keep config in the URL fragment'],
      ["hashState.params.get('symptom')", 'troubleshooting tool can preload symptom from the URL fragment'],
      ["window.addEventListener('hashchange', syncTroubleshootStateFromHash)", 'troubleshooting tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.troubleshoot}?symptom=${symptom}`', 'troubleshooting tool share links keep config in the URL fragment'],
      ["hashState.params.get('target')", 'AI Skills tool can preload target from the URL fragment'],
      ["hashState.params.get('replace')", 'AI Skills tool can preload replace flag from the URL fragment'],
      ["window.addEventListener('hashchange', syncSkillsStateFromHash)", 'AI Skills tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.skills}?target=${target}&replace=${replace ? \'true\' : \'false\'}`', 'AI Skills tool share links keep config in the URL fragment'],
      ['const maxSharedCommandLength = 4000', 'shared command links have a length cap'],
      ["hashState.params.get('command')", 'command safety can preload a shared command from the URL fragment'],
      ["window.addEventListener('hashchange', syncSharedCommandFromHash)", 'command safety prefill syncs on hash changes'],
      ['url.searchParams.delete(\'command\')', 'command safety share links do not keep command query parameters'],
      ['decodeURIComponent(value)', 'encoded tool hashes are decoded'],
      ['window.addEventListener(\'hashchange\', syncFromHash)', 'tool tabs sync on hash changes'],
      ['window.history.replaceState(null, \'\', nextUrl)', 'tool tab clicks update shareable hash'],
    ],
  },
  {
    path: 'content/docs/tools/index.mdx',
    checks: [
      ["/tools#command-safety", 'Chinese tools page documents command safety deep link'],
      ['command=', 'Chinese tools page documents command prefill links'],
      ['#mirrors?release=', 'Chinese tools page documents mirror config links'],
      ['#install?device=', 'Chinese tools page documents install config links'],
      ['#desktop?hardware=', 'Chinese tools page documents desktop config links'],
      ['#partitions?disk=', 'Chinese tools page documents partition config links'],
      ['#troubleshoot?symptom=', 'Chinese tools page documents troubleshooting config links'],
      ['#ai-skills?target=', 'Chinese tools page documents AI Skills config links'],
    ],
  },
  {
    path: 'content/docs/tools/index.en.mdx',
    checks: [
      ["/en/tools#command-safety", 'English tools page documents command safety deep link'],
      ['command=', 'English tools page documents command prefill links'],
      ['#mirrors?release=', 'English tools page documents mirror config links'],
      ['#install?device=', 'English tools page documents install config links'],
      ['#desktop?hardware=', 'English tools page documents desktop config links'],
      ['#partitions?disk=', 'English tools page documents partition config links'],
      ['#troubleshoot?symptom=', 'English tools page documents troubleshooting config links'],
      ['#ai-skills?target=', 'English tools page documents AI Skills config links'],
    ],
  },
  {
    path: join('..', 'wrangler.toml'),
    checks: [
      ['name = "debianclub"', 'Cloudflare Pages project name is debianclub'],
      ['pages_build_output_dir = "web/out"', 'Cloudflare Pages output directory is web/out'],
    ],
  },
  {
    path: 'public/_headers',
    checks: [
      ['/*', 'global headers rule exists', 'line'],
      ['X-Content-Type-Options: nosniff', 'nosniff header exists'],
      ['Referrer-Policy: strict-origin-when-cross-origin', 'referrer policy exists'],
      ['X-Frame-Options: SAMEORIGIN', 'frame options header exists'],
      ['Permissions-Policy: camera=(), microphone=(), geolocation=()', 'permissions policy exists'],
      ['/_next/static/*', 'Next static cache rule exists'],
      ['/api/search/*', 'search index headers rule exists'],
      ['Content-Type: application/json; charset=utf-8', 'search index JSON content type exists'],
    ],
  },
  {
    path: 'out/_headers',
    checks: [
      ['/*', 'exported global headers rule exists', 'line'],
      ['X-Content-Type-Options: nosniff', 'exported nosniff header exists'],
      ['Referrer-Policy: strict-origin-when-cross-origin', 'exported referrer policy exists'],
      ['/_next/static/*', 'exported Next static cache rule exists'],
      ['/api/search/*', 'exported search index headers rule exists'],
    ],
  },
  {
    path: join('..', '.github', 'workflows', 'web-release-check.yml'),
    checks: [
      ['name: Web Release Check', 'web release workflow exists'],
      ['permissions:', 'workflow declares permissions'],
      ['contents: read', 'workflow uses read-only contents permission'],
      ['corepack prepare pnpm@9.15.9 --activate', 'workflow pins pnpm version'],
      ['corepack pnpm --dir web types:check', 'workflow runs type check'],
      ['corepack pnpm --dir web build', 'workflow runs static build'],
      ['corepack pnpm --dir web smoke:check', 'workflow runs smoke check'],
      ['corepack pnpm --dir web release:check', 'workflow runs release gate'],
    ],
  },
];

const failures = [];

function hasTextCheck(content, needle, mode) {
  if (mode === 'line') {
    return content.split(/\r?\n/).some((line) => line.trim() === needle);
  }

  return content.includes(needle);
}

function fail(message) {
  failures.push(message);
  console.error(`[release-check] FAIL ${message}`);
}

function pass(message) {
  console.log(`[release-check] OK   ${message}`);
}

for (const file of requiredFiles) {
  if (existsSync(file)) {
    pass(`found ${file}`);
  } else {
    fail(`missing ${file}`);
  }
}

for (const fileCheck of deploymentTextChecks) {
  if (!existsSync(fileCheck.path) || !statSync(fileCheck.path).isFile()) {
    fail(`missing ${fileCheck.path}`);
    continue;
  }

  const content = readFileSync(fileCheck.path, 'utf8');
  for (const [needle, label, mode] of fileCheck.checks) {
    if (hasTextCheck(content, needle, mode)) {
      pass(`${fileCheck.path}: ${label}`);
    } else {
      fail(`${fileCheck.path}: missing ${label}`);
    }
  }
}

const searchDir = join('out', 'api', 'search');

if (!existsSync(searchDir) || !statSync(searchDir).isDirectory()) {
  fail(`missing split search index directory ${searchDir}`);
} else {
  const entries = new Set(readdirSync(searchDir));

  for (const locale of requiredLocales) {
    const path = join(searchDir, locale);
    if (!existsSync(path) || !statSync(path).isFile()) {
      fail(`missing search index ${path}`);
      continue;
    }

    const size = statSync(path).size;
    if (size > maxSearchFileBytes) {
      fail(`${path} is ${(size / 1048576).toFixed(2)} MiB, above 25 MiB`);
    } else {
      pass(`${path} is ${(size / 1048576).toFixed(2)} MiB`);
    }
  }

  for (const entry of entries) {
    if (!requiredLocales.includes(entry)) {
      fail(`unexpected search index file ${join(searchDir, entry)}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`[release-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[release-check] all release checks passed');
