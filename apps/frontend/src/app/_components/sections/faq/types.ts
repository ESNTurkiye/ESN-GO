export interface FAQ {
    id: number;
    slug: string;
    q: string;
    fullQ: string;
    a: string;
    color: string;
    img: string;
}

export interface FAQItemProps {
    faq: FAQ;
    index: number;
    isActive: boolean;
    isDesktop: boolean;
    isMounted: boolean;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}