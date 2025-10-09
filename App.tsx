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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background-muted to-background-accent text-text">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[5%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.25),transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-44 right-[-6rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.22),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_70%)] blur-[140px]"
      />

      <Header />
      <main className="relative">
        <Hero />
        <section
          id="fixtures"
          className="mx-auto mb-20 grid max-w-6xl gap-5 px-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {sample.map((fx, i) => (
            <FixtureTile key={i} {...fx} onClick={() => {}} />
          ))}
        </section>
      </main>
      <footer className="relative border-t border-border/20 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-text-subtle md:h-20 md:flex-row md:items-center md:justify-between">
          <span className="text-center md:text-left">
            © {new Date().getFullYear()} The Scrum Book. All match data sourced from the official Super League feed.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <a href="/privacy" className="transition-colors hover:text-text-strong">
              Privacy
            </a>
            <span className="h-1 w-1 rounded-full bg-text-subtle/40" aria-hidden="true" />
            <a href="/feedback" className="transition-colors hover:text-text-strong">
              Feedback
            </a>
            <span className="h-1 w-1 rounded-full bg-text-subtle/40" aria-hidden="true" />
            <a href="mailto:hello@scrumbk.app" className="transition-colors hover:text-text-strong">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
