import React, { useState, useMemo } from 'react';
import type { Match, Prediction, Team } from '../types';
import { TeamLogo } from './TeamLogo';
import { ClipboardDocumentCheckIcon, CheckCircleIcon, TrashIcon } from './Icons';
import { TEAM_BRANDING } from '../services/mockData';

const MARGIN_BANDS = [
    { label: '1-5', value: 5 },
    { label: '6-10', value: 10 },
    { label: '11-15', value: 15 },
    { label: '16-20', value: 20 },
    { label: '21+', value: 21 },
];

interface PredictionCardProps {
    match: Match;
    prediction: Prediction | undefined;
    onSave: (prediction: Prediction) => void;
    onDelete: (matchId: string) => void;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ match, prediction, onSave, onDelete }) => {
    const [selectedWinner, setSelectedWinner] = useState<string | 'draw' | null>(prediction?.predictedWinnerId || null);
    const [selectedMargin, setSelectedMargin] = useState<number | null>(prediction?.predictedMargin || null);

    const handleWinnerSelect = (winnerId: string | 'draw') => {
        setSelectedWinner(winnerId);
        if (winnerId === 'draw') {
            setSelectedMargin(0); // Margin is 0 for a draw
            onSave({ matchId: match.id, predictedWinnerId: 'draw', predictedMargin: 0 });
        } else {
            // If a margin is already selected, save immediately, otherwise wait for margin selection
            if (selectedMargin) {
                onSave({ matchId: match.id, predictedWinnerId: winnerId, predictedMargin: selectedMargin });
            }
        }
    };

    const handleMarginSelect = (marginValue: number) => {
        setSelectedMargin(marginValue);
        if (selectedWinner && selectedWinner !== 'draw') {
            onSave({ matchId: match.id, predictedWinnerId: selectedWinner, predictedMargin: marginValue });
        }
    };

    const handleClearPrediction = () => {
        setSelectedWinner(null);
        setSelectedMargin(null);
        onDelete(match.id);
    };

    const TeamButton: React.FC<{ team: Team }> = ({ team }) => {
        const isSelected = selectedWinner === team.id;
        const branding = TEAM_BRANDING[team.id];
        return (
            <button
                onClick={() => handleWinnerSelect(team.id)}
                className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 ${isSelected ? 'shadow-lg' : 'hover:bg-surface-alt'}`}
                style={{ borderColor: isSelected ? branding.bg : 'transparent' }}
            >
                <TeamLogo teamId={team.id} teamName={team.name} size="medium" className="mx-auto" />
                <span className="block font-semibold text-text-strong mt-2 text-sm">{team.name}</span>
            </button>
        );
    };

    return (
        <div className="bg-surface rounded-xl shadow-card p-4 space-y-4">
            <div className="text-center">
                <p className="text-xs text-text-subtle">{new Date(match.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                <p className="text-xs text-text-subtle">{match.venue}</p>
            </div>
            <div className="flex items-center justify-around gap-2">
                <TeamButton team={match.homeTeam} />
                <div className="flex flex-col items-center">
                    <button 
                        onClick={() => handleWinnerSelect('draw')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg border-2 ${selectedWinner === 'draw' ? 'bg-accent/20 border-accent' : 'border-transparent text-text-subtle hover:bg-surface-alt'}`}
                    >
                        DRAW
                    </button>
                </div>
                <TeamButton team={match.awayTeam} />
            </div>
            {selectedWinner && selectedWinner !== 'draw' && (
                <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold text-center text-text-subtle mb-2">Select Winning Margin</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {MARGIN_BANDS.map(band => (
                            <button
                                key={band.value}
                                onClick={() => handleMarginSelect(band.value)}
                                className={`p-2 text-xs font-semibold rounded-md transition-colors ${selectedMargin === band.value ? 'bg-primary text-white' : 'bg-surface-alt hover:bg-border text-text'}`}
                            >
                                {band.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {prediction && (
                <div className="pt-4 border-t border-border text-center">
                    <p className="text-sm font-semibold text-text-strong flex items-center justify-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-success" />
                        Your Prediction: 
                        <span className="text-primary">
                            {prediction.predictedWinnerId === 'draw'
                                ? 'Draw'
                                : prediction.predictedWinnerId === match.homeTeam.id
                                ? `${match.homeTeam.name} by ${MARGIN_BANDS.find(b => b.value === prediction.predictedMargin)?.label}`
                                : `${match.awayTeam.name} by ${MARGIN_BANDS.find(b => b.value === prediction.predictedMargin)?.label}`}
                        </span>
                    </p>
                    <button onClick={handleClearPrediction} className="text-xs text-danger hover:underline mt-2 flex items-center gap-1 mx-auto">
                        <TrashIcon className="w-3 h-3"/>
                        Clear Prediction
                    </button>
                </div>
            )}
        </div>
    );
};


interface PredictionGamesViewProps {
    matches: Match[];
    predictions: Prediction[];
    onSavePrediction: (prediction: Prediction) => void;
    onDeletePrediction: (matchId: string) => void;
}

export const PredictionGamesView: React.FC<PredictionGamesViewProps> = ({ matches, predictions, onSavePrediction, onDeletePrediction }) => {
    
    const upcomingMatches = useMemo(() => {
        const now = new Date();
        return matches
            .filter(match => match.status === 'SCHEDULED' && new Date(match.startTime) > now)
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    }, [matches]);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
                <ClipboardDocumentCheckIcon className="w-8 h-8 text-primary" />
                <div>
                    <h1 className="text-3xl font-bold text-text-strong">Prediction Games</h1>
                    <p className="text-text-subtle mt-1">Predict the winner and margin for upcoming matches.</p>
                </div>
            </div>

            {upcomingMatches.length === 0 ? (
                <div className="text-center py-20 bg-surface rounded-md">
                    <h2 className="text-2xl font-bold text-text-strong">No Games Available</h2>
                    <p className="text-text-subtle mt-2">There are currently no upcoming matches open for predictions. Check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingMatches.map(match => (
                        <PredictionCard
                            key={match.id}
                            match={match}
                            prediction={predictions.find(p => p.matchId === match.id)}
                            onSave={onSavePrediction}
                            onDelete={onDeletePrediction}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
