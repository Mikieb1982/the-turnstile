'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { MobileNav } from '@/components/MobileNav';
import { MatchList } from '@/components/MatchList';
import { MyMatchesView } from '@/components/MyMatchesView';
import { AboutView } from '@/components/AboutView';
import { BadgesView } from '@/components/BadgesView';
import { StatsView } from '@/components/StatsView';
import { GroundsView, LeagueTableView } from '@/components/LeagueTableView';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { MatchdayView } from '@/components/MatchdayView';
import { ProfileView } from '@/components/ProfileView';
import { TeamStatsView } from '@/components/TeamStatsView';
import { NearbyMatchesView } from '@/components/NearbyMatchesView';
import { DataUploader } from '@/components/DataUploader';
import { CommunityView } from '@/components/CommunityView';
import { LoginPromptView } from '@/components/LoginPromptView';
import { DesktopTopBar } from '@/components/DesktopTopBar';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { LogoIcon, MenuIcon } from '@/components/Icons';
import type { Match, View } from '@/types';
import { fetchMatches } from '@/services/apiService';
import { allBadges } from '@/badges';
import { useTheme } from '@/hooks/useTheme';
import { syncThemeWithFavouriteTeam } from '@/utils/themeUtils';

const protectedViews: View[] = ['MY_MATCHES', 'STATS', 'BADGES', 'PROFILE', 'COMMUNITY', 'ADMIN'];
const VIEW_STORAGE_KEY = 'scrum-book:last-view';
const allViews: View[] = [
  'UPCOMING',
  'MATCH_DAY',
  'LEAGUE_TABLE',
  'GROUNDS',
  'MY_MATCHES',
  'STATS',
  'ABOUT',
  'BADGES',
  'PROFILE',
  'TEAM_STATS',
  'NEARBY',
  'PREDICTION_GAMES',
  'ADMIN',
  'COMMUNITY',
];

const isValidView = (value: string | null): value is View => typeof value === 'string' && allViews.includes(value as View);

