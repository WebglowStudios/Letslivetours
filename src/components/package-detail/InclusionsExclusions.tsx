"use client";

interface InclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
  isInternational?: boolean;
  visaIncluded?: boolean;
  flightsIncluded?: boolean;
  trainsIncluded?: boolean;
}

function cleanItemText(raw: string): string {
  if (!raw) return "";
  return String(raw)
    .replace(/\\u0026amp;/gi, "&")
    .replace(/\\u0026/gi, "&")
    .replace(/&amp;/gi, "&")
    .replace(/\\u003c/gi, "<")
    .replace(/\\u003e/gi, ">")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\\r\\n|\\n|\\r/g, " ")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/^[•\-\*\s–—:]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeList(list: any[]): string[] {
  if (!Array.isArray(list)) return [];
  const res: string[] = [];
  for (const item of list) {
    if (!item) continue;
    const parts = String(item).split(/\\r\\n|\\n|\\r|[\r\n]+/);
    for (const p of parts) {
      const cleaned = cleanItemText(p);
      if (cleaned.length > 2) {
        res.push(cleaned);
      }
    }
  }
  return Array.from(new Set(res));
}

export default function InclusionsExclusions({ inclusions: rawInclusions, exclusions: rawExclusions, isInternational, visaIncluded, flightsIncluded, trainsIncluded }: InclusionsExclusionsProps) {
  let inclusions = sanitizeList(rawInclusions);
  let exclusions = sanitizeList(rawExclusions);



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
    wordBreak: "break-word",
    overflowWrap: "break-word",
    minWidth: 0,
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
            tableLayout: "fixed",
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
                  width: "50%",
                  boxSizing: "border-box",
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
                  width: "50%",
                  boxSizing: "border-box",
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
              <td style={{ width: "50%", boxSizing: "border-box", padding: "16px 18px", verticalAlign: "top", borderRight: "1px solid var(--line)", overflowWrap: "break-word", wordBreak: "break-word" }}>
                {inclusions && inclusions.length > 0 ? (
                  <ul style={listStyle}>
                    {inclusions.map((item, i) => (
                      <li key={i} style={itemStyle}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gn3)", flexShrink: 0, marginTop: 7 }} />
                        <span style={{ flex: 1, minWidth: 0 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span style={{ color: "var(--ink4)", fontSize: 13 }}>None listed</span>
                )}
              </td>
              <td style={{ width: "50%", boxSizing: "border-box", padding: "16px 18px", verticalAlign: "top", overflowWrap: "break-word", wordBreak: "break-word" }}>
                {exclusions && exclusions.length > 0 ? (
                  <ul style={listStyle}>
                    {exclusions.map((item, i) => (
                      <li key={i} style={itemStyle}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cu)", flexShrink: 0, marginTop: 7 }} />
                        <span style={{ flex: 1, minWidth: 0 }}>{item}</span>
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
                    <span style={{ flex: 1, minWidth: 0 }}>{item}</span>
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
                    <span style={{ flex: 1, minWidth: 0 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .ie-table {
          table-layout: fixed;
          width: 100%;
        }
        .ie-table th,
        .ie-table td {
          width: 50% !important;
          box-sizing: border-box;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .ie-mobile { display: none; }
        @media (max-width: 600px) {
          .ie-table { display: none; }
          .ie-mobile { display: block; }
        }
      `}</style>
    </div>
  );
}
