'use client';

import {
  Bot,
  Cpu,
  Database,
  Download,
  GitBranch,
  HardDrive,
  HelpCircle,
  Laptop,
  Monitor,
  Network,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { DesktopTool } from './tools/DesktopTool';
import { InstallTool } from './tools/InstallTool';
import { MirrorTool } from './tools/MirrorTool';
import { PartitionTool } from './tools/PartitionTool';
import { SafetyTool } from './tools/SafetyTool';
import { SkillsTool } from './tools/SkillsTool';
import { TroubleshootTool } from './tools/TroubleshootTool';
import { UpgradeTool } from './tools/UpgradeTool';
import { classNames, parseToolHash, toolHashIds, toolIdByHash } from './tools/logic';
import { toolText } from './tools/text';
import type { ToolId, ToolLanguage } from './tools/types';

const toolIcons: Record<ToolId, ComponentType<{ className?: string }>> = {
  mirror: Network,
  install: Download,
  desktop: Monitor,
  partition: HardDrive,
  troubleshoot: HelpCircle,
  safety: ShieldCheck,
  skills: Bot,
  upgrade: GitBranch,
};

const badgeIcons: Record<ToolId, ComponentType<{ className?: string }>> = {
  mirror: Settings2,
  install: Laptop,
  desktop: Cpu,
  partition: Database,
  troubleshoot: Wrench,
  safety: ShieldCheck,
  skills: Sparkles,
  upgrade: GitBranch,
};

function ToolBody({ active, lang }: { active: ToolId; lang: ToolLanguage }) {
  switch (active) {
    case 'mirror':
      return <MirrorTool lang={lang} />;
    case 'install':
      return <InstallTool lang={lang} />;
    case 'desktop':
      return <DesktopTool lang={lang} />;
    case 'partition':
      return <PartitionTool lang={lang} />;
    case 'troubleshoot':
      return <TroubleshootTool lang={lang} />;
    case 'safety':
      return <SafetyTool lang={lang} />;
    case 'skills':
      return <SkillsTool lang={lang} />;
    case 'upgrade':
      return <UpgradeTool lang={lang} />;
  }
}

export function InteractiveTools({ lang = 'zh' }: { lang?: ToolLanguage }) {
  const t = toolText[lang];
  const [active, setActive] = useState<ToolId>('mirror');
  const tools = Object.keys(t.tabs) as ToolId[];
  const AccentIcon = badgeIcons[active];

  useEffect(() => {
    function syncFromHash() {
      const hash = parseToolHash(window.location.hash).id;
      const next = toolIdByHash[hash];
      if (next) setActive(next);
    }

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function selectTool(id: ToolId) {
    setActive(id);
    const nextUrl = `${window.location.pathname}${window.location.search}#${toolHashIds[id]}`;
    window.history.replaceState(null, '', nextUrl);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-lg border border-fd-border bg-fd-card text-fd-card-foreground">
      <div className="border-b border-fd-border bg-fd-muted/30 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-background px-2.5 py-1 text-xs font-medium text-fd-muted-foreground">
              <AccentIcon className="size-3.5" />
              {t.badge}
            </div>
            <h2 className="m-0 text-2xl font-semibold tracking-normal">{t.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-fd-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-fd-border p-3">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
          {tools.map((id) => {
            const Icon = toolIcons[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectTool(id)}
                aria-pressed={active === id}
                className={classNames(
                  'flex min-h-11 items-center justify-center gap-2 rounded-md border px-2 text-sm font-medium transition-colors',
                  active === id
                    ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                    : 'border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
                )}
              >
                <Icon className="size-4" />
                <span>{t.tabs[id]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        <ToolBody active={active} lang={lang} />
      </div>
    </section>
  );
}
