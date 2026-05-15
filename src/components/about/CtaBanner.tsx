"use client";

export default function CtaBanner() {
  return (
    <section id="cta-banner" style={{ position: "relative", padding: "96px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="CTA" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.2) saturate(.5)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,77,94,.96) 0%, rgba(0,122,150,.88) 100%)" }} />

      <div className="container">
        <div className="rv" style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
            Ready to Explore?
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, color: "#fff", marginTop: 14, marginBottom: 20 }}>
            Let&apos;s Create Your<br /><em style={{ fontStyle: "italic", color: "var(--gd)" }}>Next Adventure</em>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(249,246,240,.6)", lineHeight: 1.72, marginBottom: 36 }}>
            From the first search to your last boarding pass — we&apos;re with you at every step. Start planning your dream journey today.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "var(--cu)", color: "#fff", border: "none", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", boxShadow: "0 8px 28px rgba(245,166,35,.35)", transition: "var(--tr)" }}>
              <span className="material-symbols-rounded">flight_takeoff</span>Browse Packages
            </button>
            <button className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 30px", background: "transparent", color: "var(--iv)", border: "1.5px solid rgba(255,255,255,.35)", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", transition: "var(--tr)" }}>
              <span className="material-symbols-rounded">support_agent</span>Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
