"use client";

interface WhyVisitEntry {
  icon: string;
  title: string;
  description: string;
}

interface WhyDubaiProps {
  destinationName?: string;
  whyVisit?: WhyVisitEntry[];
}

const ICON_ALIAS_MAP: Record<string, string> = {
  // Heritage & History
  heritage: "castle",
  history: "history_edu",
  historic: "history_edu",
  historical: "history_edu",
  culture: "history_edu",
  cultural: "history_edu",
  monument: "account_balance",
  monuments: "account_balance",
  palace: "castle",
  palaces: "castle",
  castle: "castle",
  castles: "castle",
  fort: "fort",
  forts: "fort",
  citadel: "fort",
  temple: "temple_hindu",
  temples: "temple_hindu",
  mandir: "temple_hindu",
  monastery: "temple_buddhist",
  mosque: "mosque",
  church: "church",
  museum: "museum",
  unesco: "castle",
  architecture: "architecture",
  ruins: "history_edu",

  // Food, Dining & Cuisine
  food: "restaurant",
  dining: "restaurant",
  cuisine: "restaurant",
  culinary: "restaurant",
  restaurant: "restaurant",
  restaurants: "restaurant",
  food_dining: "restaurant",
  eats: "restaurant",
  feast: "dinner_dining",
  dinner: "dinner_dining",
  lunch: "lunch_dining",
  breakfast: "bakery_dining",
  streetfood: "local_dining",
  street_food: "local_dining",
  cafe: "local_cafe",
  coffee: "local_cafe",
  tea: "local_cafe",
  drinks: "local_bar",
  drink: "local_bar",
  bar: "local_bar",
  wine: "wine_bar",
  vineyard: "wine_bar",
  ramen: "ramen_dining",
  fastfood: "fastfood",
  bakery: "bakery_dining",
  kebab: "restaurant",
  plov: "restaurant",

  // Nature, Landscapes & Outdoors
  nature: "landscape",
  mountain: "landscape",
  mountains: "landscape",
  peak: "landscape",
  peaks: "landscape",
  valley: "landscape",
  valleys: "landscape",
  hill: "terrain",
  hills: "terrain",
  forest: "forest",
  forests: "forest",
  jungle: "forest",
  woods: "forest",
  lake: "water",
  river: "water",
  waterfall: "water",
  waterfalls: "water",
  park: "park",
  national_park: "park",
  volcano: "volcano",
  sunrise: "flare",
  sunset: "flare",
  sun: "wb_sunny",
  sunny: "wb_sunny",
  snow: "ac_unit",
  winter: "ac_unit",
  ice: "ac_unit",
  sky: "nights_stay",
  night: "nights_stay",
  stargazing: "nights_stay",

  // Beaches, Islands & Water
  beach: "beach_access",
  beaches: "beach_access",
  coastal: "beach_access",
  coast: "beach_access",
  sea: "waves",
  ocean: "waves",
  waves: "waves",
  island: "beach_access",
  islands: "beach_access",
  surf: "surfing",
  surfing: "surfing",
  scuba: "scuba_diving",
  diving: "scuba_diving",
  snorkel: "scuba_diving",
  kayak: "kayaking",
  kayaking: "kayaking",
  boat: "directions_boat",
  boating: "directions_boat",
  yacht: "sailing",
  cruise: "sailing",
  sailing: "sailing",
  pool: "pool",
  hot_spring: "water_lux",

  // Adventure & Activities
  adventure: "explore",
  explore: "explore",
  safari: "pets",
  wildlife: "pets",
  animals: "pets",
  animal: "pets",
  fauna: "cruelty_free",
  birding: "cruelty_free",
  birds: "cruelty_free",
  trek: "hiking",
  trekking: "hiking",
  hike: "hiking",
  hiking: "hiking",
  trail: "hiking",
  trails: "hiking",
  paragliding: "paragliding",
  ski: "downhill_skiing",
  skiing: "downhill_skiing",
  snowboard: "snowboarding",
  snowboarding: "snowboarding",
  camping: "camping",
  camp: "camping",
  glamping: "camping",
  bike: "directions_bike",
  cycling: "directions_bike",
  atv: "sports_motorsports",
  quad: "sports_motorsports",
  dune: "sports_motorsports",
  motorsport: "sports_motorsports",

  // Stays & Luxury
  stay: "bed",
  stays: "bed",
  hotel: "hotel",
  hotels: "hotel",
  resort: "hotel_class",
  resorts: "hotel_class",
  luxury: "diamond",
  vip: "diamond",
  diamond: "diamond",
  cottage: "cottage",
  chalet: "chalet",
  suite: "apartment",
  spa: "spa",
  wellness: "spa",
  ayurveda: "spa",
  massage: "spa",
  yoga: "fitness_center",
  meditation: "fitness_center",

  // Transit, Shopping & Entertainment
  flight: "flight",
  plane: "flight",
  transit: "connecting_airports",
  airport: "connecting_airports",
  train: "train",
  bus: "directions_bus",
  car: "directions_car",
  drive: "directions_car",
  shopping: "shopping_bag",
  shop: "shopping_bag",
  market: "shopping_bag",
  bazaar: "shopping_bag",
  mall: "local_mall",
  theme_park: "attractions",
  festival: "festival",
  celebration: "celebration",
  party: "celebration",
  nightlife: "nightlife",
  club: "nightlife",

  // Badges & Vibes
  star: "stars",
  stars: "stars",
  budget: "savings",
  savings: "savings",
  verified: "verified",
  favorite: "favorite",
  highlight: "auto_awesome",
  magic: "auto_awesome",
  photo: "camera_alt",
  photography: "camera_alt",
  viewpoint: "visibility",
};

