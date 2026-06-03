"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface ReviewsProps {
  packageId: string;
}

interface Review {
  _id: string;
  userName?: string;
  user?: { firstName: string; lastName: string; avatar?: string };
  rating: number;
  comment?: string;
  text?: string;
  title?: string;
  travelType?: string;
  tripType?: string;
  createdAt: string;
  avatar?: string;
}

export default function Reviews({ packageId }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Review form state
  const [canReview, setCanReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [formTripType, setFormTripType] = useState("");
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
          if (data.length > 0) {
            const avg = data.reduce((sum: number, r: Review) => sum + r.rating, 0) / data.length;
            setAvgRating(Math.round(avg * 10) / 10);
          }
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    };

    const checkCanReview = async () => {
      try {
        const res = await api.get(`/reviews/can-review/${packageId}`);
        if (res.status === "success") {
          if (res.data.canReview) {
            setCanReview(true);
          } else if (res.data.reason === "already_reviewed") {
            setAlreadyReviewed(true);
          }
        }
      } catch {
        // User not logged in or other error — just don't show form
      }
    };

    fetchReviews();
    checkCanReview();
  }, [packageId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formText.trim()) {
      setSubmitError("Please write your review");
      return;
    }
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await api.post("/reviews", {
        package: packageId,
        rating: formRating,
        title: formTitle.trim() || undefined,
        text: formText.trim(),
        tripType: formTripType || undefined,
      });

      if (res.status === "success") {
        setSubmitSuccess(true);
        setCanReview(false);
        setAlreadyReviewed(true);
        setShowForm(false);
        // Refresh reviews
        const refreshRes = await api.get(`/reviews/package/${packageId}`);
        if (refreshRes.status === "success") {
          const data = refreshRes.data?.reviews || refreshRes.data || [];
          setReviews(data);
          setTotalReviews(data.length);
          if (data.length > 0) {
            const avg = data.reduce((sum: number, r: Review) => sum + r.rating, 0) / data.length;
            setAvgRating(Math.round(avg * 10) / 10);
          }
        }
      } else {
        setSubmitError(res.message || "Failed to submit review");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStarStr = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
  };

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getReviewName = (review: Review) => {
    if (review.user) return `${review.user.firstName} ${review.user.lastName}`;
    if (review.userName) return review.userName;
    return "Anonymous";
  };

  const getReviewAvatar = (review: Review) => {
    return review.user?.avatar || review.avatar;
  };

  const getReviewText = (review: Review) => {
    return review.text || review.comment || "";
  };

  const getReviewTripType = (review: Review) => {
    return review.tripType || review.travelType || "";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getRatingBars = () => {
    if (reviews.length === 0) return [];
    const counts = [0, 0, 0, 0, 0];
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
      {/* Write a Review Section */}
      {canReview && !submitSuccess && (
        <div style={{ marginBottom: 32 }}>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "var(--gn)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--r-xl)",
                cursor: "pointer",
                fontFamily: "var(--font-syne), 'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                transition: "var(--tr)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>edit_note</span>
              Write a Review
            </button>
          ) : (
            <form onSubmit={handleSubmitReview} style={{
              background: "#fff",
              border: "1.5px solid var(--line)",
              borderRadius: "var(--r-xl)",
              padding: "28px 26px",
            }}>
              <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 20 }}>
                Share Your Experience
              </h3>

              {/* Star Rating */}
              <div style={{ marginBottom: 20 }}>
                <label className="syne" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink3)", display: "block", marginBottom: 8 }}>
                  Your Rating
                </label>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      onMouseEnter={() => setFormHoverRating(star)}
                      onMouseLeave={() => setFormHoverRating(0)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 32,
                        color: star <= (formHoverRating || formRating) ? "var(--cu)" : "var(--iv3)",
                        transition: "color 0.15s ease",
                        padding: 2,
                        lineHeight: 1,
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    fontSize: 13,
                    color: "var(--ink4)",
                    alignSelf: "center",
                    marginLeft: 8,
                  }}>
                    {formRating}/5
                  </span>
                </div>
              </div>

              {/* Trip Type */}
              <div style={{ marginBottom: 20 }}>
                <label className="syne" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink3)", display: "block", marginBottom: 8 }}>
                  Trip Type (optional)
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["honeymoon", "family", "solo", "group", "business"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormTripType(formTripType === type ? "" : type)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 50,
                        border: `1.5px solid ${formTripType === type ? "var(--gn)" : "var(--line)"}`,
                        background: formTripType === type ? "var(--gn-gl)" : "#fff",
                        color: formTripType === type ? "var(--gn2)" : "var(--ink3)",
                        fontFamily: "var(--font-syne), 'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: "pointer",
                        textTransform: "capitalize",
                        transition: "var(--tr)",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: 16 }}>
                <label className="syne" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink3)", display: "block", marginBottom: 8 }}>
                  Review Title (optional)
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Sum up your experience in a line..."
                  maxLength={100}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid var(--line)",
                    borderRadius: "var(--r-lg)",
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    fontSize: 14,
                    color: "var(--ink)",
                    outline: "none",
                    transition: "var(--tr)",
                  }}
                />
              </div>

              {/* Review Text */}
              <div style={{ marginBottom: 20 }}>
                <label className="syne" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink3)", display: "block", marginBottom: 8 }}>
                  Your Review *
                </label>
                <textarea
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Tell others about your experience — what you loved, tips, and highlights..."
                  rows={5}
                  maxLength={2000}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1.5px solid var(--line)",
                    borderRadius: "var(--r-lg)",
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    fontSize: 14,
                    color: "var(--ink)",
                    outline: "none",
                    resize: "vertical",
                    minHeight: 120,
                    transition: "var(--tr)",
                  }}
                />
                <div style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontSize: 11,
                  color: "var(--ink4)",
                  textAlign: "right",
                  marginTop: 4,
                }}>
                  {formText.length}/2000
                </div>
              </div>

              {submitError && (
                <div style={{
                  padding: "10px 14px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "var(--r-lg)",
                  color: "#dc2626",
                  fontSize: 13,
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  marginBottom: 16,
                }}>
                  {submitError}
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 24px",
                    background: submitting ? "var(--ink4)" : "var(--gn)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--r-xl)",
                    cursor: submitting ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-syne), 'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    transition: "var(--tr)",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                    {submitting ? "progress_activity" : "send"}
                  </span>
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setSubmitError(""); }}
                  style={{
                    padding: "11px 20px",
                    background: "var(--iv3)",
                    color: "var(--ink3)",
                    border: "none",
                    borderRadius: "var(--r-xl)",
                    cursor: "pointer",
                    fontFamily: "var(--font-syne), 'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Success message after submitting */}
      {submitSuccess && (
        <div style={{
          padding: "16px 20px",
          background: "var(--gn-gl)",
          border: "1.5px solid var(--gn)",
          borderRadius: "var(--r-xl)",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--gn)" }}>check_circle</span>
          <div>
            <p className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--gn2)", marginBottom: 2 }}>
              Thank you for your review!
            </p>
            <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 12, color: "var(--ink3)" }}>
              Your review has been submitted and will be visible once approved by our team.
            </p>
          </div>
        </div>
      )}

      {/* Already reviewed notice */}
      {alreadyReviewed && !submitSuccess && (
        <div style={{
          padding: "14px 18px",
          background: "var(--iv3)",
          borderRadius: "var(--r-xl)",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink4)" }}>info</span>
          <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 13, color: "var(--ink3)" }}>
            You have already reviewed this package. Thank you for sharing your experience!
          </p>
        </div>
      )}

      {/* Empty state */}
      {reviews.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 40, color: "var(--ink4)", display: "block", marginBottom: 10 }}>
            rate_review
          </span>
          <p className="syne" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink3)", marginBottom: 4 }}>
            No reviews yet
          </p>
          <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 13, color: "var(--ink4)" }}>
            Be the first to share your experience!
          </p>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length > 0 && (
        <>
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
                <div style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 13, color: "var(--ink4)", marginTop: 4 }}>
                  Based on {totalReviews} verified review{totalReviews !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* Rating bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 200 }}>
              {ratingBars.map((bar, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="syne" style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink3)", width: 36, textAlign: "right", flexShrink: 0 }}>
                    {bar.label}
                  </span>
                  <div style={{ flex: 1, height: 6, background: "var(--iv3)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, var(--cu), var(--gd))", width: bar.width, transition: "width .6s ease" }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 11, color: "var(--ink4)", width: 28, flexShrink: 0 }}>
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", background: "var(--gn-gl)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {getReviewAvatar(review) ? (
                        <img src={getReviewAvatar(review)} alt={getReviewName(review)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--gn)" }}>
                          {getInitials(getReviewName(review))}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
                        {getReviewName(review)}
                      </div>
                      <div style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 12, color: "var(--ink4)", marginTop: 2 }}>
                        {formatDate(review.createdAt)}{getReviewTripType(review) ? ` · ${getReviewTripType(review)}` : ""}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: "var(--cu)", fontSize: 14, letterSpacing: 1 }}>
                    {"★".repeat(Math.round(review.rating))}{"☆".repeat(5 - Math.round(review.rating))}
                  </div>
                </div>

                {review.title && (
                  <p className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>
                    {review.title}
                  </p>
                )}

                <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 14, color: "var(--ink3)", lineHeight: 1.75 }}>
                  {getReviewText(review)}
                </p>

                <div className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, background: "var(--gn-gl)", color: "var(--gn2)", padding: "4px 12px", borderRadius: 50, marginTop: 12 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 13 }}>verified</span>
                  Verified Booking
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
