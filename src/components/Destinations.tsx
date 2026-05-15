"use client";

import { useState } from "react";

const destinations = [
  { name: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", packages: "48 packages", rating: "4.9 (312 reviews)", season: "Year-round", big: true },
  { name: "Singapore", country: "Southeast Asia", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", packages: "36 packages", rating: "4.8", season: "", big: false },
  { name: "Japan", country: "East Asia", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", packages: "29 packages", rating: "4.9", season: "", big: false },
  { name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", packages: "52 packages", rating: "4.9", season: "", big: false },
  { name: "Maldives", country: "South Asia", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", packages: "31 packages", rating: "5.0", season: "", big: false },
  { name: "Thailand", country: "Southeast Asia", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", packages: "44 packages", rating: "4.8", season: "", big: false },
];

export default function Destinations() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="destinations" style={{ padding: "96px 0", background: "var(--iv)" }}>
      <div className="container">
        {/* Section head */}
        <div className="rv" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, position: "relative" }}>
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
          <a href="#" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--gn2)", borderBottom: "1.5px solid var(--gn-gl)", paddingBottom: 2 }}>
            All destinations <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
          </a>
          <div className="syne" style={{ position: "absolute", top: -30, right: 0, fontSize: 140, fontWeight: 800, color: "rgba(0,77,94,.04)", lineHeight: 1, pointerEvents: "none", letterSpacing: -5 }}>01</div>
        </div>

        {/* Cards */}
        <div className="rv dest-row" style={{ display: "flex", gap: 14, height: 580, overflow: "hidden" }}>
          {destinations.map((d, i) => {
            const isExpanded = hovered === null ? d.big : hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)", cursor: "pointer",
                  flex: isExpanded ? 3 : 1, transition: "flex .6s cubic-bezier(.4,0,.2,1), box-shadow .4s",
                  minWidth: 80,
                  boxShadow: isExpanded ? "var(--sh-lg)" : "none",
                }}
              >
                <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .7s ease", transform: isExpanded ? "scale(1.06)" : "none" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.96) 0%, rgba(0,77,94,.1) 50%, transparent 80%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,77,94,.5)", opacity: isExpanded ? 0 : 1, transition: "opacity .5s" }} />

                {/* Package badge */}
                <div className="syne" style={{ position: "absolute", top: 16, left: 16, background: "rgba(249,246,240,.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(249,246,240,.15)", borderRadius: 50, padding: "5px 13px", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(249,246,240,.7)", opacity: isExpanded ? 1 : 0, transition: "opacity .4s" }}>
                  {d.packages}
                </div>

                {/* Wish */}
                <button style={{ position: "absolute", top: 16, right: 16, width: 38, height: 38, borderRadius: "50%", background: "rgba(249,246,240,.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(249,246,240,.18)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: isExpanded ? 1 : 0, transition: "var(--tr)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 17, color: "rgba(255,255,255,.7)" }}>favorite_border</span>
                </button>

                {/* Body */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28, transform: isExpanded ? "none" : "translateY(10px)", transition: "transform .4s" }}>
                  <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--cu)", marginBottom: 6, opacity: isExpanded ? 1 : 0, transition: "opacity .4s .1s" }}>
                    {d.big && <span className="material-symbols-rounded" style={{ fontSize: 11, marginRight: 4 }}>location_on</span>}
                    {d.country}
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
                    {d.season && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>calendar_today</span>{d.season}</span>}
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>star</span>{d.rating}</span>
                  </div>
                  <div className="serif" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--cu)", marginTop: 14, borderBottom: "1px solid rgba(0,174,204,.35)", paddingBottom: 2, fontStyle: "italic", opacity: isExpanded ? 1 : 0, transition: "opacity .4s .2s" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 13 }}>arrow_forward</span>Explore packages
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .dest-row {
            flex-direction: column !important;
            height: auto !important;
          }
          .dest-row > div {
            min-width: unset !important;
            height: 260px !important;
            flex: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
