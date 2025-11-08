// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Header from '@/components/Header';
import { AuthProvider } from '@/lib/firebase/AuthContext';
import Image from 'next/image'; // <-- Import Image

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
    <html lang="en" className={`dark ${inter.variable} ${bebas_neue.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background text-text-primary">
        
        {/* Opaque Logo Background */}
        <Image
          src="/logo.png"
          alt="Logo watermark"
          fill
          className="fixed inset-0 z-0 object-contain object-center opacity-[0.03] p-20 pointer-events-none" // z-0, 3% opacity, padded, non-interactive
          priority
        />

        <AuthProvider>
          {/* Added a relative wrapper to ensure content stacks above the fixed z-0 image */}
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
            <Navbar />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
