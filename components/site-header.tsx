"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { cn } from "cn";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandWordmark } from "./brand-wordmark";

const links = [
  { href: "/", label: "Home" },
  { href: "/#how", label: "How it works" },
  { href: "/#why", label: "Why Twine" },
  { href: "/download", label: "Download" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-cloth/90 backdrop-blur-[6px]">
      <div className="shell flex h-header items-center justify-between">
        <BrandWordmark />
        <nav aria-label="Site" className="hidden items-center gap-6 sm:flex">
          {links.map((link) => {
            if (link.href === "/download") {
              return (
                <Button
                  key={link.href}
                  nativeButton={false}
                  render={<Link href={link.href} />}
                  size="sm"
                >
                  {link.label}
                </Button>
              );
            }
            const current = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "font-sans text-xs font-bold tracking-[0.08em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cord",
                  current ? "text-white" : "text-ink-soft hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="sm:hidden" />}
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="border-rule bg-cloth-2">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl font-normal tracking-[-0.04em]">
                Twine
              </SheetTitle>
              <SheetDescription className="font-sans text-sm text-ink-soft">
                Non-custodial P2P for Nervos CKB.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Site" className="flex flex-col gap-1 px-4">
              {links.map((link) => {
                const current = pathname === link.href;
                const className =
                  link.href === "/download"
                    ? cn(buttonVariants(), "mt-3 w-full")
                    : cn(
                        "px-3 py-2 font-sans text-xs font-bold tracking-[0.08em] uppercase",
                        current ? "bg-cloth-3 text-white" : "text-ink-mid",
                      );
                return (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={<Link href={link.href} className={className} />}
                  >
                    {link.label}
                  </SheetClose>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
