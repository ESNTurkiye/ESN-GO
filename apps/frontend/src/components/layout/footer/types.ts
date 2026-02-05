export interface FooterLink {
    text: string;
    href: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface SocialMediaLink {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    hoverColor: string;
    ariaLabel: string;
}