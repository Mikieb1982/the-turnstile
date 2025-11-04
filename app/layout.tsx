import type { Metadata } from 'next';
import { Roboto, Teko } from 'next/font/google'; // Import Teko as well
import './globals.css';
import Navbar from '@/components/navbar';

// Initialize Roboto with a CSS variable
const roboto = Roboto({
  weight: ['400', '500'], // Specify weights used in tailwind.config.ts
  subsets: ['latin'],
  variable: '--font-roboto', // Define CSS variable
});

// Initialize Teko with a CSS variable
const teko = Teko({
  weight: ['400', '500', '600', '700'], // Specify weights used in tailwind.config.ts
  subsets: ['latin'],
  variable: '--font-teko', // Define CSS variable
});

export const metadata: Metadata = {
  title: 'The Turnstile',
  description: 'A modern, interactive, and beautifully designed turnstile application.',
  icons: '/favicon.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Apply the font variables to the <html> tag
    <html lang="en" className={`${roboto.variable} ${teko.variable}`}>
      <head>
        {/*
          REMOVED the manual Google Fonts <link> for Roboto and Teko.
          next/font handles this automatically.
        */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      {/*
        The 'font-body' class from Tailwind will now work correctly
        because we are updating tailwind.config.ts to use the CSS variable.
      */}
      <body className="font-body bg-background-dark text-white">
        <main className="min-h-screen">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
