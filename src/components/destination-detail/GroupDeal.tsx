"use client";

interface GroupDealData {
  title: string;
  description: string;
  image: string;
  discountText: string;
}

interface GroupDealProps {
  groupDeal?: GroupDealData | null;
}

export default function GroupDeal({ groupDeal }: GroupDealProps) {
  if (!groupDeal) return null;

  return (
    <section id="group-deal" className="group-deal-section" style={{ padding: "80px 48px", background: "linear-gradient(135deg, var(--cu-d) 0%, var(--cu) 50%, var(--cu-l) 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,.06) 0%, transparent 50%)" }} />
      {groupDeal.image && (
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${groupDeal.image}')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
      )}
      <div className="rv" style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
        <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.2)", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", padding: "6px 18px", borderRadius: 50, marginBottom: 20 }}>
          <span className="material-symbols-rounded">groups</span>Group Travel
        </div>
        <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 14 }}>
          {groupDeal.title}
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.85)", marginBottom: 16, lineHeight: 1.6 }}>
          {groupDeal.description}
        </p>
        {groupDeal.discountText && (
          <p className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 32, background: "rgba(255,255,255,.15)", display: "inline-block", padding: "8px 20px", borderRadius: 50 }}>
            {groupDeal.discountText}
          </p>
        )}
        <div>
          <a href="/contact" className="syne" style={{ fontSize: 14, fontWeight: 800, color: "var(--cu-d)", background: "#fff", padding: "15px 38px", borderRadius: 50, display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,.15)", transition: "var(--tr)" }}>Get a Group Quote</a>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .group-deal-section { padding: 48px 20px !important; }
        }
      `}</style>
    </section>
  );
}
