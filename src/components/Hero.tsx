"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80", label: "Tropical" },
  { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", label: "Dubai" },
  { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", label: "Bali" },
  { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", label: "Japan" },
  { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", label: "Maldives" },
  { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", label: "Europe" },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{ height: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}
    >
      {/* BG slides */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {slides.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === idx ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          >
            <img src={s.src} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(to top, rgba(0,77,94,.97) 0%, rgba(0,77,94,.6) 40%, rgba(0,77,94,.15) 70%, transparent 100%)",
        }}
      />

      {/* Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Filmstrip */}
      <div className="filmstrip-wrap" style={{
        position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
        zIndex: 10, display: "flex", flexDirection: "column", width: 88,
      }}>
        {slides.map((s, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 100 : 88,
              height: 72,
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
              transition: "var(--tr)",
              borderBottom: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <img
              src={s.src}
              alt={s.label}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: i === idx ? "brightness(.85) saturate(1)" : "brightness(.4) saturate(.6)",
                transition: "filter .4s",
              }}
            />
            <div style={{
              position: "absolute", left: 0, top: 0, width: 3, height: "100%",
              background: "var(--cu)", opacity: i === idx ? 1 : 0, transition: "opacity .3s",
            }} />
            <div className="syne" style={{
              position: "absolute", bottom: 8, left: 8,
              fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
              color: "rgba(255,255,255,.6)",
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content-wrap" style={{
        position: "relative", zIndex: 5,
        padding: "0 0 72px 72px",
        width: "calc(100% - 88px)",
      }}>
        <div className="syne" style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase",
          color: "var(--cu)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ display: "block", width: 28, height: 1.5, background: "var(--cu)" }} />
          Journeys Beyond the Ordinary
        </div>

        <h1 className="serif" style={{
          fontSize: "clamp(64px, 9vw, 130px)", fontWeight: 700, lineHeight: 0.95,
          letterSpacing: -3, color: "#fff", maxWidth: 750,
        }}>
          The World Is<br />Your <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Canvas</em>.
        </h1>

        {/* Search */}
        <div style={{
          marginTop: 40, background: "rgba(249,246,240,.07)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(249,246,240,.15)", borderRadius: "var(--r-xl)",
          padding: "20px 26px", display: "flex", gap: 2, alignItems: "stretch", maxWidth: 820,
        }} className="hero-search-bar">
          {[
            { label: "Where to?", type: "text", placeholder: "Dubai, Bali, Japan…" },
            { label: "Travel Date", type: "date", placeholder: "" },
            { label: "Travellers", type: "text", placeholder: "2 Adults" },
          ].map((f, i) => (
            <div key={i} style={{
              flex: 1, display: "flex", flexDirection: "column", gap: 4, padding: "6px 20px",
              borderRight: i < 2 ? "1px solid rgba(249,246,240,.12)" : "none",
            }} className="hs-field">
              <div className="syne" style={{
                fontSize: 9.5, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                color: "rgba(249,246,240,.5)",
              }}>{f.label}</div>
              <input
                type={f.type}
                placeholder={f.placeholder}
                style={{
                  background: "transparent", border: "none", outline: "none",
                  fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 15,
                  color: "#fff", fontWeight: 500,
                }}
              />
            </div>
          ))}
          <button className="syne" style={{
            flexShrink: 0, padding: "14px 26px", background: "var(--cu)", border: "none",
            borderRadius: 16, color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: 0.5,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
            transition: "var(--tr)", alignSelf: "center", marginLeft: 10,
          }}>
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>search</span>Search
          </button>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="hero-bottom-bar" style={{
        position: "absolute", bottom: 0, left: 0, right: 88, zIndex: 6,
        borderTop: "1px solid rgba(249,246,240,.1)", display: "flex", alignItems: "stretch",
      }}>
        {[
          { icon: "travel_explore", val: "500", suf: "+", lbl: "Destinations" },
          { icon: "group", val: "2M", suf: "+", lbl: "Happy Travellers" },
          { icon: "star", val: "98", suf: "%", lbl: "Satisfaction Rate" },
          { icon: "emoji_events", val: "12", suf: "+", lbl: "Years of Excellence" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: "18px 28px", borderRight: "1px solid rgba(249,246,240,.1)",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--cu)" }}>{s.icon}</span>
            <div>
              <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                {s.val}<span style={{ color: "var(--cu)" }}>{s.suf}</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(249,246,240,.45)", letterSpacing: 0.5, marginTop: 3 }}>{s.lbl}</div>
            </div>
          </div>
        ))}
        <div className="syne hero-scroll-text" style={{
          display: "flex", alignItems: "center", gap: 8, marginLeft: "auto", padding: "0 32px",
          color: "rgba(249,246,240,.35)", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(249,246,240,.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "bounce 2s ease infinite",
          }}>
            <span className="material-symbols-rounded" style={{ fontSize: 16, color: "rgba(249,246,240,.5)" }}>keyboard_arrow_down</span>
          </div>
          Scroll to explore
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .filmstrip-wrap { display: none !important; }
          .hero-content-wrap { width: 100% !important; padding: 0 0 72px 52px !important; }
          .hero-bottom-bar { right: 0 !important; }
        }
        @media (max-width: 768px) {
          .hero-content-wrap { padding: 0 0 120px 20px !important; }
          .hero-content-wrap h1 { font-size: clamp(48px, 10vw, 80px) !important; }
          .hero-search-bar { flex-direction: column !important; padding: 16px 18px !important; }
          .hs-field { border-right: none !important; border-bottom: 1px solid rgba(249,246,240,.12) !important; }
          .hero-bottom-bar {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
          }
          .hero-bottom-bar > div {
            display: flex !important;
            padding: 12px 16px !important;
            border-right: 1px solid rgba(249,246,240,.1) !important;
            border-bottom: 1px solid rgba(249,246,240,.1) !important;
          }
          .hero-bottom-bar > div .serif {
            font-size: 20px !important;
          }
          .hero-bottom-bar .hero-scroll-text {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
