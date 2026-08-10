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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "new":
        return { background: "rgba(0,174,204,.12)", color: "var(--gn2)", text: "Received" };
      case "assigned":
      case "in-progress":
      case "follow-up":
        return { background: "rgba(245,166,35,.12)", color: "var(--cu-d)", text: "In Progress" };
      case "converted":
      case "resolved":
        return { background: "rgba(74,194,138,.12)", color: "#388e3c", text: "Converted / Completed" };
      case "closed":
        return { background: "rgba(220,53,69,.1)", color: "#dc3545", text: "Closed" };
      default:
        return { background: "var(--gn-gl)", color: "var(--ink3)", text: status };
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

  const statusStyle = getStatusStyle(enquiry.status);

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
              ...statusStyle,
            }}
          >
            {statusStyle.text}
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
                    <p style={{ fontSize: 13, color: "var(--ink3)" }}>Currently reviewing your request</p>
                  </div>
                </div>
                {enquiry.assignedTo.description && (
                  <div style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, background: "var(--iv)", padding: 14, borderRadius: "var(--r)", border: "1px solid var(--line)" }}>
                    {enquiry.assignedTo.description}
                  </div>
                )}
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
