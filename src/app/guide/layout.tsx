import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function GuideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header scrolled={true} />
            {children}
            <Footer />
        </div>
    );
}
