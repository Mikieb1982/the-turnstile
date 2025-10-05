import type { IconName } from './icons';

export interface HighlightCardContent {
  title: string;
  description: string;
  icon: IconName;
  accent: string;
  footer?: string;
}

export interface FeatureColumnContent {
  title: string;
  icon: IconName;
  items: string[];
}

export interface FeatureCardContent {
  title: string;
  summary: string;
  focus: string;
  icon: IconName;
}

export interface HeroBadgeContent {
  icon: IconName;
  label: string;
  backgroundClass: string;
  textClass: string;
}

export interface HeroContent {
  title: string;
  description: string;
  badges: HeroBadgeContent[];
}

export interface AboutContent {
  hero: HeroContent;
  highlightCards: HighlightCardContent[];
  featureColumns: FeatureColumnContent[];
  featureCards: FeatureCardContent[];
  getStartedSteps: string[];
}

export const aboutContent: AboutContent = {
  hero: {
    title: 'Your Ultimate Rugby League Companion',
    description:
      'The Scrum Book is a dedicated space for rugby league fans to record their match-going history, celebrate their support, and connect with a community of fellow enthusiasts.',
    badges: [
      {
        icon: 'sparkles',
        label: 'Track Attended Matches',
        backgroundClass: 'bg-primary/10',
        textClass: 'text-primary',
      },
      {
        icon: 'calendar',
        label: 'Explore Fixtures & Results',
        backgroundClass: 'bg-secondary/10',
        textClass: 'text-secondary',
      },
      {
        icon: 'trophy',
        label: 'Earn Fan Badges',
        backgroundClass: 'bg-accent/10',
        textClass: 'text-accent',
      },
    ],
  },
  highlightCards: [
    {
      title: 'Your Digital Match Day Diary',
      description:
        'The Scrum Book is your personal companion for tracking every rugby league match you attend, creating a digital diary of your support.',
      icon: 'sparkles',
      accent: 'from-primary/80 to-secondary/70',
      footer: 'Never forget a match day memory.',
    },
    {
      title: 'Connect with the Community',
      description:
        'Find and connect with other fans, see their match history, and share your passion for the game.',
      icon: 'users',
      accent: 'from-secondary/70 to-accent/80',
      footer: 'Build your network of fellow supporters.',
    },
    {
      title: 'Unlock Achievements',
      description:
        'Earn badges for your dedication, from visiting new grounds to attending classic derby clashes and major finals.',
      icon: 'trophy',
      accent: 'from-accent/80 to-primary/80',
      footer: 'Show off your commitment as a super fan.',
    },
  ],
  featureColumns: [
    {
      title: 'Core Features',
      icon: 'pencil',
      items: [
        'Log every match you attend with a single click.',
        'View upcoming fixtures and past results for the season.',
        'See the live Super League table with team form guides.',
        'Explore community insights shared by fellow supporters.',
      ],
    },
    {
      title: 'Personalized Experience',
      icon: 'chartBar',
      items: [
        'Track your personal stats, including total matches and unique venues.',
        'Find nearby matches based on your current location.',
        'Set your favorite team for a more tailored experience.',
        'Upload photos to your attended matches to create a visual diary.',
      ],
    },
  ],
  featureCards: [
    {
      title: 'My Matches',
      summary:
        'A complete history of every game you’ve attended, with the ability to add photos and relive the memories.',
      focus: 'Filter by year or competition to easily find past games.',
      icon: 'listBullet',
    },
    {
      title: 'Stats & Badges',
      summary:
        'See a detailed breakdown of your support, from your most-visited grounds to your most-watched teams.',
      focus: 'Unlock a variety of badges that celebrate your dedication as a fan.',
      icon: 'chartBar',
    },
    {
      title: 'Community Hub',
      summary:
        'Connect with other rugby league fans, swap match stories, and compare attendance streaks.',
      focus: 'Discover new grounds and fixtures through the crowd’s recommendations.',
      icon: 'users',
    },
  ],
  getStartedSteps: [
    'Create your profile with a single click to start your collection.',
    'Browse the fixtures and mark any matches you have attended in the past.',
    'Upload photos to your attended matches to create a visual diary.',
    'Check out the "Grounds" view to see which stadiums are closest to you.',
    'Join the community hub to share tips, photos, and matchday highlights.',
  ],
};
