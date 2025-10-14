import React from 'react';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeLogo: string;
  awayLogo: string;
  onClick?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  date,
  homeLogo,
  awayLogo,
  onClick,
}) => {
  const gameDate = new Date(date);
  const formattedDate = gameDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  const time = gameDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden mb-4 border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 flex justify-between items-center">
        <div className="flex flex-col items-center text-center w-1/4">
          <img className="w-12 h-12 rounded-full" src={homeLogo} alt={`${homeTeam} logo`} />
          <h3 className="mt-2 font-semibold text-sm text-white">{homeTeam}</h3>
        </div>
        <div className="text-center">
          <p className="font-bold text-base text-cyan-400">{time}</p>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
        <div className="flex flex-col items-center text-center w-1/4">
          <img className="w-12 h-12 rounded-full" src={awayLogo} alt={`${awayTeam} logo`} />
          <h3 className="mt-2 font-semibold text-sm text-white">{awayTeam}</h3>
        </div>
      </div>
    </div>
  );
};