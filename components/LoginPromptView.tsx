import React from 'react';
import { UserCircleIcon } from './Icons';

interface LoginPromptViewProps {
  onLogin: () => void;
}

export const LoginPromptView: React.FC<LoginPromptViewProps> = ({ onLogin }) => {
  return (
    <div className="bg-surface p-8 rounded-xl text-center flex flex-col items-center shadow-card max-w-lg mx-auto mt-4 md:mt-10">
        <UserCircleIcon className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold text-text-strong mb-2">Create a Profile to Continue</h2>
        <p className="text-text-subtle mb-6">
            Log in to track your attended matches, earn badges, view your personal stats, and connect with the community.
        </p>
        <button
            onClick={onLogin}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-md focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
            Log In & Create Profile
        </button>
    </div>
  );
};