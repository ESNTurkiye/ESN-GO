import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";
import { fetchDestinations } from "@/_lib/destinations";
import type { Destination } from "@/_lib/api-types";

function BentoCard({
    destination,
    className = "",
    sizes = "(max-width: 768px) 100vw, 50vw",
    priority = false,
}: {
    destination: Destination;
    className?: string;
    sizes?: string;
    priority?: boolean;
}) {
    const slug = destination.name.toLowerCase().replace(/\s+/g, "-");
    return (
        <Link
            href={`/destinations/${slug}`}
            className={`relative overflow-hidden rounded-2xl group cursor-pointer block ${className}`}
        >
            <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={sizes}
                priority={priority}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-2xl md:text-3xl font-oswald font-bold text-white uppercase">
                    {destination.name}
                </h3>
                <p className="text-gray-200 text-sm font-lato mt-1 line-clamp-2">
                    {destination.desc}
                </p>
            </div>
        </Link>
    );
}

export default async function DestinationsPage() {
    const response = await fetchDestinations();
    const destinations = response?.data?.destinations ?? [];

    const find = (name: string) => destinations.find((d) => d.name === name);

    const featured = [
        find("Istanbul"),
        find("Cappadocia"),
        find("Izmir"),
        find("Denizli"),
        find("Ankara"),
    ].filter((d): d is Destination => Boolean(d));

    const hiddenGems = [
        find("Bolu"),
        find("Ardahan"),
        find("Bilecik"),
        find("Antalya"),
    ].filter((d): d is Destination => Boolean(d));

    return (
        <div className="min-h-screen bg-white">
            {/* Page Hero */}
            <div className="relative bg-esn-dark-blue text-white pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <p className="text-esn-cyan font-oswald uppercase tracking-widest text-sm mb-3">
                        Discover
                    </p>
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase leading-tight mb-4">
                        Explore Türkiye
                    </h1>
                    <p className="text-white/70 font-lato text-lg max-w-xl">
                        Find your next adventure among Türkiye&apos;s most
                        vibrant student destinations, curated by ESN volunteers.
                    </p>
                </div>
                <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-esn-cyan/10 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute right-32 bottom-0 w-64 h-64 rounded-full bg-esn-magenta/10 blur-2xl translate-y-1/2 pointer-events-none" />
            </div>

            {/* Featured Destinations Bento Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center gap-3 mb-8">
                    <span className="w-1.5 h-8 rounded-full bg-esn-magenta inline-block" />
                    <h2 className="text-2xl font-oswald font-bold text-esn-dark-blue uppercase tracking-wide">
                        Featured
                    </h2>
                </div>

                {/* Desktop Bento Grid */}
                {featured.length >= 5 && (
                    <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-4 h-[640px]">
                        {/* Istanbul – spans 2 rows */}
                        <BentoCard
                            destination={featured[0]}
                            className="row-span-2"
                            sizes="33vw"
                            priority
                        />
                        {/* Cappadocia – top middle */}
                        <BentoCard
                            destination={featured[1]}
                            sizes="33vw"
                            priority
                        />
                        {/* Izmir – top right */}
                        <BentoCard
                            destination={featured[2]}
                            sizes="33vw"
                            priority
                        />
                        {/* Denizli – bottom middle */}
                        <BentoCard destination={featured[3]} sizes="33vw" />
                        {/* Ankara – bottom right */}
                        <BentoCard destination={featured[4]} sizes="33vw" />
                    </div>
                )}

                {/* Mobile / Tablet Grid */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {featured.map((dest, idx) => (
                        <BentoCard
                            key={dest.id}
                            destination={dest}
                            className={
                                idx === 0 ? "sm:col-span-2 h-72" : "h-56"
                            }
                            sizes="(max-width: 640px) 100vw, 50vw"
                            priority={idx < 2}
                        />
                    ))}
                </div>
            </div>

            {/* Hidden Gems Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-1.5 h-8 rounded-full bg-esn-cyan inline-block" />
                        <h2 className="text-2xl font-oswald font-bold text-esn-dark-blue uppercase tracking-wide">
                            Hidden Gems
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {hiddenGems.map((dest) => (
                            <BentoCard
                                key={dest.id}
                                destination={dest}
                                className="h-48 md:h-60"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Quiz CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative bg-esn-dark-blue rounded-3xl px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-oswald font-bold text-white mb-3">
                            Not sure where to go?
                        </h2>
                        <p className="text-white/70 font-lato max-w-md text-base">
                            Take our quick quiz and let us match you with the
                            perfect Turkish destination based on your travel
                            style and preferences.
                        </p>
                    </div>
                    <Button
                        variant="magenta"
                        size="lg"
                        href="#"
                        className="relative z-10 shrink-0"
                    >
                        Take the quiz
                    </Button>
                    <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-esn-cyan/10 blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
