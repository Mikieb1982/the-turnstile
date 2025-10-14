import React, { useState } from 'react';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { TabBar } from './components/organisms/TabBar';
import { DashboardPage } from './components/pages/DashboardPage';
import { FixturesPage } from './components/pages/FixturesPage';
import { LeagueTablePage } from './components/pages/LeagueTablePage';
import { ProfilePage } from './components/pages/ProfilePage';

// Mock Data
const mockUserData = {
  stats: {
    matchesAttended: 12,
    stadiumsVisited: 5,
    badgesEarned: 3,
  },
};

const mockNextMatch = {
  id: 1,
  homeTeam: 'Team Phoenix',
  awayTeam: 'Team Lion',
  date: '2025-10-28T19:30:00',
  stadium: 'National Stadium',
  homeLogo: 'https://placehold.co/64x64/06b6d4/FFFFFF?text=P',
  awayLogo: 'https://placehold.co/64x64/f43f5e/FFFFFF?text=L',
};

const mockFixtures = [
  { 
    id: 1, 
    homeTeam: 'St Helens', 
    awayTeam: 'Wigan Warriors', 
    date: '2025-11-18T19:45:00', 
    homeLogo: 'https://placehold.co/64x64/E63946/FFFFFF?text=SH', 
    awayLogo: 'https://placehold.co/64x64/A8202D/FFFFFF?text=WW' 
  },
  { 
    id: 2, 
    homeTeam: 'Leeds Rhinos', 
    awayTeam: 'Castleford Tigers', 
    date: '2025-11-19T15:00:00', 
    homeLogo: 'https://placehold.co/64x64/005596/FFFFFF?text=LR', 
    awayLogo: 'https://placehold.co/64x64/F47C20/FFFFFF?text=CT' 
  },
  { 
    id: 3, 
    homeTeam: 'Warrington Wolves', 
    awayTeam: 'Catalans Dragons', 
    date: '2025-11-19T17:30:00', 
    homeLogo: 'https://placehold.co/64x64/00539F/FFFFFF?text=WW', 
    awayLogo: 'https://placehold.co/64x64/F8E000/000000?text=CD' 
  },
];

const mockLeagueTable = [
  { pos: 1, team: 'St Helens', played: 27, wins: 22, losses: 5, points: 44 },
  { pos: 2, team: 'Wigan Warriors', played: 27, wins: 21, losses: 6, points: 42 },
  { pos: 3, team: 'Catalans Dragons', played: 27, wins: 20, losses: 7, points: 40 },
  { pos: 4, team: 'Leeds Rhinos', played: 27, wins: 18, losses: 9, points: 36 },
];

export default function App() {
  const [activeView, setActiveView] = useState('home');

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <DashboardPage user={mockUserData} nextMatch={mockNextMatch} />;
      case 'fixtures':
        return <FixturesPage fixtures={mockFixtures} />;
      case 'table':
        return <LeagueTablePage table={mockLeagueTable} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage user={mockUserData} nextMatch={mockNextMatch} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 pb-20 flex-1">
        {renderView()}
      </main>
      <Footer />
      <TabBar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}