import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { migrationStubs } from './mdx-stubs';
import { ReleaseTimeline } from './infographics/ReleaseTimeline';
import { BootChain } from './infographics/BootChain';
import { DiskPartition } from './infographics/DiskPartition';
import { Permissions } from './infographics/Permissions';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    ...migrationStubs,
    // real (ported) components override their stubs:
    ReleaseTimeline,
    BootChain,
    DiskPartition,
    Permissions,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
