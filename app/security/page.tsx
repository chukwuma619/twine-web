import type { Metadata } from "next";
import Link from "next/link";
import { Article, Callout, textLink } from "../prose";

export const metadata: Metadata = {
  title: "Who holds the money",
  description:
    "Twine coordinates the order book. It does not hold fiat, and it does not hold a key that can spend locked CKB. Fiber's timelock returns the coins if a trade does not finish.",
};

const coinRows = [
  {
    label: "Your key",
    body: "The app stores a Nostr key. That key is the account. There is no username. The app stores no Fiber key and pays no invoice.",
  },
  {
    label: "The chat",
    body: "Encrypted between the two traders. The coordinator cannot read it. The seller's account details and the buyer's receipt live there.",
  },
  {
    label: "Cancel",
    body: "Either person can cancel while the hold is still unpaid. After the seller locks, cancel is refused. The coins wait for release or for the timelock.",
  },
  {
    label: "A failed payout",
    body: "If the CKB cannot reach the buyer, the hold stays locked. The buyer brings the wallet online and pastes the same invoice again. An invoice that expires first cannot be replaced, and the hold returns the CKB to the seller.",
  },
  {
    label: "A dispute",
    body: "Either person can open one while the coins are locked, when that desk has a solver. The app seals this trade's chat to the solver, so the solver can read it and the desk cannot. The seller can still release. The solver can pay the buyer, or let the hold expire and return the CKB to the seller. A desk with no solver says so before the buyer pays.",
  },
  {
    label: "Fees",
    body: "This software charges no trading fee, keeps no rating, and takes no bond.",
  },
];

export default function Security() {
  return (
    <Article
      kicker="The coins"
      title="Who holds the money"
      lede="Twine coordinates the order book and, when a desk publishes one, a dispute. It never holds the fiat, and it never holds a key that can spend the locked CKB."
    >
      <div className="max-w-2xl border-t border-outline-variant py-16 sm:py-20">
        <p className="text-lg leading-8 text-on-surface-variant">
          The buyer creates a secret on their own Fiber node, and an invoice
          locked to it. Twine copies that lock onto the seller&apos;s hold and
          stores no secret. Paying the buyer&apos;s invoice is what reveals
          it, and that same secret settles the hold. Twine can finish the lock
          only by paying the buyer first.
        </p>
        <p className="mt-4 leading-7 text-on-surface-variant">
          If a trade does not finish, Fiber&apos;s timelock returns the CKB to
          the seller&apos;s channel. The channel can stay locked longer than
          the trade window below. Twine does not set that unlock.
        </p>
      </div>

      <section className="border-t border-outline-variant py-16 sm:py-20">
        <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-on-surface sm:text-4xl">
          The clocks
        </h2>
        <Callout tone="warning" className="mt-10">
          <p className="font-medium">
            One hour to lock. Forty-eight hours on the hold.
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-6">
            <li>
              The seller has 1 hour to lock the coins. After that, the listing
              is free again.
            </li>
            <li>
              The hold lasts 48 hours. A trampoline payout uses 68 hours.
            </li>
            <li>
              The buyer can mark the payment sent only while a 2-hour release,
              a 4-hour dispute window, and Fiber&apos;s routing time are still
              left. That routing time is at least 30 minutes.
            </li>
            <li>
              After the buyer marks it sent, the seller has 2 hours to
              release. A dispute does not pause the hold.
            </li>
          </ul>
        </Callout>
      </section>

      <section className="border-t border-outline-variant py-16 sm:py-20">
        <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-on-surface sm:text-4xl">
          What each part can do
        </h2>
        <dl className="mt-10 max-w-2xl divide-y divide-outline-variant border-t border-outline-variant">
          {coinRows.map((row) => (
            <div
              key={row.label}
              className="grid gap-2 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-8"
            >
              <dt className="font-medium text-on-surface">{row.label}</dt>
              <dd className="text-sm leading-6 text-on-surface-variant">{row.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm leading-6 text-on-surface-variant">
          The steps of a trade are on{" "}
          <Link href="/how-it-works" className={textLink}>
            How it works
          </Link>
          . A shorter list of the same limits is in{" "}
          <Link href="/disclaimer" className={textLink}>
            the disclaimer
          </Link>
          .
        </p>
      </section>
    </Article>
  );
}
