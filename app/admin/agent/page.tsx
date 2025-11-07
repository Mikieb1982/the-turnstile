'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/firebase/AuthContext';
import Loading from '@/app/loading';
import { Send, GitPullRequest } from 'lucide-react';

// --- IMPORTANT ---
// 1. Deploy your 'ai_devops_agent' function from the `functions/` directory:
//    firebase deploy --only functions
// 2. Get the URL from the Firebase console and paste it here.
const CLOUD_FUNCTION_URL =
  'https://your-function-url.a.run.app/ai_devops_agent';

type AgentResult = {
  pull_request_url?: string;
  new_branch?: string;
  error?: string;
};

export default function AgentCockpitPage() {
  const { user, loading: authLoading } = useAuth();
  const [command, setCommand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AgentResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command || isLoading) return;

    setIsLoading(true);
    setResult(null);

    if (CLOUD_FUNCTION_URL.includes('your-function-url')) {
      setResult({
        error:
          "Please update the 'CLOUD_FUNCTION_URL' constant in app/admin/agent/page.tsx with your deployed function's URL.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(CLOUD_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`, // Pass auth token
        },
        body: JSON.stringify({ command }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The agent failed to execute the command.');
      }

      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-text-primary mb-4">
        DevOps Agent Cockpit
      </h2>
      <p className="text-text-secondary mb-6">
        Issue commands to the AI DevOps agent. The agent will get instructions
        from Gemini 2.5 Pro, write code, and open a Pull Request on GitHub.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="e.g., 'Create a new badge for attending 5 matches'"
            className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !command}
            className="flex items-center justify-center w-full bg-primary hover:bg-green-600 text-background-dark font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-background-dark"></div>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Execute Command
              </>
            )}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Agent Response</h3>
          {result.pull_request_url && (
            <div className="space-y-3">
              <p className="text-green-400">
                Success! The agent has created a new branch:
                <strong className="ml-2">{result.new_branch}</strong>
              </p>
              <a
                href={result.pull_request_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <GitPullRequest className="w-5 h-5 mr-2" />
                Review Pull Request on GitHub
              </a>
            </div>
          )}
          {result.error && (
            <div>
              <p className="text-red-400 font-bold">An error occurred:</p>
              <pre className="text-red-300 bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto">
                {result.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
