// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google'; // Changed imports
import './globals.css';
import Navbar from '@/components/navbar';
import Header from '@/components/Header';
import { AuthProvider } from '@/lib/firebase/AuthContext';

// Updated body font to Inter
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Updated display font to Bebas Neue
const bebas_neue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Turnstile',
  description:
    'Your ultimate companion for tracking every Super League match you attend. Log your history, unlock achievements, and view your stats.',
  icons: '/favicon.png',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Updated font variables in className
    <html lang="en" className={`dark ${inter.variable} ${bebas_neue.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background text-text-primary">
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
