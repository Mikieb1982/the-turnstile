// app/layout.tsx
import type { Metadata } from 'next';
import { Roboto, Teko } from 'next/font/google'; 
import './globals.css';
import Navbar from '@/components/navbar';
import Header from '@/components/Header';
import { AuthProvider } from '@/lib/firebase/auth';

// Roboto for body text - clean and readable
const roboto = Roboto({
  weight: ['400', '500', '700'], // Added bold weight for emphasis
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap', // Better performance
});

// Teko for display/headings - bold and sporty
const teko = Teko({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-teko',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Turnstile | Rugby League Matchday Passport',
  description: 'Track your Rugby League journey. Log matches, collect stamps, and celebrate your fan dedication.',
  icons: '/favicon.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${roboto.variable} ${teko.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-text-primary antialiased">
        <AuthProvider>
          <Header />
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Navbar />
        </AuthProvider>
      </body>
    </html>
  );
}
