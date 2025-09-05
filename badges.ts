
import type { Badge, AttendedMatch, User } from './types';
import {
    TrophyIcon,
    CheckCircleIcon,
    LocationMarkerIcon,
    RugbyBallIcon,
    MapIcon,
    ShareIcon,
    SparklesIcon,
    StarIcon,
    ShieldCheckIcon,
} from './components/Icons';
import { TEAMS } from './services/mockData';

export const allBadges: Badge[] = [
    {
        id: 'FIRST_MATCH',
        name: 'First Kick-Off',
        description: 'You attended your first Super League match!',
        icon: RugbyBallIcon,
        category: 'Milestone',
    },
    {
        id: 'FIVE_MATCHES',
        name: 'Dedicated Fan',
        description: 'You have attended 5 matches.',
        icon: CheckCircleIcon,
        category: 'Milestone',
    },
    {
        id: 'THREE_STADIUMS',
        name: 'Ground Hopper',
        description: 'You have visited 3 different stadiums.',
        icon: LocationMarkerIcon,
        category: 'Milestone',
    },
    {
        id: 'FRENCH_TRIP',
        name: 'French Connection',
        description: 'You attended a match in France!',
        icon: MapIcon,
        category: 'Milestone',
    },
    {
        id: 'AWAY_DAYS',
        name: 'Away Day Tripper',
        description: 'You attended 3 away matches supporting your team.',
        icon: ShareIcon,
        category: 'Milestone',
    },
     {
        id: 'CLUB_COLLECTOR',
        name: 'Club Collector',
        description: 'You have seen all Super League teams play.',
        icon: ShieldCheckIcon,
        category: 'Milestone',
    },
    {
        id: 'DERBY_DAY',
        name: 'Derby Day Specialist',
        description: 'You attended a major derby match.',
        icon: TrophyIcon,
        category: 'Tournament',
    },
    {
        id: 'MAGIC_WEEKEND',
        name: 'Magic Weekend',
        description: 'You attended a Magic Weekend event!',
        icon: SparklesIcon,
        category: 'Tournament',
    },
    {
        id: 'GRAND_FINAL',
        name: 'Grand Final Fan',
        description: 'You attended a Super League Grand Final!',
        icon: StarIcon,
        category: 'Tournament',
    },
];

const DERBY_TEAMS = [
    ['Wigan Warriors', 'St Helens'],
    ['Hull FC', 'Hull KR'],
    ['Leeds Rhinos', 'Bradford Bulls'], // Classic rivalry
    ['Warrington Wolves', 'Widnes Vikings'],
    ['Castleford Tigers', 'Wakefield Trinity'],
];

const hasAttendedDerby = (attendedMatches: AttendedMatch[]): boolean => {
    return attendedMatches.some(({ match }) => {
        const teamNames = [match.homeTeam.name, match.awayTeam.name];
        return DERBY_TEAMS.some(derbyPair => 
            teamNames.includes(derbyPair[0]) && teamNames.includes(derbyPair[1])
        );
    });
};

export const checkAndAwardBadges = (
    attendedMatches: AttendedMatch[],
    earnedBadgeIds: string[],
    user: User,
): string[] => {
    const newlyEarned: string[] = [];
    
    // Check for 'First Kick-Off'
    if (attendedMatches.length >= 1 && !earnedBadgeIds.includes('FIRST_MATCH')) {
        newlyEarned.push('FIRST_MATCH');
    }
    
    // Check for 'Dedicated Fan'
    if (attendedMatches.length >= 5 && !earnedBadgeIds.includes('FIVE_MATCHES')) {
        newlyEarned.push('FIVE_MATCHES');
    }
    
    // Check for 'Ground Hopper'
    const uniqueVenues = new Set(attendedMatches.map(am => am.match.venue));
    if (uniqueVenues.size >= 3 && !earnedBadgeIds.includes('THREE_STADIUMS')) {
        newlyEarned.push('THREE_STADIUMS');
    }
    
    // Check for 'Derby Day Specialist'
    if (hasAttendedDerby(attendedMatches) && !earnedBadgeIds.includes('DERBY_DAY')) {
        newlyEarned.push('DERBY_DAY');
    }

    // --- New Badges ---

    // Check for 'French Connection' (Catalans' home ground)
    if (attendedMatches.some(am => am.match.venue === 'Stade Gilbert Brutus') && !earnedBadgeIds.includes('FRENCH_TRIP')) {
        newlyEarned.push('FRENCH_TRIP');
    }

    // Check for 'Away Day Tripper'
    if (user.favoriteTeamId && !earnedBadgeIds.includes('AWAY_DAYS')) {
        const awayMatchCount = attendedMatches.filter(am => am.match.awayTeam.id === user.favoriteTeamId).length;
        if (awayMatchCount >= 3) {
            newlyEarned.push('AWAY_DAYS');
        }
    }
    
    // Check for 'Magic Weekend'
    if (attendedMatches.some(am => am.match.venue === "St James' Park") && !earnedBadgeIds.includes('MAGIC_WEEKEND')) {
        newlyEarned.push('MAGIC_WEEKEND');
    }

    // Check for 'Grand Final Fan'
    if (attendedMatches.some(am => am.match.venue === 'Old Trafford') && !earnedBadgeIds.includes('GRAND_FINAL')) {
        newlyEarned.push('GRAND_FINAL');
    }

    // Check for 'Club Collector'
    const totalTeams = 12; // There are 12 teams in the Super League
    const seenTeams = new Set<string>();
    attendedMatches.forEach(am => {
        if(am.match.homeTeam.id) seenTeams.add(am.match.homeTeam.id);
        if(am.match.awayTeam.id) seenTeams.add(am.match.awayTeam.id);
    });
    if (seenTeams.size >= totalTeams && !earnedBadgeIds.includes('CLUB_COLLECTOR')) {
        newlyEarned.push('CLUB_COLLECTOR');
    }

    return newlyEarned;
};