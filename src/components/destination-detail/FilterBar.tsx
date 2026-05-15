"use client";

import { useState } from "react";

const tabs = ["All Packages", "Luxury", "Honeymoon", "Family", "Adventure", "Group"];

interface Props {
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}

export default function FilterBar({ activeFilter, setActiveFilter }: Props) {
  return (
    <div style={{ position: "sticky", top: 72, zIndex: 800, background: "rgba(240,250,250,.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line2)", padding: "0 48px" }}>
      <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
        {tabs.map((t) => {
          const val = t === "All Packages" ? "all" : t.toLowerCase();
          return (
            <div
              key={t}
              onClick={() => setActiveFilter(val)}
              className="syne"
              style={{ fontSize: 13, fontWeight: 600, color: activeFilter === val ? "var(--gn)" : "var(--ink3)", padding: "16px 22px", borderBottom: activeFilter === val ? "2.5px solid var(--cu)" : "2.5px solid transparent", transition: "var(--tr)", whiteSpace: "nowrap", cursor: "pointer" }}
            >
              {t}
            </div>
          );
        })}
      </div>
    </div>
  );
}
