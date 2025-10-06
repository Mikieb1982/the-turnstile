'use client';

import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="text-center py-20 bg-surface rounded-md">
      <h2 className="text-2xl font-bold text-text-strong">{title}</h2>
      <p className="text-text-subtle mt-2">{message}</p>
    </div>
  );
};
