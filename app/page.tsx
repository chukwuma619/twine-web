import Link from "next/link";
import type { ReactNode } from "react";
import { DownloadBlock } from "./download-block";
import { questions } from "./faq-items";
import { CoinMark, HeroScene, KeyMark, NoteMark } from "./illustrations";
import { FaqList, textLink } from "./prose";
import { TradeStory } from "./trade-story";
import { TwineLogo } from "./twine-logo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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

const limits = [
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
  },
  {
    title: "The order book is in the app",
    body: "This site explains the desk and hosts the download. It does not list live orders.",
  },
];

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-6">
        <section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Badge variant="secondary" className="gap-1.5">
              <TwineLogo className="size-3.5 text-primary" />
              Twine
            </Badge>
            <h1 className="mt-4 max-w-xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-pretty text-foreground sm:text-6xl">
              Non-custodial P2P for Nervos CKB.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Buy and sell CKB with local fiat. Orders, encrypted chat, and
              trade actions run over Nostr. The seller locks the coins in
              their own Fiber channel.
            </p>
            <Alert className="mt-8 max-w-xl px-4 py-4">
              <AlertTitle className="text-lg leading-7">
                Twine never holds the fiat, and it never holds a key that can
                spend the locked CKB.
              </AlertTitle>
              <AlertDescription className="text-sm leading-6">
                If a trade does not finish, Fiber&apos;s timelock returns the
                CKB to the seller&apos;s channel.
              </AlertDescription>
            </Alert>
            <div className="mt-10">
              <DownloadBlock />
            </div>
            <Button
              variant="link"
              nativeButton={false}
              render={<a href="#trade" />}
              className="mt-4 h-auto px-0"
            >
              How a trade moves
            </Button>
          </div>
          <HeroScene />
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <p className="text-sm font-medium text-muted-foreground">The desk</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-foreground sm:text-4xl">
            Three things stay outside Twine.
          </h2>
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
              <Card key={item.title} className="rise">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {item.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="trade" className="scroll-mt-20 border-t border-border py-16 sm:py-20">
          <p className="text-sm font-medium text-muted-foreground">A trade</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-foreground sm:text-4xl">
            Five steps. One listing, taken in slices.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            A buyer takes some or all of a listing, inside its minimum and
            maximum. More than one trade can be open on a listing while CKB
            remains.
          </p>
          <TradeStory steps={tradeSteps} />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            <Link href="/how-it-works" className={textLink}>
              The full sequence
            </Link>
            , including cancel and a failed payout. The clocks and the dispute
            are on{" "}
            <Link href="/security" className={textLink}>
              Security
            </Link>
            .
          </p>
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <p className="text-sm font-medium text-muted-foreground">Questions</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-foreground sm:text-4xl">
            Before you download.
          </h2>
          <div className="mt-10">
            <FaqList items={homeQuestions} />
          </div>
          <p className="mt-8 text-sm leading-6">
            <Link href="/faq" className={textLink}>
              All questions
            </Link>
          </p>
        </section>

        <section className="border-t border-border py-16 sm:py-24">
          <p className="text-sm font-medium text-muted-foreground">Operators</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-foreground sm:text-4xl">
            The app ships with one desk. You can run another.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            The coordinator is open source. Running it still does not give you
            the seller&apos;s key or the buyer&apos;s secret. Fiat still moves
            between the two traders.
          </p>
          <p className="mt-8 text-sm leading-6">
            <Link href="/run" className={textLink}>
              What a desk runs
            </Link>
          </p>
        </section>
      </div>
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
        <CardDescription className="leading-6">{children}</CardDescription>
      </CardHeader>
    </Card>
  );
}
