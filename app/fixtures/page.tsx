// app/fixtures/page.tsx
import Image from 'next/image';
import { Stadium, Star, Clock, Search, SlidersHorizontal } from 'lucide-react';

// Replace with real data source later
const fixtures = [
  {
    teamA: 'Roosters',
    teamB: 'Panthers',
    teamALogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC61vxtb2l0qAN5KqR6okaw9Nm459ILUg6r-InvDbXCiHDWM1gkp6zZdFnNlrDUASoPZ7N8EgVkmQF6pJMRpYe1d5hPI88qQnfny1d2K3uTBJTShSuj5SSaaG2eRbJPMBvqB7VVsJqgNpuO_ovLhhV7rMpjmPwRcfCrs5V5vePbnqqN43geGXWO43Ot68yDbw88e9XRN_etZoBy2RdEj_xpXBXVpPn2YkiM5pbldagpDDaBbMv-8xRGHG8BbyIp5DLEZZTqgRbahJo9',
    teamBLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRk-fxyjk1_xpq5UsebXIiyzliha4KhxDbm5c2xM209Kwo5qy4RhYTPfXhfYvIA8Qs82A9KzQIvJ00zE8BgE6WPsQwhAKIPFWnPCt8rI1pPHxRTWv6r4lWW0CeVF7ZwomyppuhClYcIPtMEDXqCa-FjKT_JAY9bZkzM4jv6Jx3lS-3pcQ0mj0N2jNf7IiBS97OA8xPeVLSFs8EMaBw9HX8SNkVtG7ptFGgH9X2AvMsmVsXoCe990OUlmAKWOA9824Blo9QRBoHXHXp',
    kickOff: '19:45',
    countdown: { hours: 4, minutes: 21, seconds: 36 },
    favourite: false,
  },
  {
    teamA: 'Storm',
    teamB: 'Rabbitohs',
    teamALogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDc486TpOSlJWqorM-IFjOJ4DCcpJzEPCdrgjDPXO-ihtef9q0u0UYjGU48ooQVIaC1I9ECb3LvBXsuViXh0bjxlRObm8u2284HQQB30j12XWLFhXBeOidfTlx-4GXVFx-jt8UOJpCw09yELJO3ZKYMj4hzVqpPfvJHlEyzSTpw-CdvQIDqQBkxcy5kegYIFMP9jebwkyJaBO5W94RKjnFYXxDACbcGQI38hza9BT6RcLpl2GpzkQu3ytwKDB6m1c4witJZi-hEcRHh',
    teamBLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqkDc5J2eqiVwDHUcMcVPre1rHSi--No4mKNUOq2HjvMKW6vDac0JUnNDu2Tnyei7PwBJsW_nRI9ZLbyrrwf2oPm6mfzvWlxL6z_RcRb-nx6vojgh1atS4_skfAk78d8DjVAS5S-yAOZ3TpmwBRF4eJz1vlzY4lKaL9bQZav8am34Bar-zCq_AVo03rA_cJd8C4fKnTLkDbJWYQelf-cEA4JPmdPoKWRUzGJAErvoLTEiv44UVnvXE5b65h9SgjLqsFxa4r191QZPb',
    kickOff: '21:00',
    countdown: { hours: 5, minutes: 36, seconds: 8 },
    favourite: true,
  },
  {
    teamA: 'Eels',
    teamB: 'Sea Eagles',
    teamALogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2crZeogu7gCZ7OdrtxPGRbaqnFzlXVl0ZzPwe5AzMFdn46xD_Gb78w_YH3u6qhi8a28bxayx1rMDro84NenlL25rbUAczaiShgt0NQrLp0Vwpq84XyOu70djCEszw_UnQweR3HWBm-5L4u0aFVkRuFaQ_l-wiB01Qma0ky0IMJbp4nxdxxVx5TctP_bkywUtIhZRsfMjBihAhRG4wOPP9ySjVl3MsTFd6ePFY50zhhl8DpBAbAx6QU9oHSI7lpDmTEImSySffKLm4',
    teamBLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAc2UZb_gwUPxeETGIAQ-SR8ydqR2rKbddlb1lWmzAcuwYiDS1Z6SW0ASfaaA9DAkJB6iTerXASPwYemmUn-Dv0dlQlb3y4CLdf3K8nCxwggcL9rjLuXK4TDDwho28VlCpEhq6zo20c1--QJXv-Uqsx9UofP3GCE6KwNhPm67naIdt70PPw4sNU8k4_y6QSAed0Za4CkK3rxgvtf-340oeW4hXfJQl7NEiLOkkfyFsubt4j8IMek4eq8FGbnEwpMccfXwgjHiQMopBD',
    kickOff: '18:00',
    countdown: { hours: 21, minutes: 46, seconds: 15 },
    favourite: false,
  },
];

