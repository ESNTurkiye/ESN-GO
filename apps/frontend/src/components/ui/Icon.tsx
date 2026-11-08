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
  "menu-outline": (
    <path {...OUTLINE} strokeWidth={32} d="M80 160h352M80 256h352M80 352h352" />
  ),
  "close-outline": (
    <path {...OUTLINE} strokeWidth={32} d="M368 368 144 144M368 144 144 368" />
  ),
  "chevron-forward-outline": (
    <path {...OUTLINE} strokeWidth={48} d="m184 112 144 144-144 144" />
  ),
  "arrow-back-outline": (
    <path
      {...OUTLINE}
      strokeWidth={48}
      d="M244 400 100 256l144-144M120 256h292"
    />
  ),
  "arrow-forward-outline": (
    <path
      {...OUTLINE}
      strokeWidth={48}
      d="m268 112 144 144-144 144M392 256H100"
    />
  ),
  "arrow-up-outline": (
    <path
      {...OUTLINE}
      strokeWidth={48}
      d="m112 244 144-144 144 144M256 120v292"
    />
  ),
  "open-outline": (
    <path
      {...OUTLINE}
      strokeWidth={32}
      d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48M336 64h112v112M224 288 440 72"
    />
  ),
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
      <path
        d="M294 240s-21.51 16-38 16-38-16-38-16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  // Erasmus Hacks guide icons (seed/guides.json "icon"); book-outline is the fallback.
  "checkmark-done-outline": (
    <>
      <path
        d="M464 128 240 384l-96-96M144 384l-96-96M368 128 232 284"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  "id-card-outline": (
    <>
      <rect
        width={320}
        height={448}
        x={96}
        y={32}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M208 80h96"
      />
      <path d="M333.48 284.51A39.65 39.65 0 0 0 304 272c-11.6 0-22.09 4.41-29.54 12.43s-11.2 19.12-10.34 31C265.83 338.91 283.72 358 304 358s38.14-19.09 39.87-42.55c.88-11.78-2.82-22.77-10.39-30.94M371.69 448H236.31a12.05 12.05 0 0 1-9.31-4.17 13 13 0 0 1-2.76-10.92c3.25-17.56 13.38-32.31 29.3-42.66C267.68 381.06 285.6 376 304 376s36.32 5.06 50.46 14.25c15.92 10.35 26.05 25.1 29.3 42.66a13 13 0 0 1-2.76 10.92 12.05 12.05 0 0 1-9.31 4.17" />
    </>
  ),
  "phone-portrait-outline": (
    <>
      <rect
        width={256}
        height={480}
        x={128}
        y={16}
        rx={48}
        ry={48}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
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
      <rect
        width={448}
        height={352}
        x={32}
        y={112}
        rx={48}
        ry={48}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
      />
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
      <rect
        width={416}
        height={288}
        x={48}
        y={144}
        rx={48}
        ry={48}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <path
        d="M411.36 144v-30A50 50 0 0 0 352 64.9L88.64 109.85A50 50 0 0 0 48 159v49"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
      />
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
      <rect
        width={352}
        height={192}
        x={80}
        y={112}
        rx={32}
        ry={32}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <rect
        width={352}
        height={128}
        x={80}
        y={304}
        rx={32}
        ry={32}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <path
        d="M400 112H112a32.09 32.09 0 0 1-32-32h0a32.09 32.09 0 0 1 32-32h288a32.09 32.09 0 0 1 32 32h0a32.09 32.09 0 0 1-32 32M144 432v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22ZM416 432v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <circle
        cx={368}
        cy={368}
        r={16}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <circle
        cx={144}
        cy={368}
        r={16}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <path
        d="M256 112v192M80 80v288M432 80v288"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
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
  // Places (3.3, 3.7)
  "map-outline": (
    <>
      <path
        d="M313.27 124.64 198.73 51.36a32 32 0 0 0-29.28.35L56.51 127.49A16 16 0 0 0 48 141.63v295.8a16 16 0 0 0 23.49 14.14l97.82-63.79a32 32 0 0 1 29.5-.24l111.86 73a32 32 0 0 0 29.27-.11l115.43-75.94a16 16 0 0 0 8.63-14.2V74.57a16 16 0 0 0-23.49-14.14l-98 63.86a32 32 0 0 1-29.24.35M328 128v336M184 48v336"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  "list-outline": (
    <>
      <path
        d="M160 144h288M160 256h288M160 368h288"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <circle
        cx={80}
        cy={144}
        r={16}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <circle
        cx={80}
        cy={256}
        r={16}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <circle
        cx={80}
        cy={368}
        r={16}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  "add-outline": (
    <>
      <path
        d="M256 112v288M400 256H112"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  "location-outline": (
    <>
      <path
        d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <circle
        cx={256}
        cy={192}
        r={48}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  star: (
    <>
      <path d="M394 480a16 16 0 0 1-9.39-3L256 383.76 127.39 477a16 16 0 0 1-24.55-18.08L153 310.35 23 221.2a16 16 0 0 1 9-29.2h160.38l48.4-148.95a16 16 0 0 1 30.44 0l48.4 149H480a16 16 0 0 1 9.05 29.2L359 310.35l50.13 148.53A16 16 0 0 1 394 480" />
    </>
  ),
  "star-outline": (
    <>
      <path
        d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  "create-outline": (
    <>
      <path
        d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <path d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38M399.34 90 218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0" />
    </>
  ),
  "trash-outline": (
    <>
      <path
        d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <path
        d="M80 112h352"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <path
        d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  "image-outline": (
    <>
      <rect
        width={416}
        height={352}
        x={48}
        y={80}
        rx={48}
        ry={48}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <circle
        cx={336}
        cy={176}
        r={32}
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <path
        d="m304 335.79-90.66-90.49a32 32 0 0 0-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0 1 43.11-2L464 368"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  "search-outline": (
    <>
      <path
        d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <path
        d="M338.29 338.29 448 448"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
    </>
  ),
  "alert-circle-outline": (
    <>
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <path
        d="M250.26 166.05 256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <path d="M256 367.91a20 20 0 1 1 20-20 20 20 0 0 1-20 20" />
    </>
  ),
  "checkmark-circle-outline": (
    <>
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <path
        d="M352 176 217.6 336 160 272"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </>
  ),
  "airplane-outline": (
    <path
      {...OUTLINE}
      strokeWidth={32}
      d="M407.72 224c-3.4 0-14.79.1-18 .3l-64.9 1.7a1.83 1.83 0 0 1-1.69-.9L193.55 67.56a9 9 0 0 0-6.66-3.56H160l73 161a2.35 2.35 0 0 1-2.26 3.35l-121.69 1.8a8.06 8.06 0 0 1-6.6-3.1l-37-45c-3-3.9-8.62-6-13.51-6H33.08c-1.29 0-1.1 1.21-.75 2.43l19.84 71.42a16.3 16.3 0 0 1 0 11.9L32.31 333c-.59 1.95-.52 3 1.77 3H52c8.14 0 9.25-1.06 13.41-6.3l37.7-45.7a8.19 8.19 0 0 1 6.6-3.1l120.68 2.7a2.7 2.7 0 0 1 2.43 3.74L160 448h26.64a9 9 0 0 0 6.65-3.55L323.14 287c.39-.6 2-.9 2.69-.9l63.9 1.7c3.3.2 14.59.3 18 .3C452 288.1 480 275.93 480 256s-27.88-32-72.28-32"
    />
  ),
  "people-outline": (
    <>
      <path
        {...OUTLINE}
        strokeWidth={32}
        d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72"
      />
      <path
        {...OUTLINE}
        strokeWidth={32}
        d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304Z"
      />
      <path
        {...OUTLINE}
        strokeWidth={32}
        d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94"
      />
      <path
        {...OUTLINE}
        strokeWidth={32}
        d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154"
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
  size?: 20 | 24 | 32 | 48;
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
