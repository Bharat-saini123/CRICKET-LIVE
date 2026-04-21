"use client";
import { TEAM } from "@/types/cricket";

const ROWS = [
  { team: "Punjab Kings",                 p:10, w:8, l:2, pts:16, nrr:+1.245 },
  { team: "Mumbai Indians",               p:10, w:7, l:3, pts:14, nrr:+0.876 },
  { team: "Sunrisers Hyderabad",          p:10, w:6, l:4, pts:12, nrr:+0.534 },
  { team: "Kolkata Knight Riders",        p:10, w:6, l:4, pts:12, nrr:+0.412 },
  { team: "Royal Challengers Bangalore",  p:10, w:5, l:5, pts:10, nrr:+0.187 },
  { team: "Rajasthan Royals",             p:10, w:5, l:5, pts:10, nrr:-0.098 },
  { team: "Chennai Super Kings",          p:10, w:4, l:6, pts: 8, nrr:-0.321 },
  { team: "Delhi Capitals",               p:10, w:3, l:7, pts: 6, nrr:-0.654 },
  { team: "Gujarat Titans",               p:10, w:2, l:8, pts: 4, nrr:-0.987 },
  { team: "Lucknow Super Giants",         p:10, w:1, l:9, pts: 2, nrr:-1.245 },
];

const COL: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "#4b5563", textAlign: "center" as const };

export default function StandingsTable() {
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
          <div style={{ fontWeight: 800, fontSize: 15, color: "#f1f5f9" }}>IPL 2026 Points Table</div>
          <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>Season standings</div>
        </div>
      </div>

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
      {ROWS.map((row, i) => {
        const t = TEAM[row.team];
        const color = t?.color || "#374151";
        const qualified = i < 4;
        return (
          <div key={row.team} style={{
            display: "grid",
            gridTemplateColumns: "28px 1fr 36px 36px 36px 40px 52px",
            padding: "11px 16px", gap: 4,
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            borderLeft: qualified ? `3px solid ${color}` : "3px solid transparent",
            background: qualified ? `${color}08` : "transparent",
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: qualified ? "#22c55e" : "#374151", textAlign: "center" }}>
              {i + 1}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                background: `linear-gradient(135deg, ${color}cc, ${color}55)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 8, fontWeight: 800, color: "#fff",
              }}>{t?.short?.slice(0,3) || row.team.slice(0,3)}</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#d1d5db",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {t?.short || row.team.slice(0,8)}
              </span>
            </div>
            <span style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>{row.p}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", textAlign: "center" }}>{row.w}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", textAlign: "center" }}>{row.l}</span>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#fbbf24", textAlign: "center" }}>{row.pts}</span>
            <span style={{ fontSize: 11, fontWeight: 600, textAlign: "center",
              color: row.nrr >= 0 ? "#22c55e" : "#ef4444" }}>
              {row.nrr >= 0 ? "+" : ""}{row.nrr.toFixed(3)}
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
    </div>
  );
}
