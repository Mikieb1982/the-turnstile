import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">The Turnstile</h1>
        <p className="text-xl mb-8">A modern, interactive, and beautifully designed turnstile application.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center transition duration-300">
          Enter <ArrowRight className="ml-2" />
        </button>
      </div>
    </main>
  );
}
