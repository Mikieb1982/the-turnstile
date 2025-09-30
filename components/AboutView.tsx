import React from 'react';
import {
  LogoIcon,
  SparklesIcon,
  UsersIcon,
  ListBulletIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  PencilIcon,
} from './Icons';

interface HighlightCard {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent: string;
  footer?: string;
}

interface PracticeColumn {
  title: string;
  items: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface CeremonyCard {
  title: string;
  summary: string;
  focus: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const highlightCards: HighlightCard[] = [
  {
    title: 'A Product Mindset Companion',
    description: 'The Scrum Book distilled into a modern playbook you can run inside a digital product organisation.',
    icon: SparklesIcon,
    accent: 'from-primary/80 to-secondary/70',
    footer: 'Built from the collective learnings of hundreds of product squads.',
  },
  {
    title: 'Human-Centred Chapters',
    description: 'Canvas-style spreads guide Product Owners, Scrum Masters, and Developers through shared rituals and decisions.',
    icon: UsersIcon,
    accent: 'from-secondary/70 to-accent/80',
    footer: 'Use the prompts in workshops, stand-ups, and planning sessions.',
  },
  {
    title: 'Ready-to-Run Sprint Kits',
    description: 'Drop-in templates for backlog refinement, sprint planning, and review conversations keep the cadence flowing.',
    icon: CalendarIcon,
    accent: 'from-accent/80 to-primary/80',
    footer: 'Includes facilitation scripts, sample agendas, and outcome trackers.',
  },
];

const practiceColumns: PracticeColumn[] = [
  {
    title: 'Foundational Chapters',
    icon: PencilIcon,
    items: [
      'Purpose, product vision, and OKR alignment canvases',
      'Defining the Definition of Done and Definition of Ready',
      'Roles clarified with empowering questions for each ceremony',
    ],
  },
  {
    title: 'Advanced Playbooks',
    icon: ChartBarIcon,
    items: [
      'Evidence-Based Management scorecards and conversation starters',
      'Scaling tips for multi-team coordination without extra bureaucracy',
      'Sprint goals to release metrics flow mapped on a single page',
    ],
  },
];

const ceremonyCards: CeremonyCard[] = [
  {
    title: 'Sprint Planning',
    summary: 'Shape the outcome and choose the right slice of work with visual goal boards and capacity guides.',
    focus: 'Use the planning canvas to connect customer value, forecast, and success signals.',
    icon: ListBulletIcon,
  },
  {
    title: 'Daily Scrum',
    summary: 'Keep momentum without status theatre using the three-question storyboard.',
    focus: 'Highlight blockers, dependencies, and learning goals that move the sprint forward.',
    icon: UsersIcon,
  },
  {
    title: 'Sprint Review & Retro',
    summary: 'Combine evidence and stories to celebrate value delivery and uncover the next experiment.',
    focus: 'Run the dual-track retro template: product impact plus team health.',
    icon: ShieldCheckIcon,
  },
];

const quickWins: string[] = [
  'Kick-off a new team in under an hour with the Squad Charter worksheet.',
  'Swap static reports for living dashboards powered by sprint outcome metrics.',
  'Coach stakeholders with the “Invite, Don’t Gatekeep” conversation starters.',
  'Embed continuous discovery cadences alongside sprint delivery.',
];

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-surface shadow-card dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <div className="relative grid gap-10 px-6 py-12 md:grid-cols-[1.1fr,0.9fr] md:px-12">
          <div>
            <div className="mb-6 flex items-center gap-3 text-primary">
              <LogoIcon className="h-10 w-10" />
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-text-subtle">The Scrum Book</span>
            </div>
            <h1 className="text-4xl font-bold text-text-strong md:text-5xl">
              A modern field guide for resilient product teams
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text">
              The Scrum Book wraps field-tested patterns in polished cards, vibrant colour blocks, and actionable checklists so teams can
              move from reading about agility to practicing it together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary">
                <SparklesIcon className="h-4 w-4" />
                12 facilitation canvases
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 font-semibold text-secondary">
                <CalendarIcon className="h-4 w-4" />
                Sprint rituals in one view
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 font-semibold text-accent">
                <UsersIcon className="h-4 w-4" />
                Outcomes over output
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-6 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
            <div className="relative rounded-2xl border border-border/70 bg-gradient-to-br from-surface-alt via-white to-surface-alt p-6 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-text-subtle">Inside this edition</h2>
              <ul className="mt-4 space-y-3 text-sm text-text">
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">1</span>
                  <div>
                    <p className="font-semibold text-text-strong">High-impact stories</p>
                    <p>Real transformation snapshots mapped to Scrum patterns.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10 font-semibold text-secondary">2</span>
                  <div>
                    <p className="font-semibold text-text-strong">Interactive toolkit</p>
                    <p>QR codes launch Miro, FigJam, and whiteboard-friendly versions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 font-semibold text-accent">3</span>
                  <div>
                    <p className="font-semibold text-text-strong">Practice cadence</p>
                    <p>Monthly prompts keep the team experimenting between retros.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl bg-primary/10 p-4 text-sm text-primary">
                <p className="font-semibold uppercase tracking-[0.15em]">New in this release</p>
                <p className="mt-1 text-primary/90">Discovery sprints, experiment log templates, and product metrics cheat sheets.</p>
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
        {practiceColumns.map((column) => {
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
        <h2 className="text-2xl font-bold text-text-strong">Run every ceremony with confidence</h2>
        <p className="mt-2 max-w-2xl text-text">
          Each chapter follows the warm, card-based system introduced throughout the Scrum Book, letting you facilitate without extra
          slides. Pair each ritual with done-for-you prompts, suggested visual layouts, and recommended artefacts to inspect.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {ceremonyCards.map((ceremony) => {
            const Icon = ceremony.icon;
            return (
              <div key={ceremony.title} className="rounded-2xl border border-border/70 bg-surface-alt/60 p-5">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-strong">{ceremony.title}</h3>
                </div>
                <p className="mt-3 text-sm text-text">{ceremony.summary}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-text-subtle">{ceremony.focus}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-primary/30 bg-primary/5 p-8 shadow-card">
        <h2 className="text-2xl font-bold text-text-strong">Quick wins when you open the book</h2>
        <ul className="mt-4 grid gap-4 text-sm text-text md:grid-cols-2">
          {quickWins.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-surface/70 p-4 shadow-sm">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/15 text-center text-sm font-semibold leading-6 text-primary">✓</div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-border/80 bg-surface-alt/80 p-8 text-center shadow-card">
        <h2 className="text-2xl font-bold text-text-strong">Bring the Scrum Book to your next sprint</h2>
        <p className="mt-2 text-text">
          Print it, project it, or drop it into your team workspace. The unified layout keeps every squad working from the same playbook while still
          giving you the freedom to remix the sections that matter most.
        </p>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-text-subtle">
          Co-create. Inspect. Adapt. Repeat.
        </p>
      </section>
    </div>
  );
};
