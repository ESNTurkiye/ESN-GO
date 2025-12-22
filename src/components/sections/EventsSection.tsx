import Button from '../ui/Button';

export default function EventsSection() {
  const events = [
    {
      date: { day: "28", month: "Nov" },
      title: "Welcome Week Party",
      location: "Istanbul - Babylon Club",
      time: "22:00",
      price: "Free with ESNcard",
      attending: 156
    },
    {
      date: { day: "05", month: "Dec" },
      title: "Cappadocia Weekend Trip",
      location: "Göreme, Cappadocia",
      time: "Friday-Sunday",
      price: "€120 (all inclusive)",
      attending: 43
    },
    {
      date: { day: "12", month: "Dec" },
      title: "International Dinner",
      location: "Ankara ESN Office",
      time: "19:00",
      price: "Bring a dish from your country",
      attending: 89
    }
  ];

  return (
    <section id="events" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto container-responsive">
        <div className="mb-12">
          <span className="inline-block w-3 h-3 rounded-full bg-esn-magenta mr-3"></span>
          <span className="text-sm font-oswald font-bold text-esn-magenta  tracking-wider">Social & Party</span>
          <h2 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mt-4 mb-4 ">
            Upcoming ESN Events
          </h2>
          <p className="fluid-body-md text-gray-600 font-lato">
            Make friends and create memories with the Erasmus community
          </p>
        </div>

        <div className="space-y-4">
          {events.map((event, index) => (
            <article 
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              aria-label={`${event.title} event on ${event.date.month} ${event.date.day}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Date Badge */}
                <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-esn-magenta flex flex-col items-center justify-center text-white">
                  <time className="text-2xl sm:text-3xl font-oswald font-bold leading-none">{event.date.day}</time>
                  <div className="text-xs font-oswald ">{event.date.month}</div>
                </div>

                {/* Event Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-oswald font-bold text-esn-dark-blue mb-2 group-hover:text-esn-magenta transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 font-lato">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {event.attending} attending
                    </span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 mt-2 sm:mt-0">
                  <div className="text-left sm:text-right">
                    <div className="text-esn-magenta font-oswald font-bold text-base sm:text-lg">{event.price}</div>
                  </div>
                  <Button 
                    variant="magenta" 
                    size="sm"
                    className="touch-target"
                    aria-label={`Join ${event.title} event`}
                  >
                    Join Event
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="magenta"
            size="lg" 
            className="touch-target flex items-center"
            aria-label="View all upcoming ESN events"
          >
            View All Events
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}

