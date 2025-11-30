import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
    { href: '#destinations', label: 'Destinations' },
    { href: '#tips', label: 'Student Tips' },
    { href: '#events', label: 'Events' },
    { href: '#transport', label: 'Transport' },
];

export const ANIMATIONS = {
    header: {
        initial: { y: -100 },
        animate: { y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' as const },
    },
    logo: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, delay: 0.2 },
    },
    navigation: {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.3 },
    },
    utility: {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, delay: 0.4 },
    },
    mobileButton: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6, delay: 0.5 },
    },
} as const;