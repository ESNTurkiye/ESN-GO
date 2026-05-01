import type { BasicFAQ, FAQ } from "./types";

export const FAQ_CONFIG = {
    MOBILE_ACTIVE_HEIGHT: 440,
    MOBILE_INACTIVE_HEIGHT: 84,
    ACTIVE_FLEX: 3.5,
    INACTIVE_FLEX: 1,
    DESKTOP_ANIMATION: {
        type: "spring" as const,
        stiffness: 200,
        damping: 24,
        mass: 1,
    },
    MOBILE_ANIMATION: {
        type: "tween" as const,
        ease: "circOut" as const,
        duration: 0.4,
    },
    COLORS: {
        DARK_BLUE: "#2e3192",
        CYAN: "#00aeef",
        MAGENTA: "#ec008c",
        GREEN: "#7ac143",
    },
};

export const BASIC_FAQ_DATA: BasicFAQ[] = [
    {
        id: 1,
        question: "What is ESN?",
        answer: "ESN (Erasmus Student Network) is the biggest student association in Europe. We support exchange students under the principle of Students Helping Students.",
    },
    {
        id: 2,
        question: "How do I join ESN events?",
        answer: "Follow your local ESN section on social media or check the ESN app. Most events are open to all exchange students — just sign up and show your ESNcard!",
    },
    {
        id: 3,
        question: "What documents do I need?",
        answer: "Typically you need your passport, student visa, acceptance letter, European Health Insurance Card (EHIC) and your Learning Agreement signed by both universities.",
    },
    {
        id: 4,
        question: "How do I get a student discount card?",
        answer: "Get an ESNcard from your local ESN section during Welcome Week. It gives you Ryanair, Flixbus discounts and access to exclusive ESN events across Europe.",
    },
    {
        id: 5,
        question: "Do I need travel insurance?",
        answer: "Yes! EU students can use the EHIC card, but additional private insurance is recommended. Non-EU students should arrange comprehensive health insurance before departure.",
    },
];

export const FAQ_DATA: FAQ[] = [
    {
        id: 1,
        slug: "accommodation",
        q: "Accommodation",
        fullQ: "How do I find accommodation?",
        a: "Check your university's housing office first! Join Facebook groups like 'Erasmus Istanbul' and check Sahibinden.com. Local ESN sections often have verified housing lists.",
        color: FAQ_CONFIG.COLORS.DARK_BLUE,
        img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
        guideSlug: "accommodation",
    },
    {
        id: 2,
        slug: "sim-cards",
        q: "SIM Cards",
        fullQ: "Do I need a Turkish SIM?",
        a: "Yes! Register your phone at the airport or buy a prepaid 'Tourist SIM' from Turkcell or Vodafone. If you stay >120 days, you must register your IMEI to avoid blocking.",
        color: FAQ_CONFIG.COLORS.CYAN,
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        guideSlug: "sim-card",
    },
    {
        id: 3,
        slug: "banking",
        q: "Banking",
        fullQ: "Can I open a bank account?",
        a: "Most banks require a Tax Number (Vergi No) and Residence Permit. Ziraat Bank and İş Bank are student-friendly. Apps like Wise or Revolut work great for transfers too.",
        color: FAQ_CONFIG.COLORS.MAGENTA,
        img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
        guideSlug: "banking",
    },
    {
        id: 4,
        slug: "esncard",
        q: "ESNcard",
        fullQ: "Why do I need an ESNcard?",
        a: "It's your magic pass! You get Ryanair discounts, Flixbus deals and entry to ESN parties. Get it from your local ESN section office during Welcome Week.",
        color: FAQ_CONFIG.COLORS.GREEN,
        img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        guideSlug: "esn-card",
    },
    {
        id: 5,
        slug: "weekend-trips",
        q: "Weekend Trips",
        fullQ: "How can I plan weekend trips on a budget?",
        a: "Travel by overnight bus or student-friendly flights, book early, and use ESNcard partner discounts. Group planning with other Erasmus students usually lowers costs a lot.",
        color: FAQ_CONFIG.COLORS.DARK_BLUE,
        img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
        guideSlug: "weekend",
    },
    {
        id: 6,
        slug: "booking",
        q: "Booking",
        fullQ: "What is the safest way to book tickets and stays?",
        a: "Use trusted platforms, always compare final prices with taxes included, and avoid direct transfers to unknown sellers. Keep confirmations and payment records for every booking.",
        color: FAQ_CONFIG.COLORS.MAGENTA,
        img: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f",
        guideSlug: "booking",
    },
];
