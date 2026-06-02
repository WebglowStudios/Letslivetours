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

export default function DestinationsHeader({ activeCat, setActiveCat, search, setSearch }: Props) {
  return (
    <section
      id="page-header"
      style={{
        paddingTop: 72,
        background: "var(--gn)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80"
          alt="Destinations"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.15) saturate(.5)" }}
        />
      </div>
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,77,94,.95) 0%, rgba(0,122,150,.88) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "48px 20px 40px" }}>
        {/* Eyebrow */}
        <div
          className="syne"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 3.5,
            textTransform: "uppercase",
            color: "var(--cu)",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span style={{ display: "block", width: 18, height: 1.5, background: "var(--cu)" }} />
          Explore the World
          <span style={{ display: "block", width: 18, height: 1.5, background: "var(--cu)" }} />
        </div>

        {/* Title */}
        <h1
          className="serif"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1,
            color: "#fff",
            marginBottom: 10,
          }}
        >
          Find Your Next Destination
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "rgba(249,246,240,.55)",
            lineHeight: 1.6,
            maxWidth: 460,
            margin: "0 auto 28px",
          }}
        >
          Search from our handpicked collection of destinations worldwide.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
          <span
            className="material-symbols-rounded"
            style={{
              position: "absolute",
              left: 18,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 20,
              color: "var(--ink3)",
            }}
          >
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations, activities..."
            style={{
              width: "100%",
              padding: "15px 120px 15px 50px",
              background: "#fff",
              border: "none",
              borderRadius: 50,
              fontFamily: "var(--font-inter),'Inter',sans-serif",
              fontSize: 14,
              color: "var(--ink)",
              outline: "none",
              boxShadow: "0 6px 28px rgba(0,0,0,.15)",
            }}
          />
          <button
            className="syne"
            style={{
              position: "absolute",
              right: 5,
              top: "50%",
              transform: "translateY(-50%)",
              padding: "10px 22px",
              background: "var(--cu)",
              border: "none",
              borderRadius: 50,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              transition: "var(--tr)",
            }}
          >
            Search
          </button>
        </div>

        {/* Category pills */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            flexWrap: "wrap",
            paddingTop: 24,
          }}
        >
          {cats.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveCat(c.value)}
              className="syne"
              style={{
                padding: "7px 16px",
                borderRadius: 50,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.3,
                cursor: "pointer",
                transition: "var(--tr)",
                display: "flex",
                alignItems: "center",
                gap: 5,
                ...(activeCat === c.value
                  ? {
                      background: "var(--cu)",
                      color: "#fff",
                      border: "1px solid var(--cu)",
                      boxShadow: "0 3px 12px rgba(245,166,35,.35)",
                    }
                  : {
                      background: "transparent",
                      color: "rgba(249,246,240,.55)",
                      border: "1px solid rgba(249,246,240,.18)",
                    }),
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                {c.icon}
              </span>
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
