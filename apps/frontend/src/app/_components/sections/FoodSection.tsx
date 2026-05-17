"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "../ui/ArrowIcon";

export default function FoodSection() {
    // 1. Durum (State) Yönetimleri
    const [isLocationLoaded, setIsLocationLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    // Yeni State: Toast (Hata) mesajını yönetmek için
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Toast mesajını 4 saniye sonra otomatik kapatan efekt
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage(null);
            }, 4000);
            return () => clearTimeout(timer); // Bileşen kapanırsa temizle
        }
    }, [toastMessage]);

    // Varsayılan (Fallback) Restoran Listemiz
    const [foodSpots, setFoodSpots] = useState([
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
    ]);

    // 2. Kullanıcı Butona Bastığında Konum İsteyen Fonksiyon
    const handleGetLocation = () => {
        setLoading(true);
        setToastMessage(null); // Varsa eski hata mesajını temizle

        if (!navigator.geolocation) {
            setToastMessage("Your browser does not support geolocation.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                // KULLANICI İZİN VERDİĞİNDE:
                console.log("Konum başarıyla alındı.");

                // Butonu hemen eski haline çeviriyoruz
                setLoading(false);
                setIsLocationLoaded(true);

                // Örnek simülasyon: Listeyi ters çevir
                setFoodSpots((prev) => [...prev].reverse());
            },
            (error) => {
                // KULLANICI REDDETTİĞİNDE:
                console.log("Location permission denied, fallback content is being displayed.", error);

                setLoading(false);

                setToastMessage("Location permission denied. Showing the default list.");
            }
        );
    };

    const visibleSpots = foodSpots.slice(0, 4);

    return (
        <section className="section-padding bg-[#FFF8F0] relative">

            {/* BİLGİLENDİRME MESAJI */}
            {toastMessage && (
                <div className="absolute top-4 right-4 z-50 bg-esn-orange text-white px-5 py-3 rounded-xl shadow-lg font-lato text-sm animate-pulse">
                    {toastMessage}
                </div>
            )}

            <div className="max-w-7xl mx-auto container-responsive">

                {/* Başlık Bölümü ve Konum Butonu */}
                <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mt-4 mb-2">
                            Budget-Friendly Eats
                        </h2>
                        <p className="text-gray-600 text-sm font-lato">
                            {isLocationLoaded
                                ? "Listing restaurants near you"
                                : "Discover the budget-friendly spots closest to you."}
                        </p>
                    </div>

                    {/* Konum Butonu */}
                    {!isLocationLoaded && (
                        <button
                            onClick={handleGetLocation}
                            disabled={loading}
                            className="self-start px-4 py-2 bg-esn-orange text-white text-sm font-oswald font-bold rounded-xl shadow hover:bg-esn-orange transition-colors disabled:opacity-50"
                        >
                            {loading ? "Obtaining Location..." : "Find Places Near Me"}
                        </button>
                    )}
                </div>

                {/* Restoran Kartları */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {visibleSpots.map((spot) => (
                        <article
                            key={spot.name}
                            className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer group"
                            aria-label={`${spot.name} restaurant`}
                        >
                            <div className="relative h-48 sm:h-52 overflow-hidden">
                                <Image
                                    src={spot.image}
                                    alt={`${spot.name} - ${spot.type} restaurant`}
                                    fill
                                    className="object-cover origin-center transform-gpu transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    quality={75}
                                    unoptimized
                                />
                                <div className="absolute top-4 right-4 px-3 py-1.5 bg-esn-orange text-white text-xs font-oswald font-bold rounded-full shadow-md">
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