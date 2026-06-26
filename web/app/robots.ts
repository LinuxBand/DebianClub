import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/shared';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/search is a ~30 MB static JSON index — no SEO value, save crawl budget
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
