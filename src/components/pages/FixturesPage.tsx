import React from 'react';
import { MatchCard } from '../molecules/MatchCard';

interface Fixture {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeLogo: string;
  awayLogo: string;
}

interface FixturesPageProps {
  fixtures: Fixture[];
}

export const FixturesPage: React.FC<FixturesPageProps> = ({ fixtures }) => {
  return (
    <div className="space-y-4">
      <h2 className="section-title mb-6 text-sm">Upcoming Fixtures</h2>
      {fixtures.map((fixture) => (
        <MatchCard
          key={fixture.id}
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          date={fixture.date}
          homeLogo={fixture.homeLogo}
          awayLogo={fixture.awayLogo}
          onClick={() => console.log('Match clicked:', fixture.id)}
        />
      ))}
    </div>
  );
};