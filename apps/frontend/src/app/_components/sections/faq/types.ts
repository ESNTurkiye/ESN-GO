export interface FAQ {
    id: number;
    slug: string;
    q: string;
    fullQ: string;
    a: string;
    color: string;
    img: string;
    guideSlug?: string;
}