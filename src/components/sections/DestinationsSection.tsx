import DestinationsCarousel from './DestinationsCarousel';

export default function DestinationsSection() {
    const destinations = [
        { id: 1, name: "Ardahan", image: "https://images.unsplash.com/photo-1551524559-8af4e6624178", desc: "Hit the slopes at Türkiye's hidden ski paradise" },
        { id: 2, name: "Bilecik", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded", desc: "Explore Ottoman heritage and historic architecture" },
        { id: 3, name: "Bolu", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", desc: "Relax in thermal spas surrounded by nature" },
        { id: 4, name: "Ankara", image: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed", desc: "Discover the capital's museums and vibrant student life" },
        { id: 5, name: "Izmir", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b", desc: "Ancient ruins meet modern coastal vibes" },
        { id: 6, name: "Denizli", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b", desc: "Walk on clouds at the stunning white travertines" },
        { id: 7, name: "Antalya", image: "https://images.unsplash.com/photo-1527838832700-5059252407fa", desc: "Mediterranean beaches and endless summer nights" },
        { id: 8, name: "Cappadocia", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24", desc: "Float over fairy chimneys in hot air balloons" },
        { id: 9, name: "Istanbul", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200", desc: "Where East meets West in vibrant culture" }
    ];

return <DestinationsCarousel destinations={destinations} />;
}