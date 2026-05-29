"use client";

const nums = [
  { n: "2M", suf: "+", label: "Happy Travelers", desc: "Across 6 continents" },
  { n: "500", suf: "+", label: "Destinations", desc: "Handpicked & curated" },
  { n: "98", suf: "%", label: "Satisfaction Rate", desc: "Based on 50K+ reviews" },
  { n: "28", suf: "+", label: "Industry Awards", desc: "Since 2014" },
];

export default function Numbers() {
  return (
    <section id="numbers" style={{ padding: "80px 0", background: "var(--iv)", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <div className="num-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {nums.map((n, i) => (
            <div key={i} className="rv ng-card" style={{ padding: "48px 36px", background: "var(--iv)", border: "1px solid var(--line)", textAlign: "center", position: "relative", overflow: "hidden", transition: "var(--tr)" }}>
              <div className="serif ng-n" style={{ fontSize: "clamp(44px, 5vw, 64px)", fontWeight: 700, color: "var(--gn)", lineHeight: 1, transition: "color .3s" }}>
                {n.n}<span style={{ color: "var(--cu)" }}>{n.suf}</span>
              </div>
              <div className="syne ng-l" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--ink3)", marginTop: 8, transition: "color .3s" }}>{n.label}</div>
              <div className="ng-desc" style={{ fontSize: 13, color: "var(--ink4)", marginTop: 6, lineHeight: 1.5, transition: "color .3s" }}>{n.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ng-card::after {
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
        .ng-card:hover::after {
          transform: scaleX(1);
        }
        .ng-card:hover {
          background: var(--gn) !important;
          border-color: var(--gn) !important;
        }
        .ng-card:hover .ng-n {
          color: var(--iv) !important;
        }
        .ng-card:hover .ng-l {
          color: rgba(249,246,240,.55) !important;
        }
        .ng-card:hover .ng-desc {
          color: rgba(249,246,240,.4) !important;
        }
        @media (max-width: 1100px) {
          .num-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .num-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
