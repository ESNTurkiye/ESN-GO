"use client";

interface DestinationsErrorProps {
    error: Error;
    reset: () => void;
}

export default function DestinationsError({ reset }: DestinationsErrorProps) {
    return (
        <section className="pt-32 pb-16 min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h2 className="text-2xl font-oswald text-red-700">
                        Could not load destinations
                    </h2>
                    <p className="mt-2 text-sm text-red-700/90">
                        Something went wrong while loading the catalog. Please try
                        again.
                    </p>
                    <button
                        type="button"
                        onClick={reset}
                        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        </section>
    );
}
