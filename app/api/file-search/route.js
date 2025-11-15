import { NextResponse } from "next/server";
import { fileSearch } from "../../../ai/devops-agent";
import { run } from "genkit";

export async function POST(req) {
  const { query, files } = await req.json();
  const result = await run(fileSearch, { input: { query, files } });
  return NextResponse.json(result);
}
