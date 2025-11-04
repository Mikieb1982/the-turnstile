import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  Icon: LucideIcon;
  title: string;
  value: string | number;
  colorClassName: string;
}

const StatCard: React.FC<StatCardProps> = ({ Icon, title, value, colorClassName }) => {
  return (
    <div className="bg-card-dark p-6 rounded-lg shadow-card-glow flex items-center transform transition-transform duration-300 hover:-translate-y-1">
      <Icon className={`w-12 h-12 ${colorClassName} mr-6`} />
      <div>
        <p className="text-gray-400 font-body text-lg">{title}</p>
        <h3 className="font-display text-4xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
