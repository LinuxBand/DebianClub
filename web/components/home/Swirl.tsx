'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  /** position along the arm: 0 = centre, 1 = outer tail */
  t: number;
  /** offset across the ribbon width, roughly -1..1 */
  off: number;
  speed: number;
  size: number;
  alpha: number;
  depth: number;
}

interface Dust {
  radius: number;
  angle: number;
  speed: number;
  size: number;
  alpha: number;
}

const ARM_PARTICLES = 2600;
const DUST_PARTICLES = 150;
const TURNS = 1.62;
const THETA_MAX = Math.PI * 2 * TURNS;
// Canvas angle of the outer tail; the arm winds inward counter-clockwise from
// here, which gives the open-at-the-bottom-left silhouette of the Debian swirl.
const TAIL_ANGLE = 1.95;

// Deterministic PRNG so the swirl has the same shape on every visit.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildParticles() {
  const rand = mulberry32(1993);
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;
  const arm: Particle[] = [];
  for (let i = 0; i < ARM_PARTICLES; i++) {
    const depth = rand();
    arm.push({
      // Bias toward the outer turns: they are longer, so they need more dots.
      t: Math.pow(rand(), 0.72),
      off: gauss(),
      speed: 0.005 + rand() * 0.011,
      size: 0.55 + depth * 1.55,
      alpha: 0.3 + depth * 0.7,
      depth,
    });
  }
  const dust: Dust[] = [];
  for (let i = 0; i < DUST_PARTICLES; i++) {
    dust.push({
      radius: 0.25 + rand() * 1.05,
      angle: rand() * Math.PI * 2,
      speed: (0.004 + rand() * 0.012) * (rand() > 0.5 ? 1 : -1),
      size: 0.4 + rand() * 1.1,
      alpha: 0.06 + rand() * 0.2,
    });
  }
  return { arm, dust };
}

/**
 * The Debian swirl as a field of drifting particles: packages flowing down the
 * arm into the centre. Reacts to the pointer, follows the active theme colour,
 * pauses off-screen and renders a single still frame under reduced motion.
 */
export function Swirl({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { arm, dust } = buildParticles();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let accent = '#d70a53';
    let ink = '#171717';
    let frame = 0;
    let visible = true;
    let last = performance.now();
    let clock = 0;
    // Pointer in canvas pixels; starts far away so nothing is displaced.
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const readColors = () => {
      const style = getComputedStyle(canvas);
      accent = style.getPropertyValue('--color-fd-primary').trim() || accent;
      ink = style.getPropertyValue('--color-fd-foreground').trim() || ink;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.41;
      const sway = Math.sin(clock * 0.16) * 0.07;
      const hasPointer = pointer.x > -9000;
      const px = hasPointer ? (pointer.x - cx) / R : 0;
      const py = hasPointer ? (pointer.y - cy) / R : 0;
      const repel = R * 0.34;

      ctx.fillStyle = ink;
      for (const d of dust) {
        const a = d.angle + clock * d.speed;
        const r = d.radius * R;
        ctx.globalAlpha = d.alpha;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * r - px * 6, cy + Math.sin(a) * r - py * 6, d.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = accent;
      for (const p of arm) {
        // Flow inward: t shrinks over time and wraps back to the tail.
        const t = (((p.t - clock * p.speed) % 1) + 1) % 1;
        const fade = Math.sin(Math.PI * Math.pow(t, 1.25));
        // Brush-stroke profile: hairline at the core, boldest on the outer
        // turn, tapering out again at the tail.
        const ribbon = R * (0.012 + 0.15 * Math.pow(fade, 0.85) * (0.3 + 0.7 * t));
        const r = R * (0.07 + 0.93 * Math.pow(t, 0.82)) + p.off * ribbon;
        const a = TAIL_ANGLE + (1 - t) * THETA_MAX + sway;
        let x = cx + Math.cos(a) * r - px * (4 + p.depth * 14);
        let y = cy + Math.sin(a) * r - py * (4 + p.depth * 14);

        if (hasPointer) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < repel && dist > 0.001) {
            const push = Math.pow(1 - dist / repel, 2) * 34;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
          }
        }

        ctx.globalAlpha = p.alpha * Math.min(1, fade * 2.4, t * 9);
        ctx.beginPath();
        ctx.arc(x, y, p.size * (0.6 + 0.6 * t), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock += dt;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduce.matches || !visible) {
        draw();
        return;
      }
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      if (pointer.x < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };

    readColors();
    resize();
    // A still frame mid-flow reads better than t=0 for reduced motion.
    clock = 12;
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    visibility.observe(canvas);

    // fumadocs toggles the theme by flipping a class on <html>.
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('pointermove', onPointer, { passive: true });
    reduce.addEventListener('change', start);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
      reduce.removeEventListener('change', start);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
