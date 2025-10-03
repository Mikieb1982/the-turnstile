import React from 'react';
import type { View } from '../types';
import {
  BuildingStadiumIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  LocationMarkerIcon,
  TableCellsIcon,
  UserCircleIcon,
  UsersIcon,
  ListBulletIcon,
} from './Icons';

export type NavigationItem = {
  label: string;
  view: View;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const mainNavigationItems: NavigationItem[] = [
  { label: 'Profile', view: 'PROFILE', icon: UserCircleIcon },
  { label: 'Next 7 Days', view: 'UPCOMING', icon: CalendarDaysIcon },
  { label: 'Nearby', view: 'NEARBY', icon: LocationMarkerIcon },
  { label: 'Fixtures & Results', view: 'MATCH_DAY', icon: ListBulletIcon },
  { label: 'League Table', view: 'LEAGUE_TABLE', icon: TableCellsIcon },
  { label: 'Grounds', view: 'GROUNDS', icon: BuildingStadiumIcon },
  { label: 'Community', view: 'COMMUNITY', icon: UsersIcon },
  { label: 'About', view: 'ABOUT', icon: InformationCircleIcon },
];
