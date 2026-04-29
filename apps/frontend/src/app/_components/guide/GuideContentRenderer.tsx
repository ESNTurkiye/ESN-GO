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
            <div className="flex items-start gap-3">
                <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full mt-0.5"
                    style={{ backgroundColor: `${color}1A` }}
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        style={{ color }}
                    >
                        <path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .8 1.7V16h5.6v-.5c0-.7.3-1.3.8-1.7A6 6 0 0 0 12 3Z" />
                        <path d="M9.5 19h5" />
                        <path d="M10.2 21h3.6" />
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
