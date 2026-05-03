import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllEventSlugs, getEventBySlug } from "@/app/_lib/events";
import EventContentRenderer from "@/components/events/EventContentRenderer";
import Button from "@/components/ui/Button";
import ExternalLinkIcon from "@/components/ui/ExternalLinkIcon";

type EventDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = await getAllEventSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: EventDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const doc = await getEventBySlug(slug);

    if (!doc) {
        return {
            title: "Event Not Found | ESN GO",
        };
    }

    return {
        title: `${doc.frontmatter.title} | ESN GO`,
        description: doc.frontmatter.summary,
    };
}

export default async function EventDetailPage({
    params,
}: EventDetailPageProps) {
    const { slug } = await params;
    const doc = await getEventBySlug(slug);

    if (!doc) {
        notFound();
    }

    const { frontmatter: fm, content } = doc;

    return (
        <main className="min-h-screen bg-gray-50 pt-4 md:pt-6 pb-12 md:pb-16">
            <section className="max-w-5xl mx-auto container-responsive">
                <div className="mb-8">
                    <h1 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mb-4">
                        {fm.title}
                    </h1>
                    <p className="font-lato text-gray-700 text-base sm:text-lg">
                        {fm.summary}
                    </p>
                </div>

                {fm.heroImage ? (
                    <div className="relative mb-8 h-[min(420px,50vh)] w-full rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-100">
                        <Image
                            src={fm.heroImage}
                            alt={`${fm.title} hero`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            unoptimized={fm.heroImage.startsWith("http")}
                            priority
                        />
                    </div>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-3 sm:p-4">
                        <p className="font-lato text-sm text-gray-500 mb-1">
                            Date
                        </p>
                        <p className="font-oswald text-xl text-esn-dark-blue">
                            {fm.time}
                        </p>
                    </div>
                    <div className="bg-white p-3 sm:p-4">
                        <p className="font-lato text-sm text-gray-500 mb-1">
                            Location
                        </p>
                        <p className="font-oswald text-xl text-esn-dark-blue">
                            {fm.location}
                        </p>
                    </div>
                    <div className="bg-white p-3 sm:p-4">
                        <p className="font-lato text-sm text-gray-500 mb-1">
                            Registration Deadline
                        </p>
                        <p className="font-oswald text-xl text-esn-magenta">
                            {fm.registrationDeadline}
                        </p>
                    </div>
                </div>

                {fm.officialSiteUrl ? (
                    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-100">
                        <p className="font-lato text-gray-700 text-base">
                            Full program details, contact options, and the
                            latest news are published on the official event
                            website.
                        </p>
                        <Button
                            href={fm.officialSiteUrl}
                            target="_blank"
                            variant="cyan"
                            size="lg"
                            className="touch-target shrink-0 inline-flex items-center justify-center gap-2"
                            aria-label={`Open official event website in a new tab (${fm.officialSiteLabel ?? fm.officialSiteUrl})`}
                        >
                            <span>
                                {fm.officialSiteLabel ?? "Official event site"}
                            </span>
                            <ExternalLinkIcon className="h-4 w-4 shrink-0" />
                        </Button>
                    </div>
                ) : null}

                <div className="bg-white p-6 sm:p-8 shadow-sm">
                    <EventContentRenderer content={content} />
                </div>
            </section>
        </main>
    );
}
