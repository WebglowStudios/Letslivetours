"use client";

interface InclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
  isInternational?: boolean;
  visaIncluded?: boolean;
}

export default function InclusionsExclusions({ inclusions: rawInclusions, exclusions: rawExclusions, isInternational, visaIncluded }: InclusionsExclusionsProps) {
  let inclusions = [...(rawInclusions || [])];
  let exclusions = [...(rawExclusions || [])];

  if (isInternational) {
    if (visaIncluded) {
      inclusions.unshift("Visa");
    } else {
      exclusions.unshift("Visa");
    }
  }

  if ((!inclusions || inclusions.length === 0) && (!exclusions || exclusions.length === 0)) {
    return null;
  }

  const listStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    fontFamily: "var(--font-inter), 'Inter', sans-serif",
    fontSize: 13.5,
    color: "var(--ink3)",
    lineHeight: 1.7,
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <h2
        className="serif"
        style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}
      >
        Inclusions & Exclusions
      </h2>

      {/* Desktop: side-by-side table | Mobile: stacked cards */}
      <div className="ie-table-wrap">
        {/* Desktop table */}
        <table
          className="ie-table"
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
              <td style={{ padding: "16px 18px", verticalAlign: "top", borderRight: "1px solid var(--line)" }}>
                {inclusions && inclusions.length > 0 ? (
                  <ul style={listStyle}>
                    {inclusions.map((item, i) => (
                      <li key={i} style={itemStyle}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gn3)", flexShrink: 0, marginTop: 7 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span style={{ color: "var(--ink4)", fontSize: 13 }}>None listed</span>
                )}
              </td>
              <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                {exclusions && exclusions.length > 0 ? (
                  <ul style={listStyle}>
                    {exclusions.map((item, i) => (
                      <li key={i} style={itemStyle}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cu)", flexShrink: 0, marginTop: 7 }} />
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

        {/* Mobile stacked cards */}
        <div className="ie-mobile">
          {inclusions && inclusions.length > 0 && (
            <div style={{
              background: "rgba(0,174,204,.05)",
              border: "1.5px solid var(--line)",
              borderRadius: "var(--r)",
              padding: "14px 16px",
              marginBottom: 10,
            }}>
              <div className="syne" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--gn2)", marginBottom: 12 }}>
                ✓ &nbsp;Inclusions
              </div>
              <ul style={listStyle}>
                {inclusions.map((item, i) => (
                  <li key={i} style={itemStyle}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gn3)", flexShrink: 0, marginTop: 7 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {exclusions && exclusions.length > 0 && (
            <div style={{
              background: "rgba(245,166,35,.05)",
              border: "1.5px solid var(--line)",
              borderRadius: "var(--r)",
              padding: "14px 16px",
            }}>
              <div className="syne" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--cu-d)", marginBottom: 12 }}>
                ✗ &nbsp;Exclusions
              </div>
              <ul style={listStyle}>
                {exclusions.map((item, i) => (
                  <li key={i} style={itemStyle}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cu)", flexShrink: 0, marginTop: 7 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .ie-mobile { display: none; }
        @media (max-width: 600px) {
          .ie-table { display: none; }
          .ie-mobile { display: block; }
        }
      `}</style>
    </div>
  );
}
