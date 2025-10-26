import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import { allBadges } from '../badges';
import { AvatarModal } from './AvatarModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TeamLogo } from './Icons';
import { TEAMS } from '../services/mockData';

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="rounded-lg bg-muted/50 p-4 text-center">
    <p className="font-bold text-2xl">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export const ProfileView: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const stats = useMemo(() => {
    if (!currentUser) return null;
    const attendedMatches = currentUser.attendedMatches || [];
    const uniqueVenues = new Set(attendedMatches.map(am => am.match.venue));
    const totalBadges = allBadges.length;
    const earnedBadges = currentUser.earnedBadgeIds?.length || 0;
    return {
      matches: attendedMatches.length,
      stadiums: uniqueVenues.size,
      badges: `${earnedBadges} / ${totalBadges}`,
      progress: (earnedBadges / totalBadges) * 100,
    };
  }, [currentUser]);

  const handleAvatarSelect = (avatarUrl: string) => {
    if (currentUser) {
      updateProfile({ ...currentUser, avatar: avatarUrl });
    }
  };

  const handleTeamChange = (teamId: string) => {
    if (currentUser) {
        updateProfile({ ...currentUser, favoriteTeamId: teamId });
    }
  };

  const favoriteTeam = useMemo(() => {
    return TEAMS.find(t => t.id === currentUser?.favoriteTeamId) || null;
  }, [currentUser?.favoriteTeamId]);

  const earnedBadges = useMemo(() => {
    if (!currentUser?.earnedBadgeIds) return [];
    const earned = allBadges.filter(b => currentUser.earnedBadgeIds.includes(b.id));
    if (filter === 'all') return earned;
    return earned.filter(b => b.category === filter);
  }, [currentUser, filter]);

  if (!currentUser || !stats) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <header className="relative text-center">
        <div className="relative mx-auto h-32 w-32">
          <Image
            src={currentUser.avatar}
            alt="User Avatar"
            width={128}
            height={128}
            className="rounded-full border-4 border-background shadow-lg"
            onClick={() => setIsAvatarModalOpen(true)}
          />
          <Button
            size="sm"
            className="absolute bottom-1 right-1 rounded-full"
            onClick={() => setIsAvatarModalOpen(true)}
          >
            Edit
          </Button>
        </div>
        <h1 className="mt-4 text-2xl font-bold">{currentUser.name}</h1>
        <p className="text-muted-foreground">@{currentUser.username}</p>
        {favoriteTeam && (
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-muted/50 py-1 pl-2 pr-3 text-sm">
            <TeamLogo logo={favoriteTeam.logo} alt={favoriteTeam.name} size={20} />
            <span>{favoriteTeam.name}</span>
          </div>
        )}
      </header>

      <Card>
        <CardContent className="grid grid-cols-3 gap-4 pt-6">
          <StatCard label="Matches" value={stats.matches} />
          <StatCard label="Stadiums" value={stats.stadiums} />
          <StatCard label="Badges" value={stats.badges} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badge Progress</CardTitle>
        </CardHeader>
        <CardContent>
            <Progress value={stats.progress} className="h-2" />
            <p className="mt-2 text-sm text-center text-muted-foreground">You&apos;ve collected {currentUser.earnedBadgeIds?.length || 0} out of {allBadges.length} possible badges.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>My Badges</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter badges" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Badges</SelectItem>
                <SelectItem value="Milestone">Milestone</SelectItem>
                <SelectItem value="Tournament">Tournament</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {earnedBadges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30">
              <div className="p-3 rounded-full bg-background mb-2 shadow-inner-lg">
                 <badge.icon className="h-10 w-10 text-primary" />
              </div>
              <p className="font-semibold text-sm">{badge.name}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
            <p className="font-semibold text-sm mb-2">Favorite Team</p>
            <Select value={currentUser.favoriteTeamId || ''} onValueChange={handleTeamChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your favorite team" />
                </SelectTrigger>
                <SelectContent>
                    {TEAMS.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                            <div className="flex items-center gap-2">
                                <TeamLogo logo={team.logo} alt={team.name} size={20} />
                                <span>{team.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            </CardContent>
        </Card>


      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onAvatarSelect={handleAvatarSelect}
        currentAvatar={currentUser.avatar}
      />
    </div>
  );
};
