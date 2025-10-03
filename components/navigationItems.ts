import type { View } from '../types';

export type NavigationItem = {
  label: string;
  view: View;
};

export const mainNavigationItems: NavigationItem[] = [
  { label: 'Profile', view: 'PROFILE' },
  { label: 'Next 7 Days', view: 'UPCOMING' },
  { label: 'Nearby', view: 'NEARBY' },
  { label: 'Fixtures & Results', view: 'MATCH_DAY' },
  { label: 'League Table', view: 'LEAGUE_TABLE' },
  { label: 'Grounds', view: 'GROUNDS' },
  { label: 'Community', view: 'COMMUNITY' },
  { label: 'About', view: 'ABOUT' },
];
