"use client";

export default function Story() {
  return (
    <section id="story" style={{ padding: "100px 0", background: "var(--iv)" }}>
      <div className="container">
        <div className="rv story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Image side */}
          <div className="rv-l story-img-side" style={{ position: "relative", paddingBottom: 32, paddingRight: 32 }}>
            {/* Badge */}
            <div style={{ position: "absolute", top: 28, left: -28, background: "var(--cu)", color: "#fff", borderRadius: "var(--r)", padding: "18px 22px", textAlign: "center", boxShadow: "0 12px 36px rgba(245,166,35,.4)", zIndex: 2 }}>
              <span className="serif" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1, display: "block" }}>2014</span>
              <span className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85, marginTop: 3, display: "block" }}>Founded</span>
            </div>
            {/* Main image */}
            <div className="story-main-img" style={{ borderRadius: "var(--r-xl)", overflow: "hidden", height: 560 }}>
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" alt="Story" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Float image */}
            <div className="story-float" style={{ position: "absolute", bottom: 0, right: 0, width: 220, height: 160, borderRadius: "var(--r)", overflow: "hidden", border: "6px solid var(--iv)", boxShadow: "var(--sh-lg)" }}>
              <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          {/* Text side */}
          <div className="rv-r">
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              Our Story
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: -1, marginTop: 12, marginBottom: 22 }}>
              From a <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Dream</em> to<br />Your Journey
            </h2>
            <p style={{ fontSize: 15.5, color: "var(--ink3)", lineHeight: 1.78, marginBottom: 18 }}>
              LetsLive Tours was born from a simple belief: travel should be more than ticking boxes on a checklist. It should be transformative, personal, and unforgettable.
            </p>
            <p style={{ fontSize: 15.5, color: "var(--ink3)", lineHeight: 1.78, marginBottom: 18 }}>
              What started as a small team of passionate travelers in 2014 has grown into a trusted name in premium travel experiences. We&apos;ve helped over 2 million travelers discover the world — not as tourists, but as explorers.
            </p>

            {/* Values */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
              {[
                { icon: "favorite", title: "Passion-Driven", desc: "Every itinerary is crafted by destination experts who\u2019ve lived the experience." },
                { icon: "verified", title: "Trust & Transparency", desc: "No hidden fees, no surprises \u2014 just honest, upfront pricing and service." },
                { icon: "support_agent", title: "24/7 Support", desc: "From booking to boarding and beyond, we\u2019re always here for you." },
              ].map((v, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--gn-gl)", border: "1px solid rgba(0,77,94,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--gn2)" }}>{v.icon}</span>
                  </div>
                  <div>
                    <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>{v.title}</div>
                    <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.6 }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .story-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .story-grid { gap: 40px !important; }
          .story-float { display: none !important; }
          .story-main-img { height: 350px !important; }
        }
      `}</style>
    </section>
  );
}
