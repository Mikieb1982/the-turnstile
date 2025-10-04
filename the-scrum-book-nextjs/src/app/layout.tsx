import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SentryErrorBoundary } from "./SentryErrorBoundary";

// Initialize Roboto, keeping the CSS variable name the same for simplicity
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the weights you need
  variable: "--font-inter",
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
    // The `suppressHydrationWarning` is added because the theme class (light/dark)
    // is added on the client, which can cause a mismatch with the server-rendered HTML.
    <html lang="en" className="h-full" suppressHydrationWarning>
      {/*
        The hardcoded dark-mode classes have been removed. Styling is now fully
        controlled by your dynamic theme system and globals.css.
      */}
      <body className={`${roboto.variable} h-full font-sans antialiased`}>
        {/*
          The static layout elements have been removed. Your main application component
          (page.tsx) now controls the entire page layout.
        */}
        <SentryErrorBoundary>{children}</SentryErrorBoundary>
      </body>
    </html>
  );
}

