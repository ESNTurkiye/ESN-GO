import type { Metadata } from "next";
import { Lato, Oswald } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ['400', '700', '900'],
  variable: "--font-lato",
  subsets: ["latin"],
  display: 'swap',
});

const oswald = Oswald({
  weight: ['400', '600', '700'],
  variable: "--font-oswald",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ESN GO - Explore Türkiye with Erasmus Students",
  description: "ESN GO is a digital platform that enables Erasmus students visiting Türkiye to easily explore cities with features such as city guides, tour packages, favourite route saving, and student reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${lato.variable} ${oswald.variable} antialiased font-lato tracking-tight`}
      >
        {children}
      </body>
    </html>
  );
}
