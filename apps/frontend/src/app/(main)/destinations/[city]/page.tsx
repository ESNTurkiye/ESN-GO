import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDestinations } from "@/app/_lib/destinations";

interface CityPageProps {
    params: Promise<{
        city: string;
    }>;
}

const CITY_STATS: Record<
    string,
    { students: string; avgRent: string; vibe: string }
> = {
    istanbul: { students: "15,000+", avgRent: "€450", vibe: "Legendary" },
    ankara: { students: "8,000+", avgRent: "€320", vibe: "Academic" },
    antalya: { students: "6,000+", avgRent: "€380", vibe: "Sunny" },
};

const QUICK_TAGS = [
    "survival guide",
    "transit map",
    "local vibes",
    "community tips",
];

function createSlug(cityName: string): string {
    return cityName
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
}

export async function generateStaticParams() {
    const response = await fetchDestinations();
    const destinations = response?.data?.destinations ?? [];
    return destinations.map((destination) => ({
        city: createSlug(destination.name),
    }));
}

export async function generateMetadata({
    params,
}: CityPageProps): Promise<Metadata> {
    const { city } = await params;
    return {
        title: `${city} | Destination | ESN GO`,
        description: `Explore ${city} details, highlights and Erasmus-friendly city information.`,
    };
}

export default async function DestinationCityPage({ params }: CityPageProps) {
    const { city } = await params;
    const response = await fetchDestinations();
    const destinations = response?.data?.destinations ?? [];

    const destination = destinations.find(
        (item) => createSlug(item.name) === city,
    );

    if (!destination) {
        notFound();
    }

    const slug = createSlug(destination.name);
    const stats = CITY_STATS[slug] ?? {
        students: "3,000+",
        avgRent: "€300",
        vibe: "Vibrant",
    };

    const trendingSpots = [
        {
            name: `${destination.name} Old Town`,
            level: "basic",
            score: "8.9",
            price: "€",
        },
        {
            name: `${destination.name} Sunset Point`,
            level: "basic",
            score: "9.1",
            price: "€€",
        },
    ];

    const attractions = [
        `${destination.name} City Museum`,
        "Historic Center",
        "Student Square",
        "Riverside Walk",
    ];

    return (
        <main className="pt-32 pb-16 min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="mb-5">
                    <Link
                        href="/destinations"
                        className="inline-flex items-center text-sm font-semibold text-esn-dark-blue hover:text-esn-magenta"
                    >
                        Destinations / {destination.name}
                    </Link>
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <article className="lg:col-span-2 rounded-3xl border border-esn-dark-blue/15 overflow-hidden shadow-sm">
                        <div className="relative h-64 md:h-72">
                            <Image
                                src={destination.image}
                                alt={destination.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5">
                                <p className="text-white/85 text-sm">
                                    city guide / 2026 edition
                                </p>
                                <h1 className="text-white text-5xl md:text-6xl font-oswald leading-none mt-1">
                                    {destination.name}
                                </h1>
                                <p className="text-white/90 text-sm mt-2 max-w-lg">
                                    Two continents, one chaotic heart. Discover student
                                    life, budget hacks and must-see places.
                                </p>
                            </div>
                        </div>
                    </article>

                    <aside className="space-y-4">
                        <div className="rounded-2xl border border-esn-dark-blue/15 bg-white p-4">
                            <p className="text-sm text-esn-dark-blue/80">
                                Erasmus pulse
                            </p>
                            <div className="mt-3 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-esn-dark-blue/70">
                                        students
                                    </span>
                                    <span className="font-semibold text-esn-dark-blue">
                                        {stats.students}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-esn-dark-blue/70">
                                        avg. rent
                                    </span>
                                    <span className="font-semibold text-esn-dark-blue">
                                        {stats.avgRent}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-esn-dark-blue/70">
                                        vibe level
                                    </span>
                                    <span className="font-semibold text-esn-dark-blue">
                                        {stats.vibe}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full rounded-xl bg-esn-magenta text-white py-3 px-4 font-semibold hover:bg-esn-magenta/85 transition-colors"
                        >
                            Get your ESN card now
                        </button>
                    </aside>
                </section>

                <section className="mt-5 flex flex-wrap gap-2">
                    {QUICK_TAGS.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            className="rounded-full border border-esn-dark-blue/25 px-3 py-1.5 text-sm text-esn-dark-blue hover:border-esn-magenta hover:text-esn-magenta transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </section>

                <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-2xl font-oswald text-esn-dark-blue">
                                Trending spots
                            </h2>
                            <button
                                type="button"
                                className="text-sm font-semibold text-esn-dark-blue hover:text-esn-magenta"
                            >
                                View all {">"}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trendingSpots.map((spot) => (
                                <article
                                    key={spot.name}
                                    className="rounded-2xl border border-esn-dark-blue/15 overflow-hidden"
                                >
                                    <div className="relative h-44">
                                        <Image
                                            src={destination.image}
                                            alt={spot.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span className="inline-flex rounded-full bg-esn-dark-blue/10 px-2 py-0.5 text-esn-dark-blue">
                                                {spot.level}
                                            </span>
                                            <span className="text-esn-dark-blue/80">
                                                puan {spot.score}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-esn-dark-blue">
                                            {spot.name}
                                        </h3>
                                        <p className="text-sm text-esn-dark-blue/75">
                                            fiyat {spot.price}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <aside className="rounded-2xl border border-esn-dark-blue/15 p-4">
                        <h3 className="font-oswald text-xl text-esn-dark-blue">
                            Eger varsa local tips
                        </h3>
                        <p className="text-sm text-esn-dark-blue/80 mt-2">
                            Student communities suggest checking transport cards,
                            weekly food markets and museum days for lower budgets.
                        </p>
                        <p className="text-sm text-esn-dark-blue/80 mt-2">
                            Best semester rhythm: discover neighborhoods in your first
                            month, then lock your regular social spots.
                        </p>
                    </aside>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-oswald text-esn-dark-blue mb-3">
                        Top attractions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {attractions.map((attraction) => (
                            <div
                                key={attraction}
                                className="rounded-2xl border border-esn-dark-blue/15 p-4 min-h-24 flex items-center justify-center text-center text-sm text-esn-dark-blue"
                            >
                                {attraction}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
