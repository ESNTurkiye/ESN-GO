import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExperiencesSection from "@/components/sections/experiences/ExperiencesSection";

export default function ExperiencesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-esn-cyan/5 relative overflow-hidden">
        <div className="relative z-10 py-10">
          <ExperiencesSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
