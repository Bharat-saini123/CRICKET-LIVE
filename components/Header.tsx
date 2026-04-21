"use client";
interface Props { liveCount: number; onRefresh: () => void; lastUpdated: Date | null; }

export default function Header({ liveCount, onRefresh, lastUpdated }: Props) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(6,11,20,0.92)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🏏</div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: 1, color: "#fff" }}>
            Cricket<span style={{ color: "#22c55e" }}>Live</span>
          </span>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {liveCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 5,
              background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 20, padding: "3px 10px" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%",
                background: "#ef4444", display: "inline-block" }} className="live-dot" />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#ef4444" }}>{liveCount} LIVE</span>
            </div>
          )}
          {lastUpdated && (
            <span style={{ fontSize: 11, color: "#4b5563", display: "none" }}
              className="sm-show">
              {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button onClick={onRefresh} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, padding: "6px 12px", color: "#9ca3af",
            fontSize: 12, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <span>↻</span> Refresh
          </button>
        </div>
      </div>
    </header>
  );
}
