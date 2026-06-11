"use client";

import { useEffect, useState } from "react";

interface DetailHeroProps {
  destinationName?: string;
  images?: string[];
  heroImage?: string;
  description?: string;
  startingPrice?: number;
  packageCount?: number;
  rating?: number;
  reviewCount?: number;
  bestSeason?: string;
  country?: string;
}

const formatPrice = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN").format(n);

export default function DetailHero({
  destinationName = "Destination",
  images,
  heroImage,
  description,
  startingPrice,
  packageCount,
  rating,
  reviewCount,
  bestSeason,
  country,
}: DetailHeroProps) {
  const [idx, setIdx] = useState(0);

  // Build slideshow: heroImage first, then images[], fallback if nothing
  const slides = (() => {
    const combined: string[] = [];
    if (heroImage) combined.push(heroImage);
    if (images && images.length > 0) {
      images.forEach((img) => { if (!combined.includes(img)) combined.push(img); });
    }
    return combined.length > 0 ? combined : [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    ];
  })();

  useEffect(() => {
    const iv = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(iv);
  }, [slides.length]);

  // Build dynamic stats bar — always show at least 4 items
  const stats: { val: string; lbl: string }[] = [];
  stats.push({ val: `${packageCount || 0}+`, lbl: "Packages" });
  if (rating) stats.push({ val: `${rating}★`, lbl: "Avg Rating" });
  if (reviewCount) stats.push({ val: `${reviewCount > 1000 ? Math.round(reviewCount / 1000) + "K+" : reviewCount + "+"}`, lbl: "Reviews" });
  if (bestSeason) stats.push({ val: bestSeason, lbl: "Best Season" });
  if (country) stats.push({ val: country, lbl: "Country" });
  // Ensure at least 4 stats show
  if (!rating && !reviewCount) stats.push({ val: "4.8★", lbl: "Avg Rating" });
  if (!bestSeason) stats.push({ val: "Year-round", lbl: "Best Season" });

  const displayStats = stats;

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
        {/* Breadcrumb */}
        <div className="syne" style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,.6)", display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <a href="/" style={{ color: "rgba(255,255,255,.6)" }}>Home</a>
          <span style={{ color: "rgba(255,255,255,.3)" }}>›</span>
          <a href="/destinations" style={{ color: "rgba(255,255,255,.6)" }}>Destinations</a>
          <span style={{ color: "rgba(255,255,255,.3)" }}>›</span>
          <span style={{ color: "rgba(255,255,255,.9)" }}>{destinationName}</span>
        </div>

        {/* Location badge */}
        {country && (
          <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,.85)", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "6px 14px", borderRadius: 50, marginBottom: 16, width: "fit-content", border: "1px solid rgba(255,255,255,.2)" }}>
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>location_on</span>
            {country}
          </div>
        )}

        {/* Title */}
        <h1 className="serif" style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: 16 }}>
          Discover<br /><em style={{ fontStyle: "italic", color: "var(--cu-l)" }}>{destinationName}</em>
        </h1>

        {/* Description */}
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.75)", marginBottom: 28, maxWidth: 520, lineHeight: 1.65 }}>
          {description || `Explore the best of ${destinationName} with our handpicked travel packages.`}
        </p>

        {/* Starting price */}
        {startingPrice ? (
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 32 }}>
            <span className="syne" style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.6)" }}>Starting from</span>
            <span className="serif" style={{ fontSize: 34, fontWeight: 700, color: "var(--cu-l)" }}>{formatPrice(startingPrice)}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.55)" }}>/ person</span>
          </div>
        ) : (
          <div style={{ marginBottom: 32 }} />
        )}

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#packages" className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", background: "var(--cu)", padding: "14px 32px", borderRadius: 50, border: "none", cursor: "pointer", boxShadow: "0 6px 24px rgba(245,166,35,.4)", transition: "var(--tr)", textDecoration: "none" }}>
            Explore Packages
          </a>
        </div>
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button className="detail-hero-arrow" onClick={() => setIdx((p) => (p - 1 + slides.length) % slides.length)} style={{ position: "absolute", top: "50%", left: 28, transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}>
            <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 24 }}>chevron_left</span>
          </button>
          <button className="detail-hero-arrow" onClick={() => setIdx((p) => (p + 1) % slides.length)} style={{ position: "absolute", top: "50%", right: 28, transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}>
            <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 24 }}>chevron_right</span>
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="detail-hero-dots" style={{ position: "absolute", bottom: 100, left: 80, display: "flex", gap: 8, zIndex: 10 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: i === idx ? 4 : "50%", background: i === idx ? "var(--cu)" : "rgba(255,255,255,.35)", transition: "var(--tr)", cursor: "pointer" }} />
          ))}
        </div>
      )}

      {/* Stats bar */}
      <div className="detail-hero-stats" style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,20,28,.75)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "center" }}>
        {displayStats.map((s, i) => (
          <div key={i} style={{ flex: 1, maxWidth: 220, padding: "20px 24px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,.08)" }}>
            <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--cu-l)", lineHeight: 1 }}>{s.val}</div>
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
