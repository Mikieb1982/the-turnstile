// components/MatchCard.tsx
interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  venue: string;
  attended: boolean;
}

export default function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  venue,
  attended
}: MatchCardProps) {
  return (
    <div className={`
      bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover 
      transition-all duration-300 border-l-4
      ${attended ? 'border-l-gold shadow-card-glow-gold' : 'border-l-surface'}
    `}>
      {/* Date and venue header */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <span className="text-text-secondary font-medium">{date}</span>
        {attended && (
          <span className="bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold uppercase">
            Attended
          </span>
        )}
      </div>

      {/* Teams and scores */}
      <div className="space-y-3">
        {/* Home team */}
        <div className="flex justify-between items-center">
          <span className="font-display text-xl font-semibold text-text-primary">
            {homeTeam}
          </span>
          <span className="font-display text-2xl font-bold text-crimson">
            {homeScore}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-surface" />

        {/* Away team */}
        <div className="flex justify-between items-center">
          <span className="font-display text-xl font-semibold text-text-primary">
            {awayTeam}
          </span>
          <span className="font-display text-2xl font-bold text-crimson">
            {awayScore}
          </span>
        </div>
      </div>

      {/* Venue footer */}
      <div className="mt-4 pt-4 border-t border-surface">
        <p className="text-text-secondary text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-base">location_on</span>
          {venue}
        </p>
      </div>
    </div>
  );
}