function resolveWhyVisitIcon(rawIcon?: string, title?: string, description?: string): string {
  const clean = rawIcon ? rawIcon.trim().toLowerCase().replace(/[\s-]+/g, "_") : "";

  // 1. Direct dictionary match
  if (clean && ICON_ALIAS_MAP[clean]) {
    return ICON_ALIAS_MAP[clean];
  }

  // 2. If it is already a clean Material Symbol ligature name
  if (clean && /^[a-z0-9_]{3,30}$/.test(clean)) {
    return clean;
  }

  // 3. Smart content detection based on Title and Description
  const text = `${title || ""} ${description || ""}`.toLowerCase();

  if (/culinary|food|dining|cuisine|restaurant|kebab|plov|dish|taste|flavor|tea|wine|chef|gourmet|eat|breakfast|lunch|dinner/.test(text)) {
    return "restaurant";
  }
  if (/walled|old city|heritage|unesco|ancient|castle|fort|palace|citadel|monument|historic|history|mosque|temple|caravanserai|medieval|ruins/.test(text)) {
    return "castle";
  }
  if (/mountain|peak|valley|himalaya|alps|alpine|nature|greenery|forest|woods|jungle|scenic|terrains|hills/.test(text)) {
    return "landscape";
  }
  if (/beach|sea|ocean|coast|sand|waves|coral|island|reef|tropical|marine|diving|snorkel/.test(text)) {
    return "beach_access";
  }
  if (/trek|hike|hiking|trail|paragliding|adventure|safari|expedition|thrill|climb|rafting/.test(text)) {
    return "hiking";
  }
  if (/wildlife|tiger|lion|bird|animal|fauna|sanctuary|conservation/.test(text)) {
    return "pets";
  }
  if (/snow|ski|winter|ice|freeze|snowflake|chill|glacier/.test(text)) {
    return "ac_unit";
  }
  if (/spa|wellness|ayurveda|massage|relax|yoga|retreat|serenity/.test(text)) {
    return "spa";
  }
  if (/shopping|bazaar|market|mall|souvenir|boutique/.test(text)) {
    return "shopping_bag";
  }
  if (/nightlife|club|party|cocktail|pub|bar|dance/.test(text)) {
    return "nightlife";
  }

  return "explore";
}

export default function WhyDubai({ destinationName = "Dubai", whyVisit }: WhyDubaiProps) {
  if (!whyVisit || whyVisit.length === 0) return null;

  return (
    <section id="why-dubai" style={{ padding: "80px 0", background: "var(--iv2)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
        <div className="rv" style={{ textAlign: "center" }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />Know Before You Go
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 10 }}>
            Why <em style={{ fontStyle: "italic", color: "var(--gd)" }}>{destinationName}?</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink3)", lineHeight: 1.7, maxWidth: 560, margin: "10px auto 0" }}>Everything you need to know before your {destinationName} adventure.</p>
        </div>

        <div className="wd-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(whyVisit.length, 4)}, 1fr)`, gap: 24, marginTop: 48 }}>
          {whyVisit.map((c, i) => {
            const iconName = resolveWhyVisitIcon(c.icon, c.title, c.description);
            return (
              <div key={i} className="rv wd-card-item" style={{ background: "#fff", borderRadius: "var(--r-xl)", padding: "36px 28px", textAlign: "center", boxShadow: "var(--sh)", transition: "var(--tr)", border: "1.5px solid transparent" }}>
                <div className="wd-icon-wrap" style={{ width: 64, height: 64, borderRadius: 18, background: "var(--gn-gl)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", transition: "var(--tr)" }}>
                  <span
                    className="material-symbols-rounded wd-icon-span"
                    style={{
                      fontSize: 32,
                      color: "var(--gn)",
                      transition: "var(--tr)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {iconName}
                  </span>
                </div>
                <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>{c.title}</div>
                <p style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.65 }}>{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .wd-card-item:hover { transform: translateY(-6px); box-shadow: var(--sh-lg); border-color: var(--iv3) !important; }
        .wd-card-item:hover .wd-icon-wrap { background: var(--gn) !important; }
        .wd-card-item:hover .wd-icon-span { color: #fff !important; }
        @media (max-width: 1100px) { .wd-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .wd-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
