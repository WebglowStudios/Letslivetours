"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--iv)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <span
            className="material-symbols-rounded"
            style={{
              fontSize: 36,
              color: "var(--gn2)",
              animation: "spin 1s linear infinite",
            }}
          >
            progress_activity
          </span>
          <p className="syne" style={{ marginTop: 16, fontSize: 14, color: "var(--ink3)" }}>
            Loading...
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
