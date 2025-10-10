import React from 'react'
import Header from './src/components/Header'
import Hero from './src/components/Hero'
import FixtureTile from './src/components/FixtureTile'

const featuredFixtures = [
  {
    home: 'Northern Stallions',
    away: 'Steel City Vipers',
    date: '24 Jun 2024 • 19:45',
    venue: 'Trident Stadium',
    attended: true,
    result: 'W 32 – 18',
    highlight: '3 Wins Logged',
    round: 'Tour Stop',
  },
  {
    home: 'Coastal Raiders',
    away: 'Harbor Hawks',
    date: '28 Jun 2024 • 18:10',
    venue: 'Fortress Field',
    attended: false,
    highlight: '8 Tries Witnessed',
    round: 'Wishlist',
  },
  {
    home: 'Fountain Vipers',
    away: 'Mountain Giants',
    date: '02 Jul 2024 • 16:00',
    venue: 'Ironlight Arena',
    attended: false,
    highlight: 'Badge Progress',
    round: 'On Tour',
  },
]

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-text">
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/background.png"
          alt="Floodlit rugby league crowd celebrating"
          className="h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,11,22,0.85),transparent_65%)]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/80 to-background" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <section
            id="fixtures"
            className="mx-auto mb-16 grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
          >
            {featuredFixtures.map((fx, i) => (
              <FixtureTile key={i} {...fx} onClick={() => {}} />
            ))}
          </section>
        </main>
        <footer className="border-t border-border/60 bg-surface/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-text-subtle/90 md:h-20 md:flex-row md:items-center md:justify-between">
            <span>
              © {new Date().getFullYear()} The Turnstile. Built for rugby league die-hards, powered by live match feeds.
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a href="/privacy" className="transition-colors hover:text-text-strong">
                Privacy
              </a>
              <span className="h-1 w-1 rounded-full bg-text-subtle/40" aria-hidden="true" />
              <a href="/feedback" className="transition-colors hover:text-text-strong">
                Feedback
              </a>
              <span className="h-1 w-1 rounded-full bg-text-subtle/40" aria-hidden="true" />
              <a href="mailto:hello@turnstile.app" className="transition-colors hover:text-text-strong">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
