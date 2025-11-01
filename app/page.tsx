import { ArrowRight, BarChart, Badge, LifeBuoy, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">Welcome to The Turnstile</h1>
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                Your ultimate companion for tracking every Super League match you attend. Create a personalized history, unlock achievements, and share your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/sign-up">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                    Get Started <ArrowRight className="ml-2" />
                  </button>
                </Link>
                <Link href="/about">
                  <button className="bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-3xl opacity-20"></div>
              <img src="/images/rugby-player.png" alt="Rugby Player" className="relative z-10 max-w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Key Features</h2>
            <p className="text-gray-400 mt-2">Everything you need to enhance your fan experience.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <Badge className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Track Match History</h3>
              <p className="text-gray-400">
                Log every match you attend to build a personalized record of your support.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <BarChart className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Personalized Dashboard</h3>
              <p className="text-gray-400">
                View lifetime stats, unique grounds visited, and total points witnessed.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <MapPin className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Explore & Compete</h3>
              <p className="text-gray-400">
                Unlock achievements for visiting new stadiums and climb the leaderboard.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <LifeBuoy className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Dedicated Support</h3>
              <p className="text-gray-400">
                Get rapid acknowledgment and resolution for your inquiries and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Fandom?</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join The Turnstile community today and start your journey as a dedicated Super League supporter. It's free to sign up!
          </p>
          <Link href="/sign-up">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
              Sign Up for Free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500">
          <p>&copy; 2024 The Turnstile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
