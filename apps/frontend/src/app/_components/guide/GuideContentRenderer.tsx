import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactNode } from 'react';

interface GuideContentRendererProps {
    slug: string;
    color: string;
}

function GuideTip({ children, color }: { children: ReactNode; color: string }) {
    return (
        <div
            className="relative overflow-hidden rounded-2xl"
            style={{
                background: `linear-gradient(135deg, ${color}10 0%, ${color}20 100%)`,
                border: `1px solid ${color}38`,
                boxShadow: `0 8px 28px ${color}18`,
            }}
        >
            {/* Köşe glow — guide rengiyle */}
            <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl"
                style={{ backgroundColor: `${color}28` }}
            />

            <div className="px-5 py-5 md:px-6">
                <div className="flex items-start gap-4">
                    {/* Ampul ikonu — sarı */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-6 w-6 shrink-0"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="tip-bulb-grad" x1="12" y1="4" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FEF3C7" />
                                <stop offset="0.6" stopColor="#FDE68A" />
                                <stop offset="1" stopColor="#FCD34D" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M12 4.75a5.75 5.75 0 0 0-3.78 10.08c.72.62 1.18 1.46 1.28 2.36h5c.1-.9.56-1.74 1.28-2.36A5.75 5.75 0 0 0 12 4.75Z"
                            fill="url(#tip-bulb-grad)"
                            stroke="#FBBF24"
                            strokeWidth="1.4"
                        />
                        <path d="M9.7 18.15h4.6" stroke="#FBBF24" strokeWidth="1.4" />
                        <path d="M10.35 20.15h3.3" stroke="#FBBF24" strokeWidth="1.4" />
                        <path d="M12 7.4v3.2" stroke="#FFFBEB" strokeWidth="1.2" />
                        <path d="M10.4 9h3.2" stroke="#FFFBEB" strokeWidth="1.2" />
                    </svg>

                    <div className="min-w-0">
                        {/* Pill etiket — guide'ın rengiyle */}
                        <span
                            className="mb-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-oswald text-[11px] font-bold uppercase tracking-[0.22em]"
                            style={{
                                backgroundColor: `${color}18`,
                                color: color,
                                boxShadow: `0 0 0 1px ${color}45`,
                            }}
                        >
                            <span aria-hidden="true">✦</span>
                            Local Buddy Tip
                        </span>
                        <div className="font-lato text-sm leading-relaxed text-gray-700 md:text-[15px]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

async function getGuideSource(slug: string) {
    const filePath = path.join(process.cwd(), 'content', 'guide', `${slug}.mdx`);
    return readFile(filePath, 'utf8');
}

export default async function GuideContentRenderer({ slug, color }: GuideContentRendererProps) {
    const source = await getGuideSource(slug);
    const { content } = await compileMDX({
        source,
        components: {
            h2: ({ children }) => (
                <h2 className="mt-10 font-oswald text-2xl font-bold text-esn-dark-blue first:mt-0 md:text-3xl">
                    {children}
                </h2>
            ),
            h3: ({ children }) => (
                <h3 className="mt-8 font-oswald text-xl font-bold text-esn-dark-blue md:text-2xl">
                    {children}
                </h3>
            ),
            p: ({ children }) => (
                <p className="font-lato text-base leading-relaxed text-gray-600 md:text-lg">{children}</p>
            ),
            ul: ({ children }) => <ul className="space-y-3 pl-1">{children}</ul>,
            li: ({ children }) => (
                <li className="flex items-start gap-3 font-lato text-base text-gray-600">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                    <span className="leading-relaxed">{children}</span>
                </li>
            ),
            a: ({ children, href }) => (
                <a href={href} className="font-semibold text-esn-dark-blue underline underline-offset-4 transition-colors hover:text-esn-cyan">
                    {children}
                </a>
            ),
            GuideTip: ({ children }) => <GuideTip color={color}>{children}</GuideTip>,
        },
        options: {
            parseFrontmatter: false,
        },
    });

    return <div className="space-y-6">{content}</div>;
}
