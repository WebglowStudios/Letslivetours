"use client";

const features = [
  { step: "01 · Expertise", icon: "verified", title: "Expert-Curated Journeys", desc: "Every itinerary is hand-crafted by destination specialists who've personally experienced these places.", num: "01" },
  { step: "02 · Value", icon: "price_check", title: "Best Price Guarantee", desc: "Found it cheaper elsewhere? We match any price and offer exclusive early-bird member discounts.", num: "02" },
  { step: "03 · Complete", icon: "luggage", title: "All-Inclusive Packages", desc: "Flights, hotels, transfers, sightseeing — bundled seamlessly into one transparent price.", num: "03" },
  { step: "04 · Support", icon: "support_agent", title: "24/7 Concierge Support", desc: "Day or night, our experts are a call away — from changes to upgrades, we've got you covered.", num: "04" },
  { step: "05 · Flexible", icon: "family_restroom", title: "For Every Traveller", desc: "Honeymooners, families, solo explorers, groups — personalised packages for every journey style.", num: "05" },
  { step: "06 · Visa", icon: "travel_explore", title: "Visa Assistance", desc: "End-to-end visa guidance — from documentation to submission — for every destination we cover.", num: "06" },
];

export default function WhyUs() {
  return (
    <section id="why" style={{ padding: "96px 0", background: "var(--iv)" }}>
      <div className="container">
        <div className="rv why-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, position: "relative" }}>
          <div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              Why Travel With Us
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 10 }}>
              We Make <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Every Detail</em> Count
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink3)", marginTop: 10, lineHeight: 1.72, maxWidth: 440 }}>
              From your first search to your last boarding pass — we are with you at every step.
            </p>
          </div>
          <div className="syne" style={{ position: "absolute", top: -30, right: 0, fontSize: 140, fontWeight: 800, color: "rgba(0,77,94,.04)", lineHeight: 1, pointerEvents: "none", letterSpacing: -5 }}>03</div>
        </div>

        <div className="rv why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginTop: 52 }}>
          {features.map((f, i) => (
            <div key={i} className="wp-card" style={{
              padding: "44px 38px", background: "var(--iv)", border: "1px solid var(--line)",
              position: "relative", overflow: "hidden", transition: "var(--tr)", cursor: "default",
            }}>
              <div className="wp-bar" />
              <div className="syne wp-big-num" style={{ position: "absolute", top: 16, right: 22, fontSize: 64, fontWeight: 800, color: "rgba(0,77,94,.04)", lineHeight: 1 }}>{f.num}</div>
              <div className="syne wp-step" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", marginBottom: 18 }}>{f.step}</div>
              <div className="wp-icon" style={{ width: 52, height: 52, borderRadius: 14, background: "var(--gn-gl)", border: "1px solid rgba(0,77,94,.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                <span className="material-symbols-rounded wp-icon-span" style={{ fontSize: 24, color: "var(--gn2)" }}>{f.icon}</span>
              </div>
              <div className="serif wp-title" style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{f.title}</div>
              <div className="wp-desc" style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.72 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .wp-card {
          position: relative;
        }
        .wp-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--cu), var(--gd));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .4s;
        }
        .wp-card:hover::after {
          transform: scaleX(1);
        }
        .wp-card:hover {
          background: var(--gn) !important;
          border-color: var(--gn) !important;
        }
        .wp-card:hover .wp-step {
          color: var(--gd) !important;
        }
        .wp-card:hover .wp-icon {
          background: rgba(249,246,240,.1) !important;
          border-color: rgba(249,246,240,.15) !important;
        }
        .wp-card:hover .wp-icon-span {
          color: var(--iv) !important;
        }
        .wp-card:hover .wp-title {
          color: var(--iv) !important;
        }
        .wp-card:hover .wp-desc {
          color: rgba(249,246,240,.6) !important;
        }
        .wp-card:hover .wp-big-num {
          color: rgba(249,246,240,.04) !important;
        }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-head {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
