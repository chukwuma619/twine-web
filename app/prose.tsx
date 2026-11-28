import type { ReactNode } from "react";

export const textLink =
  "font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring";

export const navLink =
  "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring";

export function Article({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-6">
        <header className="max-w-3xl py-16 sm:py-20">
          <p className="text-sm font-medium text-muted-foreground">{kicker}</p>
          <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{lede}</p>
        </header>
        {children}
      </div>
    </main>
  );
}

export function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-border py-16 sm:py-20"
    >
      {kicker ? (
        <p className="text-sm font-medium text-muted-foreground">{kicker}</p>
      ) : null}
      <h2
        className={
          kicker
            ? "mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-foreground sm:text-4xl"
            : "max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-foreground sm:text-4xl"
        }
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Role({
  title,
  children,
  divided = false,
}: {
  title: string;
  children: ReactNode;
  divided?: boolean;
}) {
  return (
    <div
      className={
        divided
          ? "border-t border-border pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-10"
          : "md:pr-10"
      }
    >
      <h3 className="font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{children}</p>
    </div>
  );
}

export function Step({
  n,
  title,
  body,
  last,
}: {
  n: string;
  title: string;
  body: string;
  last: boolean;
}) {
  return (
    <li className="grid grid-cols-[2.25rem_1fr]">
      <div className="flex flex-col items-center">
        <span className="font-mono text-sm leading-6 text-primary">{n}</span>
        {last ? null : <span className="my-2 w-px flex-1 bg-border" />}
      </div>
      <div className={last ? undefined : "pb-8"}>
        <h3 className="leading-6 font-medium text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

export function Steps({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ol className="mt-10 max-w-2xl">
      {items.map((step, index) => (
        <Step
          key={step.title}
          n={String(index + 1)}
          title={step.title}
          body={step.body}
          last={index === items.length - 1}
        />
      ))}
    </ol>
  );
}

export function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={textLink}>
      {children}
    </a>
  );
}

export function Callout({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl border-l-2 border-primary pl-5 ${className}`}>
      {children}
    </div>
  );
}

export function FaqList({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="max-w-2xl divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="mt-0.5 font-mono text-muted-foreground transition-transform duration-150 ease-out group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
