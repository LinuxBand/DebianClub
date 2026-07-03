import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const maxSearchFileBytes = 25 * 1024 * 1024;
const requiredLocales = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];
const localizedEntryPages = ['tools', 'scenarios', 'hardware', 'versions', 'release-readiness', 'deployment'];
const bilingualOperationalPages = ['production-observability', 'content-freshness', 'i18n-quality'];
const requiredAiSkillModules = ['apt-safe', 'command-safety', 'systemd-troubleshoot', 'gpu-drivers', 'security-audit'];
const requiredRobotsLines = [
  'User-Agent: *',
  'Allow: /',
  'Disallow: /api/',
  'Host: https://www.debian.club',
  'Sitemap: https://www.debian.club/sitemap.xml',
];
const requiredSitemapUrls = [
  'https://www.debian.club',
  'https://www.debian.club/en',
  'https://www.debian.club/ai/skills',
  'https://www.debian.club/en/ai/skills',
  'https://www.debian.club/tools',
  'https://www.debian.club/en/tools',
  'https://www.debian.club/scenarios',
  'https://www.debian.club/en/scenarios',
  'https://www.debian.club/hardware',
  'https://www.debian.club/en/hardware',
  'https://www.debian.club/versions',
  'https://www.debian.club/en/versions',
  'https://www.debian.club/release-readiness',
  'https://www.debian.club/en/release-readiness',
  'https://www.debian.club/production-observability',
  'https://www.debian.club/en/production-observability',
  'https://www.debian.club/content-freshness',
  'https://www.debian.club/en/content-freshness',
  'https://www.debian.club/i18n-quality',
  'https://www.debian.club/en/i18n-quality',
  'https://www.debian.club/deployment',
  'https://www.debian.club/en/deployment',
];
const localizedEntryFiles = localizedEntryPages.flatMap((page) =>
  requiredLocales.map((locale) => (locale === 'zh' ? `out/${page}.html` : `out/${locale}/${page}.html`)),
);
const bilingualOperationalFiles = bilingualOperationalPages.flatMap((page) => [`out/${page}.html`, `out/en/${page}.html`]);
const requiredFiles = [
  '_migration/browser-smoke-check.mjs',
  '_migration/smoke-check.mjs',
  '_migration/content-freshness-check.mjs',
  '_migration/i18n-consistency-check.mjs',
  'out/index.html',
  'out/en.html',
  'out/ai/skills.html',
  'out/en/ai/skills.html',
  'out/ai/skills/distribution.html',
  'out/en/ai/skills/distribution.html',
  ...localizedEntryFiles,
  ...bilingualOperationalFiles,
  'out/scenarios/nas-file-sharing.html',
  'out/en/scenarios/nas-file-sharing.html',
  'out/scenarios/local-ai-inference.html',
  'out/en/scenarios/local-ai-inference.html',
  'out/scenarios/ops-jump-box.html',
  'out/en/scenarios/ops-jump-box.html',
  'out/_headers',
  'out/skills.json',
  'out/llms.txt',
  'out/llms-full.txt',
  'out/sitemap.xml',
  'out/robots.txt',
];

