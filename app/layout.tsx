import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Turnstile',
  description: 'A modern, interactive, and beautifully designed turnstile application.',
  icons: '/favicon.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&family=Roboto:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${roboto.className} font-body bg-background-dark text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
