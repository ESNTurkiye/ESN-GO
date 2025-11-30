import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { SearchIcon, LanguageIcon } from './icons';
import { ANIMATIONS } from './constants';

interface UtilityBarProps {
    scrolled: boolean;
}

export const UtilityBar = ({ scrolled }: UtilityBarProps) => {
    return (
        <motion.div
            {...ANIMATIONS.utility}
            className="hidden md:flex items-center space-x-6"
        >
            <Button
                variant="icon"
                size="md"
                aria-label="Search destinations and events"
                className={scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'}
            >
                <SearchIcon />
            </Button>
            <Button
                variant="icon"
                size="md"
                aria-label="Change language"
                className={scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'}
            >
                <LanguageIcon />
            </Button>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-all duration-500 ${
                    scrolled ? 'scale-95' : 'scale-100'
                }`}
            >
                <Button size="sm" variant="cyan" aria-label="Get your ESNcard for student discounts">
                    Get ESNcard
                </Button>
            </motion.div>
        </motion.div>
    );
};