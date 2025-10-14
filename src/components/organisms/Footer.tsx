import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} The Turnstile. Built for rugby league die-hards.</p>
          <div className="flex items-center space-x-4">
            <a href="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="/terms" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-600">•</span>
            <a href="mailto:hello@turnstile.app" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};