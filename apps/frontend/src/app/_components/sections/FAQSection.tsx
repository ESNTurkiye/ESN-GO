'use client';

import { useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { useMediaQuery } from './faq/hooks/useMediaQuery';
import { FAQ_DATA } from './faq/constants';
import { FAQItem } from './faq/FAQItem';
import { getAnimationProps, handleKeyDown as handleKeyDownUtil } from './faq/utils';

export default function HorizontalFAQSection() {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    // Component is mounted when it renders, no need for isMounted state
    const isMounted = true;

    return (
        <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-esn-dark-blue mb-4 ">
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
                                isActive={activeIndex === index}
                                isDesktop={false}
                                isMounted={isMounted}
                                animationProps={getAnimationProps(index, activeIndex, isMounted, false) as { flex?: number; height?: string }}
                                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                                onKeyDown={(e) => handleKeyDownUtil(e, () => setActiveIndex(activeIndex === index ? -1 : index))}
                            />
                        ))}
                    </div>
                </LayoutGroup>
            </div>
        </section>
    );
}