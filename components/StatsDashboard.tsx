// components/StatsDashboard.tsx
interface StatsProps {
  matchesAttended: number;
  teamsVisited: number;
  venuesVisited: number;
  consecutiveWeeks: number;
}

export default function StatsDashboard({
  matchesAttended,
  teamsVisited,
  venuesVisited,
  consecutiveWeeks
}: StatsProps) {
  const stats = [
    { 
      label: 'Matches Attended', 
      value: matchesAttended, 
      icon: 'confirmation_number',
      color: 'gold' 
    },
    { 
      label: 'Teams Visited', 
      value: teamsVisited, 
      icon: 'groups',
      color: 'crimson' 
    },
    { 
      label: 'Venues Explored', 
      value: venuesVisited, 
      icon: 'stadium',
      color: 'gold' 
    },
    { 
      label: 'Week Streak', 
      value: consecutiveWeeks, 
      icon: 'local_fire_department',
      color: 'crimson' 
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`
            bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover
            transition-all duration-300 hover:scale-105
            ${stat.color === 'gold' ? 'hover:shadow-card-glow-gold' : 'hover:shadow-card-glow-crimson'}
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span 
              className={`material-symbols-outlined text-3xl
                ${stat.color === 'gold' ? 'text-gold' : 'text-crimson'}
              `}
            >
              {stat.icon}
            </span>
          </div>
          
          <div className="font-display text-4xl font-bold text-text-primary mb-1 animate-pulse-score">
            {stat.value}
          </div>
          
          <div className="text-text-secondary text-sm font-medium uppercase tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
