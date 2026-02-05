import Link from "next/link";
import { InstagramIcon, WhatsAppIcon, TwitterIcon, LinkedInIcon } from "./icons";

interface SocialLink {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    hoverColor: string;
    ariaLabel: string;
}

const SOCIAL_LINKS: SocialLink[] = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/esnturkiye",
        icon: InstagramIcon,
        hoverColor: "hover:bg-[#EC008C]",
        ariaLabel: "Follow us on Instagram",
    },
    {
        name: "WhatsApp",
        href: "https://wa.me/your-whatsapp-number",
        icon: WhatsAppIcon,
        hoverColor: "hover:bg-[#25D366]",
        ariaLabel: "Contact us on WhatsApp",
    },
    {
        name: "Twitter",
        href: "https://x.com/ESNTurkey",
        icon: TwitterIcon,
        hoverColor: "hover:bg-black",
        ariaLabel: "Follow us on X (Twitter)",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/erasmusstudentnetwork-turkey",
        icon: LinkedInIcon,
        hoverColor: "hover:bg-[#0077B5]",
        ariaLabel: "Follow us on LinkedIn",
    },
];

export const SocialMediaBar = () => {
    return (
        <div className="flex gap-3" role="navigation" aria-label="Social media links">
            {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                    <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full bg-white/10 ${social.hoverColor} flex items-center justify-center transition-all`}
                        aria-label={social.ariaLabel}
                    >
                        <Icon />
                    </Link>
                );
            })}
        </div>
    );
};