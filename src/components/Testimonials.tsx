"use client";

const testimonials = [
  { img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", text: "\u201CAbsolutely magical honeymoon. Every detail was perfect.\u201D", name: "Priya Sharma", trip: "Bali Package" },
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", text: "\u201CDubai family trip was flawless. Kids loved every moment!\u201D", name: "Rajesh Mehta", trip: "Dubai Package" },
  { img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", text: "\u201CJapan in blossom season was a dream. Curated flawlessly.\u201D", name: "Ananya Nair", trip: "Japan Package" },
  { img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", text: "\u201CMaldives exceeded every expectation. Utter paradise.\u201D", name: "Siddharth Rao", trip: "Maldives Package" },
  { img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", text: "\u201CSingapore + Sentosa was incredible. Will book again!\u201D", name: "Kavita Menon", trip: "Singapore Package" },
  { img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", text: "\u201CPhuket beaches were breathtaking. Best trip of my life!\u201D", name: "Arjun Kapoor", trip: "Thailand Package" },
];

const rotations = ["-3.5deg", "2deg", "-1.5deg", "3deg", "-2.5deg", "1.8deg"];
const margins = ["0px", "40px", "-20px", "50px", "10px", "30px"];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "100px 0", background: "var(--iv2)", position: "relative", overflow: "hidden" }}>
      {/* BG text */}
      <div className="serif" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "min(32vw, 380px)", fontWeight: 700, color: "rgba(0,77,94,.03)", whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: -15 }}>Journey</div>

      <div className="container">
        {/* Head */}
        <div className="rv" style={{ textAlign: "center", display: "block", marginBottom: 0 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            Real Stories, Real Smiles
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700, lineHeight: 1.05, marginTop: 10 }}>
            What Our <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Travellers</em> Say
          </h2>
        </div>

        {/* Polaroids */}
        <div className="rv polaroid-wrap" style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "center", flexWrap: "wrap", padding: "20px 0", marginTop: 52 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="polaroid-card" style={{
              background: "#fff", padding: "14px 14px 48px",
              boxShadow: "0 8px 36px rgba(0,77,94,.12)", width: 240, flexShrink: 0,
              transition: "var(--tr)", cursor: "pointer", position: "relative",
              border: "1px solid var(--line)", transform: `rotate(${rotations[i]})`, marginTop: margins[i],
            }}>
              <div style={{ width: "100%", height: 180, overflow: "hidden", borderRadius: 4 }}>
                <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "filter .4s" }} />
              </div>
              <div style={{ paddingTop: 14 }}>
                <div style={{ display: "flex", gap: 2, color: "var(--cu)", marginBottom: 8 }}>
                  {[...Array(5)].map((_, j) => <span key={j} className="material-symbols-rounded" style={{ fontSize: 14 }}>star</span>)}
                </div>
                <div className="serif" style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 12 }}>{t.text}</div>
                <div className="syne" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", letterSpacing: 0.5 }}>{t.name}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink3)", display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 12, color: "var(--gn3)", opacity: 0.7 }}>flight</span>{t.trip}
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 12, right: 14, width: 44, height: 44, borderRadius: "50%", border: "2px solid rgba(0,174,204,.25)", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(12deg)" }}>
                <div style={{ fontSize: 16, color: "var(--gn3)", opacity: 0.4 }}>✈</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .polaroid-card:hover {
          transform: rotate(0deg) scale(1.05) translateY(-10px) !important;
          box-shadow: 0 20px 60px rgba(0,77,94,.18) !important;
          z-index: 10;
          border-color: var(--gn3) !important;
        }
        .polaroid-card:hover img {
          filter: brightness(1.08) saturate(1.2);
        }
        @media (max-width: 768px) {
          .polaroid-wrap {
            flex-direction: column !important;
            align-items: center !important;
          }
          .polaroid-card {
            width: 100% !important;
            max-width: 300px !important;
            transform: none !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
