import Link from 'next/link';
import { motion } from 'framer-motion';
import ESNTurkiyeLogo from '../../logos/ESNTurkiyeLogo';
import { ANIMATIONS } from './constants';

interface LogoSectionProps {
    scrolled: boolean;
}

export const LogoSection = ({ scrolled }: LogoSectionProps) => {
    return (
        <motion.div {...ANIMATIONS.logo}>
            <Link
                href="/"
                className={`flex items-center transition-all duration-700 ease-out ${
                    scrolled ? 'scale-95' : 'scale-110'
                }`}
            >
                <ESNTurkiyeLogo isScrolled={scrolled} />
            </Link>
        </motion.div>
    );
};