// Localized text for the tutorial infographic components.
// Components read this by VitePress `lang` and fall back to 'en-US'.
// Numeric/data values (dates, sizes like "512 MB", octal 755, codenames) live in the
// components themselves because they are language-neutral; only prose is localized here.
//
// `disk` and `perms` are only rendered on zh/en pages (those sections exist only there),
// so the other locales spread the English base for them and override `timeline` + `boot`.

export interface InfographicStrings {
  disk: {
    title: string
    note: string
    efi: { size: string; desc: string }
    root: { size: string; desc: string }
    home: { size: string; desc: string }
    swap: { size: string; desc: string }
  }
  timeline: {
    title: string
    full: string
    lts: string
    planned: string
    today: string
    note: string
  }
  boot: {
    title: string
    nodes: { name: string; desc: string }[]
  }
  perms: {
    title: string
    type: string
    owner: string
    group: string
    other: string
    r: string
    w: string
    x: string
    note: string
  }
}

const EN: InfographicStrings = {
  disk: {
    title: 'Recommended disk layout (UEFI)',
    note: 'Beginners can choose guided partitioning during install; the layout below is a reference for manual setups.',
    efi: { size: '512 MB', desc: 'EFI system partition for the bootloader' },
    root: { size: '≥ 25 GB', desc: 'Root partition: system and installed software' },
    home: { size: 'Remaining space', desc: 'Home: personal files and settings' },
    swap: { size: '≈ RAM size', desc: 'Swap space, for hibernation and low memory' },
  },
  timeline: {
    title: 'Debian release support timeline',
    full: 'Full support',
    lts: 'Long-term support (LTS)',
    planned: 'Planned',
    today: 'Today',
    note: 'End dates for Debian 13 and 14 are estimates.',
  },
  boot: {
    title: 'Debian boot process',
    nodes: [
      { name: 'UEFI / BIOS', desc: 'Firmware self-test, loads the bootloader' },
      { name: 'GRUB', desc: 'Boot menu; selects and loads the kernel' },
      { name: 'Kernel + initramfs', desc: 'Kernel init, mounts a temporary root' },
      { name: 'systemd', desc: 'Starts system services and targets' },
      { name: 'Login / Desktop', desc: 'Shows the login manager, then the desktop' },
    ],
  },
  perms: {
    title: 'Linux file permissions (rwx)',
    type: 'Type',
    owner: 'Owner',
    group: 'Group',
    other: 'Others',
    r: 'Read',
    w: 'Write',
    x: 'Execute',
    note: 'Each rwx triplet maps to 4-2-1; summing gives the octal mode (e.g. rwx r-x r-x = 755).',
  },
}

const ZH: InfographicStrings = {
  disk: {
    title: '推荐磁盘分区方案（UEFI）',
    note: '新手可在安装时选择「向导式分区」自动完成；下方为手动分区的参考方案。',
    efi: { size: '512 MB', desc: 'EFI 系统分区，存放引导程序' },
    root: { size: '≥ 25 GB', desc: '根分区：系统与已安装软件' },
    home: { size: '剩余空间', desc: '主目录：个人文件与配置' },
    swap: { size: '≈ 内存大小', desc: '交换空间，用于休眠与内存不足时' },
  },
  timeline: {
    title: 'Debian 版本支持时间线',
    full: '常规支持',
    lts: '长期支持 (LTS)',
    planned: '计划中',
    today: '今天',
    note: 'Debian 13 与 14 的结束日期为预估值。',
  },
  boot: {
    title: 'Debian 启动流程',
    nodes: [
      { name: 'UEFI / BIOS', desc: '固件自检，加载引导程序' },
      { name: 'GRUB', desc: '引导菜单，选择并加载内核' },
      { name: 'Kernel + initramfs', desc: '内核初始化，挂载临时根文件系统' },
      { name: 'systemd', desc: '启动系统服务与目标' },
      { name: '登录 / 桌面', desc: '显示登录管理器，进入桌面' },
    ],
  },
  perms: {
    title: 'Linux 文件权限 (rwx)',
    type: '类型',
    owner: '所有者',
    group: '组',
    other: '其他',
    r: '读',
    w: '写',
    x: '执行',
    note: '每组 rwx 三位对应数字 4-2-1，相加即为八进制权限（例：rwx r-x r-x = 755）。',
  },
}

