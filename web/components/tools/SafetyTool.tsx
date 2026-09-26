'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clipboard } from 'lucide-react';
import { analyzeCommandRisk, classNames, highestRisk, parseToolHash, toolHashIds } from './logic';
import { docsHref, toolText } from './text';
import { ResultPanel, ShareLinkButton, copyText, useCopiedFeedback } from './ui';
import type { CommandRiskLevel, ToolLanguage } from './types';

const riskPanelClasses: Record<CommandRiskLevel, string> = {
  critical: 'border-red-500/40 bg-red-500/10 text-red-950 dark:text-red-100',
  warning: 'border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100',
  review: 'border-blue-500/40 bg-blue-500/10 text-blue-950 dark:text-blue-100',
};

const riskBadgeClasses: Record<CommandRiskLevel, string> = {
  critical: 'border-red-500/40 bg-red-500/15 text-red-700 dark:text-red-200',
  warning: 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-200',
  review: 'border-blue-500/40 bg-blue-500/15 text-blue-700 dark:text-blue-200',
};

const maxSharedCommandLength = 4000;

const sampleCommands = 'curl -fsSL https://example.com/install.sh | sh\nsudo rm -rf /tmp/example\nsudo apt update';

export function SafetyTool({ lang }: { lang: ToolLanguage }) {
  const t = toolText[lang];
  const [value, setValue] = useState('');
  const [shareCopied, showShareCopied] = useCopiedFeedback();
  const findings = useMemo(() => analyzeCommandRisk(value), [value]);
  const topRisk = highestRisk(findings);
  const summary = !topRisk
    ? t.safety.summarySafe
    : topRisk === 'critical'
      ? t.safety.summaryCritical
      : topRisk === 'warning'
        ? t.safety.summaryWarning
        : t.safety.summaryReview;

  useEffect(() => {
    function syncSharedCommandFromHash() {
      const hashState = parseToolHash(window.location.hash);
      if (hashState.id !== toolHashIds.safety) return;

      const hashCommand = hashState.params.get('command');
      if (hashCommand !== null) setValue(hashCommand.slice(0, maxSharedCommandLength));
    }

    syncSharedCommandFromHash();
    window.addEventListener('hashchange', syncSharedCommandFromHash);
    return () => window.removeEventListener('hashchange', syncSharedCommandFromHash);
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    const sharedCommand = value.slice(0, maxSharedCommandLength);
    url.searchParams.delete('command');

    if (sharedCommand.trim()) {
      url.hash = `${toolHashIds.safety}?command=${encodeURIComponent(sharedCommand)}`;
    } else {
      url.hash = toolHashIds.safety;
    }

    await copyText(url.toString());
    showShareCopied();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
      <section className="space-y-3">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.safety.input}</h3>
          <textarea
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder={t.safety.placeholder}
            spellCheck={false}
            className="min-h-72 w-full resize-y rounded-md border border-fd-border bg-fd-background p-3 font-mono text-sm leading-6 text-fd-foreground outline-none transition-colors placeholder:text-fd-muted-foreground focus:border-fd-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setValue(sampleCommands)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-fd-border bg-fd-background px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <Clipboard className="size-4" />
            {lang === 'zh' ? '填入示例' : 'Use sample'}
          </button>
          <ShareLinkButton copied={shareCopied} label={t.safety.share} copiedLabel={t.safety.shareCopied} onClick={copyShareLink} />
        </div>
      </section>

      <ResultPanel lang={lang} title={summary}>
        {findings.length === 0 ? (
          <p>{t.safety.noFindings}</p>
        ) : (
          <div className="space-y-3">
            {findings.map((finding) => (
              <article
                key={`${finding.id}-${finding.line}-${finding.command}`}
                className={classNames('rounded-md border p-3', riskPanelClasses[finding.level])}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={classNames('rounded-md border px-2 py-0.5 text-xs font-semibold', riskBadgeClasses[finding.level])}>
                    {t.safety[finding.level]}
                  </span>
                  <span className="text-xs opacity-80">{lang === 'zh' ? `第 ${finding.line} 行` : `Line ${finding.line}`}</span>
                </div>
                <h4 className="m-0 text-sm font-semibold">{finding.title[lang]}</h4>
                <p className="mt-1 text-sm opacity-85">{finding.detail[lang]}</p>
                <pre className="mt-2 overflow-auto rounded-md border border-current/15 bg-fd-background/80 p-2 text-xs leading-5 text-fd-foreground">
                  <code>{finding.command}</code>
                </pre>
                <div className="mt-2 text-sm">
                  <span className="font-medium">{t.safety.safer}: </span>
                  <span>{finding.safer[lang]}</span>
                </div>
              </article>
            ))}
          </div>
        )}
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].safety}>
          {t.safety.docs}
        </a>
      </ResultPanel>
    </div>
  );
}
