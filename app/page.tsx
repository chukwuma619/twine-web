export default function Home() {
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

      <div className="mt-10 flex flex-col items-start gap-3">
        <a
          href="/twine.apk"
          download="Twine.apk"
          className="inline-flex h-12 items-center rounded-lg bg-[#3c245c] px-5 text-base font-medium text-[#f3efe6] transition-[background-color,transform] duration-150 ease-out hover:bg-[#2d1b46] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#3c245c]"
        >
          Download for Android
        </a>
        <p className="text-sm text-[#5c5468]">
          Version 1.0.0 · 52 MB · Android 7 or newer
        </p>
      </div>

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

      <p className="mt-auto pt-16 text-sm leading-6 text-[#5c5468]">
        After the file downloads, open it and allow installs from the app you
        used to download it.
      </p>
    </main>
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
