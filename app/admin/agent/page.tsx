'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/firebase/AuthContext';
import Loading from '@/app/loading';
import { Send, GitPullRequest, Bot, Sparkles } from 'lucide-react';

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
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ command }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Agent failed.');
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) return <Loading />;

  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-16 sm:py-24">
      {/* animated background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
                        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
                             linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
                        bg-[size:14px_24px]"
      />

      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            DevOps Agent Cockpit
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-400">
            Issue a single sentence and watch AI write, commit and open a PR.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="group relative">
            <Sparkles className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400" />
            <textarea
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="e.g. Create a new badge for attending 5 matches"
              required
              rows={4}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800/60
                         py-4 pl-12 pr-4 text-white placeholder-slate-400
                         ring-1 ring-transparent transition
                         focus:outline-none focus:ring-emerald-400
                         dark:bg-slate-800/60 dark:border-slate-700"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !command}
            className="mt-4 flex w-full items-center justify-center
                       rounded-2xl bg-emerald-500 px-4 py-3 font-semibold
                       text-slate-900 shadow-lg shadow-emerald-500/20
                       transition-transform hover:scale-[1.02]
                       disabled:scale-100 disabled:cursor-not-allowed
                       disabled:bg-slate-700 disabled:text-slate-400
                       disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full
                                border-2 border-slate-900 border-t-transparent" />
                Agent is working…
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Command
              </>
            )}
          </button>
        </form>

        {result && (
          <section className="mt-10 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
              <GitPullRequest className="h-5 w-5 text-emerald-400" />
              Agent Response
            </h2>

            {result.pull_request_url && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-slate-300">
                  ✅ Branch{" "}
                  <code className="rounded bg-slate-800 px-2 py-1 text-emerald-300">
                    {result.new_branch}
                  </code>{" "}
                  created and pull request opened.
                </p>
                <a
                  href={result.pull_request_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl
                             bg-slate-800 px-4 py-2 text-sm font-medium
                             text-white ring-1 ring-white/10
                             hover:bg-slate-700 transition"
                >
                  Review on GitHub
                  <Send className="h-4 w-4" />
                </a>
              </div>
            )}

            {result.error && (
              <div className="mt-4 rounded-xl bg-red-500/10 p-4 ring-1 ring-red-500/20">
                <p className="text-sm font-semibold text-red-300">Error</p>
                <pre className="mt-2 whitespace-pre-wrap text-sm text-red-200">
                  {result.error}
                </pre>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
