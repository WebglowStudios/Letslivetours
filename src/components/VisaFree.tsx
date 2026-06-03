"use client";

import { useState, useEffect } from "react";

const visas = [
  { name: "Thailand", slug: "thailand", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", badge: "Visa Free", icon: "check_circle", info: "30-day stamp on arrival · Packages from Rs. 39,999", main: true },
  { name: "Maldives", slug: "maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", badge: "Visa on Arrival", icon: "check_circle", info: "30-day free stamp · From Rs. 69,999", main: false },
  { name: "Bali", slug: "bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", badge: "Visa Free", icon: "check_circle", info: "30-day free entry · From Rs. 44,999", main: false },
  { name: "Santorini", slug: "santorini", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", badge: "Visa on Apply", icon: "info", info: "Schengen visa · From Rs. 1,49,999", main: false },
  { name: "Japan", slug: "japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", badge: "Visa Free", icon: "check_circle", info: "30-day entry · From Rs. 1,14,999", main: false },
];

export default function VisaFree() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((p) => (p + 1) % visas.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="visa" style={{ padding: "96px 0", background: "var(--gn)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv visa-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, position: "relative" }}>
          <div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10 }}>
              <span className="visa-eyebrow-line" style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
              No Hassle
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4.5vw, 58px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 10, color: "var(--iv)" }}>
              Visa <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Free</em> Destinations
            </h2>
            <p style={{ fontSize: 15, color: "rgba(249,246,240,.55)", marginTop: 10, lineHeight: 1.72, maxWidth: 440 }}>
              Indian passport holders can visit these stunning places without a prior visa.
            </p>
          </div>
          <a href="/destinations" className="syne visa-all-link" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--gd)", borderBottom: "1.5px solid rgba(212,168,83,.25)", paddingBottom: 2, textDecoration: "none" }}>
            View all <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
          </a>
        </div>

        {/* Desktop Grid */}
        <div className="rv visa-grid visa-desktop" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 14, height: 560 }}>
          {visas.map((v, i) => (
            <a key={i} href={`/destinations/${v.slug}`} className="vc-card" style={{
              position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)", cursor: "pointer",
              border: "1px solid rgba(249,246,240,.08)", transition: "var(--tr)", textDecoration: "none",
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
                <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--cu)", borderBottom: "1px solid rgba(0,174,204,.3)", paddingBottom: 2, marginTop: 14 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 13 }}>arrow_forward</span>Explore
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="visa-mobile-carousel" style={{ display: "none", flexDirection: "column", gap: 16 }}>
          <div style={{ position: "relative", width: "100%", height: 380, borderRadius: 20, overflow: "hidden" }}>
            {visas.map((v, i) => (
              <a
                key={i}
                href={`/destinations/${v.slug}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === slide ? 1 : 0,
                  transform: i === slide ? "translateX(0)" : i > slide ? "translateX(50px)" : "translateX(-50px)",
                  transition: "opacity .5s ease, transform .5s ease",
                  textDecoration: "none",
                  pointerEvents: i === slide ? "auto" : "none",
                }}
              >
                <img src={v.img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,30,40,.92) 0%, rgba(0,30,40,.2) 50%, transparent 70%)" }} />
                {/* Visa badge */}
                <div className="syne" style={{ position: "absolute", top: 14, left: 14, display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(74,194,138,.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(74,194,138,.3)", borderRadius: 50, padding: "5px 14px", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#4AC28A" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 12 }}>{v.icon}</span>{v.badge}
                </div>
                {/* Content */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px" }}>
                  <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 6 }}>
                    {v.name}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginBottom: 12 }}>{v.info}</div>
                  <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "var(--cu)", letterSpacing: 0.5 }}>
                    Explore
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>arrow_forward</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Nav: arrows + dots */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <button
              onClick={() => setSlide((p) => (p - 1 + visas.length) % visas.length)}
              style={{ width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(249,246,240,.2)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "rgba(249,246,240,.6)" }}>chevron_left</span>
            </button>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {visas.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  style={{
                    width: i === slide ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === slide ? "var(--cu)" : "rgba(249,246,240,.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all .3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setSlide((p) => (p + 1) % visas.length)}
              style={{ width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(249,246,240,.2)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "rgba(249,246,240,.6)" }}>chevron_right</span>
            </button>
          </div>
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
          .visa-desktop {
            grid-template-columns: 1fr 1fr !important;
            height: auto !important;
          }
          .visa-desktop > a:first-child {
            grid-row: auto !important;
          }
          .visa-desktop > a {
            height: 280px !important;
          }
        }
        @media (max-width: 768px) {
          .visa-head {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 28px !important;
          }
          .visa-eyebrow-line {
            display: none !important;
          }
          .visa-desktop {
            display: none !important;
          }
          .visa-mobile-carousel {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
