import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TEAMS, VENUES } from '../services/mockData';
import { TeamLogo } from './Icons';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { haversineDistance } from '../utils/geolocation';
import { useGeolocation } from '../hooks/useGeolocation';

interface Team {
  id: string;
  name: string;
  logo: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}

interface Venue {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

const teams: Team[] = TEAMS.map(t => ({
  ...t,
  played: 3,
  wins: Math.floor(Math.random() * 4),
  draws: Math.floor(Math.random() * 2),
  losses: Math.floor(Math.random() * 2),
  points: Math.floor(Math.random() * 10),
}));

const venues: Venue[] = VENUES;

export const LeagueTableView: React.FC = () => {
    const [sortedVenues, setSortedVenues] = useState<Venue[]>(venues);
    const [loading, setLoading] = useState<boolean>(true);
    const { position, error: geoError, isLoading: geoLoading, requestLocation } = useGeolocation();

    const getLocation = useCallback(() => {
        requestLocation();
    }, [requestLocation]);

    const sortedVenuesByDistance = useMemo(() => {
        if (position) {
            const venuesWithDistance = venues.map(venue => ({
                ...venue,
                distance: haversineDistance(
                    { latitude: position.coords.latitude, longitude: position.coords.longitude },
                    { latitude: venue.lat, longitude: venue.lon }
                )
            }));
            venuesWithDistance.sort((a, b) => a.distance - b.distance);
            return venuesWithDistance;
        }
        return venues;
    }, [position]);

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    if (!geoLoading && loading) {
        setSortedVenues(sortedVenuesByDistance);
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-bold">Betfred Super League Table</h2>
                <p className="text-muted-foreground">Current standings for the 2024 season.</p>
            </div>
            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">#</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Team</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">P</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">W</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">D</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">L</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Pts</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                        {teams.sort((a, b) => b.points - a.points).map((team, index) => (
                            <tr key={team.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">{index + 1}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm flex items-center">
                                    <TeamLogo logo={team.logo} alt={team.name} size={24} />
                                    <span className="ml-3">{team.name}</span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">{team.played}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">{team.wins}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">{team.draws}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">{team.losses}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm font-bold">{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-lg font-bold">Nearest Grounds</h2>
                <p className="text-muted-foreground">Stadiums closest to your current location.</p>
            </div>
            {geoError && <p className="text-red-500">Error getting location: {geoError}</p>}
            <div className="overflow-x-auto rounded-lg border">
                {loading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-4">Finding nearest grounds...</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted/50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Ground</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Distance (miles)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-background">
                            {sortedVenues.map((venue) => (
                                <tr key={venue.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">{venue.name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {/* @ts-expect-error distance is added dynamically */}
                                        {venue.distance ? `${Math.round(venue.distance * 0.621371)} miles` : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
             <div className="text-center mt-4">
                <Button onClick={getLocation} disabled={geoLoading}>
                    {geoLoading ? 'Refreshing...' : 'Refresh My Location'}
                </Button>
            </div>
        </div>
    );
};
