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
    const nodes = itemRefs.current.filter((node) => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const next = visible[0];
        if (!next) {
          return;
        }
        const index = Number((next.target as HTMLElement).dataset.index);
        if (Number.isInteger(index)) {
          setActive(index);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    );
    for (const node of nodes) {
      observer.observe(node);
    }
    return () => observer.disconnect();
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
              className={`h-1 flex-1 rounded-full ${index === active ? "bg-brass" : index < active ? "bg-thread" : "bg-grain"}`}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="sticky top-14 z-[1] border-b border-border bg-background/95 py-3 backdrop-blur-sm lg:hidden">
          <p className="font-mono text-xs text-primary">
            {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
          <p className="font-medium text-foreground">{current?.title}</p>
        </div>
        <ol className="lg:mt-2">
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-index={index}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="grid min-h-[34vh] grid-cols-[2.25rem_1fr] lg:min-h-[48vh]"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`font-mono text-sm leading-6 ${index === active ? "text-primary" : "text-muted-foreground"}`}
                >
                  {index + 1}
                </span>
                {index === steps.length - 1 ? null : (
                  <span className="my-2 w-px flex-1 bg-grain" />
                )}
              </div>
              <div className="pb-10">
                <h3 className="leading-6 font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
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
