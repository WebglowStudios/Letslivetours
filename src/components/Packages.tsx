"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PackageData {
  _id: string;
  name: string;
  slug: string;
  destination?: { name: string; slug: string } | string;
  images: string[];
  heroImage?: string;
  duration: { nights: number; days: number };
  hotelRating?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  category?: string;
}

export default function Packages() {
  const [active, setActive] = useState("all");
  const [packages, setPackages] = useState<PackageData[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${baseUrl}/packages/featured`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setPackages(json.data);
            return;
          }
        }
        const allRes = await fetch(`${baseUrl}/packages?limit=8`);
        if (allRes.ok) {
          const allJson = await allRes.json();
          if (allJson.data && allJson.data.length > 0) {
            setPackages(allJson.data);
          }
        }
      } catch {
        // Quietly fail
      }
    };
    fetchPackages();
  }, []);

  const getDestName = (pkg: PackageData): string => {
    if (typeof pkg.destination === "object" && pkg.destination?.name) {
      return pkg.destination.name.toLowerCase();
    }
    return "";
  };

  const filtered = active === "all" ? packages : packages.filter((p) => getDestName(p) === active);

  const getDestLabel = (pkg: PackageData): string => {
    if (typeof pkg.destination === "object" && pkg.destination?.name) {
      return pkg.destination.name;
    }
    return "";
  };

  // Build dynamic tabs from available destinations
  const destNames = [...new Set(packages.map(getDestName).filter(Boolean))];
  const tabs = ["All", ...destNames.map(n => n.charAt(0).toUpperCase() + n.slice(1))];
  const tabValues = ["all", ...destNames];

  const formatPrice = (price: number): string => {
    return "₹" + price.toLocaleString("en-IN");
  };

  const getBadgeStyle = (badge?: string): React.CSSProperties => {
    if (!badge) return { background: "rgba(0,20,28,.6)", borderColor: "rgba(255,255,255,.25)", color: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,.3)" };
    const lower = badge.toLowerCase();
    if (lower.includes("hot") || lower.includes("deal")) return { background: "rgba(245,166,35,.92)", borderColor: "rgba(245,166,35,1)", color: "#fff", boxShadow: "0 2px 8px rgba(245,166,35,.4)" };
    if (lower.includes("top") || lower.includes("rated") || lower.includes("green")) return { background: "rgba(34,170,100,.92)", borderColor: "rgba(34,170,100,1)", color: "#fff", boxShadow: "0 2px 8px rgba(34,170,100,.4)" };
    return { background: "rgba(0,20,28,.6)", borderColor: "rgba(255,255,255,.25)", color: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,.3)" };
  };

  return (
    <section id="packages" style={{ padding: "96px 0", background: "var(--gn)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv pkg-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52 }}>
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
          <Link href="/destinations" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--gd)", borderBottom: "1.5px solid rgba(212,168,83,.25)", paddingBottom: 2, textDecoration: "none" }}>
            All packages <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
          </Link>
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
          {filtered.map((pkg, i) => {
            const img = pkg.heroImage || pkg.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80";
            return (
              <Link key={pkg._id || i} href={`/packages/${pkg.slug}`} className="pc-card" style={{
                background: "rgba(249,246,240,.04)", border: "1px solid rgba(249,246,240,.1)",
                borderRadius: "var(--r)", overflow: "hidden", cursor: "pointer",
                transition: "var(--tr)", display: "flex", flexDirection: "column",
                textDecoration: "none",
              }}>
                {/* Image */}
                <div style={{ height: 210, position: "relative", overflow: "hidden" }}>
                  <img src={img} alt={pkg.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .55s" }} />
                  <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    {pkg.badge && (
                      <span className="syne" style={{ ...getBadgeStyle(pkg.badge), display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 11px", borderRadius: 50, fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", backdropFilter: "blur(8px)", border: "1px solid" }}>
                        {pkg.badge}
                      </span>
                    )}
                    <span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(0,77,94,.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(249,246,240,.15)", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--tr)", marginLeft: "auto" }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 16, color: "rgba(249,246,240,.7)" }}>favorite_border</span>
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--cu)", marginBottom: 7 }}>{getDestLabel(pkg)}</div>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--iv)", lineHeight: 1.3, marginBottom: 10 }}>{pkg.name}</div>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "rgba(249,246,240,.45)", marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>calendar_today</span>{pkg.duration.nights}N / {pkg.duration.days}D</span>
                    {pkg.hotelRating && <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>hotel</span>{pkg.hotelRating}</span>}
                  </div>
                  {(pkg.rating && pkg.rating > 0) ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 2, color: "var(--gd)", marginBottom: 14 }}>
                      {[...Array(5)].map((_, j) => <span key={j} className="material-symbols-rounded" style={{ fontSize: 13 }}>star</span>)}
                      <span style={{ fontSize: 11, color: "rgba(249,246,240,.35)", marginLeft: 5 }}>({pkg.rating}{pkg.reviewCount ? ` · ${pkg.reviewCount}` : ""})</span>
                    </div>
                  ) : null}
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(249,246,240,.1)", paddingTop: 14 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(249,246,240,.35)", letterSpacing: 0.5, marginBottom: 2 }}>from</div>
                      <div className="serif" style={{ fontSize: 24, color: "var(--iv)", lineHeight: 1 }}>{formatPrice(pkg.price)}<small style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 12, color: "rgba(249,246,240,.35)" }}>/person</small></div>
                    </div>
                    <span className="syne" style={{ padding: "9px 18px", background: "var(--cu)", borderRadius: 50, color: "#fff", fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5 }}>View Package</span>
                  </div>
                </div>
              </Link>
            );
          })}
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
          .pkg-head {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
