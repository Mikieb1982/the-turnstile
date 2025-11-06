import React from 'react';
import Image from 'next/image';

interface CardProps {
  team: {
    Position: number;
    Team: string;
    Pld: number;
    W: number;
    D: number;
    L: number;
    PF: number;
    PA: number;
    PD: string; // <-- Change this from number to string
    Pts: number;
  };
  getTeamLogo: (teamName: string) => string;
}

const Card: React.FC<CardProps> = ({ team, getTeamLogo }) => {
  return (
    <div className="bg-surface rounded-lg shadow-card p-4 transform transition duration-300 hover:scale-102 hover:shadow-card-hover">
      <div className="flex items-center mb-4">
        <span className="text-xl font-bold mr-3">{team.Position}</span>
        <Image src={getTeamLogo(team.Team)} alt={team.Team} width={40} height={40} className="rounded-full" />
        <span className="text-lg font-bold ml-3">{team.Team}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-semibold text-text-secondary">Played:</span> {team.Pld}
        </div>
        <div>
          <span className="font-semibold text-text-secondary">Won:</span> {team.W}
        </div>
        <div>
          <span className="font-bold">Drawn:</span> {team.D}
        </div>
        <div>
          <span className="font-bold">Lost:</span> {team.L}
        </div>
        <div>
          <span className="font-bold">Points For:</span> {team.PF}
        </div>
        <div>
          <span className="font-bold">Points Against:</span> {team.PA}
        </div>
        <div>
          <span className="font-bold">Points Difference:</span> {team.PD}
        </div>
        <div>
          <span className="font-bold">Points:</span> {team.Pts}
        </div>
      </div>
    </div>
  );
};

export default Card;