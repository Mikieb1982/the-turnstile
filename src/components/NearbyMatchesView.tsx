import React, { useEffect, useMemo } from 'react';
import type { Match } from '../types';
import MatchListItem from './MatchListItem';
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
}

export const NearbyMatchesView: React.FC<NearbyMatchesViewProps> = ({ matches, attendedMatchIds, onAttend }) => {
  const { position, isLoading, error, requestLocation } = useGeolocation();

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const upcomingMatches = useMemo(
    () => matches.filter(match => new Date(match.startTime) > new Date() && match.status === 'SCHEDULED'),
    [matches],
  );

  const sortedMatches = useMemo<NearbyMatch[]>(() => {
    if (!position) {
      return [];
    }

    return upcomingMatches
      .map(match => {
        const venue = ALL_VENUES.find(v => v.name === match.venue);
        if (!venue) {
          return null;
        }

        const distance = getDistance(position.lat, position.lon, venue.lat, venue.lon);
        return { ...match, distance };
      })
      .filter((match): match is NearbyMatch => match !== null)
      .sort((a, b) => a.distance - b.distance);
  }, [position, upcomingMatches]);

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-center text-text-subtle">Getting your location to find nearby matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center rounded-md bg-surface p-8 text-center shadow-card">
        <AlertTriangleIcon className="mb-4 h-12 w-12 text-danger" />
        <h2 className="mb-2 text-xl font-bold text-text-strong">Location Error</h2>
        <p className="mb-6 max-w-md text-text-subtle">
          {error.code === 1
            ? "You've denied location access. Please enable it in your browser settings to use this feature."
            : 'Could not determine your location. Please check your connection and try again.'}
        </p>
        <button
          onClick={requestLocation}
          className="rounded-md bg-primary px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-primary/90"
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
        <p className="mt-1 text-text-subtle">Upcoming Super League matches, sorted by distance.</p>
      </div>

      {sortedMatches.length === 0 ? (
        <div className="rounded-md bg-surface py-20 text-center">
          <h2 className="text-2xl font-bold text-text-strong">No Nearby Matches</h2>
          <p className="mt-2 text-text-subtle">There are no upcoming matches near your location.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedMatches.map(match => (
            <MatchListItem
              key={match.id}
              match={match}
              isAttended={attendedMatchIds.includes(match.id)}
              onAttend={onAttend}
              distance={match.distance}
            />
          ))}
        </div>
      )}
    </div>
  );
};
