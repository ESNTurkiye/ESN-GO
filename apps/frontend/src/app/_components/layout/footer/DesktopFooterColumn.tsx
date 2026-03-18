import Link from "next/link";
import type { FooterColumn } from "./types";

interface DesktopFooterColumnProps {
    column: FooterColumn;
}

export const DesktopFooterColumn = ({ column }: DesktopFooterColumnProps) => {
    return (
        <div className="flex flex-col gap-1">
            <h4 className="font-oswald font-bold text-base sm:text-lg text-white tracking-wide">
                {column.title}
            </h4>
            <ul className="space-y-1 text-white/70 font-lato text-sm">
                {column.links.map((link) => (
                    <li key={`${column.title}-${link.text}-${link.href}`}>
                        <Link
                            href={link.href}
                            className="hover:text-esn-magenta transition-colors touch-target block py-1"
                        >
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
