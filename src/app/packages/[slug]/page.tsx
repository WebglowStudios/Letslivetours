"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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
import PackageTrustPillars from "@/components/package-detail/PackageTrustPillars";
import KnowBeforeYouGo from "@/components/package-detail/KnowBeforeYouGo";
import ThingsToCarry from "@/components/package-detail/ThingsToCarry";
import PriceCard from "@/components/package-detail/PriceCard";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import Reviews from "@/components/package-detail/Reviews";
import DepartureGrid from "@/components/package-detail/DepartureGrid";

export default function PackageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pkg, setPkg] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedHotelOptions, setSelectedHotelOptions] = useState<Record<number, string>>({});

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

  // Persist to sessionStorage for seamless transfer into booking checkout
  useEffect(() => {
    if (pkg?._id && selectedHotelOptionsPayload.length > 0) {
      try {
        sessionStorage.setItem(`selectedHotelOptions_${pkg._id}`, JSON.stringify(selectedHotelOptionsPayload));
        if (slug) {
          sessionStorage.setItem(`selectedHotelOptions_${slug}`, JSON.stringify(selectedHotelOptionsPayload));
        }
      } catch (e) {
        console.error("Failed to store selected hotel options", e);
      }
    }
  }, [pkg, slug, selectedHotelOptionsPayload]);

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
          <Link href="/destinations" className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", background: "var(--gn)", padding: "12px 28px", borderRadius: 50, textDecoration: "none" }}>
            ← Back to Destinations
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  /* ─── Derive display values from fetched data ─── */
  const packageName = pkg?.name || "Tour Package";
  const destinationName = pkg?.destination?.name || pkg?.customDestinationText || (typeof pkg?.destination === "string" ? pkg?.destination : "") || "";
  const destinationSlug = pkg?.destination?.slug || (destinationName ? destinationName.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "");

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
          minWidth: 0,
          overflowX: "hidden",
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
          <Link href="/" style={{ color: "var(--ink3)", textDecoration: "none", transition: "var(--tr)" }}>Home</Link>
          <span style={{ color: "var(--line2)" }}>›</span>
          <Link href="/destinations" style={{ color: "var(--ink3)", textDecoration: "none", transition: "var(--tr)" }}>Destinations</Link>
          <span style={{ color: "var(--line2)" }}>›</span>
          <Link href={`/destinations/${destinationSlug}`} style={{ color: "var(--ink3)", textDecoration: "none", transition: "var(--tr)" }}>{destinationName}</Link>
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
          imageMap={pkg?.imageMap}
        />

        {/* Content Grid */}
        <div
          className="content-grid"
          style={{
            display: "grid",
            gridTemplateColumns: pkg?.isGroupTour ? "minmax(0, 1fr)" : "minmax(0, 1fr) 380px",
            gap: 32,
            alignItems: "start",
            minWidth: 0,
            maxWidth: "100%",
            width: "100%",
          }}
        >
          {/* Left Column */}
          <div style={{ minWidth: 0, maxWidth: "100%", width: "100%", overflowX: "hidden" }}>
            <PackageInfo pkg={pkg} />
            
            {pkg?.isGroupTour && (
              <DepartureGrid
                departures={pkg?.departures || []}
                originalPrice={pkg?.originalPrice || pkg?.price}
                onSelectSlot={(depId) => {
                  router.push(`/book/${slug}?departureId=${depId}`);
                }}
              />
            )}
            
            <PackageTabs
              pkg={pkg}
              selectedHotelOptions={selectedHotelOptions}
              onSelectHotelOption={handleSelectHotelOption}
            />
            <InclusionsExclusions inclusions={pkg?.inclusions || []} exclusions={pkg?.exclusions || []} isInternational={pkg?.isInternational} visaIncluded={pkg?.visaIncluded} flightsIncluded={pkg?.flightsIncluded} trainsIncluded={pkg?.trainsIncluded} />
            <PackageTrustPillars destinationName={destinationName} destinationSlug={destinationSlug} />
            <KnowBeforeYouGo items={pkg?.knowBeforeYouGo || []} />
            <ThingsToCarry items={pkg?.thingsToCarry || []} />
          </div>

          {/* Right Column (Sticky) */}
          {!pkg?.isGroupTour && (
            <div style={{ position: "sticky", top: 84 }}>
              <PriceCard
                pkg={pkg}
                slug={slug}
                effectivePrice={effectivePrice}
                hotelUpgradePerPax={hotelUpgradePerPax}
              />
              <EnquiryForm packageName={packageName} packageId={pkg?._id} destinationName={destinationName} isGroupTour={pkg?.isGroupTour} departures={pkg?.departures} />
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
            {effectivePrice ? "₹" + effectivePrice.toLocaleString("en-IN") : "Get Price"}
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
          .pkg-page-wrap {
            padding-left: 16px !important;
            padding-right: 16px !important;
            overflow-x: hidden !important;
          }
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
          .content-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .content-grid > div {
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            overflow-x: hidden !important;
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
