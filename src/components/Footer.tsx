"use client";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", paddingTop: 72 }}>
      <div className="container">
        <div className="ft-grid" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1.4fr", gap: 48, paddingBottom: 52, borderBottom: "1px solid rgba(249,246,240,.07)" }}>
          {/* Brand */}
          <div>
            <div className="syne" style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--iv)" }}>
              LetsLive<span style={{ color: "var(--cu)" }}> Tours</span>
            </div>
            <div style={{ fontSize: 13.5, color: "rgba(249,246,240,.35)", lineHeight: 1.72, maxWidth: 280, marginTop: 14 }}>
              Premium-curated journeys to the world&apos;s most extraordinary destinations — crafted for those who seek more than the ordinary.
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
              {["share", "camera_alt", "play_circle", "chat"].map((icon, i) => (
                <div key={i} className="ft-soc" style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(249,246,240,.05)", border: "1px solid rgba(249,246,240,.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "var(--tr)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 17, color: "rgba(249,246,240,.4)", transition: "color .2s" }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.3)", marginBottom: 18 }}>Destinations</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Dubai", "Singapore", "Japan", "Bali", "Maldives", "Thailand"].map((d, i) => (
                <a key={i} href="#" className="ft-link" style={{ fontSize: 13.5, color: "rgba(249,246,240,.5)", transition: "color .2s", display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 13, opacity: 0.3, transition: "opacity .2s, color .2s" }}>chevron_right</span>{d}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.3)", marginBottom: 18 }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["About Us", "Careers", "Blog", "Press", "Partners"].map((l, i) => (
                <a key={i} href="#" className="ft-link" style={{ fontSize: 13.5, color: "rgba(249,246,240,.5)", transition: "color .2s", display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 13, opacity: 0.3, transition: "opacity .2s, color .2s" }}>chevron_right</span>{l}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.3)", marginBottom: 18 }}>Contact</h4>
            {[
              { icon: "location_on", text: "12 Travel Square, Mumbai, India" },
              { icon: "phone", text: "+91 98765 43210" },
              { icon: "mail", text: "hello@letslivetours.in" },
              { icon: "schedule", text: "Mon–Sat, 9AM – 8PM IST" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "rgba(249,246,240,.45)", marginBottom: 14 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)", flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                {c.text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: "22px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 12, color: "rgba(249,246,240,.25)" }}>© 2026 LetsLive Tours. All rights reserved.</div>
          <div style={{ display: "flex", gap: 22 }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l, i) => (
              <a key={i} href="#" className="ft-bl-link" style={{ fontSize: 12, color: "rgba(249,246,240,.25)", transition: "color .2s" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ft-soc:hover {
          background: var(--cu) !important;
          border-color: var(--cu) !important;
        }
        .ft-soc:hover .material-symbols-rounded {
          color: #fff !important;
        }
        .ft-link:hover {
          color: var(--iv) !important;
        }
        .ft-bl-link:hover {
          color: rgba(249,246,240,.65) !important;
        }
        @media (max-width: 1100px) {
          .ft-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .ft-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
