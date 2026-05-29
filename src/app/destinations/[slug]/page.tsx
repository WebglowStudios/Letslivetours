"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import DetailHero from "@/components/destination-detail/DetailHero";
import FilterBar from "@/components/destination-detail/FilterBar";
import PackageRow from "@/components/destination-detail/PackageRow";
import Highlights from "@/components/destination-detail/Highlights";
import GroupDeal from "@/components/destination-detail/GroupDeal";
import WhyDubai from "@/components/destination-detail/WhyDubai";
import TravelTips from "@/components/destination-detail/TravelTips";
import DetailPartners from "@/components/destination-detail/DetailPartners";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

/* ─── Fallback hardcoded cards (used if API returns nothing) ─── */
const fallbackHandpickedCards = [
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Bestseller", badgeCls: "bestseller", name: "Dubai Luxury Escape — Burj Khalifa & Desert Safari", duration: "7N / 8D", hotel: "5-Star", stars: "★★★★★", reviews: "4.9 · 312 reviews", origPrice: "₹1,74,999", price: "₹1,24,999", perUnit: "/person", type: "luxury" },
  { img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80", badge: "Hot Deal", badgeCls: "hot", name: "Desert Dunes & Dune Bashing Adventure Package", duration: "5N / 6D", hotel: "4-Star", stars: "★★★★★", reviews: "4.8 · 198 reviews", origPrice: "₹99,999", price: "₹74,999", perUnit: "/person", type: "adventure" },
  { img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80", badge: "New", badgeCls: "new", name: "Dubai Marina & Palm Jumeirah Luxury Stay", duration: "6N / 7D", hotel: "5-Star", stars: "★★★★★", reviews: "4.9 · 245 reviews", origPrice: "₹1,49,999", price: "₹1,09,999", perUnit: "/person", type: "luxury" },
  { img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", badge: "Bestseller", badgeCls: "bestseller", name: "Dubai City Highlights — Group Tour Special", duration: "4N / 5D", hotel: "4-Star", stars: "★★★★☆", reviews: "4.7 · 421 reviews", origPrice: "₹79,999", price: "₹59,999", perUnit: "/person", type: "group" },
  { img: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&q=80", badge: "Hot Deal", badgeCls: "hot", name: "Burj Al Arab Experience — Ultra Luxury Getaway", duration: "3N / 4D", hotel: "7-Star", stars: "★★★★★", reviews: "5.0 · 87 reviews", origPrice: "₹2,49,999", price: "₹1,99,999", perUnit: "/person", type: "luxury" },
];

const fallbackHoneymoonCards = [
  { img: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&q=80", badge: "Honeymoon Special", badgeCls: "honeymoon", name: "Romantic Dubai — Burj Al Arab & Sunset Cruise", duration: "6N / 7D", hotel: "5-Star", stars: "★★★★★", reviews: "4.9 · 178 reviews", origPrice: "₹1,89,999", price: "₹1,39,999", perUnit: "/couple", type: "honeymoon" },
  { img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80", badge: "Honeymoon Special", badgeCls: "honeymoon", name: "Dubai Marina Bliss — Private Yacht & Spa Retreat", duration: "5N / 6D", hotel: "5-Star", stars: "★★★★★", reviews: "4.8 · 134 reviews", origPrice: "₹1,59,999", price: "₹1,19,999", perUnit: "/couple", type: "honeymoon" },
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Honeymoon Special", badgeCls: "honeymoon", name: "Skyline Romance — At the Top & Desert Stargazing", duration: "4N / 5D", hotel: "5-Star", stars: "★★★★★", reviews: "4.9 · 96 reviews", origPrice: "₹1,29,999", price: "₹94,999", perUnit: "/couple", type: "honeymoon" },
  { img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", badge: "Honeymoon Special", badgeCls: "honeymoon", name: "Ultimate Dubai Honeymoon — 7 Nights All Inclusive", duration: "7N / 8D", hotel: "5-Star", stars: "★★★★★", reviews: "5.0 · 62 reviews", origPrice: "₹2,19,999", price: "₹1,69,999", perUnit: "/couple", type: "honeymoon" },
];

const fallbackFamilyCards = [
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Family Friendly", badgeCls: "family", name: "Dubai Family Fun — Aquaventure, IMG & City Tour", duration: "6N / 7D", hotel: "4-Star", stars: "★★★★★", reviews: "4.8 · 267 reviews", origPrice: "₹2,49,999", price: "₹1,89,999", perUnit: "/family", type: "family" },
  { img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", badge: "Family Friendly", badgeCls: "family", name: "Kids' Dubai Adventure — Theme Parks & Desert Camp", duration: "5N / 6D", hotel: "4-Star", stars: "★★★★★", reviews: "4.9 · 189 reviews", origPrice: "₹1,99,999", price: "₹1,54,999", perUnit: "/family", type: "family" },
  { img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80", badge: "Bestseller", badgeCls: "bestseller", name: "Dubai Family Luxury — Atlantis Stay & Water Park", duration: "7N / 8D", hotel: "5-Star", stars: "★★★★★", reviews: "4.9 · 312 reviews", origPrice: "₹3,49,999", price: "₹2,79,999", perUnit: "/family", type: "family" },
  { img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80", badge: "Family Friendly", badgeCls: "family", name: "Desert & City Family Combo — Camel Ride Included", duration: "4N / 5D", hotel: "4-Star", stars: "★★★★☆", reviews: "4.7 · 143 reviews", origPrice: "₹1,49,999", price: "₹1,14,999", perUnit: "/family", type: "family" },
];

/* ─── Helpers ─── */
const formatPrice = (price: number) =>
  "₹" + new Intl.NumberFormat("en-IN").format(price);

const generateStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "★" : "") + "☆".repeat(empty);
};

const mapBadgeCls = (badge?: string) => {
  if (!badge) return "bestseller";
  const lower = badge.toLowerCase().replace(/\s/g, "");
  if (lower.includes("hot")) return "hot";
  if (lower.includes("new")) return "new";
  if (lower.includes("honeymoon")) return "honeymoon";
  if (lower.includes("family")) return "family";
  return "bestseller";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapPackageToCard = (pkg: any) => ({
  img: pkg.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  badge: pkg.badge || "Popular",
  badgeCls: mapBadgeCls(pkg.badge),
  name: pkg.name,
  slug: pkg.slug || "",
  duration: `${pkg.duration?.nights || 0}N / ${pkg.duration?.days || 0}D`,
  hotel: pkg.hotelRating || "4-Star",
  stars: generateStars(pkg.rating || 0),
  reviews: `${pkg.rating || 0} · ${pkg.reviewCount || 0} reviews`,
  origPrice: pkg.originalPrice ? formatPrice(pkg.originalPrice) : formatPrice(pkg.price + 20000),
  price: formatPrice(pkg.price),
  perUnit: `/${pkg.priceUnit || "person"}`,
  type: pkg.category || "luxury",
});

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [destination, setDestination] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [packages, setPackages] = useState<any[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [destRes, pkgRes] = await Promise.all([
          api.get(`/destinations/${slug}`),
          api.get(`/packages/destination/${slug}`),
        ]);

        if (destRes.status === "success" && destRes.data) {
          setDestination(destRes.data);
        } else {
          setNotFound(true);
          return;
        }

        if (pkgRes.status === "success" && pkgRes.data) {
          setPackages(pkgRes.data);
        }
      } catch {
        // If API fails, we'll use fallback data
        setNotFound(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  /* ─── Loading state ─── */
  if (loading) {
    return (
      <>
        <ProgressBar />
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column", gap: 16 }}>
          <div style={{ width: 48, height: 48, border: "4px solid var(--line2)", borderTopColor: "var(--cu)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p className="syne" style={{ fontSize: 14, color: "var(--ink3)" }}>Loading destination...</p>
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
          <span className="material-symbols-rounded" style={{ fontSize: 64, color: "var(--ink4)" }}>explore_off</span>
          <h2 className="serif" style={{ fontSize: 28, color: "var(--ink)" }}>Destination not found</h2>
          <p style={{ fontSize: 15, color: "var(--ink3)" }}>The destination you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <a href="/destinations" className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", background: "var(--gn)", padding: "12px 28px", borderRadius: 50, textDecoration: "none" }}>
            ← Back to Destinations
          </a>
        </div>
        <Footer />
      </>
    );
  }

  /* ─── Map fetched packages to card format ─── */
  const mappedCards = packages.length > 0 ? packages.map(mapPackageToCard) : [];

  // Split by category for the different rows, or use fallback
  const handpickedCards = mappedCards.length > 0 ? mappedCards : fallbackHandpickedCards;
  const honeymoonCards = mappedCards.length > 0
    ? mappedCards.filter((c) => c.type === "honeymoon")
    : fallbackHoneymoonCards;
  const familyCards = mappedCards.length > 0
    ? mappedCards.filter((c) => c.type === "family")
    : fallbackFamilyCards;

  const filterCards = (cards: typeof handpickedCards) => {
    if (activeFilter === "all") return cards;
    return cards.filter((c) => c.type === activeFilter);
  };

  const destinationName = destination?.name || "Dubai";

  return (
    <>
      <ProgressBar />
      <Navbar />
      <DetailHero destinationName={destinationName} />

      {/* Marquee */}
      <div style={{ background: "var(--gn)", overflow: "hidden", padding: "14px 0" }}>
        <div style={{ display: "flex", width: "max-content", animation: "mq 38s linear infinite" }}>
          {(destination?.highlights?.length > 0
            ? [...destination.highlights, ...destination.highlights]
            : ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah", "Dubai Creek", "Gold Souk", "Atlantis Resort", "Dubai Frame", "Miracle Garden", "Burj Al Arab", "Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah", "Dubai Creek", "Gold Souk", "Atlantis Resort", "Dubai Frame", "Miracle Garden", "Burj Al Arab"]
          ).map((item, i) => (
            <div key={i} className="syne" style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 38px", fontSize: 11.5, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(249,246,240,.5)", whiteSpace: "nowrap" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cu)" }} />{item}
            </div>
          ))}
        </div>
      </div>

      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <PackageRow
        eyebrow="Staff Picks"
        title="Handpicked"
        titleEm="Packages"
        subtitle={`Curated by our ${destinationName} travel experts — the best experiences at unbeatable prices.`}
        cards={filterCards(handpickedCards)}
      />

      <Highlights />

      <PackageRow
        eyebrow="Romance Awaits"
        title="Honeymoon"
        titleEm="Packages"
        subtitle="Crafted for couples — intimate escapes with luxury stays and unforgettable moments."
        cards={filterCards(honeymoonCards.length > 0 ? honeymoonCards : fallbackHoneymoonCards)}
        alt
      />

      <GroupDeal />

      <PackageRow
        eyebrow="For the Whole Family"
        title="Family"
        titleEm="Tours"
        subtitle="Kid-friendly adventures and family memories that last a lifetime — all stress-free."
        cards={filterCards(familyCards.length > 0 ? familyCards : fallbackFamilyCards)}
      />

      <WhyDubai />
      <TravelTips />
      <DetailPartners />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
