import type { Metadata } from "next";
import { Roboto } from "next/font/google";
// ...
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the weights you need
  variable: "--font-inter", // Keep the variable name the same for simplicity
});
import type { ReactNode } from "react";
import "./globals.css";
import { SentryErrorBoundary } from "./SentryErrorBoundary";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
        The hardcoded dark-mode classes (`bg-slate-950`, `text-slate-100`) have been removed.
        Styling is now fully controlled by your dynamic theme system (via the `useTheme` hook)
        and the base styles defined in `globals.css`.
      */}
      <body className={`${inter.variable} h-full font-sans antialiased`}>
        {/*
          The static <header>, <main>, and <footer> elements have been removed from this file.
          Your main application component (loaded via page.tsx) is now responsible for rendering the
          entire page layout. This fixes the issue of having duplicate headers and allows
          the dynamic theme to apply correctly to the whole UI.
        */}
        <SentryErrorBoundary>{children}</SentryErrorBoundary>
      </body>
    </html>
  );
}
