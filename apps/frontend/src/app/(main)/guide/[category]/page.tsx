import { notFound } from 'next/navigation';
import { GUIDE_CATEGORIES, getGuideBySlug, getAllGuideSlugs } from '@/app/_lib/guide-data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GuideSidebar from '@/components/guide/GuideSidebar';
import GuideHero from '@/components/guide/GuideHero';
import GuideContentRenderer from '@/components/guide/GuideContentRenderer';
import ExclusiveOffers from '@/components/guide/ExclusiveOffers';
import NeedHelp from '@/components/guide/NeedHelp';

interface GuidePageProps {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    return getAllGuideSlugs().map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: GuidePageProps) {
    const { category } = await params;
    const guide = getGuideBySlug(category);
    if (!guide) return { title: 'Guide Not Found — ESN GO' };

    return {
        title: `${guide.title} — ESN GO Survival Guide`,
        description: `Everything you need to know about ${guide.title.toLowerCase()} during your Erasmus in Türkiye. Tips, resources, and exclusive offers for exchange students.`,
    };
}

export default async function GuidePage({ params }: GuidePageProps) {
    const { category } = await params;
    const guide = getGuideBySlug(category);

    if (!guide) {
        notFound();
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Sidebar */}
                        <GuideSidebar currentSlug={guide.slug} />

                        {/* Main Content */}
                        <main className="flex-1 min-w-0">
                            <GuideHero category={guide} />

                            {/* Article Content */}
                            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                                <GuideContentRenderer
                                    content={guide.content}
                                    color={guide.color}
                                />
                            </article>

                            {/* Exclusive Offers */}
                            <ExclusiveOffers offers={guide.offers} color={guide.color} />

                            {/* Need Help CTA */}
                            <NeedHelp />
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
