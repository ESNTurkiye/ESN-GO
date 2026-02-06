import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import VibeSelectorSection from "@/components/sections/VibeSelectorSection";
import FoodSection from "@/components/sections/FoodSection";
import EventsSection from "@/components/sections/EventsSection";
import FAQSection from "@/components/sections/FAQSection";
import InstagramSection from "@/components/sections/InstagramSection";
import InstagramToFooterWave from "@/components/ui/InstagramToFooterWave";

export default function Home() {
    return (
        <>
            <Header />
            <div id="main-content" role="main" className="min-h-screen bg-white">
                <HeroSection />
                <DestinationsSection />
                <VibeSelectorSection />
                <FoodSection />
                <EventsSection />
                <FAQSection />
                <InstagramSection />
                <InstagramToFooterWave />
            </div>
            <Footer />
        </>
    );
}
