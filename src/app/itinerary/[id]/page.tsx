"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageGallery from "@/components/package-detail/PackageGallery";
import PackageInfo from "@/components/package-detail/PackageInfo";
import PackageTabs from "@/components/package-detail/PackageTabs";
import InclusionsExclusions from "@/components/package-detail/InclusionsExclusions";
import PackageTrustPillars from "@/components/package-detail/PackageTrustPillars";
import KnowBeforeYouGo from "@/components/package-detail/KnowBeforeYouGo";
import ThingsToCarry from "@/components/package-detail/ThingsToCarry";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import DepartureGrid from "@/components/package-detail/DepartureGrid";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function formatDateLong(d?: string | Date): string {
  if (!d) return "";
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return String(d);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(d);
  }
}

function formatDateRange(startDate?: string | Date, endDate?: string | Date): string {
  if (!startDate) return "";
  try {
    const s = new Date(startDate);
    if (isNaN(s.getTime())) return "";
    const sDay = s.getDate();
    const sMonth = s.toLocaleDateString("en-IN", { month: "short" });
    const sYear = s.getFullYear();

    if (!endDate) {
      return `${sDay} ${sMonth} ${sYear}`;
    }

    const e = new Date(endDate);
    if (isNaN(e.getTime())) {
      return `${sDay} ${sMonth} ${sYear}`;
    }
    const eDay = e.getDate();
    const eMonth = e.toLocaleDateString("en-IN", { month: "short" });
    const eYear = e.getFullYear();

    if (sYear === eYear) {
      if (sMonth === eMonth) {
        return `${sDay} – ${eDay} ${sMonth} ${sYear}`;
      }
      return `${sDay} ${sMonth} – ${eDay} ${eMonth} ${sYear}`;
    }
    return `${sDay} ${sMonth} ${sYear} – ${eDay} ${eMonth} ${eYear}`;
  } catch {
    return "";
  }
}

