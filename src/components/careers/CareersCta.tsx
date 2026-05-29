"use client";

export default function CareersCta() {
  return (
    <section id="cta-banner" style={{ padding: "96px 48px", background: "linear-gradient(135deg, var(--gn) 0%, var(--gn2) 60%, var(--gn3) 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 50%, rgba(255,255,255,.05) 0%, transparent 50%), radial-gradient(circle at 85% 50%, rgba(41,196,216,.08) 0%, transparent 50%)" }} />
      <div className="rv" style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
        <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 16 }}>
          Join the Team
        </div>
        <h2 className="serif" style={{ fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
          Don&apos;t See the Right Role? <em style={{ fontStyle: "italic", color: "var(--cu-l)" }}>Reach Out Anyway.</em>
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.7)", lineHeight: 1.7, marginBottom: 36 }}>
          We&apos;re always looking for exceptional people. Send us your CV and tell us how you&apos;d make LetsLive better — we read every message.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/contact" className="cta-btn-primary syne">Send Your CV</a>
          <a href="#open-roles" className="cta-btn-ghost syne">Browse Open Roles</a>
        </div>
      </div>

      <style jsx>{`
        .cta-btn-primary {
          font-size: 14px;
          font-weight: 700;
          color: var(--gn);
          background: #fff;
          padding: 15px 36px;
          border-radius: 50px;
          transition: var(--tr);
          box-shadow: 0 8px 28px rgba(0,0,0,.15);
          text-decoration: none;
          display: inline-block;
        }
        .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(0,0,0,.2);
        }
        .cta-btn-ghost {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          padding: 15px 36px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,.35);
          transition: var(--tr);
          text-decoration: none;
          display: inline-block;
        }
        .cta-btn-ghost:hover {
          background: rgba(255,255,255,.1);
          border-color: rgba(255,255,255,.7);
        }
        @media (max-width: 768px) {
          #cta-banner {
            padding: 64px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
