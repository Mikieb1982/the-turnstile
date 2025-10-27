import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './atoms/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Navbar: React.FC = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold text-lg text-gray-800">
          <img src="/logo.png" alt="The Turnstile Logo" className="h-8 w-8" />
          The Turnstile
        </a>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 transition-opacity hover:opacity-80">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={currentUser.photoURL ?? undefined} alt={currentUser.displayName ?? ''} />
                    <AvatarFallback>{currentUser.displayName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-semibold text-gray-800">{currentUser.displayName}</p>
                    <p className="text-xs text-gray-500">View profile</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/settings">Settings</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-500">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <a href="/login">Sign In</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
