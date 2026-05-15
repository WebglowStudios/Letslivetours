"use client";

export default function WhyJoin() {
  const cards = [
    { icon: "flight_takeoff", title: "Travel the World", text: "Every employee gets an annual travel allowance to explore destinations we sell. We believe you can\u2019t sell what you haven\u2019t experienced." },
    { icon: "trending_up", title: "Rapid Growth", text: "We\u2019ve grown 3x in 3 years. That means real opportunities to move fast, take ownership, and grow your career at a pace that matches your ambition." },
    { icon: "diversity_3", title: "Inclusive Culture", text: "A team from 14 cities, multiple backgrounds, and one shared passion. We celebrate differences and build a space where everyone belongs." },
    { icon: "school", title: "Learning First", text: "\u20B930,000 annual learning budget per employee. Courses, conferences, certifications \u2014 we invest in your growth because your growth is our growth." },
    { icon: "home_work", title: "Flexible Work", text: "Hybrid and remote-first roles across most departments. We care about outcomes, not where you sit. Work from home, a caf\u00E9, or a beach in Goa." },
    { icon: "favorite", title: "Real Impact", text: "Your work directly shapes the travel experiences of 12,000+ customers a year. Every feature you build, every itinerary you craft \u2014 it matters." },
  ];

  return (
    <section id="why-join" style={{ padding: "96px 0", background: "var(--iv)" }}>
      <div className="container">
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            Why LetsLive
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "var(--ink)", margin: "14px 0 10px", lineHeight: 1.2 }}>
            More Than a Job — <em style={{ fontStyle: "italic", color: "var(--gd)" }}>A Mission</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
            We&apos;re not just selling holidays. We&apos;re building a company that believes travel changes lives — and we want people who believe that too.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 56 }}>
          {cards.map((card, i) => (
            <div key={i} className="wj-card rv">
              <div className="wj-icon">
                <span className="material-symbols-rounded">{card.icon}</span>
              </div>
              <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>{card.title}</div>
              <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.75 }}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .wj-card {
          background: #fff;
          border-radius: var(--r-xl);
          padding: 40px 32px;
          border: 1.5px solid var(--line);
          transition: var(--tr);
          position: relative;
          overflow: hidden;
        }
        .wj-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--cu), var(--gd));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .4s ease;
        }
        .wj-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--sh-lg);
          border-color: transparent;
        }
        .wj-card:hover::before {
          transform: scaleX(1);
        }
        .wj-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: var(--gn-gl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          transition: var(--tr);
        }
        .wj-card:hover .wj-icon {
          background: var(--gn);
        }
        .wj-icon span {
          font-size: 28px;
          color: var(--gn);
          transition: var(--tr);
        }
        .wj-card:hover .wj-icon span {
          color: #fff;
        }
        @media (max-width: 900px) {
          .wj-card {
            padding: 32px 24px;
          }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
