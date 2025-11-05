import type { Metadata } from 'next';
import { Roboto, Teko } from 'next/font/google'; 
import './globals.css';
import Navbar from '@/components/navbar';
import Header from '@/components/Header';

const roboto = Roboto({
  weight: ['400', '500'], 
  subsets: ['latin'],
  variable: '--font-roboto', 
});

const teko = Teko({
  weight: ['400', '500', '600', '700'], 
  subsets: ['latin'],
  variable: '--font-teko', 
});

export const metadata: Metadata = {
  title: 'The Turnstile',
  description: 'A modern, interactive, and beautifully designed turnstile application.',
  icons: '/favicon.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Add 'dark' class here for dark mode by default
    <html lang="en" className={`dark ${roboto.variable} ${teko.variable}`}> 
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      {/* Applied bg-background and text-text-primary from your new globals.css.
        This ensures all pages (including auth) have the same base style.
      */}
      <body className="font-body bg-background text-text-primary">
        <Header />
        {/* This new <main> tag creates a consistent, centered content area 
          with padding for all your pages.
        */}
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
