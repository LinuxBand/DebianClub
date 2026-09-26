'use client';

import { useEffect, useState } from 'react';
import registry from '../../../skills/registry.json';
import { targetPaths } from './data';
import { hasRecordKey, parseToolHash, toolHashIds } from './logic';
import { docsHref, toolText } from './text';
import { ButtonGroup, CodeBlock, ResultPanel, ShareLinkButton, copyText, useCopiedFeedback } from './ui';
import type { SkillTarget, ToolLanguage } from './types';

const skill = registry.skills[0];

export function SkillsTool({ lang }: { lang: ToolLanguage }) {
  const t = toolText[lang];
  const [target, setTarget] = useState<SkillTarget>('codex');
  const [replace, setReplace] = useState(false);
  const [shareCopied, showShareCopied] = useCopiedFeedback();
  const targetPath = targetPaths[target].target;
  const installCommand = `bash ${skill.install.local_script.replace(
    ' debian-linux-reliability',
    `${replace ? ' --replace' : ''} --target ${targetPath} debian-linux-reliability`,
  )}`;
  const validateCommand = `bash ${skill.validation.script}`;

  useEffect(() => {
    function syncSkillsStateFromHash() {
      const hashState = parseToolHash(window.location.hash);
      if (hashState.id !== toolHashIds.skills) return;

      const nextTarget = hashState.params.get('target');
      const nextReplace = hashState.params.get('replace');

      if (hasRecordKey(targetPaths, nextTarget)) setTarget(nextTarget);
      if (nextReplace === 'true') setReplace(true);
      if (nextReplace === 'false') setReplace(false);
    }

    syncSkillsStateFromHash();
    window.addEventListener('hashchange', syncSkillsStateFromHash);
    return () => window.removeEventListener('hashchange', syncSkillsStateFromHash);
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = `${toolHashIds.skills}?target=${target}&replace=${replace ? 'true' : 'false'}`;

    await copyText(url.toString());
    showShareCopied();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.skills.target}</h3>
          <ButtonGroup
            value={target}
            onChange={setTarget}
            options={(Object.keys(targetPaths) as SkillTarget[]).map((id) => ({
              value: id,
              label: targetPaths[id].label[lang],
              description: targetPaths[id].target,
            }))}
          />
        </div>
        <label className="flex items-center gap-3 rounded-md border border-fd-border bg-fd-background p-3 text-sm">
          <input
            type="checkbox"
            checked={replace}
            onChange={(event) => setReplace(event.currentTarget.checked)}
            className="size-4"
          />
          <span>{t.skills.replace}</span>
        </label>
      </section>

      <ResultPanel lang={lang} title={`${skill.display_name} ${skill.version}`}>
        <p>{t.skills.targetNote}</p>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.skills.install}</div>
          <CodeBlock lang={lang} value={installCommand} />
        </div>
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.skills.validate}</div>
          <CodeBlock lang={lang} value={validateCommand} />
        </div>
        <ShareLinkButton copied={shareCopied} label={t.skills.share} copiedLabel={t.skills.shareCopied} onClick={copyShareLink} />
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].skills}>
          {t.skills.docs}
        </a>
      </ResultPanel>
    </div>
  );
}