export const INFOGRAPHIC_I18N: Record<string, InfographicStrings> = {
  'zh-CN': ZH,
  'en-US': EN,
  'de-DE': {
    ...EN,
    timeline: {
      title: 'Zeitplan für den Support von Debian-Veröffentlichungen',
      full: 'Voller Support',
      lts: 'Langzeitunterstützung (LTS)',
      planned: 'Geplant',
      today: 'Heute',
      note: 'Die Enddaten für Debian 13 und 14 sind Schätzungen.',
    },
    boot: {
      title: 'Debian-Startvorgang',
      nodes: [
        { name: 'UEFI / BIOS', desc: 'Firmware-Selbsttest, lädt den Bootloader' },
        { name: 'GRUB', desc: 'Bootmenü; wählt den Kernel aus und lädt ihn' },
        { name: 'Kernel + initramfs', desc: 'Kernel-Initialisierung, bindet ein temporäres Root-System ein' },
        { name: 'systemd', desc: 'Startet Systemdienste und Targets' },
        { name: 'Anmeldung / Desktop', desc: 'Zeigt den Anmeldemanager und dann den Desktop an' },
      ],
    },
  },
  'es-ES': {
    ...EN,
    timeline: {
      title: 'Cronología de soporte de versiones de Debian',
      full: 'Soporte completo',
      lts: 'Soporte a largo plazo (LTS)',
      planned: 'Previsto',
      today: 'Hoy',
      note: 'Las fechas de fin de Debian 13 y 14 son estimaciones.',
    },
    boot: {
      title: 'Proceso de arranque de Debian',
      nodes: [
        { name: 'UEFI / BIOS', desc: 'Autocomprobación del firmware; carga el gestor de arranque' },
        { name: 'GRUB', desc: 'Menú de arranque; selecciona y carga el Kernel' },
        { name: 'Kernel + initramfs', desc: 'Inicia el Kernel y monta una raíz temporal' },
        { name: 'systemd', desc: 'Inicia los servicios y objetivos del sistema' },
        { name: 'Inicio de sesión / Escritorio', desc: 'Muestra el gestor de inicio de sesión y luego el escritorio' },
      ],
    },
  },
  'fr-FR': {
    ...EN,
    timeline: {
      title: 'Calendrier de support des versions de Debian',
      full: 'Support complet',
      lts: 'Support à long terme (LTS)',
      planned: 'Prévu',
      today: "Aujourd'hui",
      note: 'Les dates de fin pour Debian 13 et 14 sont des estimations.',
    },
    boot: {
      title: 'Processus de démarrage de Debian',
      nodes: [
        { name: 'UEFI / BIOS', desc: "Autotest du firmware, charge le programme d'amorçage" },
        { name: 'GRUB', desc: 'Menu de démarrage ; sélectionne et charge le kernel' },
        { name: 'Kernel + initramfs', desc: 'Initialisation du kernel, monte une racine temporaire' },
        { name: 'systemd', desc: 'Démarre les services et les cibles du système' },
        { name: 'Login / Desktop', desc: 'Affiche le gestionnaire de connexion, puis le bureau' },
      ],
    },
  },
  'ja-JP': {
    ...EN,
    timeline: {
      title: 'Debian リリースのサポート期間',
      full: 'フルサポート',
      lts: '長期サポート (LTS)',
      planned: '予定',
      today: '現在',
      note: 'Debian 13 と 14 の終了日は予測値です。',
    },
    boot: {
      title: 'Debian の起動プロセス',
      nodes: [
        { name: 'UEFI / BIOS', desc: 'ファームウェアの自己診断を行い、ブートローダーを読み込む' },
        { name: 'GRUB', desc: '起動メニュー。Kernel を選択して読み込む' },
        { name: 'Kernel + initramfs', desc: 'Kernel を初期化し、一時的なルートをマウントする' },
        { name: 'systemd', desc: 'システムサービスとターゲットを起動する' },
        { name: 'Login / Desktop', desc: 'ログインマネージャーを表示し、デスクトップへ進む' },
      ],
    },
  },
  'ko-KR': {
    ...EN,
    timeline: {
      title: 'Debian 릴리스 지원 일정',
      full: '정식 지원',
      lts: '장기 지원(LTS)',
      planned: '예정',
      today: '오늘',
      note: 'Debian 13 및 14의 종료일은 예상치입니다.',
    },
    boot: {
      title: 'Debian 부팅 과정',
      nodes: [
        { name: 'UEFI / BIOS', desc: '펌웨어 자체 검사 후 부트로더를 불러옵니다' },
        { name: 'GRUB', desc: '부팅 메뉴에서 커널을 선택해 불러옵니다' },
        { name: 'Kernel + initramfs', desc: '커널을 초기화하고 임시 루트를 마운트합니다' },
        { name: 'systemd', desc: '시스템 서비스와 타깃을 시작합니다' },
        { name: 'Login / Desktop', desc: '로그인 관리자를 표시한 뒤 데스크톱으로 넘어갑니다' },
      ],
    },
  },
  'pt-BR': {
    ...EN,
    timeline: {
      title: 'Cronograma de suporte das versões do Debian',
      full: 'Suporte completo',
      lts: 'Suporte de longo prazo (LTS)',
      planned: 'Planejado',
      today: 'Hoje',
      note: 'As datas de término do Debian 13 e 14 são estimativas.',
    },
    boot: {
      title: 'Processo de inicialização do Debian',
      nodes: [
        { name: 'UEFI / BIOS', desc: 'Autoteste do firmware, carrega o gerenciador de inicialização' },
        { name: 'GRUB', desc: 'Menu de inicialização; seleciona e carrega o Kernel' },
        { name: 'Kernel + initramfs', desc: 'Inicialização do Kernel, monta uma raiz temporária' },
        { name: 'systemd', desc: 'Inicia os serviços e alvos do sistema' },
        { name: 'Login / Desktop', desc: 'Exibe o gerenciador de login e, em seguida, a área de trabalho' },
      ],
    },
  },
}

export function pickStrings(lang: string): InfographicStrings {
  return INFOGRAPHIC_I18N[lang] || INFOGRAPHIC_I18N['en-US']
}
