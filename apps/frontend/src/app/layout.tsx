import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESN GO",
  description:
    "City guides for international students in Türkiye, by ESN Türkiye.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
