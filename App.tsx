import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FixtureTile from './components/FixtureTile'

const sample = [
  { home: 'Wigan Warriors', away: 'St Helens', date: 'Fri 06 Mar 2026, 20:00', venue: 'DW Stadium', attended: true },
  { home: 'Leeds Rhinos', away: 'Warrington Wolves', date: 'Sat 07 Mar 2026, 18:00', venue: 'Headingley', attended: false },
]

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <section id="fixtures" className="mx-auto max-w-6xl px-4 pb-10 grid gap-4 md:gap-5">
          {sample.map((fx, i) => (
            <FixtureTile key={i} {...fx} onClick={() => {}} />
          ))}
        </section>
      </main>
      <footer className="border-t border-[color:var(--border)] mt-8">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between text-sm text-[color:var(--text-lo)]">
          <span>© {new Date().getFullYear()} The Scrum Book</span>
          <div className="flex items-center gap-3">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/feedback" className="hover:text-white">Feedback</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
