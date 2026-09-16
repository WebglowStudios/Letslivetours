"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialCategory?: string;
  destinationContext?: { slug: string; name: string };
}

interface PackageItem {
  _id: string;
  name: string;
  slug: string;
  heroImage?: string;
  images?: string[];
  price: number;
  priceUnit?: string;
  duration?: { nights: number; days: number };
  rating?: number;
  badge?: string;
  hotelRating?: string;
  category?: string;
  destination?: { _id: string; name: string; slug: string; country?: string };
}

interface DestinationItem {
  _id: string;
  name: string;
  slug: string;
  heroImage?: string;
  images?: string[];
  region?: string;
  country?: string;
  startingPrice?: number;
  packageCount?: number;
  description?: string;
}

const CATEGORIES = [
  { id: "all", label: "All Themes", icon: "explore" },
  { id: "honeymoon", label: "Honeymoon", icon: "favorite" },
  { id: "family", label: "Family", icon: "family_restroom" },
  { id: "luxury", label: "Luxury", icon: "diamond" },
  { id: "adventure", label: "Adventure", icon: "hiking" },
  { id: "group", label: "Group Tours", icon: "groups" },
];

const PRICE_RANGES = [
  { id: "all", label: "Any Budget", min: undefined, max: undefined },
  { id: "under50k", label: "< ₹50,000", min: undefined, max: 50000 },
  { id: "50k-120k", label: "₹50k – ₹1.2L", min: 50000, max: 120000 },
  { id: "120k-250k", label: "₹1.2L – ₹2.5L", min: 120000, max: 250000 },
  { id: "above250k", label: "₹2.5L+", min: 250000, max: undefined },
];

const TRENDING_SEARCHES = [
  { label: "Dubai", type: "destination", query: "Dubai" },
  { label: "Bali Bliss", type: "package", query: "Bali" },
  { label: "Japan Sakura", type: "package", query: "Japan" },
  { label: "Maldives Luxury", type: "package", query: "Maldives" },
  { label: "Kashmir Paradise", type: "destination", query: "Kashmir" },
  { label: "Switzerland", type: "destination", query: "Switzerland" },
  { label: "Honeymoon Specials", type: "category", query: "honeymoon" },
];

