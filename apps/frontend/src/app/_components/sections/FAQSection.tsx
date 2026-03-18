'use client';

import { useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { FAQ_DATA } from './faq/constants';
import { FAQItem } from './faq/FAQItem';
import { handleKeyDown as handleKeyDownUtil } from './faq/utils';

export default function FAQSection() {
    const [hacksActiveIndex, setHacksActiveIndex] = useState<number>(0);

    return (
        <section id="erasmus-hacks" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-esn-dark-blue mb-4">
                        Erasmus Hacks
                    </h2>
                    <p className="text-gray-600 font-lato">
                        Everything you need to survive & thrive
                    </p>
                </div>

                <LayoutGroup id="erasmus-hacks-cards">
                    <div className="flex flex-col gap-3 md:gap-4 w-full">
                        {FAQ_DATA.map((faq, index) => (
                            <FAQItem
                                key={faq.id}
                                faq={faq}
                                index={index}
                                isActive={hacksActiveIndex === index}
                                onExpand={() => { if (hacksActiveIndex !== index) setHacksActiveIndex(index); }}
                                onKeyDown={(e) => handleKeyDownUtil(e, () => { if (hacksActiveIndex !== index) setHacksActiveIndex(index); })}
                            />
                        ))}
                    </div>
                </LayoutGroup>
            </div>
        </section>
    );
}