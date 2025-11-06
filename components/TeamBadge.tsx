// components/TeamBadge.tsx
interface TeamBadgeProps {
  teamName: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  visited?: boolean;
}

export default function TeamBadge({ 
  teamName, 
  logoUrl, 
  size = 'md',
  visited = false 
}: TeamBadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-base'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`
          ${sizeClasses[size]} rounded-full
          bg-surface flex items-center justify-center
          border-2 transition-all duration-300
          ${visited 
            ? 'border-gold shadow-glow' 
            : 'border-surface hover:border-text-secondary'
          }
        `}
      >
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={teamName} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="font-display font-bold text-text-primary">
            {teamName.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      
      <span className="text-text-primary text-sm font-medium text-center max-w-[80px]">
        {teamName}
      </span>
      
      {visited && (
        <span className="material-symbols-outlined text-gold text-sm">
          check_circle
        </span>
      )}
    </div>
  );
}
