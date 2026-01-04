'use client';

import { use } from 'react';
import { GUIDES } from '../data';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackToHomeLink from '@/components/ui/BackToHomeLink';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GuidePage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);
    const { language } = useLanguage();
    const guide = GUIDES[category];

    if (!guide) {
        notFound();
    }

    const content = guide[language as 'en' | 'tr'];

    return (
        <main className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 gap-8 pt-28">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
                    <div>
                        <h2 className="font-oswald text-2xl font-bold text-esn-dark-blue mb-2">
                            {language === 'tr' ? 'Erasmus İpuçları' : 'Erasmus Hacks'}
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            {language === 'tr' ? 'Görüntülemek için rehber seçin' : 'Select guide to view'}
                        </p>
                        
                        {/* Mobile Select Box (visible on small screens) */}
                        <div className="md:hidden mb-4">
                            <div className="flex flex-col space-y-2">
                                {Object.values(GUIDES).map((g) => (
                                    <Link 
                                        key={g.id} 
                                        href={`/guide/${g.id}`}
                                        className={`block p-3 rounded-lg border ${
                                            g.id === category 
                                                ? 'bg-esn-dark-blue text-white border-esn-dark-blue' 
                                                : 'bg-white text-gray-700 border-gray-200'
                                        }`}
                                    >
                                        {g[language as 'en' | 'tr'].title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Navigation List */}
                        <nav className="hidden md:flex flex-col space-y-2">
                            {Object.values(GUIDES).map((g) => (
                                <Link 
                                    key={g.id} 
                                    href={`/guide/${g.id}`}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        g.id === category 
                                            ? 'bg-esn-dark-blue text-white font-bold' 
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {g[language as 'en' | 'tr'].title}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <BackToHomeLink />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-grow space-y-8">
                    {/* Hero Section */}
                    <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                                <Image 
                                    src={guide.image} 
                                    alt={content.title} 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col justify-center md:w-2/3">
                                <h1 className="font-oswald text-4xl font-bold mb-2" style={{ color: guide.color }}>
                                    {content.title}
                                </h1>
                                <p className="text-gray-600 font-lato text-lg">
                                    {content.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Problems & Solutions */}
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="font-oswald text-2xl font-bold text-gray-800">
                                {language === 'tr' ? 'Sık Karşılaşılan Sorunlar & Çözümler' : 'Common Problems & Solutions'}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {language === 'tr' 
                                    ? 'Erasmus öğrencilerinin karşılaştığı gerçek sorunlar ve çözümleri' 
                                    : 'Real issues faced by Erasmus students and how to solve them'}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {content.problems.map((problem) => (
                                <div key={problem.id} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                        <h3 className="font-oswald font-bold text-lg text-gray-800">
                                            {problem.problem}
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 font-lato leading-relaxed">
                                            {problem.solution}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
    );
}
