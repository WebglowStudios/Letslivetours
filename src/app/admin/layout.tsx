"use client";

import AdminGuard from "@/components/auth/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <AdminNav />
        <main
          style={{
            flex: 1,
            background: "var(--iv)",
            padding: 32,
            overflowY: "auto",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
