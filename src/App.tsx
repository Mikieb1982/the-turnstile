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
import { mockUserData, mockNextMatch, mockFixtures, mockLeagueTable } from './services/mockData';

export default function App() {
  const [activeView, setActiveView] = useState('login');
  const [user, setUser] = useState(null); // Add user state

  // Replace these with your actual Firebase authentication functions
  const handleLogin = async () => {
    console.log('Logging in with Google...');
    // Example: const user = await signInWithGoogle(); setUser(user);
    setActiveView('home');
  };

  const handleEmailLogin = async (email, password) => {
    console.log('Logging in with email:', email, password);
    // Example: const user = await signInWithEmail(email, password); setUser(user);
    setActiveView('home');
  };

  const handleSignup = async ({ name, email, password }) => {
    console.log('Signing up:', name, email, password);
    // Example: await createUserWithEmail(email, password);
  };

  const handlePasswordReset = async (email) => {
    console.log('Resetting password for:', email);
    // Example: await sendPasswordResetEmail(email);
  };

  const renderView = () => {
    if (activeView === 'login') {
      return (
        <LoginPage
          theme="dark"
          onLogin={handleLogin}
          onEmailLogin={handleEmailLogin}
          onSignup={handleSignup}
          onPasswordReset={handlePasswordReset}
        />
      );
    }

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

  return (
    <div className="relative min-h-screen flex flex-col text-white">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-32 pt-8">
        {renderView()}
      </main>
      <Footer />
      <TabBar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
