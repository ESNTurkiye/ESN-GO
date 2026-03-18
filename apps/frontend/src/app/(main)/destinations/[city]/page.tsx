import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "@/components/ui/Button";
import { fetchDestinations } from "@/_lib/destinations";

interface DestinationPageProps {
    params: Promise<{ city: string }>;
}

interface Spot {
    id: number;
    category: string;
    title: string;
    place: string;
    price: string;
    tags: string[];
}

const MOCK_SPOTS: Record<string, Spot[]> = {
    istanbul: [
        {
            id: 1,
            category: "Food & Drinks",
            title: "Breakfast at Karaköy",
            place: "Karaköy",
            price: "€€",
            tags: ["Morning", "Local"],
        },
        {
            id: 2,
            category: "Culture",
            title: "Topkapi Palace Tour",
            place: "Sultanahmet",
            price: "€",
            tags: ["History", "Art"],
        },
        {
            id: 3,
            category: "Nightlife",
            title: "Rooftop at Cihangir",
            place: "Cihangir",
            price: "€€€",
            tags: ["Drinks", "Views"],
        },
        {
            id: 4,
            category: "Nature",
            title: "Princes Islands Trip",
            place: "Adalar",
            price: "€€",
            tags: ["Outdoors", "Active"],
        },
    ],
    default: [
        {
            id: 1,
            category: "Food & Drinks",
            title: "Local Breakfast Spot",
            place: "City Center",
            price: "€€",
            tags: ["Morning", "Local"],
        },
        {
            id: 2,
            category: "Culture",
            title: "Historical Museum Visit",
            place: "Old Town",
            price: "€",
            tags: ["History", "Art"],
        },
        {
            id: 3,
            category: "Nightlife",
            title: "Rooftop Bar Experience",
            place: "Skyline District",
            price: "€€€",
            tags: ["Drinks", "Views"],
        },
        {
            id: 4,
            category: "Nature",
            title: "Scenic Hiking Trail",
            place: "Nature Reserve",
            price: "Free",
            tags: ["Outdoors", "Active"],
        },
    ],
};

const PRICE_COLOR: Record<string, string> = {
    Free: "bg-esn-green/10 text-esn-green",
    "€": "bg-esn-cyan/10 text-esn-cyan",
    "€€": "bg-esn-orange/10 text-esn-orange",
    "€€€": "bg-esn-magenta/10 text-esn-magenta",
};

const TABS = ["Preview", "Tourist Map", "Local Vibes", "Community"];

export async function generateStaticParams() {
    const response = await fetchDestinations();
    const destinations = response?.data?.destinations ?? [];
    return destinations.map((d) => ({
        city: d.name.toLowerCase().replace(/\s+/g, "-"),
    }));
}

