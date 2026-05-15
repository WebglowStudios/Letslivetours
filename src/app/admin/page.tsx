"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  color: string;
}

interface Booking {
  _id: string;
  user?: { firstName: string; lastName: string };
  package?: { name: string };
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [bookingsRes, usersRes, enquiriesRes, packagesRes, reviewsRes] = await Promise.all([
          api.get("/bookings/all?limit=1"),
          api.get("/users?limit=1"),
          api.get("/enquiries?status=new&limit=1"),
          api.get("/packages?limit=1"),
          api.get("/reviews"),
        ]);

        const totalBookings = bookingsRes?.total || bookingsRes?.data?.total || 0;
        const totalUsers = usersRes?.total || usersRes?.data?.total || 0;
        const pendingEnquiries = enquiriesRes?.total || enquiriesRes?.data?.total || 0;
        const activePackages = packagesRes?.total || packagesRes?.data?.total || 0;

        const reviews = reviewsRes?.data || reviewsRes?.reviews || [];
        const pendingReviews = Array.isArray(reviews)
          ? reviews.filter((r: { isApproved?: boolean }) => !r.isApproved).length
          : 0;

        // Fetch all bookings for revenue calculation
        const allBookingsRes = await api.get("/bookings/all?limit=100");
        const allBookings = allBookingsRes?.data?.bookings || allBookingsRes?.data || [];
        const totalRevenue = Array.isArray(allBookings)
          ? allBookings.reduce((sum: number, b: Booking) => sum + (b.totalAmount || 0), 0)
          : 0;

        setStats([
          { label: "Total Bookings", value: totalBookings, icon: "confirmation_number", color: "#007a96" },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: "payments", color: "#29C4D8" },
          { label: "Active Users", value: totalUsers, icon: "group", color: "#004d5e" },
          { label: "Pending Enquiries", value: pendingEnquiries, icon: "mail", color: "#F5A623" },
          { label: "Active Packages", value: activePackages, icon: "inventory_2", color: "#00AECC" },
          { label: "Pending Reviews", value: pendingReviews, icon: "rate_review", color: "#c07d10" },
        ]);

        // Recent bookings
        const recentRes = await api.get("/bookings/all?limit=5&sort=-createdAt");
        const recent = recentRes?.data?.bookings || recentRes?.data || [];
        setRecentBookings(Array.isArray(recent) ? recent : []);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

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
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon" style={{ background: `${stat.color}15` }}>
              <span className="material-symbols-rounded" style={{ fontSize: 26, color: stat.color }}>
                {stat.icon}
              </span>
            </div>
            <div className="stat-value serif">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--ink2)" }}>
          Recent Bookings
        </h2>
        <div className="recent-table">
          <div className="table-header">
            <span>Customer</span>
            <span>Package</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Date</span>
          </div>
          {recentBookings.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: "var(--ink3)" }}>
              No bookings yet
            </div>
          )}
          {recentBookings.map((booking) => (
            <div key={booking._id} className="table-row">
              <span>{booking.user ? `${booking.user.firstName} ${booking.user.lastName}` : "N/A"}</span>
              <span>{booking.package?.name || "N/A"}</span>
              <span style={{ fontWeight: 600 }}>${booking.totalAmount?.toLocaleString()}</span>
              <span>
                <span className={`status-badge status-${booking.status}`}>{booking.status}</span>
              </span>
              <span style={{ color: "var(--ink3)", fontSize: 13 }}>
                {new Date(booking.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r-xl);
          padding: 28px;
        }
        .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 13px;
          color: var(--ink3);
          font-weight: 500;
        }
        .recent-table {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .table-header {
          display: grid;
          grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr;
          padding: 14px 20px;
          background: var(--iv2);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--ink3);
        }
        .table-row {
          display: grid;
          grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr;
          padding: 16px 20px;
          border-bottom: 1px solid var(--line);
          align-items: center;
          font-size: 14px;
        }
        .table-row:last-child {
          border-bottom: none;
        }
        .table-row:hover {
          background: var(--iv);
        }
        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-confirmed { background: #d1ecf1; color: #0c5460; }
        .status-completed { background: #d4edda; color: #155724; }
        .status-cancelled { background: #f8d7da; color: #721c24; }
        .status-in-progress { background: #cce5ff; color: #004085; }
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .table-header, .table-row {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .table-header span:nth-child(4),
          .table-header span:nth-child(5),
          .table-row span:nth-child(4),
          .table-row span:nth-child(5) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
