"use client";

const partners = ["Air India", "Emirates", "MakeMyTrip", "Marriott", "Hilton", "IndiGo", "Expedia", "Thomas Cook"];

export default function Partners() {
  return (
    <div id="partners" style={{ padding: "52px 0", background: "var(--gn)", borderTop: "1px solid rgba(249,246,240,.08)" }}>
      <div className="container">
        <div className="syne" style={{ textAlign: "center", fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "rgba(249,246,240,.3)", marginBottom: 28 }}>
          Trusted by leading travel brands worldwide
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {partners.map((p, i) => (
            <div key={i} className="syne p-chip" style={{
              padding: "11px 24px", background: "rgba(249,246,240,.05)",
              border: "1px solid rgba(249,246,240,.1)", borderRadius: 10,
              fontSize: 13.5, fontWeight: 700, color: "rgba(249,246,240,.3)",
              transition: "var(--tr)",
            }}>
              {p}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .p-chip:hover {
          color: var(--iv) !important;
          border-color: rgba(249,246,240,.3) !important;
          background: rgba(249,246,240,.08) !important;
        }
      `}</style>
    </div>
  );
}
