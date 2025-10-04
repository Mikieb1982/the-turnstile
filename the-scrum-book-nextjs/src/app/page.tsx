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
import { fetchMatches, type ApiDataSource } from '@/services/apiService';
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
  const [matchDataSource, setMatchDataSource] = useState<ApiDataSource | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const initialLoadStarted = useRef(false);
  const favouriteTeamId = profile?.user.favoriteTeamId;

  const loadAppData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: fetchedMatches, source } = await fetchMatches();
      setMatches(fetchedMatches);
      setMatchDataSource(source);
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
  const mainSpacing = shouldShowLoginPrompt ? 'py-16 md:py-20 flex items-center justify-center' : 'pt-28 md:pt-32 pb-32 md:pb-20';
  const panelPadding = shouldShowLoginPrompt
    ? 'px-6 py-8 sm:px-10 sm:py-12'
    : 'px-4 py-6 sm:px-8 sm:py-10';
  const panelClasses = `relative overflow-hidden rounded-3xl border border-border/70 bg-surface/90 backdrop-blur-xl shadow-[0_45px_120px_-60px_rgba(11,29,58,0.8)] ring-1 ring-white/10 ${panelPadding}`;

  return (
    <div className="min-h-screen font-sans text-text app-background text-base">
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
            className="hidden md:flex fixed top-6 right-6 z-40 items-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary/90 to-accent/80 px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-15px_rgba(2,6,23,0.8)] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
          >
            <MenuIcon className="w-5 h-5" />
            <span>Menu</span>
          </button>
        </>
      ) : null}
      <main className={`${mainBaseClasses} ${mainSpacing}`}>
        <div className={`w-full ${shouldShowLoginPrompt ? 'max-w-4xl mx-auto' : ''}`}>
          <div className={panelClasses}>
            <div
              className="pointer-events-none absolute inset-x-10 -top-24 h-40 rounded-full bg-primary/35 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 space-y-4">
              {matchDataSource && matchDataSource !== 'firestore' ? (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-100">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-300/60 bg-amber-400/20 text-xs font-semibold uppercase tracking-wide text-amber-100">
                    FYI
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold text-amber-100">
                      Showing seeded fixture data
                    </p>
                    <p className="text-amber-100/80">
                      {matchDataSource === 'api-mock'
                        ? 'The API could not reach Firestore, so the built-in Betfred Super League fixtures are being displayed instead. Connect your Firebase credentials and refresh to see live updates.'
                        : 'The app could not reach the API, so it is running entirely on the bundled fixtures. Check that the development server is running and your NEXT_PUBLIC_API_BASE_URL is correct to pick up new data.'}
                    </p>
                  </div>
                </div>
              ) : null}
              {shouldShowLoginPrompt ? renderContent() : <div className="space-y-8">{renderContent()}</div>}
            </div>
          </div>
        </div>
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
          <footer className="hidden md:block mt-6 rounded-3xl border border-border/70 bg-surface/80 px-10 py-8 text-center text-sm text-text-subtle/90 backdrop-blur-xl shadow-[0_35px_120px_-70px_rgba(11,29,58,0.9)]">
            <div className="flex flex-col items-center gap-2">
              <LogoIcon className="w-14 h-14" theme={themeMode} />
              <p className="font-heading text-2xl tracking-[0.32em] uppercase text-text-strong">The Scrum Book</p>
              <p className="text-base text-text">Your elite rugby league companion. Track fixtures, unlock supporter milestones, and own matchday.</p>
            </div>
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
