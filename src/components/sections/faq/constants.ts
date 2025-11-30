import { FAQ } from './types';

export const FAQ_CONFIG = {
    MOBILE_ACTIVE_HEIGHT: 440,
    MOBILE_INACTIVE_HEIGHT: 84,
    ACTIVE_FLEX: 3.5,
    INACTIVE_FLEX: 1,
    DESKTOP_ANIMATION: {
        type: "spring" as const,
        stiffness: 200,
        damping: 24,
        mass: 1
    },
    MOBILE_ANIMATION: {
        type: "tween" as const,
        ease: "circOut" as const,
        duration: 0.4
    },
    COLORS: {
        DARK_BLUE: '#2e3192',
        CYAN: '#00aeef',
        MAGENTA: '#ec008c',
        GREEN: '#7ac143',
    }
};

export const FAQ_DATA: FAQ[] = [
    {
        id: 1,
        q: "Accommodation",
        fullQ: "How do I find accommodation?",
        a: "Check your university's housing office first! Join Facebook groups like 'Erasmus Istanbul' and check Sahibinden.com. Local ESN sections often have verified housing lists.",
        color: FAQ_CONFIG.COLORS.DARK_BLUE,
        img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop"
    },
    {
        id: 2,
        q: "SIM Cards",
        fullQ: "Do I need a Turkish SIM?",
        a: "Yes! Register your phone at the airport or buy a prepaid 'Tourist SIM' from Turkcell or Vodafone. If you stay >120 days, you must register your IMEI to avoid blocking.",
        color: FAQ_CONFIG.COLORS.CYAN,
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        q: "Banking",
        fullQ: "Can I open a bank account?",
        a: "Most banks require a Tax Number (Vergi No) and Residence Permit. Ziraat Bank and İş Bank are student-friendly. Apps like Wise or Revolut work great for transfers too.",
        color: FAQ_CONFIG.COLORS.MAGENTA,
        img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        q: "ESNcard",
        fullQ: "Why do I need an ESNcard?",
        a: "It's your magic pass! You get Ryanair discounts, Flixbus deals, and entry to ESN parties. Get it from your local ESN section office during Welcome Week.",
        color: FAQ_CONFIG.COLORS.GREEN,
        img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    }
];