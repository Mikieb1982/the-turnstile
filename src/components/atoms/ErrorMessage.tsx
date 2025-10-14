import React from 'react';
import { Button } from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
    <div className="text-6xl mb-4">⚠️</div>
    <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
    <p className="text-gray-400 text-center mb-6">{message}</p>
    {onRetry && (
      <Button variant="primary" onClick={onRetry}>
        Try Again
      </Button>
    )}
  </div>
);