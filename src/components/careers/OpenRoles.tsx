"use client";

import { useState, FormEvent, useEffect } from "react";
import { api } from "@/lib/api";

interface Role {
  id?: string;
  dept: string;
  deptLabel: string;
  icon: string;
  iconCls: string;
  title: string;
  location: string;
  type: string;
  experience: string;
}

const roles: Role[] = [
  { id: "sr-travel-consultant", dept: "operations", deptLabel: "Operations", icon: "travel_explore", iconCls: "ops", title: "Senior Travel Consultant \u2014 Dubai & Middle East", location: "Bengaluru", type: "Full-time", experience: "3\u20135 yrs exp" },
  { id: "customer-exp-manager", dept: "operations", deptLabel: "Operations", icon: "support_agent", iconCls: "ops", title: "Customer Experience Manager", location: "Mumbai", type: "Full-time", experience: "2\u20134 yrs exp" },
  { id: "destination-expert-sea", dept: "operations", deptLabel: "Operations", icon: "map", iconCls: "ops", title: "Destination Expert \u2014 Southeast Asia", location: "Remote", type: "Full-time", experience: "1\u20133 yrs exp" },
  { id: "perf-marketing-lead", dept: "marketing", deptLabel: "Marketing", icon: "campaign", iconCls: "mkt", title: "Performance Marketing Lead \u2014 Paid Social & Search", location: "Bengaluru", type: "Full-time", experience: "4\u20136 yrs exp" },
  { id: "content-strategist", dept: "marketing", deptLabel: "Marketing", icon: "edit_note", iconCls: "mkt", title: "Content Strategist & Travel Writer", location: "Remote", type: "Full-time", experience: "2\u20134 yrs exp" },
  { id: "social-media-creator", dept: "marketing", deptLabel: "Marketing", icon: "photo_camera", iconCls: "mkt", title: "Social Media & Video Creator", location: "Bengaluru", type: "Full-time", experience: "1\u20133 yrs exp" },
  { id: "sr-fullstack-engineer", dept: "technology", deptLabel: "Technology", icon: "code", iconCls: "tech", title: "Senior Full-Stack Engineer (React + Node)", location: "Remote", type: "Full-time", experience: "4\u20137 yrs exp" },
  { id: "product-designer", dept: "technology", deptLabel: "Technology", icon: "palette", iconCls: "tech", title: "Product Designer \u2014 UX/UI (Travel Platform)", location: "Bengaluru", type: "Full-time", experience: "3\u20135 yrs exp" },
  { id: "data-analyst", dept: "technology", deptLabel: "Technology", icon: "analytics", iconCls: "tech", title: "Data Analyst \u2014 Growth & Revenue", location: "Remote", type: "Full-time", experience: "2\u20134 yrs exp" },
  { id: "talent-acquisition", dept: "hr", deptLabel: "People & HR", icon: "people", iconCls: "hr", title: "Talent Acquisition Specialist", location: "Bengaluru", type: "Full-time", experience: "2\u20134 yrs exp" },
  { id: "finance-manager", dept: "finance", deptLabel: "Finance", icon: "account_balance", iconCls: "fin", title: "Finance Manager \u2014 Revenue & Reconciliation", location: "Bengaluru", type: "Full-time", experience: "5\u20138 yrs exp" },
];

const tabs = [
  { key: "all", label: "All Departments" },
  { key: "operations", label: "Operations" },
  { key: "marketing", label: "Marketing" },
  { key: "technology", label: "Technology" },
  { key: "hr", label: "People & HR" },
  { key: "finance", label: "Finance" },
];

function getDeptLabel(dept: string): string {
  const labels: Record<string, string> = {
    operations: "Operations",
    marketing: "Marketing",
    technology: "Technology",
    hr: "People & HR",
    finance: "Finance",
  };
  return labels[dept] || dept;
}

function getDeptIcon(dept: string): string {
  const icons: Record<string, string> = {
    operations: "travel_explore",
    marketing: "campaign",
    technology: "code",
    hr: "people",
    finance: "account_balance",
  };
  return icons[dept] || "work";
}

function getDeptIconCls(dept: string): string {
  const cls: Record<string, string> = {
    operations: "ops",
    marketing: "mkt",
    technology: "tech",
    hr: "hr",
    finance: "fin",
  };
  return cls[dept] || "ops";
}

