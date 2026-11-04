import type { Metadata } from "next";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "@/styles/tokens.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header/SiteHeader";

export const metadata: Metadata = {
  title: { default: "ESN GO", template: "%s · ESN GO" },
  description:
    "City guides for international students in Türkiye, by ESN Türkiye.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
