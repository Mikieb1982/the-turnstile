import React from 'react';
import { MatchCard } from '../molecules/MatchCard';
import type { Fixture } from '../../services/mockData';

interface FixturesPageProps {
  fixtures: Fixture[];
}

export const FixturesPage: React.FC<FixturesPageProps> = ({ fixtures }) => {
  return (
    <div className="space-y-4">
      <h2 className="section-title mb-6 text-sm">Highlights &amp; Standout Results</h2>
      {fixtures.map((fixture) => (
        <MatchCard
          key={fixture.id}
          round={fixture.round}
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          date={fixture.date}
          homeLogo={fixture.homeLogo}
          awayLogo={fixture.awayLogo}
          score={fixture.score}
          venue={fixture.venue}
          note={fixture.note}
          onClick={() => console.log('Match clicked:', fixture.id)}
        />
      ))}
    </div>
  );
};