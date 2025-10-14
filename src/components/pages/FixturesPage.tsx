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
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Upcoming Fixtures</h2>
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