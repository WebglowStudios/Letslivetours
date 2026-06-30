"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DestinationData {
  name: string;
  slug: string;
  country?: string;
  region?: string;
  images: string[];
  heroImage?: string;
  packageCount: number;
  rating: number;
  reviewCount: number;
  bestSeason?: string;
}

const fallbackDestinations = [
  { name: "Dubai", slug: "dubai", country: "UAE", region: "Middle East", images: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"], heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", packageCount: 48, rating: 4.9, reviewCount: 312, bestSeason: "Year-round" },
  { name: "Singapore", slug: "singapore", country: "Singapore", region: "Southeast Asia", images: ["https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80"], heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", packageCount: 36, rating: 4.8, reviewCount: 0, bestSeason: "" },
  { name: "Japan", slug: "japan", country: "Japan", region: "East Asia", images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"], heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", packageCount: 29, rating: 4.9, reviewCount: 0, bestSeason: "" },
  { name: "Bali", slug: "bali", country: "Indonesia", region: "Southeast Asia", images: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"], heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", packageCount: 52, rating: 4.9, reviewCount: 0, bestSeason: "" },
  { name: "Maldives", slug: "maldives", country: "Maldives", region: "South Asia", images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80"], heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", packageCount: 31, rating: 5.0, reviewCount: 0, bestSeason: "" },
  { name: "Thailand", slug: "thailand", country: "Thailand", region: "Southeast Asia", images: ["https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80"], heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", packageCount: 44, rating: 4.8, reviewCount: 0, bestSeason: "" },
];

export default function Destinations() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [destinations, setDestinations] = useState<DestinationData[]>(fallbackDestinations);
  const [mobileSlide, setMobileSlide] = useState(0);

  // Auto-advance mobile carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileSlide((p) => (p + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [destinations.length]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/featured`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setDestinations(json.data.slice(0, 6));
          }
        }
      } catch {
        // Use fallback data
      }
    };
    fetchDestinations();
  }, []);

  return (
    <section id="destinations" style={{ padding: "96px 0", background: "var(--iv)" }}>
      <div className="container">
        {/* Section head */}
        <div className="rv dest-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, position: "relative" }}>
          <div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              Browse by Destination
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 10 }}>
              Where Will You <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Go Next?</em>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink3)", marginTop: 10, lineHeight: 1.72, maxWidth: 440 }}>
              Hover to explore — our most-loved destinations, each a universe unto itself.
            </p>
          </div>
          <Link href="/destinations" className="syne dest-all-link" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--gn2)", borderBottom: "1.5px solid var(--gn-gl)", paddingBottom: 2, textDecoration: "none" }}>
            All destinations <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
          </Link>
          <div className="syne dest-watermark" style={{ position: "absolute", top: -30, right: 0, fontSize: 140, fontWeight: 800, color: "rgba(0,77,94,.04)", lineHeight: 1, pointerEvents: "none", letterSpacing: -5 }}>01</div>
        </div>

        {/* Desktop Cards */}
        <div className="rv dest-row dest-desktop" style={{ display: "flex", gap: 14, height: 580, overflow: "hidden" }}>
          {destinations.map((d, i) => {
            const isExpanded = hovered === null ? i === 0 : hovered === i;
            const img = d.heroImage || d.images?.[0] || "";
            const ratingStr = d.reviewCount > 0 ? `${d.rating} (${d.reviewCount} reviews)` : `${d.rating}`;
            return (
              <Link
                key={i}
                href={`/destinations/${d.slug}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)", cursor: "pointer",
                  flex: isExpanded ? 3 : 1, transition: "flex .6s cubic-bezier(.4,0,.2,1), box-shadow .4s",
                  minWidth: 80,
                  boxShadow: isExpanded ? "var(--sh-lg)" : "none",
                  textDecoration: "none",
                }}
              >
                <img src={img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .7s ease", transform: isExpanded ? "scale(1.06)" : "none" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.96) 0%, rgba(0,77,94,.1) 50%, transparent 80%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,77,94,.5)", opacity: isExpanded ? 0 : 1, transition: "opacity .5s" }} />

                {/* Package badge */}
                <div className="syne" style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,20,28,.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(249,246,240,.2)", borderRadius: 50, padding: "6px 14px", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff", opacity: isExpanded ? 1 : 0, transition: "opacity .4s", boxShadow: "0 4px 12px rgba(0,0,0,.3)" }}>
                  {d.packageCount} packages
                </div>

                {/* Wish */}
                <span style={{ position: "absolute", top: 16, right: 16, width: 38, height: 38, borderRadius: "50%", background: "rgba(249,246,240,.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(249,246,240,.18)", display: "flex", alignItems: "center", justifyContent: "center", opacity: isExpanded ? 1 : 0, transition: "var(--tr)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 17, color: "rgba(255,255,255,.7)" }}>favorite_border</span>
                </span>

                {/* Body */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28, transform: isExpanded ? "none" : "translateY(10px)", transition: "transform .4s" }}>
                  <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--cu)", marginBottom: 6, opacity: isExpanded ? 1 : 0, transition: "opacity .4s .1s" }}>
                    {i === 0 && <span className="material-symbols-rounded" style={{ fontSize: 11, marginRight: 4 }}>location_on</span>}
                    {d.country || d.region}
                  </div>
                  <div className="serif" style={{
                    fontWeight: 600, color: "#fff", lineHeight: 1.1,
                    ...(isExpanded
                      ? { fontSize: "clamp(22px, 3vw, 36px)", writingMode: "horizontal-tb" as const, transform: "none" }
                      : { fontSize: "clamp(18px, 2.5vw, 30px)", writingMode: "vertical-rl" as const, textOrientation: "mixed" as const, transform: "rotate(180deg)" }
                    ),
                    transition: "font-size .4s",
                  }}>
                    {d.name}
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 8, flexWrap: "wrap", opacity: isExpanded ? 1 : 0, transition: "opacity .4s .15s" }}>
                    {d.bestSeason && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>calendar_today</span>{d.bestSeason}</span>}
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>star</span>{ratingStr}</span>
                  </div>
                  <div className="serif" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--cu)", marginTop: 14, borderBottom: "1px solid rgba(0,174,204,.35)", paddingBottom: 2, fontStyle: "italic", opacity: isExpanded ? 1 : 0, transition: "opacity .4s .2s" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 13 }}>arrow_forward</span>Explore packages
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Carousel - Sliding cards */}
        <div className="dest-mobile-carousel" style={{ display: "none", flexDirection: "column", gap: 16 }}>
          {/* Slider container */}
          <div style={{ width: "100%", overflow: "hidden" }}>
            <div
              className="dest-mobile-track"
              style={{
                display: "flex",
                transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
                transform: `translateX(-${mobileSlide * 100}%)`,
              }}
            >
              {destinations.map((d, i) => {
                const img = d.heroImage || d.images?.[0] || "";
                return (
                  <div
                    key={i}
                    style={{
                      flex: "0 0 100%",
                      width: "100%",
                      minWidth: "100%",
                      padding: "0 16px",
                      boxSizing: "border-box",
                    }}
                  >
                    <Link
                      href={`/destinations/${d.slug}`}
                      style={{
                        display: "block",
                        width: "100%",
                        height: 420,
                        position: "relative",
                        borderRadius: 20,
                        overflow: "hidden",
                        textDecoration: "none",
                      }}
                    >
                      <img src={img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.9) 0%, rgba(0,20,28,.2) 50%, transparent 70%)" }} />
                      {/* Badge */}
                      <div className="syne" style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 50, padding: "5px 14px", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>
                        {d.packageCount} packages
                      </div>
                      {/* Content */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px" }}>
                        <div className="syne" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--cu)", marginBottom: 6 }}>
                          {d.country || d.region}
                        </div>
                        <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 8 }}>
                          {d.name}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,.55)" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--cu)" }}>star</span>
                            {d.rating}
                          </span>
                          {d.bestSeason && (
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--cu)" }}>calendar_today</span>
                              {d.bestSeason}
                            </span>
                          )}
                        </div>
                        <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 11, fontWeight: 700, color: "var(--cu)", letterSpacing: 0.5 }}>
                          Explore
                          <span className="material-symbols-rounded" style={{ fontSize: 14 }}>arrow_forward</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation: dots + arrows */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <button
              onClick={() => setMobileSlide((p) => (p - 1 + destinations.length) % destinations.length)}
              style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid var(--line2)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink2)" }}>chevron_left</span>
            </button>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {destinations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileSlide(i)}
                  style={{
                    width: i === mobileSlide ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === mobileSlide ? "var(--cu)" : "var(--line2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all .3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setMobileSlide((p) => (p + 1) % destinations.length)}
              style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid var(--line2)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink2)" }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .dest-head {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 28px !important;
          }
          .dest-watermark {
            display: none !important;
          }
          .dest-all-link {
            margin-top: 4px !important;
          }
          .dest-desktop {
            display: none !important;
          }
          .dest-mobile-carousel {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
