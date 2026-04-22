import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.CRICKET_API_KEY;
    
    const [currentRes, matchesRes] = await Promise.all([
      fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`, { next: { revalidate: 30 } }),
      fetch(`https://api.cricapi.com/v1/matches?apikey=${apiKey}&offset=0`, { next: { revalidate: 300 } })
    ]);

    let mergedMatches: any[] = [];
    const seenIds = new Set();

    if (currentRes.ok) {
      const currentData = await currentRes.json();
      if (currentData.status === "success" && currentData.data?.length) {
        mergedMatches = [...currentData.data];
        currentData.data.forEach((m: any) => seenIds.add(m.id));
      }
    }

    if (matchesRes.ok) {
      const matchesData = await matchesRes.json();
      if (matchesData.status === "success" && matchesData.data?.length) {
        // add upcoming matches from the general matches endpoint
        const upcomingMatches = matchesData.data.filter(
          (m: any) => !m.matchStarted && !m.matchEnded && !seenIds.has(m.id)
        );
        mergedMatches = [...mergedMatches, ...upcomingMatches];
      }
    }

    if (mergedMatches.length > 0) {
      return NextResponse.json({ matches: mergedMatches, source: "live_and_upcoming" });
    }
  } catch (err) {
    console.error("API error", err);
  }
  return NextResponse.json({ matches: [], source: "error" });
}
