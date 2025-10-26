'use client';

import { useRouter } from 'next/navigation';
import AddMatchForm from '../../../components/match-log/AddMatchForm';
import MatchList from '../../../components/match-log/MatchList';

export default function MatchLog() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
      <div className="max-w-4xl w-full mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Match Log</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <AddMatchForm />
          </div>
          <div className="md:col-span-2">
            <MatchList />
          </div>
        </div>
        <div className="text-center mt-8">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Back to Dashboard
        </button>
        </div>
      </div>
    </div>
  );
}
