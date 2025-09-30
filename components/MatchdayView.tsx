import React, { useMemo, useState } from 'react';
import type { Match } from '../types';
import { MatchListItem } from './MatchListItem';

interface MatchdayViewProps {
  matches: Match[];
  attendedMatchIds: string[];
  onAttend: (match: Match) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

type ActiveTab = 'fixtures' | 'results';

type TabButtonProps = {
  tab: ActiveTab;
  label: string;
  isActive: boolean;
  onClick: (tab: ActiveTab) => void;
};

const TabButton: React.FC<TabButtonProps> = ({ tab, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(tab)}
    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
      isActive ? 'bg-primary text-white shadow-sm' : 'bg-transparent text-text-subtle hover:bg-surface hover:text-text'
    }`}
  >
    {label}
  </button>
);

export const MatchdayView: React.FC<MatchdayViewProps> = ({ matches, attendedMatchIds, onAttend }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('results');

  const { fixtures, results } = useMemo(() => {
    const fixturesList = matches
      .filter(match => match.status === 'SCHEDULED')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    const resultsList = matches
      .filter(match => match.status === 'FULL-TIME')
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    return { fixtures: fixturesList, results: resultsList };
  }, [matches]);

  const matchesToDisplay = activeTab === 'fixtures' ? fixtures : results;

  const groupedMatches = useMemo(() => {
    return matchesToDisplay.reduce<Record<string, Match[]>>((accumulator, match) => {
      const dateKey = new Date(match.startTime).toDateString();
      if (!accumulator[dateKey]) {
        accumulator[dateKey] = [];
      }
      accumulator[dateKey].push(match);
      return accumulator;
    }, {});
  }, [matchesToDisplay]);

  const sortedDateKeys = Object.keys(groupedMatches);

  const renderMatchList = () => {
    if (sortedDateKeys.length === 0) {
      return (
        <div className="rounded-md bg-surface py-20 text-center">
          <h2 className="text-2xl font-bold text-text-strong">
            {activeTab === 'fixtures' ? 'No Upcoming Fixtures' : 'No Past Results'}
          </h2>
          <p className="mt-2 text-text-subtle">
            {activeTab === 'fixtures'
              ? 'Check back later for more scheduled matches.'
              : 'There are no results to display for this season.'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {sortedDateKeys.map(dateKey => (
          <div key={dateKey}>
            <h2 className="mb-4 border-b-2 border-primary pb-2 text-xl font-bold text-text-strong">
              {formatDate(dateKey)}
            </h2>
            <div className="space-y-4">
              {groupedMatches[dateKey].map(match => (
                <MatchListItem
                  key={match.id}
                  match={match}
                  isAttended={attendedMatchIds.includes(match.id)}
                  onAttend={onAttend}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-text-strong">Fixtures &amp; Results</h1>
        <p className="mt-1 text-text-subtle">View upcoming matches or past results for the season.</p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-xl bg-surface-alt p-1">
        <TabButton tab="results" label="Results" isActive={activeTab === 'results'} onClick={setActiveTab} />
        <TabButton tab="fixtures" label="Fixtures" isActive={activeTab === 'fixtures'} onClick={setActiveTab} />
      </div>

      {renderMatchList()}
    </div>
  );
};
