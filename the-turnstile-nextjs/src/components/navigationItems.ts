import React from 'react';
import type { View } from '@/types';
import {
  AboutIcon,
  CommunityIcon,
  FixturesResultsIcon,
  GroundsIcon,
  LeagueTableChartIcon,
  NearbyIcon,
  NextSevenDaysIcon,
  UserCircleIcon,
} from './Icons';

export type NavigationItem = {
  label: string;
  view: View;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const mainNavigationItems: NavigationItem[] = [
  { label: 'Profile', view: 'PROFILE', icon: UserCircleIcon },
  { label: 'Next 7 Days', view: 'UPCOMING', icon: NextSevenDaysIcon },
  { label: 'Nearby', view: 'NEARBY', icon: NearbyIcon },
  { label: 'Fixtures & Results', view: 'MATCH_DAY', icon: FixturesResultsIcon },
  { label: 'League Table', view: 'LEAGUE_TABLE', icon: LeagueTableChartIcon },
  { label: 'Grounds', view: 'GROUNDS', icon: GroundsIcon },
  { label: 'Community', view: 'COMMUNITY', icon: CommunityIcon },
  { label: 'About', view: 'ABOUT', icon: AboutIcon },
];
