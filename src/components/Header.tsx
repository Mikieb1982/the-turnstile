
'use client';

import Login from './Login';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-muted bg-surface/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-bold">Fan Zone</h1>
        <Login />
      </div>
    </header>
  );
};

export default Header;
