"use client";

import { useState } from "react";

interface TravelTip {
  question: string;
  answer: string;
}

interface TravelTipsProps {
  tips?: TravelTip[];
}

export default function TravelTips({ tips }: TravelTipsProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!tips || tips.length === 0) return null;

  return (
    <section id="travel-tips" style={{ padding: "80px 0", background: "var(--iv)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 48px" }}>
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />FAQ
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 10 }}>
            Travel <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Tips</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", lineHeight: 1.7, maxWidth: 560, margin: "10px auto 0" }}>Answers to the most common questions about this destination.</p>
        </div>

        <div className="rv" style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
          {tips.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} style={{ background: "#fff", borderRadius: "var(--r)", border: isOpen ? "1.5px solid var(--gn3)" : "1.5px solid var(--line)", overflow: "hidden", transition: "var(--tr)", boxShadow: isOpen ? "var(--sh)" : "none" }}>
                <div onClick={() => setOpenIdx(isOpen ? null : i)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", cursor: "pointer", gap: 16 }}>
                  <span className="syne" style={{ fontSize: 15, fontWeight: 600, color: isOpen ? "var(--gn)" : "var(--ink)" }}>{f.question}</span>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: isOpen ? "var(--gn)" : "var(--gn-gl)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "var(--tr)", transform: isOpen ? "rotate(45deg)" : "none" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 18, color: isOpen ? "#fff" : "var(--gn)", transition: "var(--tr)" }}>add</span>
                  </div>
                </div>
                <div style={{ maxHeight: isOpen ? 300 : 0, overflow: "hidden", transition: "max-height .4s ease, padding .3s ease" }}>
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: "var(--ink3)", lineHeight: 1.75, borderTop: "1px solid var(--line)", paddingTop: 16 }}>{f.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
