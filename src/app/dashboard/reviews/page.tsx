"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

interface Review {
  _id: string;
  package: { _id: string; name: string };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function MyReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // Attempt to fetch user's reviews
        const res = await api.get("/reviews/me");
        const data = res?.data?.reviews || res?.data || [];
        setReviews(Array.isArray(data) ? data : []);
      } catch {
        // Endpoint may not exist yet
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className="material-symbols-rounded"
        style={{
          fontSize: 18,
          color: i < rating ? "var(--cu)" : "var(--ink4)",
        }}
      >
        star
      </span>
    ));
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--gn2)", animation: "spin 1s linear infinite" }}>
          progress_activity
        </span>
        <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 32 }}>
        My Reviews
      </h1>

      {reviews.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-xl)",
            padding: 60,
            textAlign: "center",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--ink4)" }}>
            rate_review
          </span>
          <p className="syne" style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: "var(--ink2)" }}>
            No reviews yet
          </p>
          <p style={{ marginTop: 8, fontSize: 14, color: "var(--ink3)", maxWidth: 360, margin: "8px auto 0" }}>
            You can review packages after completing a trip. Your feedback helps other travellers make informed decisions.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="review-card"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-xl)",
                padding: 24,
                transition: "var(--tr)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <p className="syne" style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", marginBottom: 8 }}>
                    {review.package?.name || "Package"}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "var(--ink3)" }}>
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <p
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "var(--ink2)",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {review.comment}
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button
                  className="syne"
                  style={{
                    padding: "8px 16px",
                    background: "var(--gn-gl)",
                    color: "var(--gn2)",
                    border: "none",
                    borderRadius: "var(--r)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>edit</span>
                  Edit
                </button>
                <button
                  className="syne"
                  style={{
                    padding: "8px 16px",
                    background: "rgba(220,53,69,.06)",
                    color: "#dc3545",
                    border: "none",
                    borderRadius: "var(--r)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>delete</span>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .review-card:hover {
          box-shadow: var(--sh);
          border-color: var(--line2);
        }
      `}</style>
    </div>
  );
}
