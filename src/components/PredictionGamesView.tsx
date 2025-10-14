import React, { useMemo, useState, useEffect } from 'react';
import type {
  Match,
  Prediction,
  PredictionOutcome,
  PredictionConfidence,
  SaveUserPredictionInput,
} from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface PredictionGamesViewProps {
  matches: Match[];
  predictions: Prediction[];
  onSavePrediction: (input: SaveUserPredictionInput) => Promise<void> | void;
  onDeletePrediction: (matchId: string) => Promise<void> | void;
}

const outcomeLabels: Record<PredictionOutcome, string> = {
  HOME_WIN: 'Home win',
  AWAY_WIN: 'Away win',
  DRAW: 'Draw',
};

const confidenceLabels: Record<PredictionConfidence, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

const getMatchKickoff = (match: Match) =>
  new Date(match.startTime).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const PredictionGamesView: React.FC<PredictionGamesViewProps> = ({
  matches,
  predictions,
  onSavePrediction,
  onDeletePrediction,
}) => {
  const upcomingMatches = useMemo(
    () =>
      matches
        .filter((match) => match.status === 'SCHEDULED')
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
    [matches]
  );

  const [selectedMatchId, setSelectedMatchId] = useState<string>(upcomingMatches[0]?.id ?? '');
  const [outcome, setOutcome] = useState<PredictionOutcome>('HOME_WIN');
  const [confidence, setConfidence] = useState<PredictionConfidence>('MEDIUM');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedMatchId && upcomingMatches.length > 0) {
      setSelectedMatchId(upcomingMatches[0].id);
      return;
    }

    const existingPrediction = predictions.find((prediction) => prediction.matchId === selectedMatchId);
    if (existingPrediction) {
      setOutcome(existingPrediction.outcome);
      setConfidence(existingPrediction.confidence ?? 'MEDIUM');
      setNotes(existingPrediction.notes ?? '');
    } else {
      setOutcome('HOME_WIN');
      setConfidence('MEDIUM');
      setNotes('');
    }
  }, [predictions, selectedMatchId, upcomingMatches]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!selectedMatchId) {
      return;
    }

    try {
      setIsSaving(true);
      await onSavePrediction({
        matchId: selectedMatchId,
        outcome,
        confidence,
        notes: notes.trim() ? notes.trim() : undefined,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (matchId: string) => {
    try {
      setIsDeleting(matchId);
      await onDeletePrediction(matchId);
      if (matchId === selectedMatchId) {
        setNotes('');
      }
    } finally {
      setIsDeleting(null);
    }
  };

  if (!matches.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner />
        <p className="mt-4 text-text-subtle">Loading fixtures for prediction games...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-surface-muted bg-surface p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-text">Make your prediction</h2>
        {upcomingMatches.length === 0 ? (
          <p className="mt-4 text-text-subtle">There are no upcoming matches available for predictions right now.</p>
        ) : (
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-text-subtle">
              Match
              <select
                className="mt-1 w-full rounded-md border border-surface-muted bg-surface-strong px-3 py-2 text-text"
                value={selectedMatchId}
                onChange={(event) => setSelectedMatchId(event.target.value)}
              >
                {upcomingMatches.map((match) => (
                  <option key={match.id} value={match.id}>
                    {match.homeTeam.name} vs {match.awayTeam.name} — {getMatchKickoff(match)}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-text-subtle">Outcome</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {Object.entries(outcomeLabels).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={`rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary ${
                      outcome === value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-surface-muted bg-surface-strong text-text-subtle hover:border-primary'
                    }`}
                    onClick={() => setOutcome(value as PredictionOutcome)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block text-sm font-medium text-text-subtle">
              Confidence
              <select
                className="mt-1 w-full rounded-md border border-surface-muted bg-surface-strong px-3 py-2 text-text"
                value={confidence}
                onChange={(event) => setConfidence(event.target.value as PredictionConfidence)}
              >
                {Object.entries(confidenceLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-text-subtle">
              Notes <span className="font-normal text-text-muted">(optional)</span>
              <textarea
                className="mt-1 w-full rounded-md border border-surface-muted bg-surface-strong px-3 py-2 text-sm text-text"
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Share your reasoning for this prediction..."
              />
            </label>

            <div className="flex items-center justify-end gap-3">
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-primary/60"
                disabled={isSaving || !selectedMatchId}
              >
                {isSaving ? 'Saving...' : 'Save prediction'}
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="rounded-xl border border-surface-muted bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">Your predictions</h2>
          <span className="text-sm text-text-subtle">{predictions.length} saved</span>
        </div>

        {predictions.length === 0 ? (
          <p className="mt-4 text-text-subtle">
            You haven't saved any predictions yet. Pick an upcoming match and lock in your call!
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {predictions
              .slice()
              .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
              .map((prediction) => {
                const match = matches.find((item) => item.id === prediction.matchId);
                return (
                  <li key={prediction.id} className="rounded-lg border border-surface-muted bg-surface-strong p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-text">
                          {match ? `${match.homeTeam.name} vs ${match.awayTeam.name}` : 'Match unavailable'}
                        </p>
                        {match && (
                          <p className="text-xs text-text-muted">Kick-off: {getMatchKickoff(match)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                          {outcomeLabels[prediction.outcome]}
                        </span>
                        {prediction.confidence && (
                          <span className="rounded-full bg-surface px-2 py-1 text-xs text-text-subtle">
                            {confidenceLabels[prediction.confidence]} confidence
                          </span>
                        )}
                      </div>
                    </div>
                    {prediction.notes && <p className="mt-3 text-sm text-text-subtle">“{prediction.notes}”</p>}
                    <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                      <span>
                        Last updated: {new Date(prediction.updatedAt).toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                      </span>
                      <button
                        type="button"
                        className="text-xs font-semibold text-destructive hover:text-destructive-dark disabled:cursor-not-allowed"
                        onClick={() => handleDelete(prediction.matchId)}
                        disabled={isDeleting === prediction.matchId}
                      >
                        {isDeleting === prediction.matchId ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PredictionGamesView;
