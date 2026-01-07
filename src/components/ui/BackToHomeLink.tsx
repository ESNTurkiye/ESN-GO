'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BackToHomeLink() {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // Disable global smooth scroll to ensure instant jump
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Navigate
        router.push('/#erasmus-hacks');
        
        // Re-enable after a delay to allow the jump to happen instantly
        // We use a slightly longer timeout to ensure the navigation and jump has completed
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
        }, 500);
    };

    return (
        <Link 
            href="/#erasmus-hacks" 
            onClick={handleClick}
            className="flex items-center text-esn-dark-blue hover:underline font-bold"
        >
            ← Back to home
        </Link>
    );
}
