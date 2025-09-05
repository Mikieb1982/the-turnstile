import React from 'react';
import { RugbyBallIcon } from './Icons';

const FeatureSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-strong mb-3 border-b-4 border-secondary pb-2 w-fit">{title}</h2>
        <div className="text-text space-y-2">{children}</div>
    </div>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="bg-accent/20 border border-accent/30 text-text-strong rounded-md px-2 py-1 text-sm list-none font-semibold">{children}</li>
)

export const AboutView: React.FC = () => {
    return (
        <div className="bg-surface p-6 md:p-8 rounded-md shadow-card text-text">
            <div className="flex items-center gap-4 mb-6 border-b border-border pb-4">
                <RugbyBallIcon className="w-10 h-10 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-text-strong">App Features</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <div>
                    <FeatureSection title="1. Upcoming Fixtures">
                        <p>Find upcoming <strong>Super League matches</strong> to plan your next game day.</p>
                        <p>Perfect for planning away days or spontaneous visits.</p>
                    </FeatureSection>
                    
                    <FeatureSection title="2. Check-Ins & Match Attendance">
                        <p>Log every <strong>rugby match you attend</strong> across the Super League and beyond.</p>
                        <p>Build your personal match-going history.</p>
                    </FeatureSection>

                    <FeatureSection title="3. Personal Stats & Visit Map">
                        <p>Track your personal match history: season totals, lifetime attendance, and club-by-club breakdowns.</p>
                        <p>See your <strong>stadium visit map</strong> fill with every new ground you tick off.</p>
                    </FeatureSection>

                    <FeatureSection title="4. Badge Collection">
                        <p>Earn badges for milestones:</p>
                        <ul className="flex flex-wrap gap-2 mt-2">
                           <Badge>First Super League match</Badge>
                           <Badge>Local derbies</Badge>
                           <Badge>Visiting new grounds</Badge>
                           <Badge>Finals appearances</Badge>
                        </ul>
                    </FeatureSection>
                </div>

                <div>
                    <FeatureSection title="5. League & Grounds Coverage">
                        <p>Full fixture lists and league tables for all <strong>Super League clubs</strong>.</p>
                        <p>Coverage of every official Super League stadium.</p>
                    </FeatureSection>

                     <FeatureSection title="6. Fan Connections">
                        <p>Add mates who also attend matches.</p>
                        <p>Get notified when they’re off to a game you’re missing.</p>
                        <p>Compare stats to see who’s the bigger away-day die-hard.</p>
                    </FeatureSection>

                    <FeatureSection title="7. Premium Features">
                        <p>With a subscription you unlock:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>Extended historical results back to 1996.</li>
                            <li>Upload photos from each game.</li>
                            <li>Message other users and share experiences.</li>
                            <li>Full fixture lists by club and stadium, including Cup competitions.</li>
                        </ul>
                    </FeatureSection>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
                 <h2 className="text-2xl font-bold text-text-strong mb-4">Summary Table</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                        <thead className="bg-surface-alt text-sm text-text-subtle uppercase">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Feature</th>
                                <th className="px-4 py-3 font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            <tr className="hover:bg-surface-alt even:bg-surface-alt/50">
                                <td className="px-4 py-3 font-semibold text-text-strong">Upcoming Fixtures</td>
                                <td className="px-4 py-3 text-text">Locate upcoming Super League matches near you</td>
                            </tr>
                            <tr className="hover:bg-surface-alt even:bg-surface-alt/50">
                                <td className="px-4 py-3 font-semibold text-text-strong">Check-Ins & Match Tracking</td>
                                <td className="px-4 py-3 text-text">Log every game you attend, home or away</td>
                            </tr>
                            <tr className="hover:bg-surface-alt even:bg-surface-alt/50">
                                <td className="px-4 py-3 font-semibold text-text-strong">Personal Stats & Map</td>
                                <td className="px-4 py-3 text-text">Track totals by season, club, and stadium</td>
                            </tr>
                            <tr className="hover:bg-surface-alt even:bg-surface-alt/50">
                                <td className="px-4 py-3 font-semibold text-text-strong">Badges</td>
                                <td className="px-4 py-3 text-text">Earn rewards for derbies, finals, and stadium milestones</td>
                            </tr>
                             <tr className="hover:bg-surface-alt even:bg-surface-alt/50">
                                <td className="px-4 py-3 font-semibold text-text-strong">League Coverage</td>
                                <td className="px-4 py-3 text-text">Full fixture lists for all Super League clubs</td>
                            </tr>
                            <tr className="hover:bg-surface-alt even:bg-surface-alt/50">
                                <td className="px-4 py-3 font-semibold text-text-strong">Fan Connections</td>
                                <td className="px-4 py-3 text-text">Compare stats, get alerts when mates attend games</td>
                            </tr>
                            <tr className="hover:bg-surface-alt even:bg-surface-alt/50">
                                <td className="px-4 py-3 font-semibold text-text-strong">Premium</td>
                                <td className="px-4 py-3 text-text">History back to 1996, photos, messaging, extended fixture access</td>
                            </tr>
                             <tr className="hover:bg-surface-alt even:bg-surface-alt/50">
                                <td className="px-4 py-3 font-semibold text-text-strong">Data & Support</td>
                                <td className="px-4 py-3 text-text">Fixture data provided by TheSportsDB.com</td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
            </div>

            <div className="mt-8 text-center text-sm text-text-subtle/80">
                <p><strong>Note:</strong> The features listed above represent the full vision for the application. The current version is a demonstration.</p>
            </div>
        </div>
    );
};