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

function TravelIcon({ iconName }: { iconName: string }) {
  const norm = iconName.toLowerCase().trim();

  // 1. Heritage, Castle, Fort, Monument, UNESCO
  if (["castle", "fort", "account_balance", "heritage", "history_edu", "museum", "architecture"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l3-2 3 2v14M13 21V7l3-2 3 2v14M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
        <path d="M7 11h.01M17 11h.01" />
      </svg>
    );
  }

  // 2. Food, Dining, Restaurant, Culinary, Cuisine
  if (["restaurant", "food", "dinner_dining", "local_dining", "lunch_dining", "ramen_dining", "fastfood", "bakery_dining"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2M15 11v11M5 2v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2M7 12v10" />
      </svg>
    );
  }

  // 3. Nature, Mountain, Landscape, Terrains
  if (["landscape", "terrain", "forest", "nature", "volcano"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <circle cx="17.5" cy="6.5" r="2.5" />
      </svg>
    );
  }

  // 4. Beach, Sea, Waves, Island
  if (["beach_access", "waves", "surfing", "scuba_diving", "kayaking", "sailing", "pool"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M12 2a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9zM2 19c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      </svg>
    );
  }

  // 5. Adventure, Hiking, Trekking, Expedition
  if (["hiking", "explore", "downhill_skiing", "snowboarding", "camping", "directions_bike", "sports_motorsports"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.2" />
      </svg>
    );
  }

  // 6. Hotel, Stays, Bed, Luxury
  if (["hotel", "bed", "hotel_class", "apartment", "chalet", "cottage"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
      </svg>
    );
  }

  // 7. Spa, Wellness, Ayurveda
  if (["spa", "fitness_center", "water_lux"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    );
  }

  // 8. Flight & Transit
  if (["flight", "connecting_airports", "train", "directions_bus", "directions_car", "directions_boat"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
      </svg>
    );
  }

  // 9. Shopping & Souvenirs
  if (["shopping_bag", "local_mall"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }

  // 10. Star, Diamond, Highlights
  if (["stars", "diamond", "auto_awesome", "favorite", "verified"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" fillOpacity="0.2" />
      </svg>
    );
  }

  // 11. Photo & Cameras
  if (["camera_alt", "photo", "visibility"].includes(norm)) {
    return (
      <svg className="wd-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    );
  }

  // Fallback to Google Material Symbols ligature font if custom or unknown
  return (
    <span
      className="material-symbols-rounded wd-icon-span"
      style={{
        fontSize: 32,
        color: "currentColor",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {iconName}
    </span>
  );
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
                <div className="wd-icon-wrap" style={{ width: 64, height: 64, borderRadius: 18, background: "var(--gn-gl)", color: "var(--gn)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", transition: "var(--tr)" }}>
                  <TravelIcon iconName={iconName} />
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
        .wd-card-item:hover .wd-icon-wrap { background: var(--gn) !important; color: #fff !important; }
        .wd-card-item:hover .wd-icon-span, .wd-card-item:hover .wd-icon-svg { color: #fff !important; }
        @media (max-width: 1100px) { .wd-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .wd-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
