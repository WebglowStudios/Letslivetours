"use client";

const differentiators = [
  { icon: "person_pin", title: "Traveler-First Approach", desc: "Every itinerary is designed with a \"What if I were the traveler?\" mindset." },
  { icon: "tune", title: "Personalized Experiences", desc: "We create travel solutions based on individual preferences and requirements — no cookie-cutter trips." },
  { icon: "all_inclusive", title: "Seamless Planning", desc: "From visas and flights to accommodations and activities, we manage every aspect of the journey." },
  { icon: "handshake", title: "Trusted Network", desc: "We collaborate with 200+ travel partners worldwide to ensure quality, reliability, and smooth experiences." },
  { icon: "payments", title: "Value for Money", desc: "Our focus is on delivering meaningful experiences while maximizing value for every traveler." },
];

export default function Mission() {
  return (
    <section style={{ padding: "100px 0", background: "var(--iv2)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv" style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            What Makes Us Different
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: -1, marginTop: 12 }}>
            Why Travelers <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Choose Us</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", marginTop: 12, lineHeight: 1.72, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            We eliminate industry clutter and create a platform where every traveler can confidently discover, plan, and experience their perfect journey.
          </p>
        </div>

        {/* Cards */}
        <div className="diff-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {differentiators.map((d, i) => (
            <div key={i} className="rv diff-card" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", padding: "36px 30px", transition: "var(--tr)", position: "relative", overflow: "hidden" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--gn-gl)", border: "1px solid rgba(0,77,94,.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 24, color: "var(--gn2)" }}>{d.icon}</span>
              </div>
              <div className="syne" style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>{d.title}</div>
              <div style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.7 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .diff-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--sh-lg);
          border-color: var(--gn3) !important;
        }
        @media (max-width: 1100px) {
          .diff-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .diff-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
