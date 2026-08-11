"use client";

export default function Numbers({ data }: { data?: any }) {
  const nums = [
    { n: data?.years || "3", suf: "+", label: "Years Active", desc: "Crafted with care" },
    { n: data?.travelers || "1200", suf: "+", label: "Happy Travelers", desc: "Across the globe" },
    { n: data?.destinations || "45", suf: "+", label: "Destinations", desc: "And counting" },
    { n: data?.partners || "150", suf: "+", label: "Travel Partners", desc: "Trusted network" },
  ];

  return (
    <section style={{ padding: "80px 0", background: "var(--gn)" }}>
      <div className="container">
        <div className="num-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {nums.map((n, i) => (
            <div key={i} className="rv ng-card" style={{ padding: "48px 32px", textAlign: "center", position: "relative", borderRight: i < 3 ? "1px solid rgba(249,246,240,.1)" : "none" }}>
              <div className="serif" style={{ fontSize: "clamp(40px, 5vw, 58px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                {n.n}<span style={{ color: "var(--cu)" }}>{n.suf}</span>
              </div>
              <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(249,246,240,.55)", marginTop: 10 }}>{n.label}</div>
              <div style={{ fontSize: 13, color: "rgba(249,246,240,.35)", marginTop: 5 }}>{n.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .num-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ng-card { border-right: none !important; border-bottom: 1px solid rgba(249,246,240,.1); }
        }
        @media (max-width: 768px) {
          .num-grid { grid-template-columns: 1fr !important; }
          .ng-card { padding: 32px 20px !important; }
        }
      `}</style>
    </section>
  );
}
