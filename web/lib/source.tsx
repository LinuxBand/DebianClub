import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import {
  Bot,
  BookText,
  Compass,
  Cpu,
  GitCompare,
  LayoutGrid,
  Layers,
  LifeBuoy,
  Link2,
  Package,
  Rocket,
  Server,
  ServerCog,
  Settings,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { i18n } from './i18n';

// Icon names referenced by meta.json separators ("---[Cpu]Hardware & AI---"),
// folder meta files ("icon": "Server") and page frontmatter ("icon: Rocket").
const ICONS: Record<string, LucideIcon> = {
  Rocket,
  BookText,
  Compass,
  Cpu,
  GitCompare,
  Layers,
  LayoutGrid,
  LifeBuoy,
  Link2,
  Package,
  Bot,
  Server,
  ServerCog,
  Settings,
  Wrench,
};

// See https://fumadocs.dev/docs/headless/source-api for more info.
// The URL scheme is SEO-preserving: zh at root, other languages under
// /en /de ... (hideLocale: 'default-locale').
export const source = loader({
  baseUrl: docsRoute,
  i18n,
  source: docs.toFumadocsSource(),
  plugins: [],
  icon: (name) => {
    const Icon = name ? ICONS[name] : undefined;
    return Icon ? <Icon className="size-4 shrink-0" /> : null;
  },
});

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    // per-locale OG image route: /og/<lang>/docs/<slug>/image.png
    url: `${docsImageRoute}/${page.locale ?? 'zh'}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
