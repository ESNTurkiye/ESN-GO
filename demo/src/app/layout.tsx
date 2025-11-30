import type { Metadata } from "next";
import { Lato, Oswald } from "next/font/google";
import "./globals.css";

// ESN Typography: Lato for body, Oswald as fallback for Kelson Sans
const lato = Lato({
  weight: ['400', '700', '900'],
  variable: "--font-lato",
  subsets: ["latin"],
  display: 'swap', // Optimized font loading
});

const oswald = Oswald({
  weight: ['400', '600', '700'],
  variable: "--font-oswald",
  subsets: ["latin"],
  display: 'swap', // Optimized font loading
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
    <html lang="en">
      <body
        className={`${lato.variable} ${oswald.variable} antialiased font-lato tracking-tight`}
      >
        {children}
      </body>
    </html>
  );
}
