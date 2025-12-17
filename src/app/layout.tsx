import type { Metadata } from "next";
import { Lato, Oswald } from "next/font/google";
import "./globals.css";
import SkipToContent from "@/components/layout/SkipToContent";
import { LanguageProvider } from "@/contexts/LanguageContext";

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

import { createMetadata, generateStructuredData } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${lato.variable} ${oswald.variable} antialiased font-lato tracking-tight`}
      >
        <LanguageProvider>
          <SkipToContent />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}