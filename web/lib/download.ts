export type LocaleKey = 'zh' | 'en';

export type VersionChannel = 'stable' | 'oldstable' | 'testing';

export type ArchitectureId = 'amd64' | 'arm64' | 'i386';

export type ImageTypeId = 'netinst' | 'dvd' | 'live-gnome' | 'live-xfce' | 'live-standard';

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface Mirror {
  id: string;
  countryCode?: string;
  name: LocalizedText;
  shortName: string;
  cdImageBaseUrl: string;
  cdimageBaseUrl?: string;
  hasFullCdimage?: boolean;
  sponsor?: string;
}

export interface Country {
  code: string;
  name: LocalizedText;
  region: RegionId;
  mirrors: Mirror[];
}

export interface Region {
  id: RegionId;
  name: LocalizedText;
}

export interface Architecture {
  id: ArchitectureId;
  label: string;
  description: LocalizedText;
}

export interface ImageType {
  id: ImageTypeId;
  kind: 'cd' | 'dvd' | 'live';
  label: LocalizedText;
  description: LocalizedText;
  size: LocalizedText;
  recommended?: boolean;
  architectures: ArchitectureId[];
}

export interface DebianVersion {
  id: 'trixie' | 'bookworm' | 'forky';
  codename: string;
  number: string;
  imageVersion: string;
  channel: VersionChannel;
  label: LocalizedText;
  description: LocalizedText;
  badge: LocalizedText;
  warning?: LocalizedText;
  architectures: ArchitectureId[];
  imageTypes: ImageTypeId[];
}

export interface DownloadUrls {
  fileName: string;
  imageUrl: string;
  directoryUrl: string;
  torrentUrl: string;
  checksumUrl: string;
  signatureUrl: string;
  sourceMirror: Mirror;
  usingOfficialFallback: boolean;
}

export type RegionId = 'asia' | 'europe' | 'americas' | 'oceania';

const OFFICIAL_CDIMAGE_ROOT = 'https://cdimage.debian.org/';

export const OFFICIAL_MIRROR: Mirror = {
  id: 'official',
  name: { zh: 'Debian 官方 cdimage', en: 'Debian official cdimage' },
  shortName: 'Official',
  cdImageBaseUrl: 'https://cdimage.debian.org/debian-cd/',
  cdimageBaseUrl: OFFICIAL_CDIMAGE_ROOT,
  hasFullCdimage: true,
};

export const regions: Region[] = [
  { id: 'asia', name: { zh: '亚洲', en: 'Asia' } },
  { id: 'europe', name: { zh: '欧洲', en: 'Europe' } },
  { id: 'americas', name: { zh: '美洲', en: 'Americas' } },
  { id: 'oceania', name: { zh: '大洋洲', en: 'Oceania' } },
];

