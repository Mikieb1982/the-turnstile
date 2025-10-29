'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from '@/components/auth-button';
import { BarChart, Badge, Plane } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { href: '/dashboard', label: 'Dashboard', icon: <BarChart /> },
  { href: '/match-log', label: 'Match Log', icon: <Badge /> },
  { href: '/achievements', label: 'Achievements', icon: <Plane /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-2xl font-bold text-green-400">
          The Turnstile
        </Link>
        <div className="hidden md:flex items-center space-x-4">
        {navLinks.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
        </div>
      </div>
      <div className="flex items-center">
        <div className="md:hidden">
          {/* Mobile menu button will go here */}
        </div>
        <div className="hidden md:block">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
