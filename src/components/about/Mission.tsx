"use client";

const pillars = [
  { icon: "explore", title: "Curated Experiences", desc: "Every destination is handpicked, every hotel vetted, every activity designed to immerse you in the local culture." },
  { icon: "eco", title: "Sustainable Travel", desc: "We partner with eco-conscious hotels and support local communities to ensure travel benefits everyone." },
  { icon: "star", title: "Unmatched Quality", desc: "From 5-star accommodations to private transfers, we never compromise on the details that matter." },
];

export default function Mission() {
  return (
    <section id="mission" style={{ position: "relative", padding: "100px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80" alt="Mission" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.18) saturate(.4)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,77,94,.95) 0%, rgba(0,77,94,.8) 100%)" }} />

      <div className="container">
        <div className="mission-grid" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div className="rv-l">
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
              Our Mission
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 700, lineHeight: 1, letterSpacing: -2, color: "#fff", marginTop: 12 }}>
              Redefining <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Travel</em><br />One Journey at a Time
            </h2>
            <p style={{ fontSize: 16, color: "rgba(249,246,240,.6)", lineHeight: 1.78, marginTop: 20, maxWidth: 440 }}>
              We exist to create journeys that go beyond sightseeing — experiences that connect you to cultures, landscapes, and moments that stay with you forever.
            </p>
          </div>

          {/* Right */}
          <div className="rv-r" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {pillars.map((p, i) => (
              <div key={i} className="mp-card" style={{ background: "rgba(249,246,240,.06)", border: "1px solid rgba(249,246,240,.12)", borderRadius: "var(--r)", padding: 28, transition: "var(--tr)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(249,246,240,.08)", border: "1px solid rgba(249,246,240,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--gd)" }}>{p.icon}</span>
                  </div>
                  <div className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{p.title}</div>
                </div>
                <div style={{ fontSize: 13.5, color: "rgba(249,246,240,.55)", lineHeight: 1.68 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mp-card:hover {
          background: rgba(249,246,240,.1) !important;
          border-color: rgba(249,246,240,.22) !important;
          transform: translateX(6px);
        }
        @media (max-width: 1100px) {
          .mission-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .mission-grid { gap: 40px !important; }
          .mp-card { padding: 20px !important; }
        }
      `}</style>
    </section>
  );
}