const MainApp = () => {
  const [view, setView] = useState<View>(() => {
    if (typeof window === 'undefined') {
      return 'PROFILE';
    }

    const storedView = window.localStorage.getItem(VIEW_STORAGE_KEY);
    if (isValidView(storedView)) {
      return storedView;
    }

    return 'PROFILE';
  });
  const [theme] = useTheme();
  const themeMode = theme === 'dark' ? 'dark' : 'light';
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const {
    currentUser,
    profile,
    loading: authLoading,
    login,
    loginWithCredentials,
    signup,
    requestPasswordReset,
    logout,
    addAttendedMatch,
    removeAttendedMatch,
    updateUser,
  } = useAuth();

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const initialLoadStarted = useRef(false);
  const favouriteTeamId = profile?.user.favoriteTeamId;

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

  useEffect(() => {
    syncThemeWithFavouriteTeam(favouriteTeamId, themeMode);
  }, [favouriteTeamId, themeMode]);

  const handleAttend = (match: Match) => {
    if (!currentUser) {
      setView('PROFILE');
    } else {
      addAttendedMatch(match);
    }
  };

  const handleUnattend = (matchId: string) => {
    if (!currentUser) {
      setView('PROFILE');
    } else {
      removeAttendedMatch(matchId);
    }
  };

  const shouldShowLoginPrompt = !currentUser && protectedViews.includes(view);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VIEW_STORAGE_KEY, view);
    }
  }, [view]);

  useEffect(() => {
    if (shouldShowLoginPrompt) {
      setIsMobileNavOpen(false);
    }
  }, [shouldShowLoginPrompt]);

  const renderContent = () => {
    if (error) {
      return <ErrorDisplay message={error} onRetry={loadAppData} />;
    }

    if (loading && !error) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <LoadingSpinner />
          <p className="mt-4 text-text-subtle">Fetching season fixtures...</p>
        </div>
      );
    }

    if (shouldShowLoginPrompt) {
      return (
        <LoginPromptView
          onLogin={login}
          onEmailLogin={loginWithCredentials}
          onSignup={signup}
          onPasswordReset={requestPasswordReset}
          theme={themeMode}
        />
      );
    }

    if (authLoading && protectedViews.includes(view)) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <LoadingSpinner />
          <p className="mt-4 text-text-subtle">Connecting...</p>
        </div>
      );
    }

    const attendedMatchIds = profile?.attendedMatches.map((attendedMatch) => attendedMatch.match.id) || [];

    switch (view) {
      case 'UPCOMING':
        return (
          <MatchList matches={matches} attendedMatchIds={attendedMatchIds} onAttend={handleAttend} onRefresh={loadAppData} />
        );
      case 'NEARBY':
        return (
          <NearbyMatchesView matches={matches} attendedMatchIds={attendedMatchIds} onAttend={handleAttend} />
        );
      case 'MATCH_DAY':
        return <MatchdayView matches={matches} attendedMatchIds={attendedMatchIds} onAttend={handleAttend} />;
      case 'LEAGUE_TABLE':
        return <LeagueTableView />;
      case 'TEAM_STATS':
        return <TeamStatsView />;
      case 'GROUNDS':
        return <GroundsView />;
      case 'ABOUT':
        return <AboutView theme={themeMode} />;
      case 'MY_MATCHES':
        return profile ? (
          <MyMatchesView attendedMatches={profile.attendedMatches} onRemove={handleUnattend} />
        ) : (
          <LoadingSpinner />
        );
      case 'STATS':
        return profile ? <StatsView user={profile.user} attendedMatches={profile.attendedMatches} /> : <LoadingSpinner />;
      case 'BADGES':
        return profile ? <BadgesView allBadges={allBadges} earnedBadgeIds={profile.earnedBadgeIds} /> : <LoadingSpinner />;
      case 'COMMUNITY':
        return <CommunityView />;
      case 'PROFILE':
        return profile ? (
          <ProfileView
            user={profile.user}
            setUser={(updatedUser) => updateUser(updatedUser)}
            setView={setView}
            attendedMatches={profile.attendedMatches}
            earnedBadgeIds={profile.earnedBadgeIds}
            onLogout={logout}
          />
        ) : (
          <LoadingSpinner />
        );
      case 'ADMIN':
        return <DataUploader />;
      default:
        return (
          <MatchList matches={matches} attendedMatchIds={attendedMatchIds} onAttend={handleAttend} onRefresh={loadAppData} />
        );
    }
  };

  const mainBaseClasses = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8';
  const mainSpacing = shouldShowLoginPrompt ? 'py-16 md:py-20 flex items-center justify-center' : 'pt-24 md:pt-28 pb-28 md:pb-16';

  return (
    <div className="min-h-screen font-sans text-text app-background">
      {!shouldShowLoginPrompt ? (
        <>
          <DesktopTopBar currentView={view} setView={setView} />
          <Header
            setView={setView}
            theme={theme}
            isMobileNavOpen={isMobileNavOpen}
            onMobileNavToggle={() => setIsMobileNavOpen((open) => !open)}
          />
          <button
            type="button"
            className="hidden md:flex fixed top-6 right-6 z-40 items-center gap-2 rounded-full border border-border/70 bg-surface px-4 py-2 text-sm font-semibold text-text-subtle shadow-lg transition-colors hover:text-text hover:border-border hover:bg-surface-alt/80"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
          >
            <MenuIcon className="w-5 h-5" />
            <span>Menu</span>
          </button>
        </>
      ) : null}
      <main className={`${mainBaseClasses} ${mainSpacing}`}>
        {shouldShowLoginPrompt ? <div className="w-full">{renderContent()}</div> : <div className="space-y-8">{renderContent()}</div>}
      </main>
      {!shouldShowLoginPrompt ? (
        <>
          <MobileNav
            currentView={view}
            setView={setView}
            currentUser={currentUser}
            isOpen={isMobileNavOpen}
            onClose={() => setIsMobileNavOpen(false)}
            theme={themeMode}
            onLogout={logout}
          />
          <MobileBottomBar currentView={view} setView={setView} />
          <footer className="hidden md:block text-center py-8 text-sm text-text-subtle/90 border-t border-border mt-4 bg-surface/70 backdrop-blur">
            <LogoIcon className="w-12 h-12 mx-auto mb-3" theme={themeMode} />
            <p className="font-semibold text-text">The Scrum Book</p>
            <p className="mt-1">Your ultimate rugby league companion. Track matches, earn badges, and connect with other fans.</p>
          </footer>
        </>
      ) : null}
    </div>
  );
};

const HomePage = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default HomePage;
