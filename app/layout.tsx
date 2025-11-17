// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/firebase/AuthContext';
import BottomNav from '@/components/BottomNav';

const inter = Inter({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
});

const bebas_neue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas-neue',
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
    <html lang="en" className={`${inter.variable} ${bebas_neue.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="bg-primary-dark font-body text-text-primary">
        <AuthProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
