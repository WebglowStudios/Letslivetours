"use client";

import { useState, FormEvent } from "react";
import { api } from "@/lib/api";
import PhoneInput from "@/components/ui/PhoneInput";

export default function ContactMain() {
  const [activeTab, setActiveTab] = useState<"general" | "booking" | "support">("general");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [message, setMessage] = useState("");

  const tabs: { key: "general" | "booking" | "support"; label: string }[] = [
    { key: "general", label: "General Enquiry" },
    { key: "booking", label: "Book a Trip" },
    { key: "support", label: "Support" },
  ];

  const contactCards = [
    { icon: "phone", label: "Call Us", value: "+91 77700 88299 / +91 77700 88466", sub: "Mon–Sat, 10AM – 8PM IST" },
    { icon: "mail", label: "Email Us", value: "info@letslivetours.com", sub: "We reply within 2 hours" },
    { icon: "chat", label: "WhatsApp", value: "+91 77700 88299", sub: "Available 24/7 for urgent queries" },
    { icon: "location_on", label: "Visit Us", value: "E/5, First Floor, Mauli Complex, Sukhsagar Nagar, Katraj", sub: "Pune, Maharashtra 411046" },
  ];

  const hours = [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM", closed: false },
    { day: "Saturday", time: "10:00 AM – 6:00 PM", closed: false },
    { day: "Sunday", time: "Closed", closed: true },
  ];

  const showDest = activeTab === "general" || activeTab === "booking";
  const showDate = activeTab === "booking";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/enquiries", {
        type: activeTab,
        firstName,
        lastName,
        email,
        phone,
        destination: showDest ? destination : undefined,
        travelDate: showDate ? travelDate : undefined,
        message,
        source: "website",
      });

      if (res.status === "success") {
        setSubmitted(true);
      } else {
        setError(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "100px 0", background: "var(--iv)" }}>
      <div className="container">
        <div className="contact-grid">
          {/* Left info panel */}
          <div className="rv-l">
            <div>
              <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
                Get in Touch
              </div>
              <h2 className="serif" style={{ fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 12, marginBottom: 18 }}>
                We&apos;re Here to <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Help</em> You
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--ink3)", lineHeight: 1.78, marginBottom: 36 }}>
                Reach out through any channel — our travel experts respond within 2 hours during business hours.
              </p>
            </div>

            {/* Contact cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {contactCards.map((card, i) => (
                <div key={i} className="ci-card" style={{ display: "flex", alignItems: "flex-start", gap: 18, padding: 24, background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r)", transition: "var(--tr)" }}>
                  <div className="ci-card-ic" style={{ width: 50, height: 50, borderRadius: 14, background: "var(--gn-gl)", border: "1px solid rgba(0,77,94,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "var(--tr)" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--gn2)", transition: "color .3s" }}>{card.icon}</span>
                  </div>
                  <div>
                    <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 4 }}>{card.label}</div>
                    <div className="syne" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>{card.value}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink3)" }}>{card.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business hours */}
            <div style={{ marginTop: 28, background: "var(--gn)", borderRadius: "var(--r)", padding: "24px 28px" }}>
              <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(249,246,240,.5)", marginBottom: 16 }}>Business Hours</div>
              {hours.map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(249,246,240,.08)" }}>
                  <span style={{ fontSize: 13, color: "rgba(249,246,240,.6)" }}>{h.day}</span>
                  <span className="syne" style={{ fontSize: 13, fontWeight: 600, color: h.closed ? "rgba(249,246,240,.35)" : "var(--iv)" }}>{h.time}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                <span style={{ fontSize: 13, color: "rgba(249,246,240,.6)" }}>Emergency Support</span>
                <span className="syne" style={{ background: "rgba(41,196,216,.15)", border: "1px solid rgba(41,196,216,.3)", color: "var(--gd)", borderRadius: 50, padding: "2px 10px", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>24 / 7</span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="rv-r">
            <div className="contact-form-card" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", padding: 48, boxShadow: "var(--sh)" }}>
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="serif" style={{ fontSize: 28, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>Send Us a Message</div>
                  <div style={{ fontSize: 14, color: "var(--ink3)", marginBottom: 32, lineHeight: 1.6 }}>Fill in the form and a travel expert will get back to you within 2 hours.</div>

                  {/* Error message */}
                  {error && (
                    <div style={{ padding: "12px 16px", background: "rgba(229,57,53,.08)", border: "1px solid rgba(229,57,53,.2)", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#e53935", display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 18 }}>error</span>
                      {error}
                    </div>
                  )}

                  {/* Tabs */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 32, background: "var(--iv2)", borderRadius: 50, padding: 5 }}>
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className="syne"
                        style={{
                          flex: 1,
                          padding: "10px 16px",
                          borderRadius: 50,
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          border: "none",
                          background: activeTab === tab.key ? "var(--gn)" : "transparent",
                          color: activeTab === tab.key ? "#fff" : "var(--ink3)",
                          cursor: "pointer",
                          transition: "var(--tr)",
                          textAlign: "center",
                          boxShadow: activeTab === tab.key ? "0 4px 14px rgba(0,77,94,.25)" : "none",
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Form fields */}
                  <div className="form-name-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>First Name</label>
                      <input type="text" placeholder="Rahul" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={{ padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, color: "var(--ink)", fontSize: 14, outline: "none", transition: "border-color .2s, box-shadow .2s", width: "100%" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Last Name</label>
                      <input type="text" placeholder="Gupta" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={{ padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, color: "var(--ink)", fontSize: 14, outline: "none", transition: "border-color .2s, box-shadow .2s", width: "100%" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Email Address</label>
                    <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, color: "var(--ink)", fontSize: 14, outline: "none", transition: "border-color .2s, box-shadow .2s", width: "100%" }} />
                  </div>

                  <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Phone Number</label>
                    <PhoneInput value={phone} onChange={setPhone} placeholder="98765 43210" style={{ borderRadius: 12 }} />
                  </div>

                  {showDest && (
                    <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7 }}>
                      <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Destination of Interest</label>
                      <select value={destination} onChange={(e) => setDestination(e.target.value)} style={{ padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, color: "var(--ink)", fontSize: 14, outline: "none", transition: "border-color .2s, box-shadow .2s", width: "100%", appearance: "none", cursor: "pointer" }}>
                        <option value="" disabled>Select a destination…</option>
                        <option>Dubai</option>
                        <option>Bali</option>
                        <option>Japan</option>
                        <option>Singapore</option>
                        <option>Maldives</option>
                        <option>Thailand</option>
                        <option>Santorini</option>
                        <option>Other</option>
                      </select>
                    </div>
                  )}

                  {showDate && (
                    <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7 }}>
                      <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Preferred Travel Date</label>
                      <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} style={{ padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, color: "var(--ink)", fontSize: 14, outline: "none", transition: "border-color .2s, box-shadow .2s", width: "100%" }} />
                    </div>
                  )}

                  <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>Your Message</label>
                    <textarea placeholder="Tell us about your dream trip, questions, or anything else…" value={message} onChange={(e) => setMessage(e.target.value)} style={{ padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, color: "var(--ink)", fontSize: 14, outline: "none", transition: "border-color .2s, box-shadow .2s", width: "100%", resize: "vertical", minHeight: 120, lineHeight: 1.6 }} />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="syne"
                    style={{ width: "100%", padding: 16, background: loading ? "var(--ink4)" : "var(--cu)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: 0.5, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "var(--tr)", boxShadow: "0 8px 28px rgba(245,166,35,.35)", marginTop: 8, opacity: loading ? 0.7 : 1 }}
                  >
                    <span className="material-symbols-rounded">{loading ? "hourglass_empty" : "send"}</span>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                  <div style={{ fontSize: 11.5, color: "var(--ink4)", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
                    By submitting, you agree to our <a href="#" style={{ color: "var(--gn2)", textDecoration: "underline" }}>Privacy Policy</a>. No spam, ever.
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(74,194,138,.12)", border: "2px solid rgba(74,194,138,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 36, color: "#4AC28A" }}>check_circle</span>
                  </div>
                  <h3 className="serif" style={{ fontSize: 26, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>Message Sent!</h3>
                  <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.7 }}>Thank you for reaching out. One of our travel experts will get back to you within 2 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 64px;
          align-items: start;
        }
        .ci-card:hover {
          border-color: var(--gn3) !important;
          box-shadow: var(--sh);
          transform: translateX(4px);
        }
        .ci-card:hover .ci-card-ic {
          background: var(--gn) !important;
          border-color: var(--gn) !important;
        }
        .ci-card:hover .ci-card-ic .material-symbols-rounded {
          color: #fff !important;
        }
        @media (max-width: 1100px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px !important;
          }
          .form-name-row {
            grid-template-columns: 1fr !important;
          }
          .contact-form-card {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
