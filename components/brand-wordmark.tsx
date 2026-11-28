import Link from "next/link";
import { cn } from "cn";
import { TwineLogo } from "./twine-logo";

export function BrandWordmark({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 font-display text-[1.45rem] leading-none font-normal tracking-[-0.04em]",
        invert ? "text-cloth" : "text-ink",
        className,
      )}
    >
      <TwineLogo
        className={cn("size-[1.35rem] shrink-0", invert ? "text-fiber" : "text-cord")}
      />
      Twine
    </Link>
  );
}
