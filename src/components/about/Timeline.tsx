"use client";

const events = [
  { year: "2014", title: "The Beginning", desc: "LetsLive Tours founded with a team of 3 passionate travelers and a vision to redefine premium travel.", side: "left" },
  { year: "2016", title: "First 10,000 Travelers", desc: "Reached a major milestone \u2014 10,000 happy travelers and expanded to 15 destinations across Asia.", side: "right" },
  { year: "2018", title: "Award Recognition", desc: "Won \u201CBest Tour Operator \u2014 Asia\u201D at the Global Travel Awards. Expanded team to 50+ members.", side: "left" },
  { year: "2020", title: "Global Expansion", desc: "Launched European and Middle Eastern packages. Introduced 24/7 concierge support.", side: "right" },
  { year: "2022", title: "Sustainability Initiative", desc: "Partnered with 100+ eco-certified hotels and launched carbon-offset program for all flights.", side: "left" },
  { year: "2026", title: "2 Million Travelers", desc: "Celebrated 2 million happy travelers and 500+ destinations worldwide. The journey continues.", side: "right" },
];

export default function Timeline() {
  return (
    <section id="timeline" style={{ padding: "100px 0", background: "var(--gn)", position: "relative", overflow: "hidden" }}>
      {/* Center line */}
      <div className="tl-line" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1, height: "100%", background: "rgba(249,246,240,.1)" }} />

      <div className="container">
        {/* Head */}
        <div className="rv" style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
            Our Journey
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, color: "var(--iv)", marginTop: 12 }}>
            A <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Decade</em> of Excellence
          </h2>
        </div>

        {/* Items */}
        <div className="tl-items" style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 1000, margin: "0 auto" }}>
          {events.map((e, i) => (
            <div key={i} className="rv tl-item" style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", alignItems: "center", gap: 0, padding: "20px 0" }}>
              {e.side === "left" ? (
                <>
                  <div style={{ paddingRight: 40, textAlign: "right" }}>
                    <div className="tl-content" style={{ background: "rgba(249,246,240,.05)", border: "1px solid rgba(249,246,240,.1)", borderRadius: "var(--r)", padding: "28px 32px", transition: "var(--tr)" }}>
                      <div className="serif" style={{ fontSize: 32, fontWeight: 700, color: "var(--cu)", lineHeight: 1, marginBottom: 8 }}>{e.year}</div>
                      <div className="syne" style={{ fontSize: 15, fontWeight: 700, color: "var(--iv)", marginBottom: 8 }}>{e.title}</div>
                      <div style={{ fontSize: 13.5, color: "rgba(249,246,240,.5)", lineHeight: 1.68 }}>{e.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="tl-dot" style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--cu)", border: "3px solid var(--gn)", boxShadow: "0 0 0 4px rgba(245,166,35,.3)" }} />
                  </div>
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="tl-dot" style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--cu)", border: "3px solid var(--gn)", boxShadow: "0 0 0 4px rgba(245,166,35,.3)" }} />
                  </div>
                  <div style={{ paddingLeft: 40, textAlign: "left" }}>
                    <div className="tl-content" style={{ background: "rgba(249,246,240,.05)", border: "1px solid rgba(249,246,240,.1)", borderRadius: "var(--r)", padding: "28px 32px", transition: "var(--tr)" }}>
                      <div className="serif" style={{ fontSize: 32, fontWeight: 700, color: "var(--cu)", lineHeight: 1, marginBottom: 8 }}>{e.year}</div>
                      <div className="syne" style={{ fontSize: 15, fontWeight: 700, color: "var(--iv)", marginBottom: 8 }}>{e.title}</div>
                      <div style={{ fontSize: 13.5, color: "rgba(249,246,240,.5)", lineHeight: 1.68 }}>{e.desc}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tl-content:hover {
          background: rgba(249,246,240,.09) !important;
          border-color: rgba(249,246,240,.2) !important;
          transform: scale(1.02);
        }
        @media (max-width: 1100px) {
          .tl-line { display: none !important; }
          .tl-items {
            border-left: 2px solid rgba(249,246,240,.12) !important;
            margin-left: 8px !important;
            padding-left: 0 !important;
          }
          .tl-item {
            display: flex !important;
            padding: 16px 0 16px 32px !important;
            position: relative !important;
          }
          .tl-item > div:empty {
            display: none !important;
          }
          .tl-item > div:has(.tl-content) {
            flex: 1 !important;
            padding: 0 !important;
            text-align: left !important;
          }
          .tl-content {
            width: 100% !important;
          }
          .tl-item .tl-dot {
            position: absolute !important;
            left: -9px !important;
            top: 28px !important;
            transform: none !important;
          }
        }
        @media (max-width: 768px) {
          .tl-content {
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
