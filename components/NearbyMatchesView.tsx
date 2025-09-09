import React, { useEffect, useMemo, useState } from 'react';
import type { Match } from '../types';
import { MatchListItem } from './MatchListItem';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertTriangleIcon } from './Icons';
import { useGeolocation } from '../hooks/useGeolocation';
import { getDistance } from '../utils/geolocation';
import { ALL_VENUES } from '../services/mockData';

interface NearbyMatch extends Match {
    distance: number;
}

interface NearbyMatchesViewProps {
    matches: Match[];
    attendedMatchIds: string[];
    onAttend: (match: Match) => void;
    onUnattend: (matchId: string) => void;
}

export const NearbyMatchesView: React.FC<NearbyMatchesViewProps> = ({ matches, attendedMatchIds, onAttend, onUnattend }) => {
    const { position, isLoading, error, requestLocation } = useGeolocation();
    const [sortedMatches, setSortedMatches] = useState<NearbyMatch[]>([]);

    useEffect(() => {
        requestLocation();
    }, [requestLocation]);

    const upcomingMatches = useMemo(() => {
        return matches.filter(match => new Date(match.startTime) > new Date() && match.status === 'SCHEDULED');
    }, [matches]);

    useEffect(() => {
        if (position && upcomingMatches.length > 0) {
            const matchesWithDistance = upcomingMatches.map(match => {
                const venue = ALL_VENUES.find(v => v.name === match.venue);
                if (!venue) return null;
                const distance = getDistance(position.lat, position.lon, venue.lat, venue.lon);
                return { ...match, distance };
            }).filter((m): m is NearbyMatch => m !== null);
            
            matchesWithDistance.sort((a, b) => a.distance - b.distance);
            setSortedMatches(matchesWithDistance);
        }
    }, [position, upcomingMatches]);
    
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <LoadingSpinner />
                <p className="mt-4 text-text-subtle text-center">Getting your location to find nearby matches...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-surface p-8 rounded-md text-center flex flex-col items-center shadow-card">
                <AlertTriangleIcon className="w-12 h-12 text-danger mb-4" />
                <h2 className="text-xl font-bold text-text-strong mb-2">Location Error</h2>
                <p className="text-text-subtle mb-6 max-w-md">
                    {error.code === 1 
                        ? "You've denied location access. Please enable it in your browser settings to use this feature." 
                        : "Could not determine your location. Please check your connection and try again."}
                </p>
                <button
                    onClick={requestLocation}
                    className="bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-4">
                <h1 className="text-3xl font-bold text-text-strong">Nearby Matches</h1>
                <p className="text-text-subtle mt-1">Upcoming Super League matches, sorted by distance.</p>
            </div>

            {sortedMatches.length === 0 ? (
                 <div className="text-center py-20 bg-surface rounded-md">
                    <h2 className="text-2xl font-bold text-text-strong">No Nearby Matches</h2>
                    <p className="text-text-subtle mt-2">There are no upcoming matches near your location.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedMatches.map(match => (
                         <MatchListItem
                            key={match.id}
                            match={match}
                            isAttended={attendedMatchIds.includes(match.id)}
                            onAttend={onAttend}
                            onUnattend={onUnattend}
                            distance={match.distance}
                         />
                    ))}
                </div>
            )}
        </div>
    );
};