/* ---------- helpers ---------- */
const CountdownUnit = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) => (
  <div className="flex flex-col items-center">
    <span className="font-display text-3xl font-bold leading-none text-white">
      {String(value).padStart(2, '0')}
    </span>
    <span className="mt-1 text-xs font-medium tracking-wide text-slate-400">
      {label}
    </span>
  </div>
);

/* ---------- page ---------- */
export default function FixturesPage() {
  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-16 sm:py-24">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10
                        h-[30rem] w-[60rem] -translate-x-1/2 rounded-full
                        bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Upcoming Fixtures
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-400">
            Never miss a game. Countdowns update live.
          </p>
        </header>

        {/* filters */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search team or competition…"
              className="w-full rounded-full border border-slate-700 bg-slate-800/60
                         py-3 pl-11 pr-4 text-white placeholder-slate-400
                         ring-1 ring-transparent transition
                         focus:border-emerald-400 focus:outline-none
                         focus:ring-emerald-400"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition">
            My Teams
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm text-white hover:border-emerald-400 transition">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* fixtures */}
        <div className="mt-12 grid gap-6">
          {fixtures.map((f, i) => (
            <article
              key={i}
              className="group relative rounded-2xl border border-slate-800 bg-slate-800/40 p-5
                         shadow-lg shadow-black/20 ring-1 ring-white/5
                         hover:border-emerald-400/50 hover:shadow-emerald-500/10
                         transition"
            >
              {/* favourite */}
              <button
                aria-label="Favourite match"
                className="absolute right-4 top-4 z-10 rounded-full p-2
                           text-slate-400 hover:text-amber-400 transition"
              >
                <Star
                  className={`h-5 w-5 ${f.favourite ? 'fill-amber-400 text-amber-400' : ''}`}
                />
              </button>

              {/* teams */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-4">
                  <div className="relative h-14 w-14">
                    <Image
                      src={f.teamALogo}
                      alt={`${f.teamA} logo`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="font-display text-xl font-semibold text-white">
                    {f.teamA}
                  </span>
                </div>

                <div className="text-center">
                  <Clock className="mx-auto h-5 w-5 text-slate-400" />
                  <p className="mt-1 font-display text-2xl font-bold text-white">
                    {f.kickOff}
                  </p>
                </div>

                <div className="flex flex-1 items-center justify-end gap-4">
                  <span className="font-display text-xl font-semibold text-white">
                    {f.teamB}
                  </span>
                  <div className="relative h-14 w-14">
                    <Image
                      src={f.teamBLogo}
                      alt={`${f.teamB} logo`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* countdown */}
              <div className="mt-6 border-t border-slate-800 pt-4">
                <p className="text-center text-xs font-medium uppercase tracking-wider text-slate-400">
                  Starts in
                </p>
                <div className="mt-2 flex items-baseline justify-center gap-2 text-white">
                  <CountdownUnit value={f.countdown.hours} label="HRS" />
                  <span className="font-display text-2xl">:</span>
                  <CountdownUnit value={f.countdown.minutes} label="MIN" />
                  <span className="font-display text-2xl">:</span>
                  <CountdownUnit value={f.countdown.seconds} label="SEC" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
