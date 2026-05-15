"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

interface BookingDetail {
  _id: string;
  bookingId: string;
  package: {
    _id: string;
    name: string;
    destination?: { name: string };
    duration?: number;
    images?: string[];
  };
  travelDate: string;
  status: string;
  totalAmount: number;
  travellers: number;
  paymentStatus?: string;
  createdAt: string;
}

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await api.get(`/bookings/${params.id}`);
        const data = res?.data?.booking || res?.data;
        setBooking(data || null);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchBooking();
  }, [params.id]);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await api.put(`/bookings/${params.id}/cancel`);
      if (res?.status === "success") {
        setBooking((prev) => (prev ? { ...prev, status: "cancelled" } : null));
        setShowCancelModal(false);
      }
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    } finally {
      setCancelling(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return { background: "rgba(245,166,35,.12)", color: "var(--cu-d)" };
      case "confirmed":
        return { background: "rgba(0,174,204,.12)", color: "var(--gn2)" };
      case "completed":
        return { background: "rgba(74,194,138,.12)", color: "#388e3c" };
      case "cancelled":
        return { background: "rgba(220,53,69,.1)", color: "#dc3545" };
      default:
        return { background: "var(--gn-gl)", color: "var(--ink3)" };
    }
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

  if (!booking) {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--ink4)" }}>
          error_outline
        </span>
        <p className="syne" style={{ marginTop: 16, fontSize: 16, color: "var(--ink3)" }}>
          Booking not found
        </p>
        <button
          onClick={() => router.push("/dashboard/bookings")}
          className="syne"
          style={{
            marginTop: 20,
            padding: "12px 24px",
            background: "var(--gn)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--r)",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  const canCancel = booking.status === "pending" || booking.status === "confirmed";
  const displayId = booking.bookingId || `LLT-${booking._id.slice(0, 4).toUpperCase()}-${booking._id.slice(-5).toUpperCase()}`;

  return (
    <div>
      {/* Back link */}
      <button
        onClick={() => router.push("/dashboard/bookings")}
        className="syne"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          color: "var(--ink3)",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: 24,
          fontWeight: 500,
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_back</span>
        Back to Bookings
      </button>

      {/* Header */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)",
          padding: 32,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 8 }}>Booking ID</p>
            <p className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", letterSpacing: 0.5 }}>
              {displayId}
            </p>
          </div>
          <span
            className="syne"
            style={{
              ...getStatusStyle(booking.status),
              padding: "8px 20px",
              borderRadius: 24,
              fontSize: 13,
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {booking.status}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="detail-grid">
        {/* Package Info */}
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-xl)",
            padding: 28,
          }}
        >
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink3)", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>
            Package Details
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: "var(--ink3)" }}>Package</p>
              <p className="syne" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>
                {booking.package?.name || "—"}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "var(--ink3)" }}>Destination</p>
              <p className="syne" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>
                {booking.package?.destination?.name || "—"}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "var(--ink3)" }}>Duration</p>
              <p className="syne" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>
                {booking.package?.duration ? `${booking.package.duration} days` : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Travel Info */}
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-xl)",
            padding: 28,
          }}
        >
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink3)", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>
            Travel Information
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: "var(--ink3)" }}>Travel Date</p>
              <p className="syne" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>
                {new Date(booking.travelDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "var(--ink3)" }}>Travellers</p>
              <p className="syne" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>
                {booking.travellers || 1} {(booking.travellers || 1) === 1 ? "person" : "people"}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "var(--ink3)" }}>Total Amount</p>
              <p className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--gn)", marginTop: 4 }}>
                ${booking.totalAmount?.toLocaleString()}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "var(--ink3)" }}>Payment Status</p>
              <p className="syne" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 4, textTransform: "capitalize" }}>
                {booking.paymentStatus || "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {canCancel && (
        <div style={{ marginTop: 32 }}>
          <button
            onClick={() => setShowCancelModal(true)}
            className="syne"
            style={{
              padding: "14px 28px",
              background: "rgba(220,53,69,.08)",
              color: "#dc3545",
              border: "1px solid rgba(220,53,69,.2)",
              borderRadius: "var(--r)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "var(--tr)",
            }}
          >
            Cancel Booking
          </button>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setShowCancelModal(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--r-xl)",
              padding: 32,
              maxWidth: 420,
              width: "100%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 48, color: "#dc3545" }}>
              warning
            </span>
            <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, marginTop: 16, color: "var(--ink)" }}>
              Cancel Booking?
            </h3>
            <p style={{ fontSize: 14, color: "var(--ink3)", marginTop: 12, lineHeight: 1.6 }}>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "center" }}>
              <button
                onClick={() => setShowCancelModal(false)}
                className="syne"
                style={{
                  padding: "12px 24px",
                  background: "var(--iv)",
                  color: "var(--ink2)",
                  border: "1px solid var(--line2)",
                  borderRadius: "var(--r)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="syne"
                style={{
                  padding: "12px 24px",
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--r)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: cancelling ? "not-allowed" : "pointer",
                  opacity: cancelling ? 0.7 : 1,
                }}
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
