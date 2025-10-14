import React from 'react';

interface StatDisplayProps {
  label: string;
  value: string | number;
  icon?: string;
}

export const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, icon }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700 hover:border-cyan-500 transition-colors">
    {icon && <div className="text-2xl mb-2">{icon}</div>}
    <p className="text-3xl font-bold text-white">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{label}</p>
  </div>
);