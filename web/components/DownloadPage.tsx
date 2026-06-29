'use client';

import { useEffect, useMemo, useState } from 'react';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Cpu,
  Disc3,
  Download,
  ExternalLink,
  FileCheck2,
  Globe2,
  HardDrive,
  Network,
  ShieldCheck,
} from 'lucide-react';
import {
  OFFICIAL_MIRROR,
  type ArchitectureId,
  type DebianVersion,
  type ImageType,
  type ImageTypeId,
  buildDownloadUrls,
  debianVersions,
  getArchitecture,
  getAvailableArchitectures,
  getAvailableImageTypes,
  getCountry,
  getCountryMirror,
  getDefaultCountryCode,
  getImageType,
  getMirror,
  getMirrorCountryCode,
  getVersion,
  groupCountries,
  localize,
} from '@/lib/download';

type Lang = 'zh' | 'en';

interface Strings {
  recommendedConfig: string;
  versionTitle: string;
  versionDesc: string;
  architectureTitle: string;
  architectureDesc: string;
  imageTitle: string;
  imageDesc: string;
  mirrorTitle: string;
  mirrorDesc: string;
  officialMirror: string;
  sourceMirror: string;
  fallbackTitle: string;
  fallbackDesc: string;
  downloadNow: string;
  torrent: string;
  directory: string;
  checksum: string;
  signature: string;
  copyIso: string;
  copied: string;
  fileLabel: string;
  verifyTitle: string;
  verifyDesc: string;
  nextTitle: string;
  bootableMedia: string;
  installationGuide: string;
  detailedGuide: string;
  advanced: string;
  recommendedTag: string;
  current: string;
  readyTitle: string;
}

const STRINGS: Record<Lang, Strings> = {
  zh: {
    recommendedConfig: '推荐下载配置',
    versionTitle: '版本',
    versionDesc: '默认选择当前稳定版；旧稳定版只建议维护现有系统时使用。',
    architectureTitle: '架构',
    architectureDesc: '大多数 Intel / AMD 电脑请选择 amd64；Apple Silicon、ARM 服务器请选择 arm64。',
    imageTitle: '镜像类型',
    imageDesc: '有网络时优先 netinst；离线安装选 DVD；想先体验桌面选 Live。',
    mirrorTitle: '镜像站',
    mirrorDesc: '选择附近镜像可以加快下载，也能减少官方主站压力。',
    officialMirror: '使用 Debian 官方 cdimage',
    sourceMirror: '实际下载源',
    fallbackTitle: '已自动切换到官方源',
    fallbackDesc: '所选版本或镜像类型不适合当前镜像站，下载链接已使用 Debian 官方 cdimage。',
    downloadNow: '下载 ISO',
    torrent: 'BT 下载',
    directory: '浏览目录',
    checksum: 'SHA256',
    signature: '签名',
    copyIso: '复制 ISO 链接',
    copied: '已复制',
    fileLabel: '文件',
    verifyTitle: '下载后校验',
    verifyDesc: '先下载 ISO 与 SHA256SUMS，再在同一目录执行校验命令。',
    nextTitle: '下一步',
    bootableMedia: '制作启动盘',
    installationGuide: '安装指南',
    detailedGuide: '下载教程',
    advanced: '高级用户',
    recommendedTag: '推荐',
    current: '当前选择',
    readyTitle: '准备下载',
  },
  en: {
    recommendedConfig: 'Recommended download',
    versionTitle: 'Version',
    versionDesc: 'Use the current stable release by default; oldstable is mainly for existing systems.',
    architectureTitle: 'Architecture',
    architectureDesc: 'Most Intel / AMD computers should use amd64; Apple Silicon and ARM servers should use arm64.',
    imageTitle: 'Image type',
    imageDesc: 'Use netinst with internet access, DVD for offline installs, and Live to try a desktop first.',
    mirrorTitle: 'Mirror',
    mirrorDesc: 'A nearby mirror can download faster and keeps traffic away from the central site.',
    officialMirror: 'Use Debian official cdimage',
    sourceMirror: 'Download source',
    fallbackTitle: 'Using the official source',
    fallbackDesc: 'The selected version or image type is not suitable for this mirror, so the links use Debian cdimage.',
    downloadNow: 'Download ISO',
    torrent: 'Torrent',
    directory: 'Browse directory',
    checksum: 'SHA256',
    signature: 'Signature',
    copyIso: 'Copy ISO link',
    copied: 'Copied',
    fileLabel: 'File',
    verifyTitle: 'Verify after download',
    verifyDesc: 'Download the ISO and SHA256SUMS, then run the checksum command in the same directory.',
    nextTitle: 'Next steps',
    bootableMedia: 'Create bootable media',
    installationGuide: 'Installation guide',
    detailedGuide: 'Download guide',
    advanced: 'Advanced users',
    recommendedTag: 'Recommended',
    current: 'Current selection',
    readyTitle: 'Ready to download',
  },
};

