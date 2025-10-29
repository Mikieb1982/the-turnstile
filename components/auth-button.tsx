'use client'

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import Link from 'next/link';
import { UserCircle, LogOut, LayoutDashboard } from 'lucide-react';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
            <UserCircle className="w-8 h-8 text-white" />
            <p className="text-white hidden md:block">Welcome, {user.displayName || user.email}</p>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 card-lifted">
              <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700">
                <UserCircle className="w-5 h-5 mr-2" />
                Your Profile
              </Link>
              <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700">
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/sign-in">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full button-glow">
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
}
