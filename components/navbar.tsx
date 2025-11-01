'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { href: '/league-table', label: 'League Table', icon: 'leaderboard' },
    { href: '/fixtures', label: 'Fixtures', icon: 'calendar_month' },
    { href: '/achievements', label: 'Achievements', icon: 'emoji_events' },
    { href: '/profile', label: 'Profile', icon: 'account_circle' },
];

export default function Navbar() {
    const pathname = usePathname()

    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
            <nav className="grid h-20 grid-cols-5 items-center px-2">
                {navLinks.map(({ href, label, icon }) => {
                    const isActive = pathname === href
                    return (
                        <Link
                            key={label}
                            href={href}
                            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg py-2 transition-colors ${isActive
                                ? 'font-semibold text-primary'
                                : 'text-[#9db9a7] hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className={`material-symbols-outlined !text-2xl !font-light ${isActive ? 'filled' : ''}`}>{icon}</span>
                            <span className="font-display text-base font-medium uppercase tracking-wider text-center">{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </footer>
    );
}
