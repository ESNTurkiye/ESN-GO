import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { HamburgerIcon } from './icons';
import { ANIMATIONS } from './constants';

interface MobileMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
    return (
        <motion.div {...ANIMATIONS.mobileButton}>
            <Button
                variant="icon"
                size="md"
                onClick={onClick}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className="rounded-2xl touch-target bg-white/10 text-white hover:bg-white/20"
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