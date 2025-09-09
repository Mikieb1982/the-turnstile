import React from 'react';
import { RugbyBallIcon } from './Icons';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
    return (
        <div className="container mx-auto p-4 md:p-6 min-h-screen flex flex-col items-center justify-center text-center">
            <RugbyBallIcon className="w-20 h-20 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-strong">Welcome to The Scrum Book</h1>
            <p className="text-lg text-text-subtle mt-4 max-w-2xl">
                Your ultimate companion for tracking every Super League match you attend. Log games, collect badges, and view your personal stats.
            </p>
            <div className="mt-10">
                <button
                    onClick={onLogin}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg"
                >
                    Enter as a Guest
                </button>
            </div>
        </div>
    );
};