import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './atoms/Button';
import {
  AtSymbolIcon,
  CodeBracketIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from './Icons';

const features = [
  {
    name: 'Lifetime Access',
    description: 'Pay once and get access to all features, forever. No subscriptions, no hidden fees.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Active Community',
    description: 'Join a thriving community of rugby league fans. Share your passion, discuss matches, and connect with others.',
    icon: AtSymbolIcon,
  },
  {
    name: 'Continuous Updates',
    description: 'We are constantly adding new features and improving the app. Your one-time purchase gets you all future updates for free.',
    icon: SparklesIcon,
  },
  {
    name: 'Developer API',
    description: 'Integrate your own applications and services with our developer-friendly API. Build your own tools on top of The Turnstile.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Premium Support',
    description: 'Get prioritised support from our dedicated team. We are here to help you with any questions or issues you may have.',
    icon: LifebuoyIcon,
  },
];

export const LoginPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
        <div className="flex items-center gap-4 mb-8">
            <img
                src="/logo.png"
                alt="The Turnstile Logo"
                className="h-16 w-16"
            />
             <div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    The Turnstile
                </h1>
                <p className="mt-2 text-lg leading-8 text-gray-300">
                    Your Digital Rugby League Passport
                </p>
            </div>
        </div>


          <p className="mt-6 text-lg leading-8 text-gray-300">
            Welcome to the ultimate companion app for every rugby league fan. Track your attended matches, collect digital memorabilia, and connect with a passionate community of supporters. Sign in to begin your journey.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              size="lg"
              className="bg-indigo-500 hover:bg-indigo-400 text-white"
            >
              {isLoading ? 'Signing in...' : 'Sign In with Google'}
            </Button>
            <a href="#features" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="https://placehold.co/2432x1442/000000/FFFFFF/png?text=App+Screenshot"
              alt="App screenshot"
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
      <div
        id="features"
        className="relative bg-white pb-24 pt-16 sm:pb-32 sm:pt-24 lg:pb-40 lg:pt-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything You Need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The ultimate fan experience
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The Turnstile is more than just an app - it&apos;s a community. We&apos;ve built a platform for fans to connect, share, and celebrate their love for the game.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="relative bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-lg font-semibold leading-8 text-indigo-400">Ready to get started?</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Join The Turnstile today.</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">Sign in with your Google account to create your digital passport and start tracking your matchday journey. It&apos;s free, secure, and takes less than a minute.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button
                        onClick={handleLogin}
                        disabled={isLoading}
                        size="lg"
                        className="bg-indigo-500 hover:bg-indigo-400 text-white"
                    >
                        {isLoading ? 'Redirecting...' : 'Sign In & Get Started'}
                    </Button>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};
