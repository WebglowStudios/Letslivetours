"use client";

import React, { useMemo } from "react";

interface Departure {
  _id: string;
  startDate: string;
  endDate?: string;
  totalSlots: number;
  bookedSlots?: number;
  status?: string;
  priceCategory?: string;
  price: number;
}

interface DepartureGridProps {
  departures: Departure[];
  originalPrice?: number;
  onSelectSlot: (departureId: string) => void;
}

export default function DepartureGrid({ departures, originalPrice, onSelectSlot }: DepartureGridProps) {
  // Sort departures by start date
  const sortedDepartures = useMemo(() => {
    return [...departures].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [departures]);

  // Group by Month and Year
  const groupedDepartures = useMemo(() => {
    const groups: { [key: string]: Departure[] } = {};
    sortedDepartures.forEach(dep => {
      if (!dep.startDate) return;
      const d = new Date(dep.startDate);
      const monthYear = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(dep);
    });
    return groups;
  }, [sortedDepartures]);

  if (departures.length === 0) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", background: "#f8fafc", borderRadius: 16, border: "1px solid var(--line2)" }}>
        <p style={{ color: "var(--ink4)", fontSize: 14 }}>No upcoming departures scheduled for this tour.</p>
      </div>
    );
  }

  return (
    <div className="departure-grid-container" style={{
      background: "#fff",
      borderRadius: "var(--r-xl)",
      border: "1.5px solid var(--line)",
      padding: 32,
      boxShadow: "var(--sh)",
      marginBottom: 32
    }}>
      <div style={{ marginBottom: 24 }}>
        <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>
          All departure dates <span style={{ color: "var(--ink4)", fontWeight: 400 }}>({departures.length})</span>
        </h3>
        <p style={{ fontSize: 14, color: "var(--ink3)" }}>Select a date below to view details and proceed with your enquiry.</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 16px", alignItems: "flex-start" }}>
        {Object.entries(groupedDepartures).map(([monthYear, deps]) => {
          const [month, year] = monthYear.split(" ");
          return (
            <React.Fragment key={monthYear}>
              {/* Month Separator Pill */}
              <div style={{
                background: "var(--ink)",
                color: "#fff",
                borderRadius: 8,
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1.2,
                marginTop: 8
              }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{month}</span>
                <span style={{ fontSize: 11, opacity: 0.8 }}>{year}</span>
              </div>

              {/* Date Cards */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {deps.map(dep => {
                  const d = new Date(dep.startDate);
                  const dayOfWeek = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
                  const dateNum = d.getDate();
                  const isSoldOut = dep.status === "sold-out" || dep.status === "completed" || (dep.totalSlots > 0 && (dep.bookedSlots || 0) >= dep.totalSlots);
                  const priceToUse = dep.price > 0 ? dep.price : (originalPrice || 0);
                  const slotsLeft = dep.totalSlots > 0 ? Math.max(0, dep.totalSlots - (dep.bookedSlots || 0)) : null;
                  
                  // Calculate savings if original price is greater than departure price
                  let savings = 0;
                  if (originalPrice && originalPrice > priceToUse) {
                    savings = originalPrice - priceToUse;
                  }

                  return (
                    <button
                      key={dep._id}
                      onClick={() => !isSoldOut && onSelectSlot(dep._id)}
                      disabled={isSoldOut}
                      className="departure-card"
                      style={{
                        background: "#fff",
                        border: "1.5px solid var(--line2)",
                        borderRadius: 8,
                        minWidth: 85,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        overflow: "hidden",
                        cursor: isSoldOut ? "not-allowed" : "pointer",
                        opacity: isSoldOut ? 0.6 : 1,
                        transition: "var(--tr)",
                        position: "relative"
                      }}
                    >
                      <div style={{
                        width: "100%",
                        padding: "6px 0",
                        background: "var(--iv)",
                        borderBottom: "1px solid var(--line2)",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--ink4)",
                        textAlign: "center",
                        letterSpacing: 0.5
                      }}>
                        {dayOfWeek}
                      </div>
                      <div style={{ padding: "10px 12px", textAlign: "center", width: "100%" }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", lineHeight: 1, marginBottom: 4 }}>
                          {dateNum < 10 ? `0${dateNum}` : dateNum}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink3)", marginBottom: slotsLeft !== null && !isSoldOut ? 4 : 0 }}>
                          ₹{priceToUse.toLocaleString("en-IN")}
                        </div>
                        {slotsLeft !== null && !isSoldOut && (
                          <div style={{ fontSize: 10, fontWeight: 600, color: slotsLeft <= 3 ? "#ef4444" : "var(--gn)" }}>
                            {slotsLeft} {slotsLeft === 1 ? 'slot' : 'slots'} left
                          </div>
                        )}
                      </div>
                      
                      {isSoldOut ? (
                        <div style={{
                          width: "100%",
                          padding: "4px 0",
                          background: "var(--bg-red, #fee2e2)",
                          color: "var(--text-red, #ef4444)",
                          fontSize: 10,
                          fontWeight: 700,
                          textAlign: "center"
                        }}>
                          Sold Out
                        </div>
                      ) : savings > 0 ? (
                        <div style={{
                          width: "100%",
                          padding: "4px 0",
                          background: "#fef3c7", // Amber-50 equivalent
                          color: "#b45309",      // Amber-700 equivalent
                          fontSize: 10,
                          fontWeight: 700,
                          textAlign: "center"
                        }}>
                          Save ₹{savings.toLocaleString("en-IN")}
                        </div>
                      ) : dep.status === "filling-fast" ? (
                        <div style={{
                          width: "100%",
                          padding: "4px 0",
                          background: "#ffedd5", // Orange-50 equivalent
                          color: "#c2410c",      // Orange-700 equivalent
                          fontSize: 10,
                          fontWeight: 700,
                          textAlign: "center"
                        }}>
                          Filling Fast
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
              
            </React.Fragment>
          );
        })}
      </div>

      <style jsx>{`
        .departure-card:hover:not(:disabled) {
          border-color: var(--gn);
          box-shadow: 0 4px 12px rgba(0, 174, 204, 0.15);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
