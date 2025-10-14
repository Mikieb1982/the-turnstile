import React from 'react';
import { Button } from '../atoms/Button';

interface NextMatchCardProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  stadium: string;
  homeLogo: string;
  awayLogo: string;
  onLogAttendance?: () => void;
}

export const NextMatchCard: React.FC<NextMatchCardProps> = ({
  homeTeam,
  awayTeam,
  date,
  stadium,
  homeLogo,
  awayLogo,
  onLogAttendance,
}) => {
  const gameDate = new Date(date);
  const formattedDate = gameDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const time = gameDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-cyan-500/20">
      <div className="flex justify-around items-center text-white text-center mb-6">
        <div className="flex flex-col items-center space-y-3 group">
          <div className="relative">
            <img 
              className="w-20 h-20 rounded-full border-2 border-gray-600 group-hover:border-cyan-500 transition-all duration-300 group-hover:scale-110" 
              src={homeLogo} 
              alt={`${homeTeam} logo`} 
            />
            <div className="absolute inset-0 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-300"></div>
          </div>
          <span className="font-bold text-sm">{homeTeam}</span>
        </div>
        
        <div className="flex flex-col items-center px-4">
          <div className="text-cyan-400 font-bold text-xl mb-1">{formattedDate}</div>
          <div className="text-cyan-300 text-lg mb-2">{time}</div>
          <span className="text-4xl font-light my-2 animate-pulse">VS</span>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
            <span>📍</span>
            <span>{stadium}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-3 group">
          <div className="relative">
            <img 
              className="w-20 h-20 rounded-full border-2 border-gray-600 group-hover:border-cyan-500 transition-all duration-300 group-hover:scale-110" 
              src={awayLogo} 
              alt={`${awayTeam} logo`} 
            />
            <div className="absolute inset-0 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-300"></div>
          </div>
          <span className="font-bold text-sm">{awayTeam}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button variant="primary" onClick={onLogAttendance}>
          <span className="flex items-center justify-center gap-2">
            <span>✓</span>
            Log Attendance
          </span>
        </Button>
      </div>
    </div>
  );
};