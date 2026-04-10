export default function DestinationsLoading() {
    const placeholders = Array.from({ length: 6 }, (_, index) => index);

    return (
        <section className="pt-32 pb-16 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="h-5 w-40 rounded bg-esn-magenta/20 animate-pulse" />
                <div className="mt-3 h-12 w-80 max-w-full rounded bg-esn-dark-blue/10 animate-pulse" />
                <div className="mt-3 h-5 w-full max-w-2xl rounded bg-esn-dark-blue/10 animate-pulse" />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {placeholders.map((placeholder) => (
                        <div
                            key={placeholder}
                            className="overflow-hidden rounded-2xl border border-esn-dark-blue/10 bg-white"
                        >
                            <div className="h-52 bg-esn-dark-blue/10 animate-pulse" />
                            <div className="p-5">
                                <div className="h-5 w-24 rounded bg-esn-dark-blue/10 animate-pulse" />
                                <div className="mt-3 h-8 w-40 rounded bg-esn-dark-blue/10 animate-pulse" />
                                <div className="mt-3 h-4 w-full rounded bg-esn-dark-blue/10 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
