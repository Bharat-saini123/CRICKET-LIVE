import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.CRICKET_API_KEY;
    const res = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`,
      { next: { revalidate: 30 } }
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data, "data");
      if (data.status === "success" && data.data?.length) {
        return NextResponse.json({ matches: data.data, source: "live" });
      }
    }
  } catch (err) {
    console.error("API error", err);
  }
  return NextResponse.json({ matches: [], source: "error" });
}
