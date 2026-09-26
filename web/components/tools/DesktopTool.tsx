'use client';

import { useEffect, useState } from 'react';
import { desktopHardwareProfiles, desktopWorkflows } from './data';
import { desktopRecommendation, hasRecordKey, parseToolHash, toolHashIds } from './logic';
import { docsHref, toolText } from './text';
import { ButtonGroup, CodeBlock, ResultPanel, ShareLinkButton, copyText, useCopiedFeedback } from './ui';
import type { DesktopHardware, DesktopWorkflow, ToolLanguage } from './types';

export function DesktopTool({ lang }: { lang: ToolLanguage }) {
  const t = toolText[lang];
  const [hardware, setHardware] = useState<DesktopHardware>('modern');
  const [workflow, setWorkflow] = useState<DesktopWorkflow>('simple');
  const [shareCopied, showShareCopied] = useCopiedFeedback();
  const result = desktopRecommendation(hardware, workflow, lang);

  useEffect(() => {
    function syncDesktopStateFromHash() {
      const hashState = parseToolHash(window.location.hash);
      if (hashState.id !== toolHashIds.desktop) return;

      const nextHardware = hashState.params.get('hardware');
      const nextWorkflow = hashState.params.get('workflow');

      if (hasRecordKey(desktopHardwareProfiles, nextHardware)) setHardware(nextHardware);
      if (hasRecordKey(desktopWorkflows, nextWorkflow)) setWorkflow(nextWorkflow);
    }

    syncDesktopStateFromHash();
    window.addEventListener('hashchange', syncDesktopStateFromHash);
    return () => window.removeEventListener('hashchange', syncDesktopStateFromHash);
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = `${toolHashIds.desktop}?hardware=${hardware}&workflow=${workflow}`;

    await copyText(url.toString());
    showShareCopied();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.desktop.hardware}</h3>
          <ButtonGroup
            value={hardware}
            onChange={setHardware}
            options={[
              { value: 'old', label: lang === 'zh' ? '旧机器 / 4GB RAM' : 'Older / 4GB RAM' },
              { value: 'modest', label: lang === 'zh' ? '普通机器 / 8GB RAM' : 'Modest / 8GB RAM' },
              { value: 'modern', label: lang === 'zh' ? '现代机器 / 16GB+' : 'Modern / 16GB+' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.desktop.workflow}</h3>
          <ButtonGroup
            value={workflow}
            onChange={setWorkflow}
            options={[
              { value: 'simple', label: lang === 'zh' ? '默认简单' : 'Simple defaults' },
              { value: 'custom', label: lang === 'zh' ? '高度自定义' : 'Highly customizable' },
              { value: 'light', label: lang === 'zh' ? '轻量优先' : 'Lightweight first' },
              { value: 'creative', label: lang === 'zh' ? '触控板 / 创作' : 'Touchpad / creative' },
            ]}
          />
        </div>
      </section>

      <ResultPanel lang={lang} title={`${t.recommended}: ${result.title}`}>
        <p>{result.why}</p>
        <CodeBlock lang={lang} value={result.packages} />
        <ShareLinkButton copied={shareCopied} label={t.desktop.share} copiedLabel={t.desktop.shareCopied} onClick={copyShareLink} />
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].desktop}>
          {t.desktop.docs}
        </a>
      </ResultPanel>
    </div>
  );
}
