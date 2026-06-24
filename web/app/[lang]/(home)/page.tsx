import Link from 'next/link';
import { i18n } from '@/lib/i18n';

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

// Placeholder landing page — the full hero/features landing is rebuilt in P3.
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const prefix = lang === i18n.defaultLanguage ? '' : `/${lang}`;
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Debian.Club</h1>
      <p className="max-w-xl text-fd-muted-foreground">
        Debian 初学者完全指南 — Fumadocs migration preview ({lang})
      </p>
      <div className="flex gap-3">
        <Link
          href={`${prefix}/basics/introduction`}
          className="rounded-lg bg-fd-primary px-5 py-2 font-medium text-fd-primary-foreground"
        >
          开始学习 →
        </Link>
        <Link
          href={`${prefix}/eol`}
          className="rounded-lg border px-5 py-2 font-medium"
        >
          EOL
        </Link>
      </div>
    </main>
  );
}
