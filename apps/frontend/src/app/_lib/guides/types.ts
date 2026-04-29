export interface ExclusiveOffer {
    title: string;
    description: string;
    discount: string;
    link?: string;
}

export interface GuideCategory {
    slug: string;
    order: number;
    title: string;
    icon: string;
    color: string;
    heroImage: string;
    readTime: number;
    offers: ExclusiveOffer[];
    content: string;
}
