"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      if (res.status === "success") {
        setSuccess(true);
      } else {
        setError(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--iv)",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)",
          padding: 48,
          boxShadow: "var(--sh)",
        }}
      >
        {!success ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--gn-gl)",
                  border: "1px solid rgba(0,77,94,.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 28, color: "var(--gn2)" }}>lock_reset</span>
              </div>
              <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                Forgot Password?
              </h1>
              <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.7 }}>
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(220,53,69,.08)",
                  border: "1px solid rgba(220,53,69,.2)",
                  borderRadius: 12,
                  color: "#dc3545",
                  fontSize: 13,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 7 }}>
                <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    padding: "13px 16px",
                    background: "var(--iv)",
                    border: "1.5px solid var(--line2)",
                    borderRadius: 12,
                    color: "var(--ink)",
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color .2s, box-shadow .2s",
                    width: "100%",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="syne"
                style={{
                  width: "100%",
                  padding: 16,
                  background: loading ? "var(--ink4)" : "var(--cu)",
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "var(--tr)",
                  boxShadow: loading ? "none" : "0 8px 28px rgba(245,166,35,.35)",
                }}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-rounded" style={{ fontSize: 18, animation: "spin 1s linear infinite" }}>progress_activity</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-rounded" style={{ fontSize: 18 }}>send</span>
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--ink3)" }}>
              <Link href="/login" style={{ color: "var(--gn2)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_back</span>
                Back to login
              </Link>
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(74,194,138,.12)",
                border: "2px solid rgba(74,194,138,.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 36, color: "#4AC28A" }}>check_circle</span>
            </div>
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>
              Check Your Email
            </h2>
            <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 24 }}>
              We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
            </p>
            <Link
              href="/login"
              className="syne"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "12px 24px",
                background: "var(--gn)",
                color: "#fff",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_back</span>
              Back to Login
            </Link>
          </div>
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
