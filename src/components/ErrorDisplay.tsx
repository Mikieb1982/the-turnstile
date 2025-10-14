
import React from 'react';
import { AlertTriangleIcon } from './Icons';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-surface p-8 rounded-md text-center flex flex-col items-center shadow-card">
        <AlertTriangleIcon className="w-12 h-12 text-danger mb-4" />
        <h2 className="text-xl font-bold text-text-strong mb-2">An Error Occurred</h2>
        <p className="text-text-subtle mb-6">{message}</p>
        <button
            onClick={onRetry}
            className="btn btn-primary bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200"
        >
            Try Again
        </button>
    </div>
  );
};