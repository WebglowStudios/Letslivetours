"use client";

import { useState } from "react";

const knowBeforeItems = [
  "Indian passport holders require a UAE Tourist Visa — we handle the application as part of your package.",
  "The best time to visit Dubai is October to April when temperatures are pleasant (20–30°C).",
  "Dubai is a Muslim country — dress modestly in public areas, souks, and mosques. Swimwear is only appropriate at beaches and pools.",
  "Public displays of affection should be minimal. Alcohol is available only in licensed venues (hotels, restaurants).",
  "The UAE Dirham (AED) is the local currency. 1 AED ≈ ₹22.5. International cards are widely accepted.",
  "Dubai is extremely safe for tourists. Emergency number: 999 (Police), 998 (Ambulance).",
  "Photography of government buildings, military installations, and people without consent is not permitted.",
  "During Ramadan, eating and drinking in public during daylight hours is restricted.",
];

const thingsToCarry = [
  "Valid passport with minimum 6 months validity and UAE Tourist Visa",
  "Printed or digital copies of hotel bookings and tour confirmations",
  "Light, breathable clothing for outdoor sightseeing",
  "Modest clothing (covering shoulders and knees) for souks and mosques",
  "Comfortable walking shoes — you'll be on your feet a lot",
  "High-SPF sunscreen, sunglasses, and a hat for outdoor activities",
  "Swimwear for hotel pools and Aquaventure Waterpark",
  "A light jacket or cardigan for heavily air-conditioned malls and restaurants",
  "International travel adapter (UAE uses Type G plugs)",
  "Travel insurance documents",
  "Some cash in AED for tips, small purchases, and souks",
];

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

export default function KnowBeforeYouGo() {
  return (
    <div>
      <SoloAccordion
        icon="info"
        iconColor="var(--gn3)"
        title="Know Before You Go"
        items={knowBeforeItems}
      />
      <SoloAccordion
        icon="backpack"
        iconColor="var(--cu)"
        title="Things to Carry"
        items={thingsToCarry}
      />
    </div>
  );
}
