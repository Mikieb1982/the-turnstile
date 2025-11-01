export default function TeamsPage() {
  const teams = [
    {
      name: 'Warriors United',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdiSDStxrP8vFZUhDaIarY6Jnhn1MGyVMvewdkv7CNIL63-dIRB_bOIT2PgQrsuVWgaH7GlNlo9ZWmT6GA6ygiYimQZ2iSxyj5QKbR9UKpuL0TwwnyPV-nHrzTkuX2mSYAIO-sAx-lMc1E7EJW9C7EbJmyUNhd8Kl1vBiyTDQ4XuDTqbHiyq-8guKQOLpgzQLqBIYBvJesLRga6UahJrmI4dOm8mslGKBo8EPOmBvosze7tGH_HnPahx4sM1fY4s8rr2YVzQd3u5jJ',
      record: '12W / 4L',
      players: 16,
      nextMatch: '24 Oct',
    },
    {
      name: 'Phoenix FC',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe_rg7-NwFAm-g1GrBOQHjVBk3zBF_2aMETD4WOuct3wgh9wIsU2XL9shIeTEPA72turqemClQYlJDn92xTFLcOnPtgarFcBaUH04Ndzmqt3kGXzNFTEAq-8askFZQkykR0monFCWyMKqv3fkC79ME7DGTaOitHhr8_VJmnj7CvwBHvjanxNZ0ams8qQTgqKyeS3vBeM0p_DPYSp5vza0veThjffs0SS6kQMYJNPkQTHCMX303qEbRmuRbjfIAEVDS3ckmzRcxgPzt',
      record: '10W / 6L',
      players: 18,
      nextMatch: '28 Oct',
    },
    {
      name: 'Vipers SC',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRimwFLbTXCHO1mjoI7a-fl0a2YEF76gk0teUjfoUcPhFWBDF00VuY1YClYVC6htlRTNm1_J-gDVit5eUTQq6-fy-zzsaFV5M_gjwEK4p0qbOZywzL40nP6_-tIKuYU9x9hxbFE1cAs3Ra0ABATdmeqbW78TpLoyG33-yO9dL71SzKZ1SG2ypo7cECBS-l0wxwNBtdtWl6hIPxfPoiGeINTj0L0ws7rDVAPofxacCIZOEozYkudgAaIsmHtMgLNaM8KLW3b27V-Rg1',
      record: '15W / 1L',
      players: 15,
      nextMatch: '02 Nov',
    },
  ];

  return (
    <div className="font-body bg-background-dark text-gray-200">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <header className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center p-4">
            <button className="flex items-center justify-center rounded-xl h-12 w-12 text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="flex-1 text-center font-display text-2xl font-normal tracking-wider uppercase text-white">Teams</h2>
            <div className="w-12"></div>
          </div>
        </header>
        <main className="flex-grow pb-28 px-4">
          <h1 className="font-display text-white tracking-wider text-4xl uppercase pt-8 pb-6">Teams</h1>
          <div className="flex flex-col gap-5">
            {teams.map((team, index) => (
              <div key={index} className="relative bg-card-dark rounded-xl border border-white/5 p-5 shadow-card-glow @container overflow-hidden">
                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 w-20 h-20 bg-center bg-no-repeat bg-cover rounded-lg mr-5"
                    style={{ backgroundImage: `url("${team.logo}")` }}
                  ></div>
                  <div className="flex w-full min-w-0 grow flex-col items-stretch justify-center gap-2.5">
                    <p className="font-display text-2xl font-normal leading-tight tracking-wide text-white uppercase">{team.name}</p>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-primary">military_tech</span>
                        <span className="text-primary font-medium">{team.record}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">groups</span>
                        <span>{team.players} Players</span>
                      </div>
                    </div>
                    <p className="text-secondary text-sm font-medium leading-normal pt-1">Next Match: {team.nextMatch}</p>
                  </div>
                  <a className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" href="#">
                    <span className="material-symbols-outlined">more_vert</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
