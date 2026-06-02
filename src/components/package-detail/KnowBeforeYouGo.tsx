"use client";

import { useState } from "react";

interface KnowBeforeYouGoProps {
  items: string[];
}

function SoloAccordion({
  icon,
  iconColor,
  title,
  items,
}: {
  icon: string;
  iconColor: string;
  title: string;
  items: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "var(--r)",
          border: `1.5px solid ${isOpen ? "var(--gn3)" : "var(--line)"}`,
          overflow: "hidden",
          transition: "var(--tr)",
          boxShadow: isOpen ? "var(--sh)" : "none",
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 18px",
            cursor: "pointer",
            gap: 14,
            width: "100%",
            textAlign: "left",
            background: "none",
            border: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: iconColor }}>
              {icon}
            </span>
            <span
              className="syne"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: isOpen ? "var(--gn)" : "var(--ink)",
                lineHeight: 1.4,
              }}
            >
              {title}
            </span>
          </div>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: isOpen ? "var(--gn)" : "var(--gn-gl)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "var(--tr)",
              transform: isOpen ? "rotate(45deg)" : "none",
            }}
          >
            <span
              className="material-symbols-rounded"
              style={{ fontSize: 16, color: isOpen ? "#fff" : "var(--gn)", transition: "var(--tr)" }}
            >
              add
            </span>
          </div>
        </button>
        <div
          style={{
            maxHeight: isOpen ? 1200 : 0,
            overflow: "hidden",
            transition: "max-height .4s ease",
          }}
        >
          <div
            style={{
              padding: "0 18px 18px",
              borderTop: "1px solid var(--line)",
              paddingTop: 14,
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 13.5,
              color: "var(--ink3)",
              lineHeight: 1.75,
            }}
          >
            <ul style={{ paddingLeft: 18, listStyle: "disc", display: "flex", flexDirection: "column", gap: 6 }}>
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowBeforeYouGo({ items }: KnowBeforeYouGoProps) {
  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div>
      <SoloAccordion
        icon="info"
        iconColor="var(--gn3)"
        title="Know Before You Go"
        items={items}
      />
    </div>
  );
}
