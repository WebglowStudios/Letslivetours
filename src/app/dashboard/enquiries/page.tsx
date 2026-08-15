"use client";

import { useEffect, useState } from "react";
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

interface Enquiry {
  _id: string;
  type: string;
  destination?: string;
  packageName?: string;
  status: string;
  createdAt: string;
  assignedTo?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

type FilterTab = "all" | "active" | "closed";

export default function MyEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const res = await api.get("/enquiries/customer/me");
        const data = res?.data?.data || res?.data || [];
        setEnquiries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch enquiries:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter((e) => {
    if (activeTab === "all") return true;
    if (activeTab === "closed") return e.status === "closed" || e.status === "resolved";
    if (activeTab === "active") return e.status !== "closed" && e.status !== "resolved";
    return true;
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "closed", label: "Closed" },
  ];

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
        <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 24 }}>
        My Enquiries
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

      {/* Enquiries List */}
      {filteredEnquiries.length === 0 ? (
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
            assignment
          </span>
          <p className="syne" style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: "var(--ink2)" }}>
            No enquiries found
          </p>
          <p style={{ marginTop: 8, fontSize: 14, color: "var(--ink3)" }}>
            You haven't made any requests matching this filter.
          </p>
          <Link
            href="/destinations"
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
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Explore Destinations
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {filteredEnquiries.map((enquiry) => {
            const statusMeta = getStatusMeta(enquiry.status);
            
            return (
              <div
                key={enquiry._id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-lg)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  transition: "var(--tr)",
                }}
                className="hover-card"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span
                        className="syne"
                        style={{
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          background: statusMeta.background,
                          color: statusMeta.color,
                        }}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 14 }}>{statusMeta.icon}</span>
                        {statusMeta.label}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--ink3)" }}>
                        {formatDate(enquiry.createdAt)}
                      </span>
                    </div>
                    
                    <h3 className="serif" style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)" }}>
                      {enquiry.packageName || enquiry.destination || `${enquiry.type.charAt(0).toUpperCase() + enquiry.type.slice(1)} Enquiry`}
                    </h3>
                  </div>

                  <Link
                    href={`/dashboard/enquiries/${enquiry._id}`}
                    className="syne"
                    style={{
                      padding: "10px 20px",
                      background: "var(--gn-gl)",
                      color: "var(--gn2)",
                      borderRadius: "var(--r)",
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    View Details
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
                  </Link>
                </div>

                <div style={{ height: 1, background: "var(--line2)" }} />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  <div>
                    <p className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 4 }}>
                      Enquiry ID
                    </p>
                    <p style={{ fontSize: 14, color: "var(--ink2)", fontFamily: "monospace" }}>
                      {enquiry._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 4 }}>
                      Assigned To
                    </p>
                    <p style={{ fontSize: 14, color: "var(--ink2)", display: "flex", alignItems: "center", gap: 6 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--gn2)" }}>support_agent</span>
                      {enquiry.assignedTo
                        ? `${enquiry.assignedTo.firstName} ${enquiry.assignedTo.lastName}`
                        : "An expert from our team will be assigned shortly"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .hover-card:hover {
          border-color: var(--gn2) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
      `}</style>
    </div>
  );
}
