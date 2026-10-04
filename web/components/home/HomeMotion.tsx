'use client';

import { useEffect } from 'react';

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Progressive motion layer for the home page. The markup is complete and
 * visible without it; once mounted (and unless the visitor prefers reduced
 * motion) it adds scroll reveals, number count-ups, scroll-linked progress
 * (`--progress`) and pointer-following spotlights (`--mx` / `--my`).
 */
export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-home]');
    if (!root) return;

    // Spotlight follows the pointer inside any [data-spot] surface.
    const onPointer = (event: PointerEvent) => {
      const surface = (event.target as Element | null)?.closest<HTMLElement>('[data-spot]');
      if (!surface) return;
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      surface.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    root.addEventListener('pointermove', onPointer, { passive: true });

    // The closing wordmark is sized in container units (17.6cqi), which only
    // fits while the display face renders. If it fell back to a wider font
    // (swap window, fonts disabled), shrink it to the container instead of
    // letting the brand name clip. Layout correctness, so it runs regardless
    // of the reduced-motion early-return below.
    const fitWordmark = () => {
      const mark = root.querySelector<HTMLElement>('.home-wordmark');
      const box = mark?.closest<HTMLElement>('.home-closer');
      const text = mark?.firstElementChild as HTMLElement | null;
      if (!mark || !box || !text) return;
      mark.style.fontSize = '';
      const textWidth = text.getBoundingClientRect().width;
      const available = box.clientWidth;
      if (textWidth > available) {
        const current = parseFloat(window.getComputedStyle(mark).fontSize);
        mark.style.fontSize = `${((current * available) / textWidth).toFixed(2)}px`;
      }
    };
    if (document.fonts?.ready) document.fonts.ready.then(fitWordmark);
    else fitWordmark();
    window.addEventListener('resize', fitWordmark, { passive: true });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        root.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', fitWordmark);
      };
    }

    const countUp = (el: HTMLElement) => {
      const final = el.textContent ?? '';
      const target = Number(final.replace(/[^\d]/g, ''));
      if (!target) return;
      const format = new Intl.NumberFormat('en-US');
      const started = performance.now();
      const duration = 1500;
      const step = (now: number) => {
        const progress = clamp01((now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = progress < 1 ? format.format(Math.round(target * eased)) : final;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // Reveals: anything already on screen stays put, the rest animates in.
    const reveals = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const fold = window.innerHeight * 0.92;
    for (const el of reveals) {
      if (el.getBoundingClientRect().top < fold) el.setAttribute('data-shown', '');
    }
    root.setAttribute('data-motion', 'on');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute('data-shown', '');
          el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
          revealObserver.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    for (const el of reveals) {
      if (!el.hasAttribute('data-shown')) revealObserver.observe(el);
    }

    // Scroll-linked progress. Default: 0 as the element enters, 1 once it
    // nears the top of the viewport. "enter": completes while scrolling into
    // view, for elements at the end of the page that never reach the top.
    const tracked = Array.from(root.querySelectorAll<HTMLElement>('[data-scroll-progress]'));
    let frame = 0;
    const measure = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of tracked) {
        const rect = el.getBoundingClientRect();
        const progress =
          el.dataset.scrollProgress === 'enter'
            ? clamp01((vh - rect.top) / (rect.height * 1.25))
            : clamp01((vh * 0.82 - rect.top) / (rect.height + vh * 0.1));
        el.style.setProperty('--progress', progress.toFixed(4));
        const label = el.querySelector<HTMLElement>('[data-progress-label]');
        if (label) label.textContent = `${Math.round(progress * 100)}%`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      root.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', fitWordmark);
      root.removeAttribute('data-motion');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
