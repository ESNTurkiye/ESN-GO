import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FAQ } from './types';
import { FAQClosedStateMobile } from './FAQClosedState';
import { FAQOpenState } from './FAQOpenState';

interface FAQItemProps {
    faq: FAQ;
    index: number;
    isActive: boolean;
    onExpand: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

export const FAQItem = ({
    faq,
    index,
    isActive,
    onExpand,
    onKeyDown,
}: FAQItemProps) => {
    const router = useRouter();

    const handleActivate = () => {
        if (isActive && faq.guideSlug) {
            router.push(`/guide/${faq.guideSlug}`);
            return;
        }

        if (!isActive) {
            onExpand();
        }
    };

    return (
        <motion.article
            key={faq.id}
            role={isActive && faq.guideSlug ? 'link' : 'button'}
            aria-expanded={isActive}
            aria-controls={`faq-panel-${index}`}
            aria-label={isActive && faq.guideSlug
                ? `${faq.q}: open guide page`
                : `${faq.q}: expand card`
            }
            tabIndex={0}
            onClick={handleActivate}
            onKeyDown={onKeyDown}
            className={`relative overflow-hidden rounded-3xl cursor-pointer shadow-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50 ${isActive ? 'min-h-[280px] md:min-h-[300px]' : 'h-[92px]'}`}
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
                unoptimized
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
                {!isActive && <FAQClosedStateMobile title={faq.q} />}
                {isActive && (
                    <FAQOpenState
                        index={index}
                        fullQuestion={faq.fullQ}
                        answer={faq.a}
                        canNavigate={Boolean(faq.guideSlug)}
                    />
                )}
            </div>
        </motion.article>
    );
};