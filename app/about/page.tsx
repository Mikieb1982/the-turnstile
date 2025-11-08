// app/about/page.tsx
import React from 'react';
import Image from 'next/image';
import { BookText, BarChartBig, Award } from 'lucide-react'; // <-- Import icons

export default function AboutPage() {
  return (
    <main className="flex-grow px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="py-6">
        <h1 className="font-display text-display-lg text-text-primary pb-3">
          Every Fan Has a Story.
        </h1>
        <p className="text-text-secondary text-lg leading-normal pb-3">
          The Turnstile is the definitive digital logbook for every fan's
          live sports experiences, celebrating your unique journey through
          the beautiful game.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="py-5">
        <h2 className="font-display text-display-md text-text-primary pb-3">
          Our Mission
        </h2>
        <div className="flex flex-col gap-4">
          <div className="w-full overflow-hidden rounded-xl aspect-[3/2] relative">
            <Image
              src="/logo.png"
              alt="The Turnstile app logo"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-text-secondary text-base leading-normal pt-1">
            Our mission is to provide fans with a beautiful and simple way
            to capture the memories of every match they attend. We believe
            that these experiences are more than just dates on a calendar;
            they are the stories that define our passion for sports.
          </p>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="py-5">
        <h2 className="font-display text-display-md text-text-primary pb-4">
          Core Features
        </h2>
        <div className="flex flex-col gap-4">
          {/* Feature Card 1 */}
          <div className="flex items-start gap-4 p-4 bg-surface rounded-lg">
            <div className="flex-shrink-0 bg-primary/20 p-3 rounded-full">
              <BookText className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="text-text-primary font-semibold text-base leading-tight">
                Log Every Match
              </h3>
              <p className="text-text-secondary text-sm leading-normal mt-1">
                Easily record details of every game you attend, from the
                score and teams to your personal notes and photos.
              </p>
            </div>
          </div>
          {/* Feature Card 2 */}
          <div className="flex items-start gap-4 p-4 bg-surface rounded-lg">
            <div className="flex-shrink-0 bg-primary/20 p-3 rounded-full">
              <BarChartBig className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="text-text-primary font-semibold text-base leading-tight">
                See Your Stats
              </h3>
              <p className="text-text-secondary text-sm leading-normal mt-1">
                Track your attendance across stadiums, countries, and
                competitions. See which teams you've watched the most.
              </p>
            </div>
          </div>
          {/* Feature Card 3 */}
          <div className="flex items-start gap-4 p-4 bg-surface rounded-lg">
            <div className="flex-shrink-0 bg-primary/20 p-3 rounded-full">
              <Award className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="text-text-primary font-semibold text-base leading-tight">
                Unlock Achievements
              </h3>
              <p className="text-text-secondary text-sm leading-normal mt-1">
                Gamify your fan journey by unlocking badges and
                achievements for reaching new milestones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder's Note Section */}
      <div className="py-5">
        <h2 className="font-display text-display-md text-text-primary pb-3">
          A Note From Our Founder
        </h2>
        <p className="text-text-secondary text-base leading-normal">
          "As a lifelong fan, I've always cherished the memories made in
          the stands. The roar of the crowd, the shared joy of a
          last-minute winner, the pilgrimage to a new ground—these are the
          moments that connect us. The Turnstile was born from a simple
          desire to hold onto those memories and celebrate the journey. I
          hope it brings you as much joy as building it has brought me."
        </p>
      </div>
    </main>
  );
}
