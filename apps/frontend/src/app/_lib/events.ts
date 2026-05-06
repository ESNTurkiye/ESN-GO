import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";

export type inferEventCategory = {
    title: string;
    dateDay: string;
    dateMonth: string;
    location: string;
    time: string;
    price: string;
    registrationDeadline: string;
    summary: string;
    order?: number;
    cardImage?: string;
    heroImage?: string;
    officialSiteUrl?: string;
    officialSiteLabel?: string;
    mapCity?: string;
    mapSpot?: string;
    mapCx?: number;
    mapCy?: number;
};

export type EventDocument = {
    slug: string;
    frontmatter: EventFrontmatter;
    content: string;
};

export type EventListItem = { slug: string } & EventFrontmatter;

const EVENT_CONTENT_DIR = path.join(process.cwd(), "content", "events");

const stripFrontmatter = (source: string) =>
    source.replace(/^---\n[\s\S]*?\n---\n?/u, "");

const getEventSlugsCached = cache(async () => {
    try {
        const entries = await readdir(EVENT_CONTENT_DIR, {
            withFileTypes: true,
        });
        return entries
            .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
            .map((entry) => entry.name.replace(/\.mdx$/u, ""))
            .sort();
    } catch {
        return [];
    }
});

const REQUIRED_FRONTMATTER_KEYS = [
    "title",
    "dateDay",
    "dateMonth",
    "location",
    "time",
    "price",
    "registrationDeadline",
    "summary",
] as const;

function validateEventFrontmatter(
    fm: Partial<EventFrontmatter> | undefined,
): { ok: true; data: EventFrontmatter } | { ok: false; error: string } {
    if (!fm) {
        return { ok: false, error: "frontmatter is missing" };
    }

    const missing = REQUIRED_FRONTMATTER_KEYS.filter((key) => {
        const value = fm[key];
        return typeof value !== "string" || value.trim().length === 0;
    });

    if (missing.length > 0) {
        return {
            ok: false,
            error: `missing required fields: ${missing.join(", ")}`,
        };
    }

    const numericKeys: Array<keyof EventFrontmatter> = ["mapCx", "mapCy"];
    const invalidNumeric = numericKeys.filter((key) => {
        const value = fm[key];
        return value !== undefined && typeof value !== "number";
    });
    if (invalidNumeric.length > 0) {
        return {
            ok: false,
            error: `invalid numeric fields: ${invalidNumeric.join(", ")}`,
        };
    }

    return { ok: true, data: fm as EventFrontmatter };
}

const getEventBySlugCached = cache(
    async (slug: string): Promise<EventDocument | undefined> => {
        try {
            const source = await readFile(
                path.join(EVENT_CONTENT_DIR, `${slug}.mdx`),
                "utf8",
            );
            const { frontmatter } = await compileMDX<EventFrontmatter>({
                source,
                options: { parseFrontmatter: true },
            });

            const validation = validateEventFrontmatter(frontmatter);
            if (!validation.ok) {
                console.error(
                    `[events] Invalid frontmatter for "${slug}": ${validation.error}`,
                );
                return undefined;
            }

            return {
                slug,
                frontmatter: validation.data,
                content: stripFrontmatter(source),
            };
        } catch {
            return undefined;
        }
    },
);

export async function getEventBySlug(
    slug: string,
): Promise<EventDocument | undefined> {
    return getEventBySlugCached(slug);
}

export async function getAllEvents(): Promise<EventListItem[]> {
    const slugs = await getEventSlugsCached();
    const docs = await Promise.all(
        slugs.map((slug) => getEventBySlugCached(slug)),
    );
    return docs
        .filter((doc): doc is EventDocument => Boolean(doc))
        .sort(
            (a, b) =>
                (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999) ||
                a.slug.localeCompare(b.slug),
        )
        .map((doc) => ({ slug: doc.slug, ...doc.frontmatter }));
}

export async function getAllEventSlugs(): Promise<string[]> {
    const slugs = await getEventSlugsCached();
    const valid = await Promise.all(
        slugs.map(async (slug) =>
            (await getEventBySlugCached(slug)) ? slug : null,
        ),
    );
    return valid.filter((s): s is string => s !== null);
}
