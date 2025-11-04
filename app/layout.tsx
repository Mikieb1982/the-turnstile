import type { Metadata } from 'next';
import { Roboto, Teko } from 'next/font/google'; 
import './globals.css';
import Navbar from '@/components/navbar';
import Header from '@/components/Header'; // 1. Import the new Header

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
    <html lang="en" className={`${roboto.variable} ${teko.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className="font-body bg-background-dark text-white">
        <Header /> {/* 2. Add the Header here */}
        <main className="min-h-screen">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
