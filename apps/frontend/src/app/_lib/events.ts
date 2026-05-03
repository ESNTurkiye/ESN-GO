import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";

export type EventFrontmatter = {
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

function isCompleteFrontmatter(
    fm: Partial<EventFrontmatter> | undefined,
): fm is EventFrontmatter {
    return Boolean(
        fm?.title &&
            fm?.dateDay &&
            fm?.dateMonth &&
            fm?.location &&
            fm?.time &&
            fm?.price &&
            fm?.registrationDeadline &&
            fm?.summary,
    );
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

            if (!isCompleteFrontmatter(frontmatter)) {
                return undefined;
            }

            return {
                slug,
                frontmatter,
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
