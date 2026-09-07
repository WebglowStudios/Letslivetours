"use client";

import Link from "next/link";

export default function Footer() {
  const destinationLinks = [
    { name: "Dubai", slug: "dubai" },
    { name: "Singapore", slug: "singapore" },
    { name: "Japan", slug: "japan" },
    { name: "Bali", slug: "bali" },
    { name: "Maldives", slug: "maldives" },
    { name: "Thailand", slug: "thailand" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Destinations", href: "/destinations" },
    { name: "Articles", href: "/articles" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer style={{ background: "var(--ink)", paddingTop: 72 }}>
      <div className="container">
        <div className="ft-grid" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1.4fr", gap: 48, paddingBottom: 52, borderBottom: "1px solid rgba(249,246,240,.07)" }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-block", textDecoration: "none" }}>
              <img src="/logo_white.png" alt="LetsLive Tours" style={{ height: 120, width: "auto" }} />
            </Link>
            <div style={{ fontSize: 13.5, color: "rgba(249,246,240,.35)", lineHeight: 1.72, maxWidth: 280, marginTop: 14 }}>
              Premium-curated journeys to the world&apos;s most extraordinary destinations — crafted for those who seek more than the ordinary.
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 22 }}>              {[
                {
                  label: "Instagram",
                  url: "https://www.instagram.com/letslivetours",
                  svg: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  url: "https://www.youtube.com/@letslivetours",
                  svg: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  url: "https://wa.me/917770088299",
                  svg: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  ),
                },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="ft-soc" style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(249,246,240,.05)", border: "1px solid rgba(249,246,240,.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "var(--tr)", textDecoration: "none", color: "rgba(249,246,240,.4)" }}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.3)", marginBottom: 18 }}>Destinations</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {destinationLinks.map((d, i) => (
                <Link key={i} href={`/destinations/${d.slug}`} className="ft-link" style={{ fontSize: 13.5, color: "rgba(249,246,240,.5)", transition: "color .2s", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 13, opacity: 0.3, transition: "opacity .2s, color .2s" }}>chevron_right</span>{d.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.3)", marginBottom: 18 }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {companyLinks.map((l, i) => (
                <Link key={i} href={l.href} className="ft-link" style={{ fontSize: 13.5, color: "rgba(249,246,240,.5)", transition: "color .2s", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 13, opacity: 0.3, transition: "opacity .2s, color .2s" }}>chevron_right</span>{l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.3)", marginBottom: 18 }}>Contact</h4>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "rgba(249,246,240,.45)", marginBottom: 14 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)", flexShrink: 0, marginTop: 1 }}>location_on</span>
              E/5, First Floor, Mauli Complex, Sukhsagar Nagar, Katraj, Pune, Maharashtra 411046
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "rgba(249,246,240,.45)", marginBottom: 14 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)", flexShrink: 0, marginTop: 1 }}>phone</span>
              <div>
                <a href="tel:+917770088299" style={{ color: "inherit", textDecoration: "none" }} className="ft-bl-link">+91 77700 88299</a>
                {" / "}
                <a href="tel:+917770088466" style={{ color: "inherit", textDecoration: "none" }} className="ft-bl-link">+91 77700 88466</a>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "rgba(249,246,240,.45)", marginBottom: 14 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)", flexShrink: 0, marginTop: 1 }}>mail</span>
              <a href="mailto:info@letslivetours.com" style={{ color: "inherit", textDecoration: "none" }} className="ft-bl-link">info@letslivetours.com</a>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "rgba(249,246,240,.45)", marginBottom: 14 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)", flexShrink: 0, marginTop: 1 }}>schedule</span>
              Mon–Sat, 10AM – 8PM IST
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="ft-bottom-bar" style={{ padding: "22px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 12, color: "rgba(249,246,240,.25)" }}>© 2026 LetsLive Tours. All rights reserved.</div>
          <div style={{ display: "flex", gap: 22 }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Refund Policy", href: "/refund" },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="ft-bl-link" style={{ fontSize: 12, color: "rgba(249,246,240,.25)", transition: "color .2s", cursor: "pointer", textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ft-soc {
          color: rgba(249,246,240,.45) !important;
        }
        .ft-soc svg {
          transition: transform .2s, color .2s;
        }
        .ft-soc:hover {
          background: var(--cu) !important;
          border-color: var(--cu) !important;
          color: #fff !important;
          transform: translateY(-2px);
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
          .ft-grid { grid-template-columns: 1fr 1fr !important; gap: 32px 20px !important; }
          .ft-grid > div:first-child { grid-column: 1 / -1 !important; }
          .ft-grid > div:last-child { grid-column: 1 / -1 !important; }
          .ft-bottom-bar {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </footer>
  );
}
