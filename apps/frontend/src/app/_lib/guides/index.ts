import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import type { ExclusiveOffer, GuideCategory } from "./types";

interface GuideFrontmatter {
    order: number;
    title: string;
    icon: string;
    heroImage: string;
    offers: ExclusiveOffer[];
}

const GUIDE_THEME_COLOR = "#2e3192";
const WORDS_PER_MINUTE = 200;
const GUIDE_CONTENT_DIR = path.join(process.cwd(), "content", "guide");

const stripFrontmatter = (source: string) =>
    source.replace(/^---\n[\s\S]*?\n---\n?/u, "");

const calculateReadTime = (source: string) => {
    const wordCount = source.trim().split(/\s+/u).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
};

const getGuideSlugsCached = cache(async () => {
    const entries = await readdir(GUIDE_CONTENT_DIR, { withFileTypes: true });
    return entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
        .map((entry) => entry.name.replace(/\.mdx$/u, ""))
        .sort();
});

const getGuideBySlugCached = cache(async (slug: string) => {
    try {
        const source = await readFile(
            path.join(GUIDE_CONTENT_DIR, `${slug}.mdx`),
            "utf8",
        );
        const { frontmatter } = await compileMDX<GuideFrontmatter>({
            source,
            options: { parseFrontmatter: true },
        });
        const content = stripFrontmatter(source);

        if (
            !frontmatter?.title ||
            !frontmatter?.icon ||
            !frontmatter?.heroImage
        ) {
            return undefined;
        }

        return {
            slug,
            order: frontmatter.order ?? 999,
            title: frontmatter.title,
            icon: frontmatter.icon,
            color: GUIDE_THEME_COLOR,
            heroImage: frontmatter.heroImage,
            readTime: calculateReadTime(content),
            offers: frontmatter.offers ?? [],
            content,
        } satisfies GuideCategory;
    } catch {
        return undefined;
    }
});

export async function getGuideBySlug(
    slug: string,
): Promise<GuideCategory | undefined> {
    return getGuideBySlugCached(slug);
}

export async function getGuideContentBySlug(
    slug: string,
): Promise<string | null> {
    const guide = await getGuideBySlugCached(slug);
    return guide?.content ?? null;
}

export async function getAllGuides(): Promise<GuideCategory[]> {
    const slugs = await getGuideSlugsCached();
    const guides = await Promise.all(slugs.map((slug) => getGuideBySlug(slug)));
    return guides
        .filter((guide): guide is GuideCategory => Boolean(guide))
        .sort((a, b) => a.order - b.order);
}

export async function getAllGuideSlugs(): Promise<string[]> {
    const guides = await getAllGuides();
    return guides.map((guide) => guide.slug);
}

export type { ExclusiveOffer, GuideCategory } from "./types";
