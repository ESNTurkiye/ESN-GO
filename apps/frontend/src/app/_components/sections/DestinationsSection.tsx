import DestinationsCarousel from './DestinationsCarousel';
import { fetchDestinations } from '@/app/_lib/destinations';

export default async function DestinationsSection() {
    const destinations = await fetchDestinations();

    if (!destinations.length) {
        return null;
    }

    return <DestinationsCarousel destinations={destinations} />;
}