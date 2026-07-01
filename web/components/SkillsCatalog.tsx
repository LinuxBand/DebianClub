'use client';

import {
  Check,
  Clipboard,
  Download,
  FileJson,
  Package,
  ShieldCheck,
  Terminal,
  Upload,
} from 'lucide-react';
import { useState } from 'react';
import registry from '../../skills/registry.json';

type CatalogLanguage = 'en' | 'zh';

type RegistrySkill = (typeof registry.skills)[number];

const labels = {
  zh: {
    catalog: 'Skills Catalog',
    version: '版本',
    modules: '模块',
    languages: '语言',
    safety: '默认边界',
    install: '安装',
    replace: '替换安装',
    validate: '验证',
    package: '打包',
    publish: '发布检查',
    registry: 'Registry',
    copy: '复制',
    copied: '已复制',
    commands: '命令',
    openRegistry: '打开 registry',
  },
  en: {
    catalog: 'Skills Catalog',
    version: 'Version',
    modules: 'Modules',
    languages: 'Languages',
    safety: 'Default Boundary',
    install: 'Install',
    replace: 'Replace Install',
    validate: 'Validate',
    package: 'Package',
    publish: 'Publish Check',
    registry: 'Registry',
    copy: 'Copy',
    copied: 'Copied',
    commands: 'Commands',
    openRegistry: 'Open registry',
  },
} as const;

const moduleLabels: Record<CatalogLanguage, Record<string, string>> = {
  zh: {
    'env-detect': '环境识别',
    'apt-safe': 'APT 安全',
    'command-safety': '命令安全',
    'systemd-troubleshoot': 'systemd',
    'network-debug': '网络',
    'dev-setup': '开发环境',
    'gpu-drivers': 'GPU',
    containers: '容器',
    'debian-packaging': 'Debian 打包',
    'security-audit': '安全审计',
    'debianclub-sources': 'DebianClub 文档',
  },
  en: {
    'env-detect': 'Environment',
    'apt-safe': 'APT safety',
    'command-safety': 'Command safety',
    'systemd-troubleshoot': 'systemd',
    'network-debug': 'Networking',
    'dev-setup': 'Dev setup',
    'gpu-drivers': 'GPU',
    containers: 'Containers',
    'debian-packaging': 'Debian packaging',
    'security-audit': 'Security audit',
    'debianclub-sources': 'DebianClub docs',
  },
};

function commandSet(skill: RegistrySkill) {
  const install = `bash ${skill.install.local_script}`;
  return [
    { key: 'install', icon: Download, command: install },
    { key: 'replace', icon: Terminal, command: install.replace('install-skill.sh', 'install-skill.sh --replace') },
    { key: 'validate', icon: ShieldCheck, command: `bash ${skill.validation.script}` },
    {
      key: 'package',
      icon: Package,
      command: `bash ${skill.distribution.package_script}`,
    },
    {
      key: 'publish',
      icon: Upload,
      command: `bash ${skill.distribution.publish_script} --dry-run`,
    },
  ] as const;
}

function skillText(skill: RegistrySkill, lang: CatalogLanguage) {
  if (lang === 'zh') {
    return {
      displayName: skill.localized?.zh?.display_name ?? skill.display_name,
      shortDescription: skill.localized?.zh?.short_description ?? skill.short_description,
      defaultSafety: skill.localized?.zh?.default_safety ?? skill.default_safety,
    };
  }

  return {
    displayName: skill.display_name,
    shortDescription: skill.short_description,
    defaultSafety: skill.default_safety,
  };
}

function CopyButton({ command, label }: { command: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(command);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = command;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const Icon = copied ? Check : Clipboard;

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      aria-label={label}
      title={label}
    >
      <Icon className="size-3.5" />
      <span>{label}</span>
    </button>
  );
}

function SkillCard({ skill, lang }: { skill: RegistrySkill; lang: CatalogLanguage }) {
  const t = labels[lang];
  const modules = moduleLabels[lang];
  const text = skillText(skill, lang);

  return (
    <article className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-card text-fd-card-foreground">
      <div className="border-b border-fd-border p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="m-0 text-lg font-semibold tracking-normal">{text.displayName}</h3>
              <span className="rounded-md border border-fd-border bg-fd-muted px-2 py-0.5 font-mono text-xs text-fd-muted-foreground">
                {t.version} {skill.version}
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-fd-muted-foreground">{text.shortDescription}</p>
          </div>

          <a
            href={skill.distribution.registry_route}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-fd-border bg-fd-background px-3 text-sm font-medium text-fd-foreground no-underline transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <FileJson className="size-4" />
            <span>{t.openRegistry}</span>
          </a>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-xs font-medium uppercase text-fd-muted-foreground">{t.safety}</div>
            <div className="mt-1 text-sm">{text.defaultSafety}</div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase text-fd-muted-foreground">{t.languages}</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {skill.languages.map((language) => (
                <span
                  key={language}
                  className="rounded-md border border-fd-border px-2 py-0.5 font-mono text-xs text-fd-muted-foreground"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.75fr)]">
        <section>
          <div className="mb-2 text-xs font-medium uppercase text-fd-muted-foreground">{t.modules}</div>
          <div className="flex flex-wrap gap-2">
            {skill.modules.map((module) => (
              <span key={module} className="rounded-md bg-fd-muted px-2 py-1 text-xs text-fd-muted-foreground">
                {modules[module] ?? module}
              </span>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-2 text-xs font-medium uppercase text-fd-muted-foreground">{t.commands}</div>
          <div className="space-y-2">
            {commandSet(skill).map(({ key, icon: Icon, command }) => (
              <div
                key={key}
                className="flex min-w-0 items-center gap-2 rounded-md border border-fd-border bg-fd-background p-2"
              >
                <Icon className="size-4 shrink-0 text-fd-muted-foreground" />
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap bg-transparent p-0 text-xs">
                  {command}
                </code>
                <CopyButton command={command} label={t[key] ?? t.copy} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export function SkillsCatalog({ lang = 'zh' }: { lang?: CatalogLanguage }) {
  const t = labels[lang];

  return (
    <section className="not-prose my-8">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="m-0 text-xl font-semibold tracking-normal">{t.catalog}</h2>
        <span className="rounded-md border border-fd-border px-2 py-1 font-mono text-xs text-fd-muted-foreground">
          registry v{registry.schema_version}
        </span>
      </div>
      {registry.skills.map((skill) => (
        <SkillCard key={skill.name} skill={skill} lang={lang} />
      ))}
    </section>
  );
}
