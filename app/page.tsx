import Link from "next/link";
import type { ReactNode } from "react";
import { DownloadBlock } from "./download-block";
import { Callout, textLink } from "./prose";
import { TwineLogo } from "./twine-logo";

const readNext = [
  {
    href: "/how-it-works",
    title: "How a trade works",
    body: "Post, take, lock, pay, and release. What each person does.",
  },
  {
    href: "/security",
    title: "Who holds the money",
    body: "Your key, the Fiber hold, the clocks, and what a dispute can do.",
  },
  {
    href: "/download",
    title: "What you need",
    body: "The app, and the Fiber wallet a trade actually uses.",
  },
  {
    href: "/run",
    title: "Run a desk",
    body: "The coordinator is open source. Anyone can host one.",
  },
  {
    href: "/faq",
    title: "Questions",
    body: "Who you pay, a failed release, fees, and the missing iPhone app.",
  },
];

const tradeSteps = [
  {
    title: "Post",
    body: "A seller lists CKB: a price, a currency, how much is for sale, and a minimum and maximum.",
  },
  {
    title: "Take",
    body: "A buyer names an amount inside those limits and a Fiber invoice. The secret behind that invoice stays on their node.",
  },
  {
    title: "Lock",
    body: "The seller pays a hold invoice from their own Fiber wallet. Twine does not have their key.",
  },
  {
    title: "Pay",
    body: "The seller sends account details in the chat. The buyer pays that account outside Twine and marks it sent.",
  },
  {
    title: "Release",
    body: "The seller checks the money and releases. Twine pays the buyer's invoice. The buyer receives the CKB.",
  },
];

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-6">
        <section className="py-16 sm:py-24">
          <p className="flex items-center gap-2 text-sm font-medium text-primary">
            <TwineLogo className="size-4" />
            Twine
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-pretty text-on-surface sm:text-6xl">
            Non-custodial P2P for Nervos CKB on Nostr and Fiber.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-on-surface-variant">
            Twine is a peer-to-peer desk for buying and selling CKB with local
            fiat. Orders, encrypted chat, and trade actions run over Nostr.
            The order book lives in the app.
          </p>
          <Callout className="mt-8">
            <p className="text-lg leading-7 font-medium">
              Twine never holds the fiat, and it never holds a key that can
              spend the locked CKB.
            </p>
            <p className="mt-2 text-sm leading-6">
              If a trade fails or times out, Fiber&apos;s timelock returns the
              CKB to the seller&apos;s channel. If a buyer cannot receive yet,
              Twine opens a channel to them at payout.
            </p>
          </Callout>
          <div className="mt-10">
            <DownloadBlock />
          </div>
        </section>

        <section className="border-t border-outline-variant py-16 sm:py-20">
          <p className="text-sm font-medium text-primary">The desk</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-on-surface sm:text-4xl">
            Three things stay outside Twine.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
            <Fact title="Your key">
              The app stores a Nostr key. That key is the account. There is no
              username. The app stores no Fiber key and pays no invoice.
            </Fact>
            <Fact title="The coins" divided>
              The seller locks CKB in their own Fiber channel. Paying the
              buyer&apos;s invoice is what settles the hold.
            </Fact>
            <Fact title="The fiat" divided>
              You pay the other person yourself. Twine shows the account they
              typed. It does not send the transfer, and it cannot reverse one.
            </Fact>
          </div>
        </section>

        <section className="border-t border-outline-variant py-16 sm:py-20">
          <p className="text-sm font-medium text-primary">A trade</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-on-surface sm:text-4xl">
            Five steps. One listing, taken in slices.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-on-surface-variant">
            A buyer takes some or all of a listing, inside its minimum and
            maximum. More than one trade can be open on a listing while CKB
            remains.
          </p>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {tradeSteps.map((step, index) => (
              <li key={step.title}>
                <p className="font-mono text-sm text-primary">{index + 1}</p>
                <h3 className="mt-2 font-medium text-on-surface">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm leading-6 text-on-surface-variant">
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

        <section className="border-t border-outline-variant py-16 sm:py-20">
          <p className="text-sm font-medium text-primary">Read next</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-on-surface sm:text-4xl">
            The rest of the site.
          </h2>
          <dl className="mt-10 max-w-2xl divide-y divide-outline-variant border-t border-outline-variant">
            {readNext.map((page) => (
              <div
                key={page.href}
                className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8"
              >
                <dt>
                  <Link href={page.href} className={textLink}>
                    {page.title}
                  </Link>
                </dt>
                <dd className="text-sm leading-6 text-on-surface-variant">{page.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}

function Fact({
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
          ? "border-t border-outline-variant pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-8"
          : "md:pr-8"
      }
    >
      <h3 className="font-medium text-on-surface">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{children}</p>
    </div>
  );
}
