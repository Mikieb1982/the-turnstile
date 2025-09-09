import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { MatchList } from './components/MatchList';
import { MyMatchesView } from './components/MyMatchesView';
import { AboutView } from './components/AboutView';
import { BadgesView } from './components/BadgesView';
import { StatsView } from './components/StatsView';
import { GroundsView, LeagueTableView } from './components/LeagueTableView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { Match, User } from './types';
import { fetchMatches } from './services/apiService';
import { useTheme } from './hooks/useTheme';
import { allBadges } from './badges';
import { MatchdayView } from './components/MatchdayView';
import { ProfileView } from './components/ProfileView';
import { TeamStatsView } from './components/TeamStatsView';
import { useAuth } from './contexts/AuthContext';
import { NearbyMatchesView } from './components/NearbyMatchesView';
import { DataUploader } from './components/DataUploader';

export type View = 'UPCOMING' | 'MATCH_DAY' | 'LEAGUE_TABLE' | 'GROUNDS' | 'MY_MATCHES' | 'STATS' | 'ABOUT' | 'BADGES' | 'PROFILE' | 'TEAM_STATS' | 'NEARBY' | 'ADMIN';

const App: React.FC = () => {
  const [view, setView] = useState<View>('UPCOMING');
  const [theme, toggleTheme] = useTheme();

  const { currentUser, profile, loading: authLoading, logout, addAttendedMatch, removeAttendedMatch, updateUser } = useAuth();
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const initialLoadStarted = useRef(false);

  const loadAppData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedMatches = await fetchMatches();
      setMatches(fetchedMatches);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch initial application data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser && profile && !initialLoadStarted.current) {
        initialLoadStarted.current = true;
        loadAppData();
    }
  }, [currentUser, profile, loadAppData]);
  
  if (authLoading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <LoadingSpinner />
            <p className="mt-4 text-text-subtle">Connecting to The Scrum Book...</p>
        </div>
    );
  }

  if (!profile) {
    return (
        <div className="container mx-auto p-4 md:p-6 min-h-screen flex items-center justify-center">
            <ErrorDisplay 
                message="Could not connect to the service. Please check your internet connection and refresh the page."
                onRetry={() => window.location.reload()}
            />
        </div>
    );
  }
  
  const { user, attendedMatches, earnedBadgeIds } = profile;

  const handleSetUser = (updatedUser: Partial<User>) => {
    updateUser(updatedUser);
  };

  const renderContent = () => {
    if (loading) {
      return <div className="flex flex-col items-center justify-center h-64">
        <LoadingSpinner />
        <p className="mt-4 text-text-subtle">Fetching season fixtures...</p>
      </div>;
    }
    if (error) {
      return <ErrorDisplay message={error} onRetry={loadAppData} />;
    }
    
    switch (view) {
      case 'UPCOMING':
        return <MatchList 
                  matches={matches}
                  setMatches={setMatches}
                  attendedMatchIds={attendedMatches.map(am => am.match.id)}
                  onAttend={(match) => addAttendedMatch(match)} 
                  onUnattend={removeAttendedMatch}
                  onRefresh={loadAppData}
                />;
      case 'NEARBY':
        return <NearbyMatchesView
                  matches={matches}
                  attendedMatchIds={attendedMatches.map(am => am.match.id)}
                  onAttend={(match) => addAttendedMatch(match)}
                  onUnattend={removeAttendedMatch}
                />;
      case 'MATCH_DAY':
        return <MatchdayView 
                  matches={matches}
                  attendedMatchIds={attendedMatches.map(am => am.match.id)}
                  onAttend={(match) => addAttendedMatch(match)} 
                  onUnattend={removeAttendedMatch}
                />;
      case 'LEAGUE_TABLE':
        return <LeagueTableView />;
      case 'TEAM_STATS':
        return <TeamStatsView />;
      case 'GROUNDS':
        return <GroundsView />;
      case 'MY_MATCHES':
        return <MyMatchesView attendedMatches={attendedMatches} onRemove={removeAttendedMatch} />;
      case 'STATS':
        return <StatsView user={user} attendedMatches={attendedMatches} />;
      case 'ABOUT':
        return <AboutView />;
      case 'BADGES':
        return <BadgesView allBadges={allBadges} earnedBadgeIds={earnedBadgeIds} />;
      case 'PROFILE':
        return <ProfileView
                  user={user}
                  setUser={handleSetUser}
                  setView={setView}
                  attendedMatches={attendedMatches}
                  earnedBadgeIds={earnedBadgeIds}
                  onLogout={logout}
                />;
      case 'ADMIN':
        return <DataUploader />;
      default:
        return <MatchList 
                  matches={matches} 
                  setMatches={setMatches}
                  attendedMatchIds={attendedMatches.map(am => am.match.id)}
                  onAttend={(match) => addAttendedMatch(match)}
                  onUnattend={removeAttendedMatch}
                  onRefresh={loadAppData}
                />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-text">
      <Header currentView={view} setView={setView} theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {renderContent()}
      </main>
      <MobileNav currentView={view} setView={setView} />
      <footer className="hidden md:block text-center py-6 text-text-subtle border-t border-border mt-8">
      </footer>
    </div>
  );
};

export default App;