"use client";

import { useEffect, useState } from "react";

interface ReviewData {
  _id: string;
  rating: number;
  title?: string;
  text: string;
  user?: { firstName: string; lastName: string; avatar?: string };
  package?: { name: string; slug: string };
  destination?: { name: string; slug: string };
}

const fallbackTestimonials = [
  { img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", text: "Absolutely magical honeymoon. Every detail was perfect.", name: "Priya Sharma", trip: "Bali Package" },
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", text: "Dubai family trip was flawless. Kids loved every moment!", name: "Rajesh Mehta", trip: "Dubai Package" },
  { img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", text: "Japan in blossom season was a dream. Curated flawlessly.", name: "Ananya Nair", trip: "Japan Package" },
  { img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", text: "Maldives exceeded every expectation. Utter paradise.", name: "Siddharth Rao", trip: "Maldives Package" },
  { img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", text: "Singapore + Sentosa was incredible. Will book again!", name: "Kavita Menon", trip: "Singapore Package" },
  { img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", text: "Phuket beaches were breathtaking. Best trip of my life!", name: "Arjun Kapoor", trip: "Thailand Package" },
];

const destImages: Record<string, string> = {
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
  japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  maldives: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
  thailand: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
};

const rotations = ["-3.5deg", "2deg", "-1.5deg", "3deg", "-2.5deg", "1.8deg"];
const margins = ["0px", "40px", "-20px", "50px", "10px", "30px"];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/featured`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            const mapped = json.data.slice(0, 6).map((r: ReviewData) => {
              const destSlug = r.destination?.slug || r.destination?.name?.toLowerCase() || "";
              const img = destImages[destSlug] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80";
              const name = r.user ? `${r.user.firstName} ${r.user.lastName}` : "Traveller";
              const trip = r.package?.name || r.destination?.name || "Package";
              const displayText = r.text.length > 120 ? r.text.slice(0, 120) + "..." : r.text;
              return { img, text: displayText, name, trip };
            });
            setTestimonials(mapped);
          }
        }
      } catch {
        // Use fallback
      }
    };
    fetchReviews();
  }, []);

  // Auto-advance mobile carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Shared card renderer
  function renderCard(t: typeof testimonials[0], i: number, isDesktop: boolean) {
    return (
      <div
        key={i}
        className={isDesktop ? "polaroid-card" : ""}
        style={{
          background: "#fff",
          padding: "14px 14px 20px",
          boxShadow: "0 8px 36px rgba(0,77,94,.12)",
          width: isDesktop ? 240 : "100%",
          flexShrink: 0,
          transition: "var(--tr)",
          cursor: "pointer",
          position: isDesktop ? "relative" : "relative",
          border: "1px solid var(--line)",
          borderRadius: 0,
          ...(isDesktop
            ? { transform: `rotate(${rotations[i % rotations.length]})`, marginTop: margins[i % margins.length] }
            : {}),
        }}
      >
        <div style={{ width: "100%", height: isDesktop ? 180 : 200, overflow: "hidden", borderRadius: 8 }}>
          <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ paddingTop: 14 }}>
          <div style={{ display: "flex", gap: 2, color: "var(--cu)", marginBottom: 8 }}>
            {[...Array(5)].map((_, j) => (
              <span key={j} className="material-symbols-rounded" style={{ fontSize: 14 }}>star</span>
            ))}
          </div>
          <div className="serif" style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 12 }}>
            &ldquo;{t.text}&rdquo;
          </div>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", letterSpacing: 0.5 }}>{t.name}</div>
          <div style={{ fontSize: 10.5, color: "var(--ink3)", display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 12, color: "var(--gn3)" }}>flight</span>
            {t.trip}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="testimonials" style={{ padding: "80px 0", background: "var(--iv2)", position: "relative", overflow: "hidden" }}>
      <div className="container">
        {/* Head */}
        <div className="rv" style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span className="test-eyebrow-line" style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            Real Stories, Real Smiles
            <span className="test-eyebrow-line" style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginTop: 10 }}>
            What Our <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Travellers</em> Say
          </h2>
        </div>

        {/* Desktop: Polaroid grid */}
        <div className="rv polaroid-wrap test-desktop" style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "center", flexWrap: "wrap", padding: "20px 0" }}>
          {testimonials.map((t, i) => renderCard(t, i, true))}
        </div>

        {/* Mobile: Carousel */}
        <div className="test-mobile-carousel" style={{ display: "none", flexDirection: "column", gap: 16 }}>
          {/* Slider */}
          <div style={{ position: "relative", minHeight: 380, width: "100%" }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === slide ? 1 : 0,
                  transform: i === slide ? "translateX(0) scale(1)" : "translateX(40px) scale(0.95)",
                  transition: "opacity .45s ease, transform .45s ease",
                  pointerEvents: i === slide ? "auto" : "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {renderCard(t, i, false)}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <button
              onClick={() => setSlide((p) => (p - 1 + testimonials.length) % testimonials.length)}
              style={{ width: 38, height: 38, borderRadius: "50%", border: "1.5px solid var(--line2)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--ink3)" }}>chevron_left</span>
            </button>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  style={{
                    width: i === slide ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === slide ? "var(--cu)" : "var(--line2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all .3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setSlide((p) => (p + 1) % testimonials.length)}
              style={{ width: 38, height: 38, borderRadius: "50%", border: "1.5px solid var(--line2)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--ink3)" }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .polaroid-card:hover {
          transform: rotate(0deg) scale(1.05) translateY(-10px) !important;
          box-shadow: 0 20px 60px rgba(0,77,94,.18) !important;
          z-index: 10;
          border-color: var(--gn3) !important;
        }
        @media (max-width: 768px) {
          .test-desktop {
            display: none !important;
          }
          .test-mobile-carousel {
            display: flex !important;
          }
          .test-eyebrow-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
