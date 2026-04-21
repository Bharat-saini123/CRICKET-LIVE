"use client";
import { useState } from "react";
import { Match, TEAM, SQUAD } from "@/types/cricket";

interface Props { match: Match; onClose: () => void; }

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${color}cc, ${color}55)`,
      border: `2px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: 12, color: "#fff",
    }}>{initials}</div>
  );
}

function PlayerRow({ name, role, bat, wkt, sr, color }: {
  name: string; role: string; bat?: number; wkt?: number; sr?: number; color: string;
}) {
  const roleColor = role === "Bowler" ? "#a78bfa" :
    role === "Batsman" ? "#60a5fa" :
    role === "Wicket-keeper" ? "#f59e0b" : "#34d399";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <Avatar name={name} color={color} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#f1f5f9",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        <span style={{
          fontSize: 10, fontWeight: 700, color: roleColor,
          background: `${roleColor}15`, borderRadius: 4, padding: "1px 6px",
          display: "inline-block", marginTop: 2,
        }}>{role.toUpperCase()}</span>
      </div>
      <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
        {bat !== undefined && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fbbf24" }}>{bat}</div>
            <div style={{ fontSize: 9, color: "#4b5563", fontWeight: 600 }}>RUNS</div>
          </div>
        )}
        {wkt !== undefined && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#22c55e" }}>{wkt}</div>
            <div style={{ fontSize: 9, color: "#4b5563", fontWeight: 600 }}>WKTS</div>
          </div>
        )}
        {sr !== undefined && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>{sr}</div>
            <div style={{ fontSize: 9, color: "#4b5563", fontWeight: 600 }}>S/R</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Scoreboard({ match, onClose }: Props) {
  const [tab, setTab] = useState<"info" | "t1" | "t2">("info");
  const [t1, t2] = match.teams;
  const s1 = match.score?.find(s => s.inning.includes(t1));
  const s2 = match.score?.find(s => s.inning.includes(t2));
  const t1info = TEAM[t1]; const t2info = TEAM[t2];
  const squad1 = SQUAD[t1] || []; const squad2 = SQUAD[t2] || [];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      padding: "0",
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: "100%", maxWidth: 640,
        background: "#0d1526", borderRadius: "20px 20px 0 0",
        border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none",
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* Header */}
        <div style={{
          padding: "12px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, marginBottom: 4 }}>
              T20 · IPL 2026
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9" }}>
              {t1info?.short || t1} vs {t2info?.short || t2}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)", border: "none",
            color: "#9ca3af", fontSize: 16, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        {/* Scoreboard banner */}
        <div style={{
          padding: "20px",
          background: "linear-gradient(135deg, #0f1e38, #0a1428)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            {/* Team 1 */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12, margin: "0 auto 8px",
                background: `linear-gradient(135deg, ${t1info?.color || "#333"}cc, ${t1info?.color || "#333"}55)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 14, color: "#fff",
                border: `2px solid ${t1info?.color || "#333"}44`,
              }}>{t1info?.short?.slice(0,3) || t1.slice(0,3)}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{t1info?.short || t1}</div>
              {s1 ? (
                <>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#f1f5f9", lineHeight: 1 }}>
                    {s1.r}<span style={{ fontSize: 18, color: "#6b7280" }}>/{s1.w}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#4b5563", marginTop: 3 }}>{s1.o} overs</div>
                </>
              ) : <div style={{ fontSize: 22, color: "#374151", fontWeight: 700 }}>—</div>}
            </div>

            {/* Middle */}
            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#374151" }}>VS</div>
              {match.matchEnded && (
                <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e",
                  background: "rgba(34,197,94,0.1)", borderRadius: 4, padding: "2px 6px", marginTop: 4 }}>FINAL</div>
              )}
              {match.matchStarted && !match.matchEnded && (
                <div style={{ fontSize: 10, fontWeight: 700, color: "#ef4444",
                  background: "rgba(239,68,68,0.1)", borderRadius: 4, padding: "2px 6px", marginTop: 4 }}
                  className="live-dot">LIVE</div>
              )}
            </div>

            {/* Team 2 */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12, margin: "0 auto 8px",
                background: `linear-gradient(135deg, ${t2info?.color || "#333"}cc, ${t2info?.color || "#333"}55)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 14, color: "#fff",
                border: `2px solid ${t2info?.color || "#333"}44`,
              }}>{t2info?.short?.slice(0,3) || t2.slice(0,3)}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{t2info?.short || t2}</div>
              {s2 ? (
                <>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#f1f5f9", lineHeight: 1 }}>
                    {s2.r}<span style={{ fontSize: 18, color: "#6b7280" }}>/{s2.w}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#4b5563", marginTop: 3 }}>{s2.o} overs</div>
                </>
              ) : <div style={{ fontSize: 22, color: "#374151", fontWeight: 700 }}>—</div>}
            </div>
          </div>

          {match.status && (
            <div style={{
              marginTop: 14, padding: "8px 12px", borderRadius: 8,
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)",
              textAlign: "center", fontSize: 12, color: "#22c55e", fontWeight: 600,
            }}>{match.status}</div>
          )}
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(0,0,0,0.2)",
        }}>
          {[
            { key: "info", label: "Match Info" },
            { key: "t1",   label: `${t1info?.short || t1.slice(0,3)} Squad` },
            { key: "t2",   label: `${t2info?.short || t2.slice(0,3)} Squad` },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key as typeof tab)} style={{
              flex: 1, padding: "12px 4px", border: "none", background: "transparent",
              cursor: "pointer", fontSize: 12, fontWeight: 700,
              color: tab === key ? "#22c55e" : "#4b5563",
              borderBottom: tab === key ? "2px solid #22c55e" : "2px solid transparent",
              transition: "all 0.15s ease",
            }}>{label}</button>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {tab === "info" && (
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📍", label: "Venue", value: match.venue },
                { icon: "📅", label: "Date", value: new Date(match.dateTimeGMT).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                { icon: "🕐", label: "Time", value: new Date(match.dateTimeGMT).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) + " IST" },
                { icon: "🏏", label: "Format", value: `${match.matchType} · IPL 2026` },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{
                  padding: "12px 14px", borderRadius: 10,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, marginBottom: 4 }}>
                    {icon} {label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 13, color: "#d1d5db", fontWeight: 600 }}>{value}</div>
                </div>
              ))}
              {match.matchEnded && match.score && match.score.length >= 2 && (
                <div style={{
                  padding: "12px 14px", borderRadius: 10,
                  background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)",
                }}>
                  <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 600, marginBottom: 8 }}>
                    🏆 SCORECARD
                  </div>
                  {match.score.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "7px 0", borderBottom: i < match.score!.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>
                        {s.inning.replace(" Inning 1", "").replace(" Inning 2", " (2nd)")}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9" }}>
                        {s.r}/{s.w} <span style={{ fontSize: 11, color: "#4b5563", fontWeight: 500 }}>({s.o} ov)</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "t1" && (
            <div style={{ paddingBottom: 16 }}>
              {squad1.length > 0 ? squad1.map((p, i) => (
                <PlayerRow key={i} {...p} color={t1info?.color || "#22c55e"} />
              )) : (
                <div style={{ padding: 32, textAlign: "center", color: "#374151", fontSize: 13 }}>
                  Squad data not available
                </div>
              )}
            </div>
          )}

          {tab === "t2" && (
            <div style={{ paddingBottom: 16 }}>
              {squad2.length > 0 ? squad2.map((p, i) => (
                <PlayerRow key={i} {...p} color={t2info?.color || "#22c55e"} />
              )) : (
                <div style={{ padding: 32, textAlign: "center", color: "#374151", fontSize: 13 }}>
                  Squad data not available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
