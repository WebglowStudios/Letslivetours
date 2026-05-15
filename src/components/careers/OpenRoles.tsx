"use client";

import { useState } from "react";

interface Role {
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
  { dept: "operations", deptLabel: "Operations", icon: "travel_explore", iconCls: "ops", title: "Senior Travel Consultant \u2014 Dubai & Middle East", location: "Bengaluru", type: "Full-time", experience: "3\u20135 yrs exp" },
  { dept: "operations", deptLabel: "Operations", icon: "support_agent", iconCls: "ops", title: "Customer Experience Manager", location: "Mumbai", type: "Full-time", experience: "2\u20134 yrs exp" },
  { dept: "operations", deptLabel: "Operations", icon: "map", iconCls: "ops", title: "Destination Expert \u2014 Southeast Asia", location: "Remote", type: "Full-time", experience: "1\u20133 yrs exp" },
  { dept: "marketing", deptLabel: "Marketing", icon: "campaign", iconCls: "mkt", title: "Performance Marketing Lead \u2014 Paid Social & Search", location: "Bengaluru", type: "Full-time", experience: "4\u20136 yrs exp" },
  { dept: "marketing", deptLabel: "Marketing", icon: "edit_note", iconCls: "mkt", title: "Content Strategist & Travel Writer", location: "Remote", type: "Full-time", experience: "2\u20134 yrs exp" },
  { dept: "marketing", deptLabel: "Marketing", icon: "photo_camera", iconCls: "mkt", title: "Social Media & Video Creator", location: "Bengaluru", type: "Full-time", experience: "1\u20133 yrs exp" },
  { dept: "technology", deptLabel: "Technology", icon: "code", iconCls: "tech", title: "Senior Full-Stack Engineer (React + Node)", location: "Remote", type: "Full-time", experience: "4\u20137 yrs exp" },
  { dept: "technology", deptLabel: "Technology", icon: "palette", iconCls: "tech", title: "Product Designer \u2014 UX/UI (Travel Platform)", location: "Bengaluru", type: "Full-time", experience: "3\u20135 yrs exp" },
  { dept: "technology", deptLabel: "Technology", icon: "analytics", iconCls: "tech", title: "Data Analyst \u2014 Growth & Revenue", location: "Remote", type: "Full-time", experience: "2\u20134 yrs exp" },
  { dept: "hr", deptLabel: "People & HR", icon: "people", iconCls: "hr", title: "Talent Acquisition Specialist", location: "Bengaluru", type: "Full-time", experience: "2\u20134 yrs exp" },
  { dept: "finance", deptLabel: "Finance", icon: "account_balance", iconCls: "fin", title: "Finance Manager \u2014 Revenue & Reconciliation", location: "Bengaluru", type: "Full-time", experience: "5\u20138 yrs exp" },
];

const tabs = [
  { key: "all", label: "All Departments" },
  { key: "operations", label: "Operations" },
  { key: "marketing", label: "Marketing" },
  { key: "technology", label: "Technology" },
  { key: "hr", label: "People & HR" },
  { key: "finance", label: "Finance" },
];

export default function OpenRoles() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? roles : roles.filter(r => r.dept === active);

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
          {filtered.map((role, i) => (
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
                <button className="role-apply syne">Apply Now</button>
                <div className="role-arrow">
                  <span className="material-symbols-rounded">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink3)", fontSize: 15 }}>
              No open roles in this department right now. <a href="/contact" style={{ color: "var(--gn)", fontWeight: 600 }}>Send us your CV anyway →</a>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
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
