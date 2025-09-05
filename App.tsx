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
import type { Match, AttendedMatch, User, Profile } from './types';
import { fetchMatches } from './services/apiService';
import { useTheme } from './hooks/useTheme';
import { allBadges, checkAndAwardBadges } from './badges';
import { MatchdayView } from './components/MatchdayView';
import { ProfileView } from './components/ProfileView';
import { TeamStatsView } from './components/TeamStatsView';
import { LoginView } from './components/LoginView';
import { RugbyBallIcon } from './components/Icons';
import { getProfiles, addProfile, deleteProfile, updateProfile } from './services/profileService';
import { useLocalStorage } from './hooks/useLocalStorage';

export type View = 'UPCOMING' | 'MATCH_DAY' | 'LEAGUE_TABLE' | 'GROUNDS' | 'MY_MATCHES' | 'STATS' | 'ABOUT' | 'BADGES' | 'PROFILE' | 'TEAM_STATS';

const App: React.FC = () => {
  const [view, setView] = useState<View>('PROFILE');
  const [theme, toggleTheme] = useTheme();

  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [activeProfileId, setActiveProfileId] = useLocalStorage<string | null>('activeProfileId', null);
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const initialLoadStarted = useRef(false);

  const activeProfile = activeProfileId ? profiles[activeProfileId] : null;

  const loadAppData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [fetchedMatches, fetchedProfiles] = await Promise.all([
        fetchMatches(),
        getProfiles()
      ]);
      setMatches(fetchedMatches);
      setProfiles(fetchedProfiles);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch initial application data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch data only once on the initial component mount.
    if (!initialLoadStarted.current) {
        initialLoadStarted.current = true;
        loadAppData();
    }
  }, [loadAppData]);
  
  const updateActiveProfile = async (updater: (profile: Profile) => Profile) => {
    // Safeguard to ensure the active profile data is actually loaded before proceeding.
    // This prevents runtime errors if an update is triggered before data is ready or after a profile is deleted.
    if (!activeProfileId || !activeProfile) {
        console.warn("updateActiveProfile called without a valid active profile. Aborting update.");
        return;
    }

    const updatedProfile = updater(activeProfile);
    
    try {
        const savedProfile = await updateProfile(activeProfileId, updatedProfile);
        setProfiles(prev => ({
            ...prev,
            [activeProfileId]: savedProfile,
        }));
    } catch (e) {
        console.error("Failed to update profile:", e);
        setError("There was an error saving your changes. Please try again.");
    }
  };

  const addAttendedMatch = (match: Match) => {
    if (!activeProfile) return;
    if (activeProfile.attendedMatches.some(am => am.match.id === match.id)) return;

    const newAttendedMatch: AttendedMatch = {
        match,
        attendedOn: new Date().toISOString()
    };
    
    updateActiveProfile(profile => {
        const updatedAttendedMatches = [...profile.attendedMatches, newAttendedMatch];
        const newlyEarnedBadges = checkAndAwardBadges(updatedAttendedMatches, profile.earnedBadgeIds, profile.user);
        
        if (newlyEarnedBadges.length > 0) {
            console.log("New badges earned:", newlyEarnedBadges);
        }

        return {
            ...profile,
            attendedMatches: updatedAttendedMatches,
            earnedBadgeIds: [...profile.earnedBadgeIds, ...newlyEarnedBadges],
        };
    });
  };

  const removeAttendedMatch = (matchId: string) => {
    updateActiveProfile(profile => ({
        ...profile,
        attendedMatches: profile.attendedMatches.filter(am => am.match.id !== matchId)
    }));
  }

  const setUser = (userOrUpdater: React.SetStateAction<User>) => {
    updateActiveProfile(profile => ({
        ...profile,
        user: userOrUpdater instanceof Function ? userOrUpdater(profile.user) : userOrUpdater,
    }));
  };

  const handleSelectProfile = (profileId: string) => {
    // Defensive check to ensure profile exists before setting it as active.
    if (profiles[profileId]) {
      setActiveProfileId(profileId);
      setView('PROFILE');
    } else {
      console.error(`Attempted to select a non-existent profile: ${profileId}`);
      setError("An error occurred while selecting the profile. Please refresh and try again.");
    }
  };

  const handleLogout = () => {
    setActiveProfileId(null);
  };

  const handleAddProfile = async (name: string) => {
    try {
      const { id, profile } = await addProfile(name);
      setProfiles(prev => ({ ...prev, [id]: profile }));
      setActiveProfileId(id);
      setView('PROFILE');
    } catch (e) {
      console.error("Failed to add profile:", e);
      setError("Could not create the new profile. Please try again.");
      // Re-throw the error so the calling component knows it failed.
      throw e;
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
     try {
        await deleteProfile(profileId);
        setProfiles(prev => {
            const newProfiles = { ...prev };
            delete newProfiles[profileId];
            return newProfiles;
        });
        if (activeProfileId === profileId) {
            setActiveProfileId(null);
        }
     } catch (e) {
        console.error("Failed to delete profile:", e);
        setError("Could not delete the profile. Please try again.");
     }
  };

  // Logged-out state
  if (!activeProfileId || !activeProfile) {
    return (
        <div className="min-h-screen font-sans bg-surface-alt text-text">
            <LoginView
                profiles={profiles}
                onSelectProfile={handleSelectProfile}
                onAddProfile={handleAddProfile}
                onDeleteProfile={handleDeleteProfile}
            />
        </div>
    );
  }

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
                  attendedMatchIds={activeProfile.attendedMatches.map(am => am.match.id)}
                  onAttend={addAttendedMatch} 
                  onUnattend={removeAttendedMatch}
                  onRefresh={loadAppData}
                />;
      case 'MATCH_DAY':
        return <MatchdayView 
                  matches={matches}
                  attendedMatchIds={activeProfile.attendedMatches.map(am => am.match.id)}
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
        return <MyMatchesView attendedMatches={activeProfile.attendedMatches} onRemove={removeAttendedMatch} />;
      case 'STATS':
        return <StatsView user={activeProfile.user} attendedMatches={activeProfile.attendedMatches} />;
      case 'ABOUT':
        return <AboutView />;
      case 'BADGES':
        return <BadgesView allBadges={allBadges} earnedBadgeIds={activeProfile.earnedBadgeIds} />;
      case 'PROFILE':
        return <ProfileView
                  user={activeProfile.user}
                  setUser={setUser}
                  setView={setView}
                  attendedMatches={activeProfile.attendedMatches}
                  earnedBadgeIds={activeProfile.earnedBadgeIds}
                  onLogout={handleLogout}
                />;
      default:
        return <MatchList 
                  matches={matches} 
                  setMatches={setMatches}
                  attendedMatchIds={activeProfile.attendedMatches.map(am => am.match.id)}
                  onAttend={addAttendedMatch}
                  onUnattend={removeAttendedMatch}
                  onRefresh={loadAppData}
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
            <RugbyBallIcon className="w-5 h-5 text-primary" />
            <p>Match data provided by mock API</p>
        </div>
      </footer>
    </div>
  );
};

export default App;