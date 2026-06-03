"use client";

import { useState, useMemo, useEffect } from "react";
import DestinationsHeader from "./DestinationsHeader";
import Sidebar from "./Sidebar";
import DestinationCard from "./DestinationCard";
import { destinations as staticDestinations } from "./destinationsData";
import { api } from "@/lib/api";
import type { Destination } from "./DestinationCard";

function getCatIcon(cat: string): string {
  const icons: Record<string, string> = {
    beach: "beach_access",
    city: "location_city",
    mountain: "landscape",
    adventure: "hiking",
    cultural: "museum",
    wildlife: "forest",
    tropical: "sunny",
  };
  return icons[cat] || "travel_explore";
}

function formatPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}

export default function DestinationsMain() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [checkedCats, setCheckedCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [sort, setSort] = useState("popular");
  const [listView, setListView] = useState(true);
  const [destinations, setDestinations] = useState<Destination[]>(staticDestinations);
  const [apiLoading, setApiLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await api.get("/destinations");
        if (res.status === "success" && res.data && Array.isArray(res.data)) {
          const mapped: Destination[] = res.data.map((d: Record<string, unknown>) => ({
            name: (d.name as string) || "",
            slug: (d.slug as string) || "",
            img: Array.isArray(d.images) && d.images.length > 0 ? (d.images[0] as string) : "",
            cat: (d.category as string) || "beach",
            catIcon: getCatIcon((d.category as string) || "beach"),
            region: (d.region as string) || "",
            desc: (d.description as string) || "",
            season: (d.bestSeason as string) || "Year-round",
            packages: "View packages",
            rating: d.rating != null ? String(d.rating) : "4.5",
            reviews: d.reviewCount != null ? String(d.reviewCount) : "0",
            price: (d.startingPrice as number) || 0,
            priceLabel: formatPrice((d.startingPrice as number) || 0),
          }));
          if (mapped.length > 0) {
            setDestinations(mapped);
          }
        }
      } catch {
        // Fallback to static data (already set)
      } finally {
        setApiLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  const filtered = useMemo(() => {
    let results = destinations.filter((d) => {
      const matchCat = activeCat === "all" || d.cat === activeCat;
      const matchSb = checkedCats.length === 0 || checkedCats.includes(d.cat);
      const matchPrice = d.price <= maxPrice;
      const q = search.toLowerCase();
      const matchSearch = !q || d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q);
      return matchCat && matchSb && matchPrice && matchSearch;
    });

    if (sort === "price-low") results.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") results.sort((a, b) => b.price - a.price);
    else if (sort === "rating") results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

    return results;
  }, [activeCat, search, checkedCats, maxPrice, sort, destinations]);

  const clearFilters = () => {
    setActiveCat("all");
    setSearch("");
    setCheckedCats([]);
    setMaxPrice(300000);
    setSort("popular");
  };

  return (
    <>
      <DestinationsHeader activeCat={activeCat} setActiveCat={setActiveCat} search={search} setSearch={setSearch} />

      {/* Marquee */}
      <div style={{ background: "var(--gn)", overflow: "hidden", padding: "14px 0" }}>
        <div style={{ display: "flex", width: "max-content", animation: "mq 38s linear infinite" }}>
          {["Dubai", "Bali", "Japan", "Maldives", "Singapore", "Thailand", "Santorini", "Paris", "Dubai", "Bali", "Japan", "Maldives", "Singapore", "Thailand", "Santorini", "Paris"].map((item, i) => (
            <div key={i} className="syne" style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 38px", fontSize: 11.5, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(249,246,240,.5)", whiteSpace: "nowrap" }}>
              {item}<span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cu)", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <section id="main" style={{ padding: "52px 0 96px", background: "var(--iv)" }}>
        <div className="container">
          {/* Mobile filter toggle button */}
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
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>tune</span>
            Filters & Sort
            {(checkedCats.length > 0 || maxPrice < 300000) && (
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cu)", marginLeft: 4 }} />
            )}
          </button>

          {/* Mobile filter drawer */}
          <div
            onClick={() => setMobileFilterOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,20,28,.5)",
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
              width: "min(300px, 85vw)",
              background: "#fff",
              zIndex: 1060,
              transform: mobileFilterOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform .35s cubic-bezier(.4,0,.2,1)",
              display: "none",
              flexDirection: "column",
              boxShadow: mobileFilterOpen ? "8px 0 40px rgba(0,20,28,.15)" : "none",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
              <span className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--iv)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--ink2)" }}>close</span>
              </button>
            </div>
            <div style={{ padding: "16px 20px", flex: 1 }}>
              <Sidebar
                checkedCats={checkedCats}
                setCheckedCats={setCheckedCats}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sort={sort}
                setSort={setSort}
                resultCount={filtered.length}
                onClear={clearFilters}
              />
            </div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid var(--line)" }}>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="syne"
                style={{ width: "100%", padding: "12px", background: "var(--cu)", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Show {filtered.length} Results
              </button>
            </div>
          </div>

          <div className="main-layout" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32, alignItems: "start" }}>
            {/* Desktop sidebar */}
            <div className="desktop-sidebar">
              <Sidebar
                checkedCats={checkedCats}
                setCheckedCats={setCheckedCats}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sort={sort}
                setSort={setSort}
                resultCount={filtered.length}
                onClear={clearFilters}
              />
            </div>

            <div>
              {/* Results head */}
              <div className="rv" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div className="syne" style={{ fontSize: 13, color: "var(--ink3)" }}>
                  Showing <strong style={{ color: "var(--ink)", fontWeight: 700 }}>{filtered.length}</strong> destinations
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => setListView(false)}
                    style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid var(--line2)", background: !listView ? "var(--gn)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "var(--tr)" }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 17, color: !listView ? "#fff" : "var(--ink3)" }}>grid_view</span>
                  </button>
                  <button
                    onClick={() => setListView(true)}
                    style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid var(--line2)", background: listView ? "var(--gn)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "var(--tr)" }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 17, color: listView ? "#fff" : "var(--ink3)" }}>view_list</span>
                  </button>
                </div>
              </div>

              {/* Grid */}
              {apiLoading ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--gn2)", animation: "mq 1s linear infinite" }}>progress_activity</span>
                  <p className="syne" style={{ marginTop: 12, fontSize: 13, color: "var(--ink3)" }}>Loading destinations...</p>
                </div>
              ) : filtered.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: listView ? "1fr" : "repeat(3, 1fr)", gap: 20 }} className="dest-results-grid">
                  {filtered.map((d, i) => (
                    <DestinationCard key={i} dest={d} listView={listView} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "80px 20px" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--ink4)", marginBottom: 16 }}>travel_explore</span>
                  <h3 className="serif" style={{ fontSize: 24, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>No destinations found</h3>
                  <p style={{ fontSize: 14, color: "var(--ink3)" }}>Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1100px) {
          .main-layout { grid-template-columns: 1fr !important; }
          .desktop-sidebar { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
          .mobile-filter-drawer { display: flex !important; }
          .dest-results-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .dest-results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </>
  );
}
