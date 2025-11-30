'use client';

import Marquee from "react-fast-marquee";

export default function StudentTipsSection() {
    const tips = [
        {
            tip: "Get your Istanbulkart on day one! It saves you so much money on transport. You can refill it anywhere.",
            author: "Maria from Spain",
            university: "Boğaziçi Uni",
            color: "#00aeef"
        },
        {
            tip: "If you&apos;re a student, you can get a discount on the public transport. You can get a student card from your university.",
            author: "John from USA",
            university: "Koc University",
            color: "#00aeef"
        },
        {
            tip: "Don&apos;t miss the Sunday brunch at your university cafeteria - it&apos;s usually amazing Turkish breakfast for like 130 TL!",
            author: "Johann from Germany",
            university: "METU Ankara",
            color: "#f47b20"
        },
        {
            tip: "Join the ESN city WhatsApp group immediately. That&apos;s where all the trip announcements and party invites happen!",
            author: "Sophie from France",
            university: "Ege University",
            color: "#ec008c"
        },
        {
            tip: "Turkish people LOVE when you try to speak Turkish. Learn &apos;Merhaba&apos;, &apos;Teşekkür ederim&apos; and &apos;Çay lütfen&apos; - it opens doors!",
            author: "Carlos from Italy",
            university: "Bilkent Uni",
            color: "#7ac143"
        },
        {
            tip: "Always carry cash! Many small restaurants and shops don&apos;t take cards. ATMs are everywhere though.",
            author: "Anna from Poland",
            university: "Sabancı Uni",
            color: "#00aeef"
        },
        {
            tip: "The Eastern Express train is a MUST. Book early because it fills up fast. Worth every TL!",
            author: "Lucas from Brazil",
            university: "ITU Istanbul",
            color: "#7ac143"
        },
        {
            tip: "If you&apos;re a student, you can get a discount on the public transport. You can get a student card from your university.",
            author: "John from USA",
            university: "Koc University",
            color: "#00aeef"
        },
        {
            tip: "If you&apos;re a student, you can get a discount on the public transport. You can get a student card from your university.",
            author: "John from USA",
            university: "Koc University",
            color: "#00aeef"
        },
        {
            tip: "If you&apos;re a student, you can get a discount on the public transport. You can get a student card from your university.",
            author: "John from USA",
            university: "Koc University",
            color: "#00aeef"
        }
    ];

    const halfLength = Math.ceil(tips.length / 2);
    const firstRowTips = tips.slice(0, halfLength);
    const secondRowTips = tips.slice(halfLength);

    const TipCard = ({ item }: { item: typeof tips[0] }) => (
        <article
            className="mx-3 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-[280px] sm:w-[320px] bg-white border border-transparent hover:border-gray-100"
            style={{ backgroundColor: `${item.color}10` }}
        >
            <div className="flex items-start mb-4 h-[72px]">
                <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 mr-3"
                    fill="none"
                    stroke={item.color}
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <p className="text-esn-dark-blue font-lato leading-relaxed text-sm line-clamp-3">
                    {item.tip}
                </p>
            </div>
            
            <div className="flex items-center pt-3 border-t" style={{ borderColor: `${item.color}30` }}>
                <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-oswald font-bold mr-3 shrink-0 text-sm"
                    style={{ backgroundColor: item.color }}
                >
                    {item.author.charAt(0)}
                </div>
                <div className="min-w-0">
                    <p className="font-oswald font-bold text-esn-dark-blue text-sm truncate">{item.author}</p>
                    <p className="text-gray-600 font-lato text-xs truncate">{item.university}</p>
                </div>
            </div>
        </article>
    );

    return (
        <section id="tips" className="py-20 bg-white overflow-hidden">
            <div className="w-full">
                <div className="text-center mb-12 sm:mb-16 px-4">
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-esn-dark-blue mb-4 uppercase">
                        Students Helping Students
                    </h2>
                    <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
                        Real tips from Erasmus students who&apos;ve been there, done that
                    </p>
                </div>

                <div className="space-y-8">
                    <Marquee 
                        gradient={true} 
                        gradientColor="white" 
                        gradientWidth={50}
                        speed={40}
                    >
                        {firstRowTips.map((item, index) => (
                            <TipCard key={`row1-${index}`} item={item} />
                        ))}
                    </Marquee>

                    <Marquee 
                        direction="right"
                        gradient={true} 
                        gradientColor="white" 
                        gradientWidth={50}
                        speed={35}
                    >
                        {secondRowTips.map((item, index) => (
                            <TipCard key={`row2-${index}`} item={item} />
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
}