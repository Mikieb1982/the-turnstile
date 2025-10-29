import { Award, Shield, Star, Trophy } from 'lucide-react';

const achievements = [
  {
    icon: <Star className="w-12 h-12 text-yellow-400" />,
    title: 'First Match Logged',
    description: 'Log your first Super League match.',
    unlocked: false,
  },
  {
    icon: <Trophy className="w-12 h-12 text-yellow-400" />,
    title: 'Hat-Trick of Matches',
    description: 'Log three matches in a single season.',
    unlocked: false,
  },
  {
    icon: <Shield className="w-12 h-12 text-yellow-400" />,
    title: 'Away Day Veteran',
    description: 'Log a match at five different away grounds.',
    unlocked: false,
  },
  {
    icon: <Award className="w-12 h-12 text-yellow-400" />,
    title: 'Super Fan',
    description: 'Log a match for every team in the Super League.',
    unlocked: false,
  },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-400 mb-8">Your Achievements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className={`bg-gray-800 p-6 rounded-lg card-lifted text-center ${achievement.unlocked ? '' : 'opacity-50'}`}>
              <div className="mb-4 mx-auto w-fit">{achievement.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{achievement.title}</h2>
              <p className="text-gray-400 mb-4">{achievement.description}</p>
              <div className={`font-bold text-lg ${achievement.unlocked ? 'text-green-400' : 'text-red-400'}`}>
                {achievement.unlocked ? 'Unlocked' : 'Locked'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
