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
import PriceCard from "@/components/package-detail/PriceCard";
import EnquiryForm from "@/components/package-detail/EnquiryForm";
import Reviews from "@/components/package-detail/Reviews";

export const metadata = {
  title: "Dubai Luxury Escape — LetsLive Tours",
  description:
    "7 Nights / 8 Days luxury Dubai package including Burj Khalifa, Desert Safari, Palm Jumeirah, and 5-star hotel stays.",
};

export default function PackageDetailPage() {
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
          }}
        >
          <a href="/" style={{ color: "var(--ink3)", transition: "var(--tr)" }}>Home</a>
          <span style={{ color: "var(--line2)" }}>›</span>
          <a href="/destinations" style={{ color: "var(--ink3)", transition: "var(--tr)" }}>Destinations</a>
          <span style={{ color: "var(--line2)" }}>›</span>
          <a href="/destinations/dubai" style={{ color: "var(--ink3)", transition: "var(--tr)" }}>Dubai</a>
          <span style={{ color: "var(--line2)" }}>›</span>
          <span style={{ color: "var(--gn)", fontWeight: 600 }}>Dubai Luxury Escape</span>
        </div>

        {/* Gallery */}
        <PackageGallery />

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
            <PackageInfo />
            <PackageTabs />
            <InclusionsExclusions />
            <KnowBeforeYouGo />
          </div>

          {/* Right Column (Sticky) */}
          <div style={{ position: "sticky", top: 84 }}>
            <PriceCard />
            <EnquiryForm />
          </div>
        </div>

        {/* Reviews */}
        <Reviews />
      </div>

      <Footer />
      <ScrollToTop />
    </>
  );
}
