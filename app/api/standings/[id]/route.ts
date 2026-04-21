import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const params = await context.params;
  const id = params.id;
  const apiKey = process.env.CRICKET_API_KEY;

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.cricapi.com/v1/series_points?apikey=${apiKey}&id=${id}`, {
      next: { revalidate: 300 }
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        return NextResponse.json({ standings: data.data });
      }
      return NextResponse.json({ error: data.reason || "Failed to fetch standings", standings: [] }, { status: 500 });
    }
  } catch (err) {
    console.error("API error", err);
  }
  return NextResponse.json({ standings: [] }, { status: 500 });
}
