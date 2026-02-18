import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FAQOpenStateProps {
    index: number;
    slug: string;
    fullQuestion: string;
    answer: string;
    isDesktop: boolean;
}

export const FAQOpenState = ({ index, slug, fullQuestion, answer, isDesktop }: FAQOpenStateProps) => {
    return (
        <AnimatePresence mode={isDesktop ? "wait" : undefined}>
            <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-3 md:space-y-4 text-left w-full"
            >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-1">
                    <span className="font-oswald text-xl md:text-2xl font-bold">0{index + 1}</span>
                </div>

                <h3 className="font-oswald font-bold text-2xl md:text-4xl leading-none ">
                    {fullQuestion}
                </h3>

                <p className="font-lato text-white/90 text-sm md:text-lg leading-relaxed max-w-lg">
                    {answer}
                </p>

                <div className="pt-2">
                    <Link
                        href={`/guide/${slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block px-5 py-2 bg-white text-black font-bold font-oswald rounded-full text-xs md:text-sm tracking-wide hover:bg-gray-100 transition-colors shadow-md"
                    >
                        Read Guide
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};