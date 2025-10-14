import React, { useState } from 'react';
import { dispatchAgentCommand, type DispatchResult } from '../../lib/agentClient';

export const AgentWorkshopPage: React.FC = () => {
  const [command, setCommand] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DispatchResult | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!command.trim().length) {
      setError('Please enter a command to dispatch.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await dispatchAgentCommand(command.trim());
      setResult(response);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : 'Failed to dispatch command.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-bold text-white mb-2">AI Code Workshop</h2>
        <p className="text-gray-400 text-sm">
          Describe the change you would like to make to the codebase and the agent workflow will turn it into a
          structured work order and generated file.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-gray-300">Natural language command</span>
          <textarea
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            rows={5}
            className="mt-2 w-full rounded-md border border-gray-700 bg-gray-900 text-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. Create a React component named TeamCard with props title:string and subtitle:string"
          />
        </label>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 rounded-md font-semibold text-gray-900"
          >
            {isSubmitting ? 'Dispatching…' : 'Send to agents'}
          </button>
          <button
            type="button"
            className="text-sm text-gray-400 hover:text-gray-200"
            onClick={() => {
              setCommand('');
              setResult(null);
              setError(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500 rounded-md p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {result && (
        <section className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Work order</h3>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-300 bg-gray-900 border border-gray-700 rounded-md p-3 overflow-x-auto">
              {JSON.stringify(result.workOrder, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Generation result</h3>
            <p className="text-sm text-gray-300">
              <span className="font-medium text-cyan-400">Status:</span> {result.result.status}{' '}
              <span className="font-medium text-cyan-400">File:</span> {result.result.filePath}
            </p>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-300 bg-gray-900 border border-gray-700 rounded-md p-3 overflow-x-auto">
              {JSON.stringify(result.result, null, 2)}
            </pre>
          </div>
        </section>
      )}
    </div>
  );
};
