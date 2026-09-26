'use client';

import { useEffect, useState } from 'react';
import { symptomData } from './data';
import { hasRecordKey, parseToolHash, toolHashIds } from './logic';
import { docsHref, toolText } from './text';
import { ButtonGroup, CodeBlock, ResultPanel, ShareLinkButton, copyText, useCopiedFeedback } from './ui';
import type { SymptomId, ToolLanguage } from './types';

export function TroubleshootTool({ lang }: { lang: ToolLanguage }) {
  const t = toolText[lang];
  const [symptom, setSymptom] = useState<SymptomId>('network');
  const [shareCopied, showShareCopied] = useCopiedFeedback();
  const data = symptomData[symptom];

  useEffect(() => {
    function syncTroubleshootStateFromHash() {
      const hashState = parseToolHash(window.location.hash);
      if (hashState.id !== toolHashIds.troubleshoot) return;

      const nextSymptom = hashState.params.get('symptom');
      if (hasRecordKey(symptomData, nextSymptom)) setSymptom(nextSymptom);
    }

    syncTroubleshootStateFromHash();
    window.addEventListener('hashchange', syncTroubleshootStateFromHash);
    return () => window.removeEventListener('hashchange', syncTroubleshootStateFromHash);
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = `${toolHashIds.troubleshoot}?symptom=${symptom}`;

    await copyText(url.toString());
    showShareCopied();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
      <section>
        <h3 className="mb-2 text-sm font-medium">{t.troubleshoot.symptom}</h3>
        <ButtonGroup
          value={symptom}
          onChange={setSymptom}
          options={(Object.keys(symptomData) as SymptomId[]).map((id) => ({ value: id, label: symptomData[id].title[lang] }))}
        />
      </section>

      <ResultPanel lang={lang} title={data.title[lang]}>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.commands}</div>
          <CodeBlock lang={lang} value={data.commands.join('\n')} />
        </div>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.next}</div>
          <div className="flex flex-wrap gap-2">
            {data.links[lang].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md border border-fd-border px-2.5 py-1.5 text-sm text-fd-primary no-underline hover:bg-fd-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <ShareLinkButton copied={shareCopied} label={t.troubleshoot.share} copiedLabel={t.troubleshoot.shareCopied} onClick={copyShareLink} />
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].troubleshoot}>
          {t.troubleshoot.docs}
        </a>
      </ResultPanel>
    </div>
  );
}
