"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/admin" },
  { label: "Bookings", icon: "luggage", href: "/admin/bookings" },
  { label: "Destinations", icon: "travel_explore", href: "/admin/destinations" },
  { label: "Packages", icon: "inventory_2", href: "/admin/packages" },
  { label: "Enquiries", icon: "mail", href: "/admin/enquiries" },
  { label: "Users", icon: "group", href: "/admin/users" },
  { label: "Careers", icon: "work", href: "/admin/careers" },
  { label: "Reviews", icon: "rate_review", href: "/admin/reviews" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="admin-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle admin menu"
      >
        <span className="material-symbols-rounded" style={{ fontSize: 28, color: "var(--gn)" }}>
          {mobileOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="admin-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="admin-sidebar__logo">
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>LetsLive Tours</span>
          <span className="admin-badge">Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${isActive(item.href) ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__divider" />

        <Link href="/" className="admin-nav-item" onClick={() => setMobileOpen(false)}>
          <span className="material-symbols-rounded" style={{ fontSize: 20 }}>arrow_back</span>
          <span>Back to Site</span>
        </Link>
      </aside>

      <style jsx>{`
        .admin-hamburger {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1100;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 8px;
          cursor: pointer;
        }
        .admin-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.4);
          z-index: 999;
        }
        .admin-sidebar {
          width: 260px;
          min-height: 100vh;
          background: var(--gn);
          padding: 28px 16px;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: 1000;
        }
        .admin-sidebar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 12px 28px;
          border-bottom: 1px solid rgba(255,255,255,.12);
          margin-bottom: 20px;
        }
        .admin-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: var(--cu);
          color: #fff;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .admin-sidebar__nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .admin-sidebar__divider {
          height: 1px;
          background: rgba(255,255,255,.12);
          margin: 16px 0;
        }
        @media (max-width: 900px) {
          .admin-hamburger {
            display: flex;
          }
          .admin-overlay {
            display: block;
          }
          .admin-sidebar {
            position: fixed;
            left: -280px;
            top: 0;
            transition: left .3s ease;
          }
          .admin-sidebar.open {
            left: 0;
          }
        }
      `}</style>

      <style jsx global>{`
        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 10px;
          color: rgba(255,255,255,.75);
          font-size: 14px;
          font-weight: 500;
          transition: all .2s ease;
          text-decoration: none;
        }
        .admin-nav-item:hover {
          background: rgba(255,255,255,.08);
          color: #fff;
        }
        .admin-nav-item.active {
          background: rgba(255,255,255,.12);
          color: #fff;
        }
      `}</style>
    </>
  );
}
