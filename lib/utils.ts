import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateViewerCount(): number {
  return Math.floor(Math.random() * 50000) + 100;
}

export function formatViewerCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function getPlaceholderLogo(name: string): string {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" rx="20" fill="#1a0a00"/>
      <text x="100" y="110" font-family="Inter,system-ui,sans-serif" font-size="64" font-weight="700" fill="#ff8c1a" text-anchor="middle">${initials}</text>
    </svg>`
  )}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const FIFA_TEXT_KEYWORDS = [
  "fifa",
  "world cup",
  "worldcup",
  "world-cup",
  "mundial",
  "coupe du monde",
  "copa mundial",
  "wm 2026",
  "wm2026",
  "wc 2026",
  "wc2026",
  "wc26",
  "fussball-wm",
  "fußball-wm",
  "football world cup",
];

const FIFA_CHANNEL_NAME_KEYWORDS = [
  "fifa+",
  "fifa plus",
  "fifa tv",
  "fifa channel",
  "telemundo",
  "fox sports",
  "bein sports",
  "peacock",
  "tyc sports",
  "directv sports",
  "sky sports",
  "espn",
  "supersport",
  "sport tv",
  "eurosport",
  "optus sport",
  "cbc sports",
  "tsn",
  "ctv",
  "itv",
  "bbc one",
  "bbc two",
  "caracol",
  "globo",
  "azteca",
  "universo",
];

function channelSearchText(channel: {
  name: string;
  alt_names?: string[];
  network?: string | null;
  streams?: { title?: string | null }[];
}): string {
  return [
    channel.name,
    ...(channel.alt_names ?? []),
    channel.network ?? "",
    ...(channel.streams?.map((s) => s.title ?? "") ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

export function isFifaWorldCupChannel(channel: {
  name: string;
  alt_names?: string[];
  network?: string | null;
  categories?: string[];
  streams?: { title?: string | null }[];
}): boolean {
  const text = channelSearchText(channel);

  if (FIFA_TEXT_KEYWORDS.some((kw) => text.includes(kw))) {
    return true;
  }

  const name = channel.name.toLowerCase();
  const isSports = channel.categories?.includes("sports");

  if (isSports && FIFA_CHANNEL_NAME_KEYWORDS.some((kw) => name.includes(kw))) {
    return true;
  }

  return false;
}

export function filterFifaWorldCupChannels<
  T extends {
    name: string;
    alt_names?: string[];
    network?: string | null;
    categories?: string[];
    streams?: { title?: string | null }[];
    viewerCount?: number;
  },
>(channels: T[]): T[] {
  return channels
    .filter(isFifaWorldCupChannel)
    .sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aScore =
        (FIFA_TEXT_KEYWORDS.some((kw) => aName.includes(kw)) ? 2 : 0) +
        (aName.includes("fifa") ? 3 : 0);
      const bScore =
        (FIFA_TEXT_KEYWORDS.some((kw) => bName.includes(kw)) ? 2 : 0) +
        (bName.includes("fifa") ? 3 : 0);
      if (aScore !== bScore) return bScore - aScore;
      return (b.viewerCount ?? 0) - (a.viewerCount ?? 0);
    });
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    animation: "Clapperboard",
    auto: "Car",
    business: "Briefcase",
    classic: "Film",
    comedy: "Laugh",
    cooking: "ChefHat",
    culture: "Palette",
    documentary: "BookOpen",
    education: "GraduationCap",
    entertainment: "Sparkles",
    family: "Users",
    general: "Tv",
    kids: "Baby",
    legislative: "Landmark",
    lifestyle: "Heart",
    movies: "Film",
    music: "Music",
    news: "Newspaper",
    outdoor: "TreePine",
    relax: "Coffee",
    religious: "Church",
    science: "Microscope",
    series: "MonitorPlay",
    shop: "ShoppingCart",
    sports: "Trophy",
    travel: "Plane",
    weather: "CloudSun",
    xxx: "Ban",
  };
  return icons[category] || "Tv";
}
