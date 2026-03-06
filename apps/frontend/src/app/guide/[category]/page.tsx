'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { GUIDE_CATEGORIES, getGuideBySlug } from '@/app/_lib/guide-data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function GuidePage() {
    const params = useParams();
    const currentSlug = params.category as string;
    const guide = getGuideBySlug(currentSlug);
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);

    if (!guide) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <h1 className="text-3xl font-oswald font-bold text-esn-dark-blue mb-4">Guide Not Found</h1>
                        <Link href="/" className="text-esn-cyan hover:underline font-lato">
                            ← Back to home
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-20 md:pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                        {/* Sidebar */}
                        <aside className="lg:w-64 shrink-0">
                            <h2 className="font-oswald font-bold text-2xl text-esn-dark-blue mb-1">
                                Erasmus Hacks
                            </h2>
                            <p className="text-sm text-gray-500 font-lato mb-4">Select guide to view</p>

                            <nav className="flex flex-col gap-1">
                                {GUIDE_CATEGORIES.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/guide/${cat.slug}`}
                                        className={`px-4 py-2.5 rounded-lg font-lato text-sm font-semibold transition-colors ${
                                            cat.slug === currentSlug
                                                ? 'text-white shadow-md'
                                                : 'text-esn-dark-blue hover:bg-gray-100'
                                        }`}
                                        style={cat.slug === currentSlug ? { backgroundColor: cat.color } : undefined}
                                    >
                                        {cat.title}
                                    </Link>
                                ))}
                            </nav>

                            <hr className="my-6 border-gray-200" />

                            <Link
                                href="/"
                                className="text-sm font-lato font-semibold text-esn-dark-blue hover:text-esn-cyan transition-colors"
                            >
                                ← Back to home
                            </Link>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            {/* Hero Banner */}
                            <div className="relative rounded-2xl overflow-hidden mb-10 shadow-lg">
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative w-full md:w-2/5 h-48 md:h-auto min-h-[180px]">
                                        <Image
                                            src={guide.image}
                                            alt={guide.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                            unoptimized
                                        />
                                    </div>
                                    <div
                                        className="flex-1 p-6 md:p-8 flex flex-col justify-center"
                                        style={{ backgroundColor: `${guide.color}15` }}
                                    >
                                        <h1
                                            className="font-oswald font-bold text-3xl md:text-4xl mb-2"
                                            style={{ color: guide.color }}
                                        >
                                            {guide.title}
                                        </h1>
                                        <p className="font-lato text-gray-600 text-base md:text-lg">
                                            {guide.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Common Problems & Solutions */}
                            <div className="text-center mb-8">
                                <h2 className="font-oswald font-bold text-2xl md:text-3xl text-esn-dark-blue">
                                    Common Problems &amp; Solutions
                                </h2>
                                <p className="font-lato text-gray-500 text-sm mt-1">
                                    Real issues faced by Erasmus students and how to solve them
                                </p>
                            </div>

                            <div className="space-y-4 mb-12">
                                {guide.questions.map((qa, idx) => (
                                    <div
                                        key={idx}
                                        className="border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                                    >
                                        <button
                                            onClick={() => setOpenQuestion(openQuestion === idx ? null : idx)}
                                            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-esn-cyan/40 rounded-xl"
                                        >
                                            <h3 className="font-oswald font-bold text-base md:text-lg text-gray-800">
                                                {qa.question}
                                            </h3>
                                            <svg
                                                className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                                                    openQuestion === idx ? 'rotate-180' : ''
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {openQuestion === idx && (
                                            <div className="px-6 pb-5">
                                                <p className="font-lato text-gray-600 text-sm md:text-base leading-relaxed">
                                                    {qa.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