const deploymentTextChecks = [
  {
    path: 'DEPLOY.md',
    checks: [
      ['corepack prepare pnpm@9.15.9 --activate', 'Cloudflare build pins pnpm version'],
      ['pnpm install --frozen-lockfile', 'Cloudflare install command is locked'],
      ['Build output directory** | `out`', 'Cloudflare output directory is documented'],
      ['corepack pnpm release:check', 'release gate is documented'],
      ['corepack pnpm smoke:check', 'smoke gate is documented'],
      ['corepack pnpm browser:check', 'browser gate is documented'],
      ['--project-name debianclub', 'CLI deploy project name matches wrangler.toml'],
    ],
  },
  {
    path: 'package.json',
    checks: [
      ['"release:check": "pnpm freshness:check && pnpm i18n:check && node _migration/release-check.mjs"', 'release check script exists'],
      ['"freshness:check": "node _migration/content-freshness-check.mjs"', 'freshness check script exists'],
      ['"i18n:check": "node _migration/i18n-consistency-check.mjs"', 'i18n check script exists'],
      ['"smoke:check": "node _migration/smoke-check.mjs"', 'smoke check script exists'],
      ['"browser:check": "node _migration/browser-smoke-check.mjs"', 'browser check script exists'],
    ],
  },
  {
    path: '_migration/browser-smoke-check.mjs',
    checks: [
      ['async function verifySearchUi', 'browser check verifies search UI'],
      ['async function verifyAiSkillsShareLink', 'browser check verifies AI Skills share links'],
      ['async function verifyCommandSafetyShareLink', 'browser check verifies command safety share links'],
      ['async function verifyMirrorShareLink', 'browser check verifies mirror share links'],
      ['async function verifyInstallShareLink', 'browser check verifies install share links'],
      ['async function verifyDesktopShareLink', 'browser check verifies desktop share links'],
      ['async function verifyPartitionShareLink', 'browser check verifies partition share links'],
      ['async function verifyTroubleshootShareLink', 'browser check verifies troubleshooting share links'],
      ['async function verifyUpgradeShareLink', 'browser check verifies upgrade planner share links'],
      ['async function verifyEnglishToolShareLinkPaths', 'browser check verifies English tool share paths'],
      ['async function verifyFallbackLocaleToolShareLinkPaths', 'browser check verifies fallback locale tool share paths'],
      ['async function waitForToolShareButton', 'browser check centralizes share button readiness'],
      ["window.dispatchEvent(new Event('hashchange'))", 'browser check retries tool hash synchronization'],
      ["readPositiveIntegerEnv('BROWSER_STARTUP_TIMEOUT_MS', 60_000)", 'browser check allows slower CI browser startup'],
      ["readPositiveIntegerEnv('BROWSER_NAVIGATION_TIMEOUT_MS', 30_000)", 'browser check allows slower production navigation'],
      ['clearTimeout(timeout)', 'browser check clears CDP command timers after responses'],
      ['async function navigateTo', 'browser check centralizes page navigation'],
      ["cdp.send('Page.navigate', { url: url.toString() }, navigationTimeoutMs)", 'browser check uses the longer navigation timeout'],
      ['async function copyShareLink', 'browser check centralizes clipboard share verification'],
      ["readPositiveIntegerEnv('BROWSER_CLIPBOARD_TIMEOUT_MS', 4_000)", 'browser check allows slower clipboard writes'],
      ['window.setTimeout(checkCopiedLink, 100)', 'browser check retries clipboard clicks while waiting'],
      ['async function getPageContext', 'browser check captures page context on failures'],
      ['async function runCheck', 'browser check wraps each scenario with diagnostics'],
      ['document.readyState', 'browser check reports page readiness on failures'],
      ['document.activeElement', 'browser check reports active element on failures'],
      ['browser exited before opening debugging target', 'browser check reports early browser startup failures'],
      ["'/tools#ai-skills?target=agents&replace=true'", 'browser check opens AI Skills config deep link'],
      ["'/en/tools#ai-skills?target=agents&replace=true'", 'browser check opens English AI Skills config deep link'],
      ["'/fr/tools#desktop?hardware=modern&workflow=creative'", 'browser check opens fallback locale tool config deep link'],
      ["copiedLink.pathname === '/en/tools'", 'browser check keeps English paths in copied share links'],
      ["window.location.hash = 'ai-skills?target=local&replace=false'", 'browser check verifies AI Skills hashchange sync'],
      ["copiedLink.hash === '#ai-skills?target=local&replace=false'", 'browser check verifies copied AI Skills share hash'],
      ['`#command-safety?command=${encodeURIComponent(safetyInitialCommand)}`', 'browser check builds command safety deep links'],
      ["storageKey: '__copiedCommandSafetyLink'", 'browser check stubs command safety clipboard writes'],
      ['command safety deep link and share link stay in sync', 'browser check validates command safety share sync'],
      ["'#mirrors?release=bookworm&mirror=official&components=full'", 'browser check opens mirror config deep link'],
      ["storageKey: '__copiedMirrorLink'", 'browser check stubs mirror clipboard writes'],
      ['mirror deep link and share link stay in sync', 'browser check validates mirror share sync'],
      ["'#install?device=server&goal=server&risk=low'", 'browser check opens install config deep link'],
      ["storageKey: '__copiedInstallLink'", 'browser check stubs install clipboard writes'],
      ['install deep link and share link stay in sync', 'browser check validates install share sync'],
      ["'#desktop?hardware=old&workflow=light'", 'browser check opens desktop config deep link'],
      ["storageKey: '__copiedDesktopLink'", 'browser check stubs desktop clipboard writes'],
      ['desktop deep link and share link stay in sync', 'browser check validates desktop share sync'],
      ["'#partitions?disk=multi&boot=dual&encryption=full'", 'browser check opens partition config deep link'],
      ["storageKey: '__copiedPartitionLink'", 'browser check stubs partition clipboard writes'],
      ['partition deep link and share link stay in sync', 'browser check validates partition share sync'],
      ["'#troubleshoot?symptom=display'", 'browser check opens troubleshooting config deep link'],
      ["storageKey: '__copiedTroubleshootLink'", 'browser check stubs troubleshooting clipboard writes'],
      ['troubleshooting deep link and share link stay in sync', 'browser check validates troubleshooting share sync'],
      ["'#upgrade?current=bookworm&target=trixie&exposure=public'", 'browser check opens upgrade planner config deep link'],
      ["storageKey: '__copiedUpgradeLink'", 'browser check stubs upgrade planner clipboard writes'],
      ['upgrade deep link and share link stay in sync', 'browser check validates upgrade planner share sync'],
      ['English tool share links keep localized paths', 'browser check validates English share link paths'],
      ['Fallback locale tool share links keep localized paths', 'browser check validates fallback locale share link paths'],
    ],
  },
  {
    path: '_migration/smoke-check.mjs',
    checks: [
      ["'/tools#command-safety'", 'smoke covers Chinese command safety tool deep link'],
      ["'/en/tools#command-safety'", 'smoke covers English command safety tool deep link'],
      ["'/tools#command-safety?command=sudo%20apt%20update'", 'smoke covers Chinese prefilled command safety link'],
      ["'/en/tools#command-safety?command=sudo%20apt%20update'", 'smoke covers English prefilled command safety link'],
      ["'/tools#ai-skills'", 'smoke covers Chinese AI Skills tool deep link'],
      ["'/en/tools#ai-skills'", 'smoke covers English AI Skills tool deep link'],
      ["'/tools#ai-skills?target=agents&replace=true'", 'smoke covers Chinese AI Skills config deep link'],
      ["'/en/tools#ai-skills?target=local&replace=false'", 'smoke covers English AI Skills config deep link'],
      ["'/tools#mirrors?release=bookworm&mirror=official&components=full'", 'smoke covers Chinese mirror config deep link'],
      ["'/en/tools#mirrors?release=bookworm&mirror=debian-de&components=firmware'", 'smoke covers English mirror config deep link'],
      ["'/tools#install?device=server&goal=server&risk=low'", 'smoke covers Chinese install config deep link'],
      ["'/en/tools#install?device=laptop&goal=ai&risk=balanced'", 'smoke covers English install config deep link'],
      ["'/tools#desktop?hardware=old&workflow=light'", 'smoke covers Chinese desktop config deep link'],
      ["'/en/tools#desktop?hardware=modern&workflow=creative'", 'smoke covers English desktop config deep link'],
      ["'/tools#partitions?disk=multi&boot=dual&encryption=full'", 'smoke covers Chinese partition config deep link'],
      ["'/en/tools#partitions?disk=standard&boot=single&encryption=home'", 'smoke covers English partition config deep link'],
      ["'/tools#troubleshoot?symptom=display'", 'smoke covers Chinese troubleshooting config deep link'],
      ["'/en/tools#troubleshoot?symptom=performance'", 'smoke covers English troubleshooting config deep link'],
      ["'/tools#upgrade?current=bookworm&target=trixie&exposure=public'", 'smoke covers Chinese upgrade planner config deep link'],
      ["'/en/tools#upgrade?current=bullseye&target=bookworm&exposure=internal'", 'smoke covers English upgrade planner config deep link'],
      ['const searchShardTimeoutMs = 45_000', 'smoke gives large search shards a longer network timeout'],
      ['fetchWithRetry(path, { attempts: 3, requestTimeoutMs: searchShardTimeoutMs })', 'smoke uses the longer timeout for search shards'],
      ['const responseHeaderChecks = [', 'smoke defines response header checks'],
      ['function shouldCheckResponseHeaders', 'smoke skips response header checks for local previews'],
      ["process.env.SMOKE_CHECK_HEADERS === '1'", 'smoke can force response header checks'],
      ["['x-content-type-options', 'nosniff']", 'smoke verifies nosniff response headers'],
      ["['content-type', 'application/json; charset=utf-8']", 'smoke verifies search JSON response type'],
      ["['cache-control', 'public, max-age=3600']", 'smoke verifies search response cache headers'],
      ["['cache-control', 'public, max-age=31536000, immutable']", 'smoke verifies Next static chunk cache headers'],
      ['function firstStaticChunkPath', 'smoke discovers current Next static chunk paths'],
      ['async function checkAiSkillsRegistry', 'smoke verifies the AI Skills registry JSON'],
      ['const aiReadableTextChecks = [', 'smoke defines AI-readable text checks'],
      ["path: '/llms.txt'", 'smoke verifies llms index text'],
      ["path: '/llms-full.txt'", 'smoke verifies full llms text'],
      ["skill.distribution?.registry_route !== '/skills.json'", 'smoke verifies AI Skills registry route metadata'],
      ["'apt-safe', 'command-safety', 'systemd-troubleshoot', 'gpu-drivers', 'security-audit'", 'smoke verifies core skill modules'],
      ["requiredIds: ['/tools', '/ai/skills']", 'smoke verifies Chinese search shard contains key pages'],
      ["requiredTerms: ['Debian Interactive Tools', 'DebianClub AI Skills']", 'smoke verifies English search shard contains key terms'],
    ],
  },
  {
    path: '_migration/release-check.mjs',
    checks: [
      ['const aiReadableArtifactChecks = [', 'release gate defines AI-readable artifact checks'],
      ['function checkAiSkillsRegistryArtifact', 'release gate verifies the exported AI Skills registry'],
      ['function checkAiReadableTextArtifact', 'release gate verifies exported AI-readable text files'],
      ['function checkRobotsArtifact', 'release gate verifies exported robots policy'],
      ['function checkSitemapArtifact', 'release gate verifies exported sitemap entries'],
      ["path: 'out/llms.txt'", 'release gate verifies exported llms index text'],
      ["path: 'out/llms-full.txt'", 'release gate verifies exported full llms text'],
      ["registry?.schema_version !== 1", 'release gate verifies AI Skills registry schema version'],
      ["'https://www.debian.club/ai/skills'", 'release gate verifies AI Skills sitemap entry'],
      ["'Sitemap: https://www.debian.club/sitemap.xml'", 'release gate verifies robots sitemap entry'],
    ],
  },
  {
    path: '_migration/content-freshness-check.mjs',
    checks: [
      ["const reviewDate = '2026-07-03'", 'freshness check pins review date'],
      ["const reviewDueDate = '2026-10-01'", 'freshness check pins next review date'],
      ["'2028-08-09'", 'freshness check verifies Debian 13 regular support date'],
      ["'2030-06-30'", 'freshness check verifies Debian 13 LTS date'],
      ['CONTENT_FRESHNESS_ALLOW_EXPIRED', 'freshness check supports explicit expiry override'],
    ],
  },
  {
    path: '_migration/i18n-consistency-check.mjs',
    checks: [
      ["const requiredLocales = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt']", 'i18n check covers all locales'],
      ["const bilingualPages = ['production-observability', 'content-freshness', 'i18n-quality']", 'i18n check covers operational bilingual pages'],
      ["'distribution'", 'i18n check requires AI Skills distribution page'],
      ["<InteractiveTools lang=\"en\" />", 'i18n check verifies tool fallback UI'],
      ['Upgrade Planner', 'i18n check verifies upgrade planner fallback text'],
    ],
  },
  {
    path: 'components/InteractiveTools.tsx',
    checks: [
      ["mirror: 'mirrors'", 'mirror tool hash is mapped'],
      ["install: 'install'", 'install tool hash is mapped'],
      ["desktop: 'desktop'", 'desktop tool hash is mapped'],
      ["partition: 'partitions'", 'partition tool hash is mapped'],
      ["troubleshoot: 'troubleshoot'", 'troubleshooting tool hash is mapped'],
      ["safety: 'command-safety'", 'command safety tool hash is mapped'],
      ["skills: 'ai-skills'", 'AI Skills tool hash is mapped'],
      ["upgrade: 'upgrade'", 'upgrade planner tool hash is mapped'],
      ['function normalizeToolHash', 'tool hash parsing is centralized'],
      ['function parseToolHash', 'tool hash parameters are parsed from the URL fragment'],
      ['function useCopiedFeedback', 'copy buttons share one copied-state feedback helper'],
      ['window.clearTimeout(timeoutRef.current)', 'copied-state feedback clears stale timers'],
      ["hashState.params.get('release')", 'mirror tool can preload release from the URL fragment'],
      ["hashState.params.get('mirror')", 'mirror tool can preload mirror from the URL fragment'],
      ["hashState.params.get('components')", 'mirror tool can preload components from the URL fragment'],
      ["window.addEventListener('hashchange', syncMirrorStateFromHash)", 'mirror tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.mirror}?release=${release}&mirror=${mirror}&components=${components}`', 'mirror tool share links keep config in the URL fragment'],
      ["hashState.params.get('device')", 'install tool can preload device from the URL fragment'],
      ["hashState.params.get('goal')", 'install tool can preload goal from the URL fragment'],
      ["hashState.params.get('risk')", 'install tool can preload risk from the URL fragment'],
      ["window.addEventListener('hashchange', syncInstallStateFromHash)", 'install tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.install}?device=${device}&goal=${goal}&risk=${risk}`', 'install tool share links keep config in the URL fragment'],
      ["hashState.params.get('hardware')", 'desktop tool can preload hardware from the URL fragment'],
      ["hashState.params.get('workflow')", 'desktop tool can preload workflow from the URL fragment'],
      ["window.addEventListener('hashchange', syncDesktopStateFromHash)", 'desktop tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.desktop}?hardware=${hardware}&workflow=${workflow}`', 'desktop tool share links keep config in the URL fragment'],
      ["hashState.params.get('disk')", 'partition tool can preload disk from the URL fragment'],
      ["hashState.params.get('boot')", 'partition tool can preload boot mode from the URL fragment'],
      ["hashState.params.get('encryption')", 'partition tool can preload encryption from the URL fragment'],
      ["window.addEventListener('hashchange', syncPartitionStateFromHash)", 'partition tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.partition}?disk=${disk}&boot=${boot}&encryption=${encryption}`', 'partition tool share links keep config in the URL fragment'],
      ["hashState.params.get('symptom')", 'troubleshooting tool can preload symptom from the URL fragment'],
      ["window.addEventListener('hashchange', syncTroubleshootStateFromHash)", 'troubleshooting tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.troubleshoot}?symptom=${symptom}`', 'troubleshooting tool share links keep config in the URL fragment'],
      ["hashState.params.get('target')", 'AI Skills tool can preload target from the URL fragment'],
      ["hashState.params.get('replace')", 'AI Skills tool can preload replace flag from the URL fragment'],
      ["window.addEventListener('hashchange', syncSkillsStateFromHash)", 'AI Skills tool syncs config on hash changes'],
      ['url.hash = `${toolHashIds.skills}?target=${target}&replace=${replace ? \'true\' : \'false\'}`', 'AI Skills tool share links keep config in the URL fragment'],
      ["hashState.params.get('current')", 'upgrade planner can preload current release from the URL fragment'],
      ["hashState.params.get('target')", 'upgrade planner can preload target release from the URL fragment'],
      ["hashState.params.get('exposure')", 'upgrade planner can preload exposure from the URL fragment'],
      ["window.addEventListener('hashchange', syncUpgradeStateFromHash)", 'upgrade planner syncs config on hash changes'],
      ['url.hash = `${toolHashIds.upgrade}?current=${current}&target=${target}&exposure=${exposure}`', 'upgrade planner share links keep config in the URL fragment'],
      ['const maxSharedCommandLength = 4000', 'shared command links have a length cap'],
      ["hashState.params.get('command')", 'command safety can preload a shared command from the URL fragment'],
      ["window.addEventListener('hashchange', syncSharedCommandFromHash)", 'command safety prefill syncs on hash changes'],
      ['url.searchParams.delete(\'command\')', 'command safety share links do not keep command query parameters'],
      ['decodeURIComponent(value)', 'encoded tool hashes are decoded'],
      ['window.addEventListener(\'hashchange\', syncFromHash)', 'tool tabs sync on hash changes'],
      ['window.history.replaceState(null, \'\', nextUrl)', 'tool tab clicks update shareable hash'],
    ],
  },
  {
    path: 'content/docs/tools/index.mdx',
    checks: [
      ["/tools#command-safety", 'Chinese tools page documents command safety deep link'],
      ['command=', 'Chinese tools page documents command prefill links'],
      ['#mirrors?release=', 'Chinese tools page documents mirror config links'],
      ['#install?device=', 'Chinese tools page documents install config links'],
      ['#desktop?hardware=', 'Chinese tools page documents desktop config links'],
      ['#partitions?disk=', 'Chinese tools page documents partition config links'],
      ['#troubleshoot?symptom=', 'Chinese tools page documents troubleshooting config links'],
      ['#ai-skills?target=', 'Chinese tools page documents AI Skills config links'],
      ['#upgrade?current=', 'Chinese tools page documents upgrade planner config links'],
    ],
  },
  {
    path: 'content/docs/tools/index.en.mdx',
    checks: [
      ["/en/tools#command-safety", 'English tools page documents command safety deep link'],
      ['command=', 'English tools page documents command prefill links'],
      ['#mirrors?release=', 'English tools page documents mirror config links'],
      ['#install?device=', 'English tools page documents install config links'],
      ['#desktop?hardware=', 'English tools page documents desktop config links'],
      ['#partitions?disk=', 'English tools page documents partition config links'],
      ['#troubleshoot?symptom=', 'English tools page documents troubleshooting config links'],
      ['#ai-skills?target=', 'English tools page documents AI Skills config links'],
      ['#upgrade?current=', 'English tools page documents upgrade planner config links'],
    ],
  },
  {
    path: 'content/docs/production-observability.mdx',
    checks: [
      ['Phase 43 已上线', 'Chinese production observability page marks phase 43'],
      ['SMOKE_BASE_URL=https://www.debian.club', 'Chinese production observability page documents production checks'],
    ],
  },
  {
    path: 'content/docs/production-observability.en.mdx',
    checks: [
      ['Phase 43 Live', 'English production observability page marks phase 43'],
      ['SMOKE_BASE_URL=https://www.debian.club', 'English production observability page documents production checks'],
    ],
  },
  {
    path: 'content/docs/content-freshness.mdx',
    checks: [
      ['Phase 44 已上线', 'Chinese content freshness page marks phase 44'],
      ['2026-10-01', 'Chinese content freshness page documents review due date'],
    ],
  },
  {
    path: 'content/docs/content-freshness.en.mdx',
    checks: [
      ['Phase 44 Live', 'English content freshness page marks phase 44'],
      ['2026-10-01', 'English content freshness page documents review due date'],
    ],
  },
  {
    path: 'content/docs/i18n-quality.mdx',
    checks: [
      ['Phase 45 已上线', 'Chinese i18n quality page marks phase 45'],
      ['corepack pnpm --dir web i18n:check', 'Chinese i18n quality page documents i18n check'],
    ],
  },
  {
    path: 'content/docs/i18n-quality.en.mdx',
    checks: [
      ['Phase 45 Live', 'English i18n quality page marks phase 45'],
      ['corepack pnpm --dir web i18n:check', 'English i18n quality page documents i18n check'],
    ],
  },
  {
    path: 'content/docs/ai/skills/distribution.mdx',
    checks: [
      ['Phase 46 已上线', 'Chinese AI Skills distribution page marks phase 46'],
      ['skills/debian-linux-reliability/v${version}', 'Chinese AI Skills distribution page documents version tag format'],
    ],
  },
  {
    path: 'content/docs/ai/skills/distribution.en.mdx',
    checks: [
      ['Phase 46 Live', 'English AI Skills distribution page marks phase 46'],
      ['skills/debian-linux-reliability/v${version}', 'English AI Skills distribution page documents version tag format'],
    ],
  },
  {
    path: join('..', 'wrangler.toml'),
    checks: [
      ['name = "debianclub"', 'Cloudflare Pages project name is debianclub'],
      ['pages_build_output_dir = "web/out"', 'Cloudflare Pages output directory is web/out'],
    ],
  },
  {
    path: 'public/_headers',
    checks: [
      ['/*', 'global headers rule exists', 'line'],
      ['X-Content-Type-Options: nosniff', 'nosniff header exists'],
      ['Referrer-Policy: strict-origin-when-cross-origin', 'referrer policy exists'],
      ['X-Frame-Options: SAMEORIGIN', 'frame options header exists'],
      ['Permissions-Policy: camera=(), microphone=(), geolocation=()', 'permissions policy exists'],
      ['/_next/static/*', 'Next static cache rule exists'],
      ['/api/search/*', 'search index headers rule exists'],
      ['Content-Type: application/json; charset=utf-8', 'search index JSON content type exists'],
      ['/skills.json', 'AI Skills registry headers rule exists', 'line'],
      ['/llms.txt', 'llms index headers rule exists', 'line'],
      ['/llms-full.txt', 'full llms headers rule exists', 'line'],
      ['Content-Type: text/plain; charset=utf-8', 'AI-readable text content type exists'],
    ],
  },
  {
    path: 'out/_headers',
    checks: [
      ['/*', 'exported global headers rule exists', 'line'],
      ['X-Content-Type-Options: nosniff', 'exported nosniff header exists'],
      ['Referrer-Policy: strict-origin-when-cross-origin', 'exported referrer policy exists'],
      ['/_next/static/*', 'exported Next static cache rule exists'],
      ['/api/search/*', 'exported search index headers rule exists'],
      ['/skills.json', 'exported AI Skills registry headers rule exists', 'line'],
      ['/llms.txt', 'exported llms index headers rule exists', 'line'],
      ['/llms-full.txt', 'exported full llms headers rule exists', 'line'],
    ],
  },
  {
    path: join('..', '.github', 'workflows', 'web-release-check.yml'),
    checks: [
      ['name: Web Release Check', 'web release workflow exists'],
      ['permissions:', 'workflow declares permissions'],
      ['contents: read', 'workflow uses read-only contents permission'],
      ['corepack prepare pnpm@9.15.9 --activate', 'workflow pins pnpm version'],
      ['corepack pnpm --dir web types:check', 'workflow runs type check'],
      ['corepack pnpm --dir web freshness:check', 'workflow runs freshness check'],
      ['corepack pnpm --dir web i18n:check', 'workflow runs i18n check'],
      ['corepack pnpm --dir web build', 'workflow runs static build'],
      ['corepack pnpm --dir web smoke:check', 'workflow runs smoke check'],
      ['corepack pnpm --dir web browser:check', 'workflow runs browser check'],
      ['corepack pnpm --dir web release:check', 'workflow runs release gate'],
    ],
  },
];

