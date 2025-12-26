import DestinationsCarousel from './DestinationsCarousel';

export default function DestinationsSection() {
    const destinations = [
        { id: 1, name: "Istanbul", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/1ebdd323ef8455f5791ab2415241ceb9a69090a0/destinationsiamges/istanbul.jpg", desc: "Where East meets West in vibrant culture" },
        { id: 2, name: "Antalya", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/1ebdd323ef8455f5791ab2415241ceb9a69090a0/destinationsiamges/antalya.jpg", desc: "Mediterranean beaches and endless summer nights" },
        { id: 3, name: "Cappadocia", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/1ebdd323ef8455f5791ab2415241ceb9a69090a0/destinationsiamges/kapadokya.jpg", desc: "Fairy chimneys and hot air balloon adventures" },
        { id: 4, name: "Izmir", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/0d73a1c8db40a251a6e2ee0e5419aba9b8b25e95/destinationsiamges/izmir.jpg", desc: "Ancient ruins meet modern coastal vibes" },
        { id: 5, name: "Ankara", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/1ebdd323ef8455f5791ab2415241ceb9a69090a0/destinationsiamges/ankara.jpg", desc: "Discover the capital's museums and vibrant student life" },
        { id: 6, name: "Bolu", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/1ebdd323ef8455f5791ab2415241ceb9a69090a0/destinationsiamges/bolu.jpg", desc: "Relax in thermal spas surrounded by nature" },
        { id: 7, name: "Denizli", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/1ebdd323ef8455f5791ab2415241ceb9a69090a0/destinationsiamges/denizli.jpg", desc: "Walk on clouds at the stunning white travertines" },
        { id: 8, name: "Ardahan", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/1ebdd323ef8455f5791ab2415241ceb9a69090a0/destinationsiamges/ardahan.jpg", desc: "Hit the slopes at Türkiye's hidden ski paradise" },
        { id: 9, name: "Bilecik", image: "https://raw.githubusercontent.com/Kayrakalkan/esnmarmaraimages/1ebdd323ef8455f5791ab2415241ceb9a69090a0/destinationsiamges/bilecik.jpg", desc: "Explore Ottoman heritage and historic architecture" },
    ];

return <DestinationsCarousel destinations={destinations} />;
}