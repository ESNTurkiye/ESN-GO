import type { SVGProps } from 'react';

export type GuideIconKey =
    | 'accommodation'
    | 'sim-card'
    | 'banking'
    | 'weekend'
    | 'booking'
    | 'neighborhood'
    | 'esn-card';

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
}

function BaseIcon(props: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        />
    );
}

const icons: Record<GuideIconKey, (props: IconProps) => JSX.Element> = {
    accommodation: (props) => (
        <BaseIcon {...props}>
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M10 21v-6h4v6" />
        </BaseIcon>
    ),
    'sim-card': (props) => (
        <BaseIcon {...props}>
            <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
            <path d="M10 6.5h4" />
            <path d="M10 17.5h4" />
            <path d="M12 20h.01" />
        </BaseIcon>
    ),
    banking: (props) => (
        <BaseIcon {...props}>
            <path d="M3 9 12 4l9 5" />
            <path d="M4 10h16" />
            <path d="M6 10v7" />
            <path d="M10 10v7" />
            <path d="M14 10v7" />
            <path d="M18 10v7" />
            <path d="M3 21h18" />
        </BaseIcon>
    ),
    weekend: (props) => (
        <BaseIcon {...props}>
            <path d="m3 19 6.5-9 3 4 2.5-3 6 8" />
            <path d="M3 19h18" />
        </BaseIcon>
    ),
    booking: (props) => (
        <BaseIcon {...props}>
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 7h6" />
            <path d="M8 11h8" />
            <path d="M8 15h5" />
            <path d="m9.5 19 1.5 1.5L14.5 17" />
        </BaseIcon>
    ),
    neighborhood: (props) => (
        <BaseIcon {...props}>
            <path d="M3 20V10l4-3 4 3v10" />
            <path d="M13 20V6l4-3 4 3v14" />
            <path d="M6.5 14h1" />
            <path d="M15.5 10h1" />
            <path d="M15.5 14h1" />
        </BaseIcon>
    ),
    'esn-card': (props) => (
        <BaseIcon {...props}>
            <rect x="3" y="6" width="18" height="12" rx="2.5" />
            <path d="M3 10.5h18" />
            <path d="M7 14.5h4" />
            <path d="M15 14.5h2" />
        </BaseIcon>
    ),
};

export function GuideCategoryIcon({ iconKey, className }: { iconKey: GuideIconKey; className?: string }) {
    const Icon = icons[iconKey];
    return <Icon className={className} />;
}

export function GuideChevronIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="m7 5 5 5-5 5" />
        </svg>
    );
}

export function GuideCalendarIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M3 10h18" />
        </svg>
    );
}