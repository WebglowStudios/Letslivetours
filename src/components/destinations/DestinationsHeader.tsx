"use client";

interface Props {
  activeCat: string;
  setActiveCat: (cat: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

const cats = [
  { label: "All", value: "all", icon: "public" },
  { label: "Beach", value: "beach", icon: "beach_access" },
  { label: "City", value: "city", icon: "location_city" },
  { label: "Mountain", value: "mountain", icon: "landscape" },
  { label: "Adventure", value: "adventure", icon: "hiking" },
  { label: "Cultural", value: "cultural", icon: "museum" },
  { label: "Wildlife", value: "wildlife", icon: "forest" },
  { label: "Tropical", value: "tropical", icon: "sunny" },
];

const stats = [
  { icon: "travel_explore", val: "500", suf: "+", lbl: "Destinations" },
  { icon: "group", val: "2M", suf: "+", lbl: "Happy Travellers" },
  { icon: "star", val: "4.9", suf: "/5", lbl: "Average Rating" },
  { icon: "emoji_events", val: "12", suf: "+", lbl: "Years of Excellence" },
];

export default function DestinationsHeader({ activeCat, setActiveCat, search, setSearch }: Props) {
  return (
    <section id="page-header" style={{ paddingTop: 72, background: "var(--gn)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80" alt="Destinations" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.18) saturate(.5)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,77,94,.97) 0%, rgba(0,122,150,.9) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Inner */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "72px 0 56px" }}>
        <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "var(--cu)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
          Explore the World
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
        </div>
        <h1 className="serif" style={{ fontSize: "clamp(44px, 6vw, 80px)", fontWeight: 700, lineHeight: 1, letterSpacing: -2, color: "#fff", marginBottom: 14 }}>
          Discover <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Amazing</em><br />Destinations
        </h1>
        <p style={{ fontSize: 16, color: "rgba(249,246,240,.6)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
          Explore the world&apos;s most beautiful places and create unforgettable memories with our handpicked collection.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <span className="material-symbols-rounded" style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", fontSize: 20, color: "var(--ink3)" }}>search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations, activities, or experiences\u2026"
            style={{ width: "100%", padding: "17px 20px 17px 54px", background: "#fff", border: "none", borderRadius: 50, fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 15, color: "var(--ink)", outline: "none", boxShadow: "0 8px 40px rgba(0,0,0,.2)" }}
          />
          <button className="syne" style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", padding: "10px 24px", background: "var(--cu)", border: "none", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "var(--tr)" }}>Search</button>
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", padding: "28px 0 0" }}>
          {cats.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveCat(c.value)}
              className="syne"
              style={{
                padding: "8px 20px", borderRadius: 50, fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
                cursor: "pointer", transition: "var(--tr)", display: "flex", alignItems: "center", gap: 6,
                ...(activeCat === c.value
                  ? { background: "var(--cu)", color: "#fff", border: "1px solid var(--cu)", boxShadow: "0 4px 16px rgba(245,166,35,.4)" }
                  : { background: "transparent", color: "rgba(249,246,240,.6)", border: "1px solid rgba(249,246,240,.2)" }
                ),
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 15 }}>{c.icon}</span>{c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "rgba(0,0,0,.25)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(249,246,240,.08)" }}>
        <div style={{ display: "flex", alignItems: "stretch", maxWidth: 1360, margin: "0 auto", padding: "0 48px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "16px 24px", borderRight: "1px solid rgba(249,246,240,.08)", display: "flex", alignItems: "center", gap: 12 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--cu)" }}>{s.icon}</span>
              <div>
                <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.val}<span style={{ color: "var(--cu)" }}>{s.suf}</span></div>
                <div style={{ fontSize: 11, color: "rgba(249,246,240,.4)", letterSpacing: 0.5, marginTop: 2 }}>{s.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
