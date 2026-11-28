import type { Metadata } from "next";
import { Article } from "../prose";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Twine is open-source software for a non-custodial CKB desk. The people who write it do not hold your fiat or your keys, and they are not a party to your trade.",
};

const paragraphs = [
  "Twine is open-source software. Anyone can copy it, change it, and run a desk. The people who write it do not operate every desk, and they are not a party to a trade on a desk they do not run.",
  "The software coordinates a listing, a chat, and a Fiber hold. It does not hold fiat. It does not hold a key that can spend locked CKB. It can finish a hold only by paying the buyer's invoice first.",
  "You pay another person, at the account they send you. Twine does not check that account, and it cannot reverse a bank transfer, a cash payment, or any other fiat rail.",
  "A desk may publish a solver. A solver can pay the buyer or let the hold expire. A solver is not a bank, and a solver is not a promise that you will be paid.",
  "The software is provided as it is. A trade can fail, a counterparty can lie, and a hold can expire. You are responsible for the trades you make and for the law where you live.",
];

export default function Disclaimer() {
  return (
    <Article
      kicker="Disclaimer"
      title="What this software is"
      lede="Twine is a tool for two people to trade CKB. It is not a custodian, an exchange account, or a payment processor."
    >
      <div className="flex max-w-2xl flex-col gap-5 border-t border-border py-16 text-sm leading-7 text-muted-foreground sm:py-20">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Article>
  );
}
