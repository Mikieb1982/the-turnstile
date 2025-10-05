import type { ComponentType, SVGProps } from 'react';
import {
  CalendarIcon,
  ChartBarIcon,
  ListBulletIcon,
  LogoIcon,
  PencilIcon,
  SparklesIcon,
  TrophyIcon,
  UsersIcon,
} from '@/components/Icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const iconRegistry = {
  calendar: CalendarIcon,
  chartBar: ChartBarIcon,
  listBullet: ListBulletIcon,
  logo: LogoIcon,
  pencil: PencilIcon,
  sparkles: SparklesIcon,
  trophy: TrophyIcon,
  users: UsersIcon,
} satisfies Record<string, IconComponent>;

export type IconName = keyof typeof iconRegistry;

export const resolveIcon = (icon: IconName): IconComponent => iconRegistry[icon];
