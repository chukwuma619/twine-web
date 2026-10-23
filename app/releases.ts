import { cacheLife } from "next/cache";
import { type DownloadFile } from "./platform";

const releaseUrl =
  "https://api.github.com/repos/chukwuma619/twine_app/releases/latest";

type ReleaseAsset = {
  name?: string;
  browser_download_url?: string;
  size?: number;
};

type ReleaseResponse = {
  tag_name?: string;
  assets?: ReleaseAsset[];
};

export async function latestDownloads(): Promise<DownloadFile[]> {
  "use cache";
  cacheLife("hours");

  return publishedMacDownload();
}

async function publishedMacDownload(): Promise<DownloadFile[]> {
  try {
    const response = await fetch(releaseUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "twine-web",
      },
    });
    if (!response.ok) {
      return [];
    }
    const body = (await response.json()) as ReleaseResponse;
    const asset = body.assets?.find((item) =>
      (item.name ?? "").endsWith("-macos.dmg"),
    );
    if (!asset?.browser_download_url) {
      return [];
    }
    return [
      {
        platform: "macos",
        href: asset.browser_download_url,
        version: body.tag_name?.replace(/^v/, "") ?? null,
        bytes: typeof asset.size === "number" ? asset.size : null,
      },
    ];
  } catch {
    return [];
  }
}
