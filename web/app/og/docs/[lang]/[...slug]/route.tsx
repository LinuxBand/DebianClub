import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { appName } from '@/lib/shared';

export const revalidate = false;

// Per-page, per-locale OG image (1200x630) without remote font dependencies.
export async function GET(_req: Request, { params }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const { lang, slug } = await params;
  const page = source.getPage(slug.slice(0, -1), lang); // drop trailing 'image.png'
  if (!page) notFound();

  const pagePath = page.slugs.join('/');
  const displayPath =
    pagePath.length === 0 ? (lang === i18n.defaultLanguage ? '/' : `/${lang}`) : lang === i18n.defaultLanguage ? `/${pagePath}` : `/${lang}/${pagePath}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'Arial, sans-serif',
        padding: 64,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: '#d70a53',
            boxShadow: '0 0 0 10px rgba(215, 10, 83, 0.16)',
          }}
        />
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 0 }}>{appName}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 980 }}>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: 0,
          }}
        >
          Debian.Club
        </div>
        <div style={{ maxWidth: 900, color: '#cbd5e1', fontSize: 30, lineHeight: 1.35 }}>
          Documentation, tools, and release notes for Debian users.
        </div>
        <div style={{ color: '#f8fafc', fontSize: 34, lineHeight: 1.2 }}>{displayPath}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: 24 }}>
        <span>Debian documentation and tools</span>
        <span>debian.club</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  const out: { lang: string; slug: string[] }[] = [];
  for (const lang of i18n.languages) {
    for (const page of source.getPages(lang)) {
      out.push({ lang, slug: [...page.slugs, 'image.png'] });
    }
  }
  return out;
}
