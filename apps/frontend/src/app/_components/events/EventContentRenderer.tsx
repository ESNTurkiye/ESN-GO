import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

const mdxComponents = {
    h2: (props: ComponentProps<"h2">) => (
        <h2
            className="text-2xl md:text-3xl font-oswald font-bold text-esn-dark-blue mt-10 first:mt-0 scroll-mt-24"
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
            className="font-lato text-gray-700 leading-relaxed text-base md:text-lg"
            {...props}
        />
    ),
    ul: (props: ComponentProps<"ul">) => (
        <ul className="list-disc pl-6 space-y-2 my-4" {...props} />
    ),
    ol: (props: ComponentProps<"ol">) => (
        <ol className="list-decimal pl-6 space-y-2 my-4" {...props} />
    ),
    li: (props: ComponentProps<"li">) => (
        <li className="font-lato text-gray-700 text-base md:text-lg leading-relaxed">
            {props.children}
        </li>
    ),
    a: (props: ComponentProps<"a">) => (
        <a
            className="text-esn-magenta font-lato underline underline-offset-2 hover:text-esn-dark-blue transition-colors"
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
                className="w-full max-w-3xl h-auto my-8 shadow-md"
                unoptimized={remote}
            />
        );
    },
    hr: (props: ComponentProps<"hr">) => <hr className="my-10 h-px bg-gray-200 border-0" {...props} />,
    blockquote: (props: ComponentProps<"blockquote">) => (
        <blockquote
            className="pl-4 my-6 italic font-lato text-gray-600"
            {...props}
        />
    ),
    table: ({ children, ...rest }: ComponentProps<"table">) => (
        <div className="overflow-x-auto my-6">
            <table
                className="min-w-full text-left text-sm font-lato"
                {...rest}
            >
                {children}
            </table>
        </div>
    ),
    thead: ({ children, ...rest }: ComponentProps<"thead">) => (
        <thead className="bg-gray-100 text-esn-dark-blue font-oswald" {...rest}>
            {children}
        </thead>
    ),
    tbody: ({ children, ...rest }: ComponentProps<"tbody">) => (
        <tbody className="bg-white" {...rest}>
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
        <td className="px-4 py-3 text-gray-700" {...rest}>
            {children}
        </td>
    ),
};

type EventContentRendererProps = {
    content: string;
};

export default function EventContentRenderer({
    content,
}: EventContentRendererProps) {
    return (
        <div className="space-y-6 max-w-none">
            <MDXRemote source={content} components={mdxComponents} />
        </div>
    );
}
