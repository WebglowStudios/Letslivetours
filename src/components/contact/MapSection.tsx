"use client";

export default function MapSection() {
  const addressItems = [
    { icon: "location_on", text: "12 Travel Square, Bandra West, Mumbai, Maharashtra 400050" },
    { icon: "train", text: "5 min walk from Bandra Station (West Exit)" },
    { icon: "local_parking", text: "Free parking available in the building" },
  ];

  return (
    <section style={{ padding: 0, background: "var(--iv2)", borderTop: "1px solid var(--line)" }}>
      <div className="map-inner">
        <div className="map-info rv-l" style={{ padding: "64px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            Find Us
          </div>
          <h3 className="serif" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginTop: 12, marginBottom: 16 }}>
            Our <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Mumbai</em><br />Headquarters
          </h3>
          <p style={{ fontSize: 14.5, color: "var(--ink3)", lineHeight: 1.72, marginBottom: 28 }}>
            Drop by our office for a face-to-face consultation with our travel experts. We&apos;d love to meet you and plan your journey in person.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
            {addressItems.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 13.5, color: "var(--ink2)" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 17, color: "var(--cu)", flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
          <button className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "var(--cu)", color: "#fff", border: "none", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", boxShadow: "0 8px 28px rgba(245,166,35,.35)", transition: "var(--tr)" }}>
            <span className="material-symbols-rounded">directions</span>Get Directions
          </button>
        </div>
        <div className="map-frame rv-r" style={{ position: "relative", overflow: "hidden", minHeight: 480, background: "var(--iv3)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4!2d72.8296!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNDknNDYuNiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="LetsLive Tours Office Location"
            style={{ width: "100%", height: "100%", minHeight: 480, border: "none", filter: "saturate(.8) contrast(1.05)" }}
          />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to right, var(--iv2) 0%, transparent 8%)" }} />
        </div>
      </div>

      <style jsx>{`
        .map-inner {
          display: grid;
          grid-template-columns: 1fr 2fr;
        }
        @media (max-width: 1100px) {
          .map-inner {
            grid-template-columns: 1fr;
          }
          .map-frame {
            min-height: 320px !important;
          }
          .map-frame iframe {
            min-height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}
