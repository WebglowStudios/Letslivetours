"use client";

import { useState } from "react";

const faqs = [
  { q: "What documents do I need to travel to Dubai from India?", a: "You need a valid Indian passport (minimum 6 months validity), a confirmed return ticket, hotel booking proof, and a UAE tourist visa. Indian nationals can also get a visa on arrival for 14 days. Our team handles all visa applications as part of your package." },
  { q: "Is Dubai safe for solo travellers and women?", a: "Dubai is consistently ranked among the world\u2019s safest cities. Solo travellers and women can explore freely. The city has excellent public transport, well-lit streets, and a very low crime rate. Standard travel precautions apply as with any major city." },
  { q: "What is the best way to get around Dubai?", a: "Dubai has an excellent metro system (Red and Green lines), taxis (metered, very affordable), and ride-hailing apps like Careem and Uber. For desert excursions, our packages include private 4x4 transfers. Renting a car is also easy with an Indian driving licence." },
  { q: "What should I pack for a Dubai trip?", a: "Pack light, breathable clothing for outdoors and slightly warmer layers for heavily air-conditioned malls and restaurants. Modest clothing (covering shoulders and knees) is required for mosques and traditional areas. Sunscreen, sunglasses, and comfortable walking shoes are essential." },
  { q: "Can I use Indian Rupees in Dubai?", a: "No, the local currency is UAE Dirham (AED). You can exchange INR at the airport or authorised exchange centres in Dubai (better rates than airport). International debit/credit cards are accepted almost everywhere. Inform your bank before travelling to avoid card blocks." },
  { q: "Are there any cultural rules I should be aware of?", a: "Public displays of affection should be minimal. Dress modestly in souks, mosques, and government buildings. During Ramadan, eating/drinking in public during daylight hours is restricted. Photography of people (especially women) without consent is not acceptable. Overall, Dubai is very tourist-friendly and welcoming." },
];

export default function TravelTips() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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
          <p style={{ fontSize: 15, color: "var(--ink3)", lineHeight: 1.7, maxWidth: 560, margin: "10px auto 0" }}>Answers to the most common questions about travelling to Dubai.</p>
        </div>

        <div className="rv" style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} style={{ background: "#fff", borderRadius: "var(--r)", border: isOpen ? "1.5px solid var(--gn3)" : "1.5px solid var(--line)", overflow: "hidden", transition: "var(--tr)", boxShadow: isOpen ? "var(--sh)" : "none" }}>
                <div onClick={() => setOpenIdx(isOpen ? null : i)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", cursor: "pointer", gap: 16 }}>
                  <span className="syne" style={{ fontSize: 15, fontWeight: 600, color: isOpen ? "var(--gn)" : "var(--ink)" }}>{f.q}</span>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: isOpen ? "var(--gn)" : "var(--gn-gl)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "var(--tr)", transform: isOpen ? "rotate(45deg)" : "none" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 18, color: isOpen ? "#fff" : "var(--gn)", transition: "var(--tr)" }}>add</span>
                  </div>
                </div>
                <div style={{ maxHeight: isOpen ? 300 : 0, overflow: "hidden", transition: "max-height .4s ease, padding .3s ease" }}>
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: "var(--ink3)", lineHeight: 1.75, borderTop: "1px solid var(--line)", paddingTop: 16 }}>{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
