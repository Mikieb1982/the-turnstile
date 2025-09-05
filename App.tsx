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
import type { Match, AttendedMatch, User } from './types';
import { fetchMatches } from './services/theSportsDbService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { allBadges, checkAndAwardBadges } from './badges';
import { MatchdayView } from './components/MatchdayView';
import { ProfileView } from './components/ProfileView';
import { TeamStatsView } from './components/TeamStatsView';

export type View = 'UPCOMING' | 'MATCH_DAY' | 'LEAGUE_TABLE' | 'GROUNDS' | 'MY_MATCHES' | 'STATS' | 'ABOUT' | 'BADGES' | 'PROFILE' | 'TEAM_STATS';

const App: React.FC = () => {
  const [view, setView] = useState<View>('PROFILE');
  const [theme, toggleTheme] = useTheme();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [attendedMatches, setAttendedMatches] = useLocalStorage<AttendedMatch[]>('attendedMatches', []);
  const [earnedBadgeIds, setEarnedBadgeIds] = useLocalStorage<string[]>('earnedBadgeIds', []);
  const [user, setUser] = useLocalStorage<User>('user', { 
    name: 'Daniel Hayes',
    favoriteTeamId: '2' // St Helens
  });
  const initialLoadStarted = useRef(false);

  const loadMatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedMatches = await fetchMatches();
      setMatches(fetchedMatches);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch match data from TheSportsDB. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch data only once on the initial component mount.
    if (!initialLoadStarted.current) {
        initialLoadStarted.current = true;
        loadMatches();
    }
  }, [loadMatches]);
  
  const addAttendedMatch = (match: Match) => {
    if (attendedMatches.some(am => am.match.id === match.id)) return; // Already attended
    
    const newAttendedMatch: AttendedMatch = {
        match,
        attendedOn: new Date().toISOString()
    };
    
    const updatedAttendedMatches = [...attendedMatches, newAttendedMatch];
    setAttendedMatches(updatedAttendedMatches);

    // Check for new badges
    const newlyEarnedBadges = checkAndAwardBadges(updatedAttendedMatches, earnedBadgeIds, user);
    if (newlyEarnedBadges.length > 0) {
        setEarnedBadgeIds(prev => [...prev, ...newlyEarnedBadges]);
        // In a full app, you might show a notification here
        console.log("New badges earned:", newlyEarnedBadges);
    }
  };

  const removeAttendedMatch = (matchId: string) => {
    setAttendedMatches(prev => prev.filter(am => am.match.id !== matchId));
  }

  const renderContent = () => {
    if (loading) {
      return <div className="flex flex-col items-center justify-center h-64">
        <LoadingSpinner />
        <p className="mt-4 text-text-subtle">Fetching season fixtures...</p>
      </div>;
    }
    if (error) {
      return <ErrorDisplay message={error} onRetry={loadMatches} />;
    }
    
    switch (view) {
      case 'UPCOMING':
        return <MatchList 
                  matches={matches}
                  setMatches={setMatches}
                  attendedMatchIds={attendedMatches.map(am => am.match.id)}
                  onAttend={addAttendedMatch} 
                  onUnattend={removeAttendedMatch}
                  onRefresh={loadMatches}
                />;
      case 'MATCH_DAY':
        return <MatchdayView 
                  matches={matches}
                  attendedMatchIds={attendedMatches.map(am => am.match.id)}
                  onAttend={addAttendedMatch} 
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
                  setUser={setUser}
                  setView={setView}
                  attendedMatches={attendedMatches}
                  earnedBadgeIds={earnedBadgeIds}
                />;
      default:
        return <MatchList 
                  matches={matches} 
                  setMatches={setMatches}
                  attendedMatchIds={attendedMatches.map(am => am.match.id)}
                  onAttend={addAttendedMatch}
                  onUnattend={removeAttendedMatch}
                  onRefresh={loadMatches}
                />;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-surface-alt text-text">
      <Header currentView={view} setView={setView} theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4 md:p-6 pb-24 md:pb-6">
        {renderContent()}
      </main>
      <MobileNav currentView={view} setView={setView} />
      <footer className="hidden md:block text-center py-6 text-text-subtle border-t border-border mt-8">
        <div className="flex justify-center items-center gap-2">
            <img src="images/logo.png" alt="The Scrum Book Logo" className="w-5 h-5" />
            <p>Match data provided by <a href="https://www.thesportsdb.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">TheSportsDB.com</a></p>
        </div>
      </footer>
    </div>
  );
};

export default App;