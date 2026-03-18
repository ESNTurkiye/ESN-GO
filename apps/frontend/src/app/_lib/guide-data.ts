// Guide data types and content for Survival Guide pages

export interface GuideContent {
    type: "heading" | "paragraph" | "list" | "tip" | "image";
    content: string | string[];
}

export interface ExclusiveOffer {
    title: string;
    description: string;
    discount: string;
    link?: string;
}

export interface GuideCategory {
    id: string;
    slug: string;
    title: string;
    iconKey: GuideIconKey;
    color: string;
    heroImage: string;
    lastUpdated: string;
    offers: ExclusiveOffer[];
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
    {
        id: "accommodation",
        slug: "accommodation",
        title: "Accommodation Guide",
        icon: "🏠",
        color: "#2e3192",
        heroImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
        readTime: 8,
        content: [
            {
                type: "heading",
                content: "Finding Your Home in Türkiye",
            },
            {
                type: "paragraph",
                content:
                    "Finding the right accommodation is one of the most important steps of your Erasmus journey. Whether you prefer a university dormitory, a shared apartment, or a private studio, Türkiye offers plenty of options for international students at various price ranges.",
            },
            {
                type: "tip",
                content:
                    "Start your housing search at least 2 months before your arrival. The best options go fast, especially in popular cities like Istanbul and Ankara!",
            },
            {
                type: "heading",
                content: "University Dormitories (KYK & Private)",
            },
            {
                type: "paragraph",
                content:
                    "KYK (Kredi ve Yurtlar Kurumu) is the government-run student dormitory system. It's the most affordable option, typically costing between ₺500–₺1,500 per month, including meals. However, availability for exchange students can be limited, so apply through your university's international office as early as possible.",
            },
            {
                type: "list",
                content: [
                    "Apply through your university's International Relations Office",
                    "KYK dorms include meal plans (breakfast & dinner)",
                    "Private dorms (özel yurt) cost ₺2,000–₺5,000/month but offer more comfort",
                    "Most dorms have Wi-Fi, laundry, and study rooms",
                    "Gender-separated floors are standard in Turkish dorms",
                ],
            },
            {
                type: "heading",
                content: "Renting a Shared Apartment",
            },
            {
                type: "paragraph",
                content:
                    "Sharing an apartment with other students is the most popular option among Erasmus students. You'll get more independence and a chance to experience local life. Monthly rent for a shared room ranges from ₺3,000–₺8,000 depending on the city and neighborhood.",
            },
            {
                type: "tip",
                content:
                    "Never send money before visiting the apartment in person! Scams targeting international students are common. Always verify the landlord and the property.",
            },
            {
                type: "list",
                content: [
                    "Sahibinden.com — Türkiye's largest property listing platform",
                    "Hepsiemlak.com — another popular real estate portal",
                    'Facebook groups: search "Erasmus [City] Housing"',
                    "Your ESN section's housing assistance program",
                    "Ask your university buddy for help with apartment visits",
                ],
            },
            {
                type: "heading",
                content: "Rental Contract Essentials",
            },
            {
                type: "paragraph",
                content:
                    "When you find a place, always sign a proper rental contract (kira sözleşmesi). This protects both you and the landlord. Make sure the contract is in both Turkish and English if possible.",
            },
            {
                type: "list",
                content: [
                    "Deposit is typically 1–2 months' rent (depozito)",
                    "Utilities (elektrik, su, doğalgaz) are usually separate from rent",
                    "Internet setup takes 1–3 days — ask your landlord for help",
                    "Register your address at the local Population Directorate (Nüfus Müdürlüğü)",
                    "Keep copies of all documents and payment receipts",
                ],
            },
        ],
        offers: [
            {
                title: "Student Housing Platform",
                description:
                    "Get 15% off your first month on verified student apartments",
                discount: "15% OFF",
            },
            {
                title: "Moving Supplies",
                description:
                    "Affordable bedding and essentials package for new arrivals",
                discount: "ESNcard Deal",
            },
            {
                title: "Home Insurance",
                description: "Special renter's insurance for exchange students",
                discount: "20% OFF",
            },
        ],
    },
    {
        id: "sim-card",
        slug: "sim-card",
        title: "SIM Card & Connectivity",
        icon: "📱",
        color: "#00aeef",
        heroImage:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        readTime: 5,
        content: [
            {
                type: "heading",
                content: "Staying Connected in Türkiye",
            },
            {
                type: "paragraph",
                content:
                    "Getting a Turkish SIM card is essential for staying connected during your exchange. You'll need it for mobile internet, making local calls, and registering for many Turkish services that require a Turkish phone number.",
            },
            {
                type: "tip",
                content:
                    "Buy your first SIM card at the airport — there are Turkcell and Vodafone counters at arrivals. Tourist SIM packages are the easiest way to get started!",
            },
            {
                type: "heading",
                content: "Mobile Operators",
            },
            {
                type: "paragraph",
                content:
                    "Türkiye has three major mobile operators. Each offers special tourist and student packages:",
            },
            {
                type: "list",
                content: [
                    "Turkcell — largest network, best coverage nationwide",
                    "Vodafone — competitive pricing, good urban coverage",
                    "Türk Telekom — affordable data packages, solid 4G network",
                ],
            },
            {
                type: "heading",
                content: "IMEI Registration (Important!)",
            },
            {
                type: "paragraph",
                content:
                    "If you plan to stay in Türkiye for more than 120 days, you MUST register your phone's IMEI number. Unregistered foreign phones will be blocked from Turkish networks after the 120-day period.",
            },
            {
                type: "tip",
                content:
                    "Register your IMEI at a tax office (Vergi Dairesi) or through the e-Devlet online portal. The fee is approximately ₺20,000 (2025), so consider buying a local phone instead if yours is expensive.",
            },
            {
                type: "list",
                content: [
                    "Check your IMEI by dialing *#06# on your phone",
                    "Registration must be done within 120 days of arrival",
                    "You need your passport and a Turkish tax number (Vergi No)",
                    "Alternatively, buy an affordable local phone (₺3,000–₺5,000)",
                    "Some students use two phones — one Turkish, one from home with WiFi",
                ],
            },
            {
                type: "heading",
                content: "Student Data Plans",
            },
            {
                type: "paragraph",
                content:
                    "All three operators offer student-specific plans with extra data and discounted rates. Bring your student ID and passport to any operator store to sign up.",
            },
            {
                type: "list",
                content: [
                    'Turkcell "Genç" plans: 20GB+ data from ₺200/month',
                    'Vodafone "Red" student: unlimited social media + 15GB',
                    "Türk Telekom student: 25GB data + 500 min calls from ₺180/month",
                    "All operators offer eSIM options for compatible phones",
                    "Free WiFi available at most universities and cafes",
                ],
            },
        ],
        offers: [
            {
                title: "Turkcell Tourist SIM",
                description: "20GB data + 200 min calls for your first month",
                discount: "ESNcard Special",
            },
            {
                title: "Vodafone Student Pack",
                description: "Extra 5GB bonus data when you show your ESNcard",
                discount: "5GB Bonus",
            },
        ],
    },
    {
        id: "banking",
        slug: "banking",
        title: "Banking & Money",
        icon: "🏦",
        color: "#ec008c",
        heroImage:
            "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
        readTime: 6,
        content: [
            {
                type: "heading",
                content: "Managing Your Money in Türkiye",
            },
            {
                type: "paragraph",
                content:
                    "Understanding the Turkish banking system and managing your finances smartly will save you both money and headaches. Here's everything you need to know about banking, currency exchange, and money management as an exchange student.",
            },
            {
                type: "heading",
                content: "Opening a Bank Account",
            },
            {
                type: "paragraph",
                content:
                    "Having a Turkish bank account makes your life much easier — from paying rent to receiving any local scholarships. Most banks are foreigner-friendly, but some are easier than others.",
            },
            {
                type: "list",
                content: [
                    "Ziraat Bankası — state bank, easiest for foreigners, no fees",
                    "İş Bankası — widely available, good mobile app",
                    "Garanti BBVA — great digital experience, student-friendly",
                    "Yapı Kredi — offers special exchange student accounts",
                ],
            },
            {
                type: "tip",
                content:
                    "Get your Turkish Tax Number (Vergi Numarası) first! You can't open a bank account without it. Visit any Tax Office (Vergi Dairesi) with your passport — it takes about 15 minutes and it's free.",
            },
            {
                type: "heading",
                content: "What You Need to Open an Account",
            },
            {
                type: "list",
                content: [
                    "Passport (original + copy)",
                    "Turkish Tax Number (Vergi Numarası)",
                    "Residence Permit (İkamet İzni) or student document",
                    "Turkish phone number",
                    "Proof of address (rental contract or dormitory letter)",
                ],
            },
            {
                type: "heading",
                content: "Digital Alternatives",
            },
            {
                type: "paragraph",
                content:
                    "If you don't want to open a local bank account right away, international fintech apps work well in Türkiye for everyday spending and ATM withdrawals.",
            },
            {
                type: "list",
                content: [
                    "Wise (TransferWise) — best exchange rates for international transfers",
                    "Revolut — good for multi-currency spending",
                    "N26 — works at most Turkish ATMs",
                    "PayPal is NOT widely accepted in Türkiye",
                    "Apple Pay and Google Pay work at most POS terminals",
                ],
            },
            {
                type: "tip",
                content:
                    'Always pay in Turkish Lira (₺) when using your foreign card. If a terminal asks "pay in EUR/USD or TRY?", always choose TRY to avoid poor exchange rates (Dynamic Currency Conversion).',
            },
        ],
        offers: [
            {
                title: "Wise Student Account",
                description: "Fee-free first international transfer up to €500",
                discount: "Free Transfer",
            },
            {
                title: "Ziraat Student Package",
                description:
                    "No monthly fees + free debit card for exchange students",
                discount: "Free Account",
            },
            {
                title: "Revolut Premium Trial",
                description:
                    "3 months free premium with .edu email verification",
                discount: "3 Months Free",
            },
        ],
    },
    {
        id: "weekend",
        slug: "weekend",
        title: "Weekend Trips",
        icon: "🏔",
        color: "#7ac143",
        heroImage:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        readTime: 7,
        content: [
            {
                type: "heading",
                content: "Explore Türkiye on Weekends",
            },
            {
                type: "paragraph",
                content:
                    "Your Erasmus semester is the perfect time to explore Türkiye beyond your university city. With affordable domestic flights, comfortable buses, and well-connected trains, weekend trips are easy and budget-friendly.",
            },
            {
                type: "tip",
                content:
                    "ESN organizes group trips almost every weekend! Check your local section's social media for upcoming trips — they're usually much cheaper than booking solo.",
            },
            {
                type: "heading",
                content: "Top Weekend Destinations",
            },
            {
                type: "list",
                content: [
                    "Cappadocia — hot air balloons, fairy chimneys, cave hotels (2-day trip)",
                    "Pamukkale — white travertine terraces, ancient Hierapolis (day trip from İzmir)",
                    "Ephesus — one of the best-preserved ancient cities (day trip from İzmir)",
                    "Antalya — beaches, old town, waterfalls (2-day trip)",
                    "Safranbolu — Ottoman architecture, UNESCO heritage (1-day trip from Ankara)",
                    "Princes' Islands — car-free islands near Istanbul (day trip)",
                    "Black Sea coast — lush green mountains, tea plantations (2-3 day trip)",
                ],
            },
            {
                type: "heading",
                content: "Transportation Options",
            },
            {
                type: "paragraph",
                content:
                    "Getting around Türkiye is quite affordable compared to Western Europe. Here are your main options:",
            },
            {
                type: "list",
                content: [
                    "Domestic flights: Pegasus and AnadoluJet offer student discounts (₺300–₺800 one way)",
                    "Intercity buses: Comfortable and cheap (₺200–₺500). Try Metro, Kamil Koç, or Pamukkale",
                    "YHT (High-Speed Train): Ankara↔Istanbul, Ankara↔Eskişehir, Ankara↔Konya",
                    "BlaBlaCar: Carpooling is popular and very affordable",
                    "Rent a car: Consider for group trips (share costs with 3-4 friends)",
                ],
            },
            {
                type: "tip",
                content:
                    "Book bus tickets on obilet.com — you can compare prices across all companies and book in English. For flights, check Pegasus Airlines for the cheapest fares.",
            },
            {
                type: "heading",
                content: "Budget Tips",
            },
            {
                type: "list",
                content: [
                    "Travel in groups of 4-6 to split accommodation costs",
                    "Book hostels on Hostelworld — most have dorms for ₺300–₺600/night",
                    'Visit museums on "Museum Card" days for free or discounted entry',
                    'Eat at local "lokanta" restaurants for ₺80–₺150 per meal',
                    "Use student discounts on all transportation and attractions",
                ],
            },
        ],
        offers: [
            {
                title: "Pegasus Airlines",
                description: "20% off domestic flights with ESNcard",
                discount: "20% OFF",
            },
            {
                title: "Museum Pass Türkiye",
                description: "Access 300+ museums and archaeological sites",
                discount: "Student Price",
            },
            {
                title: "FlixBus Türkiye",
                description: "10% off all intercity routes with ESNcard",
                discount: "10% OFF",
            },
        ],
    },
    {
        id: "booking",
        slug: "booking",
        title: "Booking & Reservations",
        icon: "📋",
        color: "#f47b20",
        heroImage:
            "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a",
        readTime: 5,
        content: [
            {
                type: "heading",
                content: "Booking Like a Local",
            },
            {
                type: "paragraph",
                content:
                    "From booking accommodation to reserving restaurant tables and buying event tickets, here's a guide to essential booking platforms and tips for exchange students in Türkiye.",
            },
            {
                type: "heading",
                content: "Accommodation Booking",
            },
            {
                type: "list",
                content: [
                    "Booking.com — best for short stays and hostels",
                    "Airbnb — great for longer stays (negotiate monthly rates)",
                    "Jolly Tur — Turkish platform with local hotel deals",
                    "Tatilbudur — domestic holiday packages at student-friendly prices",
                    "Hotels.com — collect 10 nights, get 1 free",
                ],
            },
            {
                type: "heading",
                content: "Event & Activity Tickets",
            },
            {
                type: "paragraph",
                content:
                    "Turkish events sell out fast, especially concerts and football matches. Book in advance to avoid disappointment.",
            },
            {
                type: "list",
                content: [
                    "Biletix — Türkiye's main ticketing platform (concerts, sports, theater)",
                    "Passo — football match tickets (requires Passolig card)",
                    "Mobilet — events and activities app",
                    "Meetup — find local events and groups",
                    "Your ESN section's event page",
                ],
            },
            {
                type: "tip",
                content:
                    "Want to watch a football match? You'll need a Passolig card (electronic fan card). Apply online at passo.com.tr — it takes about 1 week to receive. Most stadiums don't sell tickets without it!",
            },
            {
                type: "heading",
                content: "Restaurant Reservations",
            },
            {
                type: "paragraph",
                content:
                    "Popular restaurants in big cities can be fully booked, especially on weekends. Here's how to secure your table:",
            },
            {
                type: "list",
                content: [
                    "Google Maps — most restaurants accept reservations via their listing",
                    "Instagram DMs — many trendy restaurants take bookings via Instagram",
                    "Call ahead — Turkish restaurants are phone-friendly",
                    "Getir Yemek / Yemeksepeti — for food delivery when cooking isn't an option",
                ],
            },
        ],
        offers: [
            {
                title: "Booking.com Student",
                description: "Extra 10% off with Genius Level 1 (free sign-up)",
                discount: "10% OFF",
            },
            {
                title: "Biletix Events",
                description:
                    "Student tickets for selected events at half price",
                discount: "50% OFF",
            },
        ],
    },
    {
        id: "neighborhood",
        slug: "neighborhood",
        title: "Neighborhood Guide",
        icon: "🏘",
        color: "#2e3192",
        heroImage:
            "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
        readTime: 7,
        content: [
            {
                type: "heading",
                content: "Know Your Neighborhood",
            },
            {
                type: "paragraph",
                content:
                    "Choosing the right neighborhood can make or break your Erasmus experience. Each Turkish city has distinct neighborhoods with different vibes, price ranges, and accessibility. Here's what you need to know.",
            },
            {
                type: "heading",
                content: "Istanbul Neighborhoods",
            },
            {
                type: "list",
                content: [
                    "Kadıköy — vibrant, student-friendly, great nightlife and cafes (Asian side)",
                    "Beşiktaş — lively, close to Boğaziçi University, waterfront restaurants",
                    "Beyoğlu/Taksim — touristy but exciting, İstiklal Avenue, nightlife hub",
                    "Üsküdar — quieter, more affordable, beautiful Bosphorus views",
                    "Fatih — historic, budget-friendly, close to Sultanahmet attractions",
                ],
            },
            {
                type: "heading",
                content: "Ankara Neighborhoods",
            },
            {
                type: "list",
                content: [
                    "Kızılay — city center, closest to everything, transport hub",
                    "Çankaya — upscale, safe, popular among students and expats",
                    "Bahçelievler — affordable, close to Hacettepe University",
                    "Tunalı Hilmi — shopping, cafes, nightlife (walkable from Kızılay)",
                    "ODTÜ Area — around METU campus, student-oriented, affordable",
                ],
            },
            {
                type: "heading",
                content: "İzmir Neighborhoods",
            },
            {
                type: "list",
                content: [
                    "Alsancak — the heart of İzmir, waterfront, bars and restaurants",
                    "Bornova — student district, close to Ege University, affordable",
                    "Karşıyaka — coastal, relaxed vibe, ferry access to Alsancak",
                    "Konak — historic center, bustling bazaars, clock tower area",
                ],
            },
            {
                type: "tip",
                content:
                    "Ask your ESN buddy which neighborhoods are closest to your campus and fit your budget. They know the local scene best!",
            },
            {
                type: "heading",
                content: "Safety Tips",
            },
            {
                type: "list",
                content: [
                    "Türkiye is generally very safe for students, but stay aware in crowded areas",
                    "Avoid walking alone in unfamiliar areas late at night",
                    "Keep your emergency contacts handy: Police 155, Ambulance 112",
                    "Register with your country's embassy upon arrival",
                    "Share your location with friends when going out",
                ],
            },
        ],
        offers: [
            {
                title: "Local Buddy Program",
                description:
                    "Get paired with a Turkish student who knows your neighborhood",
                discount: "Free",
            },
            {
                title: "City Transport Card",
                description:
                    "Student discount on İstanbulkart, AnkaraKart, İzmirim Kart",
                discount: "50% OFF",
            },
        ],
    },
    {
        id: "esn-card",
        slug: "esn-card",
        title: "ESN Card Benefits",
        icon: "💳",
        color: "#7ac143",
        heroImage:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        readTime: 4,
        content: [
            {
                type: "heading",
                content: "Your Magic Pass: ESNcard",
            },
            {
                type: "paragraph",
                content:
                    "The ESNcard is the most important card you'll carry during your exchange. It gives you access to discounts, events, and a community of 500,000+ students across 42 countries.",
            },
            {
                type: "tip",
                content:
                    "Get your ESNcard during Welcome Week from your local ESN section! It costs €10 and is valid for 1 year. It will save you hundreds of euros in discounts.",
            },
            {
                type: "heading",
                content: "How to Get Your ESNcard",
            },
            {
                type: "list",
                content: [
                    "Visit your local ESN section office during Welcome Week",
                    "Bring your student ID and a passport-size photo",
                    "Pay the €10 fee (one-time, valid for 12 months)",
                    "Activate your card on the ESNcard app",
                    "Start enjoying discounts immediately!",
                ],
            },
            {
                type: "heading",
                content: "Travel Discounts",
            },
            {
                type: "list",
                content: [
                    "Ryanair — up to 15% off flights to/from Türkiye",
                    "FlixBus — 10% off all European routes",
                    "Pegasus Airlines — special fares for ESNcard holders",
                    "Hostelworld — 25% off hostel bookings worldwide",
                    "Europcar — up to 15% off car rentals",
                ],
            },
            {
                type: "heading",
                content: "Local Discounts in Türkiye",
            },
            {
                type: "paragraph",
                content:
                    "Many local businesses in Türkiye partner with ESN to offer exclusive discounts to ESNcard holders. Check the ESNcard app for nearby deals.",
            },
            {
                type: "list",
                content: [
                    "Restaurants: 10-20% off at partner restaurants",
                    "Cafes: Free upgrade or discount at selected cafes",
                    "Activities: Discounted tickets for tours and experiences",
                    "Shops: Special prices at partner stores",
                    "Gyms: Student rates at partner fitness centers",
                ],
            },
            {
                type: "heading",
                content: "ESN Events Access",
            },
            {
                type: "paragraph",
                content:
                    "Your ESNcard also gives you priority access and discounted tickets to all ESN events — from local parties to international trips and the famous Erasmus Gala.",
            },
        ],
        offers: [
            {
                title: "ESNcard App",
                description:
                    "Download the app to unlock all your benefits instantly",
                discount: "Free App",
            },
            {
                title: "Ryanair Discount",
                description: "Up to 15% off on 4 flights per year in Europe",
                discount: "15% OFF",
            },
            {
                title: "Hostelworld Bonus",
                description: "25% off hostel bookings in 36,000+ hostels",
                discount: "25% OFF",
            },
        ],
    },
];

export function getGuideBySlug(slug: string): GuideCategory | undefined {
    return GUIDE_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getAllGuideSlugs(): string[] {
    return GUIDE_CATEGORIES.map((cat) => cat.slug);
}

// Mapping from FAQ item ID to guide slug (for "Read Guide" links)
export const FAQ_TO_GUIDE_MAP: Record<number, string> = {
    1: "accommodation",
    2: "sim-card",
    3: "banking",
    4: "esn-card",
};
