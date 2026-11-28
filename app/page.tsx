import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "cn";
import { questions } from "../components/faq-items";
import { CoinMark, HeroScene, KeyMark, NoteMark } from "../components/illustrations";
import { TradeStory } from "../components/trade-story";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const homeQuestions = [
  "Who am I paying?",
  "Can Twine spend the locked CKB?",
  "What if I pay and they don't release?",
  "Does Twine charge a fee?",
].flatMap((question) => questions.filter((item) => item.q === question));

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

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <div className="shell">
        <section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <h1 className="display">Non-custodial P2P for Nervos CKB.</h1>
            <p className="lede mt-6 max-w-xl">
              Buy and sell CKB with local fiat. Orders, encrypted chat, and
              trade actions run over Nostr. The seller locks the coins in
              their own Fiber channel.
            </p>
            <div className="mt-10">
              <Button
                nativeButton={false}
                render={<Link href="/download" />}
                size="lg"
              >
                Download
              </Button>
            </div>
          </div>
          <HeroScene />
        </section>

        <section className="section">
          <p className="eyebrow">The desk</p>
          <h2 className="section-title">Three things stay outside Twine.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Fact title="Your key" icon={<KeyMark />}>
              The app stores a Nostr key. That key is the account. The app
              stores no Fiber key and pays no invoice.
            </Fact>
            <Fact title="The coins" icon={<CoinMark />}>
              The seller locks CKB in their own Fiber channel. Paying the
              buyer&apos;s invoice is what settles the hold.
            </Fact>
            <Fact title="The fiat" icon={<NoteMark />}>
              You pay the other person yourself. Twine shows the account they
              typed. It does not send the transfer, and it cannot reverse one.
            </Fact>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {limits.map((item) => (
              <Card
                key={item.title}
                className={cn(
                  "rise",
                  item.good
                    ? "bg-success-wash ring-success/25"
                    : "bg-secondary",
                )}
              >
                <CardHeader>
                  <CardTitle className={item.good ? "text-success" : undefined}>
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
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
          <p className="mt-8 text-sm leading-6">
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
    <Card className="rise">
      <CardHeader>
        {icon}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{children}</CardDescription>
      </CardHeader>
    </Card>
  );
}
