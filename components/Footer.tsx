
import { Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-gray-400">
            <Twitter />
          </a>
          <a href="#" className="hover:text-gray-400">
            <Instagram />
          </a>
          <a href="#" className="hover:text-gray-400">
            <Facebook />
          </a>
        </div>
        <p>&copy; 2024 The Turnstile. All rights reserved.</p>
      </div>
    </footer>
  );
}
