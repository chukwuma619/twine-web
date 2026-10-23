"use client";

import { useSyncExternalStore } from "react";
import {
  downloadPlatforms,
  platformFromAgent,
  platformName,
  type DownloadFile,
  type DownloadPlatform,
  type VisitorPlatform,
} from "./platform";

const buttonClass =
  "inline-flex h-12 items-center rounded-lg bg-[#3c245c] px-5 text-base font-medium text-[#f3efe6] transition-[background-color,transform] duration-150 ease-out hover:bg-[#2d1b46] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#3c245c]";

export function DownloadPanel({
  initialPlatform,
  files,
}: {
  initialPlatform: VisitorPlatform;
  files: DownloadFile[];
}) {
  const platform = useVisitorPlatform(initialPlatform);

  if (files.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-start gap-3">
        <p className="text-lg leading-7 text-[#5c5468]">
          Downloads are not published yet.
        </p>
        <p className="text-sm text-[#5c5468]">
          Not available for iPhone or iPad.
        </p>
      </div>
    );
  }

  const byPlatform = new Map(files.map((file) => [file.platform, file]));

  if (
    platform !== "ios" &&
    files.length === 1 &&
    files[0].platform === "macos"
  ) {
    const file = files[0];
    return (
      <div className="mt-10 flex flex-col items-start gap-3">
        <DownloadLink file={file} />
        <p className="text-sm text-[#5c5468]">{fileDetail(file)}</p>
        <p className="max-w-md text-sm leading-6 text-[#5c5468]">
          {installHint(file.platform)}
        </p>
        <p className="text-sm text-[#5c5468]">
          Not available for iPhone or iPad.
        </p>
      </div>
    );
  }

  if (platform === "ios") {
    return (
      <div className="mt-10 flex flex-col items-start gap-3">
        <p className="max-w-md text-lg leading-7 text-[#5c5468]">
          Twine is not available for iPhone or iPad.
        </p>
        <DownloadChoices files={files} />
      </div>
    );
  }

  if (platform === "other") {
    return (
      <div className="mt-10 flex flex-col items-start gap-3">
        <DownloadChoices files={files} />
        <p className="text-sm text-[#5c5468]">
          Not available for iPhone or iPad.
        </p>
      </div>
    );
  }

  const file = byPlatform.get(platform);
  if (!file) {
    return (
      <div className="mt-10 flex flex-col items-start gap-3">
        <p className="max-w-md text-lg leading-7 text-[#5c5468]">
          The {platformName(platform)} download is not published yet.
        </p>
        <DownloadChoices files={files} />
        <p className="text-sm text-[#5c5468]">
          Not available for iPhone or iPad.
        </p>
      </div>
    );
  }

  const others = files.filter((item) => item.platform !== platform);

  return (
    <div className="mt-10 flex flex-col items-start gap-3">
      <DownloadLink file={file} />
      <p className="text-sm text-[#5c5468]">{fileDetail(file)}</p>
      <p className="max-w-md text-sm leading-6 text-[#5c5468]">
        {installHint(file.platform)}
      </p>
      {others.length > 0 ? (
        <OtherDownloads files={others} current={platform} />
      ) : null}
      <p className="text-sm text-[#5c5468]">
        Not available for iPhone or iPad.
      </p>
    </div>
  );
}

function useVisitorPlatform(initialPlatform: VisitorPlatform): VisitorPlatform {
  return useSyncExternalStore(
    subscribeNoop,
    () => platformFromAgent(navigator.userAgent, navigator.maxTouchPoints > 1),
    () => initialPlatform,
  );
}

function subscribeNoop(): () => void {
  return () => {};
}

function DownloadChoices({ files }: { files: DownloadFile[] }) {
  const ordered = downloadPlatforms.flatMap((platform) => {
    const file = files.find((item) => item.platform === platform);
    return file ? [file] : [];
  });
  if (ordered.length === 0) {
    return (
      <p className="text-lg leading-7 text-[#5c5468]">
        Downloads are not published yet.
      </p>
    );
  }
  return (
    <>
      {ordered.map((file) => (
        <div key={file.platform} className="flex flex-col items-start gap-2">
          <DownloadLink file={file} />
          <p className="text-sm text-[#5c5468]">{fileDetail(file)}</p>
        </div>
      ))}
    </>
  );
}

function OtherDownloads({
  files,
  current,
}: {
  files: DownloadFile[];
  current: DownloadPlatform | null;
}) {
  const ordered = downloadPlatforms.flatMap((platform) => {
    if (platform === current) {
      return [];
    }
    const file = files.find((item) => item.platform === platform);
    return file ? [file] : [];
  });
  if (ordered.length === 0) {
    return null;
  }
  return (
    <p className="text-sm text-[#5c5468]">
      Also for{" "}
      {ordered.map((file, index) => {
        const last = index === ordered.length - 1;
        const separator =
          index === 0 ? null : last && ordered.length > 1 ? ", and " : ", ";
        return (
          <span key={file.platform}>
            {separator}
            <a
              href={file.href}
              download={file.href.startsWith("/") ? "Twine.apk" : undefined}
              className="font-medium text-[#3c245c] underline-offset-4 hover:underline"
            >
              {platformName(file.platform)}
            </a>
          </span>
        );
      })}
      .
    </p>
  );
}

function DownloadLink({ file }: { file: DownloadFile }) {
  return (
    <a
      href={file.href}
      download={file.href.startsWith("/") ? "Twine.apk" : undefined}
      className={buttonClass}
    >
      Download for {platformName(file.platform)}
    </a>
  );
}

function fileDetail(file: DownloadFile): string {
  const parts: string[] = [];
  if (file.version) {
    parts.push(`Version ${file.version}`);
  }
  if (file.bytes !== null) {
    parts.push(formatSize(file.bytes));
  }
  parts.push(requirement(file.platform));
  return parts.join(" · ");
}

function formatSize(bytes: number): string {
  const megabytes = bytes / (1024 * 1024);
  const digits = megabytes >= 10 ? 0 : 1;
  return `${megabytes.toFixed(digits)} MB`;
}

function requirement(platform: DownloadPlatform): string {
  switch (platform) {
    case "android":
      return "Android 7 or newer";
    case "macos":
      return "macOS 12 or newer";
    case "windows":
      return "Windows 10 or 11";
    case "linux":
      return "Linux desktop";
    default: {
      const unreachable: never = platform;
      return unreachable;
    }
  }
}

function installHint(platform: DownloadPlatform): string {
  switch (platform) {
    case "android":
      return "After the file downloads, open it and allow installs from the app you used to download it.";
    case "macos":
      return "Open the disk image and drag Twine into Applications. Right-click the app and choose Open.";
    case "windows":
      return "Unzip the whole folder and run twine_app.exe from inside it. If Windows asks, choose More info, then Run anyway.";
    case "linux":
      return "Unpack the archive and run ./Twine/twine_app. A desktop install needs GTK 3 and a keyring.";
    default: {
      const unreachable: never = platform;
      return unreachable;
    }
  }
}
