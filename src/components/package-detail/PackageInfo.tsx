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
    <div style={{ minWidth: 0, maxWidth: "100%", width: "100%", boxSizing: "border-box" }}>
      {/* Title */}
      <h1
        className="serif"
        style={{
          fontSize: "clamp(22px, 3vw, 32px)",
          fontWeight: 700,
          color: "var(--ink)",
          lineHeight: 1.25,
          marginBottom: 14,
          wordBreak: "break-word",
          overflowWrap: "break-word",
          minWidth: 0,
          maxWidth: "100%",
        }}
      >
        {name}
      </h1>

      {/* Meta row */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 18, minWidth: 0, maxWidth: "100%" }}>
        {duration && (
          <span className="syne" style={{ fontSize: 12, fontWeight: 700, background: "var(--gn-gl)", color: "var(--gn)", padding: "5px 14px", borderRadius: 50, display: "flex", alignItems: "center", gap: 5, maxWidth: "100%", boxSizing: "border-box" }}>
            <span className="material-symbols-rounded" style={{ fontSize: 14, flexShrink: 0 }}>calendar_today</span>
            <span>{duration.nights} Nights / {duration.days} Days</span>
          </span>
        )}
        {destinationName && (
          <span className="syne" style={{ fontSize: 13, fontWeight: 500, color: "var(--ink3)", display: "flex", alignItems: "center", gap: 5, maxWidth: "100%", boxSizing: "border-box" }}>
            <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--gn3)", flexShrink: 0 }}>location_on</span>
            <span style={{ wordBreak: "break-word" }}>{destinationName}{destinationCountry ? `, ${destinationCountry}` : ""}</span>
          </span>
        )}
        {hotelRating && (
          <span className="syne" style={{ fontSize: 12, fontWeight: 700, background: "rgba(41,196,216,.12)", color: "var(--gn2)", padding: "5px 14px", borderRadius: 50, display: "flex", alignItems: "center", gap: 5, maxWidth: "100%", boxSizing: "border-box" }}>
            <span className="material-symbols-rounded" style={{ fontSize: 14, flexShrink: 0 }}>hotel</span>
            <span>{hotelRating}</span>
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

      {/* Key Points — checkmark card with proper wrapping and top-aligned checkmarks */}
      {keyPoints.length > 0 && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 24,
          padding: "18px 20px",
          background: "#fff",
          borderRadius: "var(--r)",
          border: "1.5px solid var(--line)",
          maxWidth: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          minWidth: 0,
        }}>
          {keyPoints.map((chip: string, i: number) => (
            <div
              key={i}
              className="syne"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 9,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink2)",
                lineHeight: 1.55,
                minWidth: 0,
                width: "100%",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: 17,
                  color: "var(--gn3)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                check_circle
              </span>
              <span style={{ flex: 1, minWidth: 0, wordBreak: "break-word", overflowWrap: "anywhere" }}>
                {chip}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      {description && (() => {
        const { isList, items } = parseBulletPoints(description);
        if (isList && items.length > 1) {
          return (
            <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24, padding: 0, listStyle: "none", minWidth: 0, maxWidth: "100%" }}>
              {items.map((pt, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 14, color: "var(--ink3)", lineHeight: 1.65, minWidth: 0, wordBreak: "break-word", overflowWrap: "break-word" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gn3)", flexShrink: 0, marginTop: 7 }} />
                  <span style={{ flex: 1, minWidth: 0, wordBreak: "break-word", overflowWrap: "break-word" }}>{pt}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 14, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 24, wordBreak: "break-word", overflowWrap: "break-word", minWidth: 0, maxWidth: "100%" }}>
            {items[0] || description}
          </p>
        );
      })()}

      {/* Trip Highlights — bullet list */}
      {highlights.length > 0 && (
        <div style={{ marginBottom: 28, minWidth: 0, maxWidth: "100%" }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>
            Trip Highlights
          </h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: 10, padding: 0, listStyle: "none", minWidth: 0, maxWidth: "100%" }}>
            {highlights.map((item: string, i: number) => (
              <li key={i} style={{ display: "flex", gap: 10, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 14, color: "var(--ink2)", lineHeight: 1.6, minWidth: 0, wordBreak: "break-word", overflowWrap: "break-word" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--cu)", flexShrink: 0, marginTop: 7 }} />
                <span style={{ flex: 1, minWidth: 0, wordBreak: "break-word", overflowWrap: "break-word" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
