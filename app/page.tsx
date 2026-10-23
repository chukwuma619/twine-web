import type { ReactNode } from "react";
import { Suspense } from "react";
import { DeviceDownload } from "./device-download";
import { latestDownloads } from "./releases";

const textLink =
  "font-medium text-[#3c245c] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#3c245c]";

export default async function Home() {
  const files = await latestDownloads();

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-[#1a1423]/10 bg-[#f3efe6]">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
          <a href="#top" className="font-medium tracking-tight text-[#1a1423]">
            Twine
          </a>
          <nav aria-label="On this page" className="flex items-center gap-5 text-sm">
            <a href="#trade" className={navLink}>
              How it works
            </a>
            <a href="#coins" className={`${navLink} hidden sm:inline`}>
              Your coins
            </a>
            <a href="#download" className={navLink}>
              Download
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-6">
          <section className="py-16 sm:py-24">
            <p className="text-sm font-medium text-[#3c245c]">Twine</p>
            <h1 className="mt-4 max-w-3xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-pretty text-[#1a1423] sm:text-6xl">
              Non-custodial P2P for Nervos CKB on Nostr and Fiber.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5c5468]">
              Twine is a non-custodial peer-to-peer (P2P) desk for buying and
              selling CKB with local fiat. Orders, encrypted chat, and trade
              actions run over Nostr.
            </p>
            <div className="mt-8 max-w-xl border-l-2 border-[#3c245c] pl-5">
              <p className="text-lg leading-7 font-medium text-[#1a1423]">
                Twine never holds the fiat, and it never holds a key that can
                spend the locked CKB.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5c5468]">
                If a trade fails or times out, Fiber&apos;s timelock returns the
                CKB to the seller&apos;s channel. If a buyer cannot receive yet,
                Twine opens a channel to them at payout.
              </p>
            </div>
            <div id="download" className="scroll-mt-20 mt-10">
              <Suspense fallback={<DownloadFallback />}>
                <DeviceDownload files={files} />
              </Suspense>
            </div>
          </section>

          <Section id="trade" kicker="The trade" title="How a trade works">
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5c5468]">
              Sellers list CKB. A buyer picks one listing and takes some or all
              of it, inside the minimum and maximum. One trade is open on a
              listing at a time.
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0">
              <Role title="If you are selling">
                Post how much CKB you will sell, the price, a minimum and
                maximum, and how you want to be paid. When someone takes it,
                lock the coins from your Fiber wallet, send your account in the
                chat, and release when the transfer arrives.
              </Role>
              <Role title="If you are buying" divided>
                Choose a listing and an amount inside its limits. Paste a Fiber
                invoice for the wallet that should receive the CKB. Pay the
                seller yourself, put the receipt in the chat, and mark it sent.
                Their release pays that invoice.
              </Role>
            </div>

            <ol className="mt-14 max-w-2xl">
              {tradeSteps.map((step, index) => (
                <Step
                  key={step.title}
                  n={String(index + 1)}
                  title={step.title}
                  body={step.body}
                  last={index === tradeSteps.length - 1}
                />
              ))}
            </ol>

            <h3 className="mt-14 text-lg font-medium text-[#1a1423]">
              Ways to pay
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5c5468]">
              The app reads the payment list from the desk you connect to. The
              desk that ships with the app accepts these two. You send the
              transfer yourself. Twine only stores the method&apos;s name.
            </p>
            <ul className="mt-4 max-w-2xl divide-y divide-[#1a1423]/10 border-y border-[#1a1423]/10">
              <Pay method="GTBank" detail="Naira, by bank transfer" />
              <Pay method="Zelle" detail="Dollars" />
            </ul>
          </Section>

          <Section id="coins" kicker="The coins" title="Who holds the money">
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5c5468]">
              Twine coordinates the order book and a dispute. It never holds the
              fiat, and it never holds a key that can spend the locked CKB. If a
              trade fails or times out, Fiber&apos;s timelock returns the CKB to
              the seller&apos;s channel.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-[#5c5468]">
              The buyer creates a secret on their own Fiber node, and an invoice
              locked to it. Twine copies that lock onto the seller&apos;s hold
              and stores no secret. Paying the buyer&apos;s invoice is what
              reveals it, and that same secret settles the hold. Twine can
              finish the lock only by paying the buyer first.
            </p>

            <div className="mt-10 max-w-2xl border-l-2 border-[#3c245c] pl-5">
              <p className="font-medium text-[#1a1423]">
                One hour to lock. Fifteen minutes to pay. Thirty-six hours on
                the hold.
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-[#5c5468]">
                <li>The seller has 1 hour to lock the coins. After that, the listing is free again.</li>
                <li>Once the coins are locked, the buyer has 15 minutes to pay and mark it sent.</li>
                <li>
                  The hold lasts 36 hours. A release has to start at least 30
                  minutes before it ends. A dispute does not pause it.
                </li>
              </ul>
            </div>

            <dl className="mt-12 max-w-2xl divide-y divide-[#1a1423]/10 border-t border-[#1a1423]/10">
              {coinRows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-8"
                >
                  <dt className="font-medium text-[#1a1423]">{row.label}</dt>
                  <dd className="text-sm leading-6 text-[#5c5468]">{row.body}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="start" kicker="Before a trade" title="What you need">
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5c5468]">
              The app is the desk. The wallet is separate. A trade needs both.
            </p>
            <ol className="mt-10 max-w-2xl">
              {setupSteps.map((step, index) => (
                <Step
                  key={step.title}
                  n={String(index + 1)}
                  title={step.title}
                  body={step.body}
                  last={index === setupSteps.length - 1}
                />
              ))}
            </ol>
            <p className="mt-10 max-w-2xl text-sm leading-6 text-[#5c5468]">
              The wallet most people use is{" "}
              <External href="https://getfiberstudio.com">Fiber Studio</External>
              . In the app, Account shows the desk&apos;s Fiber pubkey and
              address. Connect outward to that hub. A laptop does not need a
              public IP.
            </p>
          </Section>

          <Section id="questions" kicker="Questions" title="Before you download">
            <div className="mt-8 max-w-2xl divide-y divide-[#1a1423]/10 border-y border-[#1a1423]/10">
              {questions.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm font-medium text-[#1a1423] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c245c] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden
                      className="mt-0.5 font-mono text-[#3c245c] transition-transform duration-150 ease-out group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#5c5468]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Section>
        </div>
      </main>

      <footer className="border-t border-[#1a1423]/10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 text-sm leading-6 text-[#5c5468] sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md">
            Orders are public Nostr events. The coordinator is open source, so
            anyone can run a desk. The app ships with one already filled in.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <External href="https://github.com/chukwuma619/twine">
              Coordinator
            </External>
            <External href="https://github.com/chukwuma619/twine_app">
              App
            </External>
            <External href="https://getfiberstudio.com">Fiber Studio</External>
          </p>
        </div>
      </footer>
    </>
  );
}

const navLink =
  "text-[#5c5468] underline-offset-4 hover:text-[#1a1423] hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#3c245c]";

const tradeSteps = [
  {
    title: "Post",
    body: "A seller lists CKB: a price, how much is for sale, a minimum and maximum, and a payment method. Account numbers are not part of the listing.",
  },
  {
    title: "Take",
    body: "A buyer names a fiat amount, their Fiber node, one payment method, and the invoice that should receive the CKB. The secret behind that invoice stays on the buyer's node.",
  },
  {
    title: "Lock",
    body: "Twine gives the seller a hold invoice for that same secret. The seller pays it from their own Fiber wallet. Twine does not have their key.",
  },
  {
    title: "Pay",
    body: "The seller shares their account in the encrypted chat. The buyer sends the money outside Twine, uploads a receipt, and marks it sent.",
  },
  {
    title: "Release",
    body: "The seller checks that the money arrived and releases. Twine pays the buyer's invoice. The buyer receives the CKB.",
  },
];

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
    body: "If the CKB cannot reach the buyer, the hold stays locked. The buyer sends a new invoice under the same secret, and Twine tries again.",
  },
  {
    label: "A dispute",
    body: "Either person can open one while the coins are locked, when that desk has a solver. Sharing the chat key lets the solver read the thread. The seller can still release. The solver can pay the buyer, or let the hold expire and return the CKB to the seller.",
  },
  {
    label: "Fees",
    body: "This software charges no trading fee, keeps no rating, and takes no bond.",
  },
];

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

