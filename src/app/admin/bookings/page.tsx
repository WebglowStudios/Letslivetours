"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";

interface Booking {
  _id: string;
  user?: { firstName: string; lastName: string; email: string };
  package?: { name: string };
  travelDate: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const limit = 15;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = `/bookings/all?page=${page}&limit=${limit}`;
      if (statusFilter !== "all") endpoint += `&status=${statusFilter}`;
      if (paymentFilter !== "all") endpoint += `&paymentStatus=${paymentFilter}`;

      const res = await api.get(endpoint);
      const data = res?.data?.bookings || res?.data || [];
      setBookings(Array.isArray(data) ? data : []);
      setTotal(res?.total || res?.data?.total || 0);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, paymentFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.put(`/bookings/${id}/status`, { status: newStatus });
      fetchBookings();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h1 className="serif" style={{ fontSize: 28, marginBottom: 28, color: "var(--ink)" }}>
        Manage Bookings
      </h1>

      {/* Filters */}
      <div className="filter-row">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
          className="filter-select"
        >
          <option value="all">All Payments</option>
          <option value="pending">Payment Pending</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--gn)", animation: "spin 1s linear infinite" }}>
            progress_activity
          </span>
        </div>
      ) : (
        <div className="admin-table">
          <div className="table-header">
            <span>Booking ID</span>
            <span>Customer</span>
            <span>Package</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Payment</span>
            <span>Actions</span>
          </div>
          {bookings.length === 0 && (
            <div style={{ padding: 32, textAlign: "center", color: "var(--ink3)" }}>
              No bookings found
            </div>
          )}
          {bookings.map((booking) => (
            <div key={booking._id} className="table-row">
              <span style={{ fontSize: 12, fontFamily: "monospace" }}>
                {booking._id.slice(-8)}
              </span>
              <span>
                {booking.user ? `${booking.user.firstName} ${booking.user.lastName}` : "N/A"}
              </span>
              <span>{booking.package?.name || "N/A"}</span>
              <span style={{ fontSize: 13 }}>
                {booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : "—"}
              </span>
              <span style={{ fontWeight: 600 }}>${booking.totalAmount?.toLocaleString()}</span>
              <span>
                <span className={`status-badge status-${booking.status}`}>{booking.status}</span>
              </span>
              <span>
                <span className={`payment-badge payment-${booking.paymentStatus}`}>
                  {booking.paymentStatus}
                </span>
              </span>
              <span>
                <select
                  value={booking.status}
                  onChange={(e) => updateStatus(booking._id, e.target.value)}
                  className="action-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="page-btn"
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>chevron_left</span>
          </button>
          <span style={{ fontSize: 14, color: "var(--ink3)" }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="page-btn"
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>chevron_right</span>
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .filter-row {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .filter-select {
          padding: 10px 16px;
          border: 1px solid var(--line2);
          border-radius: 10px;
          font-size: 13px;
          background: #fff;
          color: var(--ink);
          cursor: pointer;
          outline: none;
        }
        .filter-select:focus {
          border-color: var(--gn2);
        }
        .admin-table {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .table-header {
          display: grid;
          grid-template-columns: 1fr 1.3fr 1.3fr 1fr 0.8fr 1fr 0.9fr 1fr;
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
          grid-template-columns: 1fr 1.3fr 1.3fr 1fr 0.8fr 1fr 0.9fr 1fr;
          padding: 16px 20px;
          border-bottom: 1px solid var(--line);
          align-items: center;
          font-size: 14px;
        }
        .table-row:last-child { border-bottom: none; }
        .table-row:hover { background: var(--iv); }
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
        .payment-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .payment-pending { background: #fff3cd; color: #856404; }
        .payment-paid { background: #d4edda; color: #155724; }
        .payment-refunded { background: #e2e3e5; color: #383d41; }
        .action-select {
          padding: 6px 10px;
          border: 1px solid var(--line2);
          border-radius: 8px;
          font-size: 12px;
          background: #fff;
          cursor: pointer;
          outline: none;
        }
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 24px;
        }
        .page-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--line2);
          border-radius: 10px;
          background: #fff;
          cursor: pointer;
          color: var(--ink);
        }
        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .page-btn:hover:not(:disabled) {
          background: var(--iv2);
        }
        @media (max-width: 900px) {
          .table-header, .table-row {
            grid-template-columns: 1fr 1.2fr 1fr 1fr 1fr;
          }
          .table-header span:nth-child(4),
          .table-header span:nth-child(7),
          .table-header span:nth-child(8),
          .table-row span:nth-child(4),
          .table-row span:nth-child(7),
          .table-row span:nth-child(8) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
