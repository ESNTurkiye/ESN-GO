import Image from "next/image";
import type { GuideContent } from "@/app/_lib/guide-data";

interface GuideContentRendererProps {
    content: GuideContent[];
    color: string;
}

const toKeyPart = (value: string) =>
    encodeURIComponent(value.trim().toLowerCase());

const getBlockBaseKey = (block: GuideContent): string => {
    if (Array.isArray(block.content)) {
        return `${block.type}-${block.content.map(toKeyPart).join("|")}`;
    }

    return `${block.type}-${toKeyPart(block.content)}`;
};

export default function GuideContentRenderer({
    content,
    color,
}: GuideContentRendererProps) {
    const blockOccurrences = new Map<string, number>();

    return (
        <div className="space-y-6">
            {content.map((block) => {
                const blockBaseKey = getBlockBaseKey(block);
                const blockOccurrence = blockOccurrences.get(blockBaseKey) ?? 0;
                blockOccurrences.set(blockBaseKey, blockOccurrence + 1);
                const blockKey = `${blockBaseKey}-${blockOccurrence}`;

                switch (block.type) {
                    case "heading":
                        return (
                            <h2
                                key={blockKey}
                                className="text-2xl md:text-3xl font-oswald font-bold text-esn-dark-blue mt-8 first:mt-0"
                            >
                                {block.content as string}
                            </h2>
                        );

                    case "paragraph":
                        return (
                            <p
                                key={blockKey}
                                className="font-lato text-gray-600 leading-relaxed text-base md:text-lg"
                            >
                                {block.content as string}
                            </p>
                        );

                    case "list": {
                        const itemOccurrences = new Map<string, number>();
                        return (
                            <ul key={blockKey} className="space-y-3 ml-1">
                                {(block.content as string[]).map((item) => {
                                    const itemBaseKey = toKeyPart(item);
                                    const itemOccurrence =
                                        itemOccurrences.get(itemBaseKey) ?? 0;
                                    itemOccurrences.set(
                                        itemBaseKey,
                                        itemOccurrence + 1,
                                    );

                                    return (
                                        <li
                                            key={`${blockKey}-${itemBaseKey}-${itemOccurrence}`}
                                            className="flex items-start gap-3 font-lato text-gray-600 text-base"
                                        >
                                            <span
                                                className="mt-2 w-2 h-2 rounded-full shrink-0"
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            />
                                            <span className="leading-relaxed">
                                                {item}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    }

                    case "tip":
                        return (
                            <div
                                key={blockKey}
                                className="relative rounded-2xl p-5 md:p-6 border-l-4"
                                style={{
                                    borderLeftColor: color,
                                    backgroundColor: `${color}08`,
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    <span
                                        className="text-xl mt-0.5"
                                        aria-hidden="true"
                                    >
                                        💡
                                    </span>
                                    <div>
                                        <span
                                            className="font-oswald font-bold text-sm tracking-wider uppercase mb-1 block"
                                            style={{ color }}
                                        >
                                            Local Buddy Tip
                                        </span>
                                        <p className="font-lato text-gray-700 text-sm md:text-base leading-relaxed">
                                            {block.content as string}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );

                    case "image":
                        return (
                            <div
                                key={blockKey}
                                className="rounded-2xl overflow-hidden shadow-md"
                            >
                                <Image
                                    src={block.content as string}
                                    alt="Guide Image"
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}
