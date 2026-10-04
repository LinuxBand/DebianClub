'use client';

import { useEffect, useRef, useState } from 'react';

interface Step {
  command: string;
  output: string[];
}

interface View {
  /** finished commands, with all of their output shown */
  done: number;
  /** characters typed of the current command */
  typed: number;
  /** output lines shown for the current command */
  lines: number;
}

const PROMPT_USER = 'learner@debian';

function Prompt() {
  return (
    <>
      <span className="text-white/45">{PROMPT_USER}</span>
      <span className="text-white/30">:~</span>
      <span className="text-[#ff6b9d]">$ </span>
    </>
  );
}

/**
 * A terminal that types a few real Debian commands. Plays whenever it scrolls
 * into view; under reduced motion it renders the finished session instead.
 */
export function HeroTerminal({
  version,
  codename,
  className,
}: {
  version: string;
  codename: string;
  className?: string;
}) {
  const steps: Step[] = [
    { command: 'cat /etc/debian_version', output: [version] },
    {
      command: 'sudo apt update',
      output: [
        `Hit:1 http://deb.debian.org/debian ${codename} InRelease`,
        'Reading package lists... Done',
        'All packages are up to date.',
      ],
    },
    { command: 'systemctl is-system-running', output: ['running'] },
  ];
  const stepsRef = useRef(steps);
  const rootRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ done: 0, typed: 0, lines: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const script = stepsRef.current;
    const finished: View = { done: script.length, typed: 0, lines: 0 };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setView(finished);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const wait = (ms: number, next: () => void) => {
      timer = setTimeout(next, ms);
    };

    const run = (state: View) => {
      setView(state);
      const step = script[state.done];
      if (!step) return;
      if (state.typed < step.command.length) {
        wait(34 + Math.random() * 58, () => run({ ...state, typed: state.typed + 1 }));
      } else if (state.lines < step.output.length) {
        wait(state.lines === 0 ? 320 : 130, () => run({ ...state, lines: state.lines + 1 }));
      } else {
        wait(620, () => run({ done: state.done + 1, typed: 0, lines: 0 }));
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer);
        if (entry.isIntersecting) wait(900, () => run({ done: 0, typed: 0, lines: 0 }));
      },
      { threshold: 0.6 },
    );
    observer.observe(root);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const current = steps[view.done];

  return (
    <div ref={rootRef} aria-hidden="true" className={`home-terminal ${className ?? ''}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-[#ff6b9d]/80" />
        <span className="ms-3 font-code text-[11px] tracking-wide text-white/35">{PROMPT_USER}: ~</span>
      </div>
      <div className="home-terminal__body font-code">
        {steps.slice(0, view.done).map((step) => (
          <div key={step.command}>
            <p>
              <Prompt />
              <span className="text-white">{step.command}</span>
            </p>
            {step.output.map((line) => (
              <p key={line} className="text-white/55">
                {line}
              </p>
            ))}
          </div>
        ))}
        {current ? (
          <div>
            <p>
              <Prompt />
              <span className="text-white">{current.command.slice(0, view.typed)}</span>
              {view.lines === 0 && <span className="home-caret" />}
            </p>
            {current.output.slice(0, view.lines).map((line) => (
              <p key={line} className="text-white/55">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p>
            <Prompt />
            <span className="home-caret" />
          </p>
        )}
      </div>
    </div>
  );
}
