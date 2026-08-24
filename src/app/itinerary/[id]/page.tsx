"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageGallery from "@/components/package-detail/PackageGallery";
import PackageInfo from "@/components/package-detail/PackageInfo";
import PackageTabs from "@/components/package-detail/PackageTabs";
import InclusionsExclusions from "@/components/package-detail/InclusionsExclusions";
import KnowBeforeYouGo from "@/components/package-detail/KnowBeforeYouGo";
import ThingsToCarry from "@/components/package-detail/ThingsToCarry";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import DepartureGrid from "@/components/package-detail/DepartureGrid";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function CustomItineraryPage() {
  const params = useParams();
  const id = params?.id as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);

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
            <span style={{ fontSize: 13, color: "var(--ink3)" }}>Prepared for <strong>{pkg.clientName}</strong></span>
          )}
        </div>

        <PackageGallery
          images={pkg.images || []}
          heroImage={pkg.heroImage}
          destinationImages={pkg.destinationImages || []}
          stayImages={pkg.stayImages || []}
          activityImages={pkg.activityImages || []}
        />

        <div className="content-grid" style={{ display: "grid", gridTemplateColumns: pkg?.isGroupTour ? "1fr" : "1fr 380px", gap: 32, alignItems: "start" }}>
          <div>
            <PackageInfo pkg={pkg} />

            {pkg?.isGroupTour && (
              <DepartureGrid
                departures={pkg?.departures || []}
                originalPrice={pkg?.originalPrice || pkg?.price}
                onSelectSlot={(depId) => {
                  window.location.href = `/book/${id}?departureId=${depId}`;
                }}
              />
            )}

            <PackageTabs pkg={pkg} />
            <InclusionsExclusions inclusions={pkg.inclusions || []} exclusions={pkg.exclusions || []} isInternational={pkg.isInternational} visaIncluded={pkg.visaIncluded} />
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
                  ₹{(pkg.price || 0).toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink3)", marginBottom: 20 }}>per {pkg.priceUnit || 'person'} (estimated)</div>
                {isBooked ? (
                  <button disabled className="syne" style={{ display: "block", width: "100%", textAlign: "center", padding: 14, background: "var(--line2)", color: "var(--ink3)", borderRadius: 50, fontSize: 14, fontWeight: 700, border: "none", cursor: "not-allowed" }}>
                    Your package is already booked
                  </button>
                ) : (
                  <>
                    <a href={`/book/${id}`} className="syne" style={{ display: "block", width: "100%", textAlign: "center", padding: 14, background: "var(--cu)", color: "#fff", borderRadius: 50, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                      Confirm This Itinerary
                    </a>
                    <p style={{ fontSize: 11, color: "var(--ink4)", textAlign: "center", marginTop: 12 }}>
                      Clicking confirm will start the booking process for this custom itinerary.
                    </p>
                  </>
                )}
              </div>
              {/* Enquiry form for questions/modifications */}
              <div style={{ marginTop: 20 }}>
                <EnquiryForm packageName={pkg.name} packageId={pkg._id} isGroupTour={pkg?.isGroupTour} departures={pkg?.departures} />
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
