import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from './ui/badge';
import { TeamLogo } from './Icons';
import { PREDICTION_GAMES } from '../services/mockData';

interface Prediction {
    gameId: string;
    predictedWinnerId: string;
}

export const PredictionGamesView: React.FC = () => {
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [showResults, setShowResults] = useState<{ [key: string]: boolean }>({});

    const handlePrediction = (gameId: string, teamId: string) => {
        if (predictions.find(p => p.gameId === gameId)) return; // Already predicted

        setPredictions([...predictions, { gameId, predictedWinnerId: teamId }]);
    };

    const toggleResults = (gameId: string) => {
        setShowResults(prev => ({ ...prev, [gameId]: !prev[gameId] }));
    }

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h2 className="text-lg font-bold">Prediction Games</h2>
                <p className="text-muted-foreground">Test your rugby league knowledge and predict the winners.</p>
            </div>

            {PREDICTION_GAMES.map(game => {
                const prediction = predictions.find(p => p.gameId === game.id);
                const isPredicted = !!prediction;
                const isResultShown = showResults[game.id];
                const isCorrect = isPredicted && prediction?.predictedWinnerId === game.actualWinnerId;

                return (
                    <Card key={game.id}>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">{game.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {game.options.map(option => {
                                    const isSelected = isPredicted && prediction?.predictedWinnerId === option.id;
                                    return (
                                        <div
                                            key={option.id}
                                            className={`rounded-lg border p-4 flex flex-col items-center justify-center text-center transition-all ${
                                                isPredicted
                                                    ? isSelected ? 'bg-primary/20 border-primary shadow-lg' : 'opacity-50'
                                                    : 'cursor-pointer hover:bg-muted/50'
                                            }`}
                                            onClick={() => !isPredicted && handlePrediction(game.id, option.id)}
                                        >
                                            <TeamLogo logo={option.logo} alt={option.name} size={48} />
                                            <p className="font-semibold mt-2">{option.name}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            {isPredicted && (
                                <div className="mt-4 text-center">
                                    <Button variant="outline" onClick={() => toggleResults(game.id)}>
                                        {isResultShown ? 'Hide' : 'Show'} Result
                                    </Button>

                                    {isResultShown && (
                                        <div className="mt-4 p-4 rounded-lg bg-muted/50">
                                            <p className="font-semibold">The actual winner was: {game.options.find(o => o.id === game.actualWinnerId)?.name}</p>
                                            {isCorrect ? (
                                                <Badge color="green" className="mt-2">Your prediction was correct!</Badge>
                                            ) : (
                                                <Badge color="red" className="mt-2">Your prediction was incorrect.</Badge>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )
            })}
             <Card className="mt-8">
                <CardHeader>
                    <CardTitle>How it Works</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    <p>
                        Prediction games are a fun way to engage with the upcoming matches. Simply select the team you think will win for each available game.
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li>You can only make one prediction per game.</li>
                        <li>Once you&apos;ve made a prediction, you cannot change it.</li>
                        <li>After the match has concluded, you can reveal the result to see if your prediction was correct.</li>
                        <li>Future updates will include a leaderboard and rewards for correct predictions!</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};
