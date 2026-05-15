"use client";

export interface Destination {
  name: string;
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
  beach: { bg: "rgba(41,196,216,.2)", border: "rgba(41,196,216,.4)", color: "var(--gd)" },
  city: { bg: "rgba(245,166,35,.2)", border: "rgba(245,166,35,.4)", color: "var(--cu-l)" },
  mountain: { bg: "rgba(74,194,138,.2)", border: "rgba(74,194,138,.4)", color: "#4AC28A" },
  adventure: { bg: "rgba(220,80,80,.2)", border: "rgba(220,80,80,.4)", color: "#f87171" },
  cultural: { bg: "rgba(167,139,250,.2)", border: "rgba(167,139,250,.4)", color: "#c4b5fd" },
  wildlife: { bg: "rgba(52,211,153,.2)", border: "rgba(52,211,153,.4)", color: "#6ee7b7" },
  tropical: { bg: "rgba(251,191,36,.2)", border: "rgba(251,191,36,.4)", color: "#fde68a" },
};

interface Props {
  dest: Destination;
  listView: boolean;
}

export default function DestinationCard({ dest, listView }: Props) {
  const badge = badgeColors[dest.cat] || badgeColors.beach;

  return (
    <div
      className="rv dc-card"
      style={{
        background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xl)",
        overflow: "hidden", cursor: "pointer", transition: "var(--tr)",
        display: "flex", flexDirection: listView ? "row" : "column",
        ...(listView ? { height: 200 } : {}),
      }}
    >
      {/* Image */}
      <div style={{ height: listView ? 200 : 210, width: listView ? 260 : "auto", position: "relative", overflow: "hidden", flexShrink: 0 }}>
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
        <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.65, marginBottom: 14, flex: 1, ...(listView ? { overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const } : {}) }}>{dest.desc}</div>
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
          <button className="syne" style={{ padding: "9px 18px", background: "var(--cu)", border: "none", borderRadius: 50, color: "#fff", fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", transition: "var(--tr)", display: "flex", alignItems: "center", gap: 5 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>flight_takeoff</span>Explore
          </button>
        </div>
      </div>
    </div>
  );
}
