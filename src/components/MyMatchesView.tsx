import React, { useState, useMemo } from 'react';
import type { AttendedMatch } from '../types';
import { TrashIcon, CalendarIcon, LocationMarkerIcon, RefreshIcon, CameraIcon } from './Icons';
import { TeamLogo } from './TeamLogo';
import { useAuth } from '../contexts/AuthContext';
import { PhotoUploadModal } from './PhotoUploadModal';
import { PhotoViewerModal } from './PhotoViewerModal';
import { formatDateUK } from '../utils/date';

interface MyMatchesViewProps {
    attendedMatches: AttendedMatch[];
    onRemove: (matchId: string) => void;
}

export const MyMatchesView: React.FC<MyMatchesViewProps> = ({ attendedMatches, onRemove }) => {
    const [yearFilter, setYearFilter] = useState('all');
    const [competitionFilter, setCompetitionFilter] = useState('all');
    const [sortBy, setSortBy] = useState('attendedDesc');
    
    const [uploadModalMatch, setUploadModalMatch] = useState<AttendedMatch | null>(null);
    const [viewModalMatch, setViewModalMatch] = useState<AttendedMatch | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { addPhotoToMatch } = useAuth();

    const handleUploadPhoto = async (matchId: string, file: File) => {
        setIsUploading(true);
        try {
            await addPhotoToMatch(matchId, file);
            setUploadModalMatch(null);
        } catch (error) {
            console.error("Upload failed in view:", error);
            // Optionally, show an error message to the user in the modal
        } finally {
            setIsUploading(false);
        }
    };

    const { availableYears, availableCompetitions } = useMemo(() => {
        const years = new Set<string>();
        const competitions = new Set<string>();
        attendedMatches.forEach(am => {
            years.add(new Date(am.match.startTime).getFullYear().toString());
            competitions.add(am.match.competition?.name || 'Other');
        });
        return {
            availableYears: Array.from(years).sort((a, b) => b.localeCompare(a)),
            availableCompetitions: Array.from(competitions).sort()
        };
    }, [attendedMatches]);

    const filteredAndSortedMatches = useMemo(() => {
        return [...attendedMatches]
            .filter(am => {
                const matchYear = new Date(am.match.startTime).getFullYear().toString();
                const matchCompetition = am.match.competition?.name || 'Other';
                const yearMatch = yearFilter === 'all' || matchYear === yearFilter;
                const competitionMatch = competitionFilter === 'all' || matchCompetition === competitionFilter;
                return yearMatch && competitionMatch;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'attendedAsc':
                        return new Date(a.attendedOn).getTime() - new Date(b.attendedOn).getTime();
                    case 'matchDesc':
                        return new Date(b.match.startTime).getTime() - new Date(a.match.startTime).getTime();
                    case 'matchAsc':
                        return new Date(a.match.startTime).getTime() - new Date(b.match.startTime).getTime();
                    case 'attendedDesc':
                    default:
                        return new Date(b.attendedOn).getTime() - new Date(a.attendedOn).getTime();
                }
            });
    }, [attendedMatches, yearFilter, competitionFilter, sortBy]);

    const handleClearFilters = () => {
        setYearFilter('all');
        setCompetitionFilter('all');
        setSortBy('attendedDesc');
    };

    if (attendedMatches.length === 0) {
        return (
            <div className="text-center py-20 bg-surface rounded-md">
                <h2 className="text-2xl font-bold text-text-strong">No Matches Attended Yet</h2>
                <p className="text-text-subtle mt-2">Go to "Fixtures & Results" and click "I was there" to build your collection of attended games!</p>
            </div>
        );
    }

    const SelectControl: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> = ({ label, value, onChange, children }) => (
        <div className="flex flex-col">
            <label className="text-xs font-semibold text-text-subtle mb-1">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="bg-surface text-text placeholder-text-subtle border border-border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary h-10"
            >
                {children}
            </select>
        </div>
    );
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-text-strong border-b border-border pb-4">My Attended Matches ({attendedMatches.length})</h1>
            
            <div className="bg-surface p-4 rounded-md shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <SelectControl label="Filter by Year" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                        <option value="all">All Years</option>
                        {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                    </SelectControl>

                    <SelectControl label="Filter by Competition" value={competitionFilter} onChange={(e) => setCompetitionFilter(e.target.value)}>
                        <option value="all">All Competitions</option>
                        {availableCompetitions.map(comp => <option key={comp} value={comp}>{comp}</option>)}
                    </SelectControl>
                    
                    <SelectControl label="Sort By" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="attendedDesc">Date Attended (Newest)</option>
                        <option value="attendedAsc">Date Attended (Oldest)</option>
                        <option value="matchDesc">Match Date (Newest)</option>
                        <option value="matchAsc">Match Date (Oldest)</option>
                    </SelectControl>
                    
                    <button
                        onClick={handleClearFilters}
                        className="flex items-center justify-center gap-2 bg-surface-alt text-text-subtle font-semibold py-2 px-4 rounded-md hover:bg-border/50 transition-colors h-10"
                    >
                        <RefreshIcon className="w-5 h-5"/>
                        Clear
                    </button>
                </div>
            </div>

            {filteredAndSortedMatches.length === 0 ? (
                 <div className="text-center py-20 bg-surface rounded-md">
                    <h2 className="text-2xl font-bold text-text-strong">No Matches Found</h2>
                    <p className="text-text-subtle mt-2">Try adjusting your filters to find the matches you're looking for.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedMatches.map((attendedMatch) => {
                        const { match, attendedOn, photoUrl } = attendedMatch;
                        return (
                            <div key={match.id} className="bg-surface rounded-md shadow-card flex flex-col text-text-strong overflow-hidden">
                                {photoUrl ? (
                                    <button onClick={() => setViewModalMatch(attendedMatch)} className="relative aspect-video bg-surface-alt group cursor-pointer">
                                        <img src={photoUrl} alt={`${match.homeTeam.name} vs ${match.awayTeam.name}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-md">View Photo</span>
                                        </div>
                                    </button>
                                ) : (
                                    <button onClick={() => setUploadModalMatch(attendedMatch)} className="aspect-video bg-surface-alt flex items-center justify-center border-b border-border hover:bg-border/50 transition-colors">
                                        <div className="flex flex-col items-center gap-2 text-text-subtle">
                                            <CameraIcon className="w-8 h-8"/>
                                            <span className="text-sm font-semibold">Add Photo</span>
                                        </div>
                                    </button>
                                )}
                                <div className="p-4 flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <p className="text-sm text-primary font-semibold">{match.competition?.name || 'Super League'}</p>
                                        <p className="text-xs text-text-subtle">
                                            Attended: {formatDateUK(attendedOn)}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-2 w-2/5 truncate">
                                            <TeamLogo teamId={match.homeTeam?.id} teamName={match.homeTeam?.name || 'Home Team'} size="small" />
                                            <span className="font-semibold text-sm">{match.homeTeam?.name || 'Home Team'}</span>
                                        </div>
                                        
                                        {match.status === 'FULL-TIME' ? (
                                            <div className="font-extrabold text-lg text-primary [font-variant-numeric:tabular-nums]">
                                                {match.scores.home} - {match.scores.away}
                                            </div>
                                        ) : (
                                            <div className="font-semibold text-base text-text-subtle">
                                                {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 w-2/5 truncate justify-end">
                                            <span className="font-semibold text-sm text-right">{match.awayTeam?.name || 'Away Team'}</span>
                                            <TeamLogo teamId={match.awayTeam?.id} teamName={match.awayTeam?.name || 'Away Team'} size="small" />
                                        </div>
                                    </div>

                                    <div className="text-xs text-text-subtle space-y-1 mt-4">
                                        <div className="flex items-center gap-2">
                                            <LocationMarkerIcon className="w-3 h-3"/>
                                            <span>{match.venue}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="w-3 h-3"/>
                                            <span>Match Date: {formatDateUK(match.startTime)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface-alt p-2 flex justify-end items-center gap-2 rounded-b-md border-t border-border">
                                    <button onClick={() => setUploadModalMatch(attendedMatch)} className="text-info hover:bg-info/10 transition-colors p-1 rounded-full" aria-label="Upload or change photo">
                                        <CameraIcon className="w-5 h-5"/>
                                    </button>
                                    <button onClick={() => onRemove(match.id)} className="text-danger hover:bg-danger/10 transition-colors p-1 rounded-full" aria-label="Remove attended match">
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <PhotoUploadModal 
                match={uploadModalMatch} 
                isOpen={!!uploadModalMatch} 
                onClose={() => setUploadModalMatch(null)}
                onUpload={handleUploadPhoto}
                isUploading={isUploading}
            />
            <PhotoViewerModal 
                attendedMatch={viewModalMatch}
                isOpen={!!viewModalMatch}
                onClose={() => setViewModalMatch(null)}
            />
        </div>
    );
};