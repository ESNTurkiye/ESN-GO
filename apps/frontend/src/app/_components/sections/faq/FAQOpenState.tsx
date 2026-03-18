import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface FAQOpenStateProps {
    index: number;
    fullQuestion: string;
    answer: string;
    canNavigate: boolean;
}

export const FAQOpenState = ({
    index,
    fullQuestion,
    answer,
    isDesktop,
    guideSlug,
}: FAQOpenStateProps) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="space-y-3 md:space-y-4 text-left w-full"
            >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-1">
                    <span className="font-oswald text-xl md:text-2xl font-bold">
                        0{index + 1}
                    </span>
                </div>

                <h3 className="font-oswald font-bold text-2xl md:text-4xl leading-none ">
                    {fullQuestion}
                </h3>

                <p className="font-lato text-white/90 text-sm md:text-lg leading-relaxed max-w-lg">
                    {answer}
                </p>

                <div className="pt-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 font-oswald text-xs font-bold tracking-wide text-black shadow-md md:text-sm">
                        Read Guide
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M4 10h12" />
                            <path d="m10 4 6 6-6 6" />
                        </svg>
                    </span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
