"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const links = [
    { label: "Destinations", href: "/destinations" },
    { label: "Packages", href: "/destinations" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const getInitials = () => {
    if (!user) return "";
    return (user.firstName?.[0] || "").toUpperCase();
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
  };

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
      <Link
        href="/"
        className="syne"
        style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: scrolled ? "var(--gn)" : "var(--iv)",
          transition: "color .3s",
          textDecoration: "none",
        }}
      >
        LetsLive<span style={{ color: "var(--cu)" }}> Tours</span>
      </Link>

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
            <Link
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
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user ? (
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="syne nav-user-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 16px 6px 8px",
                background: "transparent",
                border: scrolled
                  ? "1px solid var(--line2)"
                  : "1px solid rgba(249,246,240,.25)",
                borderRadius: 50,
                cursor: "pointer",
                transition: "var(--tr)",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--gn)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  overflow: "hidden",
                }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  getInitials()
                )}
              </div>
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: scrolled ? "var(--ink2)" : "rgba(249,246,240,.8)",
                  letterSpacing: 0.3,
                }}
              >
                {user.firstName}
              </span>
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r)",
                  boxShadow: "var(--sh)",
                  padding: "8px 0",
                  minWidth: 200,
                  zIndex: 1001,
                }}
              >
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="syne nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 18px",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "var(--cu)",
                      textDecoration: "none",
                      transition: "background .2s",
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 18 }}>admin_panel_settings</span>
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="syne nav-dropdown-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 18px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink2)",
                    textDecoration: "none",
                    transition: "background .2s",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>dashboard</span>
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/bookings"
                  onClick={() => setDropdownOpen(false)}
                  className="syne nav-dropdown-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 18px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink2)",
                    textDecoration: "none",
                    transition: "background .2s",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>confirmation_number</span>
                  My Bookings
                </Link>
                <Link
                  href="/dashboard/wishlist"
                  onClick={() => setDropdownOpen(false)}
                  className="syne nav-dropdown-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 18px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink2)",
                    textDecoration: "none",
                    transition: "background .2s",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>favorite</span>
                  Wishlist
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="syne nav-dropdown-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 18px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink2)",
                    textDecoration: "none",
                    transition: "background .2s",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>person</span>
                  Profile
                </Link>
                <div style={{ height: 1, background: "var(--line)", margin: "6px 0" }} />
                <button
                  onClick={handleLogout}
                  className="syne nav-dropdown-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 18px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "#e53935",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    transition: "background .2s",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
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
              textDecoration: "none",
            }}
          >
            Sign In
          </Link>
        )}
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
          .nav-sign-btn,
          .nav-user-btn {
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
        .nav-dropdown-item:hover {
          background: var(--iv) !important;
        }
      `}</style>
    </nav>
  );
}
