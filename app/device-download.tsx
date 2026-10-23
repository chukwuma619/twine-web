import { headers } from "next/headers";
import { DownloadPanel } from "./download-panel";
import { platformFromAgent, type DownloadFile } from "./platform";

export async function DeviceDownload({ files }: { files: DownloadFile[] }) {
  const agent = (await headers()).get("user-agent") ?? "";
  return (
    <DownloadPanel
      initialPlatform={platformFromAgent(agent, false)}
      files={files}
    />
  );
}
