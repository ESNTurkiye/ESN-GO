import Link from 'next/link';
import { motion } from 'framer-motion';
import ESNTurkiyeLogo from '../../logos/ESNTurkiyeLogo';
import { ANIMATIONS } from './constants';

interface LogoSectionProps {
    scrolled: boolean;
    isMobile?: boolean;
}

export const LogoSection = ({ scrolled, isMobile = false }: LogoSectionProps) => {
    return (
        <motion.div {...ANIMATIONS.logo}>
            <Link
                href="/"
                className="flex items-center"
            >
                <ESNTurkiyeLogo isScrolled={scrolled} isMobile={isMobile} />
            </Link>
        </motion.div>
    );
};