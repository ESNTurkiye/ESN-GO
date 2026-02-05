export interface Destination {
    id: number;
    name: string;
    image: string;
    desc: string;
}

export interface DestinationsCarouselProps {
    destinations: Destination[];
}