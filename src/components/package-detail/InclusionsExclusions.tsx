"use client";

interface InclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export default function InclusionsExclusions({ inclusions, exclusions }: InclusionsExclusionsProps) {
  // Don't render if both are empty
  if ((!inclusions || inclusions.length === 0) && (!exclusions || exclusions.length === 0)) {
    return null;
  }

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
                {inclusions && inclusions.length > 0 ? (
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
                ) : (
                  <span style={{ color: "var(--ink4)", fontSize: 13 }}>None listed</span>
                )}
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
                {exclusions && exclusions.length > 0 ? (
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
                ) : (
                  <span style={{ color: "var(--ink4)", fontSize: 13 }}>None listed</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