export default async function DestinationPage({
    params,
}: DestinationPageProps) {
    const { city } = await params;

    const response = await fetchDestinations();
    const destinations = response?.data?.destinations ?? [];

    const destination = destinations.find(
        (d) => d.name.toLowerCase().replace(/\s+/g, "-") === city,
    );

    if (!destination) {
        notFound();
    }

    const spots = MOCK_SPOTS[city] ?? MOCK_SPOTS.default;

    const attractionImages = [
        destination.image,
        destinations.find((d) => d.id !== destination.id)?.image ??
            destination.image,
        destinations.find(
            (d) => d.id !== destination.id && d.id !== destinations[1]?.id,
        )?.image ?? destination.image,
        destinations[destinations.length - 1]?.image ?? destination.image,
    ];

    const sideCardImages = [
        destinations.find((d) => d.id !== destination.id)?.image ??
            destination.image,
        destinations.find(
            (d) =>
                d.id !== destination.id &&
                d.image !==
                    destinations.find((x) => x.id !== destination.id)?.image,
        )?.image ?? destination.image,
    ];

    return (
        <div className="min-h-screen bg-white pt-16 md:pt-20">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-2 text-sm font-lato text-gray-500"
                >
                    <Link
                        href="/"
                        className="hover:text-esn-cyan transition-colors"
                    >
                        Home
                    </Link>
                    <span aria-hidden="true">/</span>
                    <Link
                        href="/destinations"
                        className="hover:text-esn-cyan transition-colors"
                    >
                        Destinations
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-esn-dark-blue font-medium">
                        {destination.name}
                    </span>
                </nav>
            </div>

            {/* City Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left: Text content */}
                    <div>
                        <p className="text-esn-cyan font-oswald uppercase tracking-widest text-sm mb-2">
                            City Guide
                        </p>
                        <h1
                            className="font-oswald font-bold text-esn-dark-blue uppercase leading-tight mb-4"
                            style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
                        >
                            {destination.name}
                        </h1>
                        <p className="text-gray-600 font-lato text-lg leading-relaxed mb-8 max-w-lg">
                            {destination.desc}. Dive into local culture, hidden
                            spots, and authentic Erasmus experiences curated by
                            students who lived here.
                        </p>
                        <Button variant="cyan" size="lg" href="#">
                            Get on-road info
                        </Button>
                    </div>

                    {/* Right: Main image + overlapping side cards */}
                    <div className="relative h-80 md:h-[420px] lg:h-[480px]">
                        {/* Main image */}
                        <div className="absolute inset-y-0 left-0 right-20 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={destination.image}
                                alt={destination.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 90vw, 45vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Side card – top right */}
                        <div className="absolute top-4 right-0 w-32 h-28 md:w-36 md:h-32 rounded-xl overflow-hidden shadow-xl border-2 border-white z-10">
                            <Image
                                src={sideCardImages[0]}
                                alt="City highlight"
                                fill
                                className="object-cover"
                                sizes="144px"
                            />
                        </div>

                        {/* Side card – bottom right */}
                        <div className="absolute bottom-4 right-0 w-32 h-28 md:w-36 md:h-32 rounded-xl overflow-hidden shadow-xl border-2 border-white z-10">
                            <Image
                                src={sideCardImages[1]}
                                alt="City highlight"
                                fill
                                className="object-cover"
                                sizes="144px"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 sticky top-16 md:top-20 z-30 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto">
                        {TABS.map((tab, idx) => (
                            <button
                                key={tab}
                                type="button"
                                className={`px-5 py-4 text-sm font-oswald font-bold uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                                    idx === 0
                                        ? "border-esn-cyan text-esn-cyan"
                                        : "border-transparent text-gray-500 hover:text-esn-dark-blue hover:border-gray-300"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trending Spots */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-oswald font-bold text-esn-dark-blue uppercase">
                        Trending Spots
                    </h2>
                    <Link
                        href="#"
                        className="text-esn-cyan font-oswald font-bold text-sm uppercase tracking-wide hover:underline flex items-center gap-1"
                    >
                        View all
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {spots.map((spot) => (
                        <div
                            key={spot.id}
                            className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-oswald uppercase tracking-wide text-gray-500 font-bold">
                                    {spot.category}
                                </span>
                                <span
                                    className={`text-xs font-oswald font-bold px-2.5 py-1 rounded-full ${PRICE_COLOR[spot.price] ?? PRICE_COLOR["€€"]}`}
                                >
                                    {spot.price}
                                </span>
                            </div>
                            <h3 className="text-lg font-oswald font-bold text-esn-dark-blue mb-1">
                                {spot.title}
                            </h3>
                            <p className="text-gray-500 text-sm font-lato mb-3">
                                {spot.place}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {spot.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-lato bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Attractions */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-oswald font-bold text-esn-dark-blue uppercase mb-8">
                        Top Attractions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {attractionImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="relative h-40 md:h-52 rounded-xl overflow-hidden group cursor-pointer"
                            >
                                <Image
                                    src={img}
                                    alt={`${destination.name} attraction ${idx + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
