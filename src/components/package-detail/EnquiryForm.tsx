"use client";

import { useState, FormEvent } from "react";

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
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
        style={{ fontSize: 19, fontWeight: 600, color: "var(--ink)", marginBottom: 18 }}
      >
        Send an Enquiry
      </h3>

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
          <input
            className="form-input"
            type="tel"
            placeholder="+91 98765 43210"
            required
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
            Travel Date
          </label>
          <input
            className="form-input"
            type="date"
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
          className="syne form-submit-btn"
          style={{
            width: "100%",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            background: submitted ? "var(--gn3)" : "var(--gn)",
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
            cursor: "pointer",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
            {submitted ? "check_circle" : "send"}
          </span>
          {submitted ? "Enquiry Sent!" : "Send Enquiry"}
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
        .form-submit-btn:hover {
          background: var(--gn2) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
