"use client";

export default function Offices() {
  const offices = [
    {
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
      badge: "Headquarters",
      badgeIcon: "star",
      info: [
        { icon: "location_on", text: "12 Travel Square, Bandra West" },
        { icon: "phone", text: "+91 98765 43210" },
        { icon: "schedule", text: "Mon–Sat, 9AM – 8PM" },
      ],
    },
    {
      city: "New Delhi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
      badge: "Branch Office",
      badgeIcon: "location_on",
      info: [
        { icon: "location_on", text: "Connaught Place, New Delhi" },
        { icon: "phone", text: "+91 11 4567 8900" },
        { icon: "schedule", text: "Mon–Sat, 9AM – 7PM" },
      ],
    },
    {
      city: "Bangalore",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80",
      badge: "Branch Office",
      badgeIcon: "location_on",
      info: [
        { icon: "location_on", text: "MG Road, Bangalore" },
        { icon: "phone", text: "+91 80 4567 8900" },
        { icon: "schedule", text: "Mon–Sat, 9AM – 7PM" },
      ],
    },
  ];

  return (
    <section style={{ padding: "96px 0", background: "var(--gn)" }}>
      <div className="container">
        <div className="rv" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
            Our Offices
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, color: "var(--iv)", marginTop: 12 }}>
            Find Us <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Across</em> India
          </h2>
        </div>

        <div className="offices-grid">
          {offices.map((office, i) => (
            <div key={i} className="oc rv" style={{ background: "rgba(249,246,240,.05)", border: "1px solid rgba(249,246,240,.1)", borderRadius: "var(--r-xl)", overflow: "hidden", transition: "var(--tr)" }}>
              <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
                <img src={office.image} alt={office.city} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.65) saturate(.8)", transition: "filter .5s, transform .6s" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.8) 0%, transparent 60%)" }} />
                <div className="serif" style={{ position: "absolute", bottom: 14, left: 16, fontSize: 22, fontWeight: 700, color: "#fff" }}>{office.city}</div>
              </div>
              <div style={{ padding: 22 }}>
                <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(245,166,35,.15)", border: "1px solid rgba(245,166,35,.3)", borderRadius: 50, padding: "4px 12px", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--cu)", marginBottom: 14 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 11 }}>{office.badgeIcon}</span>{office.badge}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {office.info.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "rgba(249,246,240,.55)" }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--gd)", flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .offices-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .oc:hover {
          background: rgba(249,246,240,.09) !important;
          border-color: rgba(249,246,240,.22) !important;
          transform: translateY(-6px);
          box-shadow: 0 20px 56px rgba(0,0,0,.3);
        }
        .oc:hover img {
          filter: brightness(.85) saturate(1) !important;
          transform: scale(1.05);
        }
        @media (max-width: 1100px) {
          .offices-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .offices-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
