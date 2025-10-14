import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-900 sticky top-0 z-10 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
      <img 
  src="/logodark.png" 
  alt="The Turnstile Logo" 
  className="h-12 w-12 object-contain"
/>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">The Turnstile</h1>
            <p className="text-xs text-gray-400">Track Your Journey</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400 font-semibold text-sm hover:border-cyan-500 transition-colors cursor-pointer">
          👤
        </div>
      </div>
    </header>
  );
};