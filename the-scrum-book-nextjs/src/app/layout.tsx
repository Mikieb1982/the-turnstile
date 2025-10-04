import type { Metadata } from "next";
import { Roboto, Barlow_Condensed } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SentryErrorBoundary } from "./SentryErrorBoundary";

// Initialize Roboto with a more descriptive variable name
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto", // Changed from --font-inter for clarity
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "The Scrum Book",
  description:
    "Your ultimate rugby league companion for fixtures, stats, and matchday planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${roboto.variable} ${barlowCondensed.variable} h-full font-sans antialiased`}>
        <SentryErrorBoundary>{children}</SentryErrorBoundary>
      </body>
    </html>
  );
}
