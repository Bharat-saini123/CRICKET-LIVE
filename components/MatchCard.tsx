"use client";
import { Match, TEAM } from "@/types/cricket";

function TeamBadge({ name, size = 44 }: { name: string; size?: number }) {
  const t = TEAM[name];
  const color = t?.color || "#374151";
  const short = t?.short || name.slice(0, 3).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 10, flexShrink: 0,
      background: `linear-gradient(145deg, ${color}cc, ${color}66)`,
      border: `1.5px solid ${color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, color: "#fff", fontSize: size * 0.27, letterSpacing: 0.5,
      boxShadow: `0 4px 12px ${color}33`,
    }}>{short.slice(0, 3)}</div>
  );
}

interface Props { match: Match; onClick: () => void; }

export default function MatchCard({ match, onClick }: Props) {
  const [t1, t2] = match.teams;
  const s1 = match.score?.find(s => s.inning.includes(t1));
  const s2 = match.score?.find(s => s.inning.includes(t2));
  const isLive = match.matchStarted && !match.matchEnded;
  const isDone = match.matchEnded;

  const borderColor = isLive ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.07)";

  return (
    <div onClick={onClick} className="animate-fade-in-up" style={{
      background: "linear-gradient(145deg, #0d1526, #0a1020)",
      border: `1px solid ${borderColor}`,
      borderRadius: 16, overflow: "hidden", cursor: "pointer",
      transition: "transform 0.18s ease, box-shadow 0.18s ease",
      boxShadow: isLive ? "0 0 24px rgba(34,197,94,0.08)" : "none",
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      (e.currentTarget as HTMLDivElement).style.boxShadow = isLive ? "0 0 24px rgba(34,197,94,0.08)" : "none";
    }}>

      {/* Top strip */}
      <div style={{
        padding: "10px 16px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>🏆</span>
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>T20 · IPL 2026</span>
        </div>
        {isLive ? (
          <span style={{ display: "flex", alignItems: "center", gap: 4,
            fontSize: 10, fontWeight: 800, color: "#ef4444",
            background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 20, padding: "2px 8px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444",
              display: "inline-block" }} className="live-dot" />
            LIVE
          </span>
        ) : isDone ? (
          <span style={{ fontSize: 10, fontWeight: 700, color: "#6b7280",
            background: "rgba(107,114,128,0.12)", borderRadius: 20, padding: "2px 8px" }}>FINAL</span>
        ) : (
          <span style={{ fontSize: 10, fontWeight: 700, color: "#60a5fa",
            background: "rgba(96,165,250,0.1)", borderRadius: 20, padding: "2px 8px" }}>UPCOMING</span>
        )}
      </div>

      {/* Teams + Scores */}
      <div style={{ padding: "16px" }}>
        {/* Team 1 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <TeamBadge name={t1} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9" }}>
                {TEAM[t1]?.short || t1}
              </div>
              <div style={{ fontSize: 11, color: "#4b5563", marginTop: 1 }}>{TEAM[t1]?.city || t1}</div>
            </div>
          </div>
          {s1 ? (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>
                {s1.r}<span style={{ color: "#6b7280", fontWeight: 600 }}>/{s1.w}</span>
              </div>
              <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>{s1.o} overs</div>
            </div>
          ) : (
            <span style={{ fontSize: 12, color: "#374151" }}>— —</span>
          )}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>VS</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
        </div>

        {/* Team 2 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <TeamBadge name={t2} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9" }}>
                {TEAM[t2]?.short || t2}
              </div>
              <div style={{ fontSize: 11, color: "#4b5563", marginTop: 1 }}>{TEAM[t2]?.city || t2}</div>
            </div>
          </div>
          {s2 ? (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>
                {s2.r}<span style={{ color: "#6b7280", fontWeight: 600 }}>/{s2.w}</span>
              </div>
              <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>{s2.o} overs</div>
            </div>
          ) : (
            <span style={{ fontSize: 12, color: "#374151" }}>— —</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ fontSize: 11, color: isDone ? "#22c55e" : "#6b7280",
          fontWeight: isDone ? 600 : 400, flex: 1, marginRight: 8,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {isDone
            ? match.status
            : `📍 ${match.venue?.split(",")[0]}`}
        </div>
        <span style={{ fontSize: 13, color: "#374151" }}>›</span>
      </div>
    </div>
  );
}
