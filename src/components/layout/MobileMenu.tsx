'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { X, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useTranslations } from '@/hooks/useTranslations';

interface MobileMenuProps {
    onClose: () => void;
}

const MENU_ITEMS = [
    { 
        translationKey: 'nav.destinations',
        href: '/#destinations', 
        background: 'bg-[#00aeef]',
        icon: true
    },
    { 
        translationKey: 'nav.events',
        href: '/#events', 
        background: 'bg-[#f47b20]',
        icon: true
    },
    { 
        translationKey: 'nav.transport',
        href: '/#transport', 
        background: 'bg-[#7ac143]',
        icon: true
    },
    { 
        translationKey: 'nav.erasmus_hacks',
        href: '/#erasmus-hacks', 
        background: 'bg-[#ec008c]',
        icon: true
    },
];

const LANGUAGES = [
    { code: 'en', label: 'EN' },
    { code: 'tr', label: 'TR' },
] as const;

export default function MobileMenu({ onClose }: MobileMenuProps) {
    const [languageOpen, setLanguageOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const { t } = useTranslations();
    const menuRef = useRef<HTMLElement>(null!);
    const pathname = usePathname();
    const router = useRouter();

    // Focus trap for mobile menu
    useFocusTrap({ active: true, containerRef: menuRef });

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Handle escape key
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
        
        if (pathname === '/') {
            // We are on home page, just scroll
            const hash = href.includes('#') ? href.split('#')[1] : '';
            if (hash) {
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
        } else {
            // We are not on home page, navigate
            router.push(href);
        }
    }, [onClose, pathname, router]);

    const handleLanguageSelect = useCallback((langCode: 'en' | 'tr') => {
        setLanguage(langCode);
        setLanguageOpen(false);
    }, [setLanguage]);

    return (
        <>
            {/* Backdrop */}
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

            {/* Sidebar Menu */}
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
                {/* Close Button */}
                <div className="p-6">
                    <motion.button
                        onClick={onClose}
                        aria-label={t('nav.closeMenu')}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/90 hover:text-white focus-visible:outline-2 focus-visible:outline-white relative z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <X className="w-6 h-6" strokeWidth={2} />
                    </motion.button>
                </div>

                {/* Navigation Items */}
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
                    {/* Home Item */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }, 300);
                            }}
                            className="block text-white text-3xl font-oswald font-bold py-6 px-8 hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                        >
                            {t('nav.home')}
                        </Link>
                    </motion.div>

                    {/* Colored Menu Items */}
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
                                <span>{t(item.translationKey)}</span>
                                {item.icon && <ChevronRight className="w-6 h-6" strokeWidth={2.5} />}
                            </Link>
                        </motion.div>
                    ))}

                    {/* Spacer to push language selector to bottom */}
                    <div className="flex-1 min-h-8"></div>
                </motion.div>

                {/* Language Section */}
                <nav aria-label="Language selection">
                <motion.div 
                    className="px-6 pb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <button
                        onClick={() => setLanguageOpen(!languageOpen)}
                        aria-expanded={languageOpen}
                        aria-controls="language-options"
                        className="w-full flex items-center justify-between py-4 px-5 bg-white/10 rounded-xl hover:bg-white/15 transition-colors text-white focus-visible:outline-2 focus-visible:outline-white"
                    >
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5" />
                            <span className="font-lato font-medium">{t('nav.language')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-oswald font-bold text-lg">{language.toUpperCase()}</span>
                            <motion.div
                                animate={{ rotate: languageOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-5 h-5" />
                            </motion.div>
                        </div>
                    </button>

                    {/* Language Dropdown */}
                    <AnimatePresence>
                        {languageOpen && (
                            <motion.div
                                id="language-options"
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-4 gap-2">
                                    {LANGUAGES.map((lang) => (
                                        <motion.button
                                            key={lang.code}
                                            onClick={() => handleLanguageSelect(lang.code)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={`Select ${lang.label} language`}
                                            aria-pressed={language === lang.code}
                                            className={`px-3 py-3 rounded-lg font-oswald font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-white ${
                                                language === lang.code
                                                    ? 'bg-white/30'
                                                    : 'bg-white/10 hover:bg-white/20'
                                            }`}
                                        >
                                            {lang.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                </nav>
            </motion.aside>
        </>
    );
}
