import type { Metadata } from "next";
import Link from "next/link";
import { Article, External, textLink } from "../prose";

export const metadata: Metadata = {
  title: "Run a desk",
  description:
    "Twine's coordinator is open source. A desk is a Fiber node, the trade daemon, and an optional push service. It still cannot spend locked CKB.",
};

const pieces = [
  {
    label: "Fiber",
    body: "The hub wallet. Traders open a channel to it. Hold invoices are locked here. The daemon talks to this node over JSON-RPC on the same machine. It does not open or rebalance channels for you.",
  },
  {
    label: "twine-daemon",
    body: "The trade engine. It speaks to traders over Nostr and to that one Fiber node. It stores orders and trades. It does not store the secret that settles a hold.",
  },
  {
    label: "twine-push",
    body: "Optional. A content-free doorbell so a phone can wake. The notification does not carry the trade.",
  },
];

export default function Run() {
  return (
    <Article
      kicker="Operators"
      title="Run a desk"
      lede="The app ships with one public desk filled in. A trader can point it at another. The coordinator is open source, so that other desk can be yours."
    >
      <section className="border-t border-[#1a1423]/10 py-16 sm:py-20">
        <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-[#1a1423] sm:text-4xl">
          What you run
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5c5468]">
          One machine runs a Fiber node and the daemon. Push is a separate
          process. Traders never connect to the daemon directly. They reach it
          through Nostr, and they open a Fiber channel to your node.
        </p>
        <dl className="mt-10 max-w-2xl divide-y divide-[#1a1423]/10 border-t border-[#1a1423]/10">
          {pieces.map((piece) => (
            <div
              key={piece.label}
              className="grid gap-2 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-8"
            >
              <dt className="font-medium text-[#1a1423]">{piece.label}</dt>
              <dd className="text-sm leading-6 text-[#5c5468]">{piece.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-[#1a1423]/10 py-16 sm:py-20">
        <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-[#1a1423] sm:text-4xl">
          What a desk still cannot do
        </h2>
        <p className="mt-5 max-w-2xl leading-7 text-[#5c5468]">
          Running the software does not give you the seller&apos;s key or the
          buyer&apos;s secret. You can publish a solver. That solver can pay
          the buyer or let the hold expire. They cannot take the locked CKB
          first. Fiat still moves between the two traders, outside the desk.
        </p>
        <p className="mt-4 max-w-2xl leading-7 text-[#5c5468]">
          This build charges no trading fee, keeps no rating, and takes no
          bond. There is no coordinator image yet. The Fiber image is in the
          repository. The install steps are in the deploy guide, including the
          ports, the environment, and what stays on localhost.
        </p>
        <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-6">
          <External href="https://github.com/chukwuma619/twine">
            Coordinator source
          </External>
          <External href="https://github.com/chukwuma619/twine/blob/main/DEPLOY.md">
            Deploy guide
          </External>
        </p>
        <p className="mt-8 text-sm leading-6 text-[#5c5468]">
          What the hold allows is on{" "}
          <Link href="/security" className={textLink}>
            Security
          </Link>
          .
        </p>
      </section>
    </Article>
  );
}
