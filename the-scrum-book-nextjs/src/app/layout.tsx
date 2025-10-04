import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/league-table", label: "League Table" },
];

export const metadata: Metadata = {
  title: "The Scrum Book",
  description: "Your ultimate rugby league companion for fixtures, stats, and matchday planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-950">
      <body className={`${inter.variable} h-full bg-slate-950 text-slate-100 antialiased`}> 
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.35),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(6,182,212,0.25),_transparent_55%)]" aria-hidden="true" />
          <div className="relative flex min-h-screen flex-col">
            <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                  <div className="rounded-full bg-sky-500/20 px-3 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
                    Scrum Book
                  </div>
                  <div className="hidden flex-col text-left sm:flex">
                    <span className="text-sm font-semibold text-slate-200">Your Rugby League Companion</span>
                    <span className="text-xs text-slate-400">Track fixtures, grounds, badges &amp; more.</span>
                  </div>
                </Link>
                <nav className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
                  {primaryNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800/70 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center gap-3">
                  <Link
                    href="/league-table"
                    className="rounded-full border border-sky-400/40 bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-100 shadow-lg shadow-sky-900/40 transition-colors hover:border-sky-400 hover:bg-sky-500/30"
                  >
                    View Standings
                  </Link>
                </div>
              </div>
            </header>
            <div className="border-b border-white/5 bg-slate-950/60 py-3 text-sm text-slate-300 md:hidden">
              <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 sm:px-6">
                {primaryNavigation.map((item) => (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className="rounded-full bg-slate-800/70 px-4 py-2 transition-colors hover:bg-slate-700 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <main className="flex-1">
              <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_60px_-25px_rgba(15,118,110,0.65)] backdrop-blur md:p-10">
                  {children}
                </div>
              </div>
            </main>
            <footer className="border-t border-white/10 bg-slate-950/80">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div>
                  <p className="font-semibold text-slate-200">The Scrum Book</p>
                  <p className="text-xs text-slate-400">Built for dedicated rugby league fans everywhere.</p>
                </div>
                <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} The Scrum Book. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
