import { NextResponse } from "next/server";

const MOCK = [
  {
    id: "m1",
    name: "Sunrisers Hyderabad vs Delhi Capitals",
    matchType: "T20",
    status: "SRH won the toss and elected to bat",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
    date: "2026-04-21",
    dateTimeGMT: "2026-04-21T14:00:00",
    teams: ["Sunrisers Hyderabad", "Delhi Capitals"],
    score: [],
    matchStarted: false,
    matchEnded: false,
  },
  {
    id: "m2",
    name: "Punjab Kings vs Kolkata Knight Riders",
    matchType: "T20",
    status: "Punjab Kings won by 54 runs",
    venue: "IS Bindra Stadium, Mohali",
    date: "2026-04-19",
    dateTimeGMT: "2026-04-19T14:00:00",
    teams: ["Punjab Kings", "Kolkata Knight Riders"],
    score: [
      { r: 254, w: 7, o: 20.0, inning: "Punjab Kings Inning 1" },
      { r: 200, w: 10, o: 18.3, inning: "Kolkata Knight Riders Inning 1" },
    ],
    matchStarted: true,
    matchEnded: true,
  },
  {
    id: "m3",
    name: "Mumbai Indians vs Rajasthan Royals",
    matchType: "T20",
    status: "Mumbai Indians won by 99 runs",
    venue: "Wankhede Stadium, Mumbai",
    date: "2026-04-20",
    dateTimeGMT: "2026-04-20T14:00:00",
    teams: ["Mumbai Indians", "Rajasthan Royals"],
    score: [
      { r: 199, w: 5, o: 20.0, inning: "Mumbai Indians Inning 1" },
      { r: 100, w: 10, o: 15.4, inning: "Rajasthan Royals Inning 1" },
    ],
    matchStarted: true,
    matchEnded: true,
  },
  {
    id: "m4",
    name: "Royal Challengers Bangalore vs Chennai Super Kings",
    matchType: "T20",
    status: "Match starts at 7:30 PM IST",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: "2026-04-22",
    dateTimeGMT: "2026-04-22T14:00:00",
    teams: ["Royal Challengers Bangalore", "Chennai Super Kings"],
    score: [],
    matchStarted: false,
    matchEnded: false,
  },
  {
    id: "m5",
    name: "Kolkata Knight Riders vs Gujarat Titans",
    matchType: "T20",
    status: "KKR won by 4 wickets",
    venue: "Eden Gardens, Kolkata",
    date: "2026-04-19",
    dateTimeGMT: "2026-04-19T10:00:00",
    teams: ["Kolkata Knight Riders", "Gujarat Titans"],
    score: [
      { r: 155, w: 9, o: 20.0, inning: "Gujarat Titans Inning 1" },
      { r: 161, w: 6, o: 19.2, inning: "Kolkata Knight Riders Inning 1" },
    ],
    matchStarted: true,
    matchEnded: true,
  },
  {
    id: "m6",
    name: "Rajasthan Royals vs Lucknow Super Giants",
    matchType: "T20",
    status: "Match starts at 7:30 PM IST",
    venue: "Sawai Mansingh Stadium, Jaipur",
    date: "2026-04-23",
    dateTimeGMT: "2026-04-23T14:00:00",
    teams: ["Rajasthan Royals", "Lucknow Super Giants"],
    score: [],
    matchStarted: false,
    matchEnded: false,
  },
];

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
  } catch { }
  return NextResponse.json({ matches: MOCK, source: "mock" });
}
