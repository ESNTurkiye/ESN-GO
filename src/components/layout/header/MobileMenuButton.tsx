import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { HamburgerIcon } from './icons';
import { ANIMATIONS } from './constants';

interface MobileMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
    scrolled: boolean;
}

export const MobileMenuButton = ({ isOpen, onClick, scrolled }: MobileMenuButtonProps) => {
    return (
        <motion.div {...ANIMATIONS.mobileButton}>
            <Button
                variant="icon"
                size="md"
                onClick={onClick}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className={`md:hidden fixed right-4 sm:right-6 top-6 z-1000 rounded-2xl touch-target ${
                    scrolled
                        ? 'bg-esn-dark-blue/10 text-esn-dark-blue hover:bg-esn-dark-blue/20'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
            >
                <motion.div
                    animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <HamburgerIcon isOpen={isOpen} />
                </motion.div>
            </Button>
        </motion.div>
    );
};