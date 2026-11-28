import Link from "next/link";
import { BrandWordmark } from "./brand-wordmark";

const footerLink =
  "font-sans text-sm font-semibold tracking-tight text-ink-soft underline decoration-ink/20 underline-offset-4 transition-colors hover:text-cord hover:decoration-cord focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-cord";

const pages = [
  { href: "/", label: "Home" },
  { href: "/#how", label: "How it works" },
  { href: "/#why", label: "Why Twine" },
  { href: "/download", label: "Download" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-cloth">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <BrandWordmark />
          <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft">
            Orders are public Nostr events. The coordinator is open source, so
            anyone can run a desk. The app ships with one already filled in.
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:items-end">
          <nav aria-label="Pages" className="flex flex-wrap gap-x-5 gap-y-2">
            {pages.map((page) => (
              <Link key={page.href} href={page.href} className={footerLink}>
                {page.label}
              </Link>
            ))}
          </nav>
          <p className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            <a
              href="https://github.com/chukwuma619/twine"
              target="_blank"
              rel="noreferrer"
              className={footerLink}
            >
              Coordinator
            </a>
            <a
              href="https://github.com/chukwuma619/twine/blob/main/DEPLOY.md"
              target="_blank"
              rel="noreferrer"
              className={footerLink}
            >
              Deploy guide
            </a>
            <a
              href="https://github.com/chukwuma619/twine_app"
              target="_blank"
              rel="noreferrer"
              className={footerLink}
            >
              App
            </a>
            <a
              href="https://getfiberstudio.com"
              target="_blank"
              rel="noreferrer"
              className={footerLink}
            >
              Fiber Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
