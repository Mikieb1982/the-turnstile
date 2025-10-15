import React from 'react';

// SVG Icons
const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
  </svg>
);

const FixturesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TableIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const ProfileIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const AgentIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
    <path d="M7 9h10" />
    <path d="M7 13h6" />
    <circle cx="9" cy="17" r="1" />
    <circle cx="12" cy="17" r="1" />
    <circle cx="15" cy="17" r="1" />
  </svg>
);

interface TabBarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'fixtures', label: 'Fixtures', icon: FixturesIcon },
    { id: 'table', label: 'Table', icon: TableIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
    { id: 'agent', label: 'AI Builder', icon: AgentIcon },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#1f3424]/70 bg-[#050d08]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl" aria-label="Primary Navigation">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`relative flex w-full flex-col items-center justify-center gap-1 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive ? 'text-[#f6f3e4]' : 'text-[#8ea18d] hover:text-[#d4af37]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon
                className={`h-6 w-6 ${
                  isActive
                    ? 'text-[#d4af37] drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]'
                    : 'text-[#9fb09c]'
                }`}
              />
              <span>{item.label}</span>
              <span
                className={`pointer-events-none absolute inset-x-6 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </footer>
  );
};
