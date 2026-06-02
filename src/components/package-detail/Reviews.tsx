"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface ReviewsProps {
  packageId: string;
}

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  travelType?: string;
  createdAt: string;
  avatar?: string;
}

export default function Reviews({ packageId }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (!packageId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/package/${packageId}`);
        if (res.status === "success") {
          const data = res.data?.reviews || res.data || [];
          setReviews(data);
          setTotalReviews(res.data?.total || data.length);
          // Calculate average rating
          if (data.length > 0) {
            const avg = data.reduce((sum: number, r: Review) => sum + r.rating, 0) / data.length;
            setAvgRating(Math.round(avg * 10) / 10);
          }
        }
      } catch {
        // Silently fail — show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [packageId]);

  // Generate star string from rating
  const getStarStr = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Calculate rating distribution
  const getRatingBars = () => {
    if (reviews.length === 0) return [];
    const counts = [0, 0, 0, 0, 0]; // 1-5 stars
    reviews.forEach((r) => {
      const idx = Math.min(Math.max(Math.round(r.rating) - 1, 0), 4);
      counts[idx]++;
    });
    return [5, 4, 3, 2, 1].map((star) => {
      const count = counts[star - 1];
      const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
      return { label: `${star}★`, width: `${pct}%`, pct: `${pct}%` };
    });
  };

  if (loading) {
    return (
      <div
        id="reviews"
        style={{
          marginTop: 48,
          paddingTop: 40,
          borderTop: "2px solid var(--line)",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--ink4)", animation: "spin 1s linear infinite" }}>
          progress_activity
        </span>
        <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 13, color: "var(--ink4)", marginTop: 8 }}>
          Loading reviews...
        </p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div
        id="reviews"
        style={{
          marginTop: 48,
          paddingTop: 40,
          borderTop: "2px solid var(--line)",
        }}
      >
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 40, color: "var(--ink4)", display: "block", marginBottom: 10 }}>
            rate_review
          </span>
          <p
            className="syne"
            style={{ fontSize: 15, fontWeight: 600, color: "var(--ink3)", marginBottom: 4 }}
          >
            No reviews yet
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 13,
              color: "var(--ink4)",
            }}
          >
            Be the first to share your experience!
          </p>
        </div>
      </div>
    );
  }

  const ratingBars = getRatingBars();

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
            {avgRating}
          </div>
          <div>
            <div style={{ color: "var(--cu)", fontSize: 22, letterSpacing: 2 }}>{getStarStr(avgRating)}</div>
            <div
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: 13,
                color: "var(--ink4)",
                marginTop: 4,
              }}
            >
              Based on {totalReviews} verified review{totalReviews !== 1 ? "s" : ""}
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
        {reviews.map((review) => (
          <div
            key={review._id}
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
                      alt={review.userName}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span
                      className="syne"
                      style={{ fontSize: 16, fontWeight: 700, color: "var(--gn)" }}
                    >
                      {getInitials(review.userName)}
                    </span>
                  )}
                </div>
                <div>
                  <div
                    className="syne"
                    style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}
                  >
                    {review.userName}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontSize: 12,
                      color: "var(--ink4)",
                      marginTop: 2,
                    }}
                  >
                    {formatDate(review.createdAt)}{review.travelType ? ` · ${review.travelType}` : ""}
                  </div>
                </div>
              </div>
              <div style={{ color: "var(--cu)", fontSize: 14, letterSpacing: 1 }}>
                {"★".repeat(Math.round(review.rating))}{"☆".repeat(5 - Math.round(review.rating))}
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: 14,
                color: "var(--ink3)",
                lineHeight: 1.75,
              }}
            >
              {review.comment}
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
