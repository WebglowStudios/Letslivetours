"use client";

const team = [
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", name: "Arjun Mehta", role: "Founder & CEO", flag: "Founder & CEO", bio: "12+ years crafting journeys. Passionate about sustainable travel and cultural immersion.", dest: "Visited 78 countries" },
  { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", name: "Priya Sharma", role: "Head of Operations", flag: "Head of Operations", bio: "Ensures every detail is perfect. Expert in luxury travel and customer experience.", dest: "Visited 62 countries" },
  { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", name: "Rohan Kapoor", role: "Destination Expert", flag: "Destination Expert", bio: "Specializes in Asia-Pacific. Lived in Bali, Tokyo, and Singapore for 8 years combined.", dest: "Visited 54 countries" },
  { img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", name: "Ananya Nair", role: "Customer Success Lead", flag: "Customer Success", bio: "Your 24/7 travel companion. Resolves issues before you even notice them.", dest: "Visited 48 countries" },
];

export default function Team() {
  return (
    <section id="team" style={{ padding: "100px 0", background: "var(--iv2)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv" style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            Meet the Team
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 12 }}>
            The <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Faces</em> Behind<br />Your Journey
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", marginTop: 12, lineHeight: 1.72, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Our team of travel experts, destination specialists, and support staff work tirelessly to make your dream trip a reality.
          </p>
        </div>

        {/* Grid */}
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {team.map((t, i) => (
            <div key={i} className="rv tc-card" style={{ background: "#fff", borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--line)", transition: "var(--tr)" }}>
              <div style={{ height: 260, position: "relative", overflow: "hidden" }}>
                <img src={t.img} alt={t.name} className="tc-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.7) 0%, transparent 55%)" }} />
                <div className="syne" style={{ position: "absolute", bottom: 14, left: 14, background: "var(--cu)", color: "#fff", borderRadius: 50, padding: "4px 12px", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>{t.flag}</div>
              </div>
              <div style={{ padding: 20 }}>
                <div className="serif" style={{ fontSize: 19, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{t.name}</div>
                <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gn2)", marginBottom: 10 }}>{t.role}</div>
                <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.65, marginBottom: 14 }}>{t.bio}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--ink4)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--cu)" }}>flight</span>{t.dest}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tc-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--sh-lg);
          border-color: var(--gn3) !important;
        }
        .tc-card:hover .tc-img {
          transform: scale(1.06);
        }
        @media (max-width: 1100px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
