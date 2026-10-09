"use client";

const partnerBrands = [
  { name: "Emirates", logo: "/brands/emirates.png" },
  { name: "IndiGo", logo: "/brands/indigo.png" },
  { name: "Marriott", logo: "/brands/marriott.png" },
  { name: "MakeMyTrip", logo: "/brands/makemytrip.png" },
  { name: "Dubai Tourism", logo: "/brands/dubai.png" },
  { name: "Incredible India", logo: "/brands/incredible-india.png" },
  { name: "Türkiye Tourism", logo: "/brands/turkey.png" },
  { name: "Uber", logo: "/brands/uber.png" },
  { name: "Zoomcar", logo: "/brands/zoomcar.png" },
  { name: "VISA", logo: "/brands/visa.png" },
  { name: "Razorpay", logo: "/brands/razorpay.png" },
  { name: "PayU", logo: "/brands/payu.png" },
  { name: "BHIM UPI", logo: "/brands/bhim.png" },
  { name: "Indian Bank", logo: "/brands/indian-bank.png" },
];

export default function Partners() {
  return (
    <section id="partners" style={{ padding: "64px 0", background: "var(--gn)", borderTop: "1px solid rgba(249,246,240,.08)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            className="syne"
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "var(--cu)",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 20, height: 1.5, background: "var(--cu)", opacity: 0.6 }} />
            Trusted Global Network
            <span style={{ width: 20, height: 1.5, background: "var(--cu)", opacity: 0.6 }} />
          </div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Partnered With World-Class Brands
          </h2>
          <p
            style={{
              fontSize: 13.5,
              color: "rgba(249,246,240,.6)",
              marginTop: 8,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            We collaborate with premier airlines, luxury hotel chains, and secure payment networks to guarantee seamless journeys.
          </p>
        </div>

        {/* Brands Logo Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 14,
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 1160,
            margin: "0 auto",
          }}
        >
          {partnerBrands.map((b, i) => (
            <div
              key={i}
              className="brand-card"
              title={b.name}
              style={{
                height: 64,
                backgroundColor: "#ffffff",
                borderRadius: 14,
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 18px rgba(0, 20, 28, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
              }}
            >
              <img
                src={b.logo}
                alt={b.name}
                loading="lazy"
                style={{
                  maxHeight: 38,
                  maxWidth: "100%",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brand-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          border-color: var(--cu) !important;
        }
        .brand-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
