export type EventSectionId = "whatToExpect" | "whatToBring";

export type EventSectionConfig = {
    id: EventSectionId;
    title: string;
    aliases: string[];
    renderAs?: "panel" | "accordion";
};

export const EVENT_SECTION_REGISTRY: readonly EventSectionConfig[] = [
    {
        id: "whatToExpect",
        title: "What to expect",
        aliases: ["what to expect"],
        renderAs: "panel",
    },
    {
        id: "whatToBring",
        title: "What to bring",
        aliases: ["what to bring"],
        renderAs: "panel",
    },
] as const;

export type ParsedEventSections = {
    aboutContent: string;
    sections: Partial<Record<EventSectionId, string>>;
};

function normalizeHeading(raw: string): string {
    return raw
        .toLocaleLowerCase("en-US")
        .normalize("NFKD")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function cleanSectionContent(raw: string): string | undefined {
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : undefined;
}

export function parseEventContentSections(content: string): ParsedEventSections {
    const lines = content.split("\n");
    const headingIndices: Array<{ index: number; heading: string }> = [];

    lines.forEach((line, index) => {
        const match = line.match(/^##\s+(.+?)\s*$/u);
        if (!match) return;
        headingIndices.push({ index, heading: normalizeHeading(match[1]) });
    });

    const aliasToId = new Map<string, EventSectionId>();
    EVENT_SECTION_REGISTRY.forEach((section) => {
        section.aliases.forEach((alias) => {
            aliasToId.set(normalizeHeading(alias), section.id);
        });
    });

    const sections = headingIndices.map((entry, i) => {
        const next = headingIndices[i + 1];
        return {
            heading: entry.heading,
            start: entry.index,
            end: next ? next.index - 1 : lines.length - 1,
        };
    });

    const extracted: Partial<Record<EventSectionId, string>> = {};
    const excluded = new Set<number>();

    sections.forEach((section) => {
        const key = aliasToId.get(section.heading);
        if (!key) return;

        for (let i = section.start; i <= section.end; i += 1) {
            excluded.add(i);
        }

        const bodyLines = lines
            .slice(section.start + 1, section.end + 1)
            .join("\n");
        extracted[key] = cleanSectionContent(bodyLines);
    });

    const aboutContent = cleanSectionContent(
        lines.filter((_, index) => !excluded.has(index)).join("\n"),
    );

    return {
        aboutContent: aboutContent ?? content.trim(),
        sections: extracted,
    };
}
