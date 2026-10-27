import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import { cn } from "@/_lib/utils";

const mdxComponents = {
    h2: (props: ComponentProps<"h2">) => (
        <h2
            className="mt-10 scroll-mt-24 font-oswald text-2xl font-bold text-white first:mt-0 md:text-3xl"
            {...props}
        />
    ),
    h3: (props: ComponentProps<"h3">) => (
        <h3
            className="mt-8 font-oswald text-xl font-bold text-white md:text-2xl"
            {...props}
        />
    ),
    p: (props: ComponentProps<"p">) => (
        <p
            className="font-lato text-base leading-relaxed text-white/85 md:text-lg"
            {...props}
        />
    ),
    ul: (props: ComponentProps<"ul">) => (
        <ul
            className="my-4 list-disc space-y-2 pl-6 marker:text-esn-magenta"
            {...props}
        />
    ),
    ol: (props: ComponentProps<"ol">) => (
        <ol
            className="my-4 list-decimal space-y-2 pl-6 text-white/85 marker:text-esn-cyan"
            {...props}
        />
    ),
    li: ({ children, className, ...rest }: ComponentProps<"li">) => (
        <li
            className={cn(
                "font-lato text-base leading-relaxed text-white/85 md:text-lg [&_p]:mb-2 [&_p:last-child]:mb-0",
                className,
            )}
            {...rest}
        >
            {children}
        </li>
    ),
    a: (props: ComponentProps<"a">) => (
        <a
            className="font-lato text-esn-magenta underline decoration-esn-magenta/50 underline-offset-2 transition hover:text-esn-cyan"
            {...props}
        />
    ),
    img: (props: ComponentProps<"img">) => {
        const src = typeof props.src === "string" ? props.src : "";
        if (!src) {
            return null;
        }
        const remote = src.startsWith("http");
        return (
            <Image
                src={src}
                alt={props.alt ?? ""}
                width={1200}
                height={800}
                className="my-8 h-auto w-full max-w-3xl rounded-2xl border border-white/10 shadow-lg"
                unoptimized={remote}
            />
        );
    },
    hr: (props: ComponentProps<"hr">) => (
        <hr className="my-10 h-px border-0 bg-white/10" {...props} />
    ),
    blockquote: (props: ComponentProps<"blockquote">) => (
        <blockquote
            className="my-6 border-l-2 border-esn-magenta/60 pl-4 font-lato italic text-white/85"
            {...props}
        />
    ),
    table: ({ children, ...rest }: ComponentProps<"table">) => (
        <div className="my-6 overflow-x-auto">
            <table
                className="min-w-full text-left font-lato text-sm text-white/85"
                {...rest}
            >
                {children}
            </table>
        </div>
    ),
    thead: ({ children, ...rest }: ComponentProps<"thead">) => (
        <thead className="bg-esn-dark-blue/35 font-oswald text-esn-white" {...rest}>
            {children}
        </thead>
    ),
    tbody: ({ children, ...rest }: ComponentProps<"tbody">) => (
        <tbody className="bg-esn-dark-blue/15" {...rest}>
            {children}
        </tbody>
    ),
    tr: (props: ComponentProps<"tr">) => <tr {...props} />,
    th: ({ children, ...rest }: ComponentProps<"th">) => (
        <th className="px-4 py-3 font-semibold" {...rest}>
            {children}
        </th>
    ),
    td: ({ children, ...rest }: ComponentProps<"td">) => (
        <td className="px-4 py-3 text-white/85" {...rest}>
            {children}
        </td>
    ),
    strong: (props: ComponentProps<"strong">) => (
        <strong className="font-semibold text-esn-white" {...props} />
    ),
};

type EventContentRendererProps = {
    content: string;
};

export default function EventContentRenderer({ content }: EventContentRendererProps) {
    return (
        <div className="max-w-none space-y-6">
            <MDXRemote source={content} components={mdxComponents} />
        </div>
    );
}
