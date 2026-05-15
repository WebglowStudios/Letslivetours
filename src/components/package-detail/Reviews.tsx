"use client";

const ratingBars = [
  { label: "5★", width: "88%", pct: "88%" },
  { label: "4★", width: "9%", pct: "9%" },
  { label: "3★", width: "2%", pct: "2%" },
  { label: "2★", width: "1%", pct: "1%" },
  { label: "1★", width: "0%", pct: "0%" },
];

const reviews = [
  {
    name: "Priya Mehta",
    date: "March 2025 · Honeymoon Trip",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    initials: null,
    stars: "★★★★★",
    text: "Absolutely magical experience! The desert safari was the highlight — dune bashing at sunset followed by a BBQ under the stars was something we'll never forget. LetsLive handled everything perfectly, from the airport pickup to the hotel check-in. The Atlantis stay was beyond our expectations. Highly recommend!",
  },
  {
    name: "Arjun Kapoor",
    date: "February 2025 · Family Trip",
    avatar: null,
    initials: "AK",
    stars: "★★★★★",
    text: "Travelled with my family of 4 including two kids. The team at LetsLive was incredibly helpful in customising the itinerary for us. The Burj Khalifa experience was breathtaking — my kids were speechless! The guide on the heritage tour was knowledgeable and engaging. Will definitely book again.",
  },
  {
    name: "Sneha Reddy",
    date: "January 2025 · Solo Trip",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    initials: null,
    stars: "★★★★★",
    text: "As a solo female traveller, I was a bit nervous about Dubai but LetsLive made me feel completely safe and taken care of. The itinerary was perfectly paced — not too rushed, not too slow. The dhow cruise dinner was romantic even solo! The Old Dubai heritage walk was my favourite part.",
  },
  {
    name: "Rohit Sharma",
    date: "December 2024 · Group Trip",
    avatar: null,
    initials: "RS",
    stars: "★★★★☆",
    text: "Great package overall! Organised a trip for 8 friends and LetsLive handled the logistics seamlessly. The hotels were excellent and the desert safari was epic. Only minor feedback — the Day 6 Miracle Garden was closed (off-season) and we weren't informed in advance. The team quickly arranged an alternative, so kudos for that.",
  },
];

export default function Reviews() {
  return (
    <div
      id="reviews"
      style={{
        marginTop: 48,
        paddingTop: 40,
        borderTop: "2px solid var(--line)",
      }}
    >
      {/* Header */}
      <div
        className="reviews-header"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 28,
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            className="serif"
            style={{ fontSize: 56, fontWeight: 700, color: "var(--gn)", lineHeight: 1 }}
          >
            4.9
          </div>
          <div>
            <div style={{ color: "var(--cu)", fontSize: 22, letterSpacing: 2 }}>★★★★★</div>
            <div
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: 13,
                color: "var(--ink4)",
                marginTop: 4,
              }}
            >
              Based on 312 verified reviews
            </div>
          </div>
        </div>

        {/* Rating bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 200 }}>
          {ratingBars.map((bar, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                className="syne"
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: "var(--ink3)",
                  width: 36,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {bar.label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: "var(--iv3)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 3,
                    background: "linear-gradient(90deg, var(--cu), var(--gd))",
                    width: bar.width,
                    transition: "width .6s ease",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontSize: 11,
                  color: "var(--ink4)",
                  width: 28,
                  flexShrink: 0,
                }}
              >
                {bar.pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {reviews.map((review, i) => (
          <div
            key={i}
            className="review-card"
            style={{
              background: "#fff",
              borderRadius: "var(--r-xl)",
              padding: "24px 26px",
              border: "1.5px solid var(--line)",
              transition: "var(--tr)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "var(--gn-gl)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span
                      className="syne"
                      style={{ fontSize: 16, fontWeight: 700, color: "var(--gn)" }}
                    >
                      {review.initials}
                    </span>
                  )}
                </div>
                <div>
                  <div
                    className="syne"
                    style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontSize: 12,
                      color: "var(--ink4)",
                      marginTop: 2,
                    }}
                  >
                    {review.date}
                  </div>
                </div>
              </div>
              <div style={{ color: "var(--cu)", fontSize: 14, letterSpacing: 1 }}>{review.stars}</div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: 14,
                color: "var(--ink3)",
                lineHeight: 1.75,
              }}
            >
              {review.text}
            </p>

            <div
              className="syne"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontWeight: 700,
                background: "var(--gn-gl)",
                color: "var(--gn2)",
                padding: "4px 12px",
                borderRadius: 50,
                marginTop: 12,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 13 }}>verified</span>
              Verified Booking
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .review-card:hover {
          box-shadow: var(--sh);
          border-color: var(--iv3) !important;
        }
        @media (max-width: 600px) {
          .reviews-header {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
