"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function EnquiryDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [enquiry, setEnquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Feedback state
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComments, setFeedbackComments] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  useEffect(() => {
    async function fetchEnquiry() {
      try {
        const res = await api.get(`/enquiries/customer/me/${id}`);
        setEnquiry(res?.data?.data || res?.data);
      } catch (err) {
        console.error("Failed to fetch enquiry:", err);
        router.push("/dashboard/enquiries");
      } finally {
        setLoading(false);
      }
    }
    fetchEnquiry();
  }, [id, router]);

  useEffect(() => {
    if (enquiry?.feedback) {
      setFeedbackRating(enquiry.feedback.rating || 0);
      setFeedbackComments(enquiry.feedback.comments || "");
    }
  }, [enquiry]);

  async function handleSubmitFeedback() {
    if (!feedbackRating) return;
    setSubmittingFeedback(true);
    try {
      await api.post(`/enquiries/customer/me/${id}/feedback`, {
        rating: feedbackRating,
        comments: feedbackComments,
      });
      setFeedbackSuccess(true);
      setTimeout(() => setFeedbackSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmittingFeedback(false);
    }
  }

  // Map internal admin statuses → customer-friendly labels & colours
  const getStatusMeta = (status: string) => {
    switch (status) {
      case "new":
        return { background: "rgba(0,174,204,.12)", color: "var(--gn2)", label: "Request Received", icon: "mark_email_read" };
      case "assigned":
        return { background: "rgba(245,166,35,.12)", color: "var(--cu-d)", label: "Expert Assigned", icon: "support_agent" };
      case "in-progress":
        return { background: "rgba(245,166,35,.12)", color: "var(--cu-d)", label: "Being Processed", icon: "pending_actions" };
      case "follow-up":
        return { background: "rgba(245,166,35,.12)", color: "var(--cu-d)", label: "Follow-up Scheduled", icon: "event" };
      case "converted":
        return { background: "rgba(74,194,138,.12)", color: "#388e3c", label: "Booking Confirmed", icon: "verified" };
      case "resolved":
        return { background: "rgba(74,194,138,.12)", color: "#388e3c", label: "Completed", icon: "task_alt" };
      case "closed":
        return { background: "rgba(220,53,69,.1)", color: "#dc3545", label: "Closed", icon: "cancel" };
      default:
        return { background: "var(--gn-gl)", color: "var(--ink3)", label: "In Review", icon: "hourglass_empty" };
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--gn2)", animation: "spin 1s linear infinite" }}>
          progress_activity
        </span>
      </div>
    );
  }

  if (!enquiry) return null;

  const statusMeta = getStatusMeta(enquiry.status);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/dashboard/enquiries"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 14,
            fontWeight: 600,
            color: "var(--ink3)",
            textDecoration: "none",
            marginBottom: 16,
          }}
          className="syne"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_back</span>
          Back to Enquiries
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
              {enquiry.packageName || enquiry.destination || `${enquiry.type.charAt(0).toUpperCase() + enquiry.type.slice(1)} Enquiry`}
            </h1>
            <p className="syne" style={{ fontSize: 14, color: "var(--ink3)" }}>
              ID: {enquiry._id.slice(-8).toUpperCase()} • Submitted {formatDate(enquiry.createdAt)}
            </p>
          </div>
          <span
            className="syne"
            style={{
              padding: "6px 16px",
              borderRadius: 24,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: statusMeta.background,
              color: statusMeta.color,
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>{statusMeta.icon}</span>
            {statusMeta.label}
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Details Card */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 20 }}>Request Details</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              <div>
                <p className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Destination</p>
                <p style={{ fontSize: 15, color: "var(--ink2)", fontWeight: 500 }}>{enquiry.destination || "Not specified"}</p>
              </div>
              <div>
                <p className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Travel Date</p>
                <p style={{ fontSize: 15, color: "var(--ink2)", fontWeight: 500 }}>{enquiry.travelDate ? formatDate(enquiry.travelDate) : "Flexible / Not specified"}</p>
              </div>
              <div>
                <p className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Travellers</p>
                <p style={{ fontSize: 15, color: "var(--ink2)", fontWeight: 500 }}>{enquiry.travellerCount || "Not specified"}</p>
              </div>
              {enquiry.budget > 0 && (
                <div>
                  <p className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Budget</p>
                  <p style={{ fontSize: 15, color: "var(--ink2)", fontWeight: 500 }}>{formatCurrency(enquiry.budget)}</p>
                </div>
              )}
            </div>

            {enquiry.message && (
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
                <p className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 8 }}>Your Message</p>
                <div style={{ background: "var(--iv)", padding: 16, borderRadius: "var(--r)", fontSize: 14, color: "var(--ink2)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {enquiry.message}
                </div>
              </div>
            )}

            {enquiry.bookingRef && (
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
                <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>Booking Information</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--iv)", padding: 16, borderRadius: "var(--r)", border: "1px solid var(--line)" }}>
                  <div>
                    <p style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 4 }}>Booking Reference</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{enquiry.bookingRef.bookingId || "Pending"}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 4 }}>Payment Status</p>
                    <span className="syne" style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      background: ['paid', 'full', 'partial'].includes(enquiry.bookingRef.paymentStatus || '') ? "rgba(74,194,138,.12)" : "rgba(245,166,35,.12)",
                      color: ['paid', 'full', 'partial'].includes(enquiry.bookingRef.paymentStatus || '') ? "#388e3c" : "var(--cu-d)",
                    }}>
                      {['paid', 'full'].includes(enquiry.bookingRef.paymentStatus || '') ? "Fully Paid" : 
                       enquiry.bookingRef.paymentStatus === 'partial' ? "Partially Paid" : "Pending"}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 4 }}>Amount</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{formatCurrency(enquiry.bookingRef.totalAmount || 0)}</p>
                  </div>
                  <Link
                    href={`/dashboard/bookings/${enquiry.bookingRef._id}`}
                    style={{
                      padding: "8px 16px",
                      background: "var(--gn)",
                      color: "#fff",
                      borderRadius: "var(--r)",
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-block"
                    }}
                  >
                    View Booking
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Assigned Staff */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>Your Travel Expert</h3>
            
            {enquiry.assignedTo ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {enquiry.assignedTo.avatar ? (
                    <img src={enquiry.assignedTo.avatar} alt={`${enquiry.assignedTo.firstName} ${enquiry.assignedTo.lastName}`} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--gn-gl)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gn2)", fontWeight: 700, fontSize: 18 }} className="syne">
                      {enquiry.assignedTo.firstName?.[0]}{enquiry.assignedTo.lastName?.[0]}
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{enquiry.assignedTo.firstName} {enquiry.assignedTo.lastName}</p>
                    <p style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 4 }}>Currently reviewing your request</p>
                    {enquiry.assignedTo.phone && (
                      <p style={{ fontSize: 13, color: "var(--ink2)", display: "flex", alignItems: "center", gap: 4 }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--gn2)" }}>call</span>
                        {enquiry.assignedTo.phone}
                      </p>
                    )}
                  </div>
                </div>
                {enquiry.assignedTo.description && (
                  <div style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, background: "var(--iv)", padding: 14, borderRadius: "var(--r)", border: "1px solid var(--line)" }}>
                    {enquiry.assignedTo.description}
                  </div>
                )}
                
                {/* Feedback Section */}
                <div style={{ marginTop: 8, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                  <p className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>Rate your Travel Expert</p>
                  
                  {enquiry.feedback && !feedbackSuccess && feedbackRating === enquiry.feedback.rating ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="material-symbols-rounded" style={{ fontSize: 20, color: star <= feedbackRating ? "#FFB400" : "var(--line)", cursor: "pointer", transition: "color 0.2s" }} onClick={() => setFeedbackRating(star)}>
                            star
                          </span>
                        ))}
                      </div>
                      {enquiry.feedback.comments && (
                        <p style={{ fontSize: 13, color: "var(--ink2)", fontStyle: "italic", background: "var(--iv)", padding: "8px 12px", borderRadius: 8 }}>"{enquiry.feedback.comments}"</p>
                      )}
                      <p style={{ fontSize: 11, color: "var(--ink4)" }}>Click the stars above to update your rating.</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="material-symbols-rounded" style={{ fontSize: 24, color: star <= feedbackRating ? "#FFB400" : "var(--line)", cursor: "pointer", transition: "color 0.2s", WebkitTapHighlightColor: "transparent" }} onClick={() => setFeedbackRating(star)}>
                            star
                          </span>
                        ))}
                      </div>
                      <textarea
                        value={feedbackComments}
                        onChange={(e) => setFeedbackComments(e.target.value)}
                        placeholder="Share your experience (optional)..."
                        style={{ width: "100%", padding: 12, borderRadius: "var(--r)", border: "1px solid var(--line)", fontSize: 13, resize: "vertical", minHeight: 80, fontFamily: "inherit", outline: "none" }}
                      />
                      <button onClick={handleSubmitFeedback} disabled={submittingFeedback || !feedbackRating} style={{ background: feedbackRating ? "var(--ink)" : "var(--line)", color: feedbackRating ? "#fff" : "var(--ink4)", padding: "10px", borderRadius: "50px", fontSize: 13, fontWeight: 600, border: "none", cursor: feedbackRating ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
                        {submittingFeedback ? <span className="material-symbols-rounded" style={{ fontSize: 16, animation: "spin 1s linear infinite" }}>sync</span> : null}
                        {feedbackSuccess ? "Submitted!" : (enquiry.feedback ? "Update Feedback" : "Submit Feedback")}
                      </button>
                      {feedbackSuccess && <p style={{ fontSize: 12, color: "var(--gn)", textAlign: "center", fontWeight: 600 }}>Thank you for your feedback!</p>}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--ink4)", marginBottom: 8 }}>hourglass_empty</span>
                <p style={{ fontSize: 14, color: "var(--ink3)" }}>We are assigning a travel expert to your request. We'll be in touch soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 300px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
