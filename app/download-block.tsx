import { Suspense } from "react";
import { DeviceDownload } from "./device-download";
import { latestDownloads } from "./releases";

export function DownloadBlock() {
  return (
    <Suspense fallback={<DownloadFallback />}>
      <DownloadFiles />
    </Suspense>
  );
}

async function DownloadFiles() {
  const files = await latestDownloads();
  return <DeviceDownload files={files} />;
}

function DownloadFallback() {
  return (
    <span className="inline-flex h-12 w-44 items-center rounded-lg bg-surface-container-highest" />
  );
}
