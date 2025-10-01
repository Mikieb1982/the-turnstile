import React, { useEffect, useMemo, useState } from 'react';
import type { AttendedMatch, User, View } from '../types';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AvatarModal } from './AvatarModal';
import { TeamLogo } from './TeamLogo';
import {
  ArrowRightOnRectangleIcon,
  BuildingStadiumIcon,
  ChartBarIcon,
  ListBulletIcon,
  PencilIcon,
  TrophyIcon,
  UserCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
} from './Icons'; // Make sure Lock icons are in your Icons.tsx
import { TEAMS } from '../services/mockData';
import styles from './ProfileView.module.css';

// --- React Grid Layout Imports ---
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Helper to get team details by ID
const getTeamById = (teamId?: string) => {
  if (!teamId) return undefined;
  return Object.values(TEAMS).find(team => team.id === teamId);
};

interface ProfileViewProps {
  user: User;
  setUser: (user: Partial<User>) => void;
  setView: (view: View) => void;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  onLogout: () => void;
}

// Define the initial layout for the tiles
const initialLayouts = {
  lg: [
    { i: 'profile', x: 0, y: 0, w: 12, h: 2, static: true }, // Profile tile is static
    { i: 'team', x: 0, y: 2, w: 4, h: 2 },
    { i: 'last_match', x: 4, y: 2, w: 4, h: 2 },
    { i: 'my_matches', x: 8, y: 2, w: 4, h: 1 },
    { i: 'grounds', x: 8, y: 3, w: 4, h: 1 },
    { i: 'stats', x: 0, y: 4, w: 4, h: 1 },
    { i: 'badges', x: 4, y: 4, w: 4, h: 1 },
    { i: 'admin', x:
