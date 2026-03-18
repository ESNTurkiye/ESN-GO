import { motion } from 'framer-motion';

export const FAQClosedStateMobile = ({ title }: { title: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between h-full w-full"
        >
            <h3 className="font-oswald font-bold text-xl md:text-2xl  tracking-wide select-none">
                {title}
            </h3>
            <div className="bg-white/20 p-1.5 md:p-2 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </motion.div>
    );
};