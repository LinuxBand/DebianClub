'use client';

import Link from 'fumadocs-core/link';
import { usePathname } from 'fumadocs-core/framework';
import { Fragment, useState } from 'react';
import type { ComponentProps } from 'react';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';
import { isLinkItemActive } from 'fumadocs-ui/layouts/shared';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'fumadocs-ui/components/ui/navigation-menu';
import { ChevronDown, Languages, SidebarIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

// Desktop docs pages ship without a top navbar in fumadocs' default docs
// layout (the header slot is mobile-only). This slot replacement renders the
// same navigation-menu bar as the home layout, while keeping the default
// mobile behavior (title + search + sidebar trigger).
export function DocsMegaHeader(props: ComponentProps<'header'>) {
  const pathname = usePathname();
  const [value, setValue] = useState('');
  const { navItems, slots, props: layoutProps } = useDocsLayout();
  const { nav } = layoutProps;
  const secondaryItems = navItems.filter(
    (item) => item.type === 'icon' || item.type === 'button',
  );
  const primaryItems = navItems.filter(
    (item) => item.type !== 'icon' && item.type !== 'button',
  );

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id="nd-subnav"
        {...props}
        className={cn(
          '[grid-area:header] sticky top-(--fd-docs-row-1) z-30 h-(--fd-header-height) layout:[--fd-header-height:--spacing(14)] border-b backdrop-blur-lg transition-colors bg-fd-background/80',
          props.className,
        )}
      >
        <div className="*:mx-auto *:max-w-(--fd-layout-width) flex h-full flex-col">
          <NavigationMenuList
            className="flex h-(--fd-header-height) w-full items-center px-4"
            asChild
          >
            <nav>
              {slots.navTitle && (
                <slots.navTitle className="inline-flex items-center gap-2.5 whitespace-nowrap font-semibold" />
              )}
              {nav?.children}
              <ul className="flex flex-row items-center gap-0.5 px-4 whitespace-nowrap max-lg:hidden">
                {primaryItems.map((item, i) => (
                  <MegaNavItem key={i} item={item} pathname={pathname} />
                ))}
              </ul>
              <div className="flex min-w-0 flex-row items-center justify-end gap-1.5 flex-1 max-lg:hidden">
                {slots.searchTrigger && (
                  <slots.searchTrigger.full
                    hideIfDisabled
                    className="w-full min-w-0 rounded-full ps-2.5 max-w-[240px]"
                  />
                )}
                {slots.themeSwitch && <slots.themeSwitch />}
                {slots.languageSelect && (
                  <slots.languageSelect.root>
                    <Languages className="size-5" />
                  </slots.languageSelect.root>
                )}
                <ul className="flex flex-row gap-2 items-center empty:hidden">
                  {secondaryItems.map((item, i) => (
                    <li key={i} className="list-none">
                      {item.type === 'button' ? (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.url}
                            external={item.external}
                            className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 py-1 text-sm font-medium text-fd-foreground no-underline hover:bg-fd-accent"
                          >
                            {item.icon}
                            {item.text}
                          </Link>
                        </NavigationMenuLink>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.url}
                            external={item.external}
                            aria-label={'label' in item ? item.label : undefined}
                            className="inline-flex p-1.5 text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground"
                          >
                            {item.icon}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-row items-center ms-auto -me-1 lg:hidden">
                {slots.searchTrigger && (
                  <slots.searchTrigger.sm hideIfDisabled className="p-2" />
                )}
                {slots.sidebar && (
                  <slots.sidebar.trigger
                    className={cn(
                      'inline-flex items-center justify-center p-2 text-fd-muted-foreground [&_svg]:size-5',
                    )}
                  >
                    <SidebarIcon />
                  </slots.sidebar.trigger>
                )}
              </div>
            </nav>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </div>
      </header>
    </NavigationMenu>
  );
}

function MegaNavItem({
  item,
  pathname,
}: {
  item: LinkItemType;
  pathname: string;
}) {
  const active = isLinkItemActive(item, pathname);

  if (item.type === 'custom') return <Fragment>{item.children}</Fragment>;

  if (item.type === 'menu') {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          data-active={active || undefined}
          className="inline-flex items-center gap-1 rounded-md p-2 text-sm whitespace-nowrap text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary data-[state=open]:text-fd-accent-foreground [&_svg]:size-3"
        >
          {item.url ? (
            <Link href={item.url} className="no-underline hover:text-inherit">
              {item.text}
            </Link>
          ) : (
            item.text
          )}
          <ChevronDown />
        </NavigationMenuTrigger>
        <NavigationMenuContent className="grid grid-cols-1 gap-2 rounded-b-xl border border-t-0 border-fd-border bg-fd-background p-4 shadow-xl md:grid-cols-2 lg:grid-cols-3">
          {item.items.map((child, j) => {
            if (child.type === 'custom') {
              return <Fragment key={j}>{child.children}</Fragment>;
            }
            return (
              <NavigationMenuLink asChild key={`${j}-${child.url}`}>
                <Link
                  href={child.url}
                  external={child.external}
                  className="flex flex-col gap-2 rounded-lg border bg-fd-card p-3 no-underline transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground"
                >
                  {child.menu?.banner ??
                    (child.icon ? (
                      <div className="w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4">
                        {child.icon}
                      </div>
                    ) : null)}
                  <p className="text-base font-medium">{child.text}</p>
                  <p className="text-sm text-fd-muted-foreground empty:hidden">
                    {child.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            );
          })}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          external={item.external}
          data-active={active || undefined}
          className="inline-flex items-center gap-1 rounded-md p-2 text-sm whitespace-nowrap text-fd-muted-foreground no-underline transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary"
        >
          {item.icon}
          {item.text}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
