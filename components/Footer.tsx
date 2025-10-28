export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.27 0 .34.04.67.11.98-3.56-.18-6.72-1.88-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.48.75 2.79 1.9 3.55-.7-.02-1.37-.22-1.95-.55v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.7 2.1 2.93 3.96 2.96-1.46 1.14-3.3 1.82-5.3 1.82-.34 0-.68-.02-1.02-.06 1.9 1.22 4.15 1.93 6.56 1.93 7.88 0 12.2-6.52 12.2-12.2 0-.18 0-.37-.01-.55.84-.6 1.56-1.36 2.14-2.22z" />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
        </div>
        <p>&copy; 2024 The Turnstile. All rights reserved.</p>
      </div>
    </footer>
  );
}
