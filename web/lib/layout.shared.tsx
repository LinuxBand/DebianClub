import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { navLinks } from './nav';

export function baseOptions(locale = 'zh'): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      title: appName,
    },
    links: navLinks(locale),
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
