"use client";

export default function AboutHero() {
  return (
    <section
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        paddingTop: 72,
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
          alt="About LetsLive Tours"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.4)" }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(135deg, rgba(0,77,94,.92) 0%, rgba(0,50,62,.85) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: 1360,
          margin: "0 auto",
          padding: "72px 48px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 48,
          flexWrap: "wrap",
        }}
        className="about-hero-inner"
      >
        {/* Left: text content */}
        <div style={{ maxWidth: 620, flex: 1, minWidth: 320 }}>
          <div
            className="syne"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 3.5,
              textTransform: "uppercase",
              color: "var(--cu)",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            Who We Are
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
              color: "#fff",
              marginBottom: 18,
            }}
          >
            Crafting Journeys<br />
            That <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Matter</em>.
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "rgba(249,246,240,.6)",
              lineHeight: 1.7,
              maxWidth: 500,
              marginBottom: 32,
            }}
          >
            For over 12 years, we&apos;ve been turning travel dreams into reality — one
            extraordinary journey at a time. We&apos;re your partners in exploration.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#story"
              className="syne"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                background: "var(--cu)",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textDecoration: "none",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(245,166,35,.3)",
                transition: "var(--tr)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>explore</span>
              Our Story
            </a>
            <a
              href="#team"
              className="syne"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 26px",
                background: "transparent",
                color: "rgba(249,246,240,.8)",
                border: "1.5px solid rgba(249,246,240,.25)",
                borderRadius: 50,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textDecoration: "none",
                cursor: "pointer",
                transition: "var(--tr)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>group</span>
              Meet the Team
            </a>
          </div>
        </div>

        {/* Right: quick stats */}
        <div
          className="about-hero-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            minWidth: 280,
          }}
        >
          {[
            { val: "12+", lbl: "Years" },
            { val: "2M+", lbl: "Travellers" },
            { val: "500+", lbl: "Destinations" },
            { val: "28+", lbl: "Awards" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(249,246,240,.1)",
                borderRadius: 16,
                padding: "20px 22px",
                textAlign: "center",
              }}
            >
              <div
                className="serif"
                style={{ fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1 }}
              >
                {s.val.replace("+", "")}
                <span style={{ color: "var(--cu)" }}>+</span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(249,246,240,.5)",
                  marginTop: 4,
                  letterSpacing: 0.5,
                }}
              >
                {s.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .about-hero-inner {
            padding: 56px 24px 64px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .about-hero-stats {
            width: 100% !important;
            max-width: 320px !important;
          }
        }
        @media (max-width: 480px) {
          .about-hero-stats {
            gap: 10px !important;
          }
          .about-hero-stats > div {
            padding: 14px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
