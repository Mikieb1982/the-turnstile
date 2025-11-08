import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <html className="dark" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>About Us - The Turnstile</title>
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <script id="tailwind-config">
          {`
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    "primary": "#13ec6a",
                    "background-light": "#f6f8f7",
                    "background-dark": "#102217",
                  },
                  fontFamily: {
                    "display": ["Lexend", "sans-serif"]
                  },
                  borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
                },
              },
            }
          `}
        </script>
        <style>
          {`
            .material-symbols-outlined {
              font-variation-settings:
              'FILL' 0,
              'wght' 400,
              'GRAD' 0,
              'opsz' 24
            }
            body {
              min-height: max(884px, 100dvh);
            }
          `}
        </style>
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-white">
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
          {/* Top App Bar */}
          <div className="flex items-center p-4 pb-2 justify-between bg-background-light dark:bg-background-dark sticky top-0 z-10">
            <div className="text-white flex size-12 shrink-0 items-center justify-start">
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </div>
            <h2 className="text-white/90 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
              About Us
            </h2>
            <div className="flex size-12 shrink-0 items-center"></div>
          </div>
          <main className="flex-grow px-4">
            {/* Hero Section */}
            <div className="py-6">
              <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-3">
                Every Fan Has a Story.
              </h1>
              <p className="text-white/70 text-base font-normal leading-normal pb-3">
                The Turnstile is the definitive digital logbook for every fan's
                live sports experiences, celebrating your unique journey through
                the beautiful game.
              </p>
            </div>
            {/* Our Mission Section */}
            <div className="py-5">
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                Our Mission
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex w-full grow">
                  <div className="w-full gap-1 overflow-hidden aspect-[3/2] flex">
                    <div
                      className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-xl flex-1"
                      data-alt="The Turnstile app logo, a stylized letter T resembling a stadium turnstile."
                      style={{
                        backgroundImage: 'url("public/logo.png")',
                        backgroundPosition: '50% 20%',
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-white/70 text-base font-normal leading-normal pt-1">
                  Our mission is to provide fans with a beautiful and simple way
                  to capture the memories of every match they attend. We believe
                  that these experiences are more than just dates on a calendar;
                  they are the stories that define our passion for sports.
                </p>
              </div>
            </div>
            {/* Core Features Section */}
            <div className="py-5">
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                Core Features
              </h2>
              <div className="flex flex-col gap-4">
                {/* Feature Card 1 */}
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="flex-shrink-0 bg-primary/20 p-3 rounded-full">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      menu_book
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base leading-tight">
                      Log Every Match
                    </h3>
                    <p className="text-white/70 text-sm leading-normal mt-1">
                      Easily record details of every game you attend, from the
                      score and teams to your personal notes and photos.
                    </p>
                  </div>
                </div>
                {/* Feature Card 2 */}
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="flex-shrink-0 bg-primary/20 p-3 rounded-full">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      bar_chart
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base leading-tight">
                      See Your Stats
                    </h3>
                    <p className="text-white/70 text-sm leading-normal mt-1">
                      Track your attendance across stadiums, countries, and
                      competitions. See which teams you've watched the most.
                    </p>
                  </div>
                </div>
                {/* Feature Card 3 */}
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="flex-shrink-0 bg-primary/20 p-3 rounded-full">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      emoji_events
                    </span>
                  </div>
  
                  <div>
                    <h3 className="text-white font-semibold text-base leading-tight">
                      Unlock Achievements
                    </h3>
                    <p className="text-white/70 text-sm leading-normal mt-1">
                      Gamify your fan journey by unlocking badges and
                      achievements for reaching new milestones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Founder's Note Section */}
            <div className="py-5">
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                A Note From Our Founder
              </h2>
              <p className="text-white/70 text-base font-normal leading-normal">
                "As a lifelong fan, I've always cherished the memories made in
                the stands. The roar of the crowd, the shared joy of a
                last-minute winner, the pilgrimage to a new ground—these are the
                moments that connect us. The Turnstile was born from a simple
                desire to hold onto those memories and celebrate the journey. I
                hope it brings you as much joy as building it has brought me."
              </p>
            </div>
          </main>
          {/* CTA Button Section */}
          <div className="sticky bottom-0 w-full p-4 pt-6 bg-gradient-to-t from-background-dark to-transparent">
            <button className="w-full bg-primary text-background-dark font-bold py-4 px-6 rounded-lg text-base leading-tight transition-opacity hover:opacity-90">
              Start Logging Your Matches
            </button>
          </div>
        </div>
      </body>
    </html>
  );
};

export default AboutUs;
