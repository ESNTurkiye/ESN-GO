import type { ExclusiveOffer } from "@/app/_lib/guide-data";
import Button from "@/components/ui/Button";

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
                <span className="text-xs font-oswald text-gray-400 tracking-wider uppercase mt-1">
                    — for ESN students
                </span>
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
                        {/* Discount badge */}
                        <div
                            className="px-4 py-2 text-white text-xs font-oswald font-bold tracking-wider uppercase"
                            style={{ backgroundColor: color }}
                        >
                            {offer.discount}
                        </div>

                        <div className="p-5 md:p-6">
                            <h3 className="font-oswald font-bold text-esn-dark-blue text-lg mb-2">
                                {offer.title}
                            </h3>
                            <p className="font-lato text-gray-500 text-sm leading-relaxed mb-4">
                                {offer.description}
                            </p>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="px-0! text-sm! group-hover:text-esn-cyan! transition-colors"
                                aria-label={`Claim offer: ${offer.title}`}
                            >
                                Claim Offer →
                            </Button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
