"use client";

const visas = [
  { name: "Thailand", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", badge: "Visa Free", icon: "check_circle", info: "30-day stamp on arrival · Packages from ₹39,999", main: true },
  { name: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", badge: "Visa on Arrival", icon: "check_circle", info: "30-day free stamp · From ₹69,999", main: false },
  { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", badge: "Visa Free", icon: "check_circle", info: "30-day free entry · From ₹44,999", main: false },
  { name: "Santorini", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", badge: "Visa on Apply", icon: "info", info: "Schengen visa · From ₹1,49,999", main: false },
  { name: "Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", badge: "Visa Free", icon: "check_circle", info: "30-day entry · From ₹1,14,999", main: false },
];

export default function VisaFree() {
  return (
    <section id="visa" style={{ padding: "96px 0", background: "var(--gn)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, position: "relative" }}>
          <div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
              No Hassle
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 10, color: "var(--iv)" }}>
              Visa <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Free</em> Destinations
            </h2>
            <p style={{ fontSize: 15, color: "rgba(249,246,240,.55)", marginTop: 10, lineHeight: 1.72, maxWidth: 440 }}>
              Indian passport holders can visit these stunning places without a prior visa — just pack and go.
            </p>
          </div>
          <a href="#" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--gd)", borderBottom: "1.5px solid rgba(212,168,83,.25)", paddingBottom: 2 }}>
            View all <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
          </a>
          <div className="syne" style={{ position: "absolute", top: -30, right: 0, fontSize: 140, fontWeight: 800, color: "rgba(249,246,240,.025)", lineHeight: 1, pointerEvents: "none", letterSpacing: -5 }}>04</div>
        </div>

        {/* Grid */}
        <div className="rv visa-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 14, height: 560, marginTop: 52 }}>
          {visas.map((v, i) => (
            <div key={i} className="vc-card" style={{
              position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)", cursor: "pointer",
              border: "1px solid rgba(249,246,240,.08)", transition: "var(--tr)",
              ...(v.main ? { gridRow: "1 / 3" } : {}),
            }}>
              <img src={v.img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .65s", filter: "brightness(.7)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.97) 0%, rgba(0,77,94,.15) 55%, transparent 80%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 26px" }}>
                <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(74,194,138,.15)", border: "1px solid rgba(74,194,138,.3)", borderRadius: 50, padding: "5px 13px", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#4AC28A", marginBottom: 10 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 13 }}>{v.icon}</span>{v.badge}
                </div>
                <div className="serif" style={{ fontSize: v.main ? "clamp(34px, 4vw, 48px)" : 28, fontWeight: 600, color: "#fff", lineHeight: 1.1 }}>{v.name}</div>
                <div style={{ fontSize: 12, color: "rgba(249,246,240,.45)", marginTop: 5 }}>{v.info}</div>
                <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--cu)", borderBottom: "1px solid rgba(0,174,204,.3)", paddingBottom: 2, marginTop: 14, transition: "gap .2s, border-color .2s" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 13 }}>arrow_forward</span>Explore{v.main ? " packages" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .vc-card:hover {
          border-color: rgba(249,246,240,.22) !important;
        }
        .vc-card:hover img {
          transform: scale(1.05);
          filter: brightness(.85) !important;
        }
        @media (max-width: 1100px) {
          .visa-grid {
            grid-template-columns: 1fr 1fr !important;
            height: auto !important;
          }
          .visa-grid > div:first-child {
            grid-row: auto !important;
          }
        }
        @media (max-width: 768px) {
          .visa-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
