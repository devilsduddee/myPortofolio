import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: {
    default: "Portofolio Ahmad Ridho Syafaat",
    template: "%s | Ahmad Ridho Syafaat"
  },
  description: "Data Analyst • Product Thinker • Builder. Professional portfolio showcasing data-driven projects, product management experience, and technical builds.",
  openGraph: {
    title: 'Ahmad Ridho Syafaat | Portfolio',
    description: 'Data Analyst • Product Thinker • Builder',
    url: 'https://ahmadridho.com',
    siteName: 'Ahmad Ridho Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmad Ridho Syafaat | Portfolio',
    description: 'Data Analyst • Product Thinker • Builder',
  },
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
