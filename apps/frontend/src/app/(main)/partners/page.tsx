import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Partners — ESN GO",
    description:
        "ESN Türkiye partner logos and quick access to official partner details.",
};

type Partner = {
    name: string;
    slug: string;
    logo: string;
};

const partnerCategories: Array<{ title: string; items: Partner[] }> = [
    {
        title: "Mobility & Travel",
        items: [
            { name: "TEMSA", slug: "temsa", logo: "/partners/temsa.png" },
            { name: "TikTak", slug: "tiktak", logo: "/partners/tiktak.png" },
            {
                name: "LINK by Superpedestrian",
                slug: "link-superpedestrian",
                logo: "/partners/link-superpedestrian.png",
            },
            {
                name: "Travelinsightpedia",
                slug: "travelinsightpedia",
                logo: "/partners/travelinsightpedia.png",
            },
        ],
    },
    {
        title: "Accommodation & Student Life",
        items: [
            {
                name: "HostelsClub",
                slug: "hostelsclub",
                logo: "/partners/hostelsclub.png",
            },
            {
                name: "Innvitee Youth",
                slug: "innvitee-youth",
                logo: "/partners/innvitee-youth.jpg",
            },
            { name: "Drops", slug: "drops", logo: "/partners/drops.png" },
            {
                name: "SonDance Academy",
                slug: "sondance-academy",
                logo: "/partners/sondance-academy.png",
            },
        ],
    },
    {
        title: "Education, Career & Community",
        items: [
            { name: "QS", slug: "qs", logo: "/partners/qs.jpg" },
            {
                name: "EMSA Turkey",
                slug: "emsa-turkey",
                logo: "/partners/emsa-turkey.png",
            },
            {
                name: "Sıfırdan Globale",
                slug: "s%C4%B1f%C4%B1rdan-globale",
                logo: "/partners/sifirdan-globale.png",
            },
            {
                name: "Yönderle",
                slug: "y%C3%B6nderle",
                logo: "/partners/yonderle.png",
            },
            {
                name: "Yinkader",
                slug: "yinkader",
                logo: "/partners/yinkader.png",
            },
            {
                name: "Türkiye Psikoloji Öğrencileri Çalışma Grubu (TPÖÇG)",
                slug: "t%C3%BCrkiye-psikoloji-%C3%B6%C4%9Frencileri-%C3%A7al%C4%B1%C5%9Fma-grubu-tp%C3%B6%C3%A7g",
                logo: "/partners/tpocg.png",
            },
            { name: "Balya", slug: "balya", logo: "/partners/balya.png" },
        ],
    },
    {
        title: "Institutions & Insurance",
        items: [
            {
                name: "GIG Sigorta",
                slug: "gig-sigorta",
                logo: "/partners/gig-sigorta.png",
            },
            {
                name: "Turkish National Agency",
                slug: "turkish-national-agency",
                logo: "/partners/turkish-national-agency.jpg",
            },
        ],
    },
];

export default function PartnersPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
                    <h1 className="mt-2 font-oswald text-3xl font-bold text-esn-dark-blue md:text-5xl">
                        Partners
                    </h1>
                    <p className="mt-4 max-w-2xl font-lato text-base text-gray-600 md:text-lg">
                        ESN Türkiye partner logos are listed here for quick
                        browsing. For full details, offers and latest updates,
                        visit each partner&apos;s official detail page on ESN
                        Türkiye.
                    </p>

                    <div className="mt-8 space-y-8">
                        {partnerCategories.map((category) => (
                            <div key={category.title}>
                                <h2 className="mb-3 font-oswald text-xl font-bold text-esn-dark-blue">
                                    {category.title}
                                </h2>
                                <ul className="space-y-2">
                                    {category.items.map((partner) => (
                                        <li key={partner.slug}>
                                            <Link
                                                href={`https://esnturkey.org/partners/${partner.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-blue-50"
                                            >
                                                <Image
                                                    src={partner.logo}
                                                    alt={`${partner.name} logo`}
                                                    width={52}
                                                    height={36}
                                                    className="h-9 w-14 object-contain"
                                                />
                                                <span className="font-lato text-base text-blue-600 underline underline-offset-2 decoration-blue-400 group-hover:text-blue-800 group-hover:decoration-blue-700">
                                                    {partner.name}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
