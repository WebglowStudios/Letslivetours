"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      id="stt"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "var(--cu)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "var(--tr)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        zIndex: 999,
        boxShadow: "0 8px 28px rgba(0,174,204,.45)",
        border: "none",
      }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 22, color: "#fff" }}>arrow_upward</span>
    </button>
  );
}
