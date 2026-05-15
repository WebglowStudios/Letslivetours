"use client";

const highlightChips = [
  { icon: "check_circle", text: "Burj Khalifa At the Top" },
  { icon: "check_circle", text: "Desert Safari with BBQ" },
  { icon: "check_circle", text: "Dubai Mall & Fountain Show" },
  { icon: "check_circle", text: "Palm Jumeirah Monorail" },
  { icon: "check_circle", text: "5-Star Hotel Stay" },
  { icon: "check_circle", text: "Airport Transfers Included" },
];

const tripHighlights = [
  "Stand atop the world's tallest building — the iconic Burj Khalifa — and witness Dubai's breathtaking skyline at sunset from the 124th floor observation deck.",
  "Experience the thrill of a traditional desert safari with dune bashing, camel riding, henna painting, and a lavish BBQ dinner under the stars.",
  "Explore the Palm Jumeirah via monorail and visit the legendary Atlantis resort, with optional access to Aquaventure Waterpark.",
  "Stroll through the glittering Dubai Mall — the world's largest — and watch the spectacular Dubai Fountain show every evening.",
  "Enjoy a luxury dhow cruise along Dubai Marina with a live dinner buffet and entertainment as the city lights shimmer around you.",
];

export default function PackageInfo() {
  return (
    <div>
      {/* Title */}
      <h1
        className="serif"
        style={{
          fontSize: "clamp(22px, 3vw, 32px)",
          fontWeight: 700,
          color: "var(--ink)",
          lineHeight: 1.2,
          marginBottom: 14,
        }}
      >
        Dubai Luxury Escape — Burj Khalifa, Desert Safari & Palm Jumeirah
      </h1>

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <span
          className="syne"
          style={{
            fontSize: 12,
            fontWeight: 700,
            background: "var(--gn-gl)",
            color: "var(--gn)",
            padding: "5px 14px",
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 14 }}>calendar_today</span>
          7 Nights / 8 Days
        </span>

        <span
          className="syne"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--ink3)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--gn3)" }}>location_on</span>
          Dubai, UAE
        </span>

        <div
          className="syne"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink2)",
          }}
        >
          <span style={{ color: "var(--cu)", fontSize: 14, letterSpacing: 1 }}>★★★★★</span>
          <span>4.9</span>
          <span style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 12, color: "var(--ink4)", fontWeight: 400 }}>
            (312 reviews)
          </span>
        </div>
      </div>

      {/* Highlight Chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 24,
          padding: "18px 20px",
          background: "#fff",
          borderRadius: "var(--r)",
          border: "1.5px solid var(--line)",
        }}
      >
        {highlightChips.map((chip, i) => (
          <div
            key={i}
            className="syne"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 12.5,
              fontWeight: 600,
              color: "var(--ink2)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--gn3)" }}>
              {chip.icon}
            </span>
            {chip.text}
          </div>
        ))}
      </div>

      {/* Trip Highlights */}
      <div style={{ marginBottom: 28 }}>
        <h2
          className="serif"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--ink)",
            marginBottom: 16,
          }}
        >
          Trip Highlights
        </h2>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tripHighlights.map((item, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 10,
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: 14,
                color: "var(--ink2)",
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--cu)",
                  flexShrink: 0,
                  marginTop: 7,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
