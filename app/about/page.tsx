// app/about/page.tsx
import React from 'react';
import Image from 'next/image';
import { BookText, BarChartBig, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="relative isolate">
      {/* subtle gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-black"
      />

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* ------------------------------------------------------------- HERO */}
        <section className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Every fan has a story.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            The Turnstile is the definitive digital logbook for every fan’s
            live-sports experiences, celebrating your unique journey through
            the beautiful game.
          </p>
        </section>

        {/* ------------------------------------------------------ OUR MISSION */}
        <section className="mt-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/logo.png"
              alt="The Turnstile app logo"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
              Our mission
            </h2>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              We give fans a beautiful, simple way to capture the memories of
              every match they attend. These experiences are more than dates on
              a calendar—they’re the stories that define our passion for sport.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------ CORE FEATURES */}
        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
            Core features
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<BookText />}
              title="Log every match"
              description="Record scores, teams, notes and photos in seconds."
            />
            <FeatureCard
              icon={<BarChartBig />}
              title="See your stats"
              description="Track stadiums, countries, competitions and favourite teams."
            />
            <FeatureCard
              icon={<Award />}
              title="Unlock achievements"
              description="Earn badges and milestones as your fan journey grows."
            />
          </div>
        </section>

        {/* ------------------------------------------------ FOUNDER’S NOTE */}
        <section className="mt-20 rounded-2xl bg-white/60 p-8 shadow-lg ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-800/60 dark:ring-white/10">
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
            A note from our founder
          </h2>
          <blockquote className="mt-4 space-y-3 text-base italic leading-7 text-slate-600 dark:text-slate-300">
            <p>
              “As a lifelong fan, I’ve always cherished the memories made in
              the stands. The roar of the crowd, the shared joy of a last-minute
              winner, the pilgrimage to a new ground—these moments connect us.
            </p>
            <p>
              The Turnstile was born from a simple desire to hold onto those
              memories and celebrate the journey. I hope it brings you as much
              joy as building it has brought me.”
            </p>
          </blockquote>
        </section>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Re-usable glass-morphic feature card                               */
/* ------------------------------------------------------------------ */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-xl bg-white/60 p-6 shadow-md ring-1 ring-slate-900/5 transition hover:shadow-lg hover:-translate-y-0.5 dark:bg-slate-800/60 dark:ring-white/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
        {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6' })}
      </div>
      <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}