export default function OpenRoles() {
  const [active, setActive] = useState("all");
  const [applyRole, setApplyRole] = useState<Role | null>(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [fetchedRoles, setFetchedRoles] = useState<Role[]>(roles);
  const [rolesLoading, setRolesLoading] = useState(true);

  // Fetch roles from API on mount
  useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await api.get("/careers");
        if (res.status === "success" && res.data && Array.isArray(res.data)) {
          const mapped: Role[] = res.data.map((r: Record<string, unknown>) => ({
            id: (r.slug as string) || (r._id as string) || "",
            dept: (r.department as string) || "operations",
            deptLabel: getDeptLabel((r.department as string) || "operations"),
            icon: getDeptIcon((r.department as string) || "operations"),
            iconCls: getDeptIconCls((r.department as string) || "operations"),
            title: (r.title as string) || "",
            location: (r.location as string) || "Remote",
            type: (r.type as string) || "Full-time",
            experience: (r.experience as string) || "",
          }));
          if (mapped.length > 0) {
            setFetchedRoles(mapped);
          }
        }
      } catch {
        // Fallback to static roles (already set)
      } finally {
        setRolesLoading(false);
      }
    }
    fetchRoles();
  }, []);

  // Form fields
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyResume, setApplyResume] = useState("");
  const [applyCoverLetter, setApplyCoverLetter] = useState("");

  const filtered = active === "all" ? fetchedRoles : fetchedRoles.filter(r => r.dept === active);

  const openApplyModal = (role: Role) => {
    setApplyRole(role);
    setApplyError("");
    setApplySuccess(false);
    setApplyName("");
    setApplyEmail("");
    setApplyPhone("");
    setApplyResume("");
    setApplyCoverLetter("");
  };

  const closeModal = () => {
    setApplyRole(null);
    setApplyError("");
    setApplySuccess(false);
  };

  // Close modal on success after 2 seconds
  useEffect(() => {
    if (applySuccess) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [applySuccess]);

  const handleApplySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!applyRole) return;

    setApplyError("");
    setApplyLoading(true);

    try {
      const res = await api.post(`/careers/${applyRole.id}/apply`, {
        name: applyName,
        email: applyEmail,
        phone: applyPhone,
        resume: applyResume,
        coverLetter: applyCoverLetter,
      });

      if (res.status === "success") {
        setApplySuccess(true);
      } else {
        setApplyError(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      setApplyError("Network error. Please check your connection and try again.");
    } finally {
      setApplyLoading(false);
    }
  };

  return (
    <section id="open-roles" style={{ padding: "96px 0", background: "var(--iv2)" }}>
      <div className="container">
        <div className="rv">
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            Open Positions
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "var(--ink)", margin: "14px 0 10px", lineHeight: 1.2 }}>
            Find Your <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Role</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", maxWidth: 520, lineHeight: 1.75 }}>
            32 open positions across departments. Filter by team to find the right fit.
          </p>
        </div>

        <div className="rv" style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "36px 0 40px" }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`role-tab syne ${active === tab.key ? "active" : ""}`}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {rolesLoading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink3)", fontSize: 14 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--gn2)", animation: "spin 1s linear infinite", display: "block", marginBottom: 12 }}>progress_activity</span>
              Loading open positions...
            </div>
          ) : filtered.map((role, i) => (
            <div key={i} className="role-card rv">
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div className={`role-dept-icon ${role.iconCls}`}>
                  <span className="material-symbols-rounded">{role.icon}</span>
                </div>
                <div>
                  <div className="syne" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 4 }}>{role.deptLabel}</div>
                  <div className="serif" style={{ fontSize: 19, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>{role.title}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span className="role-tag loc syne"><span className="material-symbols-rounded" style={{ fontSize: 12 }}>location_on</span>{role.location}</span>
                    <span className="role-tag type syne">{role.type}</span>
                    <span className="role-tag exp syne">{role.experience}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <button className="role-apply syne" onClick={() => openApplyModal(role)}>Apply Now</button>
                <div className="role-arrow">
                  <span className="material-symbols-rounded">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
          {!rolesLoading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink3)", fontSize: 15 }}>
              No open roles in this department right now. <a href="/contact" style={{ color: "var(--gn)", fontWeight: 600 }}>Send us your CV anyway →</a>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {applyRole && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          {/* Backdrop */}
          <div
            onClick={closeModal}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,.5)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Modal content */}
          <div
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: "var(--r-xl)",
              padding: 36,
              maxWidth: 500,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 24px 80px rgba(0,0,0,.2)",
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--ink3)" }}>close</span>
            </button>

            {!applySuccess ? (
              <>
                <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>Apply Now</div>
                <div style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 24, lineHeight: 1.5 }}>{applyRole.title}</div>

                {applyError && (
                  <div style={{ padding: "10px 14px", background: "rgba(229,57,53,.08)", border: "1px solid rgba(229,57,53,.2)", borderRadius: 8, marginBottom: 16, fontSize: 12.5, color: "#e53935", display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>error</span>
                    {applyError}
                  </div>
                )}

                <form onSubmit={handleApplySubmit}>
                  <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Rahul Sharma"
                      required
                      value={applyName}
                      onChange={(e) => setApplyName(e.target.value)}
                      style={{ padding: "12px 14px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 10, color: "var(--ink)", fontSize: 13.5, outline: "none", width: "100%", transition: "border-color .2s" }}
                    />
                  </div>

                  <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={applyEmail}
                      onChange={(e) => setApplyEmail(e.target.value)}
                      style={{ padding: "12px 14px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 10, color: "var(--ink)", fontSize: 13.5, outline: "none", width: "100%", transition: "border-color .2s" }}
                    />
                  </div>

                  <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      value={applyPhone}
                      onChange={(e) => setApplyPhone(e.target.value)}
                      style={{ padding: "12px 14px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 10, color: "var(--ink)", fontSize: 13.5, outline: "none", width: "100%", transition: "border-color .2s" }}
                    />
                  </div>

                  <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Resume URL</label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/your-resume"
                      required
                      value={applyResume}
                      onChange={(e) => setApplyResume(e.target.value)}
                      style={{ padding: "12px 14px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 10, color: "var(--ink)", fontSize: 13.5, outline: "none", width: "100%", transition: "border-color .2s" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Cover Letter</label>
                    <textarea
                      placeholder="Tell us why you'd be a great fit..."
                      value={applyCoverLetter}
                      onChange={(e) => setApplyCoverLetter(e.target.value)}
                      style={{ padding: "12px 14px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 10, color: "var(--ink)", fontSize: 13.5, outline: "none", width: "100%", resize: "vertical", minHeight: 100, transition: "border-color .2s" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={applyLoading}
                    className="syne"
                    style={{
                      width: "100%",
                      padding: 14,
                      background: applyLoading ? "var(--ink4)" : "var(--gn)",
                      border: "none",
                      borderRadius: 50,
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: applyLoading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "var(--tr)",
                      boxShadow: "0 6px 20px rgba(0,77,94,.2)",
                      opacity: applyLoading ? 0.7 : 1,
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{applyLoading ? "hourglass_empty" : "send"}</span>
                    {applyLoading ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(74,194,138,.12)", border: "2px solid rgba(74,194,138,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 32, color: "#4AC28A" }}>check_circle</span>
                </div>
                <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>Application Submitted!</div>
                <p style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.6 }}>Thank you for applying. Our team will review your application and get back to you soon.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .role-tab {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--ink3);
          padding: 9px 22px;
          border-radius: 50px;
          border: 1.5px solid var(--line2);
          cursor: pointer;
          transition: var(--tr);
          background: transparent;
        }
        .role-tab:hover {
          border-color: var(--gn);
          color: var(--gn);
        }
        .role-tab.active {
          background: var(--gn);
          color: #fff;
          border-color: var(--gn);
        }
        .role-card {
          background: #fff;
          border-radius: var(--r-xl);
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          border: 1.5px solid var(--line);
          transition: var(--tr);
          cursor: pointer;
        }
        .role-card:hover {
          border-color: var(--gn3);
          box-shadow: var(--sh);
          transform: translateX(4px);
        }
        .role-dept-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .role-dept-icon span {
          font-size: 24px;
        }
        .role-dept-icon.ops {
          background: rgba(0,174,204,.1);
        }
        .role-dept-icon.ops span {
          color: var(--gn3);
        }
        .role-dept-icon.mkt {
          background: rgba(245,166,35,.12);
        }
        .role-dept-icon.mkt span {
          color: var(--cu-d);
        }
        .role-dept-icon.tech {
          background: rgba(41,196,216,.12);
        }
        .role-dept-icon.tech span {
          color: var(--gd);
        }
        .role-dept-icon.hr {
          background: rgba(0,77,94,.08);
        }
        .role-dept-icon.hr span {
          color: var(--gn);
        }
        .role-dept-icon.fin {
          background: rgba(67,160,71,.1);
        }
        .role-dept-icon.fin span {
          color: #388e3c;
        }
        .role-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .role-tag.loc {
          background: var(--gn-gl);
          color: var(--gn2);
        }
        .role-tag.type {
          background: var(--cu-gl);
          color: var(--cu-d);
        }
        .role-tag.exp {
          background: rgba(41,196,216,.1);
          color: var(--gn2);
        }
        .role-apply {
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          background: var(--gn);
          padding: 10px 24px;
          border-radius: 50px;
          transition: var(--tr);
          white-space: nowrap;
          border: none;
          cursor: pointer;
        }
        .role-apply:hover {
          background: var(--gn2);
        }
        .role-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--line2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--tr);
        }
        .role-card:hover .role-arrow {
          background: var(--gn);
          border-color: var(--gn);
        }
        .role-arrow span {
          font-size: 20px;
          color: var(--ink3);
          transition: var(--tr);
        }
        .role-card:hover .role-arrow span {
          color: #fff;
        }
        @media (max-width: 768px) {
          .role-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
