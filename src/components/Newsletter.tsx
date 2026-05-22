"use client";

import { useState, FormEvent } from "react";
import { api } from "@/lib/api";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [favouriteDestination, setFavouriteDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/newsletter/subscribe", {
        name,
        email,
        favouriteDestination,
      });

      if (res.status === "success") {
        setSuccess(true);
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
    <section id="newsletter" style={{ position: "relative", padding: "96px 0", overflow: "hidden" }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.25) saturate(.5)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,77,94,.92) 0%, rgba(0,77,94,.75) 100%)" }} />

      <div className="container">
        <div className="nl-inner" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div className="rv-l" style={{ color: "#fff" }}>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
              Stay Connected
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 12 }}>
              Get <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Exclusive</em><br />Deals First
            </h2>
            <p style={{ fontSize: 15, color: "rgba(249,246,240,.6)", lineHeight: 1.72, marginTop: 16, maxWidth: 380 }}>
              Subscribe and be the first to receive flash sales, curated travel guides, and member-only discounts.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
              {[
                { icon: "card_giftcard", text: "Exclusive early-bird discounts up to 30%" },
                { icon: "map", text: "Weekly travel inspiration & destination guides" },
                { icon: "notifications_active", text: "Flash sale alerts delivered to your inbox" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "rgba(249,246,240,.75)" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(249,246,240,.08)", border: "1px solid rgba(249,246,240,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 19, color: "var(--gd)" }}>{p.icon}</span>
                  </div>
                  {p.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="rv-r">
            <div style={{ background: "rgba(249,246,240,.07)", backdropFilter: "blur(20px)", border: "1px solid rgba(249,246,240,.15)", borderRadius: "var(--r-xl)", padding: 40 }}>
              {!success ? (
                <form onSubmit={handleSubmit}>
                  <div className="serif" style={{ fontSize: 26, fontWeight: 600, color: "#fff", marginBottom: 26 }}>Join Our Travel Club</div>

                  {error && (
                    <div style={{ padding: "10px 14px", background: "rgba(229,57,53,.15)", border: "1px solid rgba(229,57,53,.3)", borderRadius: 8, marginBottom: 18, fontSize: 12.5, color: "#ff8a80", display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 16 }}>error</span>
                      {error}
                    </div>
                  )}

                  <div style={{ marginBottom: 18, display: "flex", flexDirection: "column", gap: 7 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.45)" }}>Your Name</label>
                    <input
                      type="text"
                      placeholder="E.g. Rahul Gupta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{ padding: "13px 16px", background: "rgba(249,246,240,.08)", border: "1px solid rgba(249,246,240,.15)", borderRadius: 10, color: "#fff", fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 14, outline: "none", transition: "border-color .2s" }}
                    />
                  </div>
                  <div style={{ marginBottom: 18, display: "flex", flexDirection: "column", gap: 7 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.45)" }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ padding: "13px 16px", background: "rgba(249,246,240,.08)", border: "1px solid rgba(249,246,240,.15)", borderRadius: 10, color: "#fff", fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 14, outline: "none", transition: "border-color .2s" }}
                    />
                  </div>
                  <div style={{ marginBottom: 18, display: "flex", flexDirection: "column", gap: 7 }}>
                    <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,246,240,.45)" }}>Favourite Destination</label>
                    <input
                      type="text"
                      placeholder="E.g. Bali, Maldives, Japan…"
                      value={favouriteDestination}
                      onChange={(e) => setFavouriteDestination(e.target.value)}
                      style={{ padding: "13px 16px", background: "rgba(249,246,240,.08)", border: "1px solid rgba(249,246,240,.15)", borderRadius: 10, color: "#fff", fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 14, outline: "none", transition: "border-color .2s" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="syne"
                    style={{ width: "100%", padding: 15, background: loading ? "rgba(245,166,35,.6)" : "var(--cu)", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: 0.5, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "var(--tr)", boxShadow: "0 8px 28px rgba(0,174,204,.4)", marginTop: 4, opacity: loading ? 0.7 : 1 }}
                  >
                    <span className="material-symbols-rounded">{loading ? "hourglass_empty" : "send"}</span>
                    {loading ? "Subscribing..." : "Subscribe & Save Big"}
                  </button>
                  <div style={{ fontSize: 11, color: "rgba(249,246,240,.3)", textAlign: "center", marginTop: 12 }}>No spam. Unsubscribe at any time. 100% Free.</div>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(74,194,138,.15)", border: "2px solid rgba(74,194,138,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 32, color: "#4AC28A" }}>check_circle</span>
                  </div>
                  <div className="serif" style={{ fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 10 }}>Thanks for Subscribing!</div>
                  <p style={{ fontSize: 14, color: "rgba(249,246,240,.6)", lineHeight: 1.7 }}>
                    You&apos;re now part of the LetsLive Travel Club. Watch your inbox for exclusive deals and travel inspiration.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .nl-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
