'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">The Turnstile</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="px-4">Home</a>
          <a href="#" className="px-4">Matches</a>
          <a href="#" className="px-4">Profile</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-800 bg-opacity-90">
          <a href="#" className="block px-4 py-2">Home</a>
          <a href="#" className="block px-4 py-2">Matches</a>
          <a href="#" className="block px-4 py-2">Profile</a>
        </div>
      )}
    </header>
  );
}
