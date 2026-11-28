"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TradeFigure } from "./illustrations";

function subscribeReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TradeStory({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    () => false,
  );
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let current = 0;
    const sync = () => {
      const line = window.innerHeight * 0.32;
      let next = 0;
      for (const [index, node] of itemRefs.current.entries()) {
        if (node && node.getBoundingClientRect().top <= line) {
          next = index;
        }
      }
      if (next !== current) {
        current = next;
        setActive(next);
      }
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [steps.length]);

  const current = steps[active] ?? steps[0];

  return (
    <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <div className="lg:sticky lg:top-24">
        <TradeFigure step={active} reduced={reduced} />
        <div className="mt-4 hidden gap-1.5 lg:flex" aria-hidden="true">
          {steps.map((step, index) => (
            <span
              key={step.title}
              className={`h-0.5 flex-1 ${index === active ? "bg-cord" : index < active ? "bg-ink" : "bg-strand"}`}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="sticky top-header z-[1] border-b border-rule bg-cloth/95 py-3 backdrop-blur-sm lg:hidden">
          <p className="font-mono text-xs font-medium tracking-wide text-cord">
            {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
          <p className="font-sans font-semibold tracking-tight text-ink">{current?.title}</p>
        </div>
        <ol className="lg:mt-2">
          {steps.map((step, index) => (
            <li
              key={step.title}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="grid min-h-[34vh] grid-cols-[2.25rem_1fr] lg:min-h-[48vh]"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`font-mono text-sm leading-6 ${index === active ? "text-cord" : "text-ink-soft"}`}
                >
                  {index + 1}
                </span>
                {index === steps.length - 1 ? null : (
                  <span className="my-2 w-px flex-1 bg-strand" />
                )}
              </div>
              <div className="pb-10">
                <h3 className="font-sans text-xl leading-6 font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
