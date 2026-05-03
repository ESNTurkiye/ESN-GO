import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main id="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
}
