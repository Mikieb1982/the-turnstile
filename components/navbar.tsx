'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  BarChart3,
  CalendarDays,
  Trophy,
  UserCircle
} from 'lucide-react';

const navLinks = [
    { href: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { href: '/league-table', label: 'League Table', Icon: BarChart3 },
    { href: '/fixtures', label: 'Fixtures', Icon: CalendarDays },
    { href: '/achievements', label: 'Achievements', Icon: Trophy },
    { href: '/profile', label: 'Profile', Icon: UserCircle },
];

export default function Navbar() {
    const pathname = usePathname()

    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
            <nav className="grid h-20 grid-cols-5 items-center px-2">
                {navLinks.map(({ href, label, Icon }) => {
                    const isActive = pathname === href || (href === '/league-table' && pathname === '/results');
                    return (
                        <Link
                            key={label}
                            href={href}
                            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg py-2 transition-colors ${isActive
                                ? 'font-semibold text-primary'
                                : 'text-[#9db9a7] hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                            <span className="font-display text-base font-medium uppercase tracking-wider text-center">{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </footer>
    );
}
