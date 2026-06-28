// Landing-page copy. zh + en authored; other locales fall back to en for now
// (full localisation is a follow-on, like the infographics were).
export interface LandingStrings {
  tagline: string;
  actions: { label: string; href: string; primary?: boolean }[];
  features: { title: string; detail: string }[];
  pathTitle: string;
  steps: { title: string; links: { label: string; href: string }[] }[];
  tryTitle: string;
  tryText: string;
  ctaLabel: string;
  ctaHref: string;
}

const en: LandingStrings = {
  tagline: 'Learn Debian 13 from zero · the most stable Linux distribution',
  actions: [
    { label: 'Get started', href: '/basics/introduction', primary: true },
    { label: 'Download', href: '/download' },
    { label: 'Tutorials', href: '/basics/installation' },
  ],
  features: [
    { title: 'Free', detail: 'All content is free, no sign-up, available anytime.' },
    { title: 'Beginner-friendly', detail: 'Designed for Linux newcomers, with detailed steps.' },
    { title: 'Practical', detail: 'Real, copy-paste-ready commands and configuration.' },
    { title: 'Multilingual', detail: 'Available in 8 languages, more being added.' },
    { title: 'Responsive', detail: 'Works on phone, tablet and desktop.' },
    { title: 'Up to date', detail: 'Tracks Debian 13 changes; kept current.' },
  ],
  pathTitle: 'Learn Debian in 4 steps',
  steps: [
    {
      title: '1. Basics & prep',
      links: [
        { label: 'Introduction', href: '/basics/introduction' },
        { label: "What's new", href: '/basics/whats-new' },
        { label: 'Requirements', href: '/basics/requirements' },
      ],
    },
    {
      title: '2. Install',
      links: [
        { label: 'Bootable media', href: '/basics/bootable-media' },
        { label: 'Installation', href: '/basics/installation' },
        { label: 'First boot', href: '/basics/first-boot' },
      ],
    },
    {
      title: '3. Configure',
      links: [
        { label: 'Configuration', href: '/basics/configuration' },
        { label: 'Desktop environments', href: '/basics/desktop-environments' },
        { label: 'Packages', href: '/administration/packages' },
      ],
    },
    {
      title: '4. Daily use',
      links: [
        { label: 'Users & permissions', href: '/administration/users' },
        { label: 'Network', href: '/administration/network' },
        { label: 'Applications', href: '/applications' },
      ],
    },
  ],
  tryTitle: 'Try Debian quickly',
  tryText: 'Run it in a virtual machine, from a live USB, dual-boot, or go all in.',
  ctaLabel: 'More quality sites → Friend Links',
  ctaHref: '/links',
};

const zh: LandingStrings = {
  tagline: '从零开始学习 Debian 13 · 最稳定的 Linux 发行版',
  actions: [
    { label: '🚀 开始学习', href: '/basics/introduction', primary: true },
    { label: '📥 系统下载', href: '/download' },
    { label: '📖 查看教程', href: '/basics/installation' },
  ],
  features: [
    { title: '完全免费', detail: '所有内容完全免费，无需注册，随时访问学习。' },
    { title: '初学者友好', detail: '专为 Linux 新手设计，提供详尽步骤与截图。' },
    { title: '实用教程', detail: '真实可操作的命令与配置，复制粘贴即可用。' },
    { title: '多语言支持', detail: '提供 8 种语言版本，更多语言陆续添加。' },
    { title: '响应式设计', detail: '完美适配手机、平板与桌面设备。' },
    { title: '持续更新', detail: '紧跟 Debian 13 变化，内容及时更新。' },
  ],
  pathTitle: '4 步学会 Debian',
  steps: [
    {
      title: '1. 基础入门',
      links: [
        { label: 'Debian 13 介绍', href: '/basics/introduction' },
        { label: 'Debian 13 新特性', href: '/basics/whats-new' },
        { label: '系统要求', href: '/basics/requirements' },
      ],
    },
    {
      title: '2. 系统安装',
      links: [
        { label: '制作启动盘', href: '/basics/bootable-media' },
        { label: '安装过程详解', href: '/basics/installation' },
        { label: '首次启动配置', href: '/basics/first-boot' },
      ],
    },
    {
      title: '3. 系统配置',
      links: [
        { label: '基本系统配置', href: '/basics/configuration' },
        { label: '选择桌面环境', href: '/basics/desktop-environments' },
        { label: '安装常用软件', href: '/administration/packages' },
      ],
    },
    {
      title: '4. 日常使用',
      links: [
        { label: '用户与权限', href: '/administration/users' },
        { label: '网络设置', href: '/administration/network' },
        { label: '常用应用', href: '/applications' },
      ],
    },
  ],
  tryTitle: '快速体验 Debian',
  tryText: '用虚拟机安装、Live USB 体验、双系统安装，或完整替换。',
  ctaLabel: '🔗 更多优质站点 → 友情链接',
  ctaHref: '/links',
};

