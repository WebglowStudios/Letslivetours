"use client";

export default function Highlights() {
  return (
    <section id="highlights" style={{ padding: "80px 0", background: "var(--gn)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: 0 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />Photo Gallery
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>
            Dubai <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Highlights</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.7, maxWidth: 560, margin: "10px auto 0" }}>From golden deserts to glittering skylines \u2014 every frame tells a story.</p>
        </div>

        <div className="rv" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 40 }}>
          {/* Main */}
          <div style={{ gridRow: "span 2", position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden", height: 520 }}>
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80" alt="Burj Khalifa" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.6) 0%, transparent 55%)" }} />
            <div className="syne" style={{ position: "absolute", bottom: 18, left: 18, fontSize: 13, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>location_on</span>Burj Khalifa
            </div>
          </div>
          {/* Right grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80", label: "Desert Safari" },
              { img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80", label: "Dubai Marina" },
              { img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", label: "Palm Jumeirah" },
              { img: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&q=80", label: "Burj Al Arab" },
            ].map((h, i) => (
              <div key={i} style={{ position: "relative", borderRadius: "var(--r)", overflow: "hidden", height: 250 }}>
                <img src={h.img} alt={h.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.6) 0%, transparent 55%)" }} />
                <div className="syne" style={{ position: "absolute", bottom: 18, left: 18, fontSize: 13, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>location_on</span>{h.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
