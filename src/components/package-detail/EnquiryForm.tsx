"use client";

import { useState, FormEvent } from "react";
import { api } from "@/lib/api";
import PhoneInput from "@/components/ui/PhoneInput";

interface EnquiryFormProps {
  packageName: string;
  packageId?: string;
}

export default function EnquiryForm({ packageName, packageId }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/enquiries", {
        type: "booking",
        firstName: name,
        email,
        phone,
        travelDate: travelDate || undefined,
        message: message || undefined,
        packageName: packageName || undefined,
        package: packageId || undefined,
        source: "website",
      });

      if (res.status === "success") {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setName("");
          setEmail("");
          setPhone("");
          setTravelDate("");
          setMessage("");
        }, 3000);
      } else {
        setError(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--r-xl)",
        border: "1.5px solid var(--line)",
        padding: 24,
        boxShadow: "var(--sh)",
      }}
    >
      <h3
        className="serif"
        style={{ fontSize: 19, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}
      >
        Send an Enquiry
      </h3>
      {packageName && (
        <p
          style={{
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: 12,
            color: "var(--ink4)",
            marginBottom: 18,
          }}
        >
          About: {packageName}
        </p>
      )}

      {error && (
        <div style={{ padding: "10px 14px", background: "rgba(229,57,53,.08)", border: "1px solid rgba(229,57,53,.2)", borderRadius: 8, marginBottom: 14, fontSize: 12.5, color: "#e53935", display: "flex", alignItems: "center", gap: 8 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 16 }}>error</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 14 }}>
          <label
            className="syne"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--ink2)",
              marginBottom: 6,
              display: "block",
              letterSpacing: 0.3,
            }}
          >
            Your Name
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Rahul Sharma"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 13.5,
              color: "var(--ink)",
              background: "var(--iv)",
              border: "1.5px solid var(--line2)",
              borderRadius: 10,
              padding: "10px 14px",
              transition: "var(--tr)",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            className="syne"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--ink2)",
              marginBottom: 6,
              display: "block",
              letterSpacing: 0.3,
            }}
          >
            Email Address
          </label>
          <input
            className="form-input"
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 13.5,
              color: "var(--ink)",
              background: "var(--iv)",
              border: "1.5px solid var(--line2)",
              borderRadius: 10,
              padding: "10px 14px",
              transition: "var(--tr)",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            className="syne"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--ink2)",
              marginBottom: 6,
              display: "block",
              letterSpacing: 0.3,
            }}
          >
            Phone Number
          </label>
          <PhoneInput
            value={phone}
            onChange={setPhone}
            placeholder="98765 43210"
            required
            style={{ borderRadius: 10 }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            className="syne"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--ink2)",
              marginBottom: 6,
              display: "block",
              letterSpacing: 0.3,
            }}
          >
            Travel Date
          </label>
          <input
            className="form-input"
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            style={{
              width: "100%",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 13.5,
              color: "var(--ink)",
              background: "var(--iv)",
              border: "1.5px solid var(--line2)",
              borderRadius: 10,
              padding: "10px 14px",
              transition: "var(--tr)",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            className="syne"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--ink2)",
              marginBottom: 6,
              display: "block",
              letterSpacing: 0.3,
            }}
          >
            Message (optional)
          </label>
          <textarea
            className="form-input"
            placeholder="Any special requirements or questions..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: 13.5,
              color: "var(--ink)",
              background: "var(--iv)",
              border: "1.5px solid var(--line2)",
              borderRadius: 10,
              padding: "10px 14px",
              transition: "var(--tr)",
              outline: "none",
              resize: "vertical",
              minHeight: 90,
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || submitted}
          className="syne form-submit-btn"
          style={{
            width: "100%",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            background: submitted ? "var(--gn3)" : loading ? "var(--ink4)" : "var(--gn)",
            padding: 13,
            borderRadius: 50,
            transition: "var(--tr)",
            boxShadow: "0 6px 20px rgba(0,77,94,.2)",
            marginTop: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            border: "none",
            cursor: loading || submitted ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
            {submitted ? "check_circle" : loading ? "hourglass_empty" : "send"}
          </span>
          {submitted ? "Enquiry Sent!" : loading ? "Sending..." : "Send Enquiry"}
        </button>
      </form>

      <style jsx>{`
        .form-input:focus {
          border-color: var(--gn3) !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(0, 174, 204, 0.08);
        }
        .form-input::placeholder {
          color: var(--ink4);
        }
        .form-submit-btn:hover:not(:disabled) {
          background: var(--gn2) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
