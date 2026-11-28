const sans = "var(--font-sans)";

function Coin({
  cx,
  cy,
  r = 13,
}: {
  cx: number;
  cy: number;
  r?: number;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="var(--background)"
        stroke="var(--fiber-ink)"
        strokeWidth="1.5"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.45}
        fill="var(--fiber)"
        stroke="none"
      />
    </g>
  );
}

function Note({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="76"
        height="48"
        rx="8"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d={`M${x + 12} ${y + 18} H${x + 62} M${x + 12} ${y + 31} H${x + 44}`}
        fill="none"
        stroke="var(--ink-soft)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  );
}

function Lock({
  x,
  y,
  open = false,
}: {
  x: number;
  y: number;
  open?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="0"
        y="22"
        width="68"
        height="54"
        rx="12"
        fill="var(--background)"
        stroke="var(--fiber-ink)"
        strokeWidth="1.5"
      />
      <path
        d={open ? "M16 22 V8 a18 18 0 0 1 36 0" : "M16 22 V8 a18 18 0 0 1 36 0 V22"}
        fill="none"
        stroke="var(--fiber-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="34" cy="48" r="3.5" fill="var(--fiber)" />
    </g>
  );
}

function Party({
  cx,
  cy,
  label,
}: {
  cx: number;
  cy: number;
  label: string;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r="28"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x={cx}
        y={cy + 50}
        textAnchor="middle"
        fontSize="13"
        fontFamily={sans}
        fill="currentColor"
      >
        {label}
      </text>
    </g>
  );
}

function ListingCard({
  x,
  y,
  title,
  width = 168,
}: {
  x: number;
  y: number;
  title: string;
  width?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="104"
        rx="6"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x={x + 16}
        y={y + 28}
        fontSize="13"
        fontFamily={sans}
        fill="currentColor"
      >
        {title}
      </text>
      <path
        d={`M${x + 16} ${y + 48} H${x + width - 16} M${x + 16} ${y + 64} H${x + width - 52} M${x + 16} ${y + 80} H${x + width - 72}`}
        fill="none"
        stroke="var(--ink-soft)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  );
}

function layerStyle(on: boolean, reduced: boolean) {
  return {
    opacity: on ? 1 : 0,
    transition: reduced ? "none" : "opacity 200ms ease-out",
  };
}

export function HeroScene() {
  return (
    <svg
      viewBox="0 0 640 520"
      role="img"
      aria-label="CKB sits in a Fiber hold between the seller and the buyer. Fiat moves outside that hold."
      className="h-auto w-full text-foreground"
    >
      <rect width="640" height="520" rx="8" fill="var(--cloth-3)" />
      <rect
        x="36"
        y="36"
        width="568"
        height="268"
        rx="6"
        fill="var(--background)"
        stroke="var(--border)"
      />
      <text x="56" y="68" fontSize="13" fontFamily={sans} fill="var(--fiber-ink)">
        Fiber
      </text>
      <Party cx={128} cy={176} label="Seller" />
      <path
        className="hero-draw"
        pathLength={1}
        d="M156 176 C 210 148, 236 148, 286 173"
        fill="none"
        stroke="var(--fiber-ink)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Lock x={286} y={124} />
      <text
        x={320}
        y={228}
        textAnchor="middle"
        fontSize="12"
        fontFamily={sans}
        fill="var(--muted-foreground)"
      >
        Hold
      </text>
      <path
        d="M354 176 H484"
        fill="none"
        stroke="var(--fiber-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
      <Party cx={512} cy={176} label="Buyer" />
      <rect
        x="36"
        y="324"
        width="568"
        height="160"
        rx="6"
        fill="var(--sheet)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeDasharray="5 6"
      />
      <text x="56" y="356" fontSize="13" fontFamily={sans} fill="var(--ink)">
        Outside Twine
      </text>
      <Note x={470} y={392} />
      <path
        d="M470 416 C 360 448, 250 448, 150 416"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
      <text
        x="300"
        y="378"
        textAnchor="middle"
        fontSize="12"
        fontFamily={sans}
        fill="var(--ink)"
      >
        Fiat
      </text>
    </svg>
  );
}

export function TradeFigure({
  step,
  reduced,
}: {
  step: number;
  reduced: boolean;
}) {
  return (
    <svg
      viewBox="0 0 560 400"
      aria-hidden="true"
      className="h-auto w-full text-foreground"
    >
      <rect width="560" height="400" rx="8" fill="var(--cloth-3)" />
      <Party cx={96} cy={188} label="Seller" />
      <Party cx={464} cy={188} label="Buyer" />
      <g style={layerStyle(step === 0, reduced)}>
        <ListingCard x={196} y={78} title="Listing" />
      </g>
      <g style={layerStyle(step === 1, reduced)}>
        <ListingCard x={176} y={70} title="Listing" width={150} />
        <rect
          x="338"
          y="122"
          width="86"
          height="60"
          rx="12"
          fill="var(--background)"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
        <text x="381" y="156" textAnchor="middle" fontSize="13" fontFamily={sans} fill="currentColor">
          Slice
        </text>
      </g>
      <g style={layerStyle(step === 2, reduced)}>
        <path
          d="M124 188 H246"
          fill="none"
          stroke="var(--fiber-ink)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Coin cx={186} cy={188} />
        <Lock x={246} y={132} />
        <text
          x="280"
          y="236"
          textAnchor="middle"
          fontSize="12"
          fontFamily={sans}
          fill="var(--muted-foreground)"
        >
          Hold
        </text>
      </g>
      <g style={layerStyle(step === 3, reduced)}>
        <Lock x={246} y={112} />
        <Note x={392} y={268} />
        <path
          d="M392 292 C 320 336, 220 336, 140 292"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
        <text
          x="250"
          y="252"
          textAnchor="middle"
          fontSize="12"
          fontFamily={sans}
          fill="var(--muted-foreground)"
        >
          Fiat
        </text>
      </g>
      <g style={layerStyle(step === 4, reduced)}>
        <Lock x={246} y={112} open />
        <path
          d="M314 166 H436"
          fill="none"
          stroke="var(--fiber-ink)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Coin cx={464} cy={188} r={11} />
        <Note x={78} y={286} />
      </g>
    </svg>
  );
}

export function SequenceMap() {
  const marks = [
    { x: 56, label: "Post" },
    { x: 184, label: "Take" },
    { x: 312, label: "Lock" },
    { x: 440, label: "Pay" },
    { x: 568, label: "Release" },
  ];

  return (
    <svg
      viewBox="0 0 624 120"
      role="img"
      aria-label="A trade moves through post, take, lock, pay, and release."
      className="mt-10 h-auto w-full text-foreground"
    >
      <path
        className="scroll-draw"
        pathLength={1}
        d="M72 42 H552"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {marks.map((mark, index) => (
        <g key={mark.label}>
          <circle cx={mark.x} cy="42" r="16" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
          <text
            x={mark.x}
            y="46"
            textAnchor="middle"
            fontSize="12"
            fontFamily={sans}
            fill="currentColor"
          >
            {index + 1}
          </text>
          <text
            x={mark.x}
            y="84"
            textAnchor="middle"
            fontSize="13"
            fontFamily={sans}
            fill="var(--muted-foreground)"
          >
            {mark.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function HoldDiagram() {
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="Paying the buyer's invoice settles the hold. If the trade does not finish, the timelock returns the CKB to the seller's channel."
      className="mt-10 h-auto w-full max-w-2xl text-foreground"
    >
      <rect width="640" height="300" rx="8" fill="var(--cloth-3)" />
      <rect
        x="36"
        y="78"
        width="150"
        height="92"
        rx="6"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text x="111" y="118" textAnchor="middle" fontSize="13" fontFamily={sans} fill="currentColor">
        Seller channel
      </text>
      <Coin cx={111} cy={146} r={10} />
      <Lock x={286} y={70} />
      <path
        d="M186 124 H286"
        fill="none"
        stroke="var(--fiber-ink)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M354 124 H452"
        fill="none"
        stroke="var(--fiber-ink)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="452"
        y="78"
        width="150"
        height="92"
        rx="6"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text x="527" y="118" textAnchor="middle" fontSize="13" fontFamily={sans} fill="currentColor">
        Buyer invoice
      </text>
      <text x="527" y="142" textAnchor="middle" fontSize="12" fontFamily={sans} fill="var(--muted-foreground)">
        Release
      </text>
      <path
        className="scroll-draw"
        pathLength={1}
        d="M320 168 C 320 236, 140 236, 111 186"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="230" y="258" textAnchor="middle" fontSize="12" fontFamily={sans} fill="var(--muted-foreground)">
        Timelock returns the CKB
      </text>
    </svg>
  );
}

export function DeskDiagram() {
  return (
    <svg
      viewBox="0 0 640 280"
      role="img"
      aria-label="Traders reach the daemon over Nostr and open a Fiber channel to the hub. Push is optional."
      className="mt-10 h-auto w-full max-w-2xl text-foreground"
    >
      <rect width="640" height="280" rx="8" fill="var(--cloth-3)" />
      <rect x="48" y="48" width="150" height="72" rx="6" fill="var(--background)" stroke="var(--fiber-ink)" strokeWidth="1.5" />
      <text x="123" y="90" textAnchor="middle" fontSize="14" fontFamily={sans} fill="var(--fiber-ink)">
        Fiber
      </text>
      <rect x="246" y="48" width="150" height="72" rx="6" fill="var(--background)" stroke="var(--primary)" strokeWidth="1.5" />
      <text x="321" y="90" textAnchor="middle" fontSize="14" fontFamily={sans} fill="currentColor">
        Daemon
      </text>
      <rect
        x="444"
        y="48"
        width="150"
        height="72"
        rx="6"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      <text x="519" y="82" textAnchor="middle" fontSize="14" fontFamily={sans} fill="currentColor">
        Push
      </text>
      <text x="519" y="102" textAnchor="middle" fontSize="12" fontFamily={sans} fill="var(--muted-foreground)">
        Optional
      </text>
      <path
        className="scroll-draw"
        pathLength={1}
        d="M246 84 H198"
        fill="none"
        stroke="var(--fiber-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="222" y="74" textAnchor="middle" fontSize="11" fontFamily={sans} fill="var(--muted-foreground)">
        RPC
      </text>
      <circle cx="200" cy="196" r="8" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="248" cy="210" r="8" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="292" cy="190" r="8" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      <text x="246" y="246" textAnchor="middle" fontSize="13" fontFamily={sans} fill="currentColor">
        Traders
      </text>
      <path
        className="scroll-draw"
        pathLength={1}
        d="M292 190 C 340 160, 340 130, 321 120"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="360" y="156" fontSize="12" fontFamily={sans} fill="var(--muted-foreground)">
        Nostr
      </text>
      <path
        d="M200 188 C 150 160, 130 150, 123 120"
        fill="none"
        stroke="var(--fiber-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <text x="96" y="156" fontSize="12" fontFamily={sans} fill="var(--muted-foreground)">
        Channel
      </text>
    </svg>
  );
}

export function WalletSplit() {
  return (
    <svg
      viewBox="0 0 560 240"
      role="img"
      aria-label="The Twine app stores a Nostr key. The Fiber wallet holds the CKB. Twine does not keep the wallet key."
      className="h-auto w-full text-foreground"
    >
      <rect width="250" height="240" rx="8" fill="var(--cloth-3)" />
      <text x="125" y="48" textAnchor="middle" fontSize="13" fontFamily={sans} fill="var(--muted-foreground)">
        The app
      </text>
      <rect x="78" y="78" width="94" height="94" rx="18" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="125" cy="112" r="8" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
      <path
        d="M125 120 v28"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M125 136 h16"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="125" y="204" textAnchor="middle" fontSize="13" fontFamily={sans} fill="currentColor">
        Nostr key
      </text>
      <rect x="310" width="250" height="240" rx="8" fill="var(--cloth-3)" />
      <text x="435" y="48" textAnchor="middle" fontSize="13" fontFamily={sans} fill="var(--muted-foreground)">
        The wallet
      </text>
      <Coin cx={435} cy={124} r={28} />
      <text x="435" y="204" textAnchor="middle" fontSize="13" fontFamily={sans} fill="currentColor">
        Fiber channel
      </text>
    </svg>
  );
}

export function KeyMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="size-10 text-primary">
      <circle cx="13" cy="15" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M17.6 19.6 31 33 M25 27 27.8 24.2 M28.1 30.1 30.9 27.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoinMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="size-10 text-fiber">
      <circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function NoteMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="size-10 text-ink">
      <rect x="10" y="8" width="20" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 16 H25 M15 21 H22 M15 26 H20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
