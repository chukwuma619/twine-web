import type { Metadata } from "next";
import { DownloadBlock } from "../download-block";
import { Article, External, Steps } from "../prose";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Twine for macOS, Windows, Linux, or Android. A trade also needs a Fiber wallet. Fiber Studio is the one most people use.",
};

const setupSteps = [
  {
    title: "The app",
    body: "macOS, Windows, Linux, or Android. Create a key on first launch, or import an nsec, and save the secret. Twine does not keep another copy. A new install offers one public desk. You can point it at another.",
  },
  {
    title: "A channel, if you are selling",
    body: "Connect Fiber Studio to the desk's hub, then open a channel and fund it with at least 1,000 CKB so you can pay the hold. Keep about 109 CKB more for the channel reserve and fees. Wait until the channel is ready.",
  },
  {
    title: "An online node, if you are buying",
    body: "Stay connected to the hub with 99 CKB on-chain, and leave auto-accept on. If you cannot receive yet, Twine opens a channel toward you when the seller releases.",
  },
];

export default function DownloadPage() {
  return (
    <Article
      kicker="The app"
      title="Download Twine"
      lede="The app is the desk. The wallet is separate. A trade needs both. There is no iPhone or iPad build."
    >
      <div className="border-t border-border py-16 sm:py-20">
        <DownloadBlock />
      </div>

      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
          What you need
        </h2>
        <Steps items={setupSteps} />
        <p className="mt-10 max-w-2xl text-sm leading-6 text-muted-foreground">
          The wallet most people use is{" "}
          <External href="https://getfiberstudio.com">Fiber Studio</External>.
          In the app, Account shows the desk&apos;s Fiber pubkey and address.
          Connect outward to that hub. A laptop does not need a public IP.
        </p>
      </section>
    </Article>
  );
}
