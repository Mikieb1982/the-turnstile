
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Fixtures' },
  { href: '/table', label: 'Table' },
  { href: '/log', label: 'Log' },
  { href: '/stats', label: 'Stats' },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-40 block w-full border-t border-surface-muted bg-surface/90 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 items-center justify-around px-4">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className={`${isActive ? 'text-primary' : 'text-text-muted'} flex flex-col items-center gap-1 text-xs`}>
                <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
