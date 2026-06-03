"use client";

import { useEffect, useState } from "react";

export default function Deals() {
  const [time, setTime] = useState({ d: "03", h: "14", m: "22", s: "45" });

  useEffect(() => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    deadline.setHours(deadline.getHours() + 14);
    const tick = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) return;
      const d = Math.floor(diff / 864e5);
      const h = Math.floor((diff % 864e5) / 36e5);
      const m = Math.floor((diff % 36e5) / 6e4);
      const s = Math.floor((diff % 6e4) / 1e3);
      setTime({ d: String(d).padStart(2, "0"), h: String(h).padStart(2, "0"), m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="deals" className="deals-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 560, overflow: "hidden" }}>
      {/* Left */}
      <div className="rv-l deals-left" style={{ background: "var(--iv2)", padding: "84px 72px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div className="syne" style={{ position: "absolute", bottom: -30, right: -10, fontSize: 200, fontWeight: 800, color: "rgba(0,77,94,.04)", lineHeight: 1, pointerEvents: "none", letterSpacing: -8 }}>40</div>
        <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", marginBottom: 20 }}>Limited Time Offer</div>
        <div className="serif" style={{ fontSize: "clamp(44px, 6vw, 80px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: -2, color: "var(--ink)" }}>
          Summer<br />
          <span style={{ WebkitTextStroke: "1.5px var(--ink)", color: "transparent" }}>Deals —</span><br />
          <span style={{ color: "var(--cu)" }}>40% Off</span>
        </div>
        <p style={{ fontSize: 15.5, color: "var(--ink3)", lineHeight: 1.72, margin: "22px 0", maxWidth: 380 }}>
          Don&apos;t miss our hottest summer sale. Packages to your dream destinations at unbeatable prices. Offer valid till seats last — grab yours today.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "var(--cu)", color: "#fff", border: "none", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", boxShadow: "0 8px 28px rgba(0,174,204,.35)", transition: "var(--tr)" }}>
            <span className="material-symbols-rounded">flight_takeoff</span>Grab the Deal
          </button>
          <button className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 30px", background: "transparent", color: "var(--gn)", border: "1.5px solid var(--line2)", borderRadius: 50, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", transition: "var(--tr)" }}>
            <span className="material-symbols-rounded">explore</span>Browse All Deals
          </button>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
          {[{ icon: "verified", t: "Best price guaranteed" }, { icon: "cached", t: "Free cancellation" }, { icon: "lock", t: "Secure booking" }].map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink3)" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--gn2)" }}>{x.icon}</span>{x.t}
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="rv-r deals-right" style={{ background: "var(--gn)", padding: "84px 64px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,174,204,.15) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ background: "var(--cu)", color: "#fff", borderRadius: 50, padding: "12px 32px", marginBottom: 32, display: "inline-block" }}>
          <strong className="serif" style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, display: "block", color: "#fff" }}>40%</strong>
          <span className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.85 }}>Off Select Packages</span>
        </div>
        <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(249,246,240,.45)", marginBottom: 24 }}>Offer Expires In</div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", justifyContent: "center" }}>
          {[
            { v: time.d, l: "Days" },
            { v: time.h, l: "Hours" },
            { v: time.m, l: "Mins" },
            { v: time.s, l: "Secs" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              {i > 0 && <div className="serif deals-colon" style={{ fontSize: 44, fontWeight: 400, color: "rgba(249,246,240,.2)", paddingBottom: 18 }}>:</div>}
              <div className="deals-timer-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(249,246,240,.07)", border: "1px solid rgba(249,246,240,.1)", borderRadius: 16, padding: "18px 22px", minWidth: 80 }}>
                <div className="serif deals-timer-num" style={{ fontSize: 56, fontWeight: 700, lineHeight: 1, color: "#fff" }}>{t.v}</div>
                <div className="syne" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(249,246,240,.4)", marginTop: 4 }}>{t.l}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "rgba(249,246,240,.35)", marginTop: 22 }}>Offer valid till midnight 21 Apr 2026 · Select packages only</div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .deals-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .deals-left { padding: 48px 20px !important; }
          .deals-right { padding: 48px 16px !important; }
          .deals-timer-num { font-size: 28px !important; }
          .deals-timer-box { min-width: 52px !important; padding: 12px 10px !important; border-radius: 10px !important; }
          .deals-colon { font-size: 22px !important; padding-bottom: 12px !important; }
        }
      `}</style>
    </section>
  );
}
