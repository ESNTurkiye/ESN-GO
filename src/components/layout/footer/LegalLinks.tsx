import Link from "next/link";
import { LEGAL_LINKS, COPYRIGHT_TEXT } from "./constants";

export const LegalLinks = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/60 font-lato">
            <div className="text-center md:text-left">
                {COPYRIGHT_TEXT}
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4" aria-label="Legal and policy links">
                {LEGAL_LINKS.map((link, index) => (
                    <span key={index}>
                        <Link href={link.href} className="hover:text-white transition-colors touch-target py-1">
                            {link.text}
                        </Link>
                        {index < LEGAL_LINKS.length - 1 && (
                            <span className="hidden sm:inline ml-3 sm:ml-4" aria-hidden="true">•</span>
                        )}
                    </span>
                ))}
            </nav>
        </div>
    );
};