"use client";

interface HighlightsProps {
  destinationName?: string;
  photoGallery?: { image: string; label: string }[];
}

export default function Highlights({ destinationName = "Dubai", photoGallery }: HighlightsProps) {
  if (!photoGallery || photoGallery.length === 0) return null;

  // Layout: first image is big (left), rest fill 2x2 grid (right)
  const mainPhoto = photoGallery[0];
  const gridPhotos = photoGallery.slice(1, 5);

  return (
    <section id="highlights" style={{ padding: "80px 0", background: "var(--gn)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <div className="rv" style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />Photo Gallery
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>
            {destinationName} <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Highlights</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.7, maxWidth: 560, margin: "10px auto 0" }}>
            From golden deserts to glittering skylines — every frame tells a story.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="rv hl-photo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, borderRadius: "var(--r-xl)", overflow: "hidden" }}>
          {/* Big main image */}
          <div style={{ gridRow: "span 2", position: "relative", minHeight: 420, borderRadius: "var(--r-xl)", overflow: "hidden" }}>
            <img src={mainPhoto.image} alt={mainPhoto.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.6) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: 20, left: 20, display: "flex", alignItems: "center", gap: 6 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)" }}>location_on</span>
              <span className="syne" style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mainPhoto.label}</span>
            </div>
          </div>

          {/* 2x2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {gridPhotos.map((photo, i) => (
              <div key={i} style={{ position: "relative", height: 200, borderRadius: "var(--r)", overflow: "hidden" }}>
                <img src={photo.image} alt={photo.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.55) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", alignItems: "center", gap: 5 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--cu)" }}>location_on</span>
                  <span className="syne" style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{photo.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hl-photo-grid { grid-template-columns: 1fr !important; }
          .hl-photo-grid > div:first-child { min-height: 280px !important; grid-row: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
