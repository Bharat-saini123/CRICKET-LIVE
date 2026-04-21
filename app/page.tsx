"use client";
import { useEffect, useState, useCallback } from "react";
import { Match } from "@/types/cricket";
import Header from "@/components/Header";
import MatchCard from "@/components/MatchCard";
import Scoreboard from "@/components/Scoreboard";
import StandingsTable from "@/components/StandingsTable";

type Tab = "live" | "upcoming" | "recent" | "standings";

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Match | null>(null);
  const [tab, setTab] = useState<Tab>("upcoming");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch("/api/cricket");
      const data = await res.json();
      if (data.matches) { setMatches(data.matches); setLastUpdated(new Date()); }
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchMatches();
    const t = setInterval(fetchMatches, 30000);
    return () => clearInterval(t);
  }, [fetchMatches]);

  const live     = matches.filter(m => m.matchStarted && !m.matchEnded);
  const upcoming = matches.filter(m => !m.matchStarted && !m.matchEnded);
  const recent   = matches.filter(m => m.matchEnded);

  const tabMatches = tab === "live" ? live : tab === "upcoming" ? upcoming : tab === "recent" ? recent : [];

  const TABS: { key: Tab; label: string; count: number | null }[] = [
    { key: "live",      label: "Live",      count: live.length },
    { key: "upcoming",  label: "Upcoming",  count: upcoming.length },
    { key: "recent",    label: "Recent",    count: recent.length },
    { key: "standings", label: "Standings", count: null },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#060b14" }}>
      <Header liveCount={live.length} onRefresh={fetchMatches} lastUpdated={lastUpdated} />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 40px" }}>

        {/* Hero */}
        <div style={{
          borderRadius: 16, overflow: "hidden", marginBottom: 28,
          background: "linear-gradient(135deg, #0d2040 0%, #091428 60%, #0d1e3a 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "24px 24px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", right: -20, top: -20,
            width: 180, height: 180, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.08), transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>🏏</span>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#f1f5f9", letterSpacing: 0.5 }}>
                Cricket · <span style={{ color: "#22c55e" }}>Live Scores</span>
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
              Real-time match updates · Player stats · Points table
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
              {[
                { icon: "🔴", text: `${live.length} Live Now` },
                { icon: "📅", text: `${upcoming.length} Upcoming` },
                { icon: "✅", text: `${recent.length} Completed` },
                { icon: "📍", text: "India" },
              ].map(({ icon, text }) => (
                <span key={text} style={{
                  fontSize: 11, fontWeight: 600, color: "#9ca3af",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20, padding: "4px 10px",
                }}>{icon} {text}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
          {TABS.map(({ key, label, count }) => {
            const active = tab === key;
            return (
              <button key={key} onClick={() => setTab(key)} style={{
                padding: "8px 16px", borderRadius: 10, cursor: "pointer",
                border: active ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.07)",
                background: active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)",
                color: active ? "#22c55e" : "#6b7280",
                fontWeight: 700, fontSize: 12, whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.15s ease",
              }}>
                {key === "live" && live.length > 0 && !active && (
                  <span style={{ width: 6, height: 6, borderRadius: "50%",
                    background: "#ef4444", display: "inline-block" }} className="live-dot" />
                )}
                {label}
                {count !== null && (
                  <span style={{
                    fontSize: 10, fontWeight: 800, minWidth: 18, height: 18,
                    borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: active ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)",
                    color: active ? "#22c55e" : "#4b5563",
                    padding: "0 5px",
                  }}>{count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {[1,2,3,4].map(i => (
              <div key={i} className="skeleton" style={{ height: 200, borderRadius: 16 }} />
            ))}
          </div>
        ) : tab === "standings" ? (
          <StandingsTable seriesId={matches.find(m => m.series_id)?.series_id || ""} />
        ) : tabMatches.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#374151" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏏</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#4b5563", marginBottom: 6 }}>
              {tab === "live" ? "No live matches right now" : "No matches found"}
            </p>
            <p style={{ fontSize: 12, color: "#374151" }}>Check back soon</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {tabMatches.map((m, i) => (
              <div key={m.id} style={{ animationDelay: `${i * 60}ms` }}>
                <MatchCard match={m} onClick={() => setSelected(m)} />
              </div>
            ))}
          </div>
        )}
      </main>

      {selected && <Scoreboard match={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
