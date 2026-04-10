"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export interface DestinationCatalogItem {
    id: string;
    name: string;
    region: string;
    image_url: string;
    description: string;
    featured: boolean;
}

interface DestinationsCatalogProps {
    destinations: DestinationCatalogItem[];
}

type ViewMode = "grid" | "list";

export default function DestinationsCatalog({
    destinations,
}: DestinationsCatalogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [page, setPage] = useState(1);

    const regions = useMemo(() => {
        const uniqueRegions = Array.from(
            new Set(destinations.map((destination) => destination.region)),
        );
        return ["All", ...uniqueRegions];
    }, [destinations]);

    const filteredDestinations = useMemo(() => {
        return destinations.filter((destination) => {
            const matchesRegion =
                selectedRegion === "All" || destination.region === selectedRegion;
            const matchesSearch = destination.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesRegion && matchesSearch;
        });
    }, [destinations, searchQuery, selectedRegion]);

    const pageSize = viewMode === "grid" ? 9 : 6;
    const totalPages = Math.max(1, Math.ceil(filteredDestinations.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedDestinations = filteredDestinations.slice(
        startIndex,
        startIndex + pageSize,
    );

    const handleRegionChange = (region: string) => {
        setSelectedRegion(region);
        setPage(1);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setPage(1);
    };

    return (
        <section className="pt-32 pb-16 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <header className="mb-8">
                    <p className="text-esn-magenta font-oswald uppercase tracking-wider text-sm">
                        Explore Turkiye
                    </p>
                    <h1 className="mt-2 text-4xl md:text-5xl font-oswald text-esn-dark-blue">
                        Destinations Catalog
                    </h1>
                    <p className="mt-3 text-esn-dark-blue/80 max-w-2xl">
                        Discover cities across Turkiye with quick filters, search, and
                        detailed cards designed for Erasmus students.
                    </p>
                </header>

                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) =>
                                handleSearchChange(event.target.value)
                            }
                            placeholder="Search by city name"
                            className="w-full sm:w-72 rounded-xl border border-esn-dark-blue/20 px-4 py-2.5 text-esn-dark-blue focus:outline-none focus:ring-2 focus:ring-esn-magenta/40"
                        />
                        <select
                            value={selectedRegion}
                            onChange={(event) =>
                                handleRegionChange(event.target.value)
                            }
                            className="w-full sm:w-64 rounded-xl border border-esn-dark-blue/20 bg-white px-4 py-2.5 text-esn-dark-blue focus:outline-none focus:ring-2 focus:ring-esn-magenta/40"
                        >
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 self-end lg:self-auto">
                        <button
                            type="button"
                            onClick={() => setViewMode("grid")}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                viewMode === "grid"
                                    ? "bg-esn-magenta text-white"
                                    : "bg-esn-dark-blue/10 text-esn-dark-blue"
                            }`}
                        >
                            Grid
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode("list")}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                viewMode === "list"
                                    ? "bg-esn-magenta text-white"
                                    : "bg-esn-dark-blue/10 text-esn-dark-blue"
                            }`}
                        >
                            List
                        </button>
                    </div>
                </div>

                {paginatedDestinations.length === 0 ? (
                    <div className="rounded-2xl border border-esn-dark-blue/15 bg-esn-dark-blue/5 p-10 text-center text-esn-dark-blue">
                        No destinations found for your current filters.
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                                : "flex flex-col gap-4"
                        }
                    >
                        {paginatedDestinations.map((destination) => (
                            <article
                                key={destination.id}
                                className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg ${
                                    destination.featured
                                        ? "border-esn-magenta/50"
                                        : "border-esn-dark-blue/10"
                                } ${
                                    viewMode === "list"
                                        ? "flex flex-col sm:flex-row"
                                        : ""
                                }`}
                            >
                                <div
                                    className={`relative ${
                                        viewMode === "list"
                                            ? "h-52 sm:h-auto sm:w-64"
                                            : "h-52"
                                    }`}
                                >
                                    <Image
                                        src={destination.image_url}
                                        alt={destination.name}
                                        fill
                                        className="object-cover"
                                        sizes={
                                            viewMode === "list"
                                                ? "(max-width: 640px) 100vw, 256px"
                                                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        }
                                    />
                                </div>
                                <div className="flex-1 p-5">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="inline-flex rounded-full bg-esn-dark-blue/10 px-2.5 py-1 text-xs font-semibold text-esn-dark-blue">
                                            {destination.region}
                                        </span>
                                        {destination.featured && (
                                            <span className="inline-flex rounded-full bg-esn-magenta/15 px-2.5 py-1 text-xs font-semibold text-esn-magenta">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-oswald text-esn-dark-blue">
                                        {destination.name}
                                    </h2>
                                    <p className="mt-2 text-sm text-esn-dark-blue/80">
                                        {destination.description}
                                    </p>
                                    <Link
                                        href={`/destinations/${destination.id}`}
                                        className="mt-4 inline-flex items-center rounded-lg bg-esn-dark-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-esn-magenta"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                        disabled={currentPage === 1}
                        className="rounded-lg border border-esn-dark-blue/20 px-4 py-2 text-sm font-semibold text-esn-dark-blue disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Prev
                    </button>
                    <span className="text-sm font-semibold text-esn-dark-blue">
                        Page {currentPage} / {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                            setPage((current) =>
                                Math.min(totalPages, current + 1),
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-lg border border-esn-dark-blue/20 px-4 py-2 text-sm font-semibold text-esn-dark-blue disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
}
