import Link from "next/link";
import type { ReactNode } from "react";
import { textLink } from "./prose";

export const questions: { q: string; a: ReactNode }[] = [
  {
    q: "Who am I paying?",
    a: "Another person who listed CKB. You agree the price on their post, then send naira, dollars, or whatever currency they listed to the account they share in the trade chat.",
  },
  {
    q: "Can Twine spend the locked CKB?",
    a: "It can finish the hold only by paying the buyer's invoice first. That payment reveals the secret. Twine does not know the secret before then, and it does not hold a key that can spend the coins.",
  },
  {
    q: "What if I pay and they don't release?",
    a: "Leave the receipt in the chat and open a dispute while the coins are still locked, if that desk has a solver. The seller can still release. The solver can pay you or let the hold expire. The hold does not pause.",
  },
  {
    q: "What if I lock coins and they never pay?",
    a: "You do not release. Fiber's timelock returns your CKB to your channel.",
  },
  {
    q: "What moves inside Twine?",
    a: "The listing, the steps, and the chat. The money moves however the seller asked to be paid. The CKB moves on Fiber, between wallets you and the other person control.",
  },
  {
    q: "Do I make an account?",
    a: "The app stores a Nostr key. That key is the account. There is no username, no email, and no identity document. Twine does not keep another copy of the secret.",
  },
  {
    q: "Does Twine charge a fee?",
    a: "This software charges no trading fee, keeps no rating, and takes no bond.",
  },
  {
    q: "Where is the order book?",
    a: "In the app. This site explains the desk and hosts the download. It does not list live orders.",
  },
  {
    q: "Can I run my own desk?",
    a: (
      <>
        Yes. The coordinator is open source.{" "}
        <Link href="/run" className={textLink}>
          Run a desk
        </Link>{" "}
        says what that machine does, and what it still cannot do.
      </>
    ),
  },
  {
    q: "Is there an iPhone app?",
    a: "No. Twine runs on macOS, Windows, Linux, and Android.",
  },
];
