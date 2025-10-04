'use client';

import React, { useState, useEffect } from 'react';
import type { LeagueStanding, Venue } from '@/types';
import { fetchLeagueTable } from '@/services/apiService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';
import { RefreshIcon, AlertTriangleIcon } from './Icons';
import { TeamLogo } from './TeamLogo';
import { ALL_VENUES, TEAM_BRANDING } from '@/services/mockData';
import { getDistance } from '@/utils/geolocation';

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
    }

    return (
        <div className="space-y-6">
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
                                    className="hover:bg-surface-alt even:bg-surface-alt/50 transition-colors"
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

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
            const venuesWithDistance = ALL_VENUES.map(venue => ({
                ...venue,
                distance: getDistance(location.lat, location.lon, venue.lat, venue.lon),
            }));
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