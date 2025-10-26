'use client';

import Link from 'next/link';
import { useAuth } from '../lib/auth';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          The Turnstile
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.displayName || user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