function computeFlightDate(startDate?: string | Date, dayNum: number = 1): string {
  if (!startDate) return "";
  try {
    const d = new Date(startDate);
    if (isNaN(d.getTime())) return "";
    d.setDate(d.getDate() + Math.max(0, dayNum - 1));
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
}

export default function CustomItineraryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const [selectedHotelOptions, setSelectedHotelOptions] = useState<Record<number, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("booked") === "true") {
        setIsBooked(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/packages/${id}`)
      .then((r) => r.json())
      .then((res) => { if (res.data) setPkg(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  // Initialize selected hotels when package data loads
  useEffect(() => {
    if (pkg?.stays && Array.isArray(pkg.stays)) {
      const initial: Record<number, string> = {};
      pkg.stays.forEach((stay: any, idx: number) => {
        if (stay.hasOptions && stay.options && stay.options.length > 0) {
          const defaultOpt = stay.options.find((o: any) => o.isDefault) || stay.options[0];
          initial[idx] = defaultOpt.optionId;
        } else {
          initial[idx] = "default";
        }
      });
      setSelectedHotelOptions(initial);
    }
  }, [pkg]);

  const handleSelectHotelOption = (stayIndex: number, optionId: string) => {
    setSelectedHotelOptions((prev) => ({
      ...prev,
      [stayIndex]: optionId,
    }));
  };

  const hotelUpgradePerPax = useMemo(() => {
    if (!pkg?.stays) return 0;
    let total = 0;
    pkg.stays.forEach((stay: any, idx: number) => {
      if (!stay.hasOptions || !stay.options) return;
      const chosenOptionId = selectedHotelOptions[idx];
      const opt = stay.options.find((o: any) => o.optionId === chosenOptionId) || stay.options[0];
      if (opt?.priceDifference) {
        total += Number(opt.priceDifference);
      }
    });
    return total;
  }, [pkg, selectedHotelOptions]);

  const effectivePrice = (pkg?.price || 0) + hotelUpgradePerPax;

  const selectedHotelOptionsPayload = useMemo(() => {
    if (!pkg?.stays) return [];
    return pkg.stays.map((stay: any, idx: number) => {
      const chosenOptionId = selectedHotelOptions[idx];
      const opt = stay.options?.find((o: any) => o.optionId === chosenOptionId) || stay.options?.[0];
      return {
        stayIndex: idx,
        stayLocation: stay.stayLocation || stay.name || `Location ${idx + 1}`,
        optionId: opt?.optionId || "default",
        hotelName: opt?.name || opt?.hotelName || stay.name || "Standard Hotel",
        hotelRating: opt?.rating ? Number(opt.rating) : (stay.rating ? Number(stay.rating) : undefined),
        roomType: opt?.roomType || stay.roomType,
        priceDifferenceApplied: opt?.priceDifference || 0,
      };
    });
  }, [pkg, selectedHotelOptions]);

  // Persist to sessionStorage for booking checkout
  useEffect(() => {
    if (id && selectedHotelOptionsPayload.length > 0) {
      try {
        sessionStorage.setItem(`selectedHotelOptions_${id}`, JSON.stringify(selectedHotelOptionsPayload));
        if (pkg?.slug) {
          sessionStorage.setItem(`selectedHotelOptions_${pkg.slug}`, JSON.stringify(selectedHotelOptionsPayload));
        }
      } catch (e) {
        console.error("Failed to store selected hotel options", e);
      }
    }
  }, [id, pkg, selectedHotelOptionsPayload]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ width: 40, height: 40, border: "4px solid var(--line2)", borderTopColor: "var(--cu)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column", gap: 16 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 48, color: "var(--ink4)" }}>error</span>
        <p style={{ fontSize: 16, color: "var(--ink3)" }}>Itinerary not found or link expired.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "88px 24px 60px" }}>
        {/* Custom badge */}
        <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span className="syne" style={{ fontSize: 11, fontWeight: 700, background: "rgba(0,174,204,.12)", color: "var(--gn2)", padding: "5px 14px", borderRadius: 50, letterSpacing: 1, textTransform: "uppercase" }}>
            Custom Itinerary
          </span>
          {pkg.clientName && (
            <span style={{ fontSize: 13, color: "var(--ink3)" }}>Curated for <strong style={{ color: "var(--ink)" }}>{pkg.clientName}</strong></span>
          )}
          {(() => {
            const raw = (pkg?.curatedBy || pkg?.preparedBy || (pkg?.assignedTo && (typeof pkg.assignedTo === 'object' ? `${pkg.assignedTo.firstName || ''} ${pkg.assignedTo.lastName || ''}`.trim() || pkg.assignedTo.name : pkg.assignedTo)) || '');
            const clean = typeof raw === 'string' ? raw.replace(/[_-]?\s*lets\s*live\s*tours\b/gi, "").replace(/[_-]?\s*letslivetours\b/gi, "").trim() : '';
            return clean ? <span style={{ fontSize: 13, color: "var(--ink3)" }}> · Curated by <strong style={{ color: "var(--ink)" }}>{clean}</strong></span> : null;
          })()}
        </div>

        <PackageGallery
          images={pkg.images || []}
          heroImage={pkg.heroImage}
          destinationImages={pkg.destinationImages || []}
          stayImages={pkg.stayImages || []}
          activityImages={pkg.activityImages || []}
          imageMap={pkg?.imageMap}
        />

        <div className="content-grid" style={{ display: "grid", gridTemplateColumns: pkg?.isGroupTour ? "1fr" : "1fr 380px", gap: 32, alignItems: "start" }}>
          <div>
            <PackageInfo pkg={pkg} />

            {/* ── CUSTOM ITINERARY TRIP PARTICULARS & OVERVIEW ── */}
            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid rgba(15, 23, 42, 0.08)",
              boxShadow: "0 10px 28px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
              padding: "20px 22px",
              marginBottom: 30,
            }}>
              {/* Header Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="syne" style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: "var(--cu-d)",
                    background: "rgba(194, 141, 84, 0.09)",
                    border: "1px solid rgba(194, 141, 84, 0.22)",
                    padding: "3px 10px",
                    borderRadius: 999,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4
                  }}>
                    ✦ PRIVATE DOSSIER
                  </span>
                  <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    {pkg.clientName ? `Curated for ${pkg.clientName}` : "Curated Trip Overview"}
                  </h3>
                </div>

                <span className="syne" style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--ink3)",
                  background: "var(--iv)",
                  padding: "4px 12px",
                  borderRadius: 50,
                  border: "1px solid var(--line2)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gn2)", display: "inline-block" }} />
                  Ref: #{String(pkg.slug || id).slice(-8).toUpperCase()}
                </span>
              </div>

              {/* 4-Column Sleek Ribbon */}
              <div className="itinerary-dossier-grid" style={{
                background: "linear-gradient(180deg, #fcfbf9 0%, #f7f8fa 100%)",
                borderRadius: "14px",
                border: "1px solid var(--line2)",
                overflow: "hidden"
              }}>
                {/* 1. Dates of Travel */}
                <div className="itinerary-dossier-col">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--cu-d)" }}>calendar_month</span>
                      <span className="syne" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--ink4)" }}>
                        Travel Dates
                      </span>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.35, wordBreak: "break-word" }}>
                      {pkg.travelDates?.startDate ? formatDateRange(pkg.travelDates.startDate, pkg.travelDates.endDate) : `${pkg.duration?.days || 0} Days Custom Journey`}
                    </div>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span className="syne" style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      background: "rgba(22, 163, 74, 0.08)",
                      color: "#15803d",
                      padding: "2px 8px",
                      borderRadius: 4,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 12 }}>schedule</span>
                      {pkg.duration?.nights || 0}N · {pkg.duration?.days || 0}D
                    </span>
                  </div>
                </div>

                {/* 2. Travellers & Configuration */}
                <div className="itinerary-dossier-col">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--gn3)" }}>group</span>
                      <span className="syne" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--ink4)" }}>
                        Party & Guests
                      </span>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.35 }}>
                      {pkg.travellerCount || `${pkg.adultCount || 1} Adult${(pkg.adultCount || 1) > 1 ? "s" : ""}${pkg.childCount ? `, ${pkg.childCount} Child${pkg.childCount > 1 ? "ren" : ""}` : ""}`}
                    </div>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 11.5, color: "var(--ink3)" }}>
                    Priced per <strong style={{ color: "var(--ink2)", textTransform: "capitalize" }}>{pkg.priceUnit || "person"}</strong>
                  </div>
                </div>

                {/* 3. Flights & Airfare Status */}
                <div className="itinerary-dossier-col">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 15, color: "#4f46e5" }}>flight_takeoff</span>
                      <span className="syne" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--ink4)" }}>
                        Airfare & Flights
                      </span>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: pkg.flightsIncluded ? "#4338ca" : "var(--ink)", lineHeight: 1.35 }}>
                      {pkg.flightsIncluded ? "Flights Included" : (pkg.flights?.length ? `${pkg.flights.length} Scheduled Flights` : "Self-Arranged")}
                    </div>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    {pkg.flightsIncluded ? (
                      <span className="syne" style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        background: "rgba(79, 70, 229, 0.08)",
                        color: "#4f46e5",
                        padding: "2px 8px",
                        borderRadius: 4,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3
                      }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 12 }}>verified</span>
                        Bundled in Price
                      </span>
                    ) : pkg.flightPrice ? (
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink2)" }}>
                        Airfare: ₹{pkg.flightPrice.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span style={{ fontSize: 11.5, color: "var(--ink3)" }}>
                        Direct Booking
                      </span>
                    )}
                  </div>
                </div>

                {/* 4. Hotel Class & Stays */}
                <div className="itinerary-dossier-col">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--gn2)" }}>hotel</span>
                      <span className="syne" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--ink4)" }}>
                        Accommodations
                      </span>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.35 }}>
                      {pkg.hotelRating || "Handpicked Stays"}
                    </div>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 11.5, color: "var(--ink3)" }}>
                    {pkg.stays?.length ? `${pkg.stays.length} Hotel / Resort Stay(s)` : "Included in Package"}
                  </div>
                </div>
              </div>
            </div>

            {/* ── FLIGHT & TRANSIT DETAILS SECTION ── */}
            {pkg.flights && pkg.flights.length > 0 ? (
              <div style={{
                background: "#ffffff",
                borderRadius: "20px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                padding: "20px 22px",
                boxShadow: "0 10px 28px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
                marginBottom: 30,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 20, color: "#4f46e5" }}>airplane_ticket</span>
                      <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                        Flight & Transit Schedule
                      </h3>
                    </div>
                    <p style={{ fontSize: 12.5, color: "var(--ink3)", margin: "4px 0 0 28px" }}>
                      Confirmed transit details, airlines, timings, and baggage allowance
                    </p>
                  </div>
                  <span className="syne" style={{
                    fontSize: 11, fontWeight: 700,
                    background: "rgba(79,70,229,.08)", color: "#4f46e5",
                    padding: "4px 12px", borderRadius: 50, border: "1px solid rgba(79,70,229,.2)"
                  }}>
                    {pkg.flights.length} Scheduled Leg{pkg.flights.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {pkg.flights.map((f: any, idx: number) => {
                    const isTrain = (f.type ?? "flight") === "train";
                    const flightDate = computeFlightDate(pkg.travelDates?.startDate, f.day || (idx + 1));
                    return (
                      <div
                        key={idx}
                        style={{
                          background: "var(--iv)",
                          border: "1px solid var(--line2)",
                          borderRadius: "14px",
                          padding: "16px 18px",
                          position: "relative",
                        }}
                      >
                        {/* Top pill bar */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span className="syne" style={{
                              fontSize: 11, fontWeight: 700,
                              background: isTrain ? "#ffedd5" : "#e0e7ff",
                              color: isTrain ? "#c2410c" : "#4338ca",
                              padding: "3px 10px", borderRadius: 6,
                              display: "inline-flex", alignItems: "center", gap: 4
                            }}>
                              <span className="material-symbols-rounded" style={{ fontSize: 13 }}>{isTrain ? "train" : "flight"}</span>
                              {f.airline || (isTrain ? "Train" : "Flight")} {f.flightNumber ? `• ${f.flightNumber}` : ""}
                            </span>
                            <span className="syne" style={{
                              fontSize: 11, fontWeight: 700,
                              background: "rgba(0,0,0,.05)", color: "var(--ink2)",
                              padding: "3px 10px", borderRadius: 6
                            }}>
                              Day {f.day || (idx + 1)}{flightDate ? ` · ${flightDate}` : ""}
                            </span>
                            {f.class && (
                              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink3)", background: "#fff", padding: "3px 8px", borderRadius: 6, border: "1px solid var(--line2)" }}>
                                {f.class}
                              </span>
                            )}
                          </div>
                          {f.pnr && (
                            <span className="syne" style={{
                              fontSize: 11, fontWeight: 700,
                              background: "rgba(16,185,129,.12)", color: "#065f46",
                              padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(16,185,129,.25)"
                            }}>
                              PNR: {f.pnr}
                            </span>
                          )}
                        </div>

                        {/* Route visual */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 16, background: "#fff", padding: "14px 18px", borderRadius: 10, border: "1px solid var(--line2)" }}>
                          {/* Departure */}
                          <div>
                            <div style={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, color: "var(--ink4)", letterSpacing: 0.5 }}>Departure</div>
                            <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginTop: 2 }}>
                              {f.departure || "Scheduled"}
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)", marginTop: 2 }}>
                              {f.from || "Origin Airport"}
                            </div>
                          </div>

                          {/* Center arrow */}
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 80 }}>
                            <span className="material-symbols-rounded" style={{ fontSize: 20, color: isTrain ? "#c2410c" : "#4338ca" }}>
                              {isTrain ? "trending_flat" : "flight_takeoff"}
                            </span>
                            <div style={{ height: 2, width: "100%", background: "var(--line)", position: "relative" }} />
                            <span style={{ fontSize: 10, color: "var(--ink4)", fontWeight: 600 }}>Transit Leg</span>
                          </div>

                          {/* Arrival */}
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, color: "var(--ink4)", letterSpacing: 0.5 }}>Arrival</div>
                            <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginTop: 2 }}>
                              {f.arrival || "Scheduled"}
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)", marginTop: 2 }}>
                              {f.to || "Destination Airport"}
                            </div>
                          </div>
                        </div>

                        {/* Notes / Baggage row */}
                        {f.notes && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12, color: "var(--ink3)" }}>
                            <span className="material-symbols-rounded" style={{ fontSize: 15, color: "var(--ink4)" }}>luggage</span>
                            <span>{f.notes}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : pkg.flightsIncluded ? (
              <div style={{
                background: "linear-gradient(135deg, rgba(79,70,229,.05), rgba(0,174,204,.06))",
                borderRadius: "var(--r-xl)",
                border: "1.5px solid rgba(79,70,229,.18)",
                padding: "20px 24px",
                marginBottom: 32,
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}>
                <span className="material-symbols-rounded" style={{ fontSize: 28, color: "#4338ca", flexShrink: 0, marginTop: 2 }}>flight</span>
                <div>
                  <h4 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    Round-Trip Flights Included in this Itinerary
                  </h4>
                  <p style={{ fontSize: 13, color: "var(--ink3)", margin: "4px 0 0", lineHeight: 1.55 }}>
                    Confirmed round-trip flight airfare is bundled into your custom package quote. Airline tickets, seat allocations, and boarding passes will be issued based on your travel dates upon booking confirmation.
                  </p>
                </div>
              </div>
            ) : null}

            {pkg?.isGroupTour && (
              <DepartureGrid
                departures={pkg?.departures || []}
                originalPrice={pkg?.originalPrice || pkg?.price}
                onSelectSlot={(depId) => {
                  router.push(`/book/${id}?departureId=${depId}`);
                }}
              />
            )}

            <PackageTabs
              pkg={pkg}
              selectedHotelOptions={selectedHotelOptions}
              onSelectHotelOption={handleSelectHotelOption}
            />
            <InclusionsExclusions inclusions={pkg.inclusions || []} exclusions={pkg.exclusions || []} isInternational={pkg.isInternational} visaIncluded={pkg.visaIncluded} flightsIncluded={pkg.flightsIncluded} trainsIncluded={pkg.trainsIncluded} />
            <PackageTrustPillars destinationName={pkg?.destination?.name} destinationSlug={pkg?.destination?.slug} />
            <KnowBeforeYouGo items={pkg.knowBeforeYouGo || []} />
            <ThingsToCarry items={pkg.thingsToCarry || []} />
          </div>
          
          {!pkg?.isGroupTour && (
            <div style={{ position: "sticky", top: 84 }}>
              {/* Simplified price card for custom itinerary */}
              <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1.5px solid var(--line)", padding: 24, boxShadow: "var(--sh)" }}>
                <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 4 }}>
                  {pkg.duration?.nights}N / {pkg.duration?.days}D • {pkg.hotelRating || ""}
                </div>
                <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--gn)", marginBottom: 4 }}>
                  ₹{effectivePrice.toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink3)", marginBottom: 16 }}>
                  per {pkg.priceUnit || 'person'} (estimated)
                </div>

                {/* Date of Travel & Travellers Summary in Sidebar */}
                {pkg.travelDates?.startDate && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--iv)", borderRadius: "var(--r)", marginBottom: 10, border: "1px solid var(--line)" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--cu-d)", flexShrink: 0 }}>calendar_month</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, color: "var(--ink4)", letterSpacing: 0.5 }}>Date of Travel</div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {new Date(pkg.travelDates.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        {pkg.travelDates.endDate ? ` – ${new Date(pkg.travelDates.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : ""}
                      </div>
                    </div>
                  </div>
                )}
                {(pkg.travellerCount || pkg.adultCount) && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--iv)", borderRadius: "var(--r)", marginBottom: 14, border: "1px solid var(--line)" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn3)", flexShrink: 0 }}>group</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, color: "var(--ink4)", letterSpacing: 0.5 }}>Travellers</div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>
                        {pkg.travellerCount || `${pkg.adultCount || 1} Adult${(pkg.adultCount || 1) > 1 ? "s" : ""}${pkg.childCount ? `, ${pkg.childCount} Child${pkg.childCount > 1 ? "ren" : ""}` : ""}`}
                      </div>
                    </div>
                  </div>
                )}

                {hotelUpgradePerPax > 0 && (
                  <div
                    className="syne"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11,
                      fontWeight: 700,
                      background: "rgba(245,166,35,.15)",
                      color: "var(--cu-d)",
                      padding: "4px 12px",
                      borderRadius: 50,
                      marginBottom: 16,
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 13 }}>hotel</span>
                    Includes +₹{hotelUpgradePerPax.toLocaleString()} hotel upgrade
                  </div>
                )}
                <div style={{ marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {pkg.isInternational && (
                    <span className="syne" style={{
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                      padding: "4px 10px", borderRadius: 50, display: "inline-flex", alignItems: "center", gap: 4,
                      background: pkg.visaIncluded ? "var(--gn-gl)" : "var(--iv2)",
                      color: pkg.visaIncluded ? "var(--gn)" : "var(--ink3)",
                    }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 12 }}>{pkg.visaIncluded ? "check_circle" : "info"}</span>
                      {pkg.visaIncluded ? "Visa Included" : "Visa Not Included"}
                    </span>
                  )}
                  {pkg.flightsIncluded !== undefined && (
                    <span className="syne" style={{
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                      padding: "4px 10px", borderRadius: 50, display: "inline-flex", alignItems: "center", gap: 4,
                      background: pkg.flightsIncluded ? "var(--gn-gl)" : "var(--iv2)",
                      color: pkg.flightsIncluded ? "var(--gn)" : "var(--ink3)",
                    }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 12 }}>{pkg.flightsIncluded ? "flight" : "flight"}</span>
                      {pkg.flightsIncluded ? "Flights Included" : "Flights Not Included"}
                    </span>
                  )}
                  {/* Trains: for international packages or when hideTrainInfo is set, only show when actually included */}
                  {(!pkg.hideTrainInfo && (pkg.isInternational ? pkg.trainsIncluded : pkg.trainsIncluded !== undefined)) && (
                    <span className="syne" style={{
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                      padding: "4px 10px", borderRadius: 50, display: "inline-flex", alignItems: "center", gap: 4,
                      background: pkg.trainsIncluded ? "var(--gn-gl)" : "var(--iv2)",
                      color: pkg.trainsIncluded ? "var(--gn)" : "var(--ink3)",
                    }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 12 }}>train</span>
                      {pkg.trainsIncluded ? "Trains Included" : "Trains Not Included"}
                    </span>
                  )}
                </div>
                {isBooked ? (
                  <button disabled className="syne" style={{ display: "block", width: "100%", textAlign: "center", padding: 14, background: "var(--line2)", color: "var(--ink3)", borderRadius: 50, fontSize: 14, fontWeight: 700, border: "none", cursor: "not-allowed" }}>
                    Your package is already booked
                  </button>
                ) : (
                  <>
                    <Link href={`/book/${id}`} className="syne" style={{ display: "block", width: "100%", textAlign: "center", padding: 14, background: "var(--cu)", color: "#fff", borderRadius: 50, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                      Confirm This Itinerary
                    </Link>
                    <p style={{ fontSize: 11, color: "var(--ink4)", textAlign: "center", marginTop: 12 }}>
                      Clicking confirm will start the booking process for this custom itinerary.
                    </p>
                  </>
                )}
              </div>
              {/* Enquiry form for questions/modifications */}
              <div style={{ marginTop: 20 }}>
                <EnquiryForm packageName={pkg.name} packageId={pkg._id} destinationName={pkg?.destination?.name || pkg?.customDestinationText || (typeof pkg?.destination === 'string' ? pkg.destination : '')} isGroupTour={pkg?.isGroupTour} departures={pkg?.departures} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <style jsx>{`
        @media (max-width: 900px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
