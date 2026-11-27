import type { Metadata } from "next";
import Link from "next/link";
import { Article, Role, Steps, textLink } from "../prose";

export const metadata: Metadata = {
  title: "How a trade works",
  description:
    "How a Twine trade moves from a public listing to a Fiber payout. Fiat stays between the two people. CKB stays in their wallets.",
};

const tradeSteps = [
  {
    title: "Post",
    body: "A seller lists CKB: a price, a local currency, how much is for sale, and a minimum and maximum. Account details are not part of the listing.",
  },
  {
    title: "Take",
    body: "A buyer names a fiat amount inside those limits, their Fiber node, and the invoice that should receive the CKB. The secret behind that invoice stays on the buyer's node. More than one trade can be open on a listing while CKB remains.",
  },
  {
    title: "Lock",
    body: "Twine gives the seller a hold invoice for that same secret. The seller pays it from their own Fiber wallet. Twine does not have their key. An unpaid hold expires after 1 hour, and the listing is free again.",
  },
  {
    title: "Pay",
    body: "If the buyer's invoice has a route, the seller writes the account details and sends them. The buyer sees that text, sends the money outside Twine, uploads a receipt, and marks it sent. If there is no route yet, fiat stays closed until the buyer pastes the same invoice again.",
  },
  {
    title: "Release",
    body: "The seller checks that the money arrived and releases. Twine pays the buyer's invoice, learns the secret from that payment, and settles the hold. The buyer receives the CKB.",
  },
];

export default function HowItWorks() {
  return (
    <Article
      kicker="The trade"
      title="How a trade works"
      lede="Sellers list CKB. A buyer takes some or all of a listing, inside the minimum and maximum. One person pays the other in fiat. Fiber moves the CKB."
    >
      <div className="grid gap-10 border-t border-outline-variant py-16 md:grid-cols-2 md:gap-0 sm:py-20">
        <Role title="If you are selling">
          Post how much CKB you will sell, the price, a currency, a minimum
          and maximum, and how you want to be paid. When someone takes it,
          lock the coins from your Fiber wallet, send your account in the
          chat, and release when the transfer arrives.
        </Role>
        <Role title="If you are buying" divided>
          Choose a listing and an amount inside its limits. Paste a Fiber
          invoice for the wallet that should receive the CKB. Pay the seller
          yourself, put the receipt in the chat, and mark it sent. Their
          release pays that invoice.
        </Role>
      </div>

      <section className="border-t border-outline-variant py-16 sm:py-20">
        <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-on-surface sm:text-4xl">
          The sequence
        </h2>
        <Steps items={tradeSteps} />
      </section>

      <section className="border-t border-outline-variant py-16 sm:py-20">
        <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-on-surface sm:text-4xl">
          How you pay
        </h2>
        <p className="mt-5 max-w-2xl leading-7 text-on-surface-variant">
          The seller writes the account details on the trade and sends them.
          The buyer sees that text and pays it outside Twine. The listing does
          not name a bank. The chat is encrypted between the two traders. The
          coordinator cannot read it.
        </p>
        <p className="mt-4 max-w-2xl leading-7 text-on-surface-variant">
          Either person can cancel while the hold is still unpaid. After the
          seller locks, cancel is refused. The coins wait for release or for
          Fiber&apos;s timelock.
        </p>
        <p className="mt-8 text-sm leading-6 text-on-surface-variant">
          The hold, the clocks, and a dispute are on{" "}
          <Link href="/security" className={textLink}>
            Security
          </Link>
          . What to install is on{" "}
          <Link href="/download" className={textLink}>
            Download
          </Link>
          .
        </p>
      </section>
    </Article>
  );
}
