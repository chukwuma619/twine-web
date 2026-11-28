import type { Metadata } from "next";
import { questions } from "../faq-items";
import { Article, FaqList } from "../prose";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Who you pay on Twine, what happens if a release fails, whether there is a fee, and where the order book lives.",
};

export default function Faq() {
  return (
    <Article
      kicker="Questions"
      title="Before you download"
      lede="Short answers. The trade itself is on How it works, and the hold is on Security."
    >
      <div className="border-t border-border py-16 sm:py-20">
        <FaqList items={questions} />
      </div>
    </Article>
  );
}
