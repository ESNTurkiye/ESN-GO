import DestinationsCarousel from './DestinationsCarousel';

export default function DestinationsSection() {
    const destinations = [
        { id: 1, name: "Ardahan", image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=2052", desc: "Hit the slopes at Türkiye's hidden ski paradise" },
        { id: 2, name: "Bilecik", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070", desc: "Explore Ottoman heritage and historic architecture" },
        { id: 3, name: "Bolu", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070", desc: "Relax in thermal spas surrounded by nature" },
        { id: 4, name: "Ankara", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071", desc: "Discover the capital's museums and vibrant student life" },
        { id: 5, name: "Izmir", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2074", desc: "Ancient ruins meet modern coastal vibes" },
        { id: 6, name: "Denizli", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070", desc: "Walk on clouds at the stunning white travertines" },
        { id: 7, name: "Antalya", image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2080", desc: "Mediterranean beaches and endless summer nights" },
        { id: 8, name: "Cappadocia", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2187", desc: "Float over fairy chimneys in hot air balloons" },
        { id: 9, name: "Istanbul", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071", desc: "Where East meets West in vibrant culture" }
    ];

    return <DestinationsCarousel destinations={destinations} />;
}