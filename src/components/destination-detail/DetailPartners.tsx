"use client";

interface DetailPartnersProps {
  partners?: string[];
}

export default function DetailPartners({ partners }: DetailPartnersProps) {
  if (!partners || partners.length === 0) return null;

  return (
    <section id="partners" style={{ padding: "60px 0", background: "var(--gn)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />Trusted Partners
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>
            Our <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Partners</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 560, margin: "10px auto 0" }}>We work with the best in the industry to deliver exceptional experiences.</p>
        </div>
        <div className="rv" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 36 }}>
          {partners.map((partner, i) => {
            // If partner is a URL (image), render as an image; otherwise render as text chip
            const isUrl = partner.startsWith("http") || partner.startsWith("/");
            return isUrl ? (
              <div key={i} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 12, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={partner} alt={`Partner ${i + 1}`} style={{ height: 32, maxWidth: 120, objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.8 }} />
              </div>
            ) : (
              <div key={i} className="syne pt-chip-item" style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12, padding: "14px 28px", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", letterSpacing: 1, transition: "var(--tr)" }}>{partner}</div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .pt-chip-item:hover { background: rgba(255,255,255,.12) !important; color: #fff !important; border-color: rgba(255,255,255,.25) !important; }
      `}</style>
    </section>
  );
}