const questions: { q: string; a: string }[] = [
  {
    q: "Who am I paying?",
    a: "Another person who listed CKB. You agree the price on their post, then send naira or dollars to the account they share in the trade chat.",
  },
  {
    q: "Can Twine spend the locked CKB?",
    a: "It can finish the hold only by paying the buyer's invoice first. That payment reveals the secret. Twine does not know the secret before then, and it does not hold a key that can spend the coins.",
  },
  {
    q: "What if I pay and they don't release?",
    a: "Leave the receipt in the chat and open a dispute while the coins are still locked, if that desk has a solver. The seller can still release. The solver can pay you or let the hold expire. The 36-hour lock does not pause.",
  },
  {
    q: "What if I lock coins and they never pay?",
    a: "You do not release. Fifteen minutes after the lock, the trade starts returning your CKB. Fiber completes that return when the hold ends.",
  },
  {
    q: "What moves inside Twine?",
    a: "The listing, the steps, and the chat. The money moves on GTBank or Zelle. The CKB moves on Fiber, between wallets you and the other person control.",
  },
];

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-[#1a1423]/10 py-16 sm:py-20"
    >
      <p className="text-sm font-medium text-[#3c245c]">{kicker}</p>
      <h2 className="mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-pretty text-[#1a1423] sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Role({
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
          ? "border-t border-[#1a1423]/10 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-10"
          : "md:pr-10"
      }
    >
      <h3 className="font-medium text-[#1a1423]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5c5468]">{children}</p>
    </div>
  );
}

function Step({
  n,
  title,
  body,
  last,
}: {
  n: string;
  title: string;
  body: string;
  last: boolean;
}) {
  return (
    <li className="grid grid-cols-[2.25rem_1fr]">
      <div className="flex flex-col items-center">
        <span className="font-mono text-sm leading-6 text-[#3c245c]">{n}</span>
        {last ? null : <span className="my-2 w-px flex-1 bg-[#1a1423]/15" />}
      </div>
      <div className={last ? undefined : "pb-8"}>
        <h3 className="leading-6 font-medium text-[#1a1423]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#5c5468]">{body}</p>
      </div>
    </li>
  );
}

function Pay({ method, detail }: { method: string; detail: string }) {
  return (
    <li className="flex items-baseline justify-between gap-6 py-4">
      <span className="font-medium text-[#1a1423]">{method}</span>
      <span className="text-sm text-[#5c5468]">{detail}</span>
    </li>
  );
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={textLink}>
      {children}
    </a>
  );
}

function DownloadFallback() {
  return (
    <span className="inline-flex h-12 w-44 items-center rounded-lg bg-[#3c245c]/30" />
  );
}
