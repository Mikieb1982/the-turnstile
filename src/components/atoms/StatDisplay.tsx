import React from 'react';

interface StatDisplayProps {
  label: string;
  value: string | number;
  icon?: string;
}

export const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, icon }) => (
  <div className="relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-[#2b4230]/70 bg-[#101a12]/90 px-4 py-6 text-center shadow-[0_14px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_65%)] opacity-50" />
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#1c2a1f]/80 text-2xl">
      {icon}
    </div>
    <p className="relative text-4xl font-black tracking-[0.12em] text-[#f6f3e4]">{value}</p>
    <p className="relative text-[0.65rem] uppercase tracking-[0.32em] text-[#9fb09c]">{label}</p>
  </div>
);
