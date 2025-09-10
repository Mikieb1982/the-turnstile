import React from 'react';
import { RugbyBallIcon, TrophyIcon, ChartBarIcon, CheckCircleIcon, CalendarDaysIcon } from './Icons';

interface LoginViewProps {
  onLogin: () => void;
}

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <div className="bg-primary/10 text-primary rounded-full p-4 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-text-strong mb-2">{title}</h3>
        <p className="text-text-subtle">{description}</p>
    </div>
);


export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden bg-surface-alt">
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5" 
                        style={{backgroundImage: "url('https://images.unsplash.com/photo-1594498742294-967252041133?q=80&w=2670&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
                    ></div>
                    <div className="relative z-10">
                        <RugbyBallIcon className="w-20 h-20 mx-auto mb-6 text-primary" />
                        <h1 className="text-4xl md:text-6xl font-extrabold text-text-strong tracking-tight">
                            The Scrum Book
                        </h1>
                        <p className="text-lg md:text-xl text-text-subtle mt-4 max-w-3xl mx-auto">
                           Your Ultimate Rugby League Companion. Track every match, unlock achievements, and chart your journey as a super fan.
                        </p>
                        <div className="mt-10">
                            <button
                                onClick={onLogin}
                                className="bg-primary text-white font-bold py-4 px-10 rounded-xl text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/50"
                            >
                                Enter The Scrum
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 md:py-24 px-4 bg-surface">
                    <div className="container mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-text-strong mb-16">
                            Everything a Fan Needs
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            <Feature 
                                icon={<CheckCircleIcon className="w-8 h-8"/>}
                                title="Track Your Matches"
                                description="Log every game you attend, from Super League clashes to local derbies. Build your personal match-going history."
                            />
                            <Feature 
                                icon={<TrophyIcon className="w-8 h-8"/>}
                                title="Unlock Badges"
                                description="Earn unique badges for milestones like visiting new grounds, attending derbies, and reaching attendance goals."
                            />
                             <Feature 
                                icon={<ChartBarIcon className="w-8 h-8"/>}
                                title="View Your Stats"
                                description="Visualize your journey with personal stats, see your most-watched teams, and track stadium visits on a map."
                            />
                            <Feature 
                                icon={<CalendarDaysIcon className="w-8 h-8"/>}
                                title="Fixtures & Results"
                                description="Stay up-to-date with the latest scores, results, and upcoming fixtures for the entire Super League."
                            />
                        </div>
                    </div>
                </section>
            </main>
            <footer className="text-center py-6 text-text-subtle bg-surface-alt border-t border-border">
                <p>&copy; {new Date().getFullYear()} The Scrum Book. All rights reserved.</p>
                <p className="text-xs mt-1">Match data provided by TheSportsDB.com.</p>
            </footer>
        </div>
    );
};