export const countries: Country[] = [
  {
    code: 'CN',
    name: { zh: '中国大陆', en: 'China' },
    region: 'asia',
    mirrors: [
      {
        id: 'ustc',
        countryCode: 'CN',
        name: { zh: '中国科学技术大学', en: 'USTC Mirror' },
        shortName: 'USTC',
        cdImageBaseUrl: 'https://mirrors.ustc.edu.cn/debian-cd/',
        cdimageBaseUrl: 'https://mirrors.ustc.edu.cn/',
        hasFullCdimage: true,
        sponsor: 'USTC LUG',
      },
      {
        id: 'tsinghua',
        countryCode: 'CN',
        name: { zh: '清华大学 TUNA', en: 'Tsinghua TUNA' },
        shortName: 'TUNA',
        cdImageBaseUrl: 'https://mirrors.tuna.tsinghua.edu.cn/debian-cd/',
        cdimageBaseUrl: 'https://mirrors.tuna.tsinghua.edu.cn/',
        hasFullCdimage: true,
        sponsor: 'TUNA Association',
      },
      {
        id: 'aliyun',
        countryCode: 'CN',
        name: { zh: '阿里云', en: 'Alibaba Cloud' },
        shortName: 'Aliyun',
        cdImageBaseUrl: 'https://mirrors.aliyun.com/debian-cd/',
      },
      {
        id: 'huawei',
        countryCode: 'CN',
        name: { zh: '华为云', en: 'Huawei Cloud' },
        shortName: 'Huawei',
        cdImageBaseUrl: 'https://mirrors.huaweicloud.com/debian-cd/',
      },
      {
        id: 'tencent',
        countryCode: 'CN',
        name: { zh: '腾讯云', en: 'Tencent Cloud' },
        shortName: 'Tencent',
        cdImageBaseUrl: 'https://mirrors.cloud.tencent.com/debian-cd/',
      },
    ],
  },
  {
    code: 'JP',
    name: { zh: '日本', en: 'Japan' },
    region: 'asia',
    mirrors: [
      {
        id: 'jaist',
        countryCode: 'JP',
        name: { zh: 'JAIST', en: 'JAIST' },
        shortName: 'JAIST',
        cdImageBaseUrl: 'https://ftp.jaist.ac.jp/debian-cd/',
      },
      {
        id: 'jp-official',
        countryCode: 'JP',
        name: { zh: '日本官方镜像', en: 'Japan official mirror' },
        shortName: 'JP',
        cdImageBaseUrl: 'https://ftp.jp.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'KR',
    name: { zh: '韩国', en: 'South Korea' },
    region: 'asia',
    mirrors: [
      {
        id: 'kaist',
        countryCode: 'KR',
        name: { zh: 'KAIST', en: 'KAIST' },
        shortName: 'KAIST',
        cdImageBaseUrl: 'https://ftp.kaist.ac.kr/debian-cd/',
      },
    ],
  },
  {
    code: 'SG',
    name: { zh: '新加坡', en: 'Singapore' },
    region: 'asia',
    mirrors: [
      {
        id: 'sg-official',
        countryCode: 'SG',
        name: { zh: '新加坡官方镜像', en: 'Singapore official mirror' },
        shortName: 'SG',
        cdImageBaseUrl: 'https://ftp.sg.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'DE',
    name: { zh: '德国', en: 'Germany' },
    region: 'europe',
    mirrors: [
      {
        id: 'de-official',
        countryCode: 'DE',
        name: { zh: '德国官方镜像', en: 'Germany official mirror' },
        shortName: 'DE',
        cdImageBaseUrl: 'https://ftp.de.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'FR',
    name: { zh: '法国', en: 'France' },
    region: 'europe',
    mirrors: [
      {
        id: 'fr-official',
        countryCode: 'FR',
        name: { zh: '法国官方镜像', en: 'France official mirror' },
        shortName: 'FR',
        cdImageBaseUrl: 'https://ftp.fr.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'GB',
    name: { zh: '英国', en: 'United Kingdom' },
    region: 'europe',
    mirrors: [
      {
        id: 'gb-official',
        countryCode: 'GB',
        name: { zh: '英国官方镜像', en: 'UK official mirror' },
        shortName: 'UK',
        cdImageBaseUrl: 'https://ftp.uk.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'NL',
    name: { zh: '荷兰', en: 'Netherlands' },
    region: 'europe',
    mirrors: [
      {
        id: 'nl-official',
        countryCode: 'NL',
        name: { zh: '荷兰官方镜像', en: 'Netherlands official mirror' },
        shortName: 'NL',
        cdImageBaseUrl: 'https://ftp.nl.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'US',
    name: { zh: '美国', en: 'United States' },
    region: 'americas',
    mirrors: [
      {
        id: 'kernel-org',
        countryCode: 'US',
        name: { zh: 'Kernel.org', en: 'Kernel.org' },
        shortName: 'Kernel.org',
        cdImageBaseUrl: 'https://mirrors.kernel.org/debian-cd/',
      },
      {
        id: 'mit',
        countryCode: 'US',
        name: { zh: 'MIT CSAIL', en: 'MIT CSAIL' },
        shortName: 'MIT',
        cdImageBaseUrl: 'https://mirrors.csail.mit.edu/debian-cd/',
      },
      {
        id: 'us-official',
        countryCode: 'US',
        name: { zh: '美国官方镜像', en: 'US official mirror' },
        shortName: 'US',
        cdImageBaseUrl: 'https://ftp.us.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'CA',
    name: { zh: '加拿大', en: 'Canada' },
    region: 'americas',
    mirrors: [
      {
        id: 'ca-official',
        countryCode: 'CA',
        name: { zh: '加拿大官方镜像', en: 'Canada official mirror' },
        shortName: 'CA',
        cdImageBaseUrl: 'https://ftp.ca.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'BR',
    name: { zh: '巴西', en: 'Brazil' },
    region: 'americas',
    mirrors: [
      {
        id: 'br-official',
        countryCode: 'BR',
        name: { zh: '巴西官方镜像', en: 'Brazil official mirror' },
        shortName: 'BR',
        cdImageBaseUrl: 'https://ftp.br.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'AU',
    name: { zh: '澳大利亚', en: 'Australia' },
    region: 'oceania',
    mirrors: [
      {
        id: 'au-official',
        countryCode: 'AU',
        name: { zh: '澳大利亚官方镜像', en: 'Australia official mirror' },
        shortName: 'AU',
        cdImageBaseUrl: 'https://ftp.au.debian.org/debian-cd/',
      },
    ],
  },
];

export const architectures: Architecture[] = [
  {
    id: 'amd64',
    label: 'amd64',
    description: { zh: '64 位 PC / 笔记本', en: '64-bit PC / laptop' },
  },
  {
    id: 'arm64',
    label: 'arm64',
    description: { zh: 'ARM 64 位设备', en: 'ARM 64-bit devices' },
  },
  {
    id: 'i386',
    label: 'i386',
    description: { zh: '旧 32 位 PC', en: 'Legacy 32-bit PC' },
  },
];

export const imageTypes: ImageType[] = [
  {
    id: 'netinst',
    kind: 'cd',
    label: { zh: '网络安装', en: 'Network install' },
    description: { zh: '体积小，安装时联网获取软件包', en: 'Small image, downloads packages during install' },
    size: { zh: '约 650 MB', en: 'About 650 MB' },
    recommended: true,
    architectures: ['amd64', 'arm64', 'i386'],
  },
  {
    id: 'dvd',
    kind: 'dvd',
    label: { zh: '完整 DVD', en: 'Full DVD' },
    description: { zh: '适合离线安装，只需第 1 张 DVD', en: 'For offline install, only DVD 1 is needed' },
    size: { zh: '约 4 GB', en: 'About 4 GB' },
    architectures: ['amd64', 'arm64', 'i386'],
  },
  {
    id: 'live-gnome',
    kind: 'live',
    label: { zh: 'Live GNOME', en: 'Live GNOME' },
    description: { zh: '先体验图形桌面，再安装', en: 'Try a graphical desktop before installing' },
    size: { zh: '约 3.5 GB', en: 'About 3.5 GB' },
    architectures: ['amd64'],
  },
  {
    id: 'live-xfce',
    kind: 'live',
    label: { zh: 'Live XFCE', en: 'Live XFCE' },
    description: { zh: '较轻量的 Live 桌面', en: 'Lighter live desktop' },
    size: { zh: '约 3.6 GB', en: 'About 3.6 GB' },
    architectures: ['amd64'],
  },
  {
    id: 'live-standard',
    kind: 'live',
    label: { zh: 'Live 标准版', en: 'Live standard' },
    description: { zh: '文本界面，体积更小', en: 'Text interface, smaller image' },
    size: { zh: '约 1.9 GB', en: 'About 1.9 GB' },
    architectures: ['amd64'],
  },
];

export const debianVersions: DebianVersion[] = [
  {
    id: 'trixie',
    codename: 'Trixie',
    number: '13',
    imageVersion: '13.5.0',
    channel: 'stable',
    label: { zh: 'Debian 13 Trixie', en: 'Debian 13 Trixie' },
    description: { zh: '当前稳定版，推荐大多数新安装', en: 'Current stable release, recommended for most installs' },
    badge: { zh: '推荐', en: 'Recommended' },
    architectures: ['amd64', 'arm64'],
    imageTypes: ['netinst', 'dvd', 'live-gnome', 'live-xfce', 'live-standard'],
  },
  {
    id: 'bookworm',
    codename: 'Bookworm',
    number: '12',
    imageVersion: '12.14.0',
    channel: 'oldstable',
    label: { zh: 'Debian 12 Bookworm', en: 'Debian 12 Bookworm' },
    description: { zh: '旧稳定版，适合维护现有 Debian 12 系统', en: 'Oldstable, useful for existing Debian 12 fleets' },
    badge: { zh: '旧稳定版', en: 'Oldstable' },
    architectures: ['amd64', 'arm64', 'i386'],
    imageTypes: ['netinst', 'dvd'],
  },
  {
    id: 'forky',
    codename: 'Forky',
    number: '14',
    imageVersion: 'testing',
    channel: 'testing',
    label: { zh: 'Testing Forky', en: 'Testing Forky' },
    description: { zh: '下一个稳定版的开发分支', en: 'Development branch for the next stable release' },
    badge: { zh: '测试版', en: 'Testing' },
    warning: {
      zh: 'Testing 镜像可能变化或损坏，不建议用于生产环境。',
      en: 'Testing images can change or break and are not recommended for production.',
    },
    architectures: ['amd64', 'arm64'],
    imageTypes: ['netinst'],
  },
];

export function localize(text: LocalizedText, locale: string): string {
  return locale === 'zh' ? text.zh : text.en;
}

export function getVersion(id: string): DebianVersion {
  return debianVersions.find((version) => version.id === id) ?? debianVersions[0];
}

export function getArchitecture(id: string): Architecture {
  return architectures.find((arch) => arch.id === id) ?? architectures[0];
}

export function getImageType(id: string): ImageType {
  return imageTypes.find((type) => type.id === id) ?? imageTypes[0];
}

export function getMirror(id: string): Mirror {
  if (id === OFFICIAL_MIRROR.id) return OFFICIAL_MIRROR;

  for (const country of countries) {
    const mirror = country.mirrors.find((item) => item.id === id);
    if (mirror) return mirror;
  }

  return OFFICIAL_MIRROR;
}

export function getMirrorCountryCode(id: string): string {
  if (id === OFFICIAL_MIRROR.id) return '';

  for (const country of countries) {
    if (country.mirrors.some((mirror) => mirror.id === id)) return country.code;
  }

  return '';
}

export function getCountry(code: string): Country | undefined {
  return countries.find((country) => country.code === code);
}

export function getAvailableArchitectures(version: DebianVersion): Architecture[] {
  return architectures.filter((arch) => version.architectures.includes(arch.id));
}

export function getAvailableImageTypes(version: DebianVersion, architecture: ArchitectureId): ImageType[] {
  return imageTypes.filter(
    (type) => version.imageTypes.includes(type.id) && type.architectures.includes(architecture),
  );
}

export function getDefaultCountryCode(locale: string): string {
  if (locale === 'zh') return 'CN';
  if (typeof navigator === 'undefined') return '';

  const language = navigator.language.toLowerCase();
  if (language.startsWith('zh')) return 'CN';
  if (language.startsWith('ja')) return 'JP';
  if (language.startsWith('ko')) return 'KR';
  if (language.startsWith('de')) return 'DE';
  if (language.startsWith('fr')) return 'FR';
  if (language.includes('gb')) return 'GB';
  if (language.includes('br')) return 'BR';
  if (language.includes('ca')) return 'CA';
  if (language.includes('au')) return 'AU';
  if (language.includes('us')) return 'US';
  return '';
}

export function getCountryMirror(countryCode: string): Mirror {
  return getCountry(countryCode)?.mirrors[0] ?? OFFICIAL_MIRROR;
}

export function groupCountries(locale: string): Array<Region & { countries: Country[] }> {
  const priority = locale === 'zh' ? 'CN' : 'US';
  const order: RegionId[] = locale === 'zh'
    ? ['asia', 'americas', 'europe', 'oceania']
    : ['americas', 'europe', 'asia', 'oceania'];

  return [...regions]
    .sort((left, right) => order.indexOf(left.id) - order.indexOf(right.id))
    .map((region) => ({
      ...region,
      countries: countries
        .filter((country) => country.region === region.id)
        .sort((left, right) => {
          if (left.code === priority) return -1;
          if (right.code === priority) return 1;
          return localize(left.name, locale).localeCompare(localize(right.name, locale));
        }),
    }))
    .filter((region) => region.countries.length > 0);
}

export function buildDownloadUrls(
  version: DebianVersion,
  architecture: ArchitectureId,
  imageType: ImageType,
  selectedMirror: Mirror,
): DownloadUrls {
  const mirror = getEffectiveMirror(version, selectedMirror);
  const fileName = getFileName(version, architecture, imageType);
  const directoryUrl = getDirectoryUrl(version, architecture, imageType, mirror);
  const imageUrl = `${directoryUrl}${fileName}`;
  const checksumUrl = `${directoryUrl}SHA256SUMS`;

  return {
    fileName,
    imageUrl,
    directoryUrl,
    checksumUrl,
    signatureUrl: `${checksumUrl}.sign`,
    torrentUrl: getTorrentUrl(version, architecture, imageType, mirror, fileName),
    sourceMirror: mirror,
    usingOfficialFallback: mirror.id !== selectedMirror.id,
  };
}

function getEffectiveMirror(version: DebianVersion, selectedMirror: Mirror): Mirror {
  if (version.channel === 'oldstable') return OFFICIAL_MIRROR;
  if (version.channel === 'testing') return OFFICIAL_MIRROR;
  return selectedMirror;
}

function getFileName(version: DebianVersion, architecture: ArchitectureId, imageType: ImageType): string {
  if (version.channel === 'testing') return `debian-testing-${architecture}-netinst.iso`;

  if (imageType.kind === 'live') {
    const variant = imageType.id.replace('live-', '');
    return `debian-live-${version.imageVersion}-${architecture}-${variant}.iso`;
  }

  if (imageType.kind === 'dvd') return `debian-${version.imageVersion}-${architecture}-DVD-1.iso`;

  return `debian-${version.imageVersion}-${architecture}-netinst.iso`;
}

function getDirectoryUrl(
  version: DebianVersion,
  architecture: ArchitectureId,
  imageType: ImageType,
  mirror: Mirror,
): string {
  if (version.channel === 'oldstable') {
    const imageDirectory = imageType.kind === 'dvd' ? 'iso-dvd' : 'iso-cd';
    return `${OFFICIAL_CDIMAGE_ROOT}cdimage/archive/${version.imageVersion}/${architecture}/${imageDirectory}/`;
  }

  if (version.channel === 'testing') {
    const baseUrl = mirror.cdimageBaseUrl ?? OFFICIAL_CDIMAGE_ROOT;
    return `${baseUrl}cdimage/weekly-builds/${architecture}/iso-cd/`;
  }

  if (imageType.kind === 'live') {
    return `${mirror.cdImageBaseUrl}current-live/${architecture}/iso-hybrid/`;
  }

  const imageDirectory = imageType.kind === 'dvd' ? 'iso-dvd' : 'iso-cd';
  return `${mirror.cdImageBaseUrl}current/${architecture}/${imageDirectory}/`;
}

function getTorrentUrl(
  version: DebianVersion,
  architecture: ArchitectureId,
  imageType: ImageType,
  mirror: Mirror,
  fileName: string,
): string {
  if (version.channel !== 'stable') return '';

  if (imageType.kind === 'live') {
    return `${mirror.cdImageBaseUrl}current-live/${architecture}/bt-hybrid/${fileName}.torrent`;
  }

  const torrentDirectory = imageType.kind === 'dvd' ? 'bt-dvd' : 'bt-cd';
  return `${mirror.cdImageBaseUrl}current/${architecture}/${torrentDirectory}/${fileName}.torrent`;
}
