export interface Mirror {
  id: string
  name: { zh: string; en: string }
  cdImageBaseUrl: string
  cdimageBaseUrl?: string
  hasFullCdimage?: boolean
  sponsor?: string
}

export interface Country {
  code: string
  name: { zh: string; en: string }
  flag: string
  region: Region
  mirrors: Mirror[]
}

export type Region = 'asia' | 'europe' | 'americas' | 'oceania'

export const OFFICIAL_MIRROR: Mirror = {
  id: 'official',
  name: { zh: '官方 (cdimage.debian.org)', en: 'Official (cdimage.debian.org)' },
  cdImageBaseUrl: 'https://cdimage.debian.org/debian-cd/',
  cdimageBaseUrl: 'https://cdimage.debian.org/',
  hasFullCdimage: true,
}

export const countries: Country[] = [
  // ===== 亚洲 =====
  {
    code: 'CN', name: { zh: '中国大陆', en: 'China' }, flag: '🇨🇳', region: 'asia',
    mirrors: [
      {
        id: 'ustc', name: { zh: '中国科学技术大学 (USTC)', en: 'USTC Mirror' },
        cdImageBaseUrl: 'https://mirrors.ustc.edu.cn/debian-cd/',
        cdimageBaseUrl: 'https://mirrors.ustc.edu.cn/',
        hasFullCdimage: true, sponsor: 'USTC LUG',
      },
      {
        id: 'tsinghua', name: { zh: '清华大学 (TUNA)', en: 'Tsinghua TUNA' },
        cdImageBaseUrl: 'https://mirrors.tuna.tsinghua.edu.cn/debian-cd/',
        cdimageBaseUrl: 'https://mirrors.tuna.tsinghua.edu.cn/',
        hasFullCdimage: true, sponsor: 'TUNA Association',
      },
      {
        id: 'aliyun', name: { zh: '阿里云', en: 'Alibaba Cloud' },
        cdImageBaseUrl: 'https://mirrors.aliyun.com/debian-cd/',
      },
      {
        id: 'huawei', name: { zh: '华为云', en: 'Huawei Cloud' },
        cdImageBaseUrl: 'https://mirrors.huaweicloud.com/debian-cd/',
      },
      {
        id: 'tencent', name: { zh: '腾讯云', en: 'Tencent Cloud' },
        cdImageBaseUrl: 'https://mirrors.cloud.tencent.com/debian-cd/',
      },
      {
        id: 'netease', name: { zh: '网易', en: 'NetEase' },
        cdImageBaseUrl: 'https://mirrors.163.com/debian-cd/',
      },
      {
        id: 'sjtu', name: { zh: '上海交通大学', en: 'SJTU' },
        cdImageBaseUrl: 'https://mirror.sjtu.edu.cn/debian-cd/',
      },
      {
        id: 'zju', name: { zh: '浙江大学', en: 'ZJU' },
        cdImageBaseUrl: 'https://mirrors.zju.edu.cn/debian-cd/',
      },
    ],
  },
  {
    code: 'JP', name: { zh: '日本', en: 'Japan' }, flag: '🇯🇵', region: 'asia',
    mirrors: [
      {
        id: 'jp-official', name: { zh: '日本官方镜像', en: 'Japan Official' },
        cdImageBaseUrl: 'https://ftp.jp.debian.org/debian-cd/',
      },
      {
        id: 'jaist', name: { zh: 'JAIST', en: 'JAIST' },
        cdImageBaseUrl: 'https://ftp.jaist.ac.jp/debian-cd/',
      },
    ],
  },
  {
    code: 'KR', name: { zh: '韩国', en: 'South Korea' }, flag: '🇰🇷', region: 'asia',
    mirrors: [
      {
        id: 'kr-official', name: { zh: '韩国官方镜像', en: 'Korea Official' },
        cdImageBaseUrl: 'https://ftp.kr.debian.org/debian-cd/',
      },
      {
        id: 'kaist', name: { zh: 'KAIST', en: 'KAIST' },
        cdImageBaseUrl: 'https://ftp.kaist.ac.kr/debian-cd/',
      },
    ],
  },
  {
    code: 'TW', name: { zh: '台湾', en: 'Taiwan' }, flag: '🇹🇼', region: 'asia',
    mirrors: [
      {
        id: 'tw-official', name: { zh: '台湾官方镜像', en: 'Taiwan Official' },
        cdImageBaseUrl: 'https://ftp.tw.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'SG', name: { zh: '新加坡', en: 'Singapore' }, flag: '🇸🇬', region: 'asia',
    mirrors: [
      {
        id: 'sg-official', name: { zh: '新加坡官方镜像', en: 'Singapore Official' },
        cdImageBaseUrl: 'https://ftp.sg.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'IN', name: { zh: '印度', en: 'India' }, flag: '🇮🇳', region: 'asia',
    mirrors: [
      {
        id: 'in-official', name: { zh: '印度官方镜像', en: 'India Official' },
        cdImageBaseUrl: 'https://ftp.in.debian.org/debian-cd/',
      },
    ],
  },

  // ===== 欧洲 =====
  {
    code: 'DE', name: { zh: '德国', en: 'Germany' }, flag: '🇩🇪', region: 'europe',
    mirrors: [
      {
        id: 'de-official', name: { zh: '德国官方镜像', en: 'Germany Official' },
        cdImageBaseUrl: 'https://ftp.de.debian.org/debian-cd/',
      },
      {
        id: 'de-hu-berlin', name: { zh: '柏林洪堡大学', en: 'HU Berlin' },
        cdImageBaseUrl: 'https://ftp.informatik.hu-berlin.de/Mirrors/ftp.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'FR', name: { zh: '法国', en: 'France' }, flag: '🇫🇷', region: 'europe',
    mirrors: [
      {
        id: 'fr-official', name: { zh: '法国官方镜像', en: 'France Official' },
        cdImageBaseUrl: 'https://ftp.fr.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'GB', name: { zh: '英国', en: 'United Kingdom' }, flag: '🇬🇧', region: 'europe',
    mirrors: [
      {
        id: 'gb-official', name: { zh: '英国官方镜像', en: 'UK Official' },
        cdImageBaseUrl: 'https://ftp.uk.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'RU', name: { zh: '俄罗斯', en: 'Russia' }, flag: '🇷🇺', region: 'europe',
    mirrors: [
      {
        id: 'ru-official', name: { zh: '俄罗斯官方镜像', en: 'Russia Official' },
        cdImageBaseUrl: 'https://ftp.ru.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'SE', name: { zh: '瑞典', en: 'Sweden' }, flag: '🇸🇪', region: 'europe',
    mirrors: [
      {
        id: 'se-official', name: { zh: '瑞典官方镜像', en: 'Sweden Official' },
        cdImageBaseUrl: 'https://ftp.se.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'NL', name: { zh: '荷兰', en: 'Netherlands' }, flag: '🇳🇱', region: 'europe',
    mirrors: [
      {
        id: 'nl-official', name: { zh: '荷兰官方镜像', en: 'Netherlands Official' },
        cdImageBaseUrl: 'https://ftp.nl.debian.org/debian-cd/',
      },
    ],
  },

  // ===== 美洲 =====
  {
    code: 'US', name: { zh: '美国', en: 'United States' }, flag: '🇺🇸', region: 'americas',
    mirrors: [
      {
        id: 'us-official', name: { zh: '美国官方镜像', en: 'US Official' },
        cdImageBaseUrl: 'https://ftp.us.debian.org/debian-cd/',
      },
      {
        id: 'mit', name: { zh: 'MIT', en: 'MIT CSAIL' },
        cdImageBaseUrl: 'https://mirrors.csail.mit.edu/debian-cd/',
      },
      {
        id: 'kernel-org', name: { zh: 'Kernel.org', en: 'Kernel.org' },
        cdImageBaseUrl: 'https://mirrors.kernel.org/debian-cd/',
      },
    ],
  },
  {
    code: 'CA', name: { zh: '加拿大', en: 'Canada' }, flag: '🇨🇦', region: 'americas',
    mirrors: [
      {
        id: 'ca-official', name: { zh: '加拿大官方镜像', en: 'Canada Official' },
        cdImageBaseUrl: 'https://ftp.ca.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'BR', name: { zh: '巴西', en: 'Brazil' }, flag: '🇧🇷', region: 'americas',
    mirrors: [
      {
        id: 'br-official', name: { zh: '巴西官方镜像', en: 'Brazil Official' },
        cdImageBaseUrl: 'https://ftp.br.debian.org/debian-cd/',
      },
    ],
  },

  // ===== 大洋洲 =====
  {
    code: 'AU', name: { zh: '澳大利亚', en: 'Australia' }, flag: '🇦🇺', region: 'oceania',
    mirrors: [
      {
        id: 'au-official', name: { zh: '澳大利亚官方镜像', en: 'Australia Official' },
        cdImageBaseUrl: 'https://ftp.au.debian.org/debian-cd/',
      },
    ],
  },
  {
    code: 'NZ', name: { zh: '新西兰', en: 'New Zealand' }, flag: '🇳🇿', region: 'oceania',
    mirrors: [
      {
        id: 'nz-official', name: { zh: '新西兰官方镜像', en: 'New Zealand Official' },
        cdImageBaseUrl: 'https://ftp.nz.debian.org/debian-cd/',
      },
    ],
  },
]

export const regions: { id: Region; name: { zh: string; en: string } }[] = [
  { id: 'asia', name: { zh: '亚洲', en: 'Asia' } },
  { id: 'europe', name: { zh: '欧洲', en: 'Europe' } },
  { id: 'americas', name: { zh: '美洲', en: 'Americas' } },
  { id: 'oceania', name: { zh: '大洋洲', en: 'Oceania' } },
]

export function getDefaultCountryCode(): string {
  if (typeof navigator === 'undefined') return ''
  const lang = navigator.language || ''
  if (lang.startsWith('zh')) return 'CN'
  if (lang.startsWith('ja')) return 'JP'
  if (lang.startsWith('ko')) return 'KR'
  if (lang.startsWith('de')) return 'DE'
  if (lang.startsWith('fr')) return 'FR'
  if (lang.startsWith('ru')) return 'RU'
  if (lang.includes('BR')) return 'BR'
  return ''
}
