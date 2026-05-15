"use client";

import { useState } from "react";

const tabs = ["All", "Dubai", "Singapore", "Japan", "Bali", "Thailand"];
const tabValues = ["all", "dubai", "sg", "japan", "bali", "thailand"];

const packages = [
  { dest: "dubai", region: "Dubai · UAE", name: "Dubai Luxury Escape — Burj Khalifa & Desert Safari", dur: "7N / 8D", hotel: "5-Star", rating: "4.9", reviews: "312", price: "₹1,24,999", badge: "Bestseller", badgeCls: "" },
  { dest: "dubai", region: "Dubai · UAE", name: "Dubai City & Dhow Cruise Getaway", dur: "5N / 6D", hotel: "4-Star", rating: "4.8", reviews: "219", price: "₹89,999", badge: "Hot Deal", badgeCls: "hot" },
  { dest: "sg", region: "Singapore · SE Asia", name: "Singapore Classic with Universal Studios", dur: "5N / 6D", hotel: "4-Star", rating: "4.8", reviews: "401", price: "₹72,999", badge: "Popular", badgeCls: "" },
  { dest: "japan", region: "Japan · East Asia", name: "Japan Cherry Blossom Season Special", dur: "9N / 10D", hotel: "4-Star", rating: "5.0", reviews: "178", price: "₹1,14,999", badge: "New", badgeCls: "" },
  { dest: "bali", region: "Bali · Indonesia", name: "Bali Honeymoon Private Villa Retreat", dur: "6N / 7D", hotel: "5-Star", rating: "4.9", reviews: "524", price: "₹64,999", badge: "Top Rated", badgeCls: "green" },
  { dest: "thailand", region: "Thailand · SE Asia", name: "Bangkok & Phuket Beach Holiday", dur: "6N / 7D", hotel: "4-Star", rating: "4.8", reviews: "374", price: "₹54,999", badge: "Bestseller", badgeCls: "" },
  { dest: "bali", region: "Maldives · South Asia", name: "Maldives Overwater Bungalow Experience", dur: "5N / 6D", hotel: "5-Star", rating: "5.0", reviews: "209", price: "₹1,19,999", badge: "All-Inclusive", badgeCls: "" },
  { dest: "sg", region: "Singapore · SE Asia", name: "Singapore + Sentosa Island Luxury Package", dur: "6N / 7D", hotel: "5-Star", rating: "4.9", reviews: "188", price: "₹1,05,000", badge: "Premium", badgeCls: "" },
];

const imgMap: Record<string, string> = {
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  sg: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
  japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  thailand: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
};

export default function Packages() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? packages : packages.filter((p) => p.dest === active);

  const getBadgeStyle = (cls: string): React.CSSProperties => {
    if (cls === "hot") return { background: "rgba(212,168,83,.2)", borderColor: "rgba(212,168,83,.4)", color: "var(--gd)" };
    if (cls === "green") return { background: "rgba(74,194,138,.15)", borderColor: "rgba(74,194,138,.3)", color: "#4AC28A" };
    return { background: "rgba(255,255,255,.15)", borderColor: "rgba(255,255,255,.22)", color: "#fff" };
  };

  return (
    <section id="packages" style={{ padding: "96px 0", background: "var(--gn)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52 }}>
          <div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
              Handpicked For You
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 10, color: "var(--iv)" }}>
              Our Best <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Holiday Packages</em>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(249,246,240,.55)", marginTop: 10, lineHeight: 1.72, maxWidth: 440 }}>
              Every package crafted by destination experts — no cookie-cutter itineraries.
            </p>
          </div>
          <a href="#" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--gd)", borderBottom: "1.5px solid rgba(212,168,83,.25)", paddingBottom: 2 }}>
            All packages <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
          </a>
        </div>

        {/* Tabs */}
        <div className="rv" style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(tabValues[i])}
              className="syne"
              style={{
                padding: "9px 22px", borderRadius: 50, fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                cursor: "pointer", transition: "var(--tr)",
                ...(active === tabValues[i]
                  ? { background: "var(--cu)", color: "#fff", border: "1px solid var(--cu)", boxShadow: "0 4px 18px rgba(0,174,204,.4)" }
                  : { background: "transparent", color: "rgba(249,246,240,.5)", border: "1px solid rgba(249,246,240,.15)" }
                ),
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="rv pkg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {filtered.map((pkg, i) => (
            <div key={i} className="pc-card" style={{
              background: "rgba(249,246,240,.04)", border: "1px solid rgba(249,246,240,.1)",
              borderRadius: "var(--r)", overflow: "hidden", cursor: "pointer",
              transition: "var(--tr)", display: "flex", flexDirection: "column",
            }}>
              {/* Image */}
              <div style={{ height: 210, position: "relative", overflow: "hidden" }}>
                <img src={imgMap[pkg.dest]} alt={pkg.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .55s" }} />
                <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="syne" style={{ ...getBadgeStyle(pkg.badgeCls), display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 11px", borderRadius: 50, fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", backdropFilter: "blur(8px)", border: "1px solid" }}>
                    {pkg.badge}
                  </span>
                  <button style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(0,77,94,.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(249,246,240,.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "var(--tr)" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 16, color: "rgba(249,246,240,.7)" }}>favorite_border</span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column" }}>
                <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--cu)", marginBottom: 7 }}>{pkg.region}</div>
                <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--iv)", lineHeight: 1.3, marginBottom: 10 }}>{pkg.name}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "rgba(249,246,240,.45)", marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>calendar_today</span>{pkg.dur}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>hotel</span>{pkg.hotel}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 2, color: "var(--gd)", marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => <span key={j} className="material-symbols-rounded" style={{ fontSize: 13 }}>star</span>)}
                  <span style={{ fontSize: 11, color: "rgba(249,246,240,.35)", marginLeft: 5 }}>({pkg.rating} · {pkg.reviews})</span>
                </div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(249,246,240,.1)", paddingTop: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(249,246,240,.35)", letterSpacing: 0.5, marginBottom: 2 }}>from</div>
                    <div className="serif" style={{ fontSize: 24, color: "var(--iv)", lineHeight: 1 }}>{pkg.price}<small style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 12, color: "rgba(249,246,240,.35)" }}>/person</small></div>
                  </div>
                  <button className="syne" style={{ padding: "9px 18px", background: "var(--cu)", border: "none", borderRadius: 50, color: "#fff", fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", transition: "var(--tr)" }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pc-card:hover {
          background: rgba(249,246,240,.08) !important;
          border-color: rgba(249,246,240,.22) !important;
          transform: translateY(-6px);
          box-shadow: 0 20px 56px rgba(0,77,94,.5);
        }
        .pc-card:hover img {
          transform: scale(1.08);
        }
        @media (max-width: 1100px) {
          .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .pkg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
