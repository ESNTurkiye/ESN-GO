import DestinationsCarousel from './DestinationsCarousel';
import { fetchDestinations } from '@/app/_lib/destinations';

export default async function DestinationsSection() {
    const response = await fetchDestinations();
    const destinations = response?.data?.destinations ?? [];

    return <DestinationsCarousel destinations={destinations} />;
}