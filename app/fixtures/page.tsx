import Image from 'next/image';
import { mockFixtures } from '@/services/mockData';

export default function FixturesPage() {
  const fixtures = [
    // ... your fixtures data
  ];

  return (
    // Use semantic colors
    <div className="font-sans antialiased">
      <div className="relative flex w-full flex-col group/design-root overflow-x-hidden">
        <main className="flex-grow pb-28">
          <div className="px-6 pt-6 pb-4">
            <h1 className="text-text-primary tracking-[-0.02em] font-display uppercase text-4xl font-bold leading-tight">Upcoming Fixtures</h1>
          </div>
          <div className="px-6 mb-4 flex flex-col gap-4">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
              {/* Use bg-surface or bg-card, and semantic text/placeholder colors */}
              <input className="w-full rounded-full border border-surface bg-surface py-3.5 pl-12 pr-4 text-text-primary placeholder:text-text-secondary focus:border-primary focus:ring-0 transition-colors" placeholder="Search team, competition..." type="text" />
            </div>
            <div className="flex items-center gap-2">
              {/* Use bg-secondary */}
              <button className="flex items-center justify-center rounded-full bg-secondary px-5 py-3.5 border border-secondary text-white hover:bg-secondary/90 transition-colors">
                <span className="text-base font-bold">My Teams</span>
              </button>
              {/* Use bg-surface, text-text-secondary */}
              <button className="flex w-full items-center justify-between rounded-full bg-surface px-5 py-3.5 border border-surface text-text-primary hover:border-primary/50 transition-colors">
                <span className="text-base font-medium text-text-secondary">All Competitions</span>
                <span className="material-symbols-outlined text-text-secondary">arrow_drop_down</span>
              </button>
              <button className="flex items-center justify-center rounded-full bg-surface p-3.5 border border-surface text-text-primary hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-6">
            {fixtures.map((fixture, index) => (
              // Use bg-card, border-surface
              <div key={index} className="relative w-full max-w-3xl mx-auto bg-card rounded-xl shadow-lg border border-surface backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer">
                {/* Use text-text-secondary and hover:text-accent */}
                <button aria-label="Favorite match" className="absolute top-4 right-4 text-text-secondary hover:text-accent transition-colors z-10 p-1">
                  {/* Use text-accent */}
                  <span className={`material-symbols-outlined text-2xl ${fixture.favorite ? 'filled text-accent' : ''}`}>star</span>
                </button>
                <div className="flex flex-col items-center justify-between gap-4 p-5">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                      <img className="h-12 w-12" alt={`${fixture.teamA} Logo`} src={fixture.teamALogo} />
                      <p className="text-text-primary text-base font-bold leading-snug uppercase tracking-wide">{fixture.teamA}</p>
                    </div>
                    <div className="text-center">
                      {/* Use text-text-secondary, text-text-primary */}
                      <p className="text-text-secondary text-xs font-normal leading-normal uppercase tracking-wider">Kick Off</p>
                      <p className="text-text-primary font-display text-3xl font-bold leading-snug mt-1">{fixture.kickOff}</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                      <img className="h-12 w-12" alt={`${fixture.teamB} Logo`} src={fixture.teamBLogo} />
                      <p className="text-text-primary text-base font-bold leading-snug uppercase tracking-wide">{fixture.teamB}</p>
                    </div>
                  </div>
                  <div className="mt-2 w-full flex flex-col items-center">
                    {/* Use text-text-secondary */}
                    <p className="text-text-secondary text-xs font-normal uppercase tracking-wider mb-2">Starts In</p>
                    <div className="flex items-baseline gap-4 text-primary font-bold">
                      <div className="flex flex-col items-center">
                        <span className="font-display text-3xl leading-none tracking-tight">{fixture.countdown.hours}</span>
                        {/* Use text-text-secondary */}
                        <span className="text-xs font-medium text-text-secondary mt-1">HRS</span>
                      </div>
                      <span className="font-display text-3xl leading-none -translate-y-1">:</span>
                      <div className="flex flex-col items-center">
                        <span className="font-display text-3xl leading-none tracking-tight">{fixture.countdown.minutes}</span>
                        {/* Use text-text-secondary */}
                        <span className="text-xs font-medium text-text-secondary mt-1">MIN</span>
                      </div>
                      <span className="font-display text-3xl leading-none -translate-y-1">:</span>
                      <div className="flex flex-col items-center">
                        <span className="font-display text-3xl leading-none tracking-tight">{fixture.countdown.seconds}</span>
                        {/* Use text-text-secondary */}
                        <span className="text-xs font-medium text-text-secondary mt-1">SEC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
