export default function MatchLogPage() {
  const matches = [
    {
      competition: 'Super League',
      date: '18 Aug 2023',
      teams: 'Wigan Warriors vs. St Helens',
      score: '18 - 4',
    },
    {
      competition: 'Challenge Cup',
      date: '12 Aug 2023',
      teams: 'Leeds Rhinos vs. Hull KR',
      score: '22 - 20',
    },
    {
      competition: 'Super League',
      date: '05 Aug 2023',
      teams: 'Catalans Dragons vs. Warrington Wolves',
      score: '30 - 10',
    },
    {
      competition: 'Friendly',
      date: '29 Jul 2023',
      teams: 'Huddersfield Giants vs. Leigh Leopards',
      score: '16 - 28',
    },
  ];

  return (
    <div className="bg-background-dark font-body text-white antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/5 bg-background-dark/80 px-4 backdrop-blur-lg">
          <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
          <h1 className="font-display text-xl font-bold uppercase tracking-wider">Match Log</h1>
          <div className="w-10"></div>
        </header>
        <main className="flex-grow px-4 pt-8 pb-32">
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider">Past Results</h2>
          <div className="mt-8 space-y-4">
            {matches.map((match, index) => (
              <div
                key={index}
                className="flex flex-col gap-5 rounded-xl border border-white/10 bg-black/20 p-5 shadow-lg shadow-black/20 transition-all hover:border-primary/20 hover:bg-black/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-secondary">{`${match.competition} - ${match.date}`}</p>
                  <span className="material-symbols-outlined text-xl text-white/40">chevron_right</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-bold leading-tight">{match.teams}</p>
                  <p className="font-display text-2xl font-bold text-primary">{match.score}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
