"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  type?: string;
  message: string;
  status: string;
  createdAt: string;
}

const tabs = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "In Progress", value: "in-progress" },
  { label: "Resolved", value: "resolved" },
];

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === "all" ? "/enquiries" : `/enquiries?status=${activeTab}`;
      const res = await api.get(endpoint);
      const data = res?.data?.enquiries || res?.data || [];
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.put(`/enquiries/${id}`, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error("Failed to update enquiry status:", err);
    }
  };

  return (
    <div>
      <h1 className="serif" style={{ fontSize: 28, marginBottom: 28, color: "var(--ink)" }}>
        Enquiries
      </h1>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`tab-btn ${activeTab === tab.value ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--gn)", animation: "spin 1s linear infinite" }}>
            progress_activity
          </span>
        </div>
      ) : enquiries.length === 0 ? (
        <div style={{ padding: 48, textAlign: "center", color: "var(--ink3)", background: "#fff", borderRadius: "var(--r)", border: "1px solid var(--line)" }}>
          No enquiries found
        </div>
      ) : (
        <div className="enquiry-list">
          {enquiries.map((enq) => (
            <div key={enq._id} className="enquiry-card">
              <div
                className="enquiry-header"
                onClick={() => setExpandedId(expandedId === enq._id ? null : enq._id)}
                style={{ cursor: "pointer" }}
              >
                <div className="enquiry-info">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{enq.name}</span>
                    {enq.type && <span className="type-badge">{enq.type}</span>}
                    <span className={`status-badge status-${enq.status}`}>{enq.status}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink3)", marginTop: 4 }}>
                    {enq.email} {enq.phone && `• ${enq.phone}`}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink4)", marginTop: 6 }}>
                    {expandedId === enq._id ? enq.message : enq.message.slice(0, 100) + (enq.message.length > 100 ? "..." : "")}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "var(--ink4)" }}>
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink4)" }}>
                    {expandedId === enq._id ? "expand_less" : "expand_more"}
                  </span>
                </div>
              </div>

              {expandedId === enq._id && (
                <div className="enquiry-actions">
                  <select
                    value={enq.status}
                    onChange={(e) => updateStatus(enq._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              )}
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
        .enquiry-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .enquiry-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .enquiry-header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .enquiry-header:hover {
          background: var(--iv);
        }
        .enquiry-info {
          flex: 1;
        }
        .type-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          background: var(--iv2);
          color: var(--gn);
          text-transform: capitalize;
        }
        .status-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status-new { background: #fff3cd; color: #856404; }
        .status-in-progress { background: #cce5ff; color: #004085; }
        .status-resolved { background: #d4edda; color: #155724; }
        .status-closed { background: #e2e3e5; color: #383d41; }
        .enquiry-actions {
          padding: 12px 20px;
          border-top: 1px solid var(--line);
          background: var(--iv);
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .status-select {
          padding: 8px 14px;
          border: 1px solid var(--line2);
          border-radius: 8px;
          font-size: 13px;
          background: #fff;
          cursor: pointer;
          outline: none;
        }
      `}</style>
    </div>
  );
}
