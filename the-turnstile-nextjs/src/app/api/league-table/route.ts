import { NextResponse } from "next/server";
import type { LeagueStanding } from "@/types";
import { mockLeagueTable } from "@/services/mockData";
import { getServerFirestore } from "@/lib/firebaseAdmin";

type LeagueStandingDocument = Partial<LeagueStanding> & { id?: string };

const mapDocumentToStanding = (doc: LeagueStandingDocument): LeagueStanding => ({
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

const fetchLeagueTableFromFirestore = async () => {
  const firestore = getServerFirestore();
  const snapshot = await firestore.collection("leagueTable").orderBy("rank").get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs
    .map((document) => mapDocumentToStanding({ id: document.id, ...(document.data() as LeagueStandingDocument) }))
    .sort((a, b) => a.rank - b.rank);
};

export async function GET() {
  try {
    const standings = await fetchLeagueTableFromFirestore();

    if (!standings.length) {
      return NextResponse.json(mockLeagueTable, {
        headers: { "x-data-source": "mock" },
      });
    }

    return NextResponse.json(standings, {
      headers: { "x-data-source": "firestore" },
    });
  } catch (error) {
    console.warn("Falling back to mock league table in API route:", error);

    return NextResponse.json(mockLeagueTable, {
      headers: { "x-data-source": "mock" },
    });
  }
}
