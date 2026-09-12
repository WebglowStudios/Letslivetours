"use client";

import { useState } from "react";
import Link from "next/link";

interface PackageTrustPillarsProps {
  destinationName?: string;
  destinationSlug?: string;
}

export default function PackageTrustPillars({ destinationName, destinationSlug }: PackageTrustPillarsProps) {
  const [moreTourismOpen, setMoreTourismOpen] = useState(true);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "var(--r)",
        border: "1.5px solid var(--line)",
        padding: "26px 24px",
        marginBottom: 28,
        boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
      }}
    >
      {/* 4 Trust Feature Pillars */}
      <div className="trust-pillars-grid">
        {/* Pillar 1: 300k+ Happy customers */}
        <div className="trust-pillar-item">
          <div className="trust-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
              {/* Background warm aura */}
              <circle cx="32" cy="32" r="28" fill="#FFF7ED" />
              <path d="M42 22C42 22 47 25 45 31" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="48" cy="20" r="1.5" fill="#F59E0B" />
              <circle cx="16" cy="26" r="1" fill="#F59E0B" />
              <circle cx="44" cy="42" r="1.5" fill="#FBBF24" />

              {/* Left heart */}
              <path
                d="M20 28C17 24 21 20 24 23C27 20 31 24 28 28L24 32L20 28Z"
                fill="#FEF3C7"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M24 32V42M21 39L24 42L27 39" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Center smaller heart */}
              <path
                d="M28 34C26 31 29 28 31 30C33 28 36 31 34 34L31 37L28 34Z"
                fill="#FDE68A"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M31 37V46M29 44L31 46L33 44" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Right larger heart */}
              <path
                d="M34 22C30 17 36 12 40 16C44 12 50 17 46 22L40 28L34 22Z"
                fill="#FED7AA"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M40 28V42M37 39L40 42L43 39" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="trust-pillar-title">300k+</h4>
          <p className="trust-pillar-desc">Happy customers from 70+ countries all around.</p>
        </div>

        {/* Pillar 2: 4.8/5 Rating */}
        <div className="trust-pillar-item">
          <div className="trust-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" fill="#FFF7ED" />
              <circle cx="48" cy="22" r="1.5" fill="#F59E0B" />
              <circle cx="15" cy="36" r="1.5" fill="#FBBF24" />

              {/* Speech bubble */}
              <path
                d="M18 24C18 20.6863 20.6863 18 24 18H44C47.3137 18 50 20.6863 50 24V38C50 41.3137 47.3137 44 44 44H26L20 49V44C18.8954 44 18 43.1046 18 42V24Z"
                fill="#FEF3C7"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Message lines */}
              <path d="M25 34H43" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
              <path d="M25 39H35" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

              {/* Star on top */}
              <path
                d="M34 14L36.2 19L41.5 19.5L37.5 23.2L38.7 28.5L34 25.7L29.3 28.5L30.5 23.2L26.5 19.5L31.8 19L34 14Z"
                fill="#F59E0B"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h4 className="trust-pillar-title">4.8/5</h4>
          <p className="trust-pillar-desc">Rated across Trip Advisor and Google.</p>
        </div>

        {/* Pillar 3: Curated with love */}
        <div className="trust-pillar-item">
          <div className="trust-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" fill="#FFF7ED" />
              <circle cx="16" cy="24" r="1.5" fill="#F59E0B" />
              <circle cx="48" cy="38" r="1.5" fill="#FBBF24" />

              {/* Mini floating sparkle heart */}
              <path d="M46 18C44.5 16 46.5 14 48 15.5C49.5 14 51.5 16 50 18L48 20L46 18Z" fill="#FDE68A" stroke="#1E293B" strokeWidth="1" />

              {/* Main Heart */}
              <path
                d="M32 46L19 32C14.5 27 15 19 22.5 18C27 17.5 30.5 21 32 23C33.5 21 37 17.5 41.5 18C49 19 49.5 27 45 32L32 46Z"
                fill="#FEF3C7"
                stroke="#1E293B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Internal decorative accent arc */}
              <path
                d="M23 23C21 25.5 21 29 23.5 32"
                stroke="#F59E0B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h4 className="trust-pillar-title">Curated with love</h4>
          <p className="trust-pillar-desc">Special curated Indian Itineraries for Indians.</p>
        </div>

        {/* Pillar 4: 24/7 On-trip assistance */}
        <div className="trust-pillar-item">
          <div className="trust-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" fill="#FFF7ED" />
              <circle cx="16" cy="38" r="1.5" fill="#F59E0B" />
              <circle cx="49" cy="22" r="1.5" fill="#FBBF24" />

              {/* Badge for "24" */}
              <rect x="27" y="16" width="22" height="15" rx="5" fill="#FED7AA" stroke="#1E293B" strokeWidth="1.8" />
              <text x="38" y="27" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#1E293B" textAnchor="middle">24</text>

              {/* Phone receiver handset */}
              <path
                d="M20 22C20 22 23 20 25 22C27 24 28 27 26 29C25 30 24 31 26 34C28 37 31 40 34 42C37 44 38 43 39 42C41 40 44 41 46 43C48 45 46 48 46 48C42 51 34 50 25 41C16 32 15 24 18 20L20 22Z"
                fill="#FEF3C7"
                stroke="#1E293B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h4 className="trust-pillar-title">24/7 On-trip assistance</h4>
          <p className="trust-pillar-desc">We are always there to help you pre, post and on the trip.</p>
        </div>
      </div>

      {/* Optional: "More On [Destination] Tourism" accordion */}
      {destinationName && (
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--line2)" }}>
          <button
            type="button"
            onClick={() => setMoreTourismOpen(!moreTourismOpen)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "none",
              border: "none",
              padding: "4px 0",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sora), 'Sora', sans-serif",
                fontSize: 14.5,
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              More On {destinationName} Tourism
            </span>
            <span
              className="material-symbols-rounded"
              style={{
                fontSize: 20,
                color: "var(--ink3)",
                transition: "transform .25s ease",
                transform: moreTourismOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              keyboard_arrow_down
            </span>
          </button>

          {/* Links when accordion is open */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: moreTourismOpen ? "1fr" : "0fr",
              transition: "grid-template-rows .3s ease",
            }}
          >
            <div style={{ overflow: "hidden", minHeight: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px 12px",
                  paddingTop: 14,
                  fontSize: 12.5,
                  fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Link
                  href={`/destinations/${destinationSlug || ""}`}
                  className="tourism-link"
                  style={{ color: "var(--gn)", textDecoration: "none", borderBottom: "1px solid var(--line2)", paddingBottom: 1 }}
                >
                  {destinationName} Tour Packages
                </Link>
                <span style={{ color: "var(--line2)", userSelect: "none" }}>|</span>
                <Link
                  href={`/destinations/${destinationSlug || ""}#highlights`}
                  className="tourism-link"
                  style={{ color: "var(--gn)", textDecoration: "none", borderBottom: "1px solid var(--line2)", paddingBottom: 1 }}
                >
                  Things to do in {destinationName}
                </Link>
                <span style={{ color: "var(--line2)", userSelect: "none" }}>|</span>
                <Link
                  href={`/destinations/${destinationSlug || ""}#places`}
                  className="tourism-link"
                  style={{ color: "var(--gn)", textDecoration: "none", borderBottom: "1px solid var(--line2)", paddingBottom: 1 }}
                >
                  Places to visit in {destinationName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .trust-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          align-items: start;
        }
        .trust-pillar-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .trust-icon-wrapper {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .trust-pillar-title {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 5px 0;
          line-height: 1.3;
        }
        .trust-pillar-desc {
          font-family: var(--font-jakarta), 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          line-height: 1.5;
          color: var(--ink3);
          margin: 0;
        }
        .tourism-link:hover {
          color: var(--cu) !important;
          border-bottom-color: var(--cu) !important;
        }
        @media (max-width: 900px) {
          .trust-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 16px;
          }
        }
        @media (max-width: 480px) {
          .trust-pillars-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
