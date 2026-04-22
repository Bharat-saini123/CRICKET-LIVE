"use client";
import { useEffect, useState } from "react";
import { StandingTable } from "@/types/cricket";

const COL: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "#4b5563", textAlign: "center" as const };

interface Props {
  seriesId: string;
}

export default function StandingsTable({ seriesId }: Props) {
  const [standings, setStandings] = useState<StandingTable[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!seriesId) return;
    setLoading(true);
    fetch(`/api/standings/${seriesId}`)
      .then(res => res.json())
      .then(data => {
        if (data.standings) {
          setStandings(data.standings);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [seriesId]);

  if (!seriesId) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#374151" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏏</div>
        <p style={{ fontSize: 16, fontWeight: 700, color: "#4b5563", marginBottom: 6 }}>
          No Series Active
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: "#0d1526", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16, overflow: "hidden",
    }}>
      {/* Title */}
      <div style={{
        padding: "14px 18px",
        background: "linear-gradient(135deg, #0f1e38, #0a1428)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 20 }}>🏆</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#f1f5f9" }}>Series Points Table</div>
          <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>Season standings</div>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "40px 20px", textAlign: "center", color: "#6b7280", fontSize: 13, fontWeight: 600 }}>Loading Standings...</div>
      ) : standings.length === 0 ? (
        <div style={{ padding: "40px 20px", textAlign: "center", color: "#6b7280", fontSize: 13, fontWeight: 600 }}>No standings available for this series</div>
      ) : (
        <>
          {/* Column headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "28px 1fr 36px 36px 36px 40px 52px",
            padding: "8px 16px",
            background: "rgba(0,0,0,0.3)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: 4,
          }}>
            <span style={COL}>#</span>
            <span style={{ ...COL, textAlign: "left" }}>TEAM</span>
            <span style={COL}>P</span>
            <span style={COL}>W</span>
            <span style={COL}>L</span>
            <span style={COL}>PTS</span>
            <span style={COL}>NRR</span>
          </div>

          {/* Rows */}
          {[...standings].sort((a, b) => {
            const ptsA = a.points ?? (a.wins * 2);
            const ptsB = b.points ?? (b.wins * 2);
            if (ptsB !== ptsA) return ptsB - ptsA;
            return (b.nrr ?? 0) - (a.nrr ?? 0);
          }).map((row, i) => {
            const qualified = i < 4;
            const pts = row.points ?? (row.wins * 2);
            return (
              <div key={row.teamname} style={{
                display: "grid",
                gridTemplateColumns: "28px 1fr 36px 36px 36px 40px 52px",
                padding: "11px 16px", gap: 4,
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                borderLeft: qualified ? `3px solid #22c55e` : "3px solid transparent",
                background: qualified ? `rgba(34,197,94,0.05)` : "transparent",
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: qualified ? "#22c55e" : "#374151", textAlign: "center" }}>
                  {i + 1}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                    background: row.img ? "#ffffff" : `linear-gradient(135deg, #374151cc, #37415155)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden"
                  }}>
                    {row.img ? (
                       <img src={row.img} alt={row.shortname} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: 8, fontWeight: 800, color: "#fff" }}>{row.shortname?.slice(0,3)}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#d1d5db",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {row.shortname}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>{row.matches}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", textAlign: "center" }}>{row.wins}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", textAlign: "center" }}>{row.loss}</span>
                <span style={{ fontSize: 15, fontWeight: 900, color: "#fbbf24", textAlign: "center" }}>{pts}</span>
                <span style={{ fontSize: 11, fontWeight: 600, textAlign: "center",
                  color: (row.nrr ?? 0) >= 0 ? "#22c55e" : "#ef4444" }}>
                  {row.nrr !== undefined ? `${row.nrr >= 0 ? "+" : ""}${row.nrr.toFixed(3)}` : "-"}
                </span>
              </div>
            );
          })}

          <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 6,
            borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2,
              background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.4)" }} />
            <span style={{ fontSize: 11, color: "#4b5563" }}>Top 4 qualify for playoffs</span>
          </div>
        </>
      )}
    </div>
  );
}

