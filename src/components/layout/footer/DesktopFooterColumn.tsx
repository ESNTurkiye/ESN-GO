import Link from "next/link";
import { FooterColumn } from "./types";

interface DesktopFooterColumnProps {
    column: FooterColumn;
}

export const DesktopFooterColumn = ({ column }: DesktopFooterColumnProps) => {
    return (
        <div>
            <h4 className="font-oswald font-bold text-base sm:text-lg mb-3 sm:mb-4  text-white tracking-wide">
                {column.title}
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-white/70 font-lato text-sm">
                {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                        <Link href={link.href} className="hover:text-esn-magenta transition-colors touch-target block py-1">
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};