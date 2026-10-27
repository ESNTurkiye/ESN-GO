import { notFound } from "next/navigation";
import {
    getAllGuideSlugs,
    getAllGuides,
    getGuideBySlug,
} from "@/app/_lib/guides";
import ExclusiveOffers from "@/components/guide/ExclusiveOffers";
import GuideContentRenderer from "@/components/guide/GuideContentRenderer";
import GuideHero from "@/components/guide/GuideHero";
import GuideSidebar from "@/components/guide/GuideSidebar";
import NeedHelp from "@/components/guide/NeedHelp";

interface GuidePageProps {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    const slugs = await getAllGuideSlugs();
    return slugs.map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: GuidePageProps) {
    const { category } = await params;
    const guide = await getGuideBySlug(category);
    if (!guide) return { title: "Guide Not Found — ESN GO" };

    return {
        title: `${guide.title} — ESN GO Survival Guide`,
        description: `Everything you need to know about ${guide.title.toLowerCase()} during your Erasmus in Türkiye. Tips, resources and exclusive offers for exchange students.`,
    };
}

export default async function GuidePage({ params }: GuidePageProps) {
    const { category } = await params;
    const guides = await getAllGuides();
    const sidebarCategories = guides.map(({ slug, title, icon, color }) => ({
        slug,
        title,
        icon,
        color,
    }));
    const guide = await getGuideBySlug(category);

    if (!guide) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 md:pt-8 md:pb-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <GuideSidebar
                        currentSlug={guide.slug}
                        categories={sidebarCategories}
                    />

                    <main className="flex-1 min-w-0">
                        <GuideHero category={guide} />

                        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                            <GuideContentRenderer
                                slug={guide.slug}
                                color={guide.color}
                            />
                        </article>

                        <ExclusiveOffers
                            offers={guide.offers}
                            color={guide.color}
                        />

                        <NeedHelp />
                    </main>
                </div>
            </div>
        </div>
    );
}
