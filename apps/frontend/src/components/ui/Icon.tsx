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
    "arrow-up-outline": <path {...OUTLINE} strokeWidth={48} d="m112 244 144-144 144 144M256 120v292" />,
    "open-outline": <path {...OUTLINE} strokeWidth={32} d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48M336 64h112v112M224 288 440 72" />,
    // Info rows and tip boxes
    "call-outline": (
        <>
            <path
                d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160 160 0 0 0 83 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159 159 0 0 0 13.8-25.8C465 391.17 468 391.17 451 374Z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={32}
            />
        </>
    ),
    "bulb-outline": (
        <>
            <path
                d="M304 384v-24c0-29 31.54-56.43 52-76 28.84-27.57 44-64.61 44-108 0-80-63.73-144-144-144a143.6 143.6 0 0 0-144 144c0 41.84 15.81 81.39 44 108 20.35 19.21 52 46.7 52 76v24M224 480h64M208 432h96M256 384V256"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
            />
            <path d="M294 240s-21.51 16-38 16-38-16-38-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
        </>
    ),
    // Erasmus Hacks guide icons (seed/guides.json "icon"); book-outline is the fallback.
    "checkmark-done-outline": (
        <>
            <path d="M464 128 240 384l-96-96M144 384l-96-96M368 128 232 284" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
        </>
    ),
    "id-card-outline": (
        <>
            <rect width={320} height={448} x={96} y={32} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} rx={48} />
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M208 80h96" />
            <path d="M333.48 284.51A39.65 39.65 0 0 0 304 272c-11.6 0-22.09 4.41-29.54 12.43s-11.2 19.12-10.34 31C265.83 338.91 283.72 358 304 358s38.14-19.09 39.87-42.55c.88-11.78-2.82-22.77-10.39-30.94M371.69 448H236.31a12.05 12.05 0 0 1-9.31-4.17 13 13 0 0 1-2.76-10.92c3.25-17.56 13.38-32.31 29.3-42.66C267.68 381.06 285.6 376 304 376s36.32 5.06 50.46 14.25c15.92 10.35 26.05 25.1 29.3 42.66a13 13 0 0 1-2.76 10.92 12.05 12.05 0 0 1-9.31 4.17" />
        </>
    ),
    "phone-portrait-outline": (
        <>
            <rect width={256} height={480} x={128} y={16} rx={48} ry={48} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
            <path
                d="M176 16h24a8 8 0 0 1 8 8h0a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16h0a8 8 0 0 1 8-8h24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
            />
        </>
    ),
    "medkit-outline": (
        <>
            <rect width={448} height={352} x={32} y={112} rx={48} ry={48} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} />
            <path
                d="M144 112V80a32 32 0 0 1 32-32h160a32 32 0 0 1 32 32v32M256 208v160M336 288H176"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
            />
        </>
    ),
    "wallet-outline": (
        <>
            <rect width={416} height={288} x={48} y={144} rx={48} ry={48} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} />
            <path d="M411.36 144v-30A50 50 0 0 0 352 64.9L88.64 109.85A50 50 0 0 0 48 159v49" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} />
            <path d="M368 320a32 32 0 1 1 32-32 32 32 0 0 1-32 32" />
        </>
    ),
    "home-outline": (
        <>
            <path
                d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
            />
            <path
                d="M480 256 266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
            />
        </>
    ),
    "bus-outline": (
        <>
            <rect width={352} height={192} x={80} y={112} rx={32} ry={32} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
            <rect width={352} height={128} x={80} y={304} rx={32} ry={32} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
            <path
                d="M400 112H112a32.09 32.09 0 0 1-32-32h0a32.09 32.09 0 0 1 32-32h288a32.09 32.09 0 0 1 32 32h0a32.09 32.09 0 0 1-32 32M144 432v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22ZM416 432v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
            />
            <circle cx={368} cy={368} r={16} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} />
            <circle cx={144} cy={368} r={16} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} />
            <path d="M256 112v192M80 80v288M432 80v288" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
        </>
    ),
    "train-outline": (
        <>
            <path
                d="M344 48h-24a16 16 0 0 0-16-16h-96a16 16 0 0 0-16 16h-24a56.16 56.16 0 0 0-56 56v247c0 35.3 144 65 144 65s144-29.7 144-65V104a56 56 0 0 0-56-56m-88 304a48 48 0 1 1 48-48 48 48 0 0 1-48 48m96-160a16 16 0 0 1-16 16H176a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16ZM144 464h224M336 432l48 48M176 432l-48 48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
            />
        </>
    ),
    "ticket-outline": (
        <>
            <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={32}
                d="M366.05 146a46.7 46.7 0 0 1-2.42-63.42 3.87 3.87 0 0 0-.22-5.26l-44.13-44.18a3.89 3.89 0 0 0-5.5 0l-70.34 70.34a23.6 23.6 0 0 0-5.71 9.24 23.66 23.66 0 0 1-14.95 15 23.7 23.7 0 0 0-9.25 5.71L33.14 313.78a3.89 3.89 0 0 0 0 5.5l44.13 44.13a3.87 3.87 0 0 0 5.26.22 46.69 46.69 0 0 1 65.84 65.84 3.87 3.87 0 0 0 .22 5.26l44.13 44.13a3.89 3.89 0 0 0 5.5 0l180.4-180.39a23.7 23.7 0 0 0 5.71-9.25 23.66 23.66 0 0 1 14.95-15 23.6 23.6 0 0 0 9.24-5.71l70.34-70.34a3.89 3.89 0 0 0 0-5.5l-44.13-44.13a3.87 3.87 0 0 0-5.26-.22 46.7 46.7 0 0 1-63.42-2.32Z"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={32}
                d="m250.5 140.44-16.51-16.51M294.52 184.46l-11.01-11M338.54 228.49l-11-11.01M388.07 278.01l-16.51-16.51"
            />
        </>
    ),
    "book-outline": (
        <>
            <path
                d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96M256 160v288"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
            />
        </>
    ),
} as const;

export type IconName = keyof typeof ICONS;

/** For icon names that come from the API. */
export function isIconName(name: unknown): name is IconName {
    return typeof name === "string" && Object.hasOwn(ICONS, name);
}

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
            fill="currentColor"
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            focusable="false"
        >
            {ICONS[name]}
        </svg>
    );
}