const DEFAULT_VERSION_ID: DebianVersion['id'] = 'trixie';
const DEFAULT_ARCHITECTURE: ArchitectureId = 'amd64';
const DEFAULT_IMAGE_TYPE: ImageTypeId = 'netinst';
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background';
const pressable = 'transition active:scale-[0.99]';

function cn(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function normalizeVersion(value: string | null): DebianVersion {
  return debianVersions.find((version) => version.id === value) ?? getVersion(DEFAULT_VERSION_ID);
}

function normalizeArchitecture(version: DebianVersion, value: string | null): ArchitectureId {
  const requested = value as ArchitectureId | null;
  if (requested && version.architectures.includes(requested)) return requested;
  if (version.architectures.includes(DEFAULT_ARCHITECTURE)) return DEFAULT_ARCHITECTURE;
  return version.architectures[0] ?? DEFAULT_ARCHITECTURE;
}

function normalizeImageType(version: DebianVersion, architecture: ArchitectureId, value: string | null): ImageTypeId {
  const available = getAvailableImageTypes(version, architecture);
  const requested = value as ImageTypeId | null;

  if (requested && available.some((type) => type.id === requested)) return requested;
  if (available.some((type) => type.id === DEFAULT_IMAGE_TYPE)) return DEFAULT_IMAGE_TYPE;
  return available[0]?.id ?? DEFAULT_IMAGE_TYPE;
}

function normalizeCountryCode(value: string | null): string {
  if (!value) return '';
  return getCountry(value.toUpperCase())?.code ?? '';
}

function iconForImageType(imageType: ImageType) {
  if (imageType.kind === 'dvd') return Disc3;
  if (imageType.kind === 'live') return HardDrive;
  return Network;
}

export function DownloadPage() {
  const { locale } = useI18n();
  const activeLocale = locale ?? 'en';
  const lang: Lang = activeLocale === 'zh' ? 'zh' : 'en';
  const t = STRINGS[lang];

  const [versionId, setVersionId] = useState<DebianVersion['id']>(DEFAULT_VERSION_ID);
  const [architectureId, setArchitectureId] = useState<ArchitectureId>(DEFAULT_ARCHITECTURE);
  const [imageTypeId, setImageTypeId] = useState<ImageTypeId>(DEFAULT_IMAGE_TYPE);
  const [countryCode, setCountryCode] = useState(() => (activeLocale === 'zh' ? 'CN' : ''));
  const [mirrorId, setMirrorId] = useState(() => (activeLocale === 'zh' ? getCountryMirror('CN').id : OFFICIAL_MIRROR.id));
  const [copied, setCopied] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const version = getVersion(versionId);
  const architecture = getArchitecture(architectureId);
  const imageType = getImageType(imageTypeId);
  const mirror = getMirror(mirrorId);
  const selectedCountry = getCountry(countryCode);

  const architectureOptions = useMemo(() => getAvailableArchitectures(version), [version]);
  const imageTypeOptions = useMemo(() => getAvailableImageTypes(version, architectureId), [version, architectureId]);
  const countryGroups = useMemo(() => groupCountries(lang), [lang]);
  const urls = useMemo(
    () => buildDownloadUrls(version, architectureId, imageType, mirror),
    [version, architectureId, imageType, mirror],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextVersion = normalizeVersion(params.get('version'));
    const nextArchitecture = normalizeArchitecture(nextVersion, params.get('arch'));
    const nextImageType = normalizeImageType(nextVersion, nextArchitecture, params.get('type'));
    const mirrorParam = params.get('mirror');
    const requestedMirror = mirrorParam ? getMirror(mirrorParam) : undefined;
    const hasRequestedMirror = Boolean(mirrorParam && requestedMirror?.id === mirrorParam);
    const requestedCountry = normalizeCountryCode(params.get('country'));
    const explicitOfficial = hasRequestedMirror && requestedMirror?.id === OFFICIAL_MIRROR.id;
    const mirrorCountry = hasRequestedMirror && requestedMirror && requestedMirror.id !== OFFICIAL_MIRROR.id
      ? getMirrorCountryCode(requestedMirror.id)
      : '';
    const nextCountry = explicitOfficial ? '' : mirrorCountry || requestedCountry || getDefaultCountryCode(activeLocale);
    const nextMirror = hasRequestedMirror
      ? requestedMirror?.id ?? OFFICIAL_MIRROR.id
      : nextCountry
        ? getCountryMirror(nextCountry).id
        : OFFICIAL_MIRROR.id;

    setVersionId(nextVersion.id);
    setArchitectureId(nextArchitecture);
    setImageTypeId(nextImageType);
    setCountryCode(nextCountry);
    setMirrorId(getMirror(nextMirror).id);
    setInitialized(true);
  }, [activeLocale]);

  useEffect(() => {
    if (!initialized) return;

    const params = new URLSearchParams();
    if (versionId !== DEFAULT_VERSION_ID) params.set('version', versionId);
    if (architectureId !== DEFAULT_ARCHITECTURE) params.set('arch', architectureId);
    if (imageTypeId !== DEFAULT_IMAGE_TYPE) params.set('type', imageTypeId);

    const defaultCountry = getDefaultCountryCode(activeLocale);
    if (countryCode && countryCode !== defaultCountry) params.set('country', countryCode);

    const impliedMirror = countryCode ? getCountryMirror(countryCode).id : defaultCountry ? getCountryMirror(defaultCountry).id : OFFICIAL_MIRROR.id;
    if (mirrorId !== impliedMirror) params.set('mirror', mirrorId);

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState(null, '', nextUrl);
  }, [activeLocale, architectureId, countryCode, imageTypeId, initialized, mirrorId, versionId]);

  useEffect(() => {
    if (!architectureOptions.some((option) => option.id === architectureId)) {
      const nextArchitecture = normalizeArchitecture(version, architectureId);
      setArchitectureId(nextArchitecture);
      setImageTypeId(normalizeImageType(version, nextArchitecture, imageTypeId));
      return;
    }

    if (!imageTypeOptions.some((option) => option.id === imageTypeId)) {
      setImageTypeId(normalizeImageType(version, architectureId, imageTypeId));
    }
  }, [architectureId, architectureOptions, imageTypeId, imageTypeOptions, version]);

  function selectVersion(nextVersion: DebianVersion) {
    const nextArchitecture = normalizeArchitecture(nextVersion, architectureId);
    setVersionId(nextVersion.id);
    setArchitectureId(nextArchitecture);
    setImageTypeId(normalizeImageType(nextVersion, nextArchitecture, imageTypeId));
  }

  function selectArchitecture(nextArchitecture: ArchitectureId) {
    setArchitectureId(nextArchitecture);
    setImageTypeId(normalizeImageType(version, nextArchitecture, imageTypeId));
  }

  function selectCountry(nextCountryCode: string) {
    setCountryCode(nextCountryCode);
    setMirrorId(nextCountryCode ? getCountryMirror(nextCountryCode).id : OFFICIAL_MIRROR.id);
  }

  async function copyIsoLink() {
    try {
      await navigator.clipboard.writeText(urls.imageUrl);
    } catch {
      const input = document.createElement('textarea');
      input.value = urls.imageUrl;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function localizedPath(path: string): string {
    return activeLocale === 'zh' ? path : `/${activeLocale}${path}`;
  }

  return (
    <div data-download-page className="not-prose space-y-7">
      <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-card">
        <div className="grid gap-0 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-fd-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-fd-border px-2 py-1">
                <CheckCircle2 className="size-3.5 text-fd-primary" aria-hidden />
                {t.recommendedConfig}
              </span>
              <span className="rounded-md border border-fd-border px-2 py-1">
                {version.imageVersion === 'testing' ? t.advanced : `Debian ${version.imageVersion}`}
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-normal text-fd-foreground">
              {localize(version.label, lang)}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-fd-muted-foreground">
              {localize(version.description, lang)} · {localize(imageType.label, lang)} · {architecture.label}
            </p>

            {version.warning ? (
              <div className="mt-4 flex gap-2 rounded-md border border-amber-300/70 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                <AlertTriangle className="mt-0.5 size-4 flex-none" aria-hidden />
                <span>{localize(version.warning, lang)}</span>
              </div>
            ) : null}

            {urls.usingOfficialFallback ? (
              <div className="mt-4 flex gap-2 rounded-md border border-blue-300/70 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
                <Globe2 className="mt-0.5 size-4 flex-none" aria-hidden />
                <span>
                  <strong>{t.fallbackTitle}{lang === 'zh' ? '。' : '. '}</strong>
                  {t.fallbackDesc}
                </span>
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={urls.imageUrl}
                target="_blank"
                rel="noopener"
                className={cn(
                  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-fd-primary px-5 py-3 text-sm font-semibold text-fd-primary-foreground no-underline hover:opacity-90',
                  focusRing,
                  pressable,
                )}
              >
                <Download className="size-4" aria-hidden />
                {t.downloadNow}
              </a>
              {urls.torrentUrl ? (
                <a
                  href={urls.torrentUrl}
                  target="_blank"
                  rel="noopener"
                  className={cn(
                    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-fd-border bg-fd-background px-4 py-3 text-sm font-medium text-fd-foreground no-underline hover:bg-fd-muted',
                    focusRing,
                    pressable,
                  )}
                >
                  <Disc3 className="size-4" aria-hidden />
                  {t.torrent}
                </a>
              ) : null}
              <button
                type="button"
                onClick={copyIsoLink}
                className={cn(
                  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-fd-border bg-fd-background px-4 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-muted',
                  focusRing,
                  pressable,
                )}
              >
                <Copy className="size-4" aria-hidden />
                {copied ? t.copied : t.copyIso}
              </button>
            </div>
          </div>

          <aside className="border-t border-fd-border bg-fd-muted/30 p-5 lg:border-l lg:border-t-0 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-fd-foreground">
              <FileCheck2 className="size-4 text-fd-primary" aria-hidden />
              {t.current}
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase text-fd-muted-foreground">{t.fileLabel}</dt>
                <dd className="mt-1 break-all rounded-md border border-fd-border bg-fd-background px-3 py-2 font-mono text-xs text-fd-foreground">
                  {urls.fileName}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-fd-muted-foreground">{t.sourceMirror}</dt>
                <dd className="mt-1 text-fd-foreground">{localize(urls.sourceMirror.name, lang)}</dd>
              </div>
            </dl>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={urls.directoryUrl}
                target="_blank"
                rel="noopener"
                className={cn(
                  'inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm font-medium text-fd-foreground no-underline hover:bg-fd-muted',
                  focusRing,
                  pressable,
                )}
              >
                <ExternalLink className="size-3.5" aria-hidden />
                {t.directory}
              </a>
              <a
                href={urls.checksumUrl}
                target="_blank"
                rel="noopener"
                className={cn(
                  'inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm font-medium text-fd-foreground no-underline hover:bg-fd-muted',
                  focusRing,
                  pressable,
                )}
              >
                <ShieldCheck className="size-3.5" aria-hidden />
                {t.checksum}
              </a>
              <a
                href={urls.signatureUrl}
                target="_blank"
                rel="noopener"
                className={cn(
                  'col-span-2 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm font-medium text-fd-foreground no-underline hover:bg-fd-muted',
                  focusRing,
                  pressable,
                )}
              >
                <FileCheck2 className="size-3.5" aria-hidden />
                {t.signature}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-fd-foreground">
            <Globe2 className="size-4 text-fd-primary" aria-hidden />
            {t.versionTitle}
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">{t.versionDesc}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {debianVersions.map((item) => {
            const active = item.id === version.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectVersion(item)}
                className={cn(
                  'min-h-[116px] rounded-lg border p-4 text-left',
                  active
                    ? 'border-fd-primary bg-fd-primary/10'
                    : 'border-fd-border bg-fd-card hover:border-fd-primary/60 hover:bg-fd-muted/50',
                  focusRing,
                  pressable,
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-fd-foreground">{localize(item.label, lang)}</span>
                  <span
                    className={cn(
                      'shrink-0 rounded-md px-2 py-1 text-xs font-medium',
                      item.channel === 'stable' && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200',
                      item.channel === 'oldstable' && 'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-200',
                      item.channel === 'testing' && 'bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200',
                    )}
                  >
                    {localize(item.badge, lang)}
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-5 text-fd-muted-foreground">
                  {localize(item.description, lang)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-semibold text-fd-foreground">
              <Cpu className="size-4 text-fd-primary" aria-hidden />
              {t.architectureTitle}
            </h2>
            <p className="mt-1 text-sm text-fd-muted-foreground">{t.architectureDesc}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {architectureOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={option.id === architecture.id}
                onClick={() => selectArchitecture(option.id)}
                className={cn(
                  'min-h-[86px] rounded-lg border p-3 text-left',
                  option.id === architecture.id
                    ? 'border-fd-primary bg-fd-primary/10'
                    : 'border-fd-border bg-fd-card hover:border-fd-primary/60 hover:bg-fd-muted/50',
                  focusRing,
                  pressable,
                )}
              >
                <span className="block font-mono text-sm font-semibold text-fd-foreground">{option.label}</span>
                <span className="mt-1 block text-xs leading-5 text-fd-muted-foreground">
                  {localize(option.description, lang)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-semibold text-fd-foreground">
              <HardDrive className="size-4 text-fd-primary" aria-hidden />
              {t.imageTitle}
            </h2>
            <p className="mt-1 text-sm text-fd-muted-foreground">{t.imageDesc}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {imageTypeOptions.map((option) => {
              const Icon = iconForImageType(option);
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={option.id === imageType.id}
                  onClick={() => setImageTypeId(option.id)}
                  className={cn(
                    'min-h-[96px] rounded-lg border p-3 text-left',
                    option.id === imageType.id
                      ? 'border-fd-primary bg-fd-primary/10'
                      : 'border-fd-border bg-fd-card hover:border-fd-primary/60 hover:bg-fd-muted/50',
                    focusRing,
                    pressable,
                  )}
                >
                  <span className="flex flex-wrap items-center gap-2 font-semibold text-fd-foreground">
                    <Icon className="size-4 text-fd-primary" aria-hidden />
                    {localize(option.label, lang)}
                    {option.recommended ? (
                      <span className="rounded-md bg-fd-primary px-1.5 py-0.5 text-[11px] font-medium text-fd-primary-foreground">
                        {t.recommendedTag}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-fd-muted-foreground">
                    {localize(option.description, lang)}
                  </span>
                  <span className="mt-2 block text-xs font-medium text-fd-foreground">{localize(option.size, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-fd-foreground">
            <Globe2 className="size-4 text-fd-primary" aria-hidden />
            {t.mirrorTitle}
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">{t.mirrorDesc}</p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[280px_1fr]">
          <select
            value={countryCode}
            aria-label={t.mirrorTitle}
            onChange={(event) => selectCountry(event.target.value)}
            className={cn(
              'h-11 rounded-md border border-fd-border bg-fd-card px-3 text-sm text-fd-foreground transition focus:border-fd-primary',
              focusRing,
            )}
          >
            <option value="">{t.officialMirror}</option>
            {countryGroups.map((group) => (
              <optgroup key={group.id} label={localize(group.name, lang)}>
                {group.countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {localize(country.name, lang)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {(selectedCountry?.mirrors ?? [OFFICIAL_MIRROR]).map((item) => {
              const mirrorMeta = item.sponsor ?? item.cdImageBaseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === mirror.id}
                  onClick={() => setMirrorId(item.id)}
                  className={cn(
                    'min-h-[76px] rounded-lg border p-3 text-left',
                    item.id === mirror.id
                      ? 'border-fd-primary bg-fd-primary/10'
                      : 'border-fd-border bg-fd-card hover:border-fd-primary/60 hover:bg-fd-muted/50',
                    focusRing,
                    pressable,
                  )}
                >
                  <span className="block text-sm font-semibold text-fd-foreground">{localize(item.name, lang)}</span>
                  <span className="mt-1 block truncate text-xs text-fd-muted-foreground" title={mirrorMeta}>
                    {mirrorMeta}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-fd-border bg-fd-card p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 text-base font-semibold text-fd-foreground">
              <Download className="size-4 text-fd-primary" aria-hidden />
              {t.readyTitle}
            </h2>
            <div className="mt-2 flex min-w-0 flex-col gap-1 text-sm text-fd-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
              <span className="break-all font-mono text-xs text-fd-foreground">{urls.fileName}</span>
              <span>
                {t.sourceMirror}: {localize(urls.sourceMirror.name, lang)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={urls.imageUrl}
              target="_blank"
              rel="noopener"
              className={cn(
                'inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-fd-primary px-5 py-3 text-sm font-semibold text-fd-primary-foreground no-underline hover:opacity-90',
                focusRing,
                pressable,
              )}
            >
              <Download className="size-4" aria-hidden />
              {t.downloadNow}
            </a>
            <button
              type="button"
              onClick={copyIsoLink}
              className={cn(
                'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-fd-border bg-fd-background px-4 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-muted',
                focusRing,
                pressable,
              )}
            >
              <Copy className="size-4" aria-hidden />
              {copied ? t.copied : t.copyIso}
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border border-fd-border bg-fd-card p-4">
          <h2 className="flex items-center gap-2 text-base font-semibold text-fd-foreground">
            <ShieldCheck className="size-4 text-fd-primary" aria-hidden />
            {t.verifyTitle}
          </h2>
          <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">{t.verifyDesc}</p>
          <div className="mt-3 rounded-md border border-fd-border bg-fd-muted/40 p-3 font-mono text-xs text-fd-foreground">
            sha256sum -c SHA256SUMS
          </div>
        </div>

        <div className="rounded-lg border border-fd-border bg-fd-card p-4">
          <h2 className="text-base font-semibold text-fd-foreground">{t.nextTitle}</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <a
              href={localizedPath('/basics/bootable-media')}
              className={cn(
                'rounded-md border border-fd-border px-3 py-2 text-sm font-medium text-fd-foreground no-underline hover:bg-fd-muted',
                focusRing,
                pressable,
              )}
            >
              {t.bootableMedia}
            </a>
            <a
              href={localizedPath('/basics/installation')}
              className={cn(
                'rounded-md border border-fd-border px-3 py-2 text-sm font-medium text-fd-foreground no-underline hover:bg-fd-muted',
                focusRing,
                pressable,
              )}
            >
              {t.installationGuide}
            </a>
            <a
              href={localizedPath('/basics/download')}
              className={cn(
                'rounded-md border border-fd-border px-3 py-2 text-sm font-medium text-fd-foreground no-underline hover:bg-fd-muted',
                focusRing,
                pressable,
              )}
            >
              {t.detailedGuide}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
