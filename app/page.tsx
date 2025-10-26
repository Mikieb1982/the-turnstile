'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { teams, Team } from './data';
import SkeletonCard from './components/SkeletonCard';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState<Team[]>([]);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setTeamData(teams);
      setLoading(false);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          NRL Teams
        </h1>
        <p className="text-gray-400 mt-2">A showcase of the National Rugby League teams.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : teamData.map((team) => (
              <div
                key={team.name}
                className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div>
                <div className="p-6 flex flex-col items-center justify-center relative z-10">
                  <Image src={team.logo} alt={`${team.name} logo`} width={96} height={96} className="object-contain mb-4" />
                  <h2 className="text-2xl font-bold text-center">{team.name}</h2>
                </div>
              </div>
            ))}
      </div>
      <footer className="text-center mt-12 text-gray-500">
        <p>Built with Next.js and Tailwind CSS</p>
      </footer>
    </main>
  );
}