const de: LandingStrings = {
  "tagline": "Debian 13 von Grund auf lernen · die stabilste Linux-Distribution",
  "actions": [
    { "label": "Loslegen", "href": "/basics/introduction", "primary": true },
    { "label": "Herunterladen", "href": "/download" },
    { "label": "Anleitungen", "href": "/basics/installation" }
  ],
  "features": [
    { "title": "Kostenlos", "detail": "Alle Inhalte sind kostenlos, ohne Anmeldung und jederzeit verfügbar." },
    { "title": "Einsteigerfreundlich", "detail": "Für Linux-Neulinge konzipiert, mit detaillierten Schritten." },
    { "title": "Praxisnah", "detail": "Echte, sofort einsetzbare Befehle und Konfigurationen." },
    { "title": "Mehrsprachig", "detail": "In 8 Sprachen verfügbar, weitere kommen hinzu." },
    { "title": "Responsiv", "detail": "Funktioniert auf Smartphone, Tablet und Desktop." },
    { "title": "Aktuell", "detail": "Verfolgt die Änderungen von Debian 13 und bleibt aktuell." }
  ],
  "pathTitle": "Debian in 4 Schritten lernen",
  "steps": [
    { "title": "1. Grundlagen & Vorbereitung", "links": [ { "label": "Einführung", "href": "/basics/introduction" }, { "label": "Was ist neu", "href": "/basics/whats-new" }, { "label": "Voraussetzungen", "href": "/basics/requirements" } ] },
    { "title": "2. Installieren", "links": [ { "label": "Bootfähiger Datenträger", "href": "/basics/bootable-media" }, { "label": "Installation", "href": "/basics/installation" }, { "label": "Erster Start", "href": "/basics/first-boot" } ] },
    { "title": "3. Konfigurieren", "links": [ { "label": "Konfiguration", "href": "/basics/configuration" }, { "label": "Desktop-Umgebungen", "href": "/basics/desktop-environments" }, { "label": "Pakete", "href": "/administration/packages" } ] },
    { "title": "4. Tägliche Nutzung", "links": [ { "label": "Benutzer & Berechtigungen", "href": "/administration/users" }, { "label": "Netzwerk", "href": "/administration/network" }, { "label": "Anwendungen", "href": "/applications" } ] }
  ],
  "tryTitle": "Debian schnell ausprobieren",
  "tryText": "Führen Sie es in einer virtuellen Maschine aus, von einem Live-USB-Stick, im Dual-Boot oder voll und ganz.",
  "ctaLabel": "🔗 Weitere hochwertige Seiten → Partnerlinks",
  "ctaHref": "/links"
};

const es: LandingStrings = {
  "tagline": "Aprende Debian 13 desde cero · la distribución de Linux más estable",
  "actions": [
    { "label": "Empezar", "href": "/basics/introduction", "primary": true },
    { "label": "Descargar", "href": "/download" },
    { "label": "Tutoriales", "href": "/basics/installation" }
  ],
  "features": [
    { "title": "Gratis", "detail": "Todo el contenido es gratuito, sin registro y disponible en cualquier momento." },
    { "title": "Apto para principiantes", "detail": "Diseñado para quienes se inician en Linux, con pasos detallados." },
    { "title": "Práctico", "detail": "Comandos y configuraciones reales, listos para copiar y pegar." },
    { "title": "Multilingüe", "detail": "Disponible en 8 idiomas, y se añaden más." },
    { "title": "Adaptable", "detail": "Funciona en móvil, tableta y ordenador." },
    { "title": "Actualizado", "detail": "Sigue los cambios de Debian 13; siempre al día." }
  ],
  "pathTitle": "Aprende Debian en 4 pasos",
  "steps": [
    { "title": "1. Conceptos básicos y preparación", "links": [ { "label": "Introducción", "href": "/basics/introduction" }, { "label": "Novedades", "href": "/basics/whats-new" }, { "label": "Requisitos", "href": "/basics/requirements" } ] },
    { "title": "2. Instalar", "links": [ { "label": "Medio de arranque", "href": "/basics/bootable-media" }, { "label": "Instalación", "href": "/basics/installation" }, { "label": "Primer arranque", "href": "/basics/first-boot" } ] },
    { "title": "3. Configurar", "links": [ { "label": "Configuración", "href": "/basics/configuration" }, { "label": "Entornos de escritorio", "href": "/basics/desktop-environments" }, { "label": "Paquetes", "href": "/administration/packages" } ] },
    { "title": "4. Uso diario", "links": [ { "label": "Usuarios y permisos", "href": "/administration/users" }, { "label": "Red", "href": "/administration/network" }, { "label": "Aplicaciones", "href": "/applications" } ] }
  ],
  "tryTitle": "Prueba Debian rápidamente",
  "tryText": "Ejecútalo en una máquina virtual, desde un USB en vivo, en arranque dual o lánzate de lleno.",
  "ctaLabel": "🔗 Más sitios de calidad → Enlaces amigos",
  "ctaHref": "/links"
};

