import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { navLinks } from './nav';

/**
 * `navOnly` marks navigation entries as top-nav-only: they render in the
 * header mega menu but not in the docs sidebar, which shows the full page
 * tree instead (avoids duplicating 入门/系统管理/服务器/场景方案/AI 工具 twice).
 */
export function baseOptions(locale = 'zh', navOnly = false): BaseLayoutProps {
  const links = navLinks(locale);
  if (navOnly) {
    for (const link of links) {
      (link as { on?: 'nav' }).on = 'nav';
    }
  }
  return {
    i18n: true,
    nav: {
      title: appName,
    },
    links,
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
