import type { Mirror } from './mirrors'

export type VersionChannel = 'stable' | 'oldstable' | 'testing' | 'unstable'

export interface Architecture {
  id: string
  label: string
  description: { zh: string; en: string }
}

export interface IsoType {
  id: 'netinst' | 'dvd' | 'live'
  label: { zh: string; en: string }
  description: { zh: string; en: string }
  size: string
  recommended?: boolean
}

export interface DebianVersion {
  id: string
  codename: string
  number: string
  pointRelease: string
  channel: VersionChannel
  releaseDate?: string
  eolDate?: string
  label: { zh: string; en: string }
  description: { zh: string; en: string }
  badge: 'success' | 'info' | 'warning' | 'danger'
  architectures: Architecture[]
  isoTypes: IsoType[]
}

export const architectures: Architecture[] = [
  { id: 'amd64', label: 'amd64 (x86_64)', description: { zh: '64 位 PC / 笔记本（推荐）', en: '64-bit PC / Laptop (recommended)' } },
  { id: 'arm64', label: 'arm64 (AArch64)', description: { zh: 'ARM 64 位设备', en: 'ARM 64-bit devices' } },
  { id: 'i386', label: 'i386 (x86)', description: { zh: '32 位旧型计算机', en: '32-bit legacy PCs' } },
  { id: 'armhf', label: 'armhf', description: { zh: 'ARM 32 位设备', en: 'ARM 32-bit devices' } },
  { id: 'ppc64el', label: 'ppc64el', description: { zh: 'IBM POWER8/9', en: 'IBM POWER8/9' } },
  { id: 'riscv64', label: 'riscv64', description: { zh: 'RISC-V 64 位', en: 'RISC-V 64-bit' } },
  { id: 's390x', label: 's390x', description: { zh: 'IBM 大型机', en: 'IBM Mainframe' } },
]

export const isoTypes: IsoType[] = [
  {
    id: 'netinst',
    label: { zh: '网络安装 (netinst)', en: 'Network Install (netinst)' },
    description: { zh: '推荐。体积小，安装时在线获取最新软件包', en: 'Recommended. Small download, fetches latest packages online during install' },
    size: '~650MB',
    recommended: true,
  },
  {
    id: 'dvd',
    label: { zh: '完整 DVD', en: 'Full DVD' },
    description: { zh: '离线安装，包含大量预装软件包', en: 'Offline install with many packages included' },
    size: '~4.7GB',
  },
  {
    id: 'live',
    label: { zh: 'Live 体验版', en: 'Live Image' },
    description: { zh: '无需安装即可体验 Debian，支持从 Live 环境安装', en: 'Try Debian without installing, supports install from live environment' },
    size: '~3GB',
  },
]

export const debianVersions: DebianVersion[] = [
  {
    id: 'trixie',
    codename: 'Trixie',
    number: '13',
    pointRelease: '13.3',
    channel: 'stable',
    releaseDate: '2025-08-09',
    label: { zh: 'Debian 13 (Trixie)', en: 'Debian 13 (Trixie)' },
    description: { zh: '当前稳定版，推荐大多数用户使用', en: 'Current stable release, recommended for most users' },
    badge: 'success',
    architectures: architectures.filter(a => ['amd64', 'arm64', 'i386', 'armhf', 'ppc64el', 'riscv64', 's390x'].includes(a.id)),
    isoTypes: isoTypes,
  },
  {
    id: 'bookworm',
    codename: 'Bookworm',
    number: '12',
    pointRelease: '12.9',
    channel: 'oldstable',
    eolDate: '2028-06-30',
    label: { zh: 'Debian 12 (Bookworm)', en: 'Debian 12 (Bookworm)' },
    description: { zh: '旧稳定版，长期支持至 2028 年', en: 'Previous stable, LTS until 2028' },
    badge: 'info',
    architectures: architectures.filter(a => ['amd64', 'arm64', 'i386', 'armhf', 'ppc64el', 's390x'].includes(a.id)),
    isoTypes: isoTypes.filter(t => t.id !== 'live'),
  },
  {
    id: 'forky',
    codename: 'Forky',
    number: '14',
    pointRelease: '',
    channel: 'testing',
    label: { zh: 'Testing (Forky)', en: 'Testing (Forky)' },
    description: { zh: '下一个稳定版开发中，适合开发者和爱好者', en: 'Next stable in development, for developers and enthusiasts' },
    badge: 'warning',
    architectures: architectures.filter(a => ['amd64', 'arm64', 'i386'].includes(a.id)),
    isoTypes: [isoTypes[0]],
  },
  {
    id: 'sid',
    codename: 'Sid',
    number: '',
    pointRelease: '',
    channel: 'unstable',
    label: { zh: 'Unstable (Sid)', en: 'Unstable (Sid)' },
    description: { zh: '滚动发行，最新软件包，可能不稳定', en: 'Rolling release, latest packages, may be unstable' },
    badge: 'danger',
    architectures: architectures.filter(a => ['amd64', 'arm64'].includes(a.id)),
    isoTypes: [isoTypes[0]],
  },
]

export function buildDownloadUrls(
  version: DebianVersion,
  arch: string,
  isoType: string,
  mirrorCdUrl: string,
  mirrorCdimageUrl?: string,
): { isoUrl: string; torrentUrl: string; checksumUrl: string; directoryUrl: string } {
  const officialCdimage = 'https://cdimage.debian.org/'

  switch (version.channel) {
    case 'stable': {
      const isoDir = isoType === 'dvd' ? 'iso-dvd/' : isoType === 'live' ? 'iso-live/' : 'iso-cd/'
      const dir = `${mirrorCdUrl}current/${arch}/${isoDir}`
      const btDir = isoType === 'dvd' ? 'bt-dvd/' : isoType === 'live' ? 'bt-cd/' : 'bt-cd/'
      return {
        isoUrl: dir,
        torrentUrl: `${mirrorCdUrl}current/${arch}/${btDir}`,
        checksumUrl: `${dir}SHA256SUMS`,
        directoryUrl: dir,
      }
    }
    case 'oldstable': {
      const isoDir = isoType === 'dvd' ? 'iso-dvd/' : 'iso-cd/'
      const dir = `${officialCdimage}cdimage/archive/${version.pointRelease}/${arch}/${isoDir}`
      return {
        isoUrl: dir,
        torrentUrl: '',
        checksumUrl: `${dir}SHA256SUMS`,
        directoryUrl: dir,
      }
    }
    case 'testing': {
      const base = mirrorCdimageUrl || officialCdimage
      const dir = `${base}cdimage/weekly-builds/${arch}/iso-cd/`
      return {
        isoUrl: dir,
        torrentUrl: '',
        checksumUrl: `${dir}SHA256SUMS`,
        directoryUrl: dir,
      }
    }
    case 'unstable': {
      const dir = `${officialCdimage}cdimage/unofficial/non-free/cd-including-firmware/weekly-builds/${arch}/iso-cd/`
      return {
        isoUrl: dir,
        torrentUrl: '',
        checksumUrl: `${dir}SHA256SUMS`,
        directoryUrl: dir,
      }
    }
    default:
      return { isoUrl: '', torrentUrl: '', checksumUrl: '', directoryUrl: '' }
  }
}
