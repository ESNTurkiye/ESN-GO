import Link from "next/link";
import Button from "../../ui/Button";
import { FooterColumn } from "./types";
import { ChevronDownIcon } from "./icons";

interface MobileFooterColumnProps {
    column: FooterColumn;
    isOpen: boolean;
    onToggle: () => void;
}

export const MobileFooterColumn = ({ column, isOpen, onToggle }: MobileFooterColumnProps) => {
    return (
        <div className="border-b border-white/10">
            <Button
                onClick={onToggle}
                variant="ghost"
                className="w-full flex items-center justify-between py-4 text-left rounded-none! hover:text-white!"
                aria-expanded={isOpen}
            >
                <h4 className="font-oswald font-bold text-base  text-white tracking-wide">
                    {column.title}
                </h4>
                <ChevronDownIcon
                    className={`w-5 h-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </Button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 pb-4' : 'max-h-0'
                }`}
            >
                <ul className="space-y-3 text-white/70 font-lato text-sm">
                    {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                            <Link href={link.href} className="hover:text-esn-magenta transition-colors block py-1">
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};