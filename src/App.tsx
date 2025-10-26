// src/App.tsx
import React, { useState } from 'react';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { TabBar } from './components/organisms/TabBar';
import { DashboardPage } from './components/pages/DashboardPage';
import { FixturesPage } from './components/pages/FixturesPage';
import { LeagueTablePage } from './components/pages/LeagueTablePage';
import { ProfilePage } from './components/pages/ProfilePage';
import { AgentWorkshopPage } from './components/pages/AgentWorkshopPage';
import { LoginPage } from './components/pages/LoginPage';
// CORRECTED PATH: Changed from './services' to '../services'
import { mockUserData, mockNextMatch, mockFixtures, mockLeagueTable } from '../services/mockData';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const { currentUser, signIn, signInWithGoogle, signUp, passwordReset, logOut } = useAuth();

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
      case 'agent':
        return <AgentWorkshopPage />;
      default:
        return <DashboardPage user={mockUserData} nextMatch={mockNextMatch} />;
    }
  };

  if (!currentUser) {
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center text-white">
            <LoginPage
                theme="dark"
                onLogin={signInWithGoogle}
                onEmailLogin={signIn}
                // CORRECTED: This ensures the arguments are passed correctly
                onSignup={({ name, email, password }) => signUp(name, email, password)}
                onPasswordReset={passwordReset}
            />
        </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col text-foreground">
      <Navbar onLogout={logOut} />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-32 pt-8">
        {renderView()}
      </main>
      <Footer />
      <TabBar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
