"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirect");
  
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left decorative panel */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 48,
          overflow: "hidden",
        }}
        className="auth-left"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(0,77,94,.88) 0%, rgba(0,122,150,.75) 50%, rgba(0,174,204,.6) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 400 }}>
          <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
            LetsLive<span style={{ color: "var(--cu)" }}>Tours</span>
          </div>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.8)", lineHeight: 1.7, marginTop: 24 }}>
            Discover handcrafted journeys to the world&apos;s most extraordinary destinations. Your next adventure starts here.
          </p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 40 }}>
            <div style={{ textAlign: "center" }}>
              <div className="syne" style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>2M+</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Happy Travellers</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,.2)" }} />
            <div style={{ textAlign: "center" }}>
              <div className="syne" style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>50+</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Destinations</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,.2)" }} />
            <div style={{ textAlign: "center" }}>
              <div className="syne" style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>4.9</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 32px",
          background: "var(--iv)",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          <h1 className="serif" style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 36 }}>
            Sign in to access your bookings, wishlist, and travel plans.
          </p>

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
                  background: "#fff",
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

            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", gap: 7 }}>
              <label className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    padding: "13px 48px 13px 16px",
                    background: "#fff",
                    border: "1.5px solid var(--line2)",
                    borderRadius: 12,
                    color: "var(--ink)",
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color .2s, box-shadow .2s",
                    width: "100%",
                  }}
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

            <div style={{ textAlign: "right", marginBottom: 28 }}>
              <Link
                href="/forgot-password"
                style={{ fontSize: 13, color: "var(--gn2)", fontWeight: 500 }}
              >
                Forgot password?
              </Link>
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
                  Signing in...
                </>
              ) : (
                <>
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>login</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 28, fontSize: 14, color: "var(--ink3)" }}>
            Don&apos;t have an account?{" "}
            <Link href={redirectUrl ? `/register?redirect=${encodeURIComponent(redirectUrl)}` : "/register"} style={{ color: "var(--gn2)", fontWeight: 600 }}>
              Register
            </Link>
          </p>

          {redirectUrl?.includes("/book/") && (
            <div style={{ marginTop: 24, textAlign: "center", borderTop: "1px solid var(--line)", paddingTop: 24 }}>
              <p style={{ fontSize: 14, color: "var(--ink3)", marginBottom: 16 }}>
                Don&apos;t want to create an account right now?
              </p>
              <button
                type="button"
                onClick={() => {
                  const guestUrl = redirectUrl.includes("?") ? `${redirectUrl}&guest=true` : `${redirectUrl}?guest=true`;
                  router.push(guestUrl);
                }}
                className="syne"
                style={{
                  width: "100%",
                  padding: 16,
                  background: "#fff",
                  border: "1.5px solid var(--gn2)",
                  borderRadius: 12,
                  color: "var(--gn2)",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "var(--tr)",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>person_outline</span>
                Continue as Guest
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .auth-left {
          display: flex;
        }
        @media (max-width: 900px) {
          .auth-left {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
