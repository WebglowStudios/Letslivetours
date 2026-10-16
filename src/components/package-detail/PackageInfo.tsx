"use client";

interface PackageInfoProps {
  pkg: any;
}

function parseBulletPoints(text: string | null | undefined): { isList: boolean; items: string[] } {
  if (!text) return { isList: false, items: [] };

  const raw = String(text).trim();
  if (!raw) return { isList: false, items: [] };

  const hasBulletChar = /[•●▪■]/.test(raw);
  const hasNewlines = raw.includes("\n") || raw.includes("\\n");

  if (!hasBulletChar && !hasNewlines) {
    return { isList: false, items: [raw] };
  }

  const parts = raw
    .split(/(?:\s*[•●▪■]\s*|\\r\\n|\\n|\\r|[\r\n]+)/)
    .map((s) => s.replace(/^[•\-\*\s–—:]+/, "").trim())
    .filter((s) => s.length > 2);

  if (parts.length > 1 || (parts.length === 1 && (hasBulletChar || raw.startsWith("•")))) {
    return { isList: true, items: parts };
  }

  return { isList: false, items: [raw] };
}

export default function PackageInfo({ pkg }: PackageInfoProps) {
  const name = pkg?.name || "Package";
  const destinationName = pkg?.destination?.name || pkg?.customDestinationText;
  const destinationCountry = pkg?.destination?.country;
  const duration = pkg?.duration;
  const hotelRating = pkg?.hotelRating;
  const rating = pkg?.rating || 0;
  const reviewCount = pkg?.reviewCount || 0;
  const keyPoints = pkg?.keyPoints || [];
  const highlights = pkg?.highlights || [];
  const description = pkg?.shortDescription || pkg?.description || "";

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const starStr = "★".repeat(fullStars) + (hasHalf ? "½" : "");

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
        {name}
      </h1>

      {/* Meta row */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 18 }}>
        {duration && (
          <span className="syne" style={{ fontSize: 12, fontWeight: 700, background: "var(--gn-gl)", color: "var(--gn)", padding: "5px 14px", borderRadius: 50, display: "flex", alignItems: "center", gap: 5 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>calendar_today</span>
            {duration.nights} Nights / {duration.days} Days
          </span>
        )}
        {destinationName && (
          <span className="syne" style={{ fontSize: 13, fontWeight: 500, color: "var(--ink3)", display: "flex", alignItems: "center", gap: 5 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--gn3)" }}>location_on</span>
            {destinationName}{destinationCountry ? `, ${destinationCountry}` : ""}
          </span>
        )}
        {hotelRating && (
          <span className="syne" style={{ fontSize: 12, fontWeight: 700, background: "rgba(41,196,216,.12)", color: "var(--gn2)", padding: "5px 14px", borderRadius: 50, display: "flex", alignItems: "center", gap: 5 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>hotel</span>
            {hotelRating}
          </span>
        )}
        {rating > 0 && (
          <div className="syne" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--ink2)" }}>
            <span style={{ color: "var(--cu)", fontSize: 14, letterSpacing: 1 }}>{starStr}</span>
            <span>{rating}</span>
            {reviewCount > 0 && (
              <span style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 12, color: "var(--ink4)", fontWeight: 400 }}>
                ({reviewCount} reviews)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Key Points — checkmark chips box */}
      {keyPoints.length > 0 && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24,
          padding: "18px 20px", background: "#fff", borderRadius: "var(--r)", border: "1.5px solid var(--line)",
        }}>
          {keyPoints.map((chip: string, i: number) => (
            <div key={i} className="syne" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: "var(--ink2)" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--gn3)" }}>check_circle</span>
              {chip}
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      {description && (() => {
        const { isList, items } = parseBulletPoints(description);
        if (isList && items.length > 1) {
          return (
            <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24, padding: 0, listStyle: "none" }}>
              {items.map((pt, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 14, color: "var(--ink3)", lineHeight: 1.65 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gn3)", flexShrink: 0, marginTop: 7 }} />
                  <span style={{ flex: 1, minWidth: 0 }}>{pt}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 14, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 24 }}>
            {items[0] || description}
          </p>
        );
      })()}

      {/* Trip Highlights — bullet list */}
      {highlights.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>
            Trip Highlights
          </h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {highlights.map((item: string, i: number) => (
              <li key={i} style={{ display: "flex", gap: 10, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 14, color: "var(--ink2)", lineHeight: 1.6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--cu)", flexShrink: 0, marginTop: 7 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
