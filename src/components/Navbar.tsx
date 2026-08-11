"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Pages that should always show the "scrolled" (solid) navbar style
  const solidNavPages = [
    "/packages/",    // package detail pages
    "/book",         // booking page
    "/articles",     // articles listing + article detail
    "/itinerary/",   // custom itinerary detail
    "/dashboard",    // user dashboard pages
  ];
  const alwaysSolid = solidNavPages.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (alwaysSolid) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll(); // set initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysSolid, pathname]);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const links = [
    { label: "Destinations", href: "/destinations" },
    { label: "Articles", href: "/articles" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "FAQs", href: "/faq" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const getInitials = () => {
    if (!user) return "";
    return (user.firstName?.[0] || "").toUpperCase();
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
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
        justifyContent: "space-between",
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
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <img
          src={scrolled ? "/logo_blue.png" : "/logo_white.png"}
          alt="LetsLive Tours"
          style={{
            height: 60,
            width: "auto",
            transition: "opacity .3s",
          }}
        />
      </Link>

      <ul
        style={{
          display: "flex",
          gap: 34,
          listStyle: "none",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
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
        <Link
          href="/destinations"
          className="syne nav-book-btn"
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
            textDecoration: "none",
          }}
        >
          Explore Packages
        </Link>

        {/* Hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 1100,
            position: "relative",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 28, color: scrolled ? "var(--ink)" : "var(--iv)" }}>
            menu
          </span>
        </button>
      </div>

      {/* Mobile sidebar drawer */}
      <div
        className="nav-mobile-backdrop"
        onClick={() => setMobileMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,20,28,.5)",
          zIndex: 1050,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "opacity .3s ease",
        }}
      />
      <div
        className="nav-mobile-drawer"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(300px, 82vw)",
          background: "#fff",
          zIndex: 1060,
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform .35s cubic-bezier(.4,0,.2,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: mobileMenuOpen ? "-8px 0 40px rgba(0,20,28,.15)" : "none",
        }}
      >
        {/* Drawer header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--line)" }}>
          <img src="/logo_blue.png" alt="LetsLive Tours" style={{ height: 32, width: "auto" }} />
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--iv)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink2)" }}>close</span>
          </button>
        </div>

        {/* User greeting */}
        {user && (
          <div style={{ padding: "20px 24px", background: "var(--iv)", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--gn)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 700 }}>
                {getInitials()}
              </div>
              <div>
                <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{user.firstName} {user.lastName}</div>
                <div style={{ fontSize: 11, color: "var(--ink3)" }}>{user.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <div style={{ flex: 1, padding: "12px 0", overflowY: "auto", minHeight: 0 }}>
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="syne"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 24px",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--ink2)",
                textDecoration: "none",
                transition: "background .2s",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink3)" }}>
                {link.label === "Destinations" ? "explore" : link.label === "Packages" ? "inventory_2" : link.label === "About" ? "info" : link.label === "Careers" ? "work" : "mail"}
              </span>
              {link.label}
            </Link>
          ))}

          {user && (
            <>
              <div style={{ height: 1, background: "var(--line)", margin: "8px 24px" }} />
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="syne" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", fontSize: 14, fontWeight: 600, color: "var(--ink2)", textDecoration: "none" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink3)" }}>dashboard</span>
                Dashboard
              </Link>
              <Link href="/dashboard/bookings" onClick={() => setMobileMenuOpen(false)} className="syne" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", fontSize: 14, fontWeight: 600, color: "var(--ink2)", textDecoration: "none" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink3)" }}>confirmation_number</span>
                My Bookings
              </Link>
              <Link href="/dashboard/profile" onClick={() => setMobileMenuOpen(false)} className="syne" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", fontSize: 14, fontWeight: 600, color: "var(--ink2)", textDecoration: "none" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink3)" }}>person</span>
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Bottom actions */}
        <div style={{ padding: "14px 20px 20px", borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
          {user ? (
            <button
              onClick={handleLogout}
              className="syne"
              style={{ width: "100%", padding: "12px", background: "rgba(229,57,53,.06)", border: "1px solid rgba(229,57,53,.15)", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#e53935", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>logout</span>
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="syne"
              style={{ width: "100%", padding: "12px", background: "transparent", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "var(--ink2)", textDecoration: "none", textAlign: "center", display: "block" }}
            >
              Sign In
            </Link>
          )}
          <Link
            href="/destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="syne"
            style={{ width: "100%", padding: "12px", background: "var(--cu)", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none", textAlign: "center", display: "block" }}
          >
            Explore Packages
          </Link>
        </div>
      </div>

      <style jsx>{`
        .nav-links-list {
          display: flex;
        }
        @media (max-width: 1024px) {
          #nav {
            padding: 0 28px !important;
          }
          .nav-links-list {
            gap: 20px !important;
          }
        }
        @media (max-width: 768px) {
          .nav-links-list,
          .nav-sign-btn,
          .nav-user-btn,
          .nav-book-btn {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
          #nav {
            padding: 0 16px !important;
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
