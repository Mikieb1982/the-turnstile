import React from 'react';
import {
  LogoIcon,
  SparklesIcon,
  UsersIcon,
  ListBulletIcon,
  CalendarIcon,
  ChartBarIcon,
  PencilIcon,
  TrophyIcon,
  } from './Icons';

interface HighlightCard {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent: string;
  footer?: string;
}

interface FeatureColumn {
  title:string;
  items: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface FeatureCard {
  title: string;
  summary: string;
  focus: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const highlightCards: HighlightCard[] = [
  {
    title: 'Your Digital Match Day Diary',
    description: 'The Scrum Book is your personal companion for tracking every rugby league match you attend, creating a digital diary of your support.',
    icon: SparklesIcon,
    accent: 'from-primary/80 to-secondary/70',
    footer: 'Never forget a match day memory.',
  },
  {
    title: 'Connect with the Community',
    description: 'Find and connect with other fans, see their match history, and share your passion for the game.',
    icon: UsersIcon,
    accent: 'from-secondary/70 to-accent/80',
    footer: 'Build your network of fellow supporters.',
  },
  {
    title: 'Unlock Achievements',
    description: 'Earn badges for your dedication, from visiting new grounds to attending classic derby clashes and major finals.',
    icon: TrophyIcon,
    accent: 'from-accent/80 to-primary/80',
    footer: 'Show off your commitment as a super fan.',
  },
];

const featureColumns: FeatureColumn[] = [
  {
    title: 'Core Features',
    icon: PencilIcon,
    items: [
      'Log every match you attend with a single click.',
      'View upcoming fixtures and past results for the season.',
      'See the live Super League table with team form guides.',
      'Explore community insights shared by fellow supporters.',
    ],
  },
  {
    title: 'Personalized Experience',
    icon: ChartBarIcon,
    items: [
      'Track your personal stats, including total matches and unique venues.',
      'Find nearby matches based on your current location.',
      'Set your favorite team for a more tailored experience.',
      'Upload photos to your attended matches to create a visual diary.',
    ],
  },
];

const featureCards: FeatureCard[] = [
  {
    title: 'My Matches',
    summary: 'A complete history of every game you’ve attended, with the ability to add photos and relive the memories.',
    focus: 'Filter by year or competition to easily find past games.',
    icon: ListBulletIcon,
  },
  {
    title: 'Stats & Badges',
    summary: 'See a detailed breakdown of your support, from your most-visited grounds to your most-watched teams.',
    focus: 'Unlock a variety of badges that celebrate your dedication as a fan.',
    icon: ChartBarIcon,
  },
  {
    title: 'Community Hub',
    summary: 'Connect with other rugby league fans, swap match stories, and compare attendance streaks.',
    focus: 'Discover new grounds and fixtures through the crowd’s recommendations.',
    icon: UsersIcon,
  },
];

const getStartedSteps: string[] = [
  'Create your profile with a single click to start your collection.',
  'Browse the fixtures and mark any matches you have attended in the past.',
  'Upload photos to your attended matches to create a visual diary.',
  'Check out the "Grounds" view to see which stadiums are closest to you.',
  'Join the community hub to share tips, photos, and matchday highlights.',
];

interface AboutViewProps {
  theme: 'light' | 'dark';
}

export const AboutView: React.FC<AboutViewProps> = ({ theme }) => {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-surface shadow-card dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <div className="relative grid gap-10 px-6 py-12 md:grid-cols-[1.1fr,0.9fr] md:px-12">
          <div>
            <div className="mb-6 flex items-center gap-3 text-primary">
              <LogoIcon className="h-10 w-10" theme={theme} />
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-text-subtle">The Scrum Book</span>
            </div>
            <h1 className="text-4xl font-bold text-text-strong md:text-5xl">
              Your Ultimate Rugby League Companion
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text">
              The Scrum Book is a dedicated space for rugby league fans to record their match-going history, celebrate their support, and connect with a community of fellow enthusiasts.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary">
                <SparklesIcon className="h-4 w-4" />
                Track Attended Matches
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 font-semibold text-secondary">
                <CalendarIcon className="h-4 w-4" />
                Explore Fixtures &amp; Results
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 font-semibold text-accent">
                <TrophyIcon className="h-4 w-4" />
                Earn Fan Badges
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-6 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
            <div className="relative rounded-2xl border border-border/70 bg-gradient-to-br from-surface-alt via-white to-surface-alt p-6 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-text-subtle">Key Features</h2>
              <ul className="mt-4 space-y-3 text-sm text-text">
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">1</span>
                  <div>
                    <p className="font-semibold text-text-strong">Personal Match Log</p>
                    <p>Build a comprehensive history of every game you've seen live.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10 font-semibold text-secondary">2</span>
                  <div>
                    <p className="font-semibold text-text-strong">Fan Statistics</p>
                    <p>Get insights into your support with personalized stats and data.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 font-semibold text-accent">3</span>
                  <div>
                    <p className="font-semibold text-text-strong">Community Hub</p>
                    <p>Connect with other fans and see how your attendance record compares.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl bg-primary/10 p-4 text-sm text-primary">
                <p className="font-semibold uppercase tracking-[0.15em]">Built for the fans</p>
                <p className="mt-1 text-primary/90">This app is made by a fan, for the fans, to celebrate our shared love of the game.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlightCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} p-3 text-white shadow-inner`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text-strong">{card.title}</h3>
              <p className="mt-2 text-sm text-text">{card.description}</p>
              {card.footer && <p className="mt-4 text-xs font-medium uppercase tracking-wide text-text-subtle">{card.footer}</p>}
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {featureColumns.map((column) => {
          const Icon = column.icon;
          return (
            <div key={column.title} className="rounded-3xl border border-border/70 bg-surface-alt/60 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-strong">{column.title}</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-text">
                {column.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="rounded-3xl border border-border/80 bg-surface p-8 shadow-card">
        <h2 className="text-2xl font-bold text-text-strong">Explore Every Feature</h2>
        <p className="mt-2 max-w-2xl text-text">
          Dive into the different sections of the app to get the most out of your experience. Each part is designed to enhance your journey as a rugby league supporter.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-2xl border border-border/70 bg-surface-alt/60 p-5">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-strong">{feature.title}</h3>
                </div>
                <p className="mt-3 text-sm text-text">{feature.summary}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-text-subtle">{feature.focus}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-primary/30 bg-primary/5 p-8 shadow-card">
        <h2 className="text-2xl font-bold text-text-strong">Get Started in Minutes</h2>
        <ul className="mt-4 grid gap-4 text-sm text-text md:grid-cols-2">
          {getStartedSteps.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-surface/70 p-4 shadow-sm">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/15 text-center text-sm font-semibold leading-6 text-primary">✓</div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-border/80 bg-surface-alt/80 p-8 text-center shadow-card">
        <h2 className="text-2xl font-bold text-text-strong">Join The Scrum Book Community</h2>
        <p className="mt-2 text-text">
          Start building your fan legacy today. The Scrum Book is your home for all your rugby league memories and connections.
        </p>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-text-subtle">
          Track. Share. Celebrate.
        </p>
      </section>
    </div>
  );
};
