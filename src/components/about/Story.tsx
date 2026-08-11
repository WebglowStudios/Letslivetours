 "use client";

export default function Story({ data, vision, mission }: { data?: any, vision?: any, mission?: any }) {
  return (
    <section id="story" style={{ padding: "100px 0", background: "var(--iv)" }}>
      <div className="container">
        <div className="rv story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Image side */}
          <div className="rv-l story-img-side" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 28, left: -20, background: "var(--cu)", color: "#fff", borderRadius: "var(--r)", padding: "16px 20px", textAlign: "center", boxShadow: "0 12px 36px rgba(245,166,35,.4)", zIndex: 2 }}>
              <span className="serif" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1, display: "block" }}>{data?.year || "2021"}</span>
              <span className="syne" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85, marginTop: 3, display: "block" }}>Founded</span>
            </div>
            <div className="story-main-img" style={{ borderRadius: "var(--r-xl)", overflow: "hidden", height: 520 }}>
              <img src={data?.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"} alt="LetsLive Story" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          {/* Text side */}
          <div className="rv-r">
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              Our Story
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginTop: 12, marginBottom: 22 }} dangerouslySetInnerHTML={{ __html: data?.title || "Built Around a<br /><em style=\"font-style: italic; color: var(--cu)\">Simple Belief</em>" }} />
            
            <p style={{ fontSize: 15.5, color: "var(--ink3)", lineHeight: 1.78, marginBottom: 16 }}>
              {data?.text || "LetsLive was born from a simple belief — every trip should be planned as if we were the travelers ourselves. We guide travelers through every stage of their journey, from planning and research to booking and on-ground experiences."}
            </p>
            <p style={{ fontSize: 15.5, color: "var(--ink3)", lineHeight: 1.78, marginBottom: 16 }}>
              {data?.text2 || "Our approach combines personalized service, technology-driven convenience, and a deep understanding of what makes travel truly memorable."}
            </p>
            <p style={{ fontSize: 15.5, color: "var(--ink3)", lineHeight: 1.78, marginBottom: 28 }}>
              {data?.text3 || "Today, we operate as a comprehensive travel platform designed to bring travelers, travel experts, and trusted partners together under one roof."}
            </p>

            {/* Vision + Mission */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--gn-gl)", border: "1px solid rgba(0,77,94,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--gn2)" }}>visibility</span>
                </div>
                <div>
                  <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>{vision?.title || "Our Vision"}</div>
                  <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.65 }}>{vision?.text || "To become the most trusted travel ecosystem for modern travelers by making travel planning simple, transparent, accessible, and enjoyable."}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--gn-gl)", border: "1px solid rgba(0,77,94,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--gn2)" }}>rocket_launch</span>
                </div>
                <div>
                  <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>{mission?.title || "Our Mission"}</div>
                  <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.65 }}>{mission?.text || "Deliver exceptional travel experiences, offer transparent value-for-money services, and build a trusted community of travelers and partners."}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .story-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .story-grid { gap: 40px !important; }
          .story-main-img { height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
