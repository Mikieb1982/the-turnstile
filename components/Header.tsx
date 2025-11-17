// components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { usePathname } from 'next/navigation';

// Helper function to get the title based on the path
const getTitle = (path: string) => {
  if (path.startsWith('/achievements')) return 'Achievements';
  if (path.startsWith('/fixtures')) return 'Fixtures';
  if (path.startsWith('/dashboard')) return 'The Turnstile';
  if (path.startsWith('/league-table')) return 'League Table';
  if (path.startsWith('/profile')) return 'Profile';
  if (path.startsWith('/match-log')) return 'Match Log';
  if (path.startsWith('/teams')) return 'Teams';
  return 'The Turnstile';
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const title = getTitle(pathname);

  // Don't show header on auth pages or landing page
  if (pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up') {
    return null;
  }

  return (
    <>
      {/* MODIFICATION:
        - Changed 'fixed bottom-0' to 'sticky top-0' to pin it to the top.
        - Changed 'border-t' to 'border-b' for a top bar.
      */}
      <header className="sticky top-0 left-0 right-0 z-20 flex h-16 items-center justify-between border-b border-surface bg-card/80 px-4 backdrop-blur-sm md:hidden">
        <Link className="flex items-center gap-2" href="/dashboard">
          <Image
            src="/logo.png"
            alt="The Turnstile Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wider text-text-primary">
            {title}
          </h2>
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