const fr: LandingStrings = {
  "tagline": "Apprenez Debian 13 à partir de zéro · la distribution Linux la plus stable",
  "actions": [
    { "label": "Commencer", "href": "/basics/introduction", "primary": true },
    { "label": "Télécharger", "href": "/download" },
    { "label": "Tutoriels", "href": "/basics/installation" }
  ],
  "features": [
    { "title": "Gratuit", "detail": "Tout le contenu est gratuit, sans inscription, accessible à tout moment." },
    { "title": "Accessible aux débutants", "detail": "Conçu pour les nouveaux venus sous Linux, avec des étapes détaillées." },
    { "title": "Pratique", "detail": "Des commandes et configurations réelles, prêtes à copier-coller." },
    { "title": "Multilingue", "detail": "Disponible en 8 langues, avec d'autres à venir." },
    { "title": "Responsive", "detail": "Fonctionne sur téléphone, tablette et ordinateur." },
    { "title": "À jour", "detail": "Suit les évolutions de Debian 13 ; toujours actualisé." }
  ],
  "pathTitle": "Apprenez Debian en 4 étapes",
  "steps": [
    { "title": "1. Bases et préparation", "links": [ { "label": "Introduction", "href": "/basics/introduction" }, { "label": "Nouveautés", "href": "/basics/whats-new" }, { "label": "Prérequis", "href": "/basics/requirements" } ] },
    { "title": "2. Installer", "links": [ { "label": "Média amorçable", "href": "/basics/bootable-media" }, { "label": "Installation", "href": "/basics/installation" }, { "label": "Premier démarrage", "href": "/basics/first-boot" } ] },
    { "title": "3. Configurer", "links": [ { "label": "Configuration", "href": "/basics/configuration" }, { "label": "Environnements de bureau", "href": "/basics/desktop-environments" }, { "label": "Paquets", "href": "/administration/packages" } ] },
    { "title": "4. Usage quotidien", "links": [ { "label": "Utilisateurs et permissions", "href": "/administration/users" }, { "label": "Réseau", "href": "/administration/network" }, { "label": "Applications", "href": "/applications" } ] }
  ],
  "tryTitle": "Essayer Debian rapidement",
  "tryText": "Lancez-le dans une machine virtuelle, depuis une clé USB live, en dual-boot, ou foncez à fond.",
  "ctaLabel": "🔗 Plus de sites de qualité → Liens amis",
  "ctaHref": "/links"
};

