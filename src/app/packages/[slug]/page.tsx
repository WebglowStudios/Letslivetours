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
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "88px 24px 60px",
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
            gridTemplateColumns: "1fr 380px",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <div>
            <PackageInfo pkg={pkg} />
            <PackageTabs pkg={pkg} />
            <InclusionsExclusions inclusions={pkg?.inclusions || []} exclusions={pkg?.exclusions || []} />
            <KnowBeforeYouGo items={pkg?.knowBeforeYouGo || []} />
            <ThingsToCarry items={pkg?.thingsToCarry || []} />
          </div>

          {/* Right Column (Sticky) */}
          <div style={{ position: "sticky", top: 84 }}>
            <PriceCard pkg={pkg} slug={slug} />
            <EnquiryForm packageName={packageName} />
          </div>
        </div>

        {/* Reviews */}
        <Reviews packageId={pkg?._id} />
      </div>

      <Footer />
      <ScrollToTop />
    </>
  );
}
