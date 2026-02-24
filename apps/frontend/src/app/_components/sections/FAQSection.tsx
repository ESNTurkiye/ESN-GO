'use client';

import { useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { FAQ_DATA, BASIC_FAQ_DATA } from './faq/constants';
import { FAQItem } from './faq/FAQItem';
import { getAnimationProps, handleKeyDown as handleKeyDownUtil } from './faq/utils';
import type { BasicFAQ } from './faq/types';

function AccordionItem({ faq, isOpen, onToggle }: {
    faq: BasicFAQ;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onToggle();
                    }
                }}
                aria-expanded={isOpen}
                aria-controls={`basic-faq-${faq.id}`}
                className="w-full flex items-center justify-between py-4 px-4 md:px-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-esn-cyan rounded-lg transition-colors hover:bg-gray-100"
            >
                <span className="font-oswald font-semibold text-base md:text-lg text-esn-dark-blue pr-4 group-hover:text-esn-cyan transition-colors">
                    {faq.question}
                </span>
                <span
                    className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isOpen
                            ? 'border-esn-cyan bg-esn-cyan text-white'
                            : 'border-gray-300 text-gray-400 group-hover:border-esn-cyan group-hover:text-esn-cyan'
                    }`}
                >
                    <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div
                id={`basic-faq-${faq.id}`}
                role="region"
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
            >
                <div className="overflow-hidden">
                    <p className="px-4 md:px-6 pb-4 font-lato text-gray-600 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    // Hacks: always exactly 1 open (default index 0)
    const [hacksActiveIndex, setHacksActiveIndex] = useState<number>(0);
    // Basic FAQ: always exactly 1 open (default id 1)
    const [faqOpenId, setFaqOpenId] = useState<number>(1);
    const isMounted = true;

    return (
        <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Erasmus Hacks */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-esn-dark-blue mb-4">
                        Erasmus Hacks
                    </h2>
                    <p className="text-gray-600 font-lato">
                        Everything you need to survive & thrive
                    </p>
                </div>

                <LayoutGroup>
                    <div className="flex flex-col gap-3 md:gap-4 w-full">
                        {FAQ_DATA.map((faq, index) => (
                            <FAQItem
                                key={faq.id}
                                faq={faq}
                                index={index}
                                isActive={hacksActiveIndex === index}
                                isDesktop={false}
                                isMounted={isMounted}
                                animationProps={getAnimationProps(index, hacksActiveIndex, isMounted, false) as { flex?: number; height?: string }}
                                onClick={() => setHacksActiveIndex(index)}
                                onKeyDown={(e) => handleKeyDownUtil(e, () => setHacksActiveIndex(index))}
                            />
                        ))}
                    </div>
                </LayoutGroup>

                {/* Frequently Asked Questions */}
                <div className="mt-16 md:mt-20">
                    <div className="text-center mb-8 md:mb-10">
                        <h2 className="text-3xl md:text-4xl font-oswald font-bold text-esn-dark-blue mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-500 font-lato text-sm md:text-base">
                            Common questions about your Erasmus journey
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
                        {BASIC_FAQ_DATA.map((faq) => (
                            <AccordionItem
                                key={faq.id}
                                faq={faq}
                                isOpen={faqOpenId === faq.id}
                                onToggle={() => setFaqOpenId(faq.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}