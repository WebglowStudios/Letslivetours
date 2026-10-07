"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DestinationsHeader from "./DestinationsHeader";
import Sidebar from "./Sidebar";
import DestinationCard from "./DestinationCard";
import { destinations as staticDestinations } from "./destinationsData";
import { api } from "@/lib/api";
import type { Destination } from "./DestinationCard";

function getCatIcon(cat: string): string {
  const icons: Record<string, string> = {
    heritage: "temple_hindu",
    nature: "eco",
    beach: "beach_access",
    pilgrimage: "auto_stories",
    city: "location_city",
    mountain: "landscape",
    adventure: "hiking",
    cultural: "museum",
    wildlife: "forest",
    tropical: "sunny",
    honeymoon: "favorite",
    luxury: "diamond",
    island: "water",
    spiritual: "self_improvement",
  };
  return icons[cat.toLowerCase()] || "travel_explore";
}

function formatPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}

export default function DestinationsMain() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";

  // Filter States
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState(initialSearch);
  const [checkedCats, setCheckedCats] = useState<string[]>([]);
  const [selectedVisa, setSelectedVisa] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [sort, setSort] = useState("popular");
  const [listView, setListView] = useState(true);

  // Data States
  const [destinations, setDestinations] = useState<Destination[]>(staticDestinations);
  const [apiLoading, setApiLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const urlQuery = searchParams?.get("search");
    if (urlQuery !== null && urlQuery !== undefined) {
      setSearch(urlQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await api.get("/destinations?limit=100");
        if (res.status === "success" && res.data && Array.isArray(res.data)) {
          const mapped: Destination[] = res.data.map((d: Record<string, unknown>) => {
            const rawTags = Array.isArray(d.tags) ? (d.tags as string[]) : [];
            const catStr = (d.category as string) || (rawTags.length > 0 ? rawTags[0] : "beach");
            const imgUrl =
              (Array.isArray(d.images) && d.images.length > 0 && (d.images[0] as string)) ||
              (d.heroImage as string) ||
              "";

            return {
              name: (d.name as string) || "",
              slug: (d.slug as string) || "",
              img: imgUrl,
              cat: catStr,
              catIcon: getCatIcon(catStr),
              tags: rawTags.length > 0 ? rawTags : [catStr],
              country: (d.country as string) || "",
              region: (d.region as string) || (d.country as string) || "",
              desc: (d.description as string) || (d.shortDescription as string) || "",
              season: (d.bestSeason as string) || "Year-round",
              packages: d.packageCount ? `${d.packageCount} packages` : "View packages",
              rating: d.rating != null ? String(d.rating) : "4.8",
              reviews: d.reviewCount != null ? String(d.reviewCount) : "0",
              price: (d.startingPrice as number) || 0,
              priceLabel: formatPrice((d.startingPrice as number) || 0),
              visaType: (d.visaType as string) || undefined,
              isFeatured: Boolean(d.isFeatured),
            };
          });
          if (mapped.length > 0) {
            setDestinations(mapped);
          }
        }
      } catch {
        // Fallback to static data (already loaded)
      } finally {
        setApiLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  // Interconnected filtering logic
  const filtered = useMemo(() => {
    let results = destinations.filter((d) => {
      const allTags = [
        d.cat?.toLowerCase(),
        ...(Array.isArray(d.tags) ? d.tags.map((t: string) => t.toLowerCase()) : []),
      ].filter(Boolean);

      // 1. Header category pill
      const matchCat =
        activeCat === "all" || allTags.includes(activeCat.toLowerCase());

      // 2. Sidebar checked themes
      const matchSbCats =
        checkedCats.length === 0 ||
        checkedCats.some((c) => allTags.includes(c.toLowerCase()));

      // 3. Visa requirements
      const matchVisa =
        selectedVisa === "all" ||
        (d.visaType && d.visaType.toLowerCase() === selectedVisa.toLowerCase());

      // 4. Region
      const matchRegion =
        selectedRegion === "all" ||
        (d.region && d.region.toLowerCase().includes(selectedRegion.toLowerCase())) ||
        (d.country && d.country.toLowerCase().includes(selectedRegion.toLowerCase()));

      // 5. Best Travel Season
      const matchSeason = (() => {
        if (selectedSeason === "all") return true;
        const s = (d.season || "").toLowerCase();
        if (selectedSeason === "year-round") return s.includes("year");
        if (selectedSeason === "winter") return /oct|nov|dec|jan|feb|mar|winter/i.test(s);
        if (selectedSeason === "summer") return /apr|may|jun|summer/i.test(s);
        if (selectedSeason === "monsoon") return /jul|aug|sep|monsoon|autumn/i.test(s);
        return true;
      })();

      // 6. Minimum Rating
      const matchRating = minRating === 0 || parseFloat(d.rating) >= minRating;

      // 7. Featured Deals Only
      const matchFeatured = !featuredOnly || Boolean(d.isFeatured);

      // 8. Budget
      const matchPrice = d.price <= maxPrice;

      // 9. Search query across name, region, country, desc, tags, category, visa
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        (d.country && d.country.toLowerCase().includes(q)) ||
        d.desc.toLowerCase().includes(q) ||
        allTags.some((t) => t.includes(q)) ||
        (d.visaType && d.visaType.toLowerCase().includes(q));

      return (
        matchCat &&
        matchSbCats &&
        matchVisa &&
        matchRegion &&
        matchSeason &&
        matchRating &&
        matchFeatured &&
        matchPrice &&
        matchSearch
      );
    });

    // Sorting
    if (sort === "price-low") {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sort === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "popular") {
      results.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        return parseFloat(b.rating) - parseFloat(a.rating);
      });
    }

    return results;
  }, [
    activeCat,
    search,
    checkedCats,
    selectedVisa,
    selectedRegion,
    selectedSeason,
    minRating,
    featuredOnly,
    maxPrice,
    sort,
    destinations,
  ]);

  const clearFilters = () => {
    setActiveCat("all");
    setSearch("");
    setCheckedCats([]);
    setSelectedVisa("all");
    setSelectedRegion("all");
    setSelectedSeason("all");
    setMinRating(0);
    setFeaturedOnly(false);
    setMaxPrice(300000);
    setSort("popular");
  };

  // Click on a tag on any card -> connects directly to filter
  const handleTagClick = (tag: string) => {
    const lower = tag.toLowerCase();
    if (checkedCats.includes(lower)) {
      setCheckedCats(checkedCats.filter((c) => c !== lower));
    } else {
      setCheckedCats([...checkedCats, lower]);
    }
  };

  // Click on a visa badge on any card -> connects directly to filter
  const handleVisaClick = (visa: string) => {
    setSelectedVisa(visa.toLowerCase());
  };

  // Active filter chips list
  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];

    if (activeCat !== "all") {
      chips.push({
        label: `Category: ${activeCat}`,
        onRemove: () => setActiveCat("all"),
      });
    }
    checkedCats.forEach((c) => {
      chips.push({
        label: `Theme: ${c}`,
        onRemove: () => setCheckedCats(checkedCats.filter((cat) => cat !== c)),
      });
    });
    if (selectedVisa !== "all") {
      const vLabel = selectedVisa === "free" ? "Visa Free" : selectedVisa === "on-arrival" ? "Visa on Arrival" : "Visa Required";
      chips.push({
        label: `Visa: ${vLabel}`,
        onRemove: () => setSelectedVisa("all"),
      });
    }
    if (selectedRegion !== "all") {
      chips.push({
        label: `Region: ${selectedRegion}`,
        onRemove: () => setSelectedRegion("all"),
      });
    }
    if (selectedSeason !== "all") {
      chips.push({
        label: `Season: ${selectedSeason}`,
        onRemove: () => setSelectedSeason("all"),
      });
    }
    if (minRating > 0) {
      chips.push({
        label: `Rating: ${minRating}★+`,
        onRemove: () => setMinRating(0),
      });
    }
    if (featuredOnly) {
      chips.push({
        label: "Featured Deals Only",
        onRemove: () => setFeaturedOnly(false),
      });
    }
    if (maxPrice < 300000) {
      chips.push({
        label: `Under ${formatPrice(maxPrice)}`,
        onRemove: () => setMaxPrice(300000),
      });
    }
    if (search.trim()) {
      chips.push({
        label: `"${search}"`,
        onRemove: () => setSearch(""),
      });
    }

    return chips;
  }, [
    activeCat,
    checkedCats,
    selectedVisa,
    selectedRegion,
    selectedSeason,
    minRating,
    featuredOnly,
    maxPrice,
    search,
  ]);

  return (
    <>
      <DestinationsHeader
        activeCat={activeCat}
        setActiveCat={setActiveCat}
        search={search}
        setSearch={setSearch}
      />

      {/* Marquee Banner */}
      <div style={{ background: "var(--gn)", overflow: "hidden", padding: "14px 0" }}>
        <div style={{ display: "flex", width: "max-content", animation: "mq 38s linear infinite" }}>
          {[
            "Dubai", "Bali", "Japan", "Maldives", "Singapore", "Thailand", "Santorini", "Paris",
            "Kashmir", "Nepal", "Kenya Safari", "New York", "Dubai", "Bali", "Japan", "Maldives",
          ].map((item, i) => (
            <div
              key={i}
              className="syne"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 36px",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(249,246,240,.55)",
                whiteSpace: "nowrap",
              }}
            >
              {item}
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cu)", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <section id="main" style={{ padding: "48px 0 96px", background: "var(--iv)" }}>
        <div className="container">
          {/* Mobile Filter Toggle Button */}
          <button
            className="mobile-filter-btn"
            onClick={() => setMobileFilterOpen(true)}
            style={{
              display: "none",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              background: "#fff",
              border: "1.5px solid var(--line2)",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--ink2)",
              cursor: "pointer",
              marginBottom: 20,
              width: "100%",
              justifyContent: "center",
              boxShadow: "var(--sh)",
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>
              tune
            </span>
            Filters & Refine ({filtered.length} found)
            {activeChips.length > 0 && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  background: "var(--cu)",
                  color: "#fff",
                  borderRadius: 50,
                  padding: "2px 7px",
                  marginLeft: 4,
                }}
              >
                {activeChips.length}
              </span>
            )}
          </button>

          {/* Mobile Filter Drawer */}
          <div
            onClick={() => setMobileFilterOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,20,28,.55)",
              zIndex: 1050,
              opacity: mobileFilterOpen ? 1 : 0,
              pointerEvents: mobileFilterOpen ? "auto" : "none",
              transition: "opacity .3s ease",
            }}
          />
          <div
            className="mobile-filter-drawer"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "min(330px, 88vw)",
              background: "#fff",
              zIndex: 1060,
              transform: mobileFilterOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform .35s cubic-bezier(.4,0,.2,1)",
              display: "none",
              flexDirection: "column",
              boxShadow: mobileFilterOpen ? "8px 0 40px rgba(0,20,28,.2)" : "none",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>tune</span>
                Destination Filters
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--iv)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--ink2)" }}>close</span>
              </button>
            </div>
            <div style={{ padding: "16px", flex: 1 }}>
              <Sidebar
                checkedCats={checkedCats}
                setCheckedCats={setCheckedCats}
                selectedVisa={selectedVisa}
                setSelectedVisa={setSelectedVisa}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                selectedSeason={selectedSeason}
                setSelectedSeason={setSelectedSeason}
                minRating={minRating}
                setMinRating={setMinRating}
                featuredOnly={featuredOnly}
                setFeaturedOnly={setFeaturedOnly}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sort={sort}
                setSort={setSort}
                destinations={destinations}
                resultCount={filtered.length}
                onClear={clearFilters}
              />
            </div>
            <div style={{ padding: "14px 20px", borderTop: "1px solid var(--line)", background: "#fff" }}>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="syne"
                style={{
                  width: "100%",
                  padding: "13px",
                  background: "var(--gn)",
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Show {filtered.length} Results
              </button>
            </div>
          </div>

          {/* Desktop Layout Grid */}
          <div className="main-layout" style={{ display: "grid", gridTemplateColumns: "290px 1fr", gap: 32, alignItems: "start" }}>
            {/* Desktop Sidebar */}
            <div className="desktop-sidebar">
              <Sidebar
                checkedCats={checkedCats}
                setCheckedCats={setCheckedCats}
                selectedVisa={selectedVisa}
                setSelectedVisa={setSelectedVisa}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                selectedSeason={selectedSeason}
                setSelectedSeason={setSelectedSeason}
                minRating={minRating}
                setMinRating={setMinRating}
                featuredOnly={featuredOnly}
                setFeaturedOnly={setFeaturedOnly}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sort={sort}
                setSort={setSort}
                destinations={destinations}
                resultCount={filtered.length}
                onClear={clearFilters}
              />
            </div>

            {/* Main Destination Results Area */}
            <div>
              {/* Results Top Header */}
              <div
                className="rv"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div className="syne" style={{ fontSize: 13, color: "var(--ink3)" }}>
                  Showing <strong style={{ color: "var(--ink)", fontWeight: 700 }}>{filtered.length}</strong> of{" "}
                  <strong>{destinations.length}</strong> destinations
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => setListView(false)}
                      title="Grid View"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        border: "1.5px solid var(--line2)",
                        background: !listView ? "var(--gn)" : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "var(--tr)",
                      }}
                    >
                      <span className="material-symbols-rounded" style={{ fontSize: 17, color: !listView ? "#fff" : "var(--ink3)" }}>
                        grid_view
                      </span>
                    </button>
                    <button
                      onClick={() => setListView(true)}
                      title="List View"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        border: "1.5px solid var(--line2)",
                        background: listView ? "var(--gn)" : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "var(--tr)",
                      }}
                    >
                      <span className="material-symbols-rounded" style={{ fontSize: 17, color: listView ? "#fff" : "var(--ink3)" }}>
                        view_list
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips Bar */}
              {activeChips.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 20,
                    padding: "10px 14px",
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                  }}
                >
                  <span className="syne" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink4)", textTransform: "uppercase", letterSpacing: 1 }}>
                    Active Filters:
                  </span>
                  {activeChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="syne"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 10px",
                        background: "var(--gn-gl)",
                        border: "1px solid var(--line2)",
                        borderRadius: 50,
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--gn2)",
                      }}
                    >
                      {chip.label}
                      <button
                        type="button"
                        onClick={chip.onRemove}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--ink3)",
                          padding: 0,
                          fontSize: 12,
                          lineHeight: 1,
                          display: "inline-flex",
                        }}
                        title="Remove filter"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="syne"
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--cu)",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginLeft: "auto",
                      textDecoration: "underline",
                    }}
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Destination Results Grid */}
              {apiLoading ? (
                <div style={{ textAlign: "center", padding: "80px 20px" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 40, color: "var(--gn2)", animation: "mq 1s linear infinite" }}>
                    progress_activity
                  </span>
                  <p className="syne" style={{ marginTop: 14, fontSize: 13, color: "var(--ink3)", fontWeight: 600 }}>
                    Loading destination collection...
                  </p>
                </div>
              ) : filtered.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: listView ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 20,
                  }}
                  className="dest-results-grid"
                >
                  {filtered.map((d, i) => (
                    <DestinationCard
                      key={d.slug || d.name || i}
                      dest={d}
                      listView={listView}
                      onTagClick={handleTagClick}
                      onVisaClick={handleVisaClick}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 20px",
                    background: "#fff",
                    borderRadius: "var(--r-xl)",
                    border: "1.5px dashed var(--line2)",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--ink4)", marginBottom: 16 }}>
                    travel_explore
                  </span>
                  <h3 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                    No destinations match your filters
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--ink3)", maxWidth: 420, margin: "0 auto 20px" }}>
                    We couldn&apos;t find any destination matching the current combination of filters. Try clearing some filters or searching for another term.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="syne"
                    style={{
                      padding: "10px 24px",
                      borderRadius: 50,
                      background: "var(--cu)",
                      color: "#fff",
                      border: "none",
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(245,166,35,.35)",
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
