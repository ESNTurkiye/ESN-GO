import DestinationsCarousel from './DestinationsCarousel';
import DestinationsSectionSkeleton from './DestinationsSectionSkeleton';
import { fetchDestinations } from '@/app/_lib/destinations';

export default async function DestinationsSection() {
    const response = await fetchDestinations();
    const destinations = response?.data?.destinations ?? [];

    if (!destinations.length) {
        return (
            <>
                <DestinationsSectionSkeleton />
            </>
        );
    }

    return <DestinationsCarousel destinations={destinations} />;
}