"use client";

import Link from "next/link";

export interface Destination {
  name: string;
  slug?: string;
  img: string;
  cat: string;
  catIcon: string;
  region: string;
  desc: string;
  season: string;
  packages: string;
  rating: string;
  reviews: string;
  price: number;
  priceLabel: string;
}

const badgeColors: Record<string, { bg: string; border: string; color: string }> = {
  beach: { bg: "rgba(0,140,170,.88)", border: "rgba(0,140,170,1)", color: "#fff" },
  city: { bg: "rgba(210,130,20,.88)", border: "rgba(210,130,20,1)", color: "#fff" },
  mountain: { bg: "rgba(34,160,90,.88)", border: "rgba(34,160,90,1)", color: "#fff" },
  adventure: { bg: "rgba(200,60,60,.88)", border: "rgba(200,60,60,1)", color: "#fff" },
  cultural: { bg: "rgba(120,90,220,.88)", border: "rgba(120,90,220,1)", color: "#fff" },
  wildlife: { bg: "rgba(16,160,100,.88)", border: "rgba(16,160,100,1)", color: "#fff" },
  tropical: { bg: "rgba(200,140,10,.88)", border: "rgba(200,140,10,1)", color: "#fff" },
};

interface Props {
  dest: Destination;
  listView: boolean;
}

export default function DestinationCard({ dest, listView }: Props) {
  const badge = badgeColors[dest.cat] || badgeColors.beach;

  const destUrl = `/destinations/${dest.slug || dest.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Link
      href={destUrl}
      className="dc-card rv"
      style={{
        background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xl)",
        overflow: "hidden", cursor: "pointer", transition: "var(--tr)",
        display: "flex", flexDirection: listView ? "row" : "column",
        ...(listView ? { height: 235 } : {}),
        textDecoration: "none", color: "inherit",
      }}
    >
      {/* Image */}
      <div style={{ height: listView ? "100%" : 210, width: listView ? 260 : "auto", position: "relative", overflow: "hidden", flexShrink: 0 }}>
        <img src={dest.img} alt={dest.name} className="dc-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s, filter .4s" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.65) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 2 }}>
          <span className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 50, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", backdropFilter: "blur(10px)", background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>
            <span className="material-symbols-rounded" style={{ fontSize: 12 }}>{dest.catIcon}</span>{dest.cat}
          </span>
          <button style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "var(--tr)" }}>
            <span className="material-symbols-rounded" style={{ fontSize: 16, color: "#fff" }}>favorite_border</span>
          </button>
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,.45)", backdropFilter: "blur(8px)", borderRadius: 50, padding: "4px 10px", zIndex: 2 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>star</span>
          <span className="syne" style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{dest.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", ...(listView ? { padding: "18px 24px", justifyContent: "space-between", overflow: "hidden", minWidth: 0 } : {}) }}>
        <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 5, display: "flex", alignItems: "center", gap: 4 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 12, color: "var(--cu)" }}>location_on</span>{dest.region}
        </div>
        <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 8 }}>{dest.name}</div>
        <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.65, marginBottom: 14, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: listView ? 2 : 3, WebkitBoxOrient: "vertical" as const }}>{dest.desc}</div>
        <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--ink4)", marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--gn2)" }}>calendar_today</span>{dest.season}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--gn2)" }}>confirmation_number</span>{dest.packages}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--gn2)" }}>star</span>{dest.rating} ({dest.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14, marginTop: "auto" }}>
          <div>
            <div className="syne" style={{ fontSize: 10, color: "var(--ink4)", letterSpacing: 0.5, marginBottom: 2 }}>Starting from</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--gn)", lineHeight: 1 }}>{dest.priceLabel}<small style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 11, color: "var(--ink4)", fontWeight: 400 }}>/person</small></div>
          </div>
          <span className="syne" style={{ padding: "9px 18px", background: "var(--cu)", borderRadius: 50, color: "#fff", fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 5 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>flight_takeoff</span>Explore
          </span>
        </div>
      </div>
    </Link>
  );
}
