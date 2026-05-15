"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <DashboardNav />
        <main
          style={{
            flex: 1,
            padding: 32,
            background: "var(--iv)",
            overflowY: "auto",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          main {
            padding: 24px 16px !important;
            padding-top: 72px !important;
          }
        }
      `}</style>
    </AuthGuard>
  );
}
