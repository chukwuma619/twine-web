import { stat } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import {
  downloadPlatforms,
  type DownloadFile,
  type DownloadPlatform,
} from "./platform";

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

  const published = await publishedDownloads();
  if (published.length > 0) {
    return published;
  }
  const android = await localAndroidDownload();
  return android ? [android] : [];
}

async function publishedDownloads(): Promise<DownloadFile[]> {
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
    const version = body.tag_name?.replace(/^v/, "") ?? null;
    const files: DownloadFile[] = [];
    for (const platform of downloadPlatforms) {
      const asset = body.assets?.find(
        (item) => platformOfAsset(item.name ?? "") === platform,
      );
      if (!asset?.browser_download_url) {
        continue;
      }
      files.push({
        platform,
        href: asset.browser_download_url,
        version,
        bytes: typeof asset.size === "number" ? asset.size : null,
      });
    }
    if (!files.some((file) => file.platform === "android")) {
      const android = await localAndroidDownload();
      if (android) {
        files.unshift(android);
      }
    }
    return files;
  } catch {
    return [];
  }
}

function platformOfAsset(name: string): DownloadPlatform | null {
  if (name.endsWith("-android.apk")) {
    return "android";
  }
  if (name.endsWith("-macos.dmg")) {
    return "macos";
  }
  if (name.endsWith("-windows-x64.zip")) {
    return "windows";
  }
  if (name.endsWith("-linux-x64.tar.gz")) {
    return "linux";
  }
  return null;
}

async function localAndroidDownload(): Promise<DownloadFile | null> {
  try {
    const file = await stat(path.join(process.cwd(), "public", "twine.apk"));
    return {
      platform: "android",
      href: "/twine.apk",
      version: "1.0.0",
      bytes: file.size,
    };
  } catch {
    return null;
  }
}
