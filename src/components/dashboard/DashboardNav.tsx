"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const navItems = [
  { label: "Overview", icon: "dashboard", href: "/dashboard" },
  { label: "My Bookings", icon: "luggage", href: "/dashboard/bookings" },
  { label: "Wishlist", icon: "favorite", href: "/dashboard/wishlist" },
  { label: "My Reviews", icon: "rate_review", href: "/dashboard/reviews" },
  { label: "Profile", icon: "person", href: "/dashboard/profile" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="dash-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span className="material-symbols-rounded" style={{ fontSize: 28 }}>
          {mobileOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="dash-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`dash-sidebar ${mobileOpen ? "open" : ""}`}>
        {/* User info */}
        <div style={{ padding: "32px 24px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--gn)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                }}
                className="syne"
              >
                {initials}
              </div>
            )}
            <div style={{ overflow: "hidden" }}>
              <p
                className="syne"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.firstName} {user?.lastName}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--ink3)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                router.push(item.href);
                setMobileOpen(false);
              }}
              className="dash-nav-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: "var(--r)",
                marginBottom: 4,
                fontSize: 14,
                fontWeight: 500,
                transition: "var(--tr)",
                background: isActive(item.href) ? "var(--gn)" : "transparent",
                color: isActive(item.href) ? "#fff" : "var(--ink2)",
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{ fontSize: 20 }}
              >
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Divider + Logout */}
        <div style={{ padding: "0 12px 24px" }}>
          <div style={{ height: 1, background: "var(--line)", marginBottom: 12 }} />
          <button
            onClick={handleLogout}
            className="dash-nav-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: "var(--r)",
              fontSize: 14,
              fontWeight: 500,
              background: "transparent",
              color: "var(--ink2)",
              border: "none",
              cursor: "pointer",
              width: "100%",
              transition: "var(--tr)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
              logout
            </span>
            Logout
          </button>
        </div>
      </aside>

      <style jsx>{`
        .dash-sidebar {
          width: 260px;
          min-height: 100vh;
          background: #fff;
          border-right: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: 100;
        }
        .dash-hamburger {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 200;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 8px;
          cursor: pointer;
          box-shadow: var(--sh);
        }
        .dash-overlay {
          display: none;
        }
        .dash-nav-item:hover {
          background: var(--gn-gl) !important;
        }
        @media (max-width: 768px) {
          .dash-sidebar {
            position: fixed;
            top: 0;
            left: -280px;
            transition: left 0.3s ease;
            box-shadow: var(--sh-lg);
          }
          .dash-sidebar.open {
            left: 0;
          }
          .dash-hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .dash-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 99;
          }
        }
      `}</style>
    </>
  );
}
