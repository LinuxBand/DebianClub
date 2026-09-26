'use client';

import { AlertTriangle, Check, Clipboard, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from './logic';
import { toolText } from './text';
import type { ToolLanguage } from './types';

async function fallbackCopy(value: string) {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export async function copyText(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      await fallbackCopy(value);
    }
  } catch {
    await fallbackCopy(value);
  }
}

export function useCopiedFeedback(timeoutMs = 1400) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showCopied = useCallback(() => {
    setCopied(true);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      timeoutRef.current = null;
    }, timeoutMs);
  }, [timeoutMs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [copied, showCopied] as const;
}

export function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, showCopied] = useCopiedFeedback();

  async function copy() {
    await copyText(value);
    showCopied();
  }

  const Icon = copied ? Check : Clipboard;

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      title={copied ? copiedLabel : label}
      aria-label={copied ? copiedLabel : label}
    >
      <Icon className="size-3.5" />
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}

export function ShareLinkButton({
  copied,
  label,
  copiedLabel,
  onClick,
}: {
  copied: boolean;
  label: string;
  copiedLabel: string;
  onClick: () => Promise<void>;
}) {
  const Icon = copied ? Check : Clipboard;

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-fd-border bg-fd-background px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      <Icon className="size-4" />
      {copied ? copiedLabel : label}
    </button>
  );
}

export function ButtonGroup<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Array<{ value: T; label: string; description?: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={classNames(
            'min-h-14 rounded-md border px-3 py-2 text-left transition-colors',
            value === option.value
              ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
              : 'border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
          )}
        >
          <span className="block text-sm font-medium">{option.label}</span>
          {option.description ? <span className="mt-1 block text-xs opacity-80">{option.description}</span> : null}
        </button>
      ))}
    </div>
  );
}

export function ResultPanel({
  lang,
  title,
  children,
}: {
  lang: ToolLanguage;
  title: string;
  children: ReactNode;
}) {
  const t = toolText[lang];

  return (
    <section className="rounded-md border border-fd-border bg-fd-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className="size-4 text-emerald-600" />
        <h3 className="m-0 text-base font-semibold">{title}</h3>
      </div>
      <div className="space-y-4 text-sm leading-6 text-fd-muted-foreground">{children}</div>
      <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-5 text-amber-700 dark:text-amber-300">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <span>{t.reviewBeforeUse}</span>
      </div>
    </section>
  );
}

export function CodeBlock({ lang, value }: { lang: ToolLanguage; value: string }) {
  const t = toolText[lang];

  return (
    <div className="overflow-hidden rounded-md border border-fd-border bg-fd-background">
      <div className="flex items-center justify-between gap-3 border-b border-fd-border px-3 py-2">
        <span className="text-xs font-medium text-fd-muted-foreground">{t.output}</span>
        <CopyButton value={value} label={t.copy} copiedLabel={t.copied} />
      </div>
      <pre className="m-0 max-h-80 overflow-auto p-3 text-xs leading-5">
        <code>{value}</code>
      </pre>
    </div>
  );
}
