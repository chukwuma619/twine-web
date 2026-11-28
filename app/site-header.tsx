"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { cn } from "cn";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLink } from "./prose";
import { TwineLogo } from "./twine-logo";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/security", label: "Security" },
  { href: "/run", label: "Run a desk" },
  { href: "/faq", label: "Questions" },
  { href: "/download", label: "Download" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-medium tracking-tight text-foreground"
        >
          <TwineLogo className="size-6 text-primary" />
          Twine
        </Link>
        <nav aria-label="Site" className="hidden items-center gap-5 text-sm sm:flex">
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
                className={`${navLink} ${current ? "text-foreground" : ""}`}
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
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Twine</SheetTitle>
              <SheetDescription>Non-custodial P2P for Nervos CKB.</SheetDescription>
            </SheetHeader>
            <Separator />
            <nav aria-label="Site" className="flex flex-col gap-1 px-4">
              {links.map((link) => {
                const current = pathname === link.href;
                const className =
                  link.href === "/download"
                    ? cn(buttonVariants(), "mt-2 w-full")
                    : `rounded-lg px-3 py-2 text-sm font-medium ${current ? "bg-muted text-foreground" : "text-muted-foreground"}`;
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
