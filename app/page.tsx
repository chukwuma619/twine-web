import { Suspense } from "react";
import { DeviceDownload } from "./device-download";
import { latestDownloads } from "./releases";

export default async function Home() {
  const files = await latestDownloads();

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-16 sm:py-24">
      <p className="text-sm font-medium tracking-wide text-[#3c245c]">Twine</p>

      <h1 className="mt-8 text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-[#1a1423] sm:text-5xl">
        Buy and sell CKB, person to person.
      </h1>

      <p className="mt-5 max-w-md text-lg leading-7 text-[#5c5468]">
        Fiat moves outside the app. CKB stays in your Fiber wallet until the
        seller releases it.
      </p>

      <Suspense fallback={<DownloadFallback />}>
        <DeviceDownload files={files} />
      </Suspense>

      <ol className="mt-16 flex flex-col gap-6 border-t border-[#1a1423]/10 pt-10">
        <Step
          n="1"
          title="Pick a post"
          body="Someone is selling CKB at a price, with fiat limits and a way to pay them."
        />
        <Step
          n="2"
          title="The seller locks the coins"
          body="They pay a hold invoice in their own Fiber wallet. Twine does not hold the key."
        />
        <Step
          n="3"
          title="Pay, then they release"
          body="You send fiat outside Twine. When the seller releases, CKB is paid to your invoice."
        />
      </ol>

    </main>
  );
}

function DownloadFallback() {
  return (
    <div className="mt-10">
      <span className="inline-flex h-12 w-44 items-center rounded-lg bg-[#3c245c]/30" />
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="grid grid-cols-[2rem_1fr] gap-x-3">
      <span className="font-mono text-sm text-[#3c245c]">{n}</span>
      <div>
        <p className="font-medium text-[#1a1423]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#5c5468]">{body}</p>
      </div>
    </li>
  );
}
