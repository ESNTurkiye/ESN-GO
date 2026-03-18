'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function GuidePageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        >
            {children}
        </motion.div>
    );
}
