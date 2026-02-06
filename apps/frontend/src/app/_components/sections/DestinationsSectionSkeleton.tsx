export default function DestinationsSectionSkeleton() {
    return (
        <section id="destinations" className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* baslik ve aciklama alani */}
                <div className="mb-12 flex justify-between items-end">
                    <div className="max-w-2xl">
                        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-4" /> {/* Top Destinations Başlığı */}
                        <div className="h-5 w-80 bg-gray-100 rounded-md animate-pulse" /> {/* Alt açıklama */}
                    </div>
                    {/* Carousel navigasyon */}
                    <div className="hidden md:flex gap-2">
                        <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
                        <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* kartlar alani */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="relative h-[450px] w-full bg-gray-200 rounded-[2rem] animate-pulse overflow-hidden"
                        >
                            {/* kartin altindaki metin placeholderlar */}
                            <div className="absolute bottom-8 left-8 right-8 space-y-3">
                                <div className="h-8 w-32 bg-gray-300/50 rounded-md animate-pulse" /> {/* Şehir İsmi */}
                                <div className="h-4 w-full bg-gray-300/30 rounded-md animate-pulse" /> {/* Kısa açıklama */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicator */}
                <div className="mt-10 flex justify-center gap-2">
                    <div className="h-2 w-8 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-2 w-2 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-2 w-2 bg-gray-100 rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}