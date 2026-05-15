"use client";

import { useState } from "react";

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I book a package with LetsLive Tours?",
      a: "You can book directly through our website, call us, or visit any of our offices. Our travel experts will guide you through the entire process — from choosing the right package to confirming your booking.",
    },
    {
      q: "Can I customise an existing package?",
      a: "Absolutely. Every package can be fully customised — hotel category, duration, activities, and add-ons. Just fill in the contact form or call us and we'll tailor it to your preferences.",
    },
    {
      q: "What is your cancellation policy?",
      a: "We offer free cancellation up to 30 days before departure. Cancellations within 30 days may incur a fee depending on the package. Full details are provided at the time of booking.",
    },
    {
      q: "Do you assist with visa applications?",
      a: "Yes. We provide end-to-end visa assistance for all destinations we cover — from document preparation to submission tracking. Our visa team has a 99% approval rate.",
    },
    {
      q: "Is travel insurance included in packages?",
      a: "Travel insurance is available as an add-on for all packages. We partner with leading insurers to offer comprehensive coverage including medical, trip cancellation, and baggage protection.",
    },
    {
      q: "How do I reach you in case of an emergency during travel?",
      a: "Our 24/7 emergency helpline is always available. You'll receive a dedicated emergency contact number at the time of booking. We also have local representatives in all major destinations.",
    },
  ];

  const stats = [
    { val: "2", suf: "hr", label: "Avg. Response" },
    { val: "98", suf: "%", label: "Satisfaction" },
    { val: "24", suf: "/7", label: "Emergency Line" },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "96px 0", background: "var(--iv)" }}>
      <div className="container">
        <div className="faq-grid">
          {/* Left */}
          <div className="faq-left rv-l">
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              FAQ
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 12 }}>
              Common <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Questions</em>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink3)", lineHeight: 1.72, marginTop: 16, marginBottom: 28 }}>
              Can&apos;t find what you&apos;re looking for? Reach out to our team directly and we&apos;ll get back to you within 2 hours.
            </p>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div className="serif" style={{ fontSize: 36, fontWeight: 700, color: "var(--gn)", lineHeight: 1 }}>
                    {s.val}<span style={{ color: "var(--cu)" }}>{s.suf}</span>
                  </div>
                  <div className="syne" style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 600, letterSpacing: 1, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="rv-r" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--line)", overflow: "hidden" }}>
                <div
                  onClick={() => toggleFaq(i)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", cursor: "pointer", gap: 16, transition: "color .2s" }}
                >
                  <span className="syne" style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.4, transition: "color .2s" }}>{faq.q}</span>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: openIndex === i ? "var(--gn)" : "var(--gn-gl)",
                    border: openIndex === i ? "1px solid var(--gn)" : "1px solid var(--line2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "var(--tr)",
                    transform: openIndex === i ? "rotate(45deg)" : "none",
                  }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 16, color: openIndex === i ? "#fff" : "var(--gn2)", transition: "color .2s" }}>add</span>
                  </div>
                </div>
                <div style={{ maxHeight: openIndex === i ? 200 : 0, overflow: "hidden", transition: "max-height .4s ease, padding .3s ease" }}>
                  <div style={{ padding: "0 0 18px 0", fontSize: 14, color: "var(--ink3)", lineHeight: 1.72 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
          margin-top: 52px;
        }
        @media (max-width: 1100px) {
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
