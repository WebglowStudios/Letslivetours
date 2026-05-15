"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

function getPasswordStrength(password: string): { label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", color: "#dc3545", width: "25%" };
  if (score === 2) return { label: "Fair", color: "#fd7e14", width: "50%" };
  if (score === 3) return { label: "Medium", color: "var(--cu)", width: "75%" };
  return { label: "Strong", color: "#4AC28A", width: "100%" };
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    if (password.length < 8) {
      setFieldErrors({ password: "Password must be at least 8 characters" });
      return;
    }

    setLoading(true);

    const result = await register({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      password,
    });

    setLoading(false);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Registration failed");
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: "13px 16px",
    background: "#fff",
    border: "1.5px solid var(--line2)",
    borderRadius: 12,
    color: "var(--ink)",
    fontSize: 14,
    outline: "none",
    transition: "border-color .2s, box-shadow .2s",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "var(--ink3)",
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
            backgroundImage: "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80)",
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
            Join millions of travellers who trust us to craft their perfect getaway. Your journey begins with a single step.
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
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
          <h1 className="serif" style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
            Create Account
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 32 }}>
            Join 2M+ happy travellers. Start planning your dream trip today.
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
            {/* Name row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label className="syne" style={labelStyle}>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Rahul"
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label className="syne" style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Gupta"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7 }}>
              <label className="syne" style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={inputStyle}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7 }}>
              <label className="syne" style={labelStyle}>
                Phone Number <span style={{ fontWeight: 400, letterSpacing: 0, textTransform: "none", fontSize: 10, color: "var(--ink4)" }}>(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 7 }}>
              <label className="syne" style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  style={{ ...inputStyle, paddingRight: 48 }}
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
              {password && (
                <div style={{ marginTop: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--line)" }}>
                      <div style={{ height: "100%", width: strength.width, background: strength.color, borderRadius: 2, transition: "all .3s" }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: strength.color }}>{strength.label}</span>
                  </div>
                </div>
              )}
              {fieldErrors.password && (
                <span style={{ fontSize: 12, color: "#dc3545" }}>{fieldErrors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 7 }}>
              <label className="syne" style={labelStyle}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  style={{ ...inputStyle, paddingRight: 48 }}
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
              {fieldErrors.confirmPassword && (
                <span style={{ fontSize: 12, color: "#dc3545" }}>{fieldErrors.confirmPassword}</span>
              )}
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
                  Creating account...
                </>
              ) : (
                <>
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>person_add</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--ink3)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--gn2)", fontWeight: 600 }}>
              Sign In
            </Link>
          </p>
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
