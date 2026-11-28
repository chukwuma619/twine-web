import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "cn";
import { CoinMark, HeroScene, KeyMark, NoteMark } from "../components/illustrations";
import { TradeStory } from "../components/trade-story";
import { WhyTwine } from "../components/why-twine";
import { Button } from "@/components/ui/button";

const tradeSteps = [
  {
    title: "Post",
    body: "A seller lists CKB: a price, a currency, how much is for sale, and a minimum and maximum. Account details stay off the listing.",
  },
  {
    title: "Take",
    body: "A buyer names an amount inside those limits and a Fiber invoice. The secret behind that invoice stays on their node.",
  },
  {
    title: "Lock",
    body: "The seller pays a hold invoice from their own Fiber wallet. Twine does not have their key. An unpaid hold expires after one hour.",
  },
  {
    title: "Pay",
    body: "The seller sends account details in the encrypted chat. The buyer pays that account outside Twine, adds a receipt, and marks it sent.",
  },
  {
    title: "Release",
    body: "The seller checks the money and releases. Twine pays the buyer's invoice. That payment settles the hold, and the buyer receives the CKB.",
  },
];

const limits: { title: string; body: string; good?: boolean }[] = [
  {
    title: "A Nostr key is the account",
    body: "No username, no email, and no identity document. The app stores the key. Twine does not keep another copy.",
  },
  {
    title: "The chat stays with the two traders",
    body: "It is encrypted between them. The coordinator cannot read the account details or the receipt.",
  },
  {
    title: "No fee, no rating, no bond",
    body: "This software charges no trading fee, keeps no rating, and takes no bond.",
    good: true,
  },
  {
    title: "The order book is in the app",
    body: "This site explains the desk and hosts the download. It does not list live orders.",
  },
];

const howItWorks: { title: string; body: string }[] = [
  {
    title: "Get the app",
    body: "The app stores a Nostr key on your device. That key posts listings and signs each step. There is no username and no separate signup.",
  },
  {
    title: "Post or take a listing",
    body: "A seller names a price, a currency, and how much CKB is for sale, plus a minimum and a maximum. A buyer takes an amount inside those limits.",
  },
  {
    title: "Lock the coins, pay the person",
    body: "The seller locks CKB from their own Fiber wallet. Account details arrive in the encrypted chat. The buyer pays that account outside Twine.",
  },
  {
    title: "Release",
    body: "The seller checks the money and releases. Twine pays the buyer's invoice, the hold settles, and the buyer receives the CKB.",
  },
];

const facts: { title: string; icon: ReactNode; body: string }[] = [
  {
    title: "Your key",
    icon: <KeyMark />,
    body: "The app stores a Nostr key. That key is the account. The app stores no Fiber key and pays no invoice.",
  },
  {
    title: "The coins",
    icon: <CoinMark />,
    body: "The seller locks CKB in their own Fiber channel. Paying the buyer's invoice is what settles the hold.",
  },
  {
    title: "The fiat",
    icon: <NoteMark />,
    body: "You pay the other person yourself. Twine shows the account they typed. It does not send the transfer, and it cannot reverse one.",
  },
];

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <div className="shell">
        <section className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-24">
          <div>
            <h1 className="display">
              <span className="block">Non-custodial</span>
              <span className="block">P2P for</span>
              <span className="block">Nervos CKB.</span>
            </h1>
            <p className="lede mt-6">
              Buy and sell CKB with local fiat. Orders, encrypted chat, and
              trade actions run over Nostr. The seller locks the coins in
              their own Fiber channel.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                nativeButton={false}
                render={<Link href="/download" />}
                size="lg"
              >
                Download
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="#trade" />}
                variant="outline"
                size="lg"
              >
                See a trade
              </Button>
            </div>
          </div>
          <HeroScene />
        </section>

        <section id="how" className="section">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">Four steps. The coins stay in Fiber.</h2>
          <p className="lede mt-5">
            Orders and trade actions run over Nostr. CKB moves on Fiber, in
            wallets the traders control. Fiat moves outside the app.
          </p>
          <ol className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {howItWorks.map((step, index) => (
              <li key={step.title} className="bg-cloth px-6 py-8 sm:px-8">
                <p className="font-mono text-xs tracking-wide text-cord" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-sans text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8">
            <Link href="#trade" className="text-link">
              See a trade, step by step
            </Link>
          </p>
        </section>
      </div>

      <WhyTwine />

      <div className="shell">
        <section className="section">
          <p className="eyebrow">The desk</p>
          <h2 className="section-title">Three things stay outside Twine.</h2>
          <div className="mt-12 grid border-y border-rule md:grid-cols-3 md:border">
            {facts.map((fact) => (
              <Fact key={fact.title} title={fact.title} icon={fact.icon}>
                {fact.body}
              </Fact>
            ))}
          </div>
          <ul className="mt-4">
            {limits.map((item) => (
              <li
                key={item.title}
                className={cn(
                  "grid gap-2 border-b border-rule py-6 sm:grid-cols-[16rem_1fr] sm:items-baseline sm:gap-10",
                  item.good && "border-l-2 border-l-cord pl-4",
                )}
              >
                <h3
                  className={cn(
                    "font-sans text-base font-semibold tracking-tight",
                    item.good && "text-ink",
                  )}
                >
                  {item.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="trade" className="section">
          <p className="eyebrow">A trade</p>
          <h2 className="section-title">
            Five steps. One listing, taken in slices.
          </h2>
          <p className="lede mt-5">
            A buyer takes some or all of a listing, inside its minimum and
            maximum. More than one trade can be open on a listing while CKB
            remains.
          </p>
          <TradeStory steps={tradeSteps} />
        </section>
      </div>

      <section className="surface-inverse">
        <div className="shell py-16 sm:py-24">
          <p className="eyebrow">Operators</p>
          <h2 className="section-title">
            The app ships with one desk. You can run another.
          </h2>
          <p className="lede mt-5">
            The coordinator is open source. Running it still does not give you
            the seller&apos;s key or the buyer&apos;s secret. Fiat still moves
            between the two traders.
          </p>
          <p className="mt-8">
            <Link href="/run" className="text-link">
              What a desk runs
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function Fact({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="border-b border-rule py-8 last:border-b-0 md:border-r md:border-b-0 md:px-6 md:last:border-r-0">
      {icon}
      <h3 className="mt-5 font-sans text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">
        {children}
      </p>
    </article>
  );
}
