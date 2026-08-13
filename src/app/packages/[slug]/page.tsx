"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import PackageGallery from "@/components/package-detail/PackageGallery";
import PackageInfo from "@/components/package-detail/PackageInfo";
import PackageTabs from "@/components/package-detail/PackageTabs";
import InclusionsExclusions from "@/components/package-detail/InclusionsExclusions";
import KnowBeforeYouGo from "@/components/package-detail/KnowBeforeYouGo";
import ThingsToCarry from "@/components/package-detail/ThingsToCarry";
import PriceCard from "@/components/package-detail/PriceCard";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import Reviews from "@/components/package-detail/Reviews";
import DepartureGrid from "@/components/package-detail/DepartureGrid";

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pkg, setPkg] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPackage = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/packages/${slug}`);

        if (res.status === "success" && res.data) {
          setPkg(res.data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [slug]);

  /* ─── Loading state ─── */
  if (loading) {
    return (
      <>
        <ProgressBar />
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column", gap: 16 }}>
          <div style={{ width: 48, height: 48, border: "4px solid var(--line2)", borderTopColor: "var(--cu)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p className="syne" style={{ fontSize: 14, color: "var(--ink3)" }}>Loading package...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </>
    );
  }

  /* ─── Not found state ─── */
  if (notFound) {
    return (
      <>
        <ProgressBar />
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column", gap: 20 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 64, color: "var(--ink4)" }}>package_2</span>
          <h2 className="serif" style={{ fontSize: 28, color: "var(--ink)" }}>Package not found</h2>
          <p style={{ fontSize: 15, color: "var(--ink3)" }}>The package you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <a href="/destinations" className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", background: "var(--gn)", padding: "12px 28px", borderRadius: 50, textDecoration: "none" }}>
            ← Back to Destinations
          </a>
        </div>
        <Footer />
      </>
    );
  }

  /* ─── Derive display values from fetched data ─── */
  const packageName = pkg?.name || "Dubai Luxury Escape";
  const destinationName = pkg?.destination?.name || "Dubai";
  const destinationSlug = pkg?.destination?.slug || "dubai";

  return (
    <>
      <ProgressBar />
      <Navbar />
      <ScrollReveal />

      <div
        className="pkg-page-wrap"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "88px 24px 60px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* Breadcrumb */}
        <div
          className="syne"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 500,
            color: "var(--ink4)",
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <a href="/" style={{ color: "var(--ink3)", transition: "var(--tr)" }}>Home</a>
          <span style={{ color: "var(--line2)" }}>›</span>
          <a href="/destinations" style={{ color: "var(--ink3)", transition: "var(--tr)" }}>Destinations</a>
          <span style={{ color: "var(--line2)" }}>›</span>
          <a href={`/destinations/${destinationSlug}`} style={{ color: "var(--ink3)", transition: "var(--tr)" }}>{destinationName}</a>
          <span style={{ color: "var(--line2)" }}>›</span>
          <span style={{ color: "var(--gn)", fontWeight: 600 }}>{packageName}</span>
        </div>

        {/* Gallery */}
        <PackageGallery
          images={pkg?.images || []}
          heroImage={pkg?.heroImage}
          destinationImages={pkg?.destinationImages || []}
          stayImages={pkg?.stayImages || []}
          activityImages={pkg?.activityImages || []}
        />

        {/* Content Grid */}
        <div
          className="content-grid"
          style={{
            display: "grid",
            gridTemplateColumns: pkg?.isGroupTour ? "1fr" : "1fr 380px",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <div>
            <PackageInfo pkg={pkg} />
            
            {pkg?.isGroupTour && (
              <DepartureGrid
                departures={pkg?.departures || []}
                originalPrice={pkg?.originalPrice || pkg?.price}
                onSelectSlot={(depId) => {
                  window.location.href = `/book/${slug}?departureId=${depId}`;
                }}
              />
            )}
            
            <PackageTabs pkg={pkg} />
            <InclusionsExclusions inclusions={pkg?.inclusions || []} exclusions={pkg?.exclusions || []} />
            <KnowBeforeYouGo items={pkg?.knowBeforeYouGo || []} />
            <ThingsToCarry items={pkg?.thingsToCarry || []} />
          </div>

          {/* Right Column (Sticky) */}
          {!pkg?.isGroupTour && (
            <div style={{ position: "sticky", top: 84 }}>
              <PriceCard pkg={pkg} slug={slug} />
              <EnquiryForm packageName={packageName} packageId={pkg?._id} isGroupTour={pkg?.isGroupTour} departures={pkg?.departures} />
            </div>
          )}
        </div>

        {/* Reviews */}
        <Reviews packageId={pkg?._id} />
      </div>

      <Footer />
      <ScrollToTop />

      {/* Mobile sticky booking bar */}
      <div className="mobile-cta-bar">
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", fontFamily: "var(--font-jakarta),'Plus Jakarta Sans',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Per Adult</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "var(--font-sora),'Sora',sans-serif", lineHeight: 1 }}>
            {pkg?.price ? "₹" + pkg.price.toLocaleString("en-IN") : "Get Price"}
          </div>
        </div>
        <button
          onClick={() => {
            if (pkg?.isGroupTour) {
              const grid = document.querySelector(".departure-grid-container");
              if (grid) grid.scrollIntoView({ behavior: "smooth" });
            } else {
              document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--gn)",
            background: "#fff",
            padding: "12px 28px",
            borderRadius: 50,
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-jakarta),'Plus Jakarta Sans',sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          Send Enquiry
        </button>
      </div>

      <style>{`
        .mobile-cta-bar {
          display: none;
        }
        @media (max-width: 900px) {
          .mobile-cta-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 200;
            background: var(--gn);
            padding: 14px 20px;
            box-shadow: 0 -4px 24px rgba(0,77,94,.2);
            padding-bottom: max(14px, env(safe-area-inset-bottom));
          }
        }
        @media (max-width: 900px) {
          /* Add bottom padding so content isn't hidden behind the sticky bar */
          main, #__next > div {
            padding-bottom: 80px;
          }
        }
      `}</style>
    </>
  );
}
