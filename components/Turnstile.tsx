'use client';

import React from 'react';
import { useTurnstileStore } from '../lib/store';
import { Lock, Unlock } from 'lucide-react';

const Turnstile = () => {
  const { locked, insertCoin, push } = useTurnstileStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Turnstile</h1>
        <div className="flex items-center justify-center mb-4">
          {locked ? <Lock size={64} /> : <Unlock size={64} />}
        </div>
        <p className="text-2xl mb-4">{locked ? 'Locked' : 'Unlocked'}</p>
        <div className="flex gap-4">
          <button
            onClick={insertCoin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Insert Coin
          </button>
          <button
            onClick={push}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Push
          </button>
        </div>
      </div>
    </div>
  );
};

export default Turnstile;
