export interface GuideQuestion {
    question: string;
    answer: string;
}

export interface GuideCategory {
    slug: string;
    title: string;
    subtitle: string;
    color: string;
    image: string;
    questions: GuideQuestion[];
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
    {
        slug: "accommodation",
        title: "Accommodation",
        subtitle: "Everything you need to know about finding a place to stay.",
        color: "#2e3192",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
        questions: [
            {
                question: "Where should I look for housing?",
                answer: "Start with your university's international office. They often have lists of trusted landlords or dormitories. Facebook groups like \"Erasmus [City Name]\" are also very popular, but be wary of scams. Websites like \"Sahibinden\" are widely used for renting a flat in Turkey."
            },
            {
                question: "How do I avoid rental scams?",
                answer: "Never send money before seeing the apartment in person or having a trusted friend check it. Ask for a video call tour if you are not in the country. Verify the landlord's identity and ask for a formal contract."
            },
            {
                question: "What is a deposit and how much is it?",
                answer: "A deposit is a security payment usually equal to one or two months' rent. It should be returned to you when you move out, provided there are no damages to the property. Make sure the deposit terms are clearly stated in your contract."
            },
            {
                question: "Should I live in a dormitory or rent a flat?",
                answer: "Dormitories are cheaper and easier to arrange, but they come with rules and shared spaces. Renting a flat gives you more freedom but can be pricier and requires dealing with landlords. Many Erasmus students prefer shared flats with other international students."
            },
            {
                question: "What should I check before signing a lease?",
                answer: "Check the condition of the apartment (water, heating, electricity), read the full contract carefully, ask about utility costs (they may not be included), and take photos of any existing damage. Make sure the landlord is the actual owner of the property."
            }
        ]
    },
    {
        slug: "sim-cards",
        title: "SIM Cards",
        subtitle: "Stay connected during your exchange.",
        color: "#00aeef",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        questions: [
            {
                question: "Which operator should I choose?",
                answer: "Turkcell, Vodafone, and Turk Telekom are the main operators. Turkcell generally has the best coverage but might be slightly more expensive. Vodafone has good youth packages."
            },
            {
                question: "What happens after 120 days?",
                answer: "If you use a foreign phone with a Turkish SIM card, it will be blocked after 120 days unless you pay a registration fee (which is quite high). For shorter stays, this isn't an issue. For longer stays, consider buying a cheap local phone."
            },
            {
                question: "Can I use my home SIM card?",
                answer: "Yes, with roaming enabled. However, roaming charges can be very expensive depending on your home country's operator. EU students might have better roaming deals, but Turkey is outside the EU roaming zone."
            },
            {
                question: "Where can I buy a SIM card?",
                answer: "You can buy SIM cards at the airport upon arrival, or at any official operator store in the city. Bring your passport — it's required for registration. Avoid buying from unofficial resellers."
            },
            {
                question: "What about eSIM?",
                answer: "Some operators now support eSIM. Check if your phone is eSIM compatible and contact the operator beforehand. Airalo and similar international eSIM providers also work in Turkey for data-only plans."
            }
        ]
    },
    {
        slug: "banking",
        title: "Banking",
        subtitle: "Managing your finances abroad.",
        color: "#ec008c",
        image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
        questions: [
            {
                question: "How do I open a bank account?",
                answer: "You will need a Tax Number which you can get online, your passport, and sometimes proof of address (like a student certificate or dormitory document). Ziraat Bank and İş Bank are popular choices."
            },
            {
                question: "Can I use my home bank card?",
                answer: "Yes, but check your bank's foreign transaction fees. Using a card like Revolut or Wise can save you a lot of money on exchange rates and fees."
            },
            {
                question: "What is a Tax Number and how do I get one?",
                answer: "A Tax Number (Vergi Numarası) is a unique identification number for financial transactions in Turkey. You can apply for one online through the Interactive Tax Office (ivd.gib.gov.tr) or visit a local tax office with your passport."
            },
            {
                question: "Should I carry cash or use cards?",
                answer: "Cards are widely accepted in cities, but it's a good idea to carry some cash, especially in smaller towns, local markets, or for public transport. ATMs are widely available."
            },
            {
                question: "How do I transfer money from abroad?",
                answer: "Services like Wise (formerly TransferWise), Revolut, or Western Union are popular options. Turkish banks also accept SWIFT transfers, but they may charge higher fees. Always compare exchange rates before transferring."
            }
        ]
    },
    {
        slug: "esncard",
        title: "ESNcard",
        subtitle: "Your membership card to the Erasmus generation.",
        color: "#7ac143",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        questions: [
            {
                question: "Where can I get an ESNcard?",
                answer: "You can get it from your local ESN section. Look for their office hours or events during the Welcome Week."
            },
            {
                question: "What discounts do I get?",
                answer: "ESNcard offers discounts on Ryanair flights, Flixbus tickets, local restaurants, gyms, and many partner businesses. Check the ESNcard website or app for the full list of partners in your city."
            },
            {
                question: "How much does it cost?",
                answer: "The ESNcard usually costs around €10 and is valid for the duration of your exchange. It's one of the best investments you'll make during your stay."
            },
            {
                question: "Can I use it in other countries?",
                answer: "Yes! The ESNcard is valid across all ESN sections in Europe. If you travel to another country, you can attend ESN events and enjoy partner discounts there too."
            },
            {
                question: "Do I need it for ESN events?",
                answer: "Most ESN events require an ESNcard for entry or offer a discounted price for card holders. It's your pass to parties, trips, and cultural activities organized by ESN."
            }
        ]
    }
];

export function getGuideBySlug(slug: string): GuideCategory | undefined {
    return GUIDE_CATEGORIES.find((g) => g.slug === slug);
}
