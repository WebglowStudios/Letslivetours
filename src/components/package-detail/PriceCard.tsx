"use client";

import Link from "next/link";

interface PriceCardProps {
  pkg: any;
  slug: string;
}

const trustBadges = [
  { icon: "verified", text: "Verified Package" },
  { icon: "lock", text: "Secure Booking" },
  { icon: "support_agent", text: "24/7 Support" },
];

export default function PriceCard({ pkg, slug }: PriceCardProps) {
  const price = pkg?.price || 0;
  const originalPrice = pkg?.originalPrice || 0;
  const discount = pkg?.discount || 0;
  const duration = pkg?.duration;
  const hotelRating = pkg?.hotelRating || "";
  const rating = pkg?.rating || 0;
  const reviewCount = pkg?.reviewCount || 0;

  const hasDiscount = originalPrice > 0 && originalPrice > price;
  const savings = hasDiscount ? originalPrice - price : 0;

  // Format price in INR
  const formatPrice = (val: number) => {
    return "₹" + val.toLocaleString("en-IN");
  };

  // Generate star string
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const starStr = "★".repeat(fullStars) + (hasHalf ? "½" : "");

  // Build meta rows from pkg data
  const metaRows = [
    duration ? { icon: "calendar_today", label: "Duration:", value: `${duration.nights} Nights / ${duration.days} Days` } : null,
    hotelRating ? { icon: "hotel", label: "Stay:", value: hotelRating } : null,
    { icon: "flight_takeoff", label: "Flights:", value: "Not included" },
    { icon: "groups", label: "Group size:", value: "2–15 people" },
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--r-xl)",
        border: "1.5px solid var(--line)",
        padding: 24,
        marginBottom: 16,
        boxShadow: "var(--sh)",
      }}
    >
      {/* Top section */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 18,
          paddingBottom: 18,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div>
          <div
            className="syne"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "var(--ink4)",
              marginBottom: 4,
            }}
          >
            Per Adult
          </div>
          {hasDiscount && (
            <div
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: 13,
                color: "var(--ink4)",
                textDecoration: "line-through",
                marginBottom: 2,
              }}
            >
              {formatPrice(originalPrice)}
            </div>
          )}
          <div
            className="serif"
            style={{ fontSize: 32, fontWeight: 700, color: "var(--gn)", lineHeight: 1 }}
          >
            {formatPrice(price)}
          </div>
          <div
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 12,
              color: "var(--ink3)",
              marginTop: 3,
            }}
          >
            per person (twin sharing)
          </div>
          {hasDiscount && (
            <div
              className="syne"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontWeight: 700,
                background: "rgba(41,196,216,.12)",
                color: "var(--gn2)",
                padding: "4px 12px",
                borderRadius: 50,
                marginTop: 8,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>local_offer</span>
              You save {formatPrice(savings)} ({discount}% off)
            </div>
          )}
        </div>

        {rating > 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
            <div style={{ color: "var(--cu)", fontSize: 16, letterSpacing: 1 }}>{starStr}</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>{rating}</div>
            {reviewCount > 0 && (
              <div
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontSize: 11,
                  color: "var(--ink4)",
                }}
              >
                {reviewCount} reviews
              </div>
            )}
          </div>
        )}
      </div>

      {/* Meta rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {metaRows.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 13,
              color: "var(--ink3)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn3)" }}>
              {row.icon}
            </span>
            <span>
              <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{row.label}</strong> {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Book button */}
      <Link
        href={`/book/${slug}`}
        className="syne price-book-btn"
        style={{
          width: "100%",
          fontSize: 14,
          fontWeight: 700,
          color: "#fff",
          background: "var(--cu)",
          padding: 14,
          borderRadius: 50,
          transition: "var(--tr)",
          boxShadow: "0 6px 20px rgba(245,166,35,.35)",
          marginBottom: 10,
          border: "none",
          cursor: "pointer",
          textDecoration: "none",
          textAlign: "center",
          display: "block",
        }}
      >
        Book This Package
      </Link>

      {/* Callback button */}
      <button
        className="syne price-callback-btn"
        style={{
          width: "100%",
          fontSize: 13.5,
          fontWeight: 600,
          color: "var(--gn)",
          background: "transparent",
          padding: 12,
          borderRadius: 50,
          border: "1.5px solid var(--line2)",
          transition: "var(--tr)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          cursor: "pointer",
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 17 }}>call</span>
        Request a Callback
      </button>

      {/* Trust badges */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 16,
          paddingTop: 16,
          borderTop: "1px solid var(--line)",
        }}
      >
        {trustBadges.map((badge, i) => (
          <div
            key={i}
            className="syne"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              fontSize: 10.5,
              fontWeight: 600,
              color: "var(--ink4)",
              textAlign: "center",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--gn3)" }}>
              {badge.icon}
            </span>
            {badge.text}
          </div>
        ))}
      </div>

      <style jsx>{`
        .price-book-btn:hover {
          background: var(--cu-d) !important;
          transform: translateY(-1px);
        }
        .price-callback-btn:hover {
          background: var(--gn-gl) !important;
          border-color: var(--gn2) !important;
        }
      `}</style>
    </div>
  );
}
