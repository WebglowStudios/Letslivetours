"use client";

const articles = [
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", cat: "Destination", chip: "Destination Guide", title: "10 Things You Must Do in Dubai: The Ultimate First-Timer\u2019s Guide", excerpt: "From the Burj Khalifa to hidden gold souks \u2014 everything you need to make the most of your Dubai adventure this year.", date: "Apr 12, 2026 \u00B7 6 min", featured: true },
  { img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", cat: "Culture", chip: "", title: "How to Experience Japan in Cherry Blossom Season", excerpt: "A complete guide to timing, temples, and Tokyo street food.", date: "Apr 8 \u00B7 8 min", featured: false },
  { img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", cat: "Honeymoon", chip: "", title: "The Most Romantic Spots in Bali for Couples in 2026", excerpt: "Cliffside restaurants, hidden waterfalls, and overwater suites.", date: "Apr 5 \u00B7 5 min", featured: false },
  { img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", cat: "Travel Tips", chip: "", title: "Thailand on a Budget: Island Hopping Without Breaking the Bank", excerpt: "Phuket, Koh Samui, and Krabi \u2014 the smart traveller\u2019s guide to Thailand\u2019s best islands.", date: "Apr 2 \u00B7 6 min", featured: false },
  { img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", cat: "Luxury", chip: "", title: "Maldives Overwater Bungalows: Everything You Need to Know", excerpt: "From choosing the right atoll to what\u2019s actually worth the splurge \u2014 the definitive guide.", date: "Mar 28 \u00B7 7 min", featured: false },
];

export default function Articles() {
  return (
    <section id="articles" style={{ padding: "96px 0", background: "var(--iv)", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative" }}>
          <div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              Travel Journal
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 10 }}>
              Stories from <em style={{ fontStyle: "italic", color: "var(--cu)" }}>the Road</em>
            </h2>
          </div>
          <a href="#" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--gn2)", borderBottom: "1.5px solid var(--gn-gl)", paddingBottom: 2 }}>
            Read all posts <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
          </a>
          <div className="syne" style={{ position: "absolute", top: -30, right: 0, fontSize: 140, fontWeight: 800, color: "rgba(0,77,94,.04)", lineHeight: 1, pointerEvents: "none", letterSpacing: -5 }}>06</div>
        </div>

        {/* Grid */}
        <div className="rv art-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginTop: 52 }}>
          {articles.map((a, i) => (
            <div key={i} className="art-card" style={{
              background: "var(--iv2)", border: "1px solid var(--line)", borderRadius: "var(--r-xl)",
              overflow: "hidden", cursor: "pointer", transition: "var(--tr)",
              ...(i === 0 ? { gridColumn: "1 / 3" } : {}),
            }}>
              <div style={{ position: "relative", overflow: "hidden", height: i === 0 ? 340 : 200 }}>
                <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s", filter: "brightness(.8)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.6) 0%, transparent 60%)" }} />
                {a.chip && (
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 50, fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", background: "var(--cu-gl)", color: "var(--cu)", border: "1px solid rgba(0,174,204,.25)" }}>{a.chip}</span>
                  </div>
                )}
              </div>
              <div style={{ padding: 24 }}>
                <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--cu)", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "block", width: 13, height: 1.5, background: "var(--cu)" }} />
                  {a.cat}
                </div>
                <div className="serif" style={{ fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, marginBottom: 10 }}>{a.title}</div>
                <div style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.65, marginBottom: 16 }}>{a.excerpt}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14, fontSize: 12, color: "var(--ink4)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>calendar_today</span>{a.date}
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--gn2)", display: "flex", alignItems: "center", gap: 4 }}>
                    Read more <span className="material-symbols-rounded" style={{ fontSize: 14 }}>arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .art-card:hover {
          transform: translateY(-7px);
          box-shadow: var(--sh-lg);
          border-color: var(--cu) !important;
        }
        .art-card:hover img {
          transform: scale(1.06);
          filter: brightness(.92) !important;
        }
        @media (max-width: 768px) {
          .art-grid { grid-template-columns: 1fr !important; }
          .art-grid > div:first-child { grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}
