import { useEffect, useMemo, useState } from 'react';
import { fetchMatches } from './services/apiService';
import type { Match } from './types';
import { useGenkitAction } from './genkit/useGenkitAction';

interface MatchInsightResponse {
  summary?: string;
  talkingPoints?: string[];
  headline?: string;
  [key: string]: unknown;
}

interface MatchInsightInput {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  startTime: string;
}

const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const MATCH_ACTION = 'actions/matchInsights';

const App = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchesError, setMatchesError] = useState<string | null>(null);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const { status, data, error, run, lastUpdatedAt, reset } = useGenkitAction<
    MatchInsightInput,
    MatchInsightResponse
  >(MATCH_ACTION, {
    transform: (payload) => (payload ?? {}) as MatchInsightResponse,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoadingMatches(true);
      setMatchesError(null);
      try {
        const response = await fetchMatches();
        if (!cancelled) {
          setMatches(response);
          setSelectedMatchId((current) => current ?? response[0]?.id ?? null);
        }
      } catch (err) {
        console.error('Failed to fetch matches', err);
        if (!cancelled) {
          setMatchesError('We were unable to load fixtures. Try again shortly.');
          setMatches([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingMatches(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedMatch = useMemo(
    () => matches.find((match) => match.id === selectedMatchId) ?? null,
    [matches, selectedMatchId]
  );

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    reset();
  };

  const handleGenerateInsight = () => {
    if (!selectedMatch) {
      return;
    }

    void run({
      matchId: selectedMatch.id,
      homeTeam: selectedMatch.homeTeam.name,
      awayTeam: selectedMatch.awayTeam.name,
      venue: selectedMatch.venue,
      startTime: selectedMatch.startTime,
    });
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>The Turnstile</h1>
        <p>
          Prepare your Firebase Hosting front-end for Genkit experiments. Pick a fixture and send
          its details to a Genkit action without wiring up the full production dashboard.
        </p>
      </header>

      <div className="content-grid">
        <section className="panel">
          <h2>Fixture selector</h2>
          {matchesError ? (
            <div className="error-banner">
              <strong>Unable to load fixtures.</strong>
              <div>{matchesError}</div>
            </div>
          ) : loadingMatches ? (
            <div className="empty-state">Loading fixtures…</div>
          ) : matches.length === 0 ? (
            <div className="empty-state">No fixtures available.</div>
          ) : (
            <div className="matches-list">
              {matches.map((match) => {
                const isSelected = match.id === selectedMatchId;
                return (
                  <button
                    key={match.id}
                    type="button"
                    className={`match-card${isSelected ? ' selected' : ''}`}
                    onClick={() => handleSelectMatch(match.id)}
                  >
                    <strong>
                      {match.homeTeam.name} vs {match.awayTeam.name}
                    </strong>
                    <div className="match-meta">
                      <span>{match.venue}</span>
                      <span>{formatDateTime(match.startTime)}</span>
                    </div>
                    {isSelected ? <span className="status-chip success">Selected</span> : null}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="panel">
          <h2>Genkit action runner</h2>
          <small className="helper-text">
            The UI calls <code>{MATCH_ACTION}</code> with the selected fixture as the request payload.
            Update the action name or fields to match your Genkit workflow.
          </small>

          <div className={`status-chip ${status}`}>Status: {status}</div>

          <div className="match-actions">
            <button
              className="button"
              type="button"
              onClick={handleGenerateInsight}
              disabled={!selectedMatch || status === 'loading'}
            >
              {status === 'loading' ? 'Requesting insight…' : 'Generate with Genkit'}
            </button>
            <button
              className="button secondary-button"
              type="button"
              onClick={reset}
              disabled={status === 'idle'}
            >
              Reset
            </button>
          </div>

          {error ? <div className="error-banner">{error}</div> : null}

          {data ? (
            <div className="insights-output">
              <h3>{data.headline ?? 'Insight summary'}</h3>
              {data.summary ? <p>{data.summary}</p> : null}
              {Array.isArray(data.talkingPoints) && data.talkingPoints.length > 0 ? (
                <div>
                  <strong>Talking points</strong>
                  <ul>
                    {data.talkingPoints.map((point, index) => (
                      <li key={point ?? index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <small className="helper-text">
                Updated {lastUpdatedAt ? new Date(lastUpdatedAt).toLocaleTimeString() : 'just now'}.
              </small>
            </div>
          ) : (
            <div className="empty-state">
              {selectedMatch
                ? 'Run the action to preview your Genkit integration.'
                : 'Choose a fixture to connect it to your Genkit action.'}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
