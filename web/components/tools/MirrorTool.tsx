'use client';

import { useEffect, useMemo, useState } from 'react';
import { componentSets, mirrors, releaseLabels } from './data';
import { buildMirrorSnippet, hasRecordKey, parseToolHash, toolHashIds } from './logic';
import { docsHref, toolText } from './text';
import { ButtonGroup, CodeBlock, ResultPanel, ShareLinkButton, copyText, useCopiedFeedback } from './ui';
import type { ComponentMode, MirrorId, ReleaseId, ToolLanguage } from './types';

export function MirrorTool({ lang }: { lang: ToolLanguage }) {
  const t = toolText[lang];
  const [release, setRelease] = useState<ReleaseId>('trixie');
  const [mirror, setMirror] = useState<MirrorId>(lang === 'zh' ? 'ustc' : 'official');
  const [components, setComponents] = useState<ComponentMode>('firmware');
  const [shareCopied, showShareCopied] = useCopiedFeedback();

  const selectedMirror = mirrors[mirror];
  const selectedComponents = componentSets[components];
  const snippet = useMemo(
    () => buildMirrorSnippet(release, mirror, components),
    [release, mirror, components],
  );

  useEffect(() => {
    function syncMirrorStateFromHash() {
      const hashState = parseToolHash(window.location.hash);
      if (hashState.id !== toolHashIds.mirror) return;

      const nextRelease = hashState.params.get('release');
      const nextMirror = hashState.params.get('mirror');
      const nextComponents = hashState.params.get('components');

      if (hasRecordKey(releaseLabels, nextRelease)) setRelease(nextRelease);
      if (hasRecordKey(mirrors, nextMirror)) setMirror(nextMirror);
      if (hasRecordKey(componentSets, nextComponents)) setComponents(nextComponents);
    }

    syncMirrorStateFromHash();
    window.addEventListener('hashchange', syncMirrorStateFromHash);
    return () => window.removeEventListener('hashchange', syncMirrorStateFromHash);
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = `${toolHashIds.mirror}?release=${release}&mirror=${mirror}&components=${components}`;

    await copyText(url.toString());
    showShareCopied();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.mirror.release}</h3>
          <ButtonGroup
            value={release}
            onChange={setRelease}
            options={[
              { value: 'trixie', label: releaseLabels.trixie, description: lang === 'zh' ? '当前 stable' : 'Current stable' },
              {
                value: 'bookworm',
                label: releaseLabels.bookworm,
                description: lang === 'zh' ? 'oldstable / 迁移期' : 'oldstable / migration period',
              },
            ]}
          />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">{t.mirror.mirror}</h3>
          <ButtonGroup
            value={mirror}
            onChange={setMirror}
            options={(Object.keys(mirrors) as MirrorId[]).map((id) => ({
              value: id,
              label: mirrors[id].label,
              description: mirrors[id].detail[lang],
            }))}
          />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">{t.mirror.components}</h3>
          <ButtonGroup
            value={components}
            onChange={setComponents}
            options={(Object.keys(componentSets) as ComponentMode[]).map((id) => ({
              value: id,
              label: componentSets[id].label[lang],
              description: componentSets[id].note[lang],
            }))}
          />
        </div>
      </section>

      <ResultPanel lang={lang} title={t.mirror.snippet}>
        <p>{selectedComponents.note[lang]}</p>
        <CodeBlock lang={lang} value={snippet} />
        <ShareLinkButton copied={shareCopied} label={t.mirror.share} copiedLabel={t.mirror.shareCopied} onClick={copyShareLink} />
        <div>
          <div className="mb-2 font-medium text-fd-foreground">{t.mirror.command}</div>
          <CodeBlock lang={lang} value="sudoedit /etc/apt/sources.list.d/debian.sources" />
        </div>
        <a className="text-fd-primary no-underline hover:underline" href={docsHref[lang].deb822}>
          {t.mirror.docs}
        </a>
      </ResultPanel>
    </div>
  );
}
