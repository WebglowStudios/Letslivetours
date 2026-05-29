"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Review {
  _id: string;
  package: { _id: string; name: string; slug?: string };
  destination?: { _id: string; name: string };
  rating: number;
  title?: string;
  text: string;
  createdAt: string;
}

interface BookingOption {
  _id: string;
  package: { _id: string; name: string; slug?: string };
  status: string;
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [bookings, setBookings] = useState<BookingOption[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Form state
  const [selectedPackage, setSelectedPackage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tripType, setTripType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await api.get("/reviews/me");
      const data = res?.data || [];
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBookings() {
    setLoadingBookings(true);
    try {
      const res = await api.get("/bookings");
      const data = res?.data || [];
      // Filter to completed bookings only
      const completed = (Array.isArray(data) ? data : []).filter(
        (b: BookingOption) => b.status === "completed" || b.status === "confirmed"
      );
      setBookings(completed);
    } catch {
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }

  const openForm = () => {
    setShowForm(true);
    setEditingId(null);
    setSelectedPackage("");
    setRating(0);
    setTitle("");
    setText("");
    setTripType("");
    setFormError("");
    setFormSuccess("");
    fetchBookings();
  };

  const openEditForm = (review: Review) => {
    setShowForm(true);
    setEditingId(review._id);
    setSelectedPackage(review.package._id);
    setRating(review.rating);
    setTitle(review.title || "");
    setText(review.text);
    setTripType("");
    setFormError("");
    setFormSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!selectedPackage) {
      setFormError("Please select a package to review.");
      return;
    }
    if (rating === 0) {
      setFormError("Please select a rating.");
      return;
    }
    if (!text.trim()) {
      setFormError("Please write your review.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        // Update existing review
        const res = await api.put(`/reviews/${editingId}`, {
          rating,
          title: title.trim() || undefined,
          text: text.trim(),
          tripType: tripType || undefined,
        });
        if (res?.status === "success") {
          setFormSuccess("Review updated successfully!");
          setTimeout(() => {
            setShowForm(false);
            fetchReviews();
          }, 1500);
        } else {
          setFormError(res?.message || "Failed to update review.");
        }
      } else {
        // Create new review
        const res = await api.post("/reviews", {
          package: selectedPackage,
          rating,
          title: title.trim() || undefined,
          text: text.trim(),
          tripType: tripType || undefined,
        });
        if (res?.status === "success") {
          setFormSuccess("Review submitted! It will appear after approval.");
          setTimeout(() => {
            setShowForm(false);
            fetchReviews();
          }, 1500);
        } else {
          setFormError(res?.message || "Failed to submit review.");
        }
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.del(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Failed to delete review.");
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className="material-symbols-rounded"
        style={{
          fontSize: 18,
          color: i < count ? "var(--cu)" : "var(--ink4)",
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>
          My Reviews
        </h1>
        <button
          onClick={openForm}
          className="syne"
          style={{
            padding: "10px 22px",
            background: "var(--cu)",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "var(--tr)",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>rate_review</span>
          Write a Review
        </button>
      </div>

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
            Share your travel experience! Click &quot;Write a Review&quot; to review a package you&apos;ve booked.
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
                  <p className="syne" style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>
                    {review.package?.name || "Package"}
                  </p>
                  {review.title && (
                    <p style={{ fontSize: 13, color: "var(--ink2)", fontStyle: "italic", marginBottom: 6 }}>
                      &ldquo;{review.title}&rdquo;
                    </p>
                  )}
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
                }}
              >
                {review.text}
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button
                  onClick={() => openEditForm(review)}
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
                  onClick={() => handleDelete(review._id)}
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

      {/* Write/Edit Review Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setShowForm(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--r-xl)",
              padding: 32,
              maxWidth: 520,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 24 }}>
              {editingId ? "Edit Review" : "Write a Review"}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Package select (only for new reviews) */}
              {!editingId && (
                <div style={{ marginBottom: 20 }}>
                  <label className="syne" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink2)", marginBottom: 8, letterSpacing: 0.5 }}>
                    Select Package *
                  </label>
                  {loadingBookings ? (
                    <p style={{ fontSize: 13, color: "var(--ink3)" }}>Loading your bookings...</p>
                  ) : bookings.length === 0 ? (
                    <p style={{ fontSize: 13, color: "var(--ink3)" }}>
                      No completed bookings found. You can review packages after your trip is confirmed.
                    </p>
                  ) : (
                    <select
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid var(--line2)",
                        borderRadius: "var(--r)",
                        fontSize: 14,
                        color: "var(--ink)",
                        background: "#fff",
                        outline: "none",
                      }}
                    >
                      <option value="">Choose a package...</option>
                      {bookings.map((b) => (
                        <option key={b._id} value={b.package._id}>
                          {b.package.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {/* Rating */}
              <div style={{ marginBottom: 20 }}>
                <label className="syne" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink2)", marginBottom: 8, letterSpacing: 0.5 }}>
                  Rating *
                </label>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 2,
                      }}
                    >
                      <span
                        className="material-symbols-rounded"
                        style={{
                          fontSize: 32,
                          color: star <= (hoverRating || rating) ? "var(--cu)" : "var(--line2)",
                          transition: "color .15s",
                        }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  {rating > 0 && (
                    <span style={{ alignSelf: "center", marginLeft: 8, fontSize: 14, color: "var(--ink2)", fontWeight: 600 }}>
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: 20 }}>
                <label className="syne" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink2)", marginBottom: 8, letterSpacing: 0.5 }}>
                  Review Title (optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Amazing honeymoon experience!"
                  maxLength={100}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid var(--line2)",
                    borderRadius: "var(--r)",
                    fontSize: 14,
                    color: "var(--ink)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Review text */}
              <div style={{ marginBottom: 20 }}>
                <label className="syne" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink2)", marginBottom: 8, letterSpacing: 0.5 }}>
                  Your Review *
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your experience — what did you love? What could be better? Help other travellers decide..."
                  rows={5}
                  maxLength={1000}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid var(--line2)",
                    borderRadius: "var(--r)",
                    fontSize: 14,
                    color: "var(--ink)",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.6,
                  }}
                />
                <p style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4, textAlign: "right" }}>
                  {text.length}/1000
                </p>
              </div>

              {/* Trip type */}
              <div style={{ marginBottom: 24 }}>
                <label className="syne" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink2)", marginBottom: 8, letterSpacing: 0.5 }}>
                  Trip Type (optional)
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["honeymoon", "family", "solo", "group", "business"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(tripType === type ? "" : type)}
                      className="syne"
                      style={{
                        padding: "7px 16px",
                        borderRadius: 50,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        textTransform: "capitalize",
                        transition: "var(--tr)",
                        ...(tripType === type
                          ? { background: "var(--cu)", color: "#fff", border: "1px solid var(--cu)" }
                          : { background: "transparent", color: "var(--ink3)", border: "1px solid var(--line2)" }
                        ),
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error/Success */}
              {formError && (
                <div style={{ padding: "10px 16px", background: "rgba(220,53,69,.08)", borderRadius: "var(--r)", marginBottom: 16 }}>
                  <p style={{ fontSize: 13, color: "#dc3545" }}>{formError}</p>
                </div>
              )}
              {formSuccess && (
                <div style={{ padding: "10px 16px", background: "rgba(74,194,138,.1)", borderRadius: "var(--r)", marginBottom: 16 }}>
                  <p style={{ fontSize: 13, color: "#388e3c" }}>{formSuccess}</p>
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="syne"
                  style={{
                    padding: "12px 24px",
                    background: "var(--iv)",
                    color: "var(--ink2)",
                    border: "1px solid var(--line2)",
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="syne"
                  style={{
                    padding: "12px 24px",
                    background: "var(--cu)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    transition: "var(--tr)",
                  }}
                >
                  {submitting ? "Submitting..." : editingId ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
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
