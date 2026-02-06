import DestinationsCarousel from './DestinationsCarousel';

export default function DestinationsSection() {
    const destinations = [
        { id: 1, name: "Istanbul", image: "https://esnturkiye.github.io/esn-assets/images/destinations/istanbul.jpg", desc: "Where East meets West in vibrant culture" },
        { id: 2, name: "Antalya", image: "https://esnturkiye.github.io/esn-assets/images/destinations/antalya.jpg", desc: "Mediterranean beaches and endless summer nights" },
        { id: 3, name: "Cappadocia", image: "https://esnturkiye.github.io/esn-assets/images/destinations/kapadokya.jpg", desc: "Fairy chimneys and hot air balloon adventures" },
        { id: 4, name: "Izmir", image: "https://esnturkiye.github.io/esn-assets/images/destinations/izmir.jpg", desc: "Ancient ruins meet modern coastal vibes" },
        { id: 5, name: "Ankara", image: "https://esnturkiye.github.io/esn-assets/images/destinations/ankara.jpg", desc: "Discover the capital's museums and vibrant student life" },
        { id: 6, name: "Bolu", image: "https://esnturkiye.github.io/esn-assets/images/destinations/bolu.jpg", desc: "Relax in thermal spas surrounded by nature" },
        { id: 7, name: "Denizli", image: "https://esnturkiye.github.io/esn-assets/images/destinations/denizli.jpg", desc: "Walk on clouds at the stunning white travertines" },
        { id: 8, name: "Ardahan", image: "https://esnturkiye.github.io/esn-assets/images/destinations/ardahan.jpg", desc: "Hit the slopes at Türkiye's hidden ski paradise" },
        { id: 9, name: "Bilecik", image: "https://esnturkiye.github.io/esn-assets/images/destinations/bilecik.jpg", desc: "Explore Ottoman heritage and historic architecture" },
    ];

return <DestinationsCarousel destinations={destinations} />;
}