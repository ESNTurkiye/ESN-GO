import Button from '../../ui/Button';
import { HamburgerIcon } from './icons';

interface MobileMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
    return (
        <div>
            <Button
                variant="icon"
                size="md"
                onClick={onClick}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className="rounded-2xl touch-target bg-white/10 text-white hover:bg-white/20"
            >
                <span className={`inline-block transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                    <HamburgerIcon isOpen={isOpen} />
                </span>
            </Button>
        </div>
    );
};