// components/MobileMenu.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  X,
  LogOut,
  UserCircle,
  LayoutDashboard,
  Trophy,
  CalendarDays,
  BarChart3,
  Shield,
  Info, // <-- Icon is correctly imported
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'League Table', href: '/league-table', icon: BarChart3 },
  { name: 'Fixtures', href: '/fixtures', icon: CalendarDays },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Profile', href: '/profile', icon: UserCircle },
  { name: 'Match Log', href: '/match-log', icon: CalendarDays },
  { name: 'Teams', href: '/teams', icon: Shield },
  { name: 'About Us', href: '/about', icon: Info }, // <-- Link is correctly added
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Add effect to prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-30 flex w-screen max-w-sm transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full w-full flex-col overflow-y-scroll bg-card shadow-xl">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-surface px-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="The Turnstile Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <h2 className="font-display text-2xl font-semibold uppercase text-text-primary">
                The Turnstile
              </h2>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="flex flex-col gap-2">
              {navigation.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 font-body text-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-background'
                        : 'text-text-primary hover:bg-surface'
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                    {item.name}
                  </Link> // <-- THIS IS THE FIX
                );
              })}
            </nav>
          </div>

          {/* Footer / Sign Out */}
          <div className="border-t border-surface p-4">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 font-body text-lg font-medium text-red-500 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-6 w-6" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
