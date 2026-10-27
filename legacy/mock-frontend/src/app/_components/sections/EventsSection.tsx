import Image from "next/image";
import Link from "next/link";
import { getAllEvents } from "@/app/_lib/events";
import Button from "../ui/Button";

export default async function EventsSection() {
    const events = await getAllEvents();

    return (
        <section id="events" className="section-padding bg-gray-50">
            <div className="max-w-7xl mx-auto container-responsive">
                <div className="mb-12">
                    <h2 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mt-4 mb-4 ">
                        ESN Türkiye Events
                    </h2>
                </div>

                {events.length === 0 ? (
                    <p className="font-lato text-gray-600 text-base">
                        Event listings will appear here when published.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {events.map((event) => (
                            <article
                                key={event.slug}
                                className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-md group"
                                aria-label={`${event.title} event on ${event.dateMonth} ${event.dateDay}`}
                            >
                                <Link
                                    href={`/events/${event.slug}`}
                                    className="absolute inset-0 z-10 rounded-2xl cursor-pointer"
                                    aria-label={`Open ${event.title} event page`}
                                />
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                    {event.cardImage ? (
                                        <div className="relative shrink-0 w-full h-40 sm:w-36 sm:h-28 rounded-xl overflow-hidden bg-gray-100">
                                            <Image
                                                src={event.cardImage}
                                                alt={`${event.title} preview`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 9rem"
                                                unoptimized={event.cardImage.startsWith(
                                                    "http",
                                                )}
                                            />
                                        </div>
                                    ) : null}

                                    <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-esn-magenta flex flex-col items-center justify-center text-white">
                                        <time className="text-2xl sm:text-3xl font-oswald font-bold leading-none">
                                            {event.dateDay}
                                        </time>
                                        <div className="text-xs font-oswald ">
                                            {event.dateMonth}
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-2xl font-oswald font-bold text-esn-dark-blue mb-2 transition-colors group-hover:text-esn-magenta">
                                            {event.title}
                                        </h3>
                                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 sm:gap-4 text-sm sm:text-base text-gray-600 font-lato">
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                </svg>
                                                <span className="truncate">
                                                    {event.location}
                                                </span>
                                            </span>
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                {event.time}
                                            </span>
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                                Deadline:{" "}
                                                {event.registrationDeadline}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-3 mt-1 sm:mt-0">
                                        <div className="text-left sm:text-right">
                                            <div className="text-esn-magenta font-oswald font-bold text-base sm:text-lg">
                                                {event.price}
                                            </div>
                                        </div>
                                        <div className="relative z-20 flex flex-col items-stretch sm:items-end gap-2 w-full sm:w-auto">
                                            <Button
                                                variant="magenta"
                                                size="sm"
                                                className="touch-target"
                                                href={`/events/${event.slug}`}
                                                aria-label={`View details for ${event.title}`}
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {events.length > 0 ? (
                    <div className="text-center mt-12">
                        <Button
                            variant="magenta"
                            size="lg"
                            className="touch-target flex items-center"
                            href={`/events/${events[0].slug}`}
                            aria-label="View featured ESN event details"
                        >
                            Featured Event
                            <svg
                                className="w-5 h-5 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Button>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
