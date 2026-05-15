"use client";

import { useRef } from "react";

interface PkgCard {
  img: string;
  badge: string;
  badgeCls: string;
  name: string;
  duration: string;
  hotel: string;
  stars: string;
  reviews: string;
  origPrice: string;
  price: string;
  perUnit: string;
  type: string;
}

interface Props {
  eyebrow: string;
  title: string;
  titleEm: string;
  subtitle: string;
  cards: PkgCard[];
  alt?: boolean;
}

const badgeStyles: Record<string, { background: string }> = {
  bestseller: { background: "var(--cu)" },
  hot: { background: "#e53935" },
  new: { background: "var(--gn3)" },
  honeymoon: { background: "linear-gradient(135deg, #e91e8c, #ff6b9d)" },
  family: { background: "#43a047" },
};

export default function PackageRow({ eyebrow, title, titleEm, subtitle, cards, alt }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "80px 0", background: alt ? "var(--iv2)" : "var(--iv)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
        {/* Head */}
        <div className="rv" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />{eyebrow}
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 10 }}>
              {title} <em style={{ fontStyle: "italic", color: "var(--gd)" }}>{titleEm}</em>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink3)", lineHeight: 1.7, maxWidth: 560 }}>{subtitle}</p>
          </div>
          <a href="#" className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--gn)", display: "flex", alignItems: "center", gap: 6 }}>
            View All <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
          </a>
        </div>

        {/* Scroll */}
        <div style={{ position: "relative" }}>
          <button onClick={() => scroll(-1)} style={{ position: "absolute", top: "50%", left: -22, transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "#fff", boxShadow: "0 4px 18px rgba(0,77,94,.15)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, border: "none", cursor: "pointer" }}>
            <span className="material-symbols-rounded" style={{ color: "var(--gn)", fontSize: 22 }}>chevron_left</span>
          </button>
          <div ref={scrollRef} style={{ display: "flex", gap: 24, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", paddingBottom: 8 }}>
            {cards.map((c, i) => (
              <div key={i} className="rv pkg-card-item" style={{ flex: "0 0 300px", scrollSnapAlign: "start", background: "#fff", borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "var(--sh)", transition: "var(--tr)" }}>
                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                  <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.45) 0%, transparent 60%)" }} />
                  <span className="syne" style={{ position: "absolute", top: 14, left: 14, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", padding: "5px 12px", borderRadius: 50, color: "#fff", ...(badgeStyles[c.badgeCls] || { background: "var(--cu)" }) }}>{c.badge}</span>
                  <button style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.2)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
                    <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 18 }}>favorite_border</span>
                  </button>
                </div>
                <div style={{ padding: 20 }}>
                  <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gn3)", marginBottom: 6 }}>Dubai \u00B7 UAE</div>
                  <div className="serif" style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35, marginBottom: 12 }}>{c.name}</div>
                  <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                    <span className="syne" style={{ fontSize: 12, fontWeight: 500, color: "var(--ink3)", display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--gn3)" }}>calendar_today</span>{c.duration}</span>
                    <span className="syne" style={{ fontSize: 12, fontWeight: 500, color: "var(--ink3)", display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--gn3)" }}>hotel</span>{c.hotel}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--cu)", marginBottom: 14 }}>{c.stars} <span style={{ fontSize: 12, color: "var(--ink4)", fontWeight: 400 }}>({c.reviews})</span></div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "var(--ink4)", textDecoration: "line-through" }}>{c.origPrice}</div>
                      <div className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--gn)", lineHeight: 1 }}>{c.price} <small style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 11, fontWeight: 400, color: "var(--ink3)" }}>{c.perUnit}</small></div>
                    </div>
                    <button className="syne" style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "var(--gn)", padding: "9px 18px", borderRadius: 50, border: "none", cursor: "pointer", transition: "var(--tr)" }}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scroll(1)} style={{ position: "absolute", top: "50%", right: -22, transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "#fff", boxShadow: "0 4px 18px rgba(0,77,94,.15)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, border: "none", cursor: "pointer" }}>
            <span className="material-symbols-rounded" style={{ color: "var(--gn)", fontSize: 22 }}>chevron_right</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .pkg-card-item:hover { transform: translateY(-6px); box-shadow: var(--sh-lg); }
        .pkg-card-item:hover img { transform: scale(1.06); }
      `}</style>
    </section>
  );
}
