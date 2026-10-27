import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const display = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-event-display",
    display: "swap",
});

const body = Inter({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-event-body",
    display: "swap",
});

export default function EventSlugLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${display.variable} ${body.variable}`}>
            {children}
        </div>
    );
}
