// components/SeasonProgress.tsx
interface SeasonProgressProps {
  currentWeek: number;
  totalWeeks: number;
  matchesAttended: number;
}

export default function SeasonProgress({
  currentWeek,
  totalWeeks,
  matchesAttended
}: SeasonProgressProps) {
  const progressPercentage = (currentWeek / totalWeeks) * 100;

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display text-display-sm text-text-primary uppercase">
          Season Progress
        </h3>
        <span className="text-gold font-bold text-lg">
          Week {currentWeek}/{totalWeeks}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-4 bg-surface rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-crimson via-gold to-crimson 
                     transition-all duration-500 ease-out shadow-glow"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Stats below */}
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-text-secondary">
          Matches attended: <strong className="text-gold">{matchesAttended}</strong>
        </span>
        <span className="text-text-secondary">
          {Math.round(progressPercentage)}% complete
        </span>
      </div>
    </div>
  );
}
