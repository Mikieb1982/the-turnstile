import { NextResponse } from "next/server";
import type { Match, Team } from "@/types";
import { mockMatches } from "@/services/mockData";
import { getServerFirestore } from "@/lib/firebaseAdmin";

type MatchDocument = Partial<Match> & { id?: string };

const DEFAULT_TEAM: Team = { id: "unknown-team", name: "Unknown Team", logoUrl: "" };
const DEFAULT_COMPETITION: Match["competition"] = { id: "unknown-competition", name: "Unknown Competition" };

const mapDocumentToMatch = (doc: MatchDocument): Match => {
  const scores = doc.scores
    ? { home: doc.scores.home ?? 0, away: doc.scores.away ?? 0 }
    : { home: 0, away: 0 };

  const competition = doc.competition
    ? {
        id: doc.competition.id ?? DEFAULT_COMPETITION.id,
        name: doc.competition.name ?? DEFAULT_COMPETITION.name,
      }
    : DEFAULT_COMPETITION;

  const homeTeam = doc.homeTeam
    ? {
        id: doc.homeTeam.id ?? DEFAULT_TEAM.id,
        name: doc.homeTeam.name ?? DEFAULT_TEAM.name,
        logoUrl: doc.homeTeam.logoUrl ?? DEFAULT_TEAM.logoUrl,
      }
    : DEFAULT_TEAM;

  const awayTeam = doc.awayTeam
    ? {
        id: doc.awayTeam.id ?? DEFAULT_TEAM.id,
        name: doc.awayTeam.name ?? DEFAULT_TEAM.name,
        logoUrl: doc.awayTeam.logoUrl ?? DEFAULT_TEAM.logoUrl,
      }
    : DEFAULT_TEAM;

  return {
    id: doc.id ?? "unknown-match",
    competition,
    homeTeam,
    awayTeam,
    status: doc.status ?? "SCHEDULED",
    startTime: doc.startTime ?? "1970-01-01T00:00:00.000Z",
    venue: doc.venue ?? "TBC",
    scores,
    stats: doc.stats,
  };
};

const fetchMatchesFromFirestore = async () => {
  const firestore = getServerFirestore();
  const snapshot = await firestore.collection("matches").get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs
    .map((document) => mapDocumentToMatch({ id: document.id, ...(document.data() as MatchDocument) }))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
};

export async function GET() {
  try {
    const matches = await fetchMatchesFromFirestore();

    if (!matches.length) {
      return NextResponse.json(mockMatches, {
        headers: { "x-data-source": "mock" },
      });
    }

    return NextResponse.json(matches, {
      headers: { "x-data-source": "firestore" },
    });
  } catch (error) {
    console.warn("Falling back to mock matches in API route:", error);

    return NextResponse.json(mockMatches, {
      headers: { "x-data-source": "mock" },
    });
  }
}
