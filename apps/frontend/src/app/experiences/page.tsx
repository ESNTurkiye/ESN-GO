import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExperiencesSection from "@/components/sections/experiences/ExperiencesSection";

export default function ExperiencesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-esn-dark-blue/5 via-white to-esn-cyan/5 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-esn-magenta/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-esn-green/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-esn-orange/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-10 w-64 h-64 bg-esn-cyan/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232e3192' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 py-10">
          <ExperiencesSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
