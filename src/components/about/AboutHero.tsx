"use client";

export default function AboutHero() {
  const stats = [
    { icon: "calendar_today", val: "12", suf: "+", lbl: "Years of Excellence" },
    { icon: "group", val: "2M", suf: "+", lbl: "Happy Travellers" },
    { icon: "travel_explore", val: "500", suf: "+", lbl: "Destinations" },
    { icon: "emoji_events", val: "28", suf: "+", lbl: "Industry Awards" },
  ];

  return (
    <section id="hero" style={{ height: "88vh", minHeight: 600, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80" alt="About" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(0,77,94,.97) 0%, rgba(0,77,94,.55) 45%, rgba(0,77,94,.1) 75%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="container" style={{ position: "relative", zIndex: 5, width: "100%" }}>
        <div style={{ padding: "0 0 80px 0", maxWidth: 860 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "var(--cu)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 28, height: 1.5, background: "var(--cu)" }} />
            Who We Are
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(56px, 8vw, 110px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: -3, color: "#fff", marginBottom: 28 }}>
            Crafting <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Journeys</em><br />That Matter
          </h1>
          <p style={{ fontSize: 17, color: "rgba(249,246,240,.65)", lineHeight: 1.72, maxWidth: 560, fontWeight: 400 }}>
            For over 12 years, we&apos;ve been turning travel dreams into reality — one extraordinary journey at a time. We&apos;re not just a tour operator; we&apos;re your partners in exploration.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
            <button className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "var(--cu)", color: "#fff", border: "none", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", boxShadow: "0 8px 28px rgba(245,166,35,.35)", transition: "var(--tr)" }}>
              <span className="material-symbols-rounded">explore</span>Explore Our Story
            </button>
            <button className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 30px", background: "transparent", color: "var(--gn)", border: "1.5px solid var(--line2)", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", transition: "var(--tr)" }}>
              <span className="material-symbols-rounded">group</span>Meet the Team
            </button>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="hero-stats" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 6, borderTop: "1px solid rgba(249,246,240,.1)", display: "flex", flexWrap: "wrap", alignItems: "stretch" }}>
        {stats.map((s, i) => (
          <div key={i} className="hero-stat-item" style={{ flex: 1, padding: "18px 28px", borderRight: "1px solid rgba(249,246,240,.1)", display: "flex", alignItems: "center", gap: 14 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--cu)" }}>{s.icon}</span>
            <div>
              <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.val}<span style={{ color: "var(--cu)" }}>{s.suf}</span></div>
              <div style={{ fontSize: 11, color: "rgba(249,246,240,.45)", letterSpacing: 0.5, marginTop: 3 }}>{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-stats { display: flex !important; flex-wrap: wrap !important; }
          .hero-stat-item { min-width: 50% !important; padding: 12px 16px !important; }
        }
      `}</style>
    </section>
  );
}
