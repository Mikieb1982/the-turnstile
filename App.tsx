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
    <div className="relative min-h-screen overflow-hidden bg-background text-text">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-44 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.45),transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.3),transparent_70%)] blur-3xl"
      />

      <Header />
      <main className="relative">
        <Hero />
        <section
          id="fixtures"
          className="mx-auto mb-16 grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
        >
          {sample.map((fx, i) => (
            <FixtureTile key={i} {...fx} onClick={() => {}} />
          ))}
        </section>
      </main>
      <footer className="relative border-t border-border bg-surface/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-text-subtle md:h-20 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} The Scrum Book. All match data sourced from the official Super League feed.</span>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/privacy" className="transition-colors hover:text-text-strong">
              Privacy
            </a>
            <span className="h-1 w-1 rounded-full bg-text-subtle/60" aria-hidden="true" />
            <a href="/feedback" className="transition-colors hover:text-text-strong">
              Feedback
            </a>
            <span className="h-1 w-1 rounded-full bg-text-subtle/60" aria-hidden="true" />
            <a href="mailto:hello@scrumbk.app" className="transition-colors hover:text-text-strong">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
