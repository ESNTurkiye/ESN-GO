/**
 * Ionicons (MIT, https://ionic.io/ionicons): the only icon set (standard: Fotoğraf ve ikonlar).
 * Paths copied from ionicons@8.1.0 dist/svg. Add a new icon here when a page needs it.
 */
const OUTLINE = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
} as const;

const ICONS = {
    "menu-outline": <path {...OUTLINE} strokeWidth={32} d="M80 160h352M80 256h352M80 352h352" />,
    "close-outline": <path {...OUTLINE} strokeWidth={32} d="M368 368 144 144M368 144 144 368" />,
    "chevron-forward-outline": <path {...OUTLINE} strokeWidth={48} d="m184 112 144 144-144 144" />,
    "arrow-forward-outline": <path {...OUTLINE} strokeWidth={48} d="m268 112 144 144-144 144M392 256H100" />,
    "open-outline": <path {...OUTLINE} strokeWidth={32} d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48M336 64h112v112M224 288 440 72" />,
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
    name: IconName;
    /** 20 or 24 px (standard). */
    size?: 20 | 24;
    /** Leave empty for decorative icons next to text. */
    label?: string;
    className?: string;
};

export function Icon({ name, size = 24, label, className }: IconProps) {
    return (
        <svg
            viewBox="0 0 512 512"
            width={size}
            height={size}
            className={className}
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            focusable="false"
        >
            {ICONS[name]}
        </svg>
    );
}
