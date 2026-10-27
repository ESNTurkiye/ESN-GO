import type { SVGProps } from "react";

/** Same “open in new window” mark as guide ExclusiveOffers external links. */
export default function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M14 3h7v7" />
            <path d="M10 14 21 3" />
            <path d="M21 14v7H3V3h7" />
        </svg>
    );
}
