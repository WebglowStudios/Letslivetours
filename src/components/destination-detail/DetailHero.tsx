"use client";

import { useEffect, useState } from "react";

const slides = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
  "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1600&q=80",
  "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1600&q=80",
];

const stats = [
  { val: "48+", lbl: "Packages" },
  { val: "4.9\u2605", lbl: "Avg Rating" },
  { val: "12K+", lbl: "Happy Travellers" },
  { val: "3\u201314", lbl: "Night Options" },
  { val: "Oct\u2013Apr", lbl: "Best Season" },
];

export default function DetailHero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      {/* Slides */}
      <div style={{ position: "absolute", inset: 0 }}>
        {slides.map((s, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, backgroundImage: `url('${s}')`, backgroundSize: "cover", backgroundPosition: "center", opacity: i === idx ? 1 : 0, transition: "opacity 1.2s ease" }} />
        ))}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,20,28,.72) 0%, rgba(0,20,28,.35) 60%, transparent 100%)" }} />

      {/* Content */}
      <div className="detail-hero-content" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", paddingTop: 72 }}>
        <div className="syne" style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,.6)", display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <a href="/" style={{ color: "rgba(255,255,255,.6)" }}>Home</a>
          <span style={{ color: "rgba(255,255,255,.3)" }}>\u203A</span>
          <a href="/destinations" style={{ color: "rgba(255,255,255,.6)" }}>Destinations</a>
          <span style={{ color: "rgba(255,255,255,.3)" }}>\u203A</span>
          <span style={{ color: "rgba(255,255,255,.9)" }}>Dubai</span>
        </div>
        <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--cu)", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", padding: "6px 16px", borderRadius: 50, marginBottom: 18, width: "fit-content", boxShadow: "0 4px 18px rgba(245,166,35,.45)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 16 }}>local_offer</span>Up to 30% Off \u2014 Limited Time
        </div>
        <h1 className="serif" style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: 12 }}>
          Discover<br /><em style={{ fontStyle: "italic", color: "var(--cu-l)" }}>Dubai</em>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,.75)", marginBottom: 32, maxWidth: 480, lineHeight: 1.6 }}>
          Where golden deserts meet futuristic skylines \u2014 an experience unlike any other.
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 32 }}>
          <span className="syne" style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.6)" }}>Starting from</span>
          <span className="serif" style={{ fontSize: 18, color: "rgba(255,255,255,.4)", textDecoration: "line-through" }}>\u20B91,74,999</span>
          <span className="serif" style={{ fontSize: 36, fontWeight: 700, color: "var(--cu-l)" }}>\u20B91,24,999</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.55)" }}>/ person</span>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", background: "var(--cu)", padding: "14px 32px", borderRadius: 50, border: "none", cursor: "pointer", boxShadow: "0 6px 24px rgba(245,166,35,.4)", transition: "var(--tr)" }}>Explore Packages</button>
          <button className="syne" style={{ fontSize: 14, fontWeight: 600, color: "#fff", padding: "14px 32px", borderRadius: 50, border: "1.5px solid rgba(255,255,255,.4)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "var(--tr)" }}>
            <span className="material-symbols-rounded">play_circle</span>Watch Highlights
          </button>
        </div>
      </div>

      {/* Arrows */}
      <button className="detail-hero-arrow" onClick={() => setIdx((p) => (p - 1 + slides.length) % slides.length)} style={{ position: "absolute", top: "50%", left: 28, transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}>
        <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 24 }}>chevron_left</span>
      </button>
      <button className="detail-hero-arrow" onClick={() => setIdx((p) => (p + 1) % slides.length)} style={{ position: "absolute", top: "50%", right: 28, transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}>
        <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 24 }}>chevron_right</span>
      </button>

      {/* Dots */}
      <div className="detail-hero-dots" style={{ position: "absolute", bottom: 100, left: 80, display: "flex", gap: 8, zIndex: 10 }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: i === idx ? 4 : "50%", background: i === idx ? "var(--cu)" : "rgba(255,255,255,.35)", transition: "var(--tr)", cursor: "pointer" }} />
        ))}
      </div>

      {/* Stats bar */}
      <div className="detail-hero-stats" style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,20,28,.75)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "center" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, maxWidth: 220, padding: "20px 24px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,.08)" }}>
            <div className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--cu-l)", lineHeight: 1 }}>{s.val}</div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.5)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .detail-hero-content { padding: 0 20px 120px 20px !important; padding-top: 72px !important; }
          .detail-hero-arrow { display: none !important; }
          .detail-hero-dots { bottom: 90px !important; left: 20px !important; }
          .detail-hero-stats { flex-wrap: wrap !important; }
          .detail-hero-stats > :global(div) { min-width: 33% !important; padding: 12px 16px !important; }
        }
      `}</style>
    </section>
  );
}
