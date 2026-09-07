"use client";

export default function SocialStrip() {
  const socials = [
    {
      name: "Instagram",
      handle: "@letslivetours",
      bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      url: "https://www.instagram.com/letslivetours",
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },

    {
      name: "YouTube",
      handle: "LetsLive Tours",
      bg: "#ff0000",
      url: "https://www.youtube.com/@letslivetours",
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      handle: "Chat with us",
      bg: "#25d366",
      url: "https://wa.me/917770088299",
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
    },
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
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="sc" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 22px", background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r)", cursor: "pointer", transition: "var(--tr)", minWidth: 160, textDecoration: "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: s.bg }}>
                  {s.svg}
                </div>
                <div>
                  <div className="syne" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink3)" }}>{s.handle}</div>
                </div>
              </a>
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
