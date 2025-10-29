import { BarChart, Badge, LifeBuoy, Plane } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-400">The Turnstile</h1>
        <p className="text-lg text-gray-400 text-center mt-2">Your Super League Companion</p>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Your Digital Rugby League Companion</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Deepen your fan engagement by logging your match attendance and celebrating your lifelong support for the Super League.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Tracking Your Match History */}
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <Badge className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Track Your Match History</h3>
            <p className="text-gray-400">
              Log every Super League match you attend and create a personalized historical record of your support.
            </p>
          </div>

          {/* Feature 2: Personalized Dashboard */}
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <BarChart className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Personalized Dashboard</h3>
            <p className="text-gray-400">
              View lifetime statistics, unique grounds visited, and total points witnessed.
            </p>
          </div>

          {/* Feature 3: Gamification and Social Sharing */}
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <Plane className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Gamification & Social Sharing</h3>
            <p className="text-gray-400">
              Earn digital badges for milestones and share your achievements with the community.
            </p>
          </div>

          {/* Feature 4: User Support */}
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <LifeBuoy className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Dedicated User Support</h3>
            <p className="text-gray-400">
              Get rapid acknowledgment and resolution for your inquiries and feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-400 mb-8">Sign up now and begin logging your support for your favorite Super League team!</p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        <p>&copy; 2024 The Turnstile. All rights reserved.</p>
      </footer>
    </div>
  );
}
