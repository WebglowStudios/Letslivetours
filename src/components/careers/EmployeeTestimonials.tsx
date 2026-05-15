"use client";

export default function EmployeeTestimonials() {
  const testimonials = [
    {
      text: "I joined as a junior consultant and within 18 months I was leading the entire Southeast Asia vertical. The growth here is real \u2014 if you put in the work, they back you completely.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      name: "Priya Sharma",
      role: "Head of Southeast Asia Operations",
      tenure: "3 years at LetsLive",
    },
    {
      text: "The travel perk is real \u2014 I\u2019ve been to Bali, Dubai, and Sri Lanka on company-sponsored trips. But honestly, the best part is the team. Everyone genuinely cares about the work.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      name: "Arjun Mehta",
      role: "Senior Product Designer",
      tenure: "2 years at LetsLive",
    },
    {
      text: "Coming from a corporate background, I was nervous about joining a startup. But LetsLive has the best of both worlds \u2014 the structure of a grown company with the energy of a startup.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      name: "Kavya Nair",
      role: "Finance Manager",
      tenure: "1.5 years at LetsLive",
    },
  ];

  return (
    <section id="testimonials" style={{ padding: "96px 0", background: "var(--gn)" }}>
      <div className="container">
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            Team Stories
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#fff", margin: "14px 0 10px", lineHeight: 1.2 }}>
            Hear From Our <em style={{ fontStyle: "italic", color: "var(--cu-l)" }}>Team</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
            Real people, real stories — from the folks who make LetsLive what it is.
          </p>
        </div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card rv">
              <div className="serif" style={{ fontSize: 36, color: "var(--cu)", lineHeight: 1, marginBottom: 18 }}>&ldquo;</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.8, marginBottom: 28, fontStyle: "italic" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,.15)", flexShrink: 0 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginTop: 2 }}>{t.role}</div>
                  <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, fontWeight: 700, color: "var(--cu)", background: "rgba(245,166,35,.15)", padding: "3px 10px", borderRadius: 50, marginTop: 6 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 12 }}>schedule</span>{t.tenure}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 52px;
        }
        .testi-card {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: var(--r-xl);
          padding: 36px 32px;
          transition: var(--tr);
        }
        .testi-card:hover {
          background: rgba(255,255,255,.1);
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .testi-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
