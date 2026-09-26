'use client';

import { useEffect, useState } from 'react';
import { upgradeCurrentReleases, upgradeExposures, upgradeTargets } from './data';
import { hasRecordKey, parseToolHash, toolHashIds, upgradeRecommendation } from './logic';
import { docsHref, toolText } from './text';
import { ButtonGroup, CodeBlock, ResultPanel, ShareLinkButton, copyText, useCopiedFeedback } from './ui';
import type { ToolLanguage, UpgradeCurrent, UpgradeExposure, UpgradeTarget } from './types';

export function UpgradeTool({ lang }: { lang: ToolLanguage }) {
  const t = toolText[lang];
  const [current, setCurrent] = useState<UpgradeCurrent>('bookworm');
  const [target, setTarget] = useState<UpgradeTarget>('trixie');
  const [exposure, setExposure] = useState<UpgradeExposure>('internal');
  const [shareCopied, showShareCopied] = useCopiedFeedback();
  const result = upgradeRecommendation(current, target, exposure, lang);

  useEffect(() => {
    function syncUpgradeStateFromHash() {
      const hashState = parseToolHash(window.location.hash);
      if (hashState.id !== toolHashIds.upgrade) return;

      const nextCurrent = hashState.params.get('current');
      const nextTarget = hashState.params.get('target');
      const nextExposure = hashState.params.get('exposure');

      if (hasRecordKey(upgradeCurrentReleases, nextCurrent)) setCurrent(nextCurrent);
      if (hasRecordKey(upgradeTargets, nextTarget)) setTarget(nextTarget);
      if (hasRecordKey(upgradeExposures, nextExposure)) setExposure(nextExposure);
    }

    syncUpgradeStateFromHash();
    window.addEventListener('hashchange', syncUpgradeStateFromHash);
    return () => window.removeEventListener('hashchange', syncUpgradeStateFromHash);
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = `${toolHashIds.upgrade}?current=${current}&target=${target}&exposure=${exposure}`;

    await copyText(url.toString());
    showShareCopied();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.upgrade.current}</h3>
          <ButtonGroup
            value={current}
            onChange={setCurrent}
            options={[
              { value: 'trixie', label: 'Debian 13 Trixie' },
              { value: 'bookworm', label: 'Debian 12 Bookworm' },
              { value: 'bullseye', label: 'Debian 11 Bullseye' },
              { value: 'buster', label: lang === 'zh' ? 'Debian 10 或更早' : 'Debian 10 or older' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.upgrade.target}</h3>
          <ButtonGroup
            value={target}
            onChange={setTarget}
            options={[
              { value: 'trixie', label: 'Debian 13 Trixie' },
              { value: 'bookworm', label: 'Debian 12 Bookworm' },
              { value: 'keep', label: lang === 'zh' ? '暂时保持当前版本' : 'Stay for now' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.upgrade.exposure}</h3>
          <ButtonGroup
            value={exposure}
            onChange={setExposure}
            options={[
              { value: 'offline', label: lang === 'zh' ? '离线 / 实验机' : 'Offline / lab' },
              { value: 'internal', label: lang === 'zh' ? '内网服务 / 桌面' : 'Internal / desktop' },
              { value: 'public', label: lang === 'zh' ? '公网服务' : 'Public service' },
            ]}
          />
        </div>
      </section>

      <ResultPanel lang={lang} title={result.title}>
        <div>
          <div className="mb-1 font-medium text-fd-foreground">{t.why}</div>
          <p>{result.why}</p>
        </div>
        <div>
          <div className="mb-1 font-medium text-fd-foreground">{t.upgrade.schedule}</div>
          <p>{result.schedule}</p>
        </div>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.upgrade.checks}</div>
          <CodeBlock lang={lang} value={result.checks.join('\n')} />
        </div>
        <ShareLinkButton copied={shareCopied} label={t.upgrade.share} copiedLabel={t.upgrade.shareCopied} onClick={copyShareLink} />
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].upgrade}>
          {t.upgrade.docs}
        </a>
      </ResultPanel>
    </div>
  );
}
