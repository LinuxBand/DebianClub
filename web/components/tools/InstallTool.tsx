'use client';

import { useEffect, useState } from 'react';
import { installDevices, installGoals, riskLevels } from './data';
import { hasRecordKey, installRecommendation, parseToolHash, toolHashIds } from './logic';
import { docsHref, toolText } from './text';
import { ButtonGroup, ResultPanel, ShareLinkButton, copyText, useCopiedFeedback } from './ui';
import type { InstallDevice, InstallGoal, RiskLevel, ToolLanguage } from './types';

export function InstallTool({ lang }: { lang: ToolLanguage }) {
  const t = toolText[lang];
  const [device, setDevice] = useState<InstallDevice>('laptop');
  const [goal, setGoal] = useState<InstallGoal>('daily');
  const [risk, setRisk] = useState<RiskLevel>('balanced');
  const [shareCopied, showShareCopied] = useCopiedFeedback();
  const result = installRecommendation(device, goal, risk, lang);

  useEffect(() => {
    function syncInstallStateFromHash() {
      const hashState = parseToolHash(window.location.hash);
      if (hashState.id !== toolHashIds.install) return;

      const nextDevice = hashState.params.get('device');
      const nextGoal = hashState.params.get('goal');
      const nextRisk = hashState.params.get('risk');

      if (hasRecordKey(installDevices, nextDevice)) setDevice(nextDevice);
      if (hasRecordKey(installGoals, nextGoal)) setGoal(nextGoal);
      if (hasRecordKey(riskLevels, nextRisk)) setRisk(nextRisk);
    }

    syncInstallStateFromHash();
    window.addEventListener('hashchange', syncInstallStateFromHash);
    return () => window.removeEventListener('hashchange', syncInstallStateFromHash);
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = `${toolHashIds.install}?device=${device}&goal=${goal}&risk=${risk}`;

    await copyText(url.toString());
    showShareCopied();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.install.device}</h3>
          <ButtonGroup
            value={device}
            onChange={setDevice}
            options={[
              { value: 'vm', label: lang === 'zh' ? '虚拟机' : 'Virtual machine' },
              { value: 'laptop', label: lang === 'zh' ? '笔记本' : 'Laptop' },
              { value: 'desktop', label: lang === 'zh' ? '台式机' : 'Desktop PC' },
              { value: 'server', label: lang === 'zh' ? '服务器' : 'Server' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.install.goal}</h3>
          <ButtonGroup
            value={goal}
            onChange={setGoal}
            options={[
              { value: 'learn', label: lang === 'zh' ? '学习体验' : 'Learning' },
              { value: 'daily', label: lang === 'zh' ? '日常桌面' : 'Daily desktop' },
              { value: 'server', label: lang === 'zh' ? '服务器' : 'Server' },
              { value: 'dev', label: lang === 'zh' ? '开发工作站' : 'Development' },
              { value: 'ai', label: lang === 'zh' ? '本地 AI' : 'Local AI' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.install.risk}</h3>
          <ButtonGroup
            value={risk}
            onChange={setRisk}
            options={[
              { value: 'low', label: lang === 'zh' ? '最低风险' : 'Lowest risk' },
              { value: 'balanced', label: lang === 'zh' ? '平衡' : 'Balanced' },
              { value: 'direct', label: lang === 'zh' ? '直接安装' : 'Direct install' },
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
          <div className="mb-1 font-medium text-fd-foreground">{t.next}</div>
          <ol className="m-0 list-decimal space-y-1 pl-5">
            {result.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <ShareLinkButton copied={shareCopied} label={t.install.share} copiedLabel={t.install.shareCopied} onClick={copyShareLink} />
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].install}>
          {t.install.docs}
        </a>
      </ResultPanel>
    </div>
  );
}
