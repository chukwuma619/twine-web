import Link from "next/link";
import { HeroScene } from "../components/illustrations";
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
                render={<Link href="#how" />}
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

      <WhyTwine />
    </main>
  );
}
