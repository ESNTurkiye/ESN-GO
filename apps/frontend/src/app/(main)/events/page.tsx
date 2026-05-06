import type { Metadata } from "next";
import EventsPageCatalog from "@/components/events/EventsPageCatalog";
import { getAllEvents } from "@/app/_lib/events";

export const metadata: Metadata = {
    title: "Events | ESN GO",
    description:
        "Dance, explore, connect — discover ESN Türkiye events across the country. Browse upcoming trips, parties, festivals, and student experiences.",
};

export default async function EventsPage() {
    const events = await getAllEvents();

    return (
        <>
            <section
                className="relative overflow-hidden bg-linear-to-br from-esn-dark-blue via-[#363b9e] to-esn-magenta pb-16 pt-12 md:pb-20 md:pt-16"
                aria-labelledby="events-hero-heading"
            >
                <div
                    className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-esn-cyan/25 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-esn-magenta/30 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative z-10 mx-auto max-w-7xl container-responsive text-center">
                    <h1
                        id="events-hero-heading"
                        className="font-oswald font-bold tracking-tight text-white fluid-heading-lg mx-auto max-w-4xl"
                    >
                        ESN Türkiye Events
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl font-lato text-base leading-relaxed text-white/90 sm:text-lg">
                        Dance, explore, connect unforgettable moments across Turkey.
                        Experience life with fellow international students at the crossroads of Europe and Asia.
                   
                    </p>
                </div>
            </section>

            <EventsPageCatalog events={events} />
        </>
    );
}
