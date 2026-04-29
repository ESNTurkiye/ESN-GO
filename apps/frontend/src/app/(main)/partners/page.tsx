import Link from "next/link";
import { getAllOffers } from "@/app/_lib/guides";

export const metadata = {
    title: "Partners — ESN GO",
    description:
        "Mock partners page for ESN GO offers and partner collaborations.",
};

export default async function PartnersPage() {
    const offers = await getAllOffers();

    return (
        <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
                    <h1 className="mt-2 font-oswald text-3xl font-bold text-esn-dark-blue md:text-5xl">
                        Partners (Mock)
                    </h1>
                    <p className="mt-4 max-w-2xl font-lato text-base text-gray-600 md:text-lg">
                        This page stays as an in-project partner showcase. For
                        detailed partner information and official offers, users
                        are redirected to ESN Türkiye pages.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {offers.map((offer) => (
                            <article
                                key={`${offer.guideSlug}-${offer.title}`}
                                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                            >
                                <p className="font-oswald text-xs uppercase tracking-wide text-esn-dark-blue">
                                    {offer.discount}
                                </p>
                                <h2 className="mt-1 font-oswald text-xl font-bold text-esn-dark-blue">
                                    {offer.title}
                                </h2>
                                <p className="mt-2 font-lato text-sm text-gray-600">
                                    {offer.description}
                                </p>
                                <Link
                                    href={offer.link ?? "/partners"}
                                    className="mt-4 inline-flex items-center gap-2 font-oswald text-xs font-bold uppercase tracking-wide text-esn-dark-blue hover:text-esn-magenta"
                                    target={
                                        offer.link?.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        offer.link?.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                >
                                    View Details on ESN Türkiye{" "}
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/guide/accommodation"
                            className="inline-flex items-center rounded-full bg-esn-dark-blue px-5 py-2.5 font-oswald text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-esn-magenta"
                        >
                            Back to Guide
                        </Link>
                        <Link
                            href="https://esnturkey.org/partners"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-5 py-2.5 font-oswald text-xs font-bold uppercase tracking-wide text-esn-dark-blue transition-colors hover:border-esn-dark-blue hover:bg-gray-50"
                        >
                            Visit ESN Türkiye Partners
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
