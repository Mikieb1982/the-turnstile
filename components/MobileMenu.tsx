// components/MobileMenu.tsx
'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { usePathname } from 'next/navigation';
import { X, LogOut, User, LayoutDashboard, Trophy, Calendar, BarChart3, Shield } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Match Log', href: '/match-log', icon: Calendar },
  { name: 'League Table', href: '/league-table', icon: BarChart3 },
  { name: 'Teams', href: '/teams', icon: Shield },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                  <div className="flex h-full flex-col overflow-y-scroll bg-card shadow-xl">
                    <div className="flex h-16 items-center justify-between border-b border-surface px-4">
                      {/* UPDATE: Replaced "Menu" with logo and app name */}
                      <div className="flex items-center gap-2">
                        <Image
                          src="/logo.png"
                          alt="The Turnstile Logo"
                          width={32}
                          height={32}
                          className="h-8 w-8"
                        />
                        <Dialog.Title className="font-display text-2xl font-semibold uppercase text-text-primary">
                          The Turnstile
                        </Dialog.Title>
                      </div>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface"
                        onClick={onClose}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="flex-1 p-4">
                      <nav className="flex flex-col gap-2">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 rounded-lg px-3 py-3 font-body text-lg font-medium transition-colors ${
                              pathname === item.href
                                ? 'bg-primary text-background'
                                : 'text-text-primary hover:bg-surface'
                            }`}
                          >
                            <item.icon className="h-6 w-6" />
                            {item.name}
                          </Link>
                        ))}
                      </nav>
                    </div>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
