"use client";

const inclusions = [
  "7 nights accommodation (4N Jumeirah Emirates Towers + 3N Atlantis The Palm)",
  "Daily breakfast at hotel",
  "Return airport transfers in private AC vehicle",
  "All sightseeing transfers throughout the trip",
  "Burj Khalifa At the Top (124th floor) tickets",
  "Desert safari with BBQ dinner and live entertainment",
  "Dubai Marina Dhow Cruise with dinner",
  "Palm Jumeirah Monorail tickets",
  "Dubai Frame entry tickets",
  "Old Dubai heritage tour with English-speaking guide",
  "Traditional Emirati lunch on Day 4",
  "Welcome dinner on Day 1",
  "Aquaventure Waterpark access (Atlantis stay)",
  "All applicable taxes and service charges",
];

const exclusions = [
  "International airfare to/from Dubai",
  "UAE Tourist Visa fees (we assist with application)",
  "Travel insurance (strongly recommended)",
  "Lunches and dinners not mentioned in itinerary",
  "Personal expenses, tips, and gratuities",
  "Optional activities (helicopter tour, hot air balloon)",
  "Alcoholic beverages",
  "Porterage at hotels",
  "Any services not mentioned in inclusions",
];

export default function InclusionsExclusions() {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2
        className="serif"
        style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}
      >
        Inclusions & Exclusions
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "var(--r)",
            overflow: "hidden",
            border: "1.5px solid var(--line)",
          }}
        >
          <thead>
            <tr>
              <th
                className="syne"
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "14px 18px",
                  textAlign: "left",
                  background: "rgba(0,174,204,.08)",
                  color: "var(--gn2)",
                  borderRight: "1px solid var(--line)",
                }}
              >
                ✓ &nbsp;Inclusions
              </th>
              <th
                className="syne"
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "14px 18px",
                  textAlign: "left",
                  background: "rgba(245,166,35,.07)",
                  color: "var(--cu-d)",
                }}
              >
                ✗ &nbsp;Exclusions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "16px 18px",
                  verticalAlign: "top",
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontSize: 13.5,
                  color: "var(--ink3)",
                  lineHeight: 1.7,
                  borderRight: "1px solid var(--line)",
                }}
              >
                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {inclusions.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--gn3)",
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
              <td
                style={{
                  padding: "16px 18px",
                  verticalAlign: "top",
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontSize: 13.5,
                  color: "var(--ink3)",
                  lineHeight: 1.7,
                }}
              >
                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {exclusions.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--cu)",
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
