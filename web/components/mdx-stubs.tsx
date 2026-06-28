import type { ReactNode } from 'react';

// Placeholder components for the VitePress -> Fumadocs migration.
// These render a labelled box until the real React versions land (P3).
function Stub({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-dashed border-fd-border bg-fd-card/40 p-4 text-sm text-fd-muted-foreground">
      <span className="font-mono text-xs opacity-70">[{name}]</span>
      {children}
    </div>
  );
}

const mk = (name: string) => (_props: Record<string, unknown>) => <Stub name={name} />;

export const StatsSection = mk('StatsSection');
export const TestimonialsSection = mk('TestimonialsSection');
export const DiskPartition = mk('DiskPartition');
export const ReleaseTimeline = mk('ReleaseTimeline');
export const BootChain = mk('BootChain');
export const Permissions = mk('Permissions');
export const DownloadPage = mk('DownloadPage');
export const DownloadManager = mk('DownloadManager');
export const MirrorSelector = mk('MirrorSelector');
export const StepWizard = mk('StepWizard');
export const VersionBadge = mk('VersionBadge');
export const DifficultyBadge = mk('DifficultyBadge');
export const CommandBlock = mk('CommandBlock');

export const migrationStubs = {
  StatsSection,
  TestimonialsSection,
  DiskPartition,
  ReleaseTimeline,
  BootChain,
  Permissions,
  DownloadPage,
  DownloadManager,
  MirrorSelector,
  StepWizard,
  VersionBadge,
  DifficultyBadge,
  CommandBlock,
};
