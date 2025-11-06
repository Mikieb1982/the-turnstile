// app/page.tsx
import { ArrowRight, BarChart, Badge, LifeBuoy, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; 

export default function LandingPage() {
  return (
    <div className="bg-background text-text-primary">
      {/* Hero Section */}
      <section className="relative bg-surface overflow-hidden rounded-lg shadow-card">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Welcome to The Turnstile</h1>
              <p className="text-md md:text-lg text-text-secondary mb-6 max-w-lg mx-auto lg:mx-0">
                Your ultimate companion for tracking every Super League match you attend. Create a personalized history, unlock achievements, and share your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/sign-up">
                  <button className="bg-primary hover:bg-green-600 text-background font-semibold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                    Get Started <ArrowRight className="ml-2" />
                  </button>
                </Link>
                <Link href="/about">
                  <button className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-background font-semibold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-10"></div>
              <Image
                src="/logo.png"
                alt="The Turnstile Logo"
                width={350}
                height={350}
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="text-text-secondary mt-2">Everything you need to enhance your fan experience.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface p-6 rounded-lg text-center transform hover:-translate-y-1 transition-transform duration-300 shadow-card hover:shadow-card-hover">
              <Badge className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Match History</h3>
              <p className="text-text-secondary text-sm">
                Log every match you attend to build a personalized record of your support.
              </p>
            </div>
            <div className="bg-surface p-6 rounded-lg text-center transform hover:-translate-y-1 transition-transform duration-300 shadow-card hover:shadow-card-hover">
              <BarChart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalized Dashboard</h3>
              <p className="text-text-secondary text-sm">
                View lifetime stats, unique grounds visited, and total points witnessed.
              </p>
            </div>
            <div className="bg-surface p-6 rounded-lg text-center transform hover:-translate-y-1 transition-transform duration-300 shadow-card hover:shadow-card-hover">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Explore & Compete</h3>
              <p className="text-text-secondary text-sm">
                Unlock achievements for visiting new stadiums and climb the leaderboard.
              </p>
            </div>
            <div className="bg-surface p-6 rounded-lg text-center transform hover:-translate-y-1 transition-transform duration-300 shadow-card hover:shadow-card-hover">
              <LifeBuoy className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
              <p className="text-text-secondary text-sm">
                Get rapid acknowledgment and resolution for your inquiries and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-surface py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Fandom?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join The Turnstile community today and start your journey as a dedicated Super League supporter. It's free to sign up!
          </p>
          <Link href="/sign-up">
            <button className="bg-primary hover:bg-green-600 text-background font-bold py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
              Sign Up for Free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface">
        <div className="container mx-auto px-4 py-6 text-center text-text-secondary">
          <p>&copy; 2024 The Turnstile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
