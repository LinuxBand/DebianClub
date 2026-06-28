'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { matomo } from '@/lib/shared';

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

// Module-level so this survives a remount of <Matomo /> (a language switch
// changes the [lang] segment that owns this component; next/script won't re-run
// the cached inline init, so the remount must not be mistaken for the initial
// view or the new locale's pageview is dropped).
let initialTracked = false;
let lastPath: string | null = null;

// Fire a Matomo pageview on every client-side route change (App Router is an
// SPA — navigations don't reload the page). The very first pageview is sent by
// the inline init script, so the tracker skips exactly that one.
function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const paq = window._paq;
    if (!paq) return; // tracking disabled (e.g. localhost)
    if (!initialTracked) {
      initialTracked = true; // initial view already tracked by the inline script
      lastPath = pathname;
      return;
    }
    if (lastPath === pathname) return;
    paq.push(['setReferrerUrl', window.location.origin + (lastPath ?? '')]);
    paq.push(['setCustomUrl', window.location.href]);
    paq.push(['setDocumentTitle', document.title]);
    paq.push(['trackPageView']);
    paq.push(['enableLinkTracking']); // re-scan links rendered by the new page
    lastPath = pathname;
  }, [pathname]);

  return null;
}

export function Matomo() {
  return (
    <>
      <Script id="matomo" strategy="afterInteractive">
        {`(function(){
  var h=location.hostname;
  if(h==='localhost'||h==='127.0.0.1'||h==='0.0.0.0'||h==='::1') return;
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  var u='${matomo.url}';
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', '${matomo.siteId}']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
})();`}
      </Script>
      <RouteTracker />
    </>
  );
}
