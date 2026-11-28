type Reason = {
  title: string;
  body: string;
  mark: MarkName;
};

const reasons: Reason[] = [
  {
    mark: "privacy",
    title: "Privacy by design",
    body: "Fiber moves the CKB inside a channel. That payment is not a public transfer on the chain.",
  },
  {
    mark: "censor",
    title: "Censorship resistant",
    body: "Nostr carries the orders. Relays hold the book, so no exchange can take it down.",
  },
  {
    mark: "coin",
    title: "Non-custodial",
    body: "The CKB stays in the seller's Fiber channel. Twine never holds the cash, and it cannot take the lock.",
  },
  {
    mark: "key",
    title: "No KYC",
    body: "A Nostr key is the account. No registration, no email, and no identity document.",
  },
  {
    mark: "open",
    title: "Open protocol",
    body: "The coordinator is open source. Anyone can run a hub, build a client, and read the code.",
  },
  {
    mark: "hubs",
    title: "Many hubs",
    body: "Choose a Nostr desk, or run your own. The app ships with one already filled in.",
  },
];

export function WhyTwine() {
  return (
    <section id="why" className="section">
      <div className="shell">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="section-title mx-auto">Why choose Twine</h2>
          <p className="lede mx-auto mt-4">
            Fiber holds the coins. Nostr carries the book.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li
              key={reason.title}
              className="flex flex-col items-center border border-rule bg-cloth-2 px-6 py-10 text-center"
            >
              <ReasonMark name={reason.mark} />
              <h3 className="mt-5 font-sans text-base font-semibold tracking-tight">
                {reason.title}
              </h3>
              <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-ink-soft">
                {reason.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type MarkName = "privacy" | "censor" | "coin" | "open" | "hubs" | "key";

function ReasonMark({ name }: { name: MarkName }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="size-16 text-cord">
      {markPath(name)}
    </svg>
  );
}

function markPath(name: MarkName) {
  switch (name) {
    case "privacy":
      return (
        <>
          <rect x="11" y="18" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15 18 V13 a5 5 0 0 1 10 0 V18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "censor":
      return (
        <>
          <circle cx="20" cy="9" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="29" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="31" cy="29" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 12 L11 26 M22 12 L29 26 M13 29 H27" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "coin":
      return (
        <>
          <circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "open":
      return (
        <path
          d="M16 12 L8 20 L16 28 M24 12 L32 20 L24 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "hubs":
      return (
        <>
          <rect x="7" y="11" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="19" y="17" width="14" height="14" fill="var(--cloth-2)" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "key":
      return (
        <>
          <circle cx="14" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18.4 20.2 31 33 M25.5 27.5 28.2 24.8 M28.4 30.4 31.1 27.7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    default: {
      const exhaustive: never = name;
      return exhaustive;
    }
  }
}
