import type { Guide, GuideSummary } from "./api";

/** Groups on /erasmus-hacks, in page order (seed field "group"). */
export const GUIDE_GROUPS = [
  { id: "paperwork", title: "Paperwork and first steps" },
  { id: "daily-life", title: "Daily life" },
  { id: "travel", title: "Travel and culture" },
] as const;

/** Guides with a group the page doesn't know yet land here, so none goes missing. */
export const OTHER_GROUP = { id: "other", title: "More guides" } as const;

export function guideHref(guide: Pick<GuideSummary, "guideId">) {
  return `/erasmus-hacks/${guide.guideId}`;
}

/** "Day 1-2: Get connected" -> "day-1-2-get-connected" (anchor ids). */
export function slugify(text: string) {
  return text
    .toLocaleLowerCase("en")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type TocItem = { id: string; label: string };

/** Anchors for "On this page": the intro, then every section. Ids are unique. */
export function guideToc(guide: Guide): TocItem[] {
  const used = new Set<string>();
  const unique = (label: string) => {
    const base = slugify(label) || "section";
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    return { id, label };
  };
  return [
    ...(guide.intro ? [unique(guide.intro.heading)] : []),
    ...(guide.sections ?? []).map((section) => unique(section.heading)),
  ];
}

/** Reading time at 200 words a minute, at least 1. */
export function readingMinutes(guide: Guide) {
  const texts = [
    guide.summary,
    guide.intro?.heading,
    guide.intro?.body,
    guide.intro?.tip,
    ...(guide.sections ?? []).flatMap((s) => [
      s.heading,
      s.body,
      s.tip,
      ...(s.items ?? []),
    ]),
  ];
  const words = texts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** "2026-11-01T12:00:00Z" -> "1 Nov 2026". */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Istanbul",
  }).format(new Date(iso));
}
