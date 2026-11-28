import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
    <Skeleton className="h-12 w-44 rounded-lg" />
  );
}
