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

const MATCH_ACTION = 'actions/matchInsights';

const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const formatScore = (match: Match): string => {
  if (match.status !== 'FULL-TIME') {
    return 'Ready for kick-off';
  }
  return `${match.scores.home} – ${match.scores.away}`;
};

const statusLabel = (match: Match): string => {
  if (match.status === 'FULL-TIME') {
    return 'Full time';
  }
  const startsIn = new Date(match.startTime).getTime() - Date.now();
  if (startsIn <= 0) {
    return 'About to start';
  }
  return 'Upcoming';
};

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

  const nextKickOff = useMemo(() => {
    return (
      matches
        .filter((match) => match.status === 'SCHEDULED')
        .slice()
        .sort(
          (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )[0] ?? null
    );
  }, [matches]);

  const completedMatches = useMemo(
    () => matches.filter((match) => match.status === 'FULL-TIME').length,
    [matches]
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

  const formattedNextKickOff = loadingMatches
    ? 'Loading fixtures…'
    : nextKickOff
      ? formatDateTime(nextKickOff.startTime)
      : 'Awaiting new fixtures';

  const totalMatches = loadingMatches ? 'Loading…' : matches.length || 'No fixtures';

  return (
    <div className="page">
      <div className="page__backdrop" aria-hidden>
        <img
          src="/background.png"
          alt="Floodlit rugby league crowd"
          className="page__backdrop-image"
        />
      </div>

      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="#top">
            <span className="brand__mark">TT</span>
            <span className="brand__text">
              <strong>The Turnstile</strong>
              <span>Genkit-ready fan companion</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            <a href="#fixtures">Fixtures</a>
            <a href="#genkit">Genkit action</a>
            <a href="#about">Why it matters</a>
          </nav>

          <a className="button button--ghost" href="mailto:hello@turnstile.app">
            Contact us
          </a>
        </div>
      </header>

      <main className="site-main">
        <section className="hero" id="top">
          <div className="hero__content">
            <span className="hero__eyebrow">Built for Firebase Genkit experiments</span>
            <h1>Launch a rich rugby league dashboard without waiting on production.</h1>
            <p>
              Use live-looking fixture data, pick a match, and send it directly to your Genkit
              action. It&apos;s the fastest way to test automations and storytelling flows before the
              real feeds arrive.
            </p>
            <div className="hero__actions">
              <a className="button" href="#fixtures">
                Choose a fixture
              </a>
              <a className="button button--secondary" href="#genkit">
                Preview Genkit output
              </a>
            </div>
            <div className="hero__stats">
              <div className="stat-card">
                <span className="stat-card__label">Fixtures available</span>
                <span className="stat-card__value">{totalMatches}</span>
                <span className="stat-card__hint">Mock data refreshes on reload.</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Next kick-off</span>
                <span className="stat-card__value">{formattedNextKickOff}</span>
                <span className="stat-card__hint">Update the schedule in <code>mockData.ts</code>.</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Matches completed</span>
                <span className="stat-card__value">
                  {loadingMatches ? 'Loading…' : completedMatches}
                </span>
                <span className="stat-card__hint">Perfect for building recap workflows.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="fixtures" id="fixtures">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Step 1</span>
            <h2>Pick a match to send through Genkit</h2>
            <p>
              Select any of the fixtures below. We&apos;ll send its details straight to your Genkit
              action, so you can focus on shaping the narrative or automations around it.
            </p>
          </div>

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
            <div className="fixtures__grid">
              {matches.map((match) => {
                const isSelected = match.id === selectedMatchId;
                return (
                  <button
                    key={match.id}
                    type="button"
                    className={`fixture-card${isSelected ? ' fixture-card--selected' : ''}`}
                    onClick={() => handleSelectMatch(match.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="fixture-card__header">
                      <span className="status-pill">{match.competition.name}</span>
                      <span
                        className={`status-pill status-pill--${
                          match.status === 'FULL-TIME' ? 'final' : 'upcoming'
                        }`}
                      >
                        {statusLabel(match)}
                      </span>
                    </div>
                    <div className="fixture-card__teams">
                      <strong>
                        {match.homeTeam.name}
                        <span>vs</span>
                        {match.awayTeam.name}
                      </strong>
                    </div>
                    <div className="fixture-card__meta">
                      <span>{match.venue}</span>
                      <span>{formatDateTime(match.startTime)}</span>
                    </div>
                    <div className="fixture-card__score">{formatScore(match)}</div>
                    {isSelected ? <span className="fixture-card__selected">Selected</span> : null}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="genkit" id="genkit">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Step 2</span>
            <h2>Preview the Genkit response instantly</h2>
            <p>
              Kick off your experiments with a single click. The payload mirrors the production
              dashboard, so connecting it to your Genkit flow is effortless.
            </p>
          </div>

          <div className="genkit__grid">
            <div className="genkit-card">
              <div className="genkit-card__header">
                <h3>Selected fixture</h3>
                <span className="status-pill status-pill--outline">
                  {selectedMatch ? 'Ready to send' : 'Awaiting selection'}
                </span>
              </div>

              {selectedMatch ? (
                <dl className="selected-fixture">
                  <div>
                    <dt>Match</dt>
                    <dd>
                      {selectedMatch.homeTeam.name} vs {selectedMatch.awayTeam.name}
                    </dd>
                  </div>
                  <div>
                    <dt>Venue</dt>
                    <dd>{selectedMatch.venue}</dd>
                  </div>
                  <div>
                    <dt>Kick-off</dt>
                    <dd>{formatDateTime(selectedMatch.startTime)}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{statusLabel(selectedMatch)}</dd>
                  </div>
                </dl>
              ) : (
                <div className="empty-state">
                  Choose a fixture above to preview the request payload.
                </div>
              )}

              <p className="helper-text">
                Tweak <code>MATCH_ACTION</code> or extend the payload fields to match your workflow.
              </p>
            </div>

            <div className="genkit-card">
              <div className="genkit-card__header">
                <h3>Run your Genkit action</h3>
                <span className={`status-pill status-pill--${status}`}>Status: {status}</span>
              </div>

              <p className="genkit-card__intro">
                We call <code>{MATCH_ACTION}</code> with the selected fixture. Edit the
                implementation to point at your deployed action or local emulator.
              </p>

              <div className="genkit-card__actions">
                <button
                  className="button"
                  type="button"
                  onClick={handleGenerateInsight}
                  disabled={!selectedMatch || status === 'loading'}
                >
                  {status === 'loading' ? 'Requesting insight…' : 'Generate with Genkit'}
                </button>
                <button
                  className="button button--secondary"
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
                  <h4>{data.headline ?? 'Insight summary'}</h4>
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
                    Updated{' '}
                    {lastUpdatedAt ? new Date(lastUpdatedAt).toLocaleTimeString() : 'just now'}.
                  </small>
                </div>
              ) : (
                <div className="empty-state">
                  {selectedMatch
                    ? 'Run the action to preview your Genkit integration.'
                    : 'Choose a fixture to connect it to your Genkit action.'}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Step 3</span>
            <h2>Ship a polished experience before launch day</h2>
            <p>
              The Turnstile starter brings together fixtures, storytelling prompts, and Genkit
              hooks in one place. Share it with stakeholders or keep it as your personal lab.
            </p>
          </div>

          <div className="about__grid">
            <article className="about-card">
              <h3>Production-like visuals</h3>
              <p>
                The UI mirrors a full fan product with background imagery, match cards, and rich
                typography so you can demo ideas without extra design work.
              </p>
            </article>
            <article className="about-card">
              <h3>Editable mock data</h3>
              <p>
                Update <code>mockData.ts</code> with your own fixtures or competitions to keep the
                narrative aligned with your project.
              </p>
            </article>
            <article className="about-card">
              <h3>Genkit in the loop</h3>
              <p>
                Swap the action name or payload fields to route requests to any Genkit pipeline and
                iterate with live responses.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <strong>The Turnstile</strong>
            <p>© {new Date().getFullYear()} Crafted for rugby league supporters everywhere.</p>
          </div>
          <div className="site-footer__links">
            <a href="/privacy">Privacy</a>
            <a href="/feedback">Feedback</a>
            <a href="mailto:hello@turnstile.app">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
