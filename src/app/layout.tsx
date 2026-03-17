import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import { GTMHead, GTMBody } from "@/components/layout/GoogleTagManager";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Indicus Paints - Premium Paints & Coatings",
    template: "%s | Indicus Paints",
  },
  description:
    "Explore premium paints and coatings for walls, metals, woods, terraces, and ceilings. Interior, exterior, enamel, and specialty coatings by Indicus.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://indicus.in"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Indicus Paints",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GTMHead />
      </head>
      <body className="antialiased">
        <GTMBody />
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
