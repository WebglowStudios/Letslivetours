"use client";

export default function AboutHero({ data }: { data?: any }) {
  return (
    <section style={{ width: "100%", position: "relative", overflow: "hidden", minHeight: "75vh", display: "flex", alignItems: "center" }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={data?.bgImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"} alt="About LetsLive Tours" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(0,77,94,.92) 0%, rgba(0,40,52,.88) 100%)" }} />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 3, padding: "160px 48px 80px" }}>
        <div style={{ maxWidth: 700 }}>
          <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3.5, textTransform: "uppercase", color: "var(--cu)", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            About LetsLive
          </div>

          <h1 className="serif" style={{ fontSize: "clamp(38px, 5.5vw, 62px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: -1, color: "#fff", marginBottom: 22 }} dangerouslySetInnerHTML={{ __html: data?.title || "Every Trip, Planned As If<br /><em style=\"font-style: italic; color: var(--gd)\">We&apos;re the Travelers</em>." }} />

          <p style={{ fontSize: 16, color: "rgba(249,246,240,.6)", lineHeight: 1.75, maxWidth: 560, marginBottom: 36 }}>
            {data?.subtitle || "Founded in 2021, LetsLive simplifies holiday planning by combining personalized service, technology-driven convenience, and a deep understanding of what makes travel truly memorable."}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#story" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "var(--cu)", color: "#fff", border: "none", borderRadius: 50, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textDecoration: "none", boxShadow: "0 6px 20px rgba(245,166,35,.3)", transition: "var(--tr)" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>explore</span>
              Our Story
            </a>
            <a href="/contact" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", background: "transparent", color: "rgba(249,246,240,.8)", border: "1.5px solid rgba(249,246,240,.25)", borderRadius: 50, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textDecoration: "none", transition: "var(--tr)" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>support_agent</span>
              Talk to Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
