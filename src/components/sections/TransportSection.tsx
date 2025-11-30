import { BusIcon, MetroIcon, BikeIcon, TaxiIcon, TicketIcon } from '../ui/TransportIcons';
import Button from '../ui/Button';

export default function TransportSection() {
    const transportOptions = [
        { icon: BusIcon, name: "City Bus", desc: "Most affordable option" },
        { icon: MetroIcon, name: "Metro", desc: "Fast & frequent" },
        { icon: BikeIcon, name: "Bike Share", desc: "Eco-friendly" },
        { icon: TaxiIcon, name: "Taxi/BiTaksi", desc: "Door to door" }
    ];

    return (
        <section id="transport" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto container-responsive">
                <div className="mb-12">
                    <span className="inline-block w-3 h-3 rounded-full bg-esn-green mr-3"></span>
                    <span className="text-sm font-oswald font-bold text-esn-green  tracking-wider">Getting Around</span>
                    <h2 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mt-4 mb-4 ">
                        Transport Guide
                    </h2>
                    <p className="fluid-body-md text-gray-600 font-lato">
                        Everything you need to know about moving around Turkish cities
                    </p>
                </div>

                {/* Transport Icons - 2x2 Grid on mobile, 4 columns on desktop */}
                <div className="mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {transportOptions.map((transport, index) => {
                            const IconComponent = transport.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-esn-green/10 rounded-2xl p-5 sm:p-8 text-center hover:bg-esn-green/20 transition-all cursor-pointer group"
                                    role="article"
                                    aria-label={`${transport.name} transport option`}
                                >
                                    <div className="flex justify-center mb-3 sm:mb-4 text-esn-dark-blue group-hover:scale-110 transition-transform">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                                            <IconComponent />
                                        </div>
                                    </div>
                                    <h3 className="text-base sm:text-xl font-oswald font-bold text-esn-dark-blue mb-1 sm:mb-2 ">{transport.name}</h3>
                                    <p className="text-gray-600 font-lato text-xs sm:text-sm">{transport.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-esn-green/10 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="shrink-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-esn-green flex items-center justify-center text-white mx-auto md:mx-0">
                                <TicketIcon />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-oswald font-bold text-esn-dark-blue mb-2 ">Get Your Transport Card</h3>
                            <p className="text-gray-600 font-lato text-sm sm:text-base">
                                Istanbulkart, Ankarakart, or İzmirim Kart - essential for all students.
                                Available at metro stations, kiosks, and some markets.
                            </p>
                        </div>
                        <Button variant="green" size="md" className="w-full md:w-auto">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}