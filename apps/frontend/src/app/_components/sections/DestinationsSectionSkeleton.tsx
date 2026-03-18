export default function DestinationsSectionSkeleton() {
    const placeholderCards = [
        "placeholder-1",
        "placeholder-2",
        "placeholder-3",
        "placeholder-4",
    ];

    return (
        <section id="destinations" className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-12 flex justify-between items-end">
                    <div className="max-w-2xl">
                        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-4" />
                        <div className="h-5 w-80 bg-gray-100 rounded-md animate-pulse" />
                    </div>
                    {/* Carousel navigasyon */}
                    <div className="hidden md:flex gap-2">
                        <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
                        <div className="h-10 w-10 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                </div>

                <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {placeholderCards.map((placeholderCardId) => (
                        <div
                            key={placeholderCardId}
                            className="relative h-[420px] w-full bg-gray-200 rounded-4xl animate-pulse overflow-hidden"
                        >
                            <div className="absolute bottom-8 left-8 right-8 space-y-3">
                                <div className="h-8 w-32 bg-gray-300/50 rounded-md animate-pulse" />
                                <div className="h-4 w-full bg-gray-300/30 rounded-md animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="md:hidden">
                    <div className="relative w-full flex justify-center">
                        <div className="relative h-[420px] w-[85vw] bg-gray-200 rounded-4xl animate-pulse overflow-hidden">
                            <div className="absolute bottom-8 left-6 right-6 space-y-3">
                                <div className="h-7 w-40 bg-gray-300/50 rounded-md animate-pulse" />
                                <div className="h-4 w-full bg-gray-300/30 rounded-md animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
                    </div>

                    <div className="mt-6 flex justify-center gap-2">
                        <div className="h-2 w-6 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-2 w-2 bg-gray-100 rounded-full animate-pulse" />
                        <div className="h-2 w-2 bg-gray-100 rounded-full animate-pulse" />
                        <div className="h-2 w-2 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
