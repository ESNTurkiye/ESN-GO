import Link from "next/link";
import type { ExclusiveOffer } from "@/app/_lib/guides/types";
import ExternalLinkIcon from "@/components/ui/ExternalLinkIcon";

interface ExclusiveOffersProps {
    offers: ExclusiveOffer[];
    color: string;
}

const OFFER_PARTNER_SLUGS: Array<{ match: RegExp; slug: string }> = [
    { match: /balya/i, slug: "balya" },
    { match: /drops|esncard app/i, slug: "drops" },
    { match: /emsa/i, slug: "emsa-turkey" },
    { match: /gig/i, slug: "gig-sigorta" },
    { match: /hostelsclub/i, slug: "hostelsclub" },
    { match: /innvitee/i, slug: "innvitee-youth" },
    {
        match: /link by superpedestrian|superpedestrian/i,
        slug: "link-superpedestrian",
    },
    { match: /\bqs\b/i, slug: "qs" },
    {
        match: /sıfırdan globale|sifirdan globale/i,
        slug: "s%C4%B1f%C4%B1rdan-globale",
    },
    { match: /sondance/i, slug: "sondance-academy" },
    { match: /temsa/i, slug: "temsa" },
    { match: /tiktak/i, slug: "tiktak" },
    { match: /travelinsightpedia/i, slug: "travelinsightpedia" },
    { match: /turkish national agency/i, slug: "turkish-national-agency" },
    {
        match: /türkiye psikoloji|tpöçg|tpocg/i,
        slug: "t%C3%BCrkiye-psikoloji-%C3%B6%C4%9Frencileri-%C3%A7al%C4%B1%C5%9Fma-grubu-tp%C3%B6%C3%A7g",
    },
    { match: /yinkader/i, slug: "yinkader" },
    { match: /yönderle|yonderle/i, slug: "y%C3%B6nderle" },
];

const getPartnerDetailsUrl = (offer: ExclusiveOffer) => {
    const matchedPartner = OFFER_PARTNER_SLUGS.find((partner) =>
        partner.match.test(offer.title),
    );

    if (matchedPartner) {
        return `https://esnturkey.org/partners/${matchedPartner.slug}`;
    }

    if (offer.link?.includes("esnturkey.org/partners/")) {
        return offer.link;
    }

    return "https://esnturkey.org/partners";
};

export default function ExclusiveOffers({
    offers,
    color,
}: ExclusiveOffersProps) {
    if (!offers.length) return null;

    return (
        <section className="mt-12 md:mt-16">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl md:text-3xl font-oswald font-bold text-esn-dark-blue uppercase tracking-wide">
                    Exclusive Offers
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {offers.map((offer) => {
                    const href = getPartnerDetailsUrl(offer);
                    const isExternal = true;

                    return (
                        <article
                            key={`${offer.title}-${offer.discount}`}
                            className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                        >
                            {/* Köşe glow */}
                            <div
                                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
                                style={{ backgroundColor: `${color}20` }}
                            />

                            {/* Discount badge */}
                            <div
                                className="px-4 py-2 text-white/95 text-[11px] font-oswald font-bold tracking-[0.14em] uppercase"
                                style={{
                                    background: `linear-gradient(90deg, ${color}f0, ${color}c5)`,
                                }}
                            >
                                {offer.discount}
                            </div>

                            {/* Offer details */}
                            <div className="flex flex-1 flex-col p-5 md:p-6">
                                <h3 className="font-oswald font-bold text-gray-900 text-lg mb-2">
                                    {offer.title}
                                </h3>
                                <p className="font-lato text-gray-600 text-sm leading-relaxed mb-5">
                                    {offer.description}
                                </p>
                                <Link
                                    href={href}
                                    className="mt-auto inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-oswald text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                                    style={{ backgroundColor: color }}
                                    aria-label={`Claim offer: ${offer.title}`}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={
                                        isExternal
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                >
                                    Offer Details
                                    {isExternal ? (
                                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                                    ) : (
                                        <svg
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M7 5l6 5-6 5" />
                                        </svg>
                                    )}
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
            <div className="mt-8 flex justify-center">
                <Link
                    href="/partners"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 font-oswald text-xs font-bold uppercase tracking-wide text-esn-dark-blue transition-colors hover:border-esn-dark-blue hover:bg-gray-50"
                >
                    See All Partners
                    <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M7 5l6 5-6 5" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
