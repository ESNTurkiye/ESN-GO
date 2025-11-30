import DestinationsCarousel from './DestinationsCarousel';

export default function DestinationsSection() {
  const destinations = [
    { id: 1, name: "Ardahan", image: "https://cdn.goturkiye.com/branding/yaln-zcgam-kayak-merkezi.jpg", desc: "Hit the slopes at Türkiye's hidden ski paradise" },
    { id: 2, name: "Bilecik", image: "https://cdn.goturkiye.com/branding/hamidiye-iidadisi-soigiuit-biileciik.jpg", desc: "Explore Ottoman heritage and historic architecture" },
    { id: 3, name: "Bolu", image: "https://cdn.goturkiye.com/branding/7.bolu-sultan-hamami-.jpg", desc: "Relax in thermal spas surrounded by nature" },
    { id: 4, name: "Ankara", image: "https://cdn.goturkiye.com/branding/anitkabicr.jpg", desc: "Discover the capital's museums and vibrant student life" },
    { id: 5, name: "Izmir", image: "https://cdn.goturkiye.com/branding/selcguk-efes-celsus-37t-5620.93k--27t-2027.20d.jpg", desc: "Ancient ruins meet modern coastal vibes" },
    { id: 6, name: "Denizli", image: "https://cdn.goturkiye.com/branding/pamukkale-2.jpg", desc: "Walk on clouds at the stunning white travertines" },
    { id: 7, name: "Antalya", image: "https://cdn.goturkiye.com/branding/yaln-zcgam-kayak-merkezi.jpg", desc: "Mediterranean beaches and endless summer nights" },
    { id: 8, name: "Cappadocia", image: "https://cdn.goturkiye.com/branding/yaln-zcgam-kayak-merkezi.jpg", desc: "Float over fairy chimneys in hot air balloons" },
    { id: 9, name: "Istanbul", image: "https://cdn.goturkiye.com/branding/yaln-zcgam-kayak-merkezi.jpg", desc: "Where East meets West in vibrant culture" }
  ];

  return <DestinationsCarousel destinations={destinations} />;
}