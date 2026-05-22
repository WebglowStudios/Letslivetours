"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function verify() {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        if (res.status === "success") {
          setStatus("success");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage(res.message || "Invalid or expired verification link");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
    verify();
  }, [token, router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)", padding: 20 }}>
      <div style={{ textAlign: "center", maxWidth: 420, width: "100%" }}>
        {status === "loading" && (
          <>
            <span
              className="material-symbols-rounded"
              style={{ fontSize: 48, color: "var(--gn2)", animation: "spin 1s linear infinite" }}
            >
              progress_activity
            </span>
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", marginTop: 20, marginBottom: 8 }}>
              Verifying your email...
            </h2>
            <p style={{ fontSize: 14, color: "var(--ink3)" }}>Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(74,194,138,.12)", border: "2px solid rgba(74,194,138,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 40, color: "#4AC28A" }}>check_circle</span>
            </div>
            <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>
              Email Verified!
            </h2>
            <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.6 }}>
              Your email has been verified successfully. Redirecting to your dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(229,57,53,.08)", border: "2px solid rgba(229,57,53,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 40, color: "#e53935" }}>cancel</span>
            </div>
            <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>
              Verification Failed
            </h2>
            <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.6, marginBottom: 24 }}>
              {errorMessage}
            </p>
            <Link
              href="/login"
              className="syne"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background: "var(--gn)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                borderRadius: 50,
                textDecoration: "none",
                transition: "var(--tr)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_back</span>
              Back to Login
            </Link>
          </>
        )}
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
