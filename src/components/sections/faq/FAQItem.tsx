import { motion } from 'framer-motion';
import Image from 'next/image';
import { FAQ } from './types';
import { FAQ_CONFIG } from './constants';
import { FAQClosedStateDesktop, FAQClosedStateMobile } from './FAQClosedState';
import { FAQOpenState } from './FAQOpenState';

interface FAQItemProps {
    faq: FAQ;
    index: number;
    isActive: boolean;
    isDesktop: boolean;
    isMounted: boolean;
    animationProps: { flex?: number; height?: string } | Record<string, never>;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

export const FAQItem = ({
    faq,
    index,
    isActive,
    isDesktop,
    animationProps,
    onClick,
    onKeyDown,
}: FAQItemProps) => {
    return (
        <motion.button
            layout={isDesktop}
            key={faq.id}
            role="button"
            aria-expanded={isActive}
            aria-controls={`faq-panel-${index}`}
            aria-label={`${faq.q}: Click to ${isActive ? 'collapse' : 'expand'}`}
            tabIndex={0}
            onClick={onClick}
            onKeyDown={onKeyDown}
            animate={animationProps}
            transition={isDesktop ? FAQ_CONFIG.DESKTOP_ANIMATION : FAQ_CONFIG.MOBILE_ANIMATION}
            className="relative rounded-3xl overflow-hidden cursor-pointer shadow-lg transition-shadow hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50 transform-gpu will-change-[height,flex]"
            style={{
                '--tw-ring-color': faq.color
            } as React.CSSProperties}
        >
            <Image
                src={faq.img}
                alt={faq.q}
                fill
                className={`object-cover transition-transform duration-500 ease-out ${isActive ? 'scale-100' : 'scale-105'}`}
                sizes="(max-width: 768px) 100vw, 25vw"
                quality={85}
            />

            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `linear-gradient(to top, ${faq.color} 0%, ${faq.color}cc 60%, ${faq.color}66 100%)`,
                    opacity: isActive ? 0.9 : 0.85
                }}
            />

            <div
                id={`faq-panel-${index}`}
                className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end text-white"
            >
                {!isActive && <FAQClosedStateDesktop title={faq.q} />}
                {!isActive && <FAQClosedStateMobile title={faq.q} />}
                {isActive && (
                    <FAQOpenState
                        index={index}
                        fullQuestion={faq.fullQ}
                        answer={faq.a}
                        isDesktop={isDesktop}
                    />
                )}
            </div>
        </motion.button>
    );
};