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
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-cyan-500/50">
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold mr-4">{team.Position}</span>
        <Image src={getTeamLogo(team.Team)} alt={team.Team} width={48} height={48} className="rounded-full" />
        <span className="text-xl font-bold ml-4">{team.Team}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="font-bold">Played:</span> {team.Pld}
        </div>
        <div>
          <span className="font-bold">Won:</span> {team.W}
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