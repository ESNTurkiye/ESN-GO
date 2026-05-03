"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "../ui/ArrowIcon";

export default function FoodSection() {
    const foodSpots = [
        {
            name: "Sultanahmet Köftecisi",
            type: "Traditional Turkish",
            price: "₺₺",
            discount: "ESNcard -20%",
            image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
        },
        {
            name: "Simit Sarayı",
            type: "Fast Food & Breakfast",
            price: "₺",
            discount: "Student Menu",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
        },
        {
            name: "Çiya Sofrası",
            type: "Anatolian Cuisine",
            price: "₺₺",
            discount: "ESNcard -15%",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
        },
        {
            name: "Karaköy Lokantası",
            type: "Turkish Home Cooking",
            price: "₺₺",
            discount: "ESNcard -15%",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947",
        },
        {
            name: "Midpoint",
            type: "Cafe & Brunch",
            price: "₺₺",
            discount: "Student -10%",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        },
        {
            name: "Tarihi Eminönü Balık Ekmek",
            type: "Street Food",
            price: "₺",
            discount: "Cash Discount",
            image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6",
        },
    ];

    const visibleSpots = foodSpots.slice(0, 4);

    return (
        <section className="section-padding bg-[#FFF8F0]">
            <div className="max-w-7xl mx-auto container-responsive">
                <div className="mb-12">
                    <h2 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mt-4 mb-4 ">
                        Budget-Friendly Eats
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {visibleSpots.map((spot) => (
                        <article
                            key={spot.name}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                            aria-label={`${spot.name} restaurant`}
                        >
                            <div className="relative h-48 sm:h-52">
                                <Image
                                    src={spot.image}
                                    alt={`${spot.name} - ${spot.type} restaurant`}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    quality={75}
                                    unoptimized
                                />
                                <div className="absolute top-4 right-4 px-3 py-1.5 bg-esn-orange text-white text-xs font-oswald font-bold  rounded-full shadow-md">
                                    {spot.discount}
                                </div>
                            </div>
                            <div className="p-5 sm:p-6">
                                <h3 className="text-xl sm:text-2xl font-oswald font-bold text-esn-dark-blue mb-2">
                                    {spot.name}
                                </h3>
                                <p className="text-gray-600 font-lato mb-3 text-sm sm:text-base">
                                    {spot.type}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-esn-orange font-oswald font-bold text-lg">
                                        {spot.price}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {foodSpots.length > 4 && (
                    <div className="flex justify-center mt-12">
                        <Link
                            href="/experiences?category=food"
                            className="touch-target inline-flex items-center gap-2 rounded-full bg-esn-dark-blue px-6 py-3 font-oswald text-sm font-bold tracking-wide text-white transition-colors hover:bg-esn-magenta"
                            aria-label="View full budget eats guide"
                        >
                            View Full Budget Eats Guide
                            <ArrowIcon className="w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
