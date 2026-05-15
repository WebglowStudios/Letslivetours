"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

interface Booking {
  _id: string;
  package: {
    _id: string;
    name: string;
    destination?: { name: string };
    images?: string[];
    duration?: number;
  };
  travelDate: string;
  status: string;
  totalAmount: number;
  travellers: number;
}

type FilterTab = "all" | "upcoming" | "completed" | "cancelled";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await api.get("/bookings");
        const data = res?.data?.bookings || res?.data || [];
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") {
      return (
        new Date(b.travelDate) > new Date() &&
        (b.status === "confirmed" || b.status === "pending")
      );
    }
    return b.status === activeTab;
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

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

  return (
    <div>
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 24 }}>
        My Bookings
      </h1>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="syne"
            style={{
              padding: "10px 20px",
              borderRadius: 24,
              border: "1px solid",
              borderColor: activeTab === tab.key ? "var(--gn)" : "var(--line2)",
              background: activeTab === tab.key ? "var(--gn)" : "#fff",
              color: activeTab === tab.key ? "#fff" : "var(--ink2)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "var(--tr)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
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
            luggage
          </span>
          <p className="syne" style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: "var(--ink2)" }}>
            No bookings yet
          </p>
          <p style={{ marginTop: 8, fontSize: 14, color: "var(--ink3)" }}>
            Start planning your next adventure!
          </p>
          <Link
            href="/packages"
            className="syne"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 24,
              padding: "14px 28px",
              background: "var(--gn)",
              color: "#fff",
              borderRadius: "var(--r)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Browse Packages
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="booking-item"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-xl)",
                padding: 24,
                display: "flex",
                alignItems: "center",
                gap: 20,
                transition: "var(--tr)",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "var(--r)",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "var(--iv2)",
                }}
              >
                {booking.package?.images?.[0] ? (
                  <img
                    src={booking.package.images[0]}
                    alt={booking.package.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--ink4)" }}>
                      image
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="syne" style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>
                  {booking.package?.name || "Package"}
                </p>
                <p style={{ fontSize: 13, color: "var(--ink3)", marginTop: 4 }}>
                  {booking.package?.destination?.name || "—"} •{" "}
                  {new Date(booking.travelDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
                  <span
                    className="syne"
                    style={{
                      ...getStatusStyle(booking.status),
                      padding: "4px 12px",
                      borderRadius: 16,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {booking.status}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--ink3)" }}>
                    ${booking.totalAmount?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action */}
              <Link
                href={`/dashboard/bookings/${booking._id}`}
                className="syne"
                style={{
                  padding: "10px 20px",
                  background: "var(--gn-gl)",
                  color: "var(--gn2)",
                  borderRadius: "var(--r)",
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  transition: "var(--tr)",
                }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .booking-item:hover {
          box-shadow: var(--sh);
          border-color: var(--line2);
        }
        @media (max-width: 640px) {
          .booking-item {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}
