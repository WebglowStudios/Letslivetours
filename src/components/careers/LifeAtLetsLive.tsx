"use client";

export default function LifeAtLetsLive() {
  const cells = [
    { img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", label: "Team Collaboration", cls: "tall" },
    { img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", label: "Office Vibes", cls: "" },
    { img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", label: "Strategy Sessions", cls: "" },
    { img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80", label: "Annual Team Offsite", cls: "wide" },
    { img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80", label: "Team Lunches", cls: "" },
  ];

  return (
    <section id="life" style={{ padding: "96px 0", background: "var(--gn)" }}>
      <div className="container">
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            Our Culture
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "#fff", margin: "14px 0 10px", lineHeight: 1.2 }}>
            Life at <em style={{ fontStyle: "italic", color: "var(--cu-l)" }}>LetsLive</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
            From team offsites in Coorg to brainstorms over chai — here&apos;s a glimpse of what it&apos;s like to work with us.
          </p>
        </div>
        <div className="life-grid rv">
          {cells.map((cell, i) => (
            <div key={i} className={`life-cell ${cell.cls}`}>
              <img src={cell.img} alt={cell.label} />
              <div className="life-cell-ov" />
              <div className="life-cell-label syne">{cell.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .life-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 240px 240px;
          gap: 14px;
          margin-top: 48px;
        }
        .life-cell {
          border-radius: var(--r);
          overflow: hidden;
          position: relative;
        }
        .life-cell.tall {
          grid-row: span 2;
        }
        .life-cell.wide {
          grid-column: span 2;
        }
        .life-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .6s ease;
        }
        .life-cell:hover img {
          transform: scale(1.06);
        }
        .life-cell-ov {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,20,28,.55) 0%, transparent 55%);
          opacity: 0;
          transition: var(--tr);
        }
        .life-cell:hover .life-cell-ov {
          opacity: 1;
        }
        .life-cell-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          opacity: 0;
          transform: translateY(8px);
          transition: var(--tr);
        }
        .life-cell:hover .life-cell-label {
          opacity: 1;
          transform: none;
        }
        @media (max-width: 768px) {
          .life-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .life-cell.tall {
            grid-row: span 1;
          }
          .life-cell.wide {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
}