const ja: LandingStrings = {
  "tagline": "ゼロから学ぶDebian 13・最も安定したLinuxディストリビューション",
  "actions": [
    { "label": "始める", "href": "/basics/introduction", "primary": true },
    { "label": "ダウンロード", "href": "/download" },
    { "label": "チュートリアル", "href": "/basics/installation" }
  ],
  "features": [
    { "title": "無料", "detail": "すべてのコンテンツが無料、登録不要、いつでも利用できます。" },
    { "title": "初心者にやさしい", "detail": "Linux初心者向けに、手順を丁寧に解説しています。" },
    { "title": "実践的", "detail": "そのままコピー＆ペーストで使えるコマンドと設定を掲載。" },
    { "title": "多言語対応", "detail": "8言語に対応、さらに追加中です。" },
    { "title": "レスポンシブ", "detail": "スマートフォン、タブレット、デスクトップで利用できます。" },
    { "title": "最新の情報", "detail": "Debian 13の変更を追跡し、常に最新の状態を保ちます。" }
  ],
  "pathTitle": "4ステップでDebianを学ぶ",
  "steps": [
    { "title": "1. 基礎と準備", "links": [ { "label": "はじめに", "href": "/basics/introduction" }, { "label": "新機能", "href": "/basics/whats-new" }, { "label": "動作要件", "href": "/basics/requirements" } ] },
    { "title": "2. インストール", "links": [ { "label": "起動メディア", "href": "/basics/bootable-media" }, { "label": "インストール", "href": "/basics/installation" }, { "label": "初回起動", "href": "/basics/first-boot" } ] },
    { "title": "3. 設定", "links": [ { "label": "設定", "href": "/basics/configuration" }, { "label": "デスクトップ環境", "href": "/basics/desktop-environments" }, { "label": "パッケージ", "href": "/administration/packages" } ] },
    { "title": "4. 日常の利用", "links": [ { "label": "ユーザーと権限", "href": "/administration/users" }, { "label": "ネットワーク", "href": "/administration/network" }, { "label": "アプリケーション", "href": "/applications" } ] }
  ],
  "tryTitle": "手軽にDebianを試す",
  "tryText": "仮想マシン、ライブUSB、デュアルブートで実行したり、思い切って全面導入したりできます。",
  "ctaLabel": "🔗 その他の優良サイト → 友情リンク",
  "ctaHref": "/links"
};

const ko: LandingStrings = {
  "tagline": "Debian 13을 처음부터 배우기 · 가장 안정적인 리눅스 배포판",
  "actions": [
    { "label": "시작하기", "href": "/basics/introduction", "primary": true },
    { "label": "다운로드", "href": "/download" },
    { "label": "튜토리얼", "href": "/basics/installation" }
  ],
  "features": [
    { "title": "무료", "detail": "모든 콘텐츠가 무료이며, 가입 없이 언제든지 이용할 수 있습니다." },
    { "title": "초보자 친화적", "detail": "리눅스 입문자를 위해 설계되었으며, 단계별로 자세히 설명합니다." },
    { "title": "실용적", "detail": "복사해서 바로 붙여넣을 수 있는 실제 명령어와 설정을 제공합니다." },
    { "title": "다국어 지원", "detail": "8개 언어로 제공되며, 계속 추가되고 있습니다." },
    { "title": "반응형", "detail": "휴대폰, 태블릿, 데스크톱에서 모두 작동합니다." },
    { "title": "최신 정보", "detail": "Debian 13의 변경 사항을 반영하여 항상 최신 상태로 유지됩니다." }
  ],
  "pathTitle": "4단계로 Debian 배우기",
  "steps": [
    { "title": "1. 기초 및 준비", "links": [ { "label": "소개", "href": "/basics/introduction" }, { "label": "새로운 기능", "href": "/basics/whats-new" }, { "label": "요구 사항", "href": "/basics/requirements" } ] },
    { "title": "2. 설치", "links": [ { "label": "부팅 미디어", "href": "/basics/bootable-media" }, { "label": "설치", "href": "/basics/installation" }, { "label": "첫 부팅", "href": "/basics/first-boot" } ] },
    { "title": "3. 설정", "links": [ { "label": "환경 설정", "href": "/basics/configuration" }, { "label": "데스크톱 환경", "href": "/basics/desktop-environments" }, { "label": "패키지", "href": "/administration/packages" } ] },
    { "title": "4. 일상 사용", "links": [ { "label": "사용자 및 권한", "href": "/administration/users" }, { "label": "네트워크", "href": "/administration/network" }, { "label": "애플리케이션", "href": "/applications" } ] }
  ],
  "tryTitle": "Debian 빠르게 체험하기",
  "tryText": "가상 머신, 라이브 USB, 듀얼 부팅으로 실행하거나 전면 도입해 보세요.",
  "ctaLabel": "🔗 더 많은 우수 사이트 → 친구 링크",
  "ctaHref": "/links"
};

