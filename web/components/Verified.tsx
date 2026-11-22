import type { ReactNode } from 'react';

type VerifiedProps = {
  date: string;
  label?: string;
  children?: ReactNode;
};

export function Verified({ date, label = '实测验证', children }: VerifiedProps) {
  return (
    <div className="not-prose my-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200">
      <span className="font-medium">✓ {label}</span>
      <span className="opacity-80">{date}</span>
      {children ? <span className="opacity-80">· {children}</span> : null}
    </div>
  );
}
