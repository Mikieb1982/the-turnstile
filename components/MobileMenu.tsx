'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  CalendarDays,
  Trophy,
  UserCircle,
  X, // Import X icon for closing
} from 'lucide-react';

// Re-using the navLinks from your existing navbar
const navLinks = [
  { href: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/league-table', label: 'League Table', Icon: BarChart3 },
  { href: '/fixtures', label: 'Fixtures', Icon: CalendarDays },
  { href: '/achievements', label: 'Achievements', Icon: Trophy },
  { href: '/profile', label: 'Profile', Icon: UserCircle },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Drawer */}
      <div
        className="fixed left-0 top-0 z-50 h-full w-10/12 max-w-sm flex-col gap-4 bg-[#111813] p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex items-center justify-between px-2 pb-2 pt-2">
          <span className="font-display text-2xl font-semibold uppercase text-white">
            Menu
          </span>
          <button onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <ul className="flex flex-col gap-2 pt-4">
          {navLinks.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onClose} // Close menu on link click
                  className={`flex h-12 items-center gap-4 rounded-lg px-4 ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <p
                    className={`truncate text-base font-medium leading-tight ${
                      isActive ? 'font-bold' : ''
                    }`}
                  >
                    {label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
