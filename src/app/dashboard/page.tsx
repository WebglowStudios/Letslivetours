"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import Link from "next/link";

interface Booking {
  _id: string;
  package: { name: string; destination?: { name: string }; images?: string[] };
  travelDate: string;
  status: string;
  totalAmount: number;
}

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingTrips: 0,
    wishlistItems: 0,
    reviewsWritten: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsRes, wishlistRes] = await Promise.all([
          api.get("/bookings"),
          api.get("/users/wishlist"),
        ]);

        const bookings = bookingsRes?.data?.bookings || bookingsRes?.data || [];
        const wishlist = wishlistRes?.data?.wishlist || wishlistRes?.data || [];

        const now = new Date();
        const upcoming = Array.isArray(bookings)
          ? bookings.filter(
              (b: Booking) =>
                new Date(b.travelDate) > now &&
                (b.status === "confirmed" || b.status === "pending")
            )
          : [];

        setStats({
          totalBookings: Array.isArray(bookings) ? bookings.length : 0,
          upcomingTrips: upcoming.length,
          wishlistItems: Array.isArray(wishlist) ? wishlist.length : 0,
          reviewsWritten: 0,
        });

        setRecentBookings(
          Array.isArray(bookings) ? bookings.slice(0, 3) : []
        );
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    { icon: "confirmation_number", label: "Total Bookings", value: stats.totalBookings, color: "var(--gn2)" },
    { icon: "flight_takeoff", label: "Upcoming Trips", value: stats.upcomingTrips, color: "var(--gn3)" },
    { icon: "favorite", label: "Wishlist Items", value: stats.wishlistItems, color: "#e91e63" },
    { icon: "rate_review", label: "Reviews Written", value: stats.reviewsWritten, color: "var(--cu)" },
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
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 32 }}>
        Welcome back, {user?.firstName}!
      </h1>

      {/* Stat Cards */}
      <div className="stat-grid">
        {statCards.map((card) => (
          <div key={card.label} className="stat-card">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--gn-gl)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 24, color: card.color }}>
                {card.icon}
              </span>
            </div>
            <p className="serif" style={{ fontSize: 32, fontWeight: 700, color: "var(--ink)" }}>
              {card.value}
            </p>
            <p className="syne" style={{ fontSize: 13, color: "var(--ink3)", marginTop: 4 }}>
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)" }}>
            Recent Bookings
          </h2>
          <Link
            href="/dashboard/bookings"
            className="syne"
            style={{ fontSize: 13, color: "var(--gn2)", fontWeight: 600 }}
          >
            View All →
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-xl)",
              padding: 40,
              textAlign: "center",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 48, color: "var(--ink4)" }}>
              luggage
            </span>
            <p className="syne" style={{ marginTop: 12, color: "var(--ink3)", fontSize: 14 }}>
              No bookings yet. Start exploring!
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentBookings.map((booking) => (
              <Link
                key={booking._id}
                href={`/dashboard/bookings/${booking._id}`}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-xl)",
                  padding: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  transition: "var(--tr)",
                }}
                className="booking-card"
              >
                <div style={{ flex: 1 }}>
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
                </div>
                <span
                  className="syne"
                  style={{
                    ...getStatusStyle(booking.status),
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {booking.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Link
          href="/packages"
          className="syne"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            background: "var(--gn)",
            color: "#fff",
            borderRadius: "var(--r)",
            fontSize: 14,
            fontWeight: 600,
            transition: "var(--tr)",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>explore</span>
          Browse Packages
        </Link>
        <Link
          href="/dashboard/profile"
          className="syne"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            background: "#fff",
            color: "var(--ink)",
            border: "1px solid var(--line2)",
            borderRadius: "var(--r)",
            fontSize: 14,
            fontWeight: 600,
            transition: "var(--tr)",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>person</span>
          Update Profile
        </Link>
      </div>

      <style jsx>{`
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r-xl);
          padding: 24px;
        }
        .booking-card:hover {
          box-shadow: var(--sh);
          border-color: var(--line2);
        }
        @media (max-width: 1024px) {
          .stat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .stat-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
