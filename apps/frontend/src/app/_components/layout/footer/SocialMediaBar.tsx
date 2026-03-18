import Link from "next/link";
import { SOCIAL_LINKS } from "./constants";

const HOVER_CLASS = "hover:bg-white/20";

export const SocialMediaBar: React.FC = () => {
    return (
        <nav className="flex gap-3" aria-label="Social media links">
            {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                    <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full bg-white/10 ${HOVER_CLASS} flex items-center justify-center transition-colors`}
                        aria-label={`Follow us on ${social.name}`}
                    >
                        <Icon />
                    </Link>
                );
            })}
        </nav>
    );
};
