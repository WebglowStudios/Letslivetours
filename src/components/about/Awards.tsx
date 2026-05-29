"use client";

const awards = [
  { year: "2025", icon: "emoji_events", title: "Best Luxury Tour Operator \u2014 Asia", body: "Recognized for exceptional service, curated itineraries, and customer satisfaction across premium travel segments.", org: "World Travel Awards" },
  { year: "2024", icon: "eco", title: "Sustainable Travel Pioneer", body: "Honored for carbon-offset programs, eco-certified partnerships, and commitment to responsible tourism.", org: "Green Tourism Council" },
  { year: "2023", icon: "star", title: "Customer Choice Award", body: "Voted #1 by travelers for personalized service, transparency, and unforgettable experiences.", org: "TripAdvisor Travelers\u2019 Choice" },
  { year: "2022", icon: "workspace_premium", title: "Excellence in Innovation", body: "Recognized for pioneering 24/7 concierge support and AI-powered itinerary personalization.", org: "Travel Tech Summit" },
  { year: "2021", icon: "favorite", title: "Best Honeymoon Packages", body: "Awarded for creating the most romantic, personalized honeymoon experiences in Bali, Maldives, and Santorini.", org: "Luxury Travel Magazine" },
  { year: "2018", icon: "trending_up", title: "Fastest Growing Tour Operator", body: "Recognized for 300% year-over-year growth and expansion to 15 new destinations.", org: "Global Travel Awards" },
];

export default function Awards() {
  return (
    <section id="awards" style={{ padding: "100px 0", background: "var(--iv2)" }}>
      <div className="container">
        <div className="rv" style={{ marginBottom: 52 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            Recognition
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 12 }}>
            Awards & <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Accolades</em>
          </h2>
        </div>

        <div className="awards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {awards.map((a, i) => (
            <div key={i} className="rv aw-card" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", padding: 36, transition: "var(--tr)", position: "relative", overflow: "hidden" }}>
              {/* Top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--cu), var(--gd))" }} />
              <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--cu)", marginBottom: 14 }}>{a.year}</div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--cu-gl)", border: "1px solid rgba(245,166,35,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 26, color: "var(--cu)" }}>{a.icon}</span>
              </div>
              <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 10, lineHeight: 1.3 }}>{a.title}</div>
              <div style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.68 }}>{a.body}</div>
              <div className="syne" style={{ fontSize: 11, fontWeight: 700, color: "var(--gn2)", marginTop: 14, display: "flex", alignItems: "center", gap: 5 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 13 }}>verified</span>{a.org}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .aw-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--sh-lg);
          border-color: var(--cu) !important;
        }
        @media (max-width: 1100px) {
          .awards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .awards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
