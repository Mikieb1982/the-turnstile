<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import type { LeagueStanding, Venue } from '../types';
import { fetchLeagueTable } from '../services/apiService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';
import { RefreshIcon, AlertTriangleIcon } from './Icons';
import { TeamLogo } from './TeamLogo';
import { ALL_VENUES, TEAM_BRANDING } from '../services/mockData';
import { getDistance } from '../utils/geolocation';

const FormIndicator: React.FC<{ form: string }> = ({ form }) => {
    return (
        <div className="flex gap-1">
            {form.split('').slice(-5).map((result, index) => {
                let color = 'bg-text-subtle/50';
                if (result === 'W') color = 'bg-success';
                if (result === 'L') color = 'bg-danger';
                if (result === 'D') color = 'bg-warning';
                return (
                    <span key={index} className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${color}`}>
                        {result}
                    </span>
                );
            })}
        </div>
    );
};

export const LeagueTableView: React.FC = () => {
    const [table, setTable] = useState<LeagueStanding[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadTable = async () => {
        setLoading(true);
        setError(null);
        try {
            const leagueTable = await fetchLeagueTable();
            setTable(leagueTable);
        } catch (err) {
            setError("Could not load the league table. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTable();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <LoadingSpinner />
                <p className="mt-4 text-text-subtle">Loading League Table...</p>
            </div>
        );
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={loadTable} />;
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    }

    return (
        <div className="space-y-6">
<<<<<<< HEAD
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
=======
            <div className="flex items-center gap-3 border-b border-border pb-4">
                <h1 className="text-3xl font-bold text-text-strong">Betfred Super League Table</h1>
                <button 
                    onClick={loadTable}
                    className="p-2 rounded-full text-text-subtle hover:bg-surface-alt transition-colors"
                    aria-label="Refresh league table"
                >
                    <RefreshIcon className="w-6 h-6"/>
                </button>
            </div>
            <div className="bg-surface rounded-md shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-text">
                        <thead className="bg-surface-alt text-xs text-text-subtle uppercase">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-center">Pos</th>
                                <th className="px-4 py-3 font-semibold min-w-[200px]">Team</th>
                                <th className="px-4 py-3 font-semibold text-center [font-variant-numeric:tabular-nums]">P</th>
                                <th className="px-4 py-3 font-semibold text-center [font-variant-numeric:tabular-nums]">W</th>
                                <th className="px-4 py-3 font-semibold text-center [font-variant-numeric:tabular-nums]">D</th>
                                <th className="px-4 py-3 font-semibold text-center [font-variant-numeric:tabular-nums]">L</th>
                                <th className="px-4 py-3 font-semibold text-center [font-variant-numeric:tabular-nums]">Pts</th>
                                <th className="px-4 py-3 font-semibold">Form</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {table.map(standing => (
                                <tr 
                                    key={standing.teamId} 
                                    className="hover:bg-surface-alt even:bg-surface-alt transition-colors"
                                    style={{ borderLeft: `4px solid ${TEAM_BRANDING[standing.teamId]?.bg || 'transparent'}` }}
                                >
                                    <td className="px-4 h-12 font-bold text-center text-text-strong">{standing.rank}</td>
                                    <td className="px-4 h-12">
                                        <div className="flex items-center gap-3">
                                            <TeamLogo teamId={standing.teamId} teamName={standing.teamName} size="small" />
                                            <span className="font-semibold text-text-strong">{standing.teamName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 h-12 font-medium text-center [font-variant-numeric:tabular-nums]">{standing.played}</td>
                                    <td className="px-4 h-12 font-medium text-center text-success [font-variant-numeric:tabular-nums]">{standing.wins}</td>
                                    <td className="px-4 h-12 font-medium text-center [font-variant-numeric:tabular-nums]">{standing.draws}</td>
                                    <td className="px-4 h-12 font-medium text-center text-danger [font-variant-numeric:tabular-nums]">{standing.losses}</td>
                                    <td className="px-4 h-12 font-bold text-center text-primary [font-variant-numeric:tabular-nums]">{standing.points}</td>
                                    <td className="px-4 h-12">
                                        <FormIndicator form={standing.form} />
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
<<<<<<< HEAD
                )}
            </div>
             <div className="text-center mt-4">
                <Button onClick={getLocation} disabled={geoLoading}>
                    {geoLoading ? 'Refreshing...' : 'Refresh My Location'}
                </Button>
=======
                </div>
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
            </div>
        </div>
    );
};
<<<<<<< HEAD
=======

// --- Grounds View Component ---

type LocationState = {
    lat: number;
    lon: number;
} | null;

type GeolocationError = {
    code: number;
    message: string;
} | null;

interface SortedVenue extends Venue {
    distance: number;
}

export const GroundsView: React.FC = () => {
    const [location, setLocation] = useState<LocationState>(null);
    const [sortedVenues, setSortedVenues] = useState<SortedVenue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<GeolocationError>(null);

    const getLocation = () => {
        setLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lon: longitude });
            },
            (err) => {
                setError({ code: err.code, message: err.message });
                setLoading(false);
            },
            { timeout: 10000 }
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (location) {
            const venuesWithDistance = ALL_VENUES
                .filter((venue) => typeof venue.lat === 'number' && typeof venue.lon === 'number')
                .map((venue) => {
                    const distanceKm = getDistance(
                        { lat: location.lat, lon: location.lon },
                        { lat: venue.lat!, lon: venue.lon! }
                    );
                    const distanceMiles = distanceKm * 0.621371;

                    return {
                        ...venue,
                        distance: distanceMiles,
                    };
                });
            venuesWithDistance.sort((a, b) => a.distance - b.distance);
            setSortedVenues(venuesWithDistance);
            setLoading(false);
        }
    }, [location]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <LoadingSpinner />
                <p className="mt-4 text-text-subtle text-center">Getting your location to find nearest grounds...</p>
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
                    onClick={getLocation}
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
                <h1 className="text-3xl font-bold text-text-strong">Super League Grounds</h1>
                <p className="text-text-subtle mt-1">Stadiums sorted by distance from your current location.</p>
            </div>
            <div className="bg-surface rounded-md shadow-card overflow-hidden">
                <ul className="divide-y divide-border">
                    {sortedVenues.map((venue, index) => (
                        <li key={venue.name} className="p-4 flex items-center justify-between hover:bg-surface-alt transition-colors duration-200">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-lg text-primary w-8 text-center [font-variant-numeric:tabular-nums]">{index + 1}</span>
                                <div>
                                    <p className="font-bold text-text-strong">{venue.name}</p>
                                    <p className="text-sm text-text-subtle">{venue.team}</p>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                                <p className="font-bold text-text-strong text-lg [font-variant-numeric:tabular-nums]">{venue.distance.toFixed(1)} mi</p>
                                <p className="text-sm text-text-subtle">away</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
