'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '../ui/Button';

interface MobileMenuProps {
    scrolled: boolean;
    onClose: () => void;
}

export default function MobileMenu({ scrolled, onClose }: MobileMenuProps) {
    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <motion.nav
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className={`md:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg z-40 ${
                scrolled ? 'top-20' : 'top-28'
            }`}
        >
            <div className="container-responsive py-6 space-y-1">
                <motion.div variants={itemVariants}>
                    <Link
                        href="#destinations"
                        onClick={onClose}
                        className="block text-esn-dark-blue hover:text-esn-cyan font-oswald text-lg py-3 transition-all hover:translate-x-2 touch-target"
                    >
                        Destinations
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link
                        href="#tips"
                        onClick={onClose}
                        className="block text-esn-dark-blue hover:text-esn-cyan font-oswald text-lg py-3 transition-all hover:translate-x-2 touch-target"
                    >
                        Student Tips
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link
                        href="#events"
                        onClick={onClose}
                        className="block text-esn-dark-blue hover:text-esn-cyan font-oswald text-lg py-3 transition-all hover:translate-x-2 touch-target"
                    >
                        Events
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link
                        href="#transport"
                        onClick={onClose}
                        className="block text-esn-dark-blue hover:text-esn-cyan font-oswald text-lg py-3 transition-all hover:translate-x-2 touch-target"
                    >
                        Transport
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4 border-t border-gray-200">
                    <Button 
                        size="sm" 
                        variant="cyan" 
                        fullWidth 
                        onClick={onClose}
                        className="touch-target"
                        aria-label="Get your ESNcard for student discounts"
                    >
                        Get ESNcard
                    </Button>
                </motion.div>
            </div>
        </motion.nav>
    );
}

