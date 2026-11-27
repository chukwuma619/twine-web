"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLink } from "./prose";
import { TwineLogo } from "./twine-logo";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/security", label: "Security" },
  { href: "/run", label: "Run a desk", hideOnSmall: true },
  { href: "/download", label: "Download" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-outline-variant bg-surface-container-low">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-medium tracking-tight text-on-surface"
        >
          <TwineLogo className="size-6 text-primary" />
          Twine
        </Link>
        <nav aria-label="Site" className="flex items-center gap-5 text-sm">
          {links.map((link) => {
            const current = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`${navLink} ${link.hideOnSmall ? "hidden sm:inline" : ""} ${current ? "text-on-surface" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
