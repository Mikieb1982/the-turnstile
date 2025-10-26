'use client';

import './globals.css';
import { AuthProvider } from '../lib/auth';
import Header from '../components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-gray-900 text-white">
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
