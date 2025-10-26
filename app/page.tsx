'use client';

import { LogIn, Users, Award } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => (
  <div className="relative text-center py-20 px-4 bg-gray-900 text-white">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(/background.png)' }}
    ></div>
    <div className="absolute inset-0 bg-black opacity-60"></div>
    <div className="relative z-10">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-green-400">
        The Turnstile
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
        Your Digital Match Day Companion. Never forget a moment.
      </p>
      <div className="mt-8">
        <Link href="/login">
          <a className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Sign Up Now
          </a>
        </Link>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
    <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const FeaturesSection = () => (
  <section className="py-20 px-4 bg-gray-900">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold">Why You&apos;ll Love The Turnstile</h2>
        <p className="text-gray-400 mt-2">Built by fans, for fans. We know what matters.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        <FeatureCard
          icon={<LogIn className="w-8 h-8" />}
          title="Digital Match Day Diary"
          description="Log every match you attend and build a personal history of your support. From preseason friendlies to grand finals, never miss a detail."
        />
        <FeatureCard
          icon={<Users className="w-8 h-8" />}
          title="Community Connection"
          description="Connect with a community of dedicated fans. Share your match day experiences, photos, and stories with those who get it."
        />
        <FeatureCard
          icon={<Award className="w-8 h-8" />}
          title="Achievement Badges"
          description="Unlock exclusive digital badges for milestones like your 10th away game or visiting every stadium in the league. Showcase your dedication!"
        />
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="py-20 px-4 bg-gray-800 text-white">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-extrabold mb-12">Get Started in Seconds</h2>
      <div className="relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700"></div>
        <div className="relative grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-3xl font-bold border-4 border-blue-500">1</div>
            <h3 className="text-xl font-bold mt-6 mb-2">Create Your Account</h3>
            <p className="text-gray-400">A quick and easy sign-up process gets you into the action immediately.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-3xl font-bold border-4 border-teal-500">2</div>
            <h3 className="text-xl font-bold mt-6 mb-2">Log Your First Match</h3>
            <p className="text-gray-400">Find your fixture, add your attendance, and start building your fan legacy.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-3xl font-bold border-4 border-green-500">3</div>
            <h3 className="text-xl font-bold mt-6 mb-2">Earn Your First Badge</h3>
            <p className="text-gray-400">Attend a match and instantly unlock your first achievement badge.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 px-4 bg-gray-900">
    <div className="container mx-auto text-center bg-gradient-to-r from-blue-500/30 to-teal-500/30 rounded-xl p-12 shadow-lg">
      <h2 className="text-4xl font-extrabold text-white">Ready to Join the Community?</h2>
      <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
        Sign up today and start building your personal rugby league history. It&apos;s free, it&apos;s fun, and it&apos;s for the fans.
      </p>
      <div className="mt-8">
        <Link href="/login">
          <a className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Create Your Fan Passport
          </a>
        </Link>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-gray-900">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}
