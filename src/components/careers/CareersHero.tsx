"use client";

export default function CareersHero() {
  return (
    <section
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        paddingTop: 72,
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
          alt="Team at LetsLive Tours"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.35)" }}
        />
      </div>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(135deg, rgba(0,50,62,.93) 0%, rgba(0,77,94,.88) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="careers-hero-inner"
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: 1360,
          margin: "0 auto",
          padding: "64px 48px 72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        {/* Left: text */}
        <div style={{ maxWidth: 600, flex: 1, minWidth: 300 }}>
          <div
            className="syne"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 3.5,
              textTransform: "uppercase",
              color: "var(--cu)",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            We&apos;re Hiring
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(34px, 5vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Build a Career<br />
            You <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Love</em>.
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "rgba(249,246,240,.6)",
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: 28,
            }}
          >
            Join passionate travellers, storytellers, and dreamers redefining how India
            experiences the world. Every role here is a journey.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#open-roles"
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
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>work</span>
              View Open Roles
            </a>
            <a
              href="#why-join"
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
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>info</span>
              Why LetsLive?
            </a>
          </div>
        </div>

        {/* Right: stats */}
        <div
          className="careers-hero-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            minWidth: 260,
          }}
        >
          {[
            { val: "200+", lbl: "Team Members" },
            { val: "14", lbl: "Cities" },
            { val: "4.8", lbl: "Glassdoor" },
            { val: "32+", lbl: "Open Roles" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(249,246,240,.1)",
                borderRadius: 14,
                padding: "18px 20px",
                textAlign: "center",
              }}
            >
              <div
                className="serif"
                style={{ fontSize: 24, fontWeight: 700, color: "var(--cu-l)", lineHeight: 1 }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: 10,
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
          .careers-hero-inner {
            padding: 48px 24px 56px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .careers-hero-stats {
            width: 100% !important;
            max-width: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
