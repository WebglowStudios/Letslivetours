"use client";

import { useState } from "react";

const tabs = ["All Packages", "Luxury", "Honeymoon", "Family", "Adventure", "Group"];

const tabIcons: Record<string, string> = {
  "All Packages": "apps",
  "Luxury": "diamond",
  "Honeymoon": "favorite",
  "Family": "family_restroom",
  "Adventure": "hiking",
  "Group": "groups",
};

interface Props {
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  destinationName?: string;
  onOpenGlobalSearch?: () => void;
}

export default function FilterBar({
  activeFilter,
  setActiveFilter,
  searchQuery = "",
  setSearchQuery,
  destinationName,
  onOpenGlobalSearch,
}: Props) {
  const [isCatSubModalOpen, setIsCatSubModalOpen] = useState(false);

  const activeTabLabel =
    tabs.find((t) => (t === "All Packages" ? "all" : t.toLowerCase()) === activeFilter) || "All Packages";

  return (
    <div
      id="packages"
      className="filter-bar-wrap"
      style={{
        position: "sticky",
        top: 72,
        zIndex: 800,
        background: "rgba(240,250,250,.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line2)",
        padding: "8px 48px",
        scrollMarginTop: 80,
      }}
    >
      <div
        className="filter-bar-content"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: "6px 0",
        }}
      >
        {/* Row 1: Category Filter Pills on Desktop (Hidden on mobile to save space) */}
        <div
          className="desktop-category-pills"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span
            className="syne"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--ink4, #8ab5be)",
              textTransform: "uppercase",
              letterSpacing: 1,
              flexShrink: 0,
            }}
          >
            Category:
          </span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            {tabs.map((t) => {
              const val = t === "All Packages" ? "all" : t.toLowerCase();
              const isActive = activeFilter === val;
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => setActiveFilter(val)}
                  className="syne"
                  style={{
                    padding: "6px 16px",
                    borderRadius: 50,
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 600,
                    cursor: "pointer",
                    transition: "var(--tr)",
                    border: isActive ? "1px solid var(--cu)" : "1px solid var(--line2)",
                    background: isActive ? "var(--cu)" : "#ffffff",
                    color: isActive ? "#ffffff" : "var(--ink2)",
                    boxShadow: isActive ? "0 2px 8px rgba(245,166,35,0.25)" : "none",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                    {tabIcons[t] || "category"}
                  </span>
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Search Controls + Mobile Filter Button */}
        <div
          className="filter-search-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          {/* In-page search input */}
          {setSearchQuery && (
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                background: "#fff",
                border: "1px solid var(--line2)",
                borderRadius: 50,
                padding: "8px 14px",
                boxShadow: "0 2px 8px rgba(0,77,94,.05)",
                flex: "1 1 240px",
                maxWidth: 440,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--ink3)", marginRight: 8 }}>
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={destinationName ? `Search in ${destinationName}...` : "Search packages..."}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  color: "var(--ink)",
                  width: "100%",
                  fontFamily: "var(--font-inter),'Inter',sans-serif",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "var(--ink4)",
                  }}
                  title="Clear search"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>close</span>
                </button>
              )}
            </div>
          )}

          {/* Mobile Category Trigger Button (Visible only on phone) */}
          <button
            type="button"
            onClick={() => setIsCatSubModalOpen(true)}
            className="syne mobile-filter-trigger"
            style={{
              display: "none", // enabled via media query on mobile
              alignItems: "center",
              gap: 5,
              padding: "8px 12px",
              borderRadius: 50,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              border: activeFilter !== "all" ? "1.5px solid var(--cu)" : "1px solid var(--line2)",
              background: activeFilter !== "all" ? "var(--cu)" : "#ffffff",
              color: activeFilter !== "all" ? "#ffffff" : "var(--gn)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
              {activeFilter !== "all" ? (tabIcons[activeTabLabel] || "tune") : "tune"}
            </span>
            <span>{activeFilter === "all" ? "Filter" : activeTabLabel}</span>
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_drop_down</span>
          </button>

          {/* Global dual search modal trigger */}
          {onOpenGlobalSearch && (
            <button
              type="button"
              onClick={onOpenGlobalSearch}
              className="syne global-search-btn"
              title="Search all destinations and packages worldwide"
              style={{
                padding: "8px 16px",
                background: "var(--gn)",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.3,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "var(--tr)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)" }}>manage_search</span>
              <span className="global-btn-text">Global Search</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Category Sub-Popup Bottom Sheet ── */}
      {isCatSubModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(5, 18, 24, 0.7)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            animation: "subFadeIn 0.2s ease",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCatSubModalOpen(false);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 500,
              background: "#ffffff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              boxShadow: "0 -10px 40px rgba(0, 77, 94, 0.3)",
              maxHeight: "75vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "catSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 10, paddingBottom: 4 }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--line2, #cbd5e1)" }} />
            </div>

            {/* Header */}
            <div
              style={{
                padding: "12px 20px 14px",
                borderBottom: "1px solid var(--line2, #e2e8f0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--cu)" }}>
                  category
                </span>
                <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                  Select Category
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCatSubModalOpen(false)}
                style={{
                  background: "var(--iv2, #f0f7f8)",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--ink2)" }}>close</span>
              </button>
            </div>

            {/* Category Options List */}
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
              {tabs.map((t) => {
                const val = t === "All Packages" ? "all" : t.toLowerCase();
                const isSel = activeFilter === val;
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => {
                      setActiveFilter(val);
                      setIsCatSubModalOpen(false);
                    }}
                    className="syne"
                    style={{
                      padding: "12px 16px",
                      borderRadius: 14,
                      fontSize: 13,
                      fontWeight: isSel ? 700 : 500,
                      cursor: "pointer",
                      border: isSel ? "1.5px solid var(--cu)" : "1px solid var(--line2)",
                      background: isSel ? "var(--cu-gl, rgba(245,166,35,0.12))" : "#ffffff",
                      color: isSel ? "var(--cu-d, #c07d10)" : "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 18, color: isSel ? "var(--cu)" : "var(--ink3)" }}>
                        {tabIcons[t] || "category"}
                      </span>
                      <span>{t}</span>
                    </div>
                    {isSel && (
                      <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--cu)" }}>
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .filter-bar-wrap {
            padding: 8px 12px !important;
          }
          .desktop-category-pills {
            display: none !important;
          }
          .mobile-filter-trigger {
            display: flex !important;
          }
          .global-btn-text {
            display: none !important;
          }
          .global-search-btn {
            padding: 8px 10px !important;
            border-radius: 50% !important;
          }
        }
        @keyframes subFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes catSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

