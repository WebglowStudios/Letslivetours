"use client";

import { useMemo, useState } from "react";
import type { Destination } from "./DestinationCard";

interface Props {
  checkedCats: string[];
  setCheckedCats: (cats: string[]) => void;
  selectedVisa: string;
  setSelectedVisa: (visa: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedSeason: string;
  setSelectedSeason: (season: string) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  featuredOnly: boolean;
  setFeaturedOnly: (f: boolean) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  sort: string;
  setSort: (s: string) => void;
  destinations?: Destination[];
  resultCount: number;
  onClear: () => void;
}

const CATEGORY_DEFINITIONS = [
  { value: "heritage", icon: "temple_hindu", color: "#d97706", bg: "rgba(217,119,6,.1)", label: "Heritage" },
  { value: "nature", icon: "eco", color: "#059669", bg: "rgba(5,150,105,.1)", label: "Nature" },
  { value: "beach", icon: "beach_access", color: "var(--gd)", bg: "rgba(41,196,216,.1)", label: "Beach" },
  { value: "pilgrimage", icon: "auto_stories", color: "#ea580c", bg: "rgba(234,88,12,.1)", label: "Pilgrimage" },
  { value: "mountain", icon: "landscape", color: "#4AC28A", bg: "rgba(74,194,138,.1)", label: "Mountain" },
  { value: "city", icon: "location_city", color: "var(--cu)", bg: "rgba(245,166,35,.1)", label: "City" },
  { value: "wildlife", icon: "forest", color: "#34d399", bg: "rgba(52,211,153,.1)", label: "Wildlife" },
  { value: "adventure", icon: "hiking", color: "#f87171", bg: "rgba(220,80,80,.1)", label: "Adventure" },
  { value: "cultural", icon: "museum", color: "#c4b5fd", bg: "rgba(167,139,250,.1)", label: "Cultural" },
  { value: "tropical", icon: "sunny", color: "#fbbf24", bg: "rgba(251,191,36,.1)", label: "Tropical" },
  { value: "honeymoon", icon: "favorite", color: "#e11d48", bg: "rgba(225,29,72,.1)", label: "Honeymoon" },
  { value: "luxury", icon: "diamond", color: "#9333ea", bg: "rgba(147,51,234,.1)", label: "Luxury" },
  { value: "island", icon: "water", color: "#0d9488", bg: "rgba(13,148,136,.1)", label: "Island" },
  { value: "spiritual", icon: "self_improvement", color: "#ea580c", bg: "rgba(234,88,12,.1)", label: "Spiritual" },
];

export default function Sidebar({
  checkedCats,
  setCheckedCats,
  selectedVisa,
  setSelectedVisa,
  selectedRegion,
  setSelectedRegion,
  selectedSeason,
  setSelectedSeason,
  minRating,
  setMinRating,
  featuredOnly,
  setFeaturedOnly,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  destinations = [],
  resultCount,
  onClear,
}: Props) {
  const [showAllCats, setShowAllCats] = useState(false);

  const toggleCat = (val: string) => {
    setCheckedCats(
      checkedCats.includes(val) ? checkedCats.filter((c) => c !== val) : [...checkedCats, val]
    );
  };

  const formatPrice = (v: number) => "₹" + new Intl.NumberFormat("en-IN").format(v);

  // Dynamic Category counts
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    destinations.forEach((d) => {
      const allTags = [
        d.cat?.toLowerCase(),
        ...(Array.isArray(d.tags) ? d.tags.map((t) => t.toLowerCase()) : []),
      ].filter(Boolean);
      const unique = Array.from(new Set(allTags));
      unique.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return counts;
  }, [destinations]);

  // Dynamic Visa counts
  const visaCounts = useMemo(() => {
    const counts: Record<string, number> = { all: destinations.length, free: 0, "on-arrival": 0, required: 0 };
    destinations.forEach((d) => {
      const v = d.visaType?.toLowerCase();
      if (v === "free") counts.free++;
      else if (v === "on-arrival" || v === "arrival") counts["on-arrival"]++;
      else if (v === "required") counts.required++;
    });
    return counts;
  }, [destinations]);

  // Featured count
  const featuredCount = useMemo(() => {
    return destinations.filter((d) => d.isFeatured).length;
  }, [destinations]);

  // Dynamic unique regions extracted from destinations
  const uniqueRegions = useMemo(() => {
    const map = new Map<string, number>();
    destinations.forEach((d) => {
      const r = d.region?.trim() || d.country?.trim();
      if (r) {
        map.set(r, (map.get(r) || 0) + 1);
      }
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [destinations]);

  // Count active filters
  const activeCount =
    checkedCats.length +
    (selectedVisa !== "all" ? 1 : 0) +
    (selectedRegion !== "all" ? 1 : 0) +
    (selectedSeason !== "all" ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    (maxPrice < 300000 ? 1 : 0);

  const visibleCategories = showAllCats
    ? CATEGORY_DEFINITIONS
    : CATEGORY_DEFINITIONS.slice(0, 7);

  return (
    <aside
      className="rv"
      style={{
        position: "sticky",
        top: 92,
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
      }}
    >
      {/* Head */}
      <div
        style={{
          padding: "18px 22px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="syne"
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>
            tune
          </span>
          Filters
          {activeCount > 0 && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                background: "var(--cu)",
                color: "#fff",
                borderRadius: 50,
                padding: "2px 7px",
              }}
            >
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onClear}
          type="button"
          className="syne"
          style={{
            background: "none",
            border: "none",
            fontSize: 11,
            fontWeight: 700,
            color: activeCount > 0 ? "var(--cu)" : "var(--ink4)",
            cursor: activeCount > 0 ? "pointer" : "default",
            letterSpacing: 0.5,
          }}
        >
          Clear All
        </button>
      </div>

      {/* Featured Deals Toggle */}
      <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", background: featuredOnly ? "rgba(245,166,35,.06)" : "#fafaf9" }}>
        <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 17, color: "#d97706" }}>
              stars
            </span>
            <div>
              <span className="syne" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", display: "block" }}>
                Featured Deals Only
              </span>
              <span style={{ fontSize: 11, color: "var(--ink4)" }}>
                Curated top-tier packages ({featuredCount})
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => setFeaturedOnly(e.target.checked)}
            style={{ width: 17, height: 17, accentColor: "#d97706", cursor: "pointer" }}
          />
        </label>
      </div>

      {/* Visa Requirements Filter */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
        <div
          className="syne"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--ink4)",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Visa Requirements</span>
          {selectedVisa !== "all" && (
            <span
              onClick={() => setSelectedVisa("all")}
              style={{ fontSize: 10, color: "var(--cu)", cursor: "pointer", textTransform: "none", letterSpacing: 0 }}
            >
              Reset
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { id: "all", label: "All Visa Types", icon: "public", count: visaCounts.all },
            { id: "free", label: "Visa Free", icon: "check_circle", color: "#059669", count: visaCounts.free },
            { id: "on-arrival", label: "Visa on Arrival", icon: "flight_land", color: "#0284c7", count: visaCounts["on-arrival"] },
            { id: "required", label: "Visa Required", icon: "badge", color: "#64748b", count: visaCounts.required },
          ].map((v) => {
            const isSelected = selectedVisa === v.id;
            return (
              <label
                key={v.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "7px 10px",
                  borderRadius: 10,
                  cursor: "pointer",
                  background: isSelected ? "var(--gn-gl)" : "transparent",
                  transition: "background .2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <input
                    type="radio"
                    name="visaFilter"
                    checked={isSelected}
                    onChange={() => setSelectedVisa(v.id)}
                    style={{ accentColor: "var(--gn)", cursor: "pointer" }}
                  />
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: v.color || "var(--ink3)" }}>
                    {v.icon}
                  </span>
                  <span style={{ fontSize: 12.5, fontWeight: isSelected ? 600 : 500, color: isSelected ? "var(--gn2)" : "var(--ink2)" }}>
                    {v.label}
                  </span>
                </div>
                <span className="syne" style={{ fontSize: 11, color: "var(--ink4)", background: "var(--iv2)", borderRadius: 50, padding: "2px 7px", fontWeight: 600 }}>
                  {v.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Categories & Themes Filter */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
        <div
          className="syne"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--ink4)",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Themes & Categories</span>
          {checkedCats.length > 0 && (
            <span
              onClick={() => setCheckedCats([])}
              style={{ fontSize: 10, color: "var(--cu)", cursor: "pointer", textTransform: "none", letterSpacing: 0 }}
            >
              Reset
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {visibleCategories.map((cat) => {
            const count = catCounts[cat.value] || 0;
            const isChecked = checkedCats.includes(cat.value);
            return (
              <label
                key={cat.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  cursor: "pointer",
                  padding: "5px 8px",
                  borderRadius: 10,
                  background: isChecked ? "rgba(0,174,204,.06)" : "transparent",
                  transition: "background .2s",
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCat(cat.value)}
                  style={{ width: 15, height: 15, accentColor: "var(--gn)", cursor: "pointer", flexShrink: 0 }}
                />
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: cat.bg,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 14, color: cat.color }}>
                    {cat.icon}
                  </span>
                </div>
                <span style={{ fontSize: 12.5, color: isChecked ? "var(--ink)" : "var(--ink2)", fontWeight: isChecked ? 600 : 500 }}>
                  {cat.label}
                </span>
                <span
                  className="syne"
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    color: "var(--ink4)",
                    background: "var(--iv2)",
                    borderRadius: 50,
                    padding: "2px 7px",
                    fontWeight: 600,
                  }}
                >
                  {count}
                </span>
              </label>
            );
          })}
        </div>
        {CATEGORY_DEFINITIONS.length > 7 && (
          <button
            type="button"
            onClick={() => setShowAllCats(!showAllCats)}
            className="syne"
            style={{
              marginTop: 10,
              background: "none",
              border: "none",
              color: "var(--gn2)",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {showAllCats ? "Show Less" : `+ Show All (${CATEGORY_DEFINITIONS.length})`}
          </button>
        )}
      </div>

      {/* Region & Scope Filter */}
      {uniqueRegions.length > 0 && (
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
          <div
            className="syne"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--ink4)",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Region</span>
            {selectedRegion !== "all" && (
              <span
                onClick={() => setSelectedRegion("all")}
                style={{ fontSize: 10, color: "var(--cu)", cursor: "pointer", textTransform: "none", letterSpacing: 0 }}
              >
                Reset
              </span>
            )}
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px",
              background: "var(--iv)",
              border: "1.5px solid var(--line2)",
              borderRadius: 10,
              fontFamily: "var(--font-inter),'Inter',sans-serif",
              fontSize: 12.5,
              color: "var(--ink)",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">All Regions ({destinations.length})</option>
            {uniqueRegions.map(([reg, count]) => (
              <option key={reg} value={reg}>
                {reg} ({count})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Best Season Filter */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
        <div
          className="syne"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--ink4)",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Best Travel Season</span>
          {selectedSeason !== "all" && (
            <span
              onClick={() => setSelectedSeason("all")}
              style={{ fontSize: 10, color: "var(--cu)", cursor: "pointer", textTransform: "none", letterSpacing: 0 }}
            >
              Reset
            </span>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[
            { id: "all", label: "All Months" },
            { id: "year-round", label: "Year-round" },
            { id: "winter", label: "Winter (Oct-Mar)" },
            { id: "summer", label: "Summer (Apr-Jun)" },
            { id: "monsoon", label: "Monsoon (Jul-Sep)" },
          ].map((s) => {
            const isSel = selectedSeason === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSeason(s.id)}
                className="syne"
                style={{
                  padding: "7px 8px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  border: isSel ? "1.5px solid var(--gn)" : "1px solid var(--line2)",
                  background: isSel ? "var(--gn-gl)" : "#fff",
                  color: isSel ? "var(--gn2)" : "var(--ink3)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all .2s",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Star Rating Filter */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
        <div
          className="syne"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--ink4)",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Minimum Rating</span>
          {minRating > 0 && (
            <span
              onClick={() => setMinRating(0)}
              style={{ fontSize: 10, color: "var(--cu)", cursor: "pointer", textTransform: "none", letterSpacing: 0 }}
            >
              Reset
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { val: 0, label: "Any" },
            { val: 4.0, label: "4.0+" },
            { val: 4.5, label: "4.5+" },
            { val: 4.8, label: "4.8+" },
          ].map((r) => {
            const isSel = minRating === r.val;
            return (
              <button
                key={r.val}
                type="button"
                onClick={() => setMinRating(r.val)}
                className="syne"
                style={{
                  flex: 1,
                  padding: "7px 4px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  border: isSel ? "1.5px solid var(--cu)" : "1px solid var(--line2)",
                  background: isSel ? "rgba(245,166,35,.1)" : "#fff",
                  color: isSel ? "var(--cu)" : "var(--ink3)",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget per Person */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
        <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 12 }}>
          Budget per Person
        </div>
        <input
          type="range"
          min={30000}
          max={300000}
          step={5000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--gn)", cursor: "pointer", margin: "8px 0" }}
        />
        <div className="syne" style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink4)", fontWeight: 600 }}>
          <span>₹30,000</span>
          <span>₹3,00,000</span>
        </div>
        <div className="serif" style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: "var(--gn)", marginTop: 6 }}>
          Up to <span style={{ color: "var(--cu)" }}>{formatPrice(maxPrice)}</span>
        </div>
      </div>

      {/* Sort By */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
        <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 10 }}>
          Sort By
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "var(--iv)",
            border: "1.5px solid var(--line2)",
            borderRadius: 10,
            fontFamily: "var(--font-inter),'Inter',sans-serif",
            fontSize: 12.5,
            color: "var(--ink)",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Results Count Banner */}
      <div
        className="syne"
        style={{
          textAlign: "center",
          padding: "14px 20px",
          background: "var(--gn-gl)",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--gn2)",
        }}
      >
        <span style={{ color: "var(--cu)", fontWeight: 700 }}>{resultCount}</span> destinations found
      </div>
    </aside>
  );
}
