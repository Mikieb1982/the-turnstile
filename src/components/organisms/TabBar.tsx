import React from 'react';

// SVG Icons
const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 10.75 12 4l9 6.75" />
    <path d="M19 11v8a1 1 0 0 1-1 1h-3.5V15h-5v5H6a1 1 0 0 1-1-1v-8" />
  </svg>
);

const FixturesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M3 10h18" />
  </svg>
);

const TableIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 10h18" />
    <path d="M3 6h18" />
    <path d="M3 14h18" />
    <path d="M9 6v12" />
    <path d="M15 6v12" />
  </svg>
);

const ProfileIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
  </svg>
);

const AgentIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="16" rx="2" />
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
    { id: 'agent', label: 'AI Workshop', icon: AgentIcon },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-primary/15 bg-card/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`relative flex w-full flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                isActive ? 'text-primary' : 'text-foreground/60 hover:text-primary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon
                aria-hidden="true"
                className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-foreground/50'}`}
              />
              <span className="text-sm">{item.label}</span>
              <span
                className={`pointer-events-none absolute bottom-1 h-1 w-12 rounded-full bg-primary/90 transition-opacity duration-200 ${
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