const headerRouteChecks = [
  {
    path: 'public/_headers',
    rules: [
      {
        route: '/skills.json',
        headers: ['Content-Type: application/json; charset=utf-8', 'Cache-Control: public, max-age=3600'],
      },
      {
        route: '/llms.txt',
        headers: ['Content-Type: text/plain; charset=utf-8', 'Cache-Control: public, max-age=3600'],
      },
      {
        route: '/llms-full.txt',
        headers: ['Content-Type: text/plain; charset=utf-8', 'Cache-Control: public, max-age=3600'],
      },
    ],
  },
  {
    path: 'out/_headers',
    rules: [
      {
        route: '/skills.json',
        headers: ['Content-Type: application/json; charset=utf-8', 'Cache-Control: public, max-age=3600'],
      },
      {
        route: '/llms.txt',
        headers: ['Content-Type: text/plain; charset=utf-8', 'Cache-Control: public, max-age=3600'],
      },
      {
        route: '/llms-full.txt',
        headers: ['Content-Type: text/plain; charset=utf-8', 'Cache-Control: public, max-age=3600'],
      },
    ],
  },
];

const aiReadableArtifactChecks = [
  {
    path: 'out/llms.txt',
    minBytes: 50_000,
    includes: ['# Docs', '[DebianClub AI Skills](/ai/skills)', '[DebianClub AI Skills](/en/ai/skills)'],
  },
  {
    path: 'out/llms-full.txt',
    minBytes: 500_000,
    includes: ['# DebianClub AI Skills (/ai/skills)', '# 安装与分发 (/ai/skills/install)', '/tools#ai-skills?target=agents&replace=true'],
  },
];

