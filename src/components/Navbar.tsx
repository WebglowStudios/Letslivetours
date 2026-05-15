"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Destinations", href: "#destinations" },
    { label: "Packages", href: "#packages" },
    { label: "Visa Free", href: "#visa" },
    { label: "Stories", href: "#testimonials" },
    { label: "Contact", href: "#newsletter" },
  ];

  return (
    <nav
      id="nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 72,
        display: "flex",
        alignItems: "center",
        padding: "0 52px",
        transition: "var(--tr)",
        ...(scrolled
          ? {
              background: "rgba(249,246,240,.92)",
              backdropFilter: "blur(22px)",
              borderBottom: "1px solid var(--line)",
              boxShadow: "0 2px 20px rgba(0,77,94,.06)",
            }
          : {}),
      }}
    >
      <div
        className="syne"
        style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: scrolled ? "var(--gn)" : "var(--iv)",
          transition: "color .3s",
        }}
      >
        LetsLive<span style={{ color: "var(--cu)" }}> Tours</span>
      </div>

      <ul
        style={{
          display: "flex",
          gap: 34,
          margin: "0 auto",
          listStyle: "none",
        }}
        className="nav-links-list"
      >
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              className="syne nav-link-item"
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: 0.5,
                color: scrolled ? "var(--ink3)" : "rgba(249,246,240,.7)",
                position: "relative",
                transition: "color .2s",
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          className="syne nav-sign-btn"
          style={{
            padding: "8px 20px",
            background: "transparent",
            border: scrolled
              ? "1px solid var(--line2)"
              : "1px solid rgba(249,246,240,.25)",
            borderRadius: 50,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: scrolled ? "var(--ink2)" : "rgba(249,246,240,.8)",
            cursor: "pointer",
            transition: "var(--tr)",
          }}
        >
          Sign In
        </button>
        <button
          className="syne"
          style={{
            padding: "9px 22px",
            background: "var(--cu)",
            color: "#fff",
            borderRadius: 50,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
            border: "none",
            cursor: "pointer",
            transition: "var(--tr)",
          }}
        >
          Book Now
        </button>
      </div>

      <style jsx>{`
        .nav-links-list {
          display: flex;
        }
        @media (max-width: 768px) {
          .nav-links-list,
          .nav-sign-btn {
            display: none !important;
          }
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--cu);
          transition: width .25s;
        }
        .nav-link-item:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}
