export default function AchievementsPage() {
  const achievements = [
    {
      category: 'Milestone',
      title: 'First Win Recorded',
      description: 'You secured your first victory with the team.',
      unlocked: '15 Oct 2023',
      icon: 'military_tech',
      progress: null,
    },
    {
      category: 'Consistency',
      title: '10 Matches Logged',
      description: "You've successfully logged 10 official matches.",
      unlocked: '28 Nov 2023',
      icon: 'event_repeat',
      progress: null,
    },
    {
      category: 'In Progress',
      title: 'Team Top Scorer',
      description: 'Finish the season with the most goals on your team.',
      unlocked: null,
      icon: 'emoji_events',
      progress: { current: 8, total: 10 },
    },
    {
      category: 'Defensive Prowess',
      title: '5 Clean Sheets',
      description: 'Kept the opposition from scoring in 5 matches.',
      unlocked: '05 Dec 2023',
      icon: 'shield',
      progress: null,
    },
  ];

  return (
    <div className="bg-background-dark font-body text-white antialiased">
      <div className="relative flex h-full min-h-screen w-full flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-background-dark/80 px-4 backdrop-blur-sm">
          <a className="flex items-center gap-2" href="#">
            <span className="material-symbols-outlined text-3xl text-primary">emoji_events</span>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wider text-white">Achievements</h2>
          </a>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </header>
        <main className="flex-1 px-4 pb-24">
          <h1 className="font-display text-5xl font-bold uppercase tracking-wider text-white pt-6 pb-2">Your Achievements</h1>
          <div className="space-y-4 pt-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-4 rounded-xl bg-[#1A2C21] p-4 shadow-2xl shadow-black/20 ring-1 ring-white/10">
                <div
                  className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg ${
                    achievement.unlocked ? 'bg-secondary/20 text-secondary' : 'bg-white/10 text-white/50'
                  }`}
                >
                  <span className="material-symbols-outlined !text-4xl">{achievement.icon}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <p
                    className={`font-display text-sm font-semibold uppercase tracking-widest ${
                      achievement.unlocked ? 'text-secondary' : 'text-white/50'
                    }`}
                  >
                    {achievement.category}
                  </p>
                  <p className="font-display text-2xl font-semibold leading-tight tracking-wide text-white">{achievement.title}</p>
                  <div className="flex flex-col gap-1 pt-1">
                    <p className="text-sm leading-relaxed text-[#9db9a7]">{achievement.description}</p>
                    {achievement.unlocked && <p className="text-xs text-[#9db9a7]/80">Unlocked: {achievement.unlocked}</p>}
                  </div>
                  {achievement.progress && (
                    <div className="w-full pt-1">
                      <div className="flex justify-between text-xs text-[#9db9a7]/80">
                        <span>Progress</span>
                        <span className="font-semibold text-primary">
                          {achievement.progress.current} / {achievement.progress.total}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-primary/20">
                        <div
                          className="h-1.5 rounded-full bg-primary"
                          style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
