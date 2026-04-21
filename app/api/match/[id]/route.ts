import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const params = await context.params;
  const id = params.id;
  const apiKey = process.env.CRICKET_API_KEY;

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  try {
    // We fetch match_info and match_scorecard
    const [infoRes, scorecardRes] = await Promise.all([
      fetch(`https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${id}`, { next: { revalidate: 60 } }),
      fetch(`https://api.cricapi.com/v1/match_scorecard?apikey=${apiKey}&id=${id}`, { next: { revalidate: 60 } }),
    ]);

    const [infoData, scorecardData] = await Promise.all([
      infoRes.json(),
      scorecardRes.json()
    ]);

    if (infoData.status !== "success") {
      return NextResponse.json({ error: infoData.reason || "Failed to fetch match info" }, { status: 500 });
    }

    let squads: any[] = [];
    const seriesId = infoData.data?.series_id;
    if (seriesId) {
      // Fetch series squad to get players info since match_squad is not a provided endpoint, but series_squad is.
      const squadRes = await fetch(`https://api.cricapi.com/v1/series_squad?apikey=${apiKey}&id=${seriesId}`, { next: { revalidate: 3600 } });
      const squadData = await squadRes.json();
      if (squadData.status === "success" && squadData.data) {
        // filter squads just for the teams in the match
        const matchTeams = infoData.data.teams || [];
        squads = squadData.data.filter((s: any) => matchTeams.includes(s.teamName));
      }
    }

    return NextResponse.json({
      info: infoData.data,
      scorecard: scorecardData.status === "success" && Array.isArray(scorecardData.data?.scorecard) ? scorecardData.data.scorecard : [],
      squads
    });

  } catch (err) {
    console.error("API Error match details:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
