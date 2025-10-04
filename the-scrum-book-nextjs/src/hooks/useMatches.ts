"use client";

import { useQuery } from "@tanstack/react-query";
import type { Match } from "../types";

const fetchMatches = async (): Promise<Match[]> => {
  const response = await fetch("/api/matches", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  const data: Match[] = await response.json();
  return data;
};

export const matchesQueryKey = ["matches"] as const;

export function useMatches() {
  return useQuery({
    queryKey: matchesQueryKey,
    queryFn: fetchMatches,
  });
}
