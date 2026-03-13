import type { GuideIconKey } from '@/components/guide/guide-icons';

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
        id: 'accommodation',
        slug: 'accommodation',
        title: 'Accommodation Guide',
        iconKey: 'accommodation',
        color: '#2e3192',
        heroImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5',
        lastUpdated: 'March 2026',
        offers: [
            {
                title: 'Student Housing Platform',
                description: 'Get 15% off your first month on verified student apartments',
                discount: '15% OFF'
            },
            {
                title: 'Moving Supplies',
                description: 'Affordable bedding and essentials package for new arrivals',
                discount: 'ESNcard Deal'
            },
            {
                title: 'Home Insurance',
                description: 'Special renter\'s insurance for exchange students',
                discount: '20% OFF'
            }
        ]
    },
    {
        id: 'sim-card',
        slug: 'sim-card',
        title: 'SIM Card & Connectivity',
        iconKey: 'sim-card',
        color: '#00aeef',
        heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        lastUpdated: 'March 2026',
        offers: [
            {
                title: 'Turkcell Tourist SIM',
                description: '20GB data + 200 min calls for your first month',
                discount: 'ESNcard Special'
            },
            {
                title: 'Vodafone Student Pack',
                description: 'Extra 5GB bonus data when you show your ESNcard',
                discount: '5GB Bonus'
            }
        ]
    },
    {
        id: 'banking',
        slug: 'banking',
        title: 'Banking & Money',
        iconKey: 'banking',
        color: '#ec008c',
        heroImage: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc',
        lastUpdated: 'March 2026',
        offers: [
            {
                title: 'Wise Student Account',
                description: 'Fee-free first international transfer up to EUR 500',
                discount: 'Free Transfer'
            },
            {
                title: 'Ziraat Student Package',
                description: 'No monthly fees + free debit card for exchange students',
                discount: 'Free Account'
            },
            {
                title: 'Revolut Premium Trial',
                description: '3 months free premium with .edu email verification',
                discount: '3 Months Free'
            }
        ]
    },
    {
        id: 'weekend',
        slug: 'weekend',
        title: 'Weekend Trips',
        iconKey: 'weekend',
        color: '#7ac143',
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        lastUpdated: 'March 2026',
        offers: [
            {
                title: 'Pegasus Airlines',
                description: '20% off domestic flights with ESNcard',
                discount: '20% OFF'
            },
            {
                title: 'Museum Pass Türkiye',
                description: 'Access 300+ museums and archaeological sites',
                discount: 'Student Price'
            },
            {
                title: 'FlixBus Türkiye',
                description: '10% off all intercity routes with ESNcard',
                discount: '10% OFF'
            }
        ]
    },
    {
        id: 'booking',
        slug: 'booking',
        title: 'Booking & Reservations',
        iconKey: 'booking',
        color: '#f47b20',
        heroImage: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a',
        lastUpdated: 'March 2026',
        offers: [
            {
                title: 'Booking.com Student',
                description: 'Extra 10% off with Genius Level 1 (free sign-up)',
                discount: '10% OFF'
            },
            {
                title: 'Biletix Events',
                description: 'Student tickets for selected events at half price',
                discount: '50% OFF'
            }
        ]
    },
    {
        id: 'neighborhood',
        slug: 'neighborhood',
        title: 'Neighborhood Guide',
        iconKey: 'neighborhood',
        color: '#2e3192',
        heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
        lastUpdated: 'March 2026',
        offers: [
            {
                title: 'Local Buddy Program',
                description: 'Get paired with a Turkish student who knows your neighborhood',
                discount: 'Free'
            },
            {
                title: 'City Transport Card',
                description: 'Student discount on İstanbulkart, AnkaraKart, İzmirim Kart',
                discount: '50% OFF'
            }
        ]
    },
    {
        id: 'esn-card',
        slug: 'esn-card',
        title: 'ESN Card Benefits',
        iconKey: 'esn-card',
        color: '#7ac143',
        heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
        lastUpdated: 'March 2026',
        offers: [
            {
                title: 'ESNcard App',
                description: 'Download the app to unlock all your benefits instantly',
                discount: 'Free App'
            },
            {
                title: 'Ryanair Discount',
                description: 'Up to 15% off on 4 flights per year in Europe',
                discount: '15% OFF'
            },
            {
                title: 'Hostelworld Bonus',
                description: '25% off hostel bookings in 36,000+ hostels',
                discount: '25% OFF'
            }
        ]
    }
];

export function getGuideBySlug(slug: string): GuideCategory | undefined {
    return GUIDE_CATEGORIES.find((category) => category.slug === slug);
}

export function getAllGuideSlugs(): string[] {
    return GUIDE_CATEGORIES.map((category) => category.slug);
}

export function getGuideLabel(title: string): string {
    return title.replace(' Guide', '').replace(' Benefits', '');
}