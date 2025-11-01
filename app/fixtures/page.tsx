
import Image from 'next/image';
import { mockFixtures } from '@/services/mockData';

export default function FixturesPage() {
  const fixtures = [
    {
      teamA: 'Roosters',
      teamB: 'Panthers',
      teamALogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC61vxtb2l0qAN5KqR6okaw9Nm459ILUg6r-InvDbXCiHDWM1gkp6zZdFnNlrDUASoPZ7N8EgVkmQF6pJMRpYe1d5hPI88qQnfny1d2K3uTBJTShSuj5SSaaG2eRbJPMBvqB7VVsJqgNpuO_ovLhhV7rMpjmPwRcfCrs5V5vePbnqqN43geGXWO43Ot68yDbw88e9XRN_etZoBy2RdEj_xpXBXVpPn2YkiM5pbldagpDDaBbMv-8xRGHG8BbyIp5DLEZZTqgRbahJo9',
      teamBLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRk-fxyjk1_xpq5UsebXIiyzliha4KhxDbm5c2xM209Kwo5qy4RhYTPfXhfYvIA8Qs82A9KzQIvJ00zE8BgE6WPsQwhAKIPFWnPCt8rI1pPHxRTWv6r4lWW0CeVF7ZwomyppuhClYcIPtMEDXqCa-FjKT_JAY9bZkzM4jv6Jx3lS-3pcQ0mj0N2jNf7IiBS97OA8xPeVLSFs8EMaBw9HX8SNkVtG7ptFGgH9X2AvMsmVsXoCe990OUlmAKWOA9824Blo9QRBoHXHXp',
      kickOff: '19:45',
      countdown: {
        hours: '04',
        minutes: '21',
        seconds: '36',
      },
      favorite: false,
    },
    {
      teamA: 'Storm',
      teamB: 'Rabbitohs',
      teamALogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc486TpOSlJWqorM-IFjOJ4DCcpJzEPCdrgjDPXO-ihtef9q0u0UYjGU48ooQVIaC1I9ECb3LvBXsuViXh0bjxlRObm8u2284HQQB30j12XWLFhXBeOidfTlx-4GXVFx-jt8UOJpCw09yELJO3ZKYMj4hzVqpPfvJHlEyzSTpw-CdvQIDqQBkxcy5kegYIFMP9jebwkyJaBO5W94RKjnFYXxDACbcGQI38hza9BT6RcLpl2GpzkQu3ytwKDB6m1c4witJZi-hEcRHh',
      teamBLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqkDc5J2eqiVwDHUcMcVPre1rHSi--No4mKNUOq2HjvMKW6vDac0JUnNDu2Tnyei7PwBJsW_nRI9ZLbyrrwf2oPm6mfzvWlxL6z_RcRb-nx6vojgh1atS4_skfAk78d8DjVAS5S-yAOZ3TpmwBRF4eJz1vlzY4lKaL9bQZav8am34Bar-zCq_AVo03rA_cJd8C4fKnTLkDbJWYQelf-cEA4JPmdPoKWRUzGJAErvoLTEiv44UVnvXE5b65h9SgjLqsFxa4r191QZPb',
      kickOff: '21:00',
      countdown: {
        hours: '05',
        minutes: '36',
        seconds: '08',
      },
      favorite: true,
    },
    {
      teamA: 'Eels',
      teamB: 'Sea Eagles',
      teamALogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2crZeogu7gCZ7OdrtxPGRbaqnFzlXVl0ZzPwe5AzMFdn46xD_Gb78w_YH3u6qhi8a28bxayx1rMDro84NenlL25rbUAczaiShgt0NQrLp0Vwpq84XyOu70djCEszw_UnQweR3HWBm-5L4u0aFVkRuFaQ_l-wiB01Qma0ky0IMJbp4nxdxxVx5TctP_bkywUtIhZRsfMjBihAhRG4wOPP9ySjVl3MsTFd6ePFY50zhhl8DpBAbAx6QU9oHSI7lpDmTEImSySffKLm4',
      teamBLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc2UZb_gwUPxeETGIAQ-SR8ydqR2rKbddlb1lWmzAcuwYiDS1Z6SW0ASfaaA9DAkJB6iTerXASPwYemmUn-Dv0dlQlb3y4CLdf3K8nCxwggcL9rjLuXK4TDDwho28VlCpEhq6zo20c1--QJXv-Uqsx9UofP3GCE6KwNhPm67naIdt70PPw4sNU8k4_y6QSAed0Za4CkK3rxgvtf-340oeW4hXfJQl7NEiLOkkfyFsubt4j8IMek4eq8FGbnEwpMccfXwgjHiQMopBD',
      kickOff: '18:00',
      countdown: {
        hours: '21',
        minutes: '46',
        seconds: '15',
      },
      favorite: false,
    },
  ];

  return (
    <div className="font-sans bg-background-dark text-white antialiased">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <header className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-md">
          <div className="flex items-center p-4 justify-between max-w-7xl mx-auto h-16">
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1"></h2>
            <button aria-label="Open menu" className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </header>
        <main className="flex-grow pb-28">
          <div className="px-6 pt-6 pb-4">
            <h1 className="text-white tracking-[-0.02em] font-display uppercase text-4xl font-bold leading-tight">Upcoming Fixtures</h1>
          </div>
          <div className="px-6 mb-4 flex flex-col gap-4">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">search</span>
              <input className="w-full rounded-full border border-white/10 bg-surface-dark py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-400 focus:border-primary focus:ring-0 transition-colors" placeholder="Search team, competition..." type="text" />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center rounded-full bg-secondary px-5 py-3.5 border border-secondary text-white hover:bg-secondary/90 transition-colors">
                <span className="text-base font-bold">My Teams</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-full bg-surface-dark px-5 py-3.5 border border-white/10 text-white hover:border-primary/50 transition-colors">
                <span className="text-base font-medium text-zinc-400">All Competitions</span>
                <span className="material-symbols-outlined text-zinc-400">arrow_drop_down</span>
              </button>
              <button className="flex items-center justify-center rounded-full bg-surface-dark p-3.5 border border-white/10 text-white hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-6">
            {fixtures.map((fixture, index) => (
              <div key={index} className="relative w-full max-w-3xl mx-auto bg-surface-dark rounded-xl shadow-lg border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer">
                <button aria-label="Favorite match" className="absolute top-4 right-4 text-zinc-500 hover:text-star-yellow transition-colors z-10 p-1">
                  <span className={`material-symbols-outlined text-2xl ${fixture.favorite ? 'filled text-star-yellow' : ''}`}>star</span>
                </button>
                <div className="flex flex-col items-center justify-between gap-4 p-5">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                      <img className="h-12 w-12" alt={`${fixture.teamA} Logo`} src={fixture.teamALogo} />
                      <p className="text-white text-base font-bold leading-snug uppercase tracking-wide">{fixture.teamA}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-zinc-400 text-xs font-normal leading-normal uppercase tracking-wider">Kick Off</p>
                      <p className="text-white font-display text-3xl font-bold leading-snug mt-1">{fixture.kickOff}</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                      <img className="h-12 w-12" alt={`${fixture.teamB} Logo`} src={fixture.teamBLogo} />
                      <p className="text-white text-base font-bold leading-snug uppercase tracking-wide">{fixture.teamB}</p>
                    </div>
                  </div>
                  <div className="mt-2 w-full flex flex-col items-center">
                    <p className="text-zinc-400 text-xs font-normal uppercase tracking-wider mb-2">Starts In</p>
                    <div className="flex items-baseline gap-4 text-primary font-bold">
                      <div className="flex flex-col items-center">
                        <span className="font-display text-3xl leading-none tracking-tight">{fixture.countdown.hours}</span>
                        <span className="text-xs font-medium text-zinc-400 mt-1">HRS</span>
                      </div>
                      <span className="font-display text-3xl leading-none -translate-y-1">:</span>
                      <div className="flex flex-col items-center">
                        <span className="font-display text-3xl leading-none tracking-tight">{fixture.countdown.minutes}</span>
                        <span className="text-xs font-medium text-zinc-400 mt-1">MIN</span>
                      </div>
                      <span className="font-display text-3xl leading-none -translate-y-1">:</span>
                      <div className="flex flex-col items-center">
                        <span className="font-display text-3xl leading-none tracking-tight">{fixture.countdown.seconds}</span>
                        <span className="text-xs font-medium text-zinc-400 mt-1">SEC</span>
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
