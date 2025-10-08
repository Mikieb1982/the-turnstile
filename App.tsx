import React from 'react'
import Header from './src/components/Header'
import Hero from './src/components/Hero'
import FixtureTile from './src/components/FixtureTile'

const sample = [
  { home: 'Wigan Warriors', away: 'St Helens', date: 'Fri 06 Mar 2026, 20:00', venue: 'DW Stadium', attended: true },
  { home: 'Leeds Rhinos', away: 'Warrington Wolves', date: 'Sat 07 Mar 2026, 18:00', venue: 'Headingley', attended: false },
  { home: 'Catalans Dragons', away: 'Hull KR', date: 'Sun 08 Mar 2026, 15:00', venue: 'Stade Gilbert Brutus', attended: false },
]

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--bg-0)] text-[color:var(--text-hi)]">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-700/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[26rem] w-[26rem] translate-x-1/3 translate-y-1/3 rounded-full bg-brand-600/20 blur-3xl" />

      <Header />
      <main className="relative">
        <Hero />
        <section
          id="fixtures"
          className="mx-auto mb-16 max-w-6xl px-4 grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
        >
          {sample.map((fx, i) => (
            <FixtureTile key={i} {...fx} onClick={() => {}} />
          ))}
        </section>
      </main>
      <footer className="relative border-t border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-4 text-sm text-[color:var(--text-lo)] md:h-20 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} The Scrum Book. All match data sourced from the official Super League feed.</span>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden="true" />
            <a href="/feedback" className="hover:text-white transition-colors">Feedback</a>
            <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden="true" />
            <a href="mailto:hello@scrumbk.app" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
