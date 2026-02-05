'use client';

import { useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface MobileMenuProps {
    onClose: () => void;
}

const MENU_ITEMS = [
    { 
        label: 'Destinations',
        href: '#destinations', 
        background: 'bg-[#00aeef]',
        icon: true
    },
    { 
        label: 'Events',
        href: '#events', 
        background: 'bg-[#f47b20]',
        icon: true
    },
    { 
        label: 'Transport',
        href: '#transport', 
        background: 'bg-[#7ac143]',
        icon: true
    },
];

export default function MobileMenu({ onClose }: MobileMenuProps) {
    const menuRef = useRef<HTMLElement>(null!);

    useFocusTrap({ active: true, containerRef: menuRef });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        onClose();
        
        setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }, [onClose]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                style={{ zIndex: 998 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                aria-hidden="true"
            />

            <motion.aside
                ref={menuRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 300
                }}
                role="dialog"
                aria-label="Mobile navigation"
                aria-modal="true"
                style={{ zIndex: 999 }}
                className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[420px] bg-linear-to-b from-[#2E3192] to-[#1a1d5c] shadow-2xl flex flex-col"
            >
                <div className="p-6">
                    <motion.button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/90 hover:text-white focus-visible:outline-2 focus-visible:outline-white relative z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <X className="w-6 h-6" strokeWidth={2} />
                    </motion.button>
                </div>

                <motion.div 
                    className="flex-1 flex flex-col overflow-y-auto"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.05,
                                delayChildren: 0.1
                            }
                        }
                    }}
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            href="#hero"
                            onClick={(e) => handleNavClick(e, '#hero')}
                            className="block text-white text-3xl font-oswald font-bold py-6 px-8 hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                        >
                            Home
                        </Link>
                    </motion.div>

                    {MENU_ITEMS.map((item) => (
                        <motion.div
                            key={item.href}
                            variants={{
                                hidden: { opacity: 0, x: 20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={`${item.background} text-white text-xl font-oswald font-bold py-5 px-8 flex justify-between items-center hover:brightness-110 transition-all focus-visible:outline-2 focus-visible:outline-white`}
                            >
                                <span>{item.label}</span>
                                {item.icon && <ChevronRight className="w-6 h-6" strokeWidth={2.5} />}
                            </Link>
                        </motion.div>
                    ))}

                    <div className="flex-1 min-h-8"></div>
                </motion.div>
            </motion.aside>
        </>
    );
}
