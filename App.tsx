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
import type { Match, View } from './types';
import { fetchMatches } from './services/apiService';
import { useTheme } from './hooks/useTheme';
import { allBadges } from './badges';
import { MatchdayView } from './components/MatchdayView';
import { ProfileView } from './components/ProfileView';
import { TeamStatsView } from './components/TeamStatsView';
import { useAuth } from './contexts/AuthContext';
import { NearbyMatchesView } from './components/NearbyMatchesView';
import { DataUploader } from './components/DataUploader';
import { CommunityView } from './components/CommunityView';
import { LoginPromptView } from './components/LoginPromptView';
import { PredictionGamesView } from './components/PredictionGamesView';

const App: React.FC = () => {
  const [view, setView] = useState<View>('UPCOMING');
  const [theme, toggleTheme] = useTheme();

  const { currentUser, profile, loading: authLoading, login, logout, addAttendedMatch, removeAttendedMatch, updateUser, saveUserPrediction, deleteUserPrediction } = useAuth();
  
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
    if (!initialLoadStarted.current) {
        initialLoadStarted.current = true;
        loadAppData();
    }
  }, [loadAppData]);

  const handleAttend = (match: Match) => {
    if (!currentUser) {
      setView('PROFILE'); // Will be caught by the protected view logic and show the prompt
    } else {
      addAttendedMatch(match);
    }
  };

  const handleUnattend = (matchId: string) => {
    if (!currentUser) {
      setView('PROFILE'); // Will be caught by the protected view logic and show the prompt
    } else {
      removeAttendedMatch(matchId);
    }
  };
  
  const renderContent = () => {
    if (error) {
      return <ErrorDisplay message={error} onRetry={loadAppData} />;
    }
    if (loading && !error) {
      return <div className="flex flex-col items-center justify-center h-64">
        <LoadingSpinner />
        <p className="mt-4 text-text-subtle">Fetching season fixtures...</p>
      </div>;
    }

    const protectedViews: View[] = ['MY_MATCHES', 'STATS', 'BADGES', 'PROFILE', 'COMMUNITY', 'ADMIN', 'PREDICTION_GAMES'];
    if (!currentUser && protectedViews.includes(view)) {
      return <LoginPromptView onLogin={login} />;
    }
    
    // While authenticating, show a spinner for protected views
    if (authLoading && protectedViews.includes(view)) {
      return <div className="flex flex-col items-center justify-center h-64"><LoadingSpinner /><p className="mt-4 text-text-subtle">Connecting...</p></div>;
    }
    
    const attendedMatchIds = profile?.attendedMatches.map(am => am.match.id) || [];

    switch (view) {
      case 'UPCOMING':
        return <MatchList 
                  matches={matches}
                  setMatches={setMatches}
                  attendedMatchIds={attendedMatchIds}
                  onAttend={handleAttend} 
                  onUnattend={handleUnattend}
                  onRefresh={loadAppData}
                />;
      case 'NEARBY':
        return <NearbyMatchesView
                  matches={matches}
                  attendedMatchIds={attendedMatchIds}
                  onAttend={handleAttend}
                  onUnattend={handleUnattend}
                />;
      case 'MATCH_DAY':
        return <MatchdayView 
                  matches={matches}
                  attendedMatchIds={attendedMatchIds}
                  onAttend={handleAttend} 
                  onUnattend={handleUnattend}
                />;
      case 'LEAGUE_TABLE':
        return <LeagueTableView />;
      case 'TEAM_STATS':
        return <TeamStatsView />;
      case 'GROUNDS':
        return <GroundsView />;
      case 'ABOUT':
        return <AboutView />;
      
      // Protected Routes
      case 'MY_MATCHES':
        return profile ? <MyMatchesView attendedMatches={profile.attendedMatches} onRemove={handleUnattend} /> : <LoadingSpinner />;
      case 'STATS':
        return profile ? <StatsView user={profile.user} attendedMatches={profile.attendedMatches} /> : <LoadingSpinner />;
      case 'BADGES':
        return profile ? <BadgesView allBadges={allBadges} earnedBadgeIds={profile.earnedBadgeIds} /> : <LoadingSpinner />;
      case 'COMMUNITY':
        return <CommunityView />;
      case 'PREDICTION_GAMES':
        return profile ? <PredictionGamesView
                  matches={matches}
                  predictions={profile.predictions || []}
                  onSavePrediction={saveUserPrediction}
                  onDeletePrediction={deleteUserPrediction}
                /> : <LoadingSpinner />;
      case 'PROFILE':
        return profile ? <ProfileView
                  user={profile.user}
                  setUser={(updatedUser) => updateUser(updatedUser)}
                  setView={setView}
                  attendedMatches={profile.attendedMatches}
                  earnedBadgeIds={profile.earnedBadgeIds}
                  onLogout={logout}
                /> : <LoadingSpinner />;
      case 'ADMIN':
        return <DataUploader />;
      default:
        return <MatchList 
                  matches={matches} 
                  setMatches={setMatches}
                  attendedMatchIds={attendedMatchIds}
                  onAttend={handleAttend}
                  onUnattend={handleUnattend}
                  onRefresh={loadAppData}
                />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-text app-background">
      <Header currentView={view} setView={setView} theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} />
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-12 pb-24 md:pb-16">
        <div className="space-y-8">
          {renderContent()}
        </div>
      </main>
      <MobileNav currentView={view} setView={setView} currentUser={currentUser} />
      <footer className="hidden md:block text-center py-8 text-sm text-text-subtle/90 border-t border-border mt-4 bg-surface/70 backdrop-blur">
        <p className="font-semibold text-text">The Scrum Book</p>
        <p className="mt-1">A living playbook for product teams who want to move from theory to shipping value every sprint.</p>
      </footer>
    </div>
  );
};

export default App;
