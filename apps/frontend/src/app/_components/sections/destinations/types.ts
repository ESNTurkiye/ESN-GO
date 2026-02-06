export interface Destination {
    id: number;
    name: string;
    image: string;
    desc: string;
}

export interface DestinationsApiResponse {
    status: string;
    message: string;
    data: {
        destinations: Destination[];
    };
    error_code: string | null;
}

export interface DestinationsCarouselProps {
    destinations: Destination[];
}