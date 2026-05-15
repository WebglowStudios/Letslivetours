"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Review {
  _id: string;
  user?: { firstName: string; lastName: string };
  package?: { name: string };
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reviews");
      const data = res?.data?.reviews || res?.data || [];
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const approveReview = async (id: string) => {
    try {
      await api.put(`/reviews/${id}/approve`, {});
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, isApproved: true } : r))
      );
    } catch (err) {
      console.error("Failed to approve review:", err);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.del(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "pending") return !r.isApproved;
    if (filter === "approved") return r.isApproved;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className="material-symbols-rounded"
        style={{ fontSize: 16, color: i < rating ? "var(--cu)" : "#ddd" }}
      >
        star
      </span>
    ));
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--gn)", animation: "spin 1s linear infinite" }}>
          progress_activity
        </span>
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <h1 className="serif" style={{ fontSize: 28, marginBottom: 28, color: "var(--ink)" }}>
        Review Moderation
      </h1>

      {/* Filter tabs */}
      <div className="tabs">
        <button
          onClick={() => setFilter("pending")}
          className={`tab-btn ${filter === "pending" ? "active" : ""}`}
        >
          Pending ({reviews.filter((r) => !r.isApproved).length})
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`tab-btn ${filter === "approved" ? "active" : ""}`}
        >
          Approved ({reviews.filter((r) => r.isApproved).length})
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`tab-btn ${filter === "all" ? "active" : ""}`}
        >
          All ({reviews.length})
        </button>
      </div>

      {filteredReviews.length === 0 ? (
        <div style={{ padding: 48, textAlign: "center", color: "var(--ink3)", background: "#fff", borderRadius: "var(--r)", border: "1px solid var(--line)" }}>
          No reviews found
        </div>
      ) : (
        <div className="review-list">
          {filteredReviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-top">
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>
                    {review.user ? `${review.user.firstName} ${review.user.lastName}` : "Anonymous"}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink3)", marginTop: 2 }}>
                    on <strong>{review.package?.name || "Unknown Package"}</strong>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", gap: 2 }}>{renderStars(review.rating)}</div>
                  <span style={{ fontSize: 12, color: "var(--ink4)" }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="review-text">{review.comment}</p>

              <div className="review-actions">
                {!review.isApproved && (
                  <button onClick={() => approveReview(review._id)} className="approve-btn">
                    <span className="material-symbols-rounded" style={{ fontSize: 18 }}>check_circle</span>
                    Approve
                  </button>
                )}
                {review.isApproved && (
                  <span className="approved-badge">
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>verified</span>
                    Approved
                  </span>
                )}
                <button onClick={() => deleteReview(review._id)} className="delete-btn">
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>delete</span>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .tab-btn {
          padding: 8px 18px;
          border: 1px solid var(--line2);
          border-radius: 20px;
          background: #fff;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          color: var(--ink3);
          transition: var(--tr);
        }
        .tab-btn:hover { background: var(--iv2); }
        .tab-btn.active {
          background: var(--gn);
          color: #fff;
          border-color: var(--gn);
        }
        .review-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .review-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 24px;
        }
        .review-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .review-text {
          font-size: 14px;
          line-height: 1.6;
          color: var(--ink2);
          margin-bottom: 16px;
        }
        .review-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .approve-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--tr);
        }
        .approve-btn:hover { background: #d1fae5; }
        .approved-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #d1fae5;
          color: #059669;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
        }
        .delete-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #fff;
          color: #dc2626;
          border: 1px solid #fecaca;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--tr);
        }
        .delete-btn:hover { background: #fef2f2; }
        @media (max-width: 600px) {
          .review-top {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
