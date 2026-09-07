"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--iv)",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)",
          padding: "52px 36px",
          boxShadow: "var(--sh)",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(229,57,53,.08)",
            border: "1.5px solid rgba(229,57,53,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 36, color: "#e53935" }}
          >
            warning
          </span>
        </div>

        <h1
          className="serif"
          style={{
            fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: 10,
          }}
        >
          Something Went Wrong
        </h1>

        <p
          style={{
            fontSize: 14.5,
            color: "var(--ink3)",
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 420,
            marginInline: "auto",
          }}
        >
          We encountered an unexpected issue while loading this page. Please try refreshing or return to the homepage.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => reset()}
            className="syne"
            style={{
              padding: "12px 28px",
              background: "var(--cu)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
              cursor: "pointer",
              transition: "var(--tr)",
              boxShadow: "0 4px 16px rgba(0,174,204,.3)",
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="syne"
            style={{
              padding: "12px 28px",
              background: "transparent",
              color: "var(--gn)",
              border: "1.5px solid var(--line2)",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
              textDecoration: "none",
              transition: "var(--tr)",
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
