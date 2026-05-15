"use client";

import { useState, useMemo } from "react";
import DestinationsHeader from "./DestinationsHeader";
import Sidebar from "./Sidebar";
import DestinationCard from "./DestinationCard";
import { destinations } from "./destinationsData";

export default function DestinationsMain() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [checkedCats, setCheckedCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [sort, setSort] = useState("popular");
  const [listView, setListView] = useState(true);

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
  }, [activeCat, search, checkedCats, maxPrice, sort]);

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
          <div className="main-layout" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32, alignItems: "start" }}>
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
              {filtered.length > 0 ? (
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
          .dest-results-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .dest-results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
