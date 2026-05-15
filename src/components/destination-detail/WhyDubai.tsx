"use client";

const cards = [
  { icon: "wb_sunny", title: "Best Time to Visit", text: "October to April is ideal \u2014 pleasant temperatures between 20\u201330\u00B0C. Avoid June\u2013August when temperatures soar above 40\u00B0C." },
  { icon: "badge", title: "Visa Information", text: "Indian passport holders get a visa on arrival for 14 days. Tourist visas (30/90 days) are available. We handle all visa paperwork for you." },
  { icon: "currency_exchange", title: "Currency & Budget", text: "UAE Dirham (AED). 1 AED \u2248 \u20B922.5. Dubai suits all budgets \u2014 from budget stays to ultra-luxury. Cards are widely accepted everywhere." },
  { icon: "translate", title: "Language & Culture", text: "Arabic is official but English is widely spoken. Dress modestly in public areas. Alcohol is available in licensed venues. Very safe for tourists." },
];

export default function WhyDubai() {
  return (
    <section id="why-dubai" style={{ padding: "80px 0", background: "var(--iv2)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />Know Before You Go
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 10 }}>
            Why <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Dubai?</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", lineHeight: 1.7, maxWidth: 560, margin: "10px auto 0" }}>Everything you need to know before your Dubai adventure.</p>
        </div>

        <div className="wd-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 48 }}>
          {cards.map((c, i) => (
            <div key={i} className="rv wd-card-item" style={{ background: "#fff", borderRadius: "var(--r-xl)", padding: "36px 28px", textAlign: "center", boxShadow: "var(--sh)", transition: "var(--tr)", border: "1.5px solid transparent" }}>
              <div className="wd-icon-wrap" style={{ width: 64, height: 64, borderRadius: 18, background: "var(--gn-gl)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", transition: "var(--tr)" }}>
                <span className="material-symbols-rounded wd-icon-span" style={{ fontSize: 30, color: "var(--gn)", transition: "var(--tr)" }}>{c.icon}</span>
              </div>
              <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>{c.title}</div>
              <p style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.65 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .wd-card-item:hover { transform: translateY(-6px); box-shadow: var(--sh-lg); border-color: var(--iv3) !important; }
        .wd-card-item:hover .wd-icon-wrap { background: var(--gn) !important; }
        .wd-card-item:hover .wd-icon-span { color: #fff !important; }
        @media (max-width: 1100px) { .wd-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .wd-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
