import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import { getGuideContentBySlug } from "@/app/_lib/guides";

interface GuideContentRendererProps {
    slug: string;
    color: string;
}

const createMdxComponents = (color: string) => ({
    h2: (props: ComponentProps<"h2">) => (
        <h2
            className="text-2xl md:text-3xl font-oswald font-bold text-esn-dark-blue mt-8 first:mt-0"
            {...props}
        />
    ),
    h3: (props: ComponentProps<"h3">) => (
        <h3
            className="text-xl md:text-2xl font-oswald font-bold text-esn-dark-blue mt-8"
            {...props}
        />
    ),
    p: (props: ComponentProps<"p">) => (
        <p
            className="font-lato text-gray-600 leading-relaxed text-base md:text-lg"
            {...props}
        />
    ),
    ul: (props: ComponentProps<"ul">) => (
        <ul className="space-y-3 ml-1" {...props} />
    ),
    li: (props: ComponentProps<"li">) => (
        <li className="flex items-start gap-3 font-lato text-gray-600 text-base">
            <span
                className="mt-2 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: color }}
            />
            <span className="leading-relaxed">{props.children}</span>
        </li>
    ),
    GuideTip: (props: ComponentProps<"div">) => (
        <div
            className="relative rounded-2xl p-5 md:p-6"
            style={{
                backgroundColor: `${color}08`,
            }}
        >
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <rect
                    x="0.5"
                    y="0.5"
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    rx="16"
                    fill="none"
                    stroke="rgba(156, 163, 175, 0.9)"
                    strokeWidth="1"
                    strokeDasharray="1 6"
                    strokeLinecap="round"
                />
            </svg>
            <div className="flex items-start gap-4">
                <span
                    className="inline-flex h-16 w-12 md:h-20 md:w-14 items-center justify-center shrink-0"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 36 54"
                        className="h-14 w-10 md:h-16 md:w-12"
                        style={{ color }}
                        aria-hidden="true"
                    >
                        <title>Local buddy illustration</title>
                        <rect x="11" y="3" width="14" height="34" rx="5" fill="#0F1F4D" transform="rotate(12 11 3)" />
                        <rect x="8" y="2" width="14" height="34" rx="5" fill="currentColor" transform="rotate(12 8 2)" />
                        <ellipse cx="16.5" cy="46" rx="9" ry="6.5" fill="#0F1F4D" />
                        <ellipse cx="13.5" cy="44.5" rx="9" ry="6.5" fill="currentColor" />
                    </svg>
                </span>
                <div>
                    <span
                        className="font-oswald font-extrabold text-base tracking-wide uppercase mb-1 block"
                        style={{ color }}
                    >
                        Local Buddy Tip
                    </span>
                    <p className="font-lato text-gray-700 text-sm md:text-base leading-relaxed">
                        {props.children}
                    </p>
                </div>
            </div>
        </div>
    ),
});

export default async function GuideContentRenderer({
    slug,
    color,
}: GuideContentRendererProps) {
    const source = await getGuideContentBySlug(slug);
    if (!source) {
        return null;
    }

    return (
        <div className="space-y-6">
            <MDXRemote source={source} components={createMdxComponents(color)} />
        </div>
    );
}
