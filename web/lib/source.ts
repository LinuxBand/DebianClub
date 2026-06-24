import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { i18n } from './i18n';

// See https://fumadocs.dev/docs/headless/source-api for more info
// baseUrl '/' + i18n keeps the existing site's URL scheme exactly (SEO-preserving):
// zh at root, others under /en /de … (hideLocale: 'default-locale').
export const source = loader({
  baseUrl: docsRoute,
  i18n,
  source: docs.toFumadocsSource(),
  plugins: [],
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
