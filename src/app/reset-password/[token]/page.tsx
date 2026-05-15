"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      if (res.status === "success") {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(res.message || "Invalid or expired reset token");
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    padding: "13px 48px 13px 16px",
    background: "var(--iv)",
    border: "1.5px solid var(--line2)",
    borderRadius: 12,
    color: "var(--ink)",
    fontSize: 14,
    outline: "none",
    transition: "border-color .2s, box-shadow .2s",
    width: "100%",
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
                <span className="material-symbols-rounded" style={{ fontSize: 28, color: "var(--gn2)" }}>password</span>
              </div>
              <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                Reset Password
              </h1>
              <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.7 }}>
                Enter your new password below.
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
              <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7 }}>
                <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>
                  New Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink4)" }}>
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 7 }}>
                <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>
                  Confirm Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--ink4)" }}>
                      {showConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
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
                    Resetting...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-rounded" style={{ fontSize: 18 }}>lock</span>
                    Reset Password
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
              Password Reset!
            </h2>
            <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.7 }}>
              Your password has been reset successfully. Redirecting to login...
            </p>
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
