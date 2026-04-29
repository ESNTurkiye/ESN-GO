import type { ExclusiveOffer } from "@/app/_lib/guides/types";

interface ExclusiveOffersProps {
    offers: ExclusiveOffer[];
    color: string;
}

export default function ExclusiveOffers({
    offers,
    color,
}: ExclusiveOffersProps) {
    if (!offers.length) return null;

    return (
        <section className="mt-12 md:mt-16">
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-oswald font-bold text-esn-dark-blue uppercase tracking-wide">
                    Exclusive Offers
                </h2>
            </div>
            <p className="font-lato text-gray-500 text-sm md:text-base mb-8">
                Special deals curated for exchange students in Türkiye
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {offers.map((offer) => (
                    <article
                        key={`${offer.title}-${offer.discount}`}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                        {/* Köşe glow */}
                        <div
                            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
                            style={{ backgroundColor: `${color}20` }}
                        />

                        {/* Discount badge */}
                        <div
                            className="px-4 py-2 text-white text-xs font-oswald font-bold tracking-wider uppercase"
                            style={{
                                background: `linear-gradient(90deg, ${color}ee, ${color}bb)`,
                            }}
                        >
                            {offer.discount}
                        </div>

                        <div className="p-5 md:p-6">
                            <h3 className="font-oswald font-bold text-esn-dark-blue text-lg mb-2">
                                {offer.title}
                            </h3>
                            <p className="font-lato text-gray-500 text-sm leading-relaxed mb-5">
                                {offer.description}
                            </p>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-oswald text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                                style={{ backgroundColor: color }}
                                aria-label={`Claim offer: ${offer.title}`}
                            >
                                Claim Offer
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
