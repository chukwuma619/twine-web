import type { Metadata } from "next";
import { Atkinson_Hyperlegible, IBM_Plex_Mono, Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

const display = Atkinson_Hyperlegible({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ui = Inter({
  variable: "--font-ui-face",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Twine — Non-custodial P2P for Nervos CKB on Nostr and Fiber",
    template: "%s — Twine",
  },
  description:
    "Twine is a non-custodial peer-to-peer (P2P) desk for buying and selling CKB with local fiat. Orders, encrypted chat, and trade actions run over Nostr.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${ui.variable} ${mono.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-sheet focus:px-3 focus:py-2 focus:font-sans focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <TooltipProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </TooltipProvider>
      </body>
    </html>
  );
}
