'use client';

import Button from '../../ui/Button';
import { SearchIcon } from './icons';

export const UtilityBar = () => {
    return (
        <div className="hidden md:flex items-center space-x-6">
            <Button
                variant="icon"
                size="md"
                aria-label="Search destinations and events"
                className="text-white hover:text-esn-cyan"
            >
                <SearchIcon />
            </Button>

            <Button size="sm" variant="cyan" aria-label="Get your ESNcard for student discounts">
                Get ESNcard
            </Button>
        </div>
    );
};