const pt: LandingStrings = {
  "tagline": "Aprenda o Debian 13 do zero · a distribuição Linux mais estável",
  "actions": [
    { "label": "Começar", "href": "/basics/introduction", "primary": true },
    { "label": "Baixar", "href": "/download" },
    { "label": "Tutoriais", "href": "/basics/installation" }
  ],
  "features": [
    { "title": "Gratuito", "detail": "Todo o conteúdo é gratuito, sem cadastro, disponível a qualquer momento." },
    { "title": "Para iniciantes", "detail": "Feito para quem está começando no Linux, com passos detalhados." },
    { "title": "Prático", "detail": "Comandos e configurações reais, prontos para copiar e colar." },
    { "title": "Multilíngue", "detail": "Disponível em 8 idiomas, com mais sendo adicionados." },
    { "title": "Responsivo", "detail": "Funciona no celular, tablet e computador." },
    { "title": "Atualizado", "detail": "Acompanha as mudanças do Debian 13; sempre em dia." }
  ],
  "pathTitle": "Aprenda o Debian em 4 passos",
  "steps": [
    { "title": "1. Fundamentos e preparação", "links": [ { "label": "Introdução", "href": "/basics/introduction" }, { "label": "Novidades", "href": "/basics/whats-new" }, { "label": "Requisitos", "href": "/basics/requirements" } ] },
    { "title": "2. Instalação", "links": [ { "label": "Mídia de inicialização", "href": "/basics/bootable-media" }, { "label": "Instalação", "href": "/basics/installation" }, { "label": "Primeira inicialização", "href": "/basics/first-boot" } ] },
    { "title": "3. Configuração", "links": [ { "label": "Configuração", "href": "/basics/configuration" }, { "label": "Ambientes de desktop", "href": "/basics/desktop-environments" }, { "label": "Pacotes", "href": "/administration/packages" } ] },
    { "title": "4. Uso diário", "links": [ { "label": "Usuários e permissões", "href": "/administration/users" }, { "label": "Rede", "href": "/administration/network" }, { "label": "Aplicativos", "href": "/applications" } ] }
  ],
  "tryTitle": "Experimente o Debian rapidamente",
  "tryText": "Execute-o em uma máquina virtual, a partir de um USB live, em dual-boot ou de vez.",
  "ctaLabel": "🔗 Mais sites de qualidade → Links Amigos",
  "ctaHref": "/links"
};

const MAP: Record<string, LandingStrings> = { zh, en, de, es, fr, ja, ko, pt };

export function pickLanding(locale: string | undefined): LandingStrings {
  return (locale && MAP[locale]) || en;
}

// Home stats + testimonials (the old site showed zh on Chinese, en elsewhere).
export interface Stat {
  number: string;
  label: string;
}
export interface Testimonial {
  name: string;
  quote: string;
  role: string;
}
export interface LandingExtras {
  statsTitle: string;
  voicesTitle: string;
  stats: Stat[];
  testimonials: Testimonial[];
}

const extrasZh: LandingExtras = {
  statsTitle: 'Debian 数字概览',
  voicesTitle: '社区之声',
  stats: [
    { number: '50,000+', label: '软件包' },
    { number: '14+', label: '支持架构' },
    { number: '1,000+', label: '活跃开发者' },
    { number: '30+', label: '年历史' },
  ],
  testimonials: [
    { name: 'Ian Murdock', role: 'Debian 创始人', quote: 'Debian 是我为创造一个任何人都能自由使用的操作系统而发起的项目。' },
    { name: 'Linus Torvalds', role: 'Linux 内核创建者', quote: 'Debian 是一个伟大的发行版，它的包管理系统是 Linux 世界中最好的之一。' },
    { name: 'System Admin', role: '资深运维工程师', quote: '我们在 500 多台服务器上运行 Debian，几年来零宕机。' },
  ],
};

const extrasEn: LandingExtras = {
  statsTitle: 'Debian by the Numbers',
  voicesTitle: 'Community Voices',
  stats: [
    { number: '50,000+', label: 'Packages' },
    { number: '14+', label: 'Architectures' },
    { number: '1,000+', label: 'Active Developers' },
    { number: '30+', label: 'Years of History' },
  ],
  testimonials: [
    { name: 'Ian Murdock', role: 'Debian Founder', quote: 'Debian was created to be an operating system that anyone could freely use.' },
    { name: 'Linus Torvalds', role: 'Linux Kernel Creator', quote: 'Debian is a great distribution with one of the best package management systems in the Linux world.' },
    { name: 'System Admin', role: 'Senior SysAdmin', quote: 'We run Debian on 500+ servers with zero downtime for years.' },
  ],
};

export function pickExtras(locale: string | undefined): LandingExtras {
  return locale === 'zh' ? extrasZh : extrasEn;
}
