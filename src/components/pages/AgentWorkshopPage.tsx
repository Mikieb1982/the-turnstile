import React, { useState } from 'react';
import { dispatchAgentCommand, type DispatchResult } from '../../lib/agentClient';
import { Button } from '../atoms/Button';

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
    <div className="space-y-8">
      <header className="space-y-3">
        <h2 className="section-title text-sm">AI Code Workshop</h2>
        <p className="max-w-2xl text-xs uppercase tracking-[0.32em] text-[#90a190]">
          Describe the change you would like to make to the codebase and the agent scrum will turn it into a structured work order
          and generated file.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="rugby-card space-y-5 p-6 sm:p-8">
        <label className="block space-y-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#9fb09c]">
          Natural language command
          <textarea
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            rows={5}
            className="w-full rounded-xl border border-[#2f4632]/70 bg-[#080f0b]/80 p-4 text-sm leading-relaxed text-[#f6f3e4] placeholder:text-[#5e6d5f] focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/70"
            placeholder="e.g. Create a React component named TeamCard with props title:string and subtitle:string"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" variant="primary" disabled={isSubmitting} className="sm:w-auto">
            {isSubmitting ? 'Dispatching…' : 'Send to agents'}
          </Button>
          <button
            type="button"
            className="text-xs uppercase tracking-[0.28em] text-[#8fa08f] transition-colors duration-300 hover:text-[#d4af37]"
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
        <div className="rounded-xl border border-[#b91c1c]/60 bg-[#5c1111]/40 p-4 text-sm text-[#f9dcdc] shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
          {error}
        </div>
      )}

      {result && (
        <section className="rugby-card space-y-6 p-6 sm:p-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9fb09c]">Work order</h3>
            <pre className="mt-3 max-h-80 overflow-auto rounded-xl border border-[#203726]/60 bg-[#080f0b]/85 p-4 text-xs text-[#cfd6cd]">
              {JSON.stringify(result.workOrder, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9fb09c]">Generation result</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.32em] text-[#cfd6cd]">
              <span className="text-[#d4af37]">Status:</span> {result.result.status}{' '}
              <span className="text-[#d4af37]">File:</span> {result.result.filePath}
            </p>
            <pre className="mt-3 max-h-80 overflow-auto rounded-xl border border-[#203726]/60 bg-[#080f0b]/85 p-4 text-xs text-[#cfd6cd]">
              {JSON.stringify(result.result, null, 2)}
            </pre>
          </div>
        </section>
      )}
    </div>
  );
};
