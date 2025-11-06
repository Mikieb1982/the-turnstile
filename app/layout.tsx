// app/layout.tsx
import type { Metadata } from 'next';
import { Roboto, Teko } from 'next/font/google'; 
import './globals.css';
import Navbar from '@/components/navbar';
import Header from '@/components/Header';
import { AuthProvider } from '@/lib/firebase/auth'; // <-- IMPORT THE PROVIDER

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
  // UPDATE: Refined description
  description: 'Your ultimate companion for tracking every Super League match you attend. Log your history, unlock achievements, and view your stats.',
  icons: '/favicon.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${roboto.variable} ${teko.variable}`}> 
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-text-primary">
        {/* WRAP THE APP IN THE PROVIDER */}
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
