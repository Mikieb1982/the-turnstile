import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { LeagueStanding } from "@/types";
import { getServerFirestore } from "@/lib/firebaseAdmin";
import { mockLeagueTable } from "@/services/mockData";

export const metadata: Metadata = {
  title: "Betfred Super League Table | The Turnstile",
  description: "Server-rendered snapshot of the latest Betfred Super League standings pulled directly from Firestore.",
};

export const revalidate = 60;

type LeagueStandingDocument = Partial<LeagueStanding> & { id?: string };

const normaliseStanding = (doc: LeagueStandingDocument): LeagueStanding => ({
  rank: typeof doc.rank === "number" ? doc.rank : 0,
  teamId: doc.teamId ?? doc.id ?? "unknown-team",
  teamName: doc.teamName ?? "Unknown Team",
  teamLogoUrl: doc.teamLogoUrl ?? "",
  played: typeof doc.played === "number" ? doc.played : 0,
  wins: typeof doc.wins === "number" ? doc.wins : 0,
  draws: typeof doc.draws === "number" ? doc.draws : 0,
  losses: typeof doc.losses === "number" ? doc.losses : 0,
  points: typeof doc.points === "number" ? doc.points : 0,
  form: doc.form ?? "",
});

const fetchLeagueStandings = async (): Promise<{ standings: LeagueStanding[]; isFallback: boolean }> => {
  try {
    const firestore = getServerFirestore();
    const snapshot = await firestore.collection("leagueTable").orderBy("rank").get();

    if (snapshot.empty) {
      return { standings: [], isFallback: false };
    }

    const standings = snapshot.docs
      .map((document) => normaliseStanding({ id: document.id, ...(document.data() as LeagueStandingDocument) }))
      .sort((a, b) => a.rank - b.rank);

    return { standings, isFallback: false };
  } catch (error) {
    console.error("Failed to load league standings from Firestore. Falling back to mock data.", error);
    return { standings: mockLeagueTable, isFallback: true };
  }
};

const renderFormIndicator = (form: string) => {
  if (!form) {
    return <span className="text-xs text-slate-400">No recent form data</span>;
  }

  const results = form.replace(/\s+/g, "").split("").slice(-5);
  return (
    <div className="flex gap-1">
      {results.map((result, index) => {
        const baseClasses = "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold";
        if (result.toUpperCase() === "W") {
          return (
            <span key={`${result}-${index}`} className={`${baseClasses} bg-emerald-400/20 text-emerald-200 ring-1 ring-inset ring-emerald-400/60`}>
              W
            </span>
          );
        }
        if (result.toUpperCase() === "L") {
          return (
            <span key={`${result}-${index}`} className={`${baseClasses} bg-rose-400/20 text-rose-200 ring-1 ring-inset ring-rose-400/60`}>
              L
            </span>
          );
        }
        return (
          <span key={`${result}-${index}`} className={`${baseClasses} bg-amber-400/20 text-amber-200 ring-1 ring-inset ring-amber-400/60`}>
            D
          </span>
        );
      })}
    </div>
  );
};

export default async function LeagueTablePage() {
  const { standings, isFallback } = await fetchLeagueStandings();

  if (!standings.length) {
    notFound();
  }

  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Betfred Super League</p>
        <h1 className="text-3xl font-bold text-white md:text-4xl">League Table</h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          This table is rendered on the server using live data from your Firestore instance. Refresh to keep tabs on the latest
          form, points totals, and movement across the Betfred Super League.
        </p>
      </header>

      {isFallback ? (
        <p className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Unable to reach Firestore from the server. Showing the latest locally cached standings instead.
        </p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-2xl">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">Pos</th>
              <th scope="col" className="px-4 py-3">Team</th>
              <th scope="col" className="px-4 py-3 text-center">P</th>
              <th scope="col" className="px-4 py-3 text-center">W</th>
              <th scope="col" className="px-4 py-3 text-center">D</th>
              <th scope="col" className="px-4 py-3 text-center">L</th>
              <th scope="col" className="px-4 py-3 text-center">Pts</th>
              <th scope="col" className="px-4 py-3">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {standings.map((standing) => (
              <tr key={standing.teamId} className="transition-colors hover:bg-slate-900/70">
                <td className="px-4 py-3 text-center text-sm font-semibold text-sky-200">{standing.rank}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{standing.teamName}</span>
                    {standing.teamLogoUrl ? (
                      <span className="text-xs text-slate-400">{standing.teamLogoUrl}</span>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-slate-100">{standing.played}</td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-emerald-200">{standing.wins}</td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-amber-200">{standing.draws}</td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-rose-200">{standing.losses}</td>
                <td className="px-4 py-3 text-center text-sm font-bold text-sky-200">{standing.points}</td>
                <td className="px-4 py-3">{renderFormIndicator(standing.form)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
