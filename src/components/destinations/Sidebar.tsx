"use client";

interface Props {
  checkedCats: string[];
  setCheckedCats: (cats: string[]) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  sort: string;
  setSort: (s: string) => void;
  resultCount: number;
  onClear: () => void;
}

const categories = [
  { value: "beach", icon: "beach_access", color: "var(--gd)", bg: "rgba(41,196,216,.1)", label: "Beach", count: "52" },
  { value: "mountain", icon: "landscape", color: "#4AC28A", bg: "rgba(74,194,138,.1)", label: "Mountain", count: "28" },
  { value: "city", icon: "location_city", color: "var(--cu)", bg: "rgba(245,166,35,.1)", label: "City", count: "64" },
  { value: "wildlife", icon: "forest", color: "#34d399", bg: "rgba(52,211,153,.1)", label: "Wildlife", count: "19" },
  { value: "adventure", icon: "hiking", color: "#f87171", bg: "rgba(220,80,80,.1)", label: "Adventure", count: "37" },
  { value: "cultural", icon: "museum", color: "#c4b5fd", bg: "rgba(167,139,250,.1)", label: "Cultural", count: "44" },
  { value: "tropical", icon: "sunny", color: "#fbbf24", bg: "rgba(251,191,36,.1)", label: "Tropical", count: "31" },
];

export default function Sidebar({ checkedCats, setCheckedCats, maxPrice, setMaxPrice, sort, setSort, resultCount, onClear }: Props) {
  const toggleCat = (val: string) => {
    setCheckedCats(checkedCats.includes(val) ? checkedCats.filter(c => c !== val) : [...checkedCats, val]);
  };

  const formatPrice = (v: number) => "₹" + new Intl.NumberFormat("en-IN").format(v);

  return (
    <aside className="rv" style={{ position: "sticky", top: 92, background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", overflow: "hidden" }}>
      {/* Head */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", display: "flex", alignItems: "center", gap: 8 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 17, color: "var(--gn2)" }}>tune</span>Filters
        </div>
        <span className="syne" onClick={onClear} style={{ fontSize: 11, fontWeight: 700, color: "var(--cu)", cursor: "pointer", letterSpacing: 0.5 }}>Clear All</span>
      </div>

      {/* Categories */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)" }}>
        <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 14 }}>Categories</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {categories.map((cat) => (
            <label key={cat.value} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 8px", borderRadius: 10, transition: "background .2s" }}>
              <input type="checkbox" checked={checkedCats.includes(cat.value)} onChange={() => toggleCat(cat.value)} style={{ width: 16, height: 16, accentColor: "var(--gn)", cursor: "pointer", flexShrink: 0 }} />
              <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: cat.bg }}>
                <span className="material-symbols-rounded" style={{ fontSize: 15, color: cat.color }}>{cat.icon}</span>
              </div>
              <span style={{ fontSize: 13, color: "var(--ink2)", fontWeight: 500 }}>{cat.label}</span>
              <span className="syne" style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink4)", background: "var(--iv2)", borderRadius: 50, padding: "2px 8px", fontWeight: 600 }}>{cat.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)" }}>
        <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 14 }}>Budget per Person</div>
        <input type="range" min={0} max={300000} step={5000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--gn)", cursor: "pointer", margin: "12px 0" }} />
        <div className="syne" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink3)", fontWeight: 600 }}>
          <span>₹0</span><span>₹3,00,000</span>
        </div>
        <div className="serif" style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: "var(--gn)", marginTop: 4 }}>
          Up to <span style={{ color: "var(--cu)" }}>{formatPrice(maxPrice)}</span>
        </div>
      </div>

      {/* Sort */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)" }}>
        <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 14 }}>Sort By</div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: "100%", padding: "11px 14px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: 13, color: "var(--ink)", outline: "none", cursor: "pointer" }}>
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Results count */}
      <div className="syne" style={{ textAlign: "center", padding: "14px 24px", background: "var(--gn-gl)", fontSize: 12, fontWeight: 600, color: "var(--gn2)" }}>
        <span style={{ color: "var(--cu)", fontWeight: 700 }}>{resultCount}</span> destinations found
      </div>
    </aside>
  );
}
