export const downloadPlatforms = ["android", "macos", "windows", "linux"] as const;

export type DownloadPlatform = (typeof downloadPlatforms)[number];

export type VisitorPlatform = DownloadPlatform | "ios" | "other";

export type DownloadFile = {
  platform: DownloadPlatform;
  href: string;
  version: string | null;
  bytes: number | null;
};

export function platformFromAgent(
  agent: string,
  macIsTouch: boolean,
): VisitorPlatform {
  if (/iPhone|iPad|iPod/i.test(agent)) {
    return "ios";
  }
  if (macIsTouch && /Macintosh/i.test(agent)) {
    return "ios";
  }
  if (/Android/i.test(agent)) {
    return "android";
  }
  if (/Macintosh|Mac OS X/i.test(agent)) {
    return "macos";
  }
  if (/Windows/i.test(agent)) {
    return "windows";
  }
  if (/CrOS/i.test(agent)) {
    return "other";
  }
  if (/Linux/i.test(agent)) {
    return "linux";
  }
  return "other";
}

export function platformName(platform: DownloadPlatform): string {
  switch (platform) {
    case "android":
      return "Android";
    case "macos":
      return "Mac";
    case "windows":
      return "Windows";
    case "linux":
      return "Linux";
    default: {
      const unreachable: never = platform;
      return unreachable;
    }
  }
}
