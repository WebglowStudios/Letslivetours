"use client";

export default function CareersHero() {
  const stats = [
    { val: "200+", lbl: "Team Members" },
    { val: "14", lbl: "Cities" },
    { val: "4.8★", lbl: "Glassdoor Rating" },
    { val: "32+", lbl: "Open Roles" },
  ];

  return (
    <section id="hero" style={{ height: "88vh", minHeight: 600, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80" alt="Team at LetsLive Tours" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.5)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(0,20,28,.97) 0%, rgba(0,77,94,.55) 45%, rgba(0,77,94,.1) 75%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="container" style={{ position: "relative", zIndex: 5, width: "100%" }}>
        <div style={{ padding: "0 0 80px 0", maxWidth: 860 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "var(--cu)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 28, height: 1.5, background: "var(--cu)" }} />
            We&apos;re Hiring
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(52px, 7.5vw, 100px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: -3, color: "#fff", marginBottom: 28 }}>
            Build a Career<br />You <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Love</em>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(249,246,240,.65)", lineHeight: 1.72, maxWidth: 560, fontWeight: 400, marginBottom: 36 }}>
            Join a team of passionate travellers, storytellers, and dreamers who are redefining how India experiences the world. Every role here is a journey.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#open-roles" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "var(--cu)", color: "#fff", border: "none", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", boxShadow: "0 8px 28px rgba(245,166,35,.35)", transition: "var(--tr)", textDecoration: "none" }}>
              <span className="material-symbols-rounded">work</span>View Open Roles
            </a>
            <a href="#why-join" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 30px", background: "transparent", color: "rgba(249,246,240,.8)", border: "1.5px solid rgba(249,246,240,.25)", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", transition: "var(--tr)", textDecoration: "none" }}>
              <span className="material-symbols-rounded">info</span>Why LetsLive?
            </a>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 52, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,.1)" }}>
            {stats.map((s, i) => (
              <div key={i}>
                <div className="serif" style={{ fontSize: 32, fontWeight: 700, color: "var(--cu-l)", lineHeight: 1 }}>{s.val}</div>
                <div className="syne" style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginTop: 5 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
