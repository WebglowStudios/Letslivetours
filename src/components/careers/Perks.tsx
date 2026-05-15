"use client";

export default function Perks() {
  const perks = [
    { icon: "flight", title: "Annual Travel Allowance", text: "\u20B950,000/year to travel anywhere we operate. Because you should know what you\u2019re selling." },
    { icon: "health_and_safety", title: "Health Insurance", text: "Comprehensive medical cover for you and your family. Dental and vision included." },
    { icon: "laptop_mac", title: "Work From Anywhere", text: "Hybrid and remote options for most roles. MacBook or equivalent provided on day one." },
    { icon: "menu_book", title: "Learning Budget", text: "\u20B930,000/year for courses, books, conferences, or certifications of your choice." },
    { icon: "savings", title: "Competitive Pay", text: "Market-leading salaries with performance bonuses and ESOPs for senior roles." },
    { icon: "child_care", title: "Parental Leave", text: "26 weeks maternity and 4 weeks paternity leave \u2014 fully paid, no questions asked." },
    { icon: "self_improvement", title: "Wellness Allowance", text: "\u20B912,000/year for gym, yoga, therapy, or any wellness activity that keeps you at your best." },
    { icon: "celebration", title: "Team Events", text: "Quarterly team offsites, monthly celebrations, and an annual company-wide retreat." },
  ];

  return (
    <section id="perks" style={{ padding: "96px 0", background: "var(--iv2)" }}>
      <div className="container">
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            Benefits
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "var(--ink)", margin: "14px 0 10px", lineHeight: 1.2 }}>
            Perks That <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Actually Matter</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
            We&apos;ve designed our benefits around what our team actually asked for — not what looks good on a careers page.
          </p>
        </div>
        <div className="perks-grid">
          {perks.map((perk, i) => (
            <div key={i} className="perk-card rv">
              <div className="perk-icon">
                <span className="material-symbols-rounded">{perk.icon}</span>
              </div>
              <div className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>{perk.title}</div>
              <p style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.65 }}>{perk.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perks-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 52px;
        }
        .perk-card {
          background: #fff;
          border-radius: var(--r-xl);
          padding: 32px 24px;
          text-align: center;
          border: 1.5px solid var(--line);
          transition: var(--tr);
        }
        .perk-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--sh-lg);
          border-color: transparent;
        }
        .perk-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--gn-gl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          transition: var(--tr);
        }
        .perk-card:hover .perk-icon {
          background: var(--cu);
          box-shadow: 0 8px 24px rgba(245,166,35,.3);
        }
        .perk-icon span {
          font-size: 26px;
          color: var(--gn);
          transition: var(--tr);
        }
        .perk-card:hover .perk-icon span {
          color: #fff;
        }
        @media (max-width: 900px) {
          .perks-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .perks-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
