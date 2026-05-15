export default function SocialStrip() {
  const socials = [
    { name: "Instagram", handle: "@letslivetours", icon: "camera_alt", bgClass: "ig", bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" },
    { name: "Facebook", handle: "LetsLive Tours", icon: "thumb_up", bgClass: "fb", bg: "#1877f2" },
    { name: "YouTube", handle: "LetsLive Tours", icon: "play_circle", bgClass: "yt", bg: "#ff0000" },
    { name: "WhatsApp", handle: "Chat with us", icon: "chat", bgClass: "wa", bg: "#25d366" },
  ];

  return (
    <section style={{ padding: "72px 0", background: "var(--iv2)", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <div className="ss-inner rv">
          <div className="ss-left">
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              Follow Along
            </div>
            <h3 className="serif" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, letterSpacing: -1, marginTop: 8 }}>
              Join Our <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Travel Community</em>
            </h3>
            <p style={{ fontSize: 14, color: "var(--ink3)", marginTop: 8, lineHeight: 1.6 }}>
              Get daily travel inspiration, exclusive deals, and behind-the-scenes content.
            </p>
          </div>
          <div className="ss-cards" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {socials.map((s, i) => (
              <div key={i} className="sc" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 22px", background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r)", cursor: "pointer", transition: "var(--tr)", minWidth: 160 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: s.bg }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: "#fff" }}>{s.icon}</span>
                </div>
                <div>
                  <div className="syne" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink3)" }}>{s.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ss-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .sc:hover {
          border-color: var(--gn3) !important;
          box-shadow: var(--sh);
          transform: translateY(-3px);
        }
        @media (max-width: 768px) {
          .ss-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
