"use client";

const services = [
  { icon: "public", label: "Customized International & Domestic Holidays" },
  { icon: "groups", label: "Group Tours" },
  { icon: "lock", label: "Private Tours" },
  { icon: "diamond", label: "Luxury Travel Experiences" },
  { icon: "savings", label: "Budget-Friendly Packages" },
  { icon: "assignment", label: "Visa Assistance" },
  { icon: "flight", label: "Flight Bookings" },
  { icon: "hotel", label: "Hotel Reservations" },
  { icon: "badge", label: "Passport Filing Assistance" },
  { icon: "tour", label: "Sightseeing Tours" },
  { icon: "confirmation_number", label: "Attraction Tickets" },
  { icon: "edit_note", label: "Personalized Itinerary Planning" },
];

export default function Services() {
  return (
    <section style={{ padding: "100px 0", background: "var(--iv)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv" style={{ marginBottom: 52 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            What We Offer
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(34px, 4.5vw, 52px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: -1, marginTop: 12 }}>
            End-to-End <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Travel Services</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", marginTop: 12, lineHeight: 1.72, maxWidth: 500 }}>
            From the first spark of inspiration to your safe return home, we handle every detail.
          </p>
        </div>

        {/* Grid */}
        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {services.map((s, i) => (
            <div key={i} className="rv svc-item" style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px", background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r)", transition: "var(--tr)" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--gn2)", flexShrink: 0 }}>{s.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink2)", lineHeight: 1.4 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .svc-item:hover {
          border-color: var(--gn3) !important;
          box-shadow: var(--sh);
          transform: translateY(-2px);
        }
        @media (max-width: 1100px) {
          .svc-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
