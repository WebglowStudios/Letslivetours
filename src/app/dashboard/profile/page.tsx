"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import PhoneInput from "@/components/ui/PhoneInput";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();

  // Personal info form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);

    try {
      const res = await api.put("/users/profile", {
        firstName,
        lastName,
        phone,
        avatar,
      });

      if (res?.status === "success") {
        setProfileMsg({ type: "success", text: "Profile updated successfully!" });
        await refreshUser();
      } else {
        setProfileMsg({ type: "error", text: res?.message || "Failed to update profile." });
      }
    } catch {
      setProfileMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setPasswordSaving(true);

    try {
      const res = await api.put("/users/password", {
        currentPassword,
        newPassword,
      });

      if (res?.status === "success") {
        setPasswordMsg({ type: "success", text: "Password changed successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMsg({ type: "error", text: res?.message || "Failed to change password." });
      }
    } catch {
      setPasswordMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setPasswordSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    background: "var(--iv)",
    border: "1px solid var(--line2)",
    borderRadius: "var(--r)",
    fontSize: 14,
    color: "var(--ink)",
    outline: "none",
    transition: "var(--tr)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--ink2)",
    marginBottom: 8,
  };

  return (
    <div>
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 32 }}>
        Profile Settings
      </h1>

      {/* Personal Info */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)",
          padding: 32,
          marginBottom: 24,
        }}
      >
        <h2 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 24 }}>
          Personal Information
        </h2>

        {profileMsg && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "var(--r)",
              marginBottom: 20,
              fontSize: 13,
              fontWeight: 500,
              background: profileMsg.type === "success" ? "rgba(74,194,138,.12)" : "rgba(220,53,69,.08)",
              color: profileMsg.type === "success" ? "#388e3c" : "#dc3545",
              border: `1px solid ${profileMsg.type === "success" ? "rgba(74,194,138,.2)" : "rgba(220,53,69,.15)"}`,
            }}
          >
            {profileMsg.text}
          </div>
        )}

        <form onSubmit={handleProfileSubmit}>
          <div className="form-grid">
            <div>
              <label className="syne" style={labelStyle}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label className="syne" style={labelStyle}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label className="syne" style={labelStyle}>Phone</label>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                placeholder="98765 43210"
              />
            </div>
            <div>
              <label className="syne" style={labelStyle}>Avatar URL</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                style={inputStyle}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={profileSaving}
            className="syne"
            style={{
              marginTop: 24,
              padding: "14px 32px",
              background: "var(--gn)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--r)",
              fontSize: 14,
              fontWeight: 600,
              cursor: profileSaving ? "not-allowed" : "pointer",
              opacity: profileSaving ? 0.7 : 1,
              transition: "var(--tr)",
            }}
          >
            {profileSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)",
          padding: 32,
        }}
      >
        <h2 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 24 }}>
          Change Password
        </h2>

        {passwordMsg && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "var(--r)",
              marginBottom: 20,
              fontSize: 13,
              fontWeight: 500,
              background: passwordMsg.type === "success" ? "rgba(74,194,138,.12)" : "rgba(220,53,69,.08)",
              color: passwordMsg.type === "success" ? "#388e3c" : "#dc3545",
              border: `1px solid ${passwordMsg.type === "success" ? "rgba(74,194,138,.2)" : "rgba(220,53,69,.15)"}`,
            }}
          >
            {passwordMsg.text}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
            <div>
              <label className="syne" style={labelStyle}>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label className="syne" style={labelStyle}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={inputStyle}
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="syne" style={labelStyle}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={passwordSaving}
            className="syne"
            style={{
              marginTop: 24,
              padding: "14px 32px",
              background: "var(--gn)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--r)",
              fontSize: 14,
              fontWeight: 600,
              cursor: passwordSaving ? "not-allowed" : "pointer",
              opacity: passwordSaving ? 0.7 : 1,
              transition: "var(--tr)",
            }}
          >
            {passwordSaving ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        input:focus {
          border-color: var(--gn2) !important;
          box-shadow: 0 0 0 3px var(--gn-gl);
        }
        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
