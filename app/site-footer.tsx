import Link from "next/link";
import { External, navLink } from "./prose";

const pages = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/security", label: "Security" },
  { href: "/download", label: "Download" },
  { href: "/faq", label: "Questions" },
  { href: "/run", label: "Run a desk" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 text-sm leading-6 text-on-surface-variant sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-sm">
          Orders are public Nostr events. The coordinator is open source, so
          anyone can run a desk. The app ships with one already filled in.
        </p>
        <div className="flex flex-col gap-6 sm:items-end">
          <nav aria-label="Pages" className="flex flex-wrap gap-x-5 gap-y-2">
            {pages.map((page) => (
              <Link key={page.href} href={page.href} className={navLink}>
                {page.label}
              </Link>
            ))}
          </nav>
          <p className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            <External href="https://github.com/chukwuma619/twine">
              Coordinator
            </External>
            <External href="https://github.com/chukwuma619/twine/blob/main/DEPLOY.md">
              Deploy guide
            </External>
            <External href="https://github.com/chukwuma619/twine_app">
              App
            </External>
            <External href="https://getfiberstudio.com">Fiber Studio</External>
          </p>
        </div>
      </div>
    </footer>
  );
}