const failures = [];

function hasTextCheck(content, needle, mode) {
  if (mode === 'line') {
    return content.split(/\r?\n/).some((line) => line.trim() === needle);
  }

  return content.includes(needle);
}

function fail(message) {
  failures.push(message);
  console.error(`[release-check] FAIL ${message}`);
}

function pass(message) {
  console.log(`[release-check] OK   ${message}`);
}

function getHeaderBlock(content, route) {
  const lines = content.split(/\r?\n/);
  const routeIndex = lines.findIndex((line) => line.trim() === route);
  if (routeIndex === -1) return null;

  const headers = [];
  for (let index = routeIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;
    if (!/^\s/.test(line)) break;

    headers.push(trimmed);
  }

  return headers;
}

function checkAiSkillsRegistryArtifact(path) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail(`missing ${path}`);
    return;
  }

  let registry;
  try {
    registry = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`${path} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }

  const skill = registry?.skills?.find((item) => item?.name === 'debian-linux-reliability');
  if (registry?.schema_version !== 1 || registry?.source !== 'DebianClub' || !skill) {
    fail(`${path} does not contain the DebianClub skill registry contract`);
    return;
  }

  if (
    skill.entrypoint !== 'SKILL.md' ||
    skill.distribution?.registry_route !== '/skills.json' ||
    !skill.default_safety?.includes('Read-only') ||
    !skill.localized?.zh?.default_safety?.includes('默认只读')
  ) {
    fail(`${path} Debian reliability skill metadata is incomplete`);
    return;
  }

  for (const moduleName of requiredAiSkillModules) {
    if (!Array.isArray(skill.modules) || !skill.modules.includes(moduleName)) {
      fail(`${path} Debian reliability skill is missing module ${moduleName}`);
      return;
    }
  }

  pass(`${path} contains DebianClub skills registry contract`);
}

function checkAiReadableTextArtifact({ path, includes, minBytes }) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail(`missing ${path}`);
    return;
  }

  const size = statSync(path).size;
  const content = readFileSync(path, 'utf8');
  if (size < minBytes) {
    fail(`${path} is too small (${size} bytes, expected at least ${minBytes})`);
    return;
  }

  for (const needle of includes) {
    if (!content.includes(needle)) {
      fail(`${path} does not include ${needle}`);
      return;
    }
  }

  pass(`${path} contains AI-readable text contract (${size} bytes)`);
}

function checkRobotsArtifact(path) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail(`missing ${path}`);
    return;
  }

  const lines = readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (const expectedLine of requiredRobotsLines) {
    if (!lines.includes(expectedLine)) {
      fail(`${path} is missing ${expectedLine}`);
      return;
    }
  }

  if (lines.some((line) => /^Disallow:\s*\/(?:ai|tools|scenarios|hardware|versions|release-readiness|deployment)\b/.test(line))) {
    fail(`${path} blocks a public documentation entry point`);
    return;
  }

  pass(`${path} exposes sitemap and keeps public entry points crawlable`);
}

function checkSitemapArtifact(path) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail(`missing ${path}`);
    return;
  }

  const content = readFileSync(path, 'utf8');
  const urls = new Set([...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));

  if (urls.size < requiredSitemapUrls.length) {
    fail(`${path} contains too few URL entries (${urls.size})`);
    return;
  }

  for (const expectedUrl of requiredSitemapUrls) {
    if (!urls.has(expectedUrl)) {
      fail(`${path} is missing ${expectedUrl}`);
      return;
    }
  }

  if (!content.includes('hreflang="x-default"') || !content.includes('hreflang="en-US"') || !content.includes('hreflang="zh-CN"')) {
    fail(`${path} is missing expected hreflang alternates`);
    return;
  }

  pass(`${path} contains public entry point URLs and hreflang alternates`);
}

for (const file of requiredFiles) {
  if (existsSync(file)) {
    pass(`found ${file}`);
  } else {
    fail(`missing ${file}`);
  }
}

for (const fileCheck of deploymentTextChecks) {
  if (!existsSync(fileCheck.path) || !statSync(fileCheck.path).isFile()) {
    fail(`missing ${fileCheck.path}`);
    continue;
  }

  const content = readFileSync(fileCheck.path, 'utf8');
  for (const [needle, label, mode] of fileCheck.checks) {
    if (hasTextCheck(content, needle, mode)) {
      pass(`${fileCheck.path}: ${label}`);
    } else {
      fail(`${fileCheck.path}: missing ${label}`);
    }
  }
}

checkAiSkillsRegistryArtifact('out/skills.json');

for (const check of aiReadableArtifactChecks) {
  checkAiReadableTextArtifact(check);
}

checkRobotsArtifact('out/robots.txt');
checkSitemapArtifact('out/sitemap.xml');

for (const fileCheck of headerRouteChecks) {
  if (!existsSync(fileCheck.path) || !statSync(fileCheck.path).isFile()) {
    fail(`missing ${fileCheck.path}`);
    continue;
  }

  const content = readFileSync(fileCheck.path, 'utf8');
  for (const rule of fileCheck.rules) {
    const headers = getHeaderBlock(content, rule.route);
    if (!headers) {
      fail(`${fileCheck.path}: missing header route ${rule.route}`);
      continue;
    }

    for (const expectedHeader of rule.headers) {
      if (headers.includes(expectedHeader)) {
        pass(`${fileCheck.path}: ${rule.route} includes ${expectedHeader}`);
      } else {
        fail(`${fileCheck.path}: ${rule.route} missing ${expectedHeader}`);
      }
    }
  }
}

const searchDir = join('out', 'api', 'search');

if (!existsSync(searchDir) || !statSync(searchDir).isDirectory()) {
  fail(`missing split search index directory ${searchDir}`);
} else {
  const entries = new Set(readdirSync(searchDir));

  for (const locale of requiredLocales) {
    const path = join(searchDir, locale);
    if (!existsSync(path) || !statSync(path).isFile()) {
      fail(`missing search index ${path}`);
      continue;
    }

    const size = statSync(path).size;
    if (size > maxSearchFileBytes) {
      fail(`${path} is ${(size / 1048576).toFixed(2)} MiB, above 25 MiB`);
    } else {
      pass(`${path} is ${(size / 1048576).toFixed(2)} MiB`);
    }
  }

  for (const entry of entries) {
    if (!requiredLocales.includes(entry)) {
      fail(`unexpected search index file ${join(searchDir, entry)}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`[release-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[release-check] all release checks passed');