export default function SearchModal({
  isOpen,
  onClose,
  initialQuery = "",
  initialCategory = "all",
  destinationContext,
}: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "packages" | "destinations">("all");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [isFilterSubModalOpen, setIsFilterSubModalOpen] = useState(false);

  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen) {
      if (initialQuery) setQuery(initialQuery);
      if (initialCategory) setSelectedCategory(initialCategory);
      // Auto-focus input
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialQuery, initialCategory]);

  // ESC hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Fetch search results (debounced)
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const priceConfig = PRICE_RANGES.find((p) => p.id === selectedPriceRange);

        // Prepare package params
        const pkgParams = new URLSearchParams();
        if (query.trim()) pkgParams.set("search", query.trim());
        if (selectedCategory && selectedCategory !== "all") pkgParams.set("category", selectedCategory);
        if (priceConfig?.min !== undefined) pkgParams.set("minPrice", String(priceConfig.min));
        if (priceConfig?.max !== undefined) pkgParams.set("maxPrice", String(priceConfig.max));
        if (destinationContext?.slug) pkgParams.set("destination", destinationContext.slug);
        pkgParams.set("limit", "16");

        // Prepare destination params
        const destParams = new URLSearchParams();
        if (query.trim()) destParams.set("search", query.trim());
        if (selectedCategory && selectedCategory !== "all") destParams.set("category", selectedCategory);
        destParams.set("limit", "10");

        const [pkgRes, destRes] = await Promise.all([
          api.get(`/packages?${pkgParams.toString()}`),
          api.get(`/destinations?${destParams.toString()}`),
        ]);

        if (pkgRes?.data && Array.isArray(pkgRes.data)) {
          setPackages(pkgRes.data);
        } else {
          setPackages([]);
        }

        if (destRes?.data && Array.isArray(destRes.data)) {
          setDestinations(destRes.data);
        } else {
          setDestinations([]);
        }
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [query, selectedCategory, selectedPriceRange, destinationContext, isOpen]);

  const handleSelectPackage = (slug: string) => {
    onClose();
    router.push(`/packages/${slug}`);
  };

  const handleSelectDestination = (slug: string) => {
    onClose();
    router.push(`/destinations/${slug}`);
  };

  const handleTrendingClick = (t: typeof TRENDING_SEARCHES[number]) => {
    if (t.type === "category") {
      setSelectedCategory(t.query);
      setQuery("");
    } else {
      setQuery(t.query);
    }
  };

  const clearAllFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setActiveTab("all");
  };

  const totalResultsCount = packages.length + destinations.length;

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(5, 18, 24, 0.82)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
        overflowY: "auto",
        animation: "searchFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1060,
          background: "#ffffff",
          borderRadius: 24,
          boxShadow: "0 25px 80px rgba(0, 77, 94, 0.35)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          overflow: "hidden",
          border: "1px solid rgba(0, 122, 150, 0.15)",
        }}
      >
        {/* ── Top Bar: Search Input ── */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--line2, #e2e8f0)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "linear-gradient(to right, #ffffff, #f7fdfe)",
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 26, color: "var(--gn2, #007a96)", flexShrink: 0 }}
          >
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              destinationContext
                ? `Search packages in ${destinationContext.name} or try "Honeymoon", "Luxury"...`
                : "Search packages, destinations (e.g. Dubai, Bali, Honeymoon, Luxury)..."
            }
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "var(--font-inter), sans-serif",
              color: "var(--ink, #0a1a1f)",
              background: "transparent",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--ink3, #64748b)",
                cursor: "pointer",
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                borderRadius: 8,
              }}
              title="Clear search"
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                close
              </span>
            </button>
          )}
          <button
            onClick={onClose}
            className="syne"
            style={{
              background: "var(--iv2, #e0f5f7)",
              border: "1px solid rgba(0, 122, 150, 0.2)",
              color: "var(--gn, #004d5e)",
              fontSize: 12,
              fontWeight: 700,
              padding: "8px 14px",
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            <span>ESC</span>
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
              close
            </span>
          </button>
        </div>

        {/* ── Filters Bar: Tabs & Pills ── */}
        <div
          style={{
            padding: "12px 20px",
            borderBottom: "1px solid var(--line, #f1f5f9)",
            background: "#fafcfc",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Row 1: Segregation View Tabs + Sub-popup Filter Button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
              {[
                { id: "all", label: `All (${totalResultsCount})` },
                { id: "packages", label: `Packages (${packages.length})` },
                { id: "destinations", label: `Destinations (${destinations.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="syne"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: activeTab === tab.id ? "1px solid var(--gn2, #007a96)" : "1px solid transparent",
                    background: activeTab === tab.id ? "var(--gn, #004d5e)" : "transparent",
                    color: activeTab === tab.id ? "#ffffff" : "var(--ink3, #4a7a85)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Sub-Popup Trigger & Reset */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => setIsFilterSubModalOpen(true)}
                className="syne filter-submodal-trigger"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: (selectedCategory !== "all" || selectedPriceRange !== "all")
                    ? "1px solid var(--cu, #F5A623)"
                    : "1px solid var(--line2, #cbd5e1)",
                  background: (selectedCategory !== "all" || selectedPriceRange !== "all")
                    ? "var(--cu-gl, rgba(245,166,35,0.12))"
                    : "#ffffff",
                  color: (selectedCategory !== "all" || selectedPriceRange !== "all")
                    ? "var(--cu-d, #c07d10)"
                    : "var(--gn, #004d5e)",
                  transition: "all 0.15s ease",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>tune</span>
                <span>Filters</span>
                {(selectedCategory !== "all" || selectedPriceRange !== "all") && (
                  <span
                    style={{
                      background: "var(--cu, #F5A623)",
                      color: "#ffffff",
                      fontSize: 10,
                      fontWeight: 800,
                      borderRadius: "50%",
                      width: 17,
                      height: 17,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {(selectedCategory !== "all" ? 1 : 0) + (selectedPriceRange !== "all" ? 1 : 0)}
                  </span>
                )}
              </button>

              {/* Clear filters button if active */}
              {(query || selectedCategory !== "all" || selectedPriceRange !== "all") && (
                <button
                  onClick={clearAllFilters}
                  className="syne"
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: "#e11d48",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    padding: "4px 6px",
                  }}
                  title="Reset all filters"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>restart_alt</span>
                  <span className="reset-filter-text">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Active filter chips (visible on mobile and desktop when filters are applied) */}
          {(selectedCategory !== "all" || selectedPriceRange !== "all") && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", paddingTop: 2 }}>
              <span className="syne" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink4, #8ab5be)", textTransform: "uppercase" }}>
                Active:
              </span>
              {selectedCategory !== "all" && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "3px 10px",
                    borderRadius: 12,
                    background: "var(--cu-gl, rgba(245,166,35,0.12))",
                    color: "var(--cu-d, #c07d10)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    border: "1px solid var(--cu, #F5A623)",
                  }}
                >
                  <span>{CATEGORIES.find((c) => c.id === selectedCategory)?.label || selectedCategory}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "inherit" }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>close</span>
                  </button>
                </span>
              )}
              {selectedPriceRange !== "all" && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "3px 10px",
                    borderRadius: 12,
                    background: "rgba(0, 122, 150, 0.1)",
                    color: "var(--gn, #004d5e)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    border: "1px solid var(--gn2, #007a96)",
                  }}
                >
                  <span>{PRICE_RANGES.find((p) => p.id === selectedPriceRange)?.label || selectedPriceRange}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPriceRange("all")}
                    style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "inherit" }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>close</span>
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Desktop in-line filter rows (hidden on phone to save space; phone uses the sub-popup) */}
          <div className="desktop-filter-rows" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Category Themes */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
              <span
                className="syne"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--ink4, #8ab5be)",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  paddingTop: 6,
                  minWidth: 54,
                  flexShrink: 0,
                }}
              >
                Themes:
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", flex: 1 }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 14,
                      fontSize: 12,
                      fontWeight: selectedCategory === cat.id ? 700 : 500,
                      cursor: "pointer",
                      border: selectedCategory === cat.id ? "1px solid var(--cu, #F5A623)" : "1px solid var(--line2, #e2e8f0)",
                      background: selectedCategory === cat.id ? "var(--cu-gl, rgba(245,166,35,0.12))" : "#ffffff",
                      color: selectedCategory === cat.id ? "var(--cu-d, #c07d10)" : "var(--ink2, #1a3a42)",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Ranges */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
              <span
                className="syne"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--ink4, #8ab5be)",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  paddingTop: 6,
                  minWidth: 54,
                  flexShrink: 0,
                }}
              >
                Budget:
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", flex: 1 }}>
                {PRICE_RANGES.map((pr) => (
                  <button
                    key={pr.id}
                    onClick={() => setSelectedPriceRange(pr.id)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 14,
                      fontSize: 12,
                      fontWeight: selectedPriceRange === pr.id ? 700 : 500,
                      cursor: "pointer",
                      border: selectedPriceRange === pr.id ? "1px solid var(--gn3, #00AECC)" : "1px solid var(--line2, #e2e8f0)",
                      background: selectedPriceRange === pr.id ? "rgba(0, 174, 204, 0.1)" : "#ffffff",
                      color: selectedPriceRange === pr.id ? "var(--gn, #004d5e)" : "var(--ink2, #1a3a42)",
                      whiteSpace: "nowrap",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Body Content: Dual Segregated Sections ── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            background: "#fbfdfd",
          }}
        >
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  border: "3px solid var(--line2, #e0f5f7)",
                  borderTopColor: "var(--cu, #F5A623)",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              <p className="syne" style={{ fontSize: 13, color: "var(--ink3, #4a7a85)" }}>
                Searching packages and destinations...
              </p>
            </div>
          ) : totalResultsCount === 0 ? (
            /* ── No Results State ── */
            <div style={{ padding: "40px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 48, color: "var(--ink4, #8ab5be)" }}>
                travel_explore
              </span>
              <div>
                <h4 className="serif" style={{ fontSize: 18, color: "var(--ink, #0a1a1f)", marginBottom: 4 }}>
                  No matching packages or destinations found
                </h4>
                <p style={{ fontSize: 13, color: "var(--ink3, #4a7a85)", maxWidth: 440, margin: "0 auto" }}>
                  {query ? `We couldn't find matches for "${query}". Try adjusting your search query, clearing filters, or browsing popular suggestions.` : "No results for the selected filters."}
                </p>
              </div>

              {/* Trending suggestions */}
              <div style={{ marginTop: 16 }}>
                <p className="syne" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink3, #4a7a85)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                  Trending Searches
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  {TRENDING_SEARCHES.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTrendingClick(t)}
                      style={{
                        padding: "6px 14px",
                        background: "#ffffff",
                        border: "1px solid var(--line2, #e2e8f0)",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--gn, #004d5e)",
                        cursor: "pointer",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ── Results Container (Segregated Layout) ── */
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  activeTab === "all"
                    ? "repeat(auto-fit, minmax(320px, 1fr))"
                    : "1fr",
                gap: 28,
              }}
            >
              {/* ───────── 1. PACKAGES COLUMN ───────── */}
              {(activeTab === "all" || activeTab === "packages") && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="material-symbols-rounded" style={{ color: "var(--gn, #004d5e)", fontSize: 20 }}>
                        luggage
                      </span>
                      <h3 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--ink, #0a1a1f)" }}>
                        Packages
                      </h3>
                      <span
                        className="syne"
                        style={{
                          background: "var(--iv3, #c8eef2)",
                          color: "var(--gn, #004d5e)",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 10,
                        }}
                      >
                        {packages.length}
                      </span>
                    </div>
                  </div>

                  {packages.length === 0 ? (
                    <div style={{ padding: "24px 16px", background: "#ffffff", borderRadius: 16, border: "1px dashed var(--line2, #e2e8f0)", textAlign: "center" }}>
                      <p style={{ fontSize: 13, color: "var(--ink3, #64748b)" }}>No packages matched your filters.</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {packages.map((pkg) => {
                        const img = pkg.heroImage || pkg.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80";
                        return (
                          <div
                            key={pkg._id}
                            onClick={() => handleSelectPackage(pkg.slug)}
                            style={{
                              display: "flex",
                              gap: 14,
                              background: "#ffffff",
                              borderRadius: 16,
                              padding: 12,
                              border: "1px solid var(--line2, #e2e8f0)",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              boxShadow: "0 2px 8px rgba(0, 77, 94, 0.04)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.borderColor = "var(--gd, #29C4D8)";
                              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 77, 94, 0.12)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "none";
                              e.currentTarget.style.borderColor = "var(--line2, #e2e8f0)";
                              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 77, 94, 0.04)";
                            }}
                          >
                            {/* Thumbnail */}
                            <div
                              style={{
                                width: 90,
                                height: 80,
                                borderRadius: 12,
                                overflow: "hidden",
                                position: "relative",
                                flexShrink: 0,
                                background: "#f1f5f9",
                              }}
                            >
                              <img src={img} alt={pkg.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              {pkg.badge && (
                                <span
                                  className="syne"
                                  style={{
                                    position: "absolute",
                                    top: 4,
                                    left: 4,
                                    fontSize: 8.5,
                                    fontWeight: 700,
                                    background: "rgba(10, 26, 31, 0.8)",
                                    backdropFilter: "blur(4px)",
                                    color: "var(--cu-l, #F0C040)",
                                    padding: "2px 5px",
                                    borderRadius: 4,
                                    letterSpacing: 0.3,
                                  }}
                                >
                                  {pkg.badge}
                                </span>
                              )}
                            </div>

                            {/* Details */}
                            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                                  {pkg.destination?.name && (
                                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--gn2, #007a96)" }}>
                                      {pkg.destination.name}
                                    </span>
                                  )}
                                  {pkg.duration && (
                                    <span style={{ fontSize: 10.5, color: "var(--ink3, #64748b)" }}>
                                      • {pkg.duration.nights}N/{pkg.duration.days}D
                                    </span>
                                  )}
                                </div>
                                <h4
                                  style={{
                                    fontSize: 13.5,
                                    fontWeight: 700,
                                    color: "var(--ink, #0a1a1f)",
                                    lineHeight: 1.3,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {pkg.name}
                                </h4>
                              </div>

                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                                <span
                                  className="syne"
                                  style={{
                                    fontSize: 13.5,
                                    fontWeight: 800,
                                    color: "var(--gn, #004d5e)",
                                  }}
                                >
                                  ₹{pkg.price ? pkg.price.toLocaleString("en-IN") : "N/A"}
                                  <span style={{ fontSize: 10.5, fontWeight: 500, color: "var(--ink3, #64748b)" }}>
                                    /{pkg.priceUnit || "person"}
                                  </span>
                                </span>
                                <span
                                  className="syne"
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: "var(--cu-d, #c07d10)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  View Package →
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ───────── 2. DESTINATIONS COLUMN ───────── */}
              {(activeTab === "all" || activeTab === "destinations") && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="material-symbols-rounded" style={{ color: "var(--cu, #F5A623)", fontSize: 20 }}>
                        location_on
                      </span>
                      <h3 className="serif" style={{ fontSize: 17, fontWeight: 700, color: "var(--ink, #0a1a1f)" }}>
                        Destinations
                      </h3>
                      <span
                        className="syne"
                        style={{
                          background: "var(--cu-gl, rgba(245,166,35,0.12))",
                          color: "var(--cu-d, #c07d10)",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 10,
                        }}
                      >
                        {destinations.length}
                      </span>
                    </div>
                  </div>

                  {destinations.length === 0 ? (
                    <div style={{ padding: "24px 16px", background: "#ffffff", borderRadius: 16, border: "1px dashed var(--line2, #e2e8f0)", textAlign: "center" }}>
                      <p style={{ fontSize: 13, color: "var(--ink3, #64748b)" }}>No destinations matched your search query.</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {destinations.map((dest) => {
                        const img = dest.heroImage || dest.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80";
                        return (
                          <div
                            key={dest._id}
                            onClick={() => handleSelectDestination(dest.slug)}
                            style={{
                              display: "flex",
                              gap: 14,
                              background: "#ffffff",
                              borderRadius: 16,
                              padding: 12,
                              border: "1px solid var(--line2, #e2e8f0)",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              boxShadow: "0 2px 8px rgba(0, 77, 94, 0.04)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.borderColor = "var(--cu, #F5A623)";
                              e.currentTarget.style.boxShadow = "0 8px 24px rgba(245, 166, 35, 0.15)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "none";
                              e.currentTarget.style.borderColor = "var(--line2, #e2e8f0)";
                              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 77, 94, 0.04)";
                            }}
                          >
                            {/* Thumbnail */}
                            <div
                              style={{
                                width: 90,
                                height: 80,
                                borderRadius: 12,
                                overflow: "hidden",
                                position: "relative",
                                flexShrink: 0,
                                background: "#f1f5f9",
                              }}
                            >
                              <img src={img} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              {dest.packageCount !== undefined && dest.packageCount > 0 && (
                                <span
                                  className="syne"
                                  style={{
                                    position: "absolute",
                                    bottom: 4,
                                    left: 4,
                                    fontSize: 8.5,
                                    fontWeight: 700,
                                    background: "rgba(0, 77, 94, 0.85)",
                                    backdropFilter: "blur(4px)",
                                    color: "#ffffff",
                                    padding: "2px 5px",
                                    borderRadius: 4,
                                  }}
                                >
                                  {dest.packageCount} pkgs
                                </span>
                              )}
                            </div>

                            {/* Details */}
                            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink3, #64748b)" }}>
                                  {dest.region || dest.country || "Explore"}
                                </span>
                                <h4
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "var(--ink, #0a1a1f)",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {dest.name}
                                </h4>
                              </div>

                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                                {dest.startingPrice ? (
                                  <span
                                    className="syne"
                                    style={{
                                      fontSize: 12.5,
                                      fontWeight: 700,
                                      color: "var(--ink2, #1a3a42)",
                                    }}
                                  >
                                    From ₹{dest.startingPrice.toLocaleString("en-IN")}
                                  </span>
                                ) : (
                                  <span style={{ fontSize: 11.5, color: "var(--ink3, #64748b)" }}>Featured Destination</span>
                                )}
                                <span
                                  className="syne"
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: "var(--gn, #004d5e)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  Explore Destination →
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer Info ── */}
        <div
          style={{
            padding: "10px 24px",
            background: "#ffffff",
            borderTop: "1px solid var(--line, #f1f5f9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 11.5,
            color: "var(--ink3, #64748b)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>
              <strong style={{ color: "var(--ink, #0a1a1f)" }}>Enter:</strong> Search
            </span>
            <span>
              <strong style={{ color: "var(--ink, #0a1a1f)" }}>ESC:</strong> Close
            </span>
          </div>
          <span style={{ color: "var(--gn2, #007a96)", fontWeight: 600 }}>
            LetsLive Travel Search
          </span>
        </div>
      </div>

      {/* ── Sub-Popup: Mobile & Desktop Filter Sheet / Modal ── */}
      {isFilterSubModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="submodal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10010,
            background: "rgba(5, 18, 24, 0.75)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 0,
            animation: "searchFadeIn 0.2s ease",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFilterSubModalOpen(false);
          }}
        >
          <div
            className="filter-submodal-sheet"
            style={{
              width: "100%",
              maxWidth: 560,
              background: "#ffffff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              boxShadow: "0 -10px 40px rgba(0, 77, 94, 0.3)",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "subModalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle for touch feel */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 10, paddingBottom: 4 }}>
              <div style={{ width: 42, height: 4.5, borderRadius: 3, background: "var(--line2, #cbd5e1)" }} />
            </div>

            {/* Header */}
            <div
              style={{
                padding: "12px 20px 14px",
                borderBottom: "1px solid var(--line2, #e2e8f0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--cu, #F5A623)" }}>
                  tune
                </span>
                <h3 className="serif" style={{ fontSize: 19, fontWeight: 700, color: "var(--ink, #004d5e)", margin: 0 }}>
                  Search Filters
                </h3>
                {(selectedCategory !== "all" || selectedPriceRange !== "all") && (
                  <span
                    className="syne"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      background: "var(--cu-gl, rgba(245,166,35,0.15))",
                      color: "var(--cu-d, #c07d10)",
                      padding: "2px 8px",
                      borderRadius: 12,
                    }}
                  >
                    {(selectedCategory !== "all" ? 1 : 0) + (selectedPriceRange !== "all" ? 1 : 0)} Active
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {(selectedCategory !== "all" || selectedPriceRange !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedPriceRange("all");
                    }}
                    className="syne"
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#e11d48",
                      cursor: "pointer",
                      padding: "4px 8px",
                    }}
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsFilterSubModalOpen(false)}
                  style={{
                    background: "var(--iv2, #f0f7f8)",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--ink2, #1e293b)",
                  }}
                  title="Close filters"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>close</span>
                </button>
              </div>
            </div>

            {/* Scrollable Filters Body */}
            <div
              style={{
                padding: "18px 20px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              {/* Category Themes Section */}
              <div>
                <div
                  className="syne"
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: "var(--ink3, #4a7a85)",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)" }}>category</span>
                  Travel Themes
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8 }}>
                  {CATEGORIES.map((cat) => {
                    const isSel = selectedCategory === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="syne"
                        style={{
                          padding: "10px 12px",
                          borderRadius: 14,
                          fontSize: 12.5,
                          fontWeight: isSel ? 700 : 500,
                          cursor: "pointer",
                          border: isSel ? "1.5px solid var(--cu, #F5A623)" : "1px solid var(--line2, #e2e8f0)",
                          background: isSel ? "var(--cu-gl, rgba(245,166,35,0.12))" : "#ffffff",
                          color: isSel ? "var(--cu-d, #c07d10)" : "var(--ink2, #1a3a42)",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          textAlign: "left",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 18, color: isSel ? "var(--cu)" : "var(--ink3)" }}>
                          {cat.icon}
                        </span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range Section */}
              <div>
                <div
                  className="syne"
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: "var(--ink3, #4a7a85)",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--gn3)" }}>payments</span>
                  Budget / Price Range
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8 }}>
                  {PRICE_RANGES.map((pr) => {
                    const isSel = selectedPriceRange === pr.id;
                    return (
                      <button
                        type="button"
                        key={pr.id}
                        onClick={() => setSelectedPriceRange(pr.id)}
                        className="syne"
                        style={{
                          padding: "10px 12px",
                          borderRadius: 14,
                          fontSize: 12.5,
                          fontWeight: isSel ? 700 : 500,
                          cursor: "pointer",
                          border: isSel ? "1.5px solid var(--gn2, #007a96)" : "1px solid var(--line2, #e2e8f0)",
                          background: isSel ? "rgba(0, 122, 150, 0.1)" : "#ffffff",
                          color: isSel ? "var(--gn, #004d5e)" : "var(--ink2, #1a3a42)",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: 18, color: isSel ? "var(--gn2)" : "var(--ink4)" }}>
                          {isSel ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <span>{pr.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div
              style={{
                padding: "12px 20px 16px",
                borderTop: "1px solid var(--line2, #e2e8f0)",
                background: "#ffffff",
                display: "flex",
                gap: 10,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedPriceRange("all");
                }}
                className="syne"
                style={{
                  flex: "0 0 90px",
                  padding: "11px 12px",
                  borderRadius: 12,
                  border: "1px solid var(--line2, #cbd5e1)",
                  background: "#ffffff",
                  color: "var(--ink2, #334155)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterSubModalOpen(false)}
                className="syne"
                style={{
                  flex: 1,
                  padding: "11px 18px",
                  borderRadius: 12,
                  border: "none",
                  background: "var(--cu)",
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  boxShadow: "0 4px 14px rgba(245,166,35,0.35)",
                }}
              >
                <span>Apply Filters</span>
                <span style={{ fontSize: 12, opacity: 0.9 }}>
                  ({totalResultsCount})
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (min-width: 769px) {
          .submodal-backdrop {
            align-items: center !important;
            padding: 24px !important;
          }
          .filter-submodal-sheet {
            border-radius: 24px !important;
            max-height: 80vh !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-filter-rows {
            display: none !important;
          }
          .reset-filter-text {
            display: none !important;
          }
        }
        @keyframes searchFadeIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes subModalSlideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
