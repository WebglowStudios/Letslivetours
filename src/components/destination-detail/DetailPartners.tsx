"use client";

interface DetailPartnersProps {
  partners?: string[];
}

const BRAND_LOGOS: Record<string, { logo: string; name: string }> = {
  emirates: { logo: "/brands/emirates.png", name: "Emirates" },
  indigo: { logo: "/brands/indigo.png", name: "IndiGo" },
  marriott: { logo: "/brands/marriott.png", name: "Marriott" },
  makemytrip: { logo: "/brands/makemytrip.png", name: "MakeMyTrip" },
  dubai: { logo: "/brands/dubai.png", name: "Dubai Tourism" },
  "incredible india": { logo: "/brands/incredible-india.png", name: "Incredible India" },
  turkey: { logo: "/brands/turkey.png", name: "Türkiye Tourism" },
  türkiye: { logo: "/brands/turkey.png", name: "Türkiye Tourism" },
  uber: { logo: "/brands/uber.png", name: "Uber" },
  zoomcar: { logo: "/brands/zoomcar.png", name: "Zoomcar" },
  visa: { logo: "/brands/visa.png", name: "VISA" },
  razorpay: { logo: "/brands/razorpay.png", name: "Razorpay" },
  payu: { logo: "/brands/payu.png", name: "PayU" },
  bhim: { logo: "/brands/bhim.png", name: "BHIM UPI" },
  "indian bank": { logo: "/brands/indian-bank.png", name: "Indian Bank" },
};

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
            const isUrl = partner.startsWith("http") || partner.startsWith("/");
            const matchedBrand = !isUrl ? BRAND_LOGOS[partner.toLowerCase().trim()] : null;
            const logoSrc = isUrl ? partner : (matchedBrand ? matchedBrand.logo : null);
            const brandLabel = matchedBrand ? matchedBrand.name : partner;

            return logoSrc ? (
              <div
                key={i}
                className="pt-brand-card"
                title={brandLabel}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(255,255,255,.2)",
                  borderRadius: 14,
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,.2)",
                  height: 58,
                  minWidth: 120,
                  transition: "all .3s ease",
                }}
              >
                <img
                  src={logoSrc}
                  alt={brandLabel}
                  style={{ height: 34, maxWidth: 120, objectFit: "contain" }}
                />
              </div>
            ) : (
              <div key={i} className="syne pt-chip-item" style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12, padding: "14px 28px", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", letterSpacing: 1, transition: "var(--tr)" }}>{partner}</div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .pt-brand-card:hover {
          transform: translateY(-2px);
          border-color: var(--cu) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,.35) !important;
        }
        .pt-chip-item:hover { background: rgba(255,255,255,.12) !important; color: #fff !important; border-color: rgba(255,255,255,.25) !important; }
      `}</style>
    </section>
  );
}
