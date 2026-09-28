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

const FALLBACK_ICON_ALIASES: Record<string, string> = {
  heritage: "castle",
  food: "restaurant",
  cuisine: "restaurant",
  culinary: "restaurant",
  dining: "restaurant",
  culture: "history_edu",
  historic: "history_edu",
  streetfood: "local_dining",
  street_food: "local_dining",
};

export function resolveWhyVisitIcon(rawIcon?: string, title?: string, description?: string): string {
  const clean = rawIcon ? rawIcon.trim().toLowerCase().replace(/[\s-]+/g, "_") : "";

  // 1. If clean icon is a legacy non-standard word (like "heritage" or "food"), map to its valid symbol
  if (clean && FALLBACK_ICON_ALIASES[clean]) {
    return FALLBACK_ICON_ALIASES[clean];
  }

  // 2. If the user selected an icon from the picker, PRESERVE IT 100%!
  if (clean) {
    return clean;
  }

  // 3. ONLY if NO icon was selected (empty or missing), infer a default from title & description
  const text = `${title || ""} ${description || ""}`.toLowerCase();

  if (/culinary|food|dining|cuisine|restaurant|kebab|plov|dish|taste|flavor|tea|wine|chef|gourmet|eat/.test(text)) {
    return "restaurant";
  }
  if (/walled|old city|heritage|unesco|ancient|castle|fort|palace|citadel|monument|historic|history|mosque|temple|caravanserai/.test(text)) {
    return "castle";
  }
  if (/mountain|peak|valley|himalaya|alps|alpine|nature|greenery|forest|woods|jungle|scenic|hills/.test(text)) {
    return "landscape";
  }
  if (/beach|sea|ocean|coast|sand|waves|coral|island|reef|tropical|marine/.test(text)) {
    return "beach_access";
  }
  if (/trek|hike|hiking|trail|paragliding|adventure|safari|expedition|thrill|climb/.test(text)) {
    return "hiking";
  }
  if (/wildlife|tiger|lion|bird|animal|fauna|sanctuary/.test(text)) {
    return "pets";
  }
  if (/snow|ski|winter|ice|freeze|snowflake/.test(text)) {
    return "ac_unit";
  }
  if (/spa|wellness|ayurveda|massage|relax|yoga/.test(text)) {
    return "spa";
  }
  if (/shopping|bazaar|market|mall|souvenir/.test(text)) {
    return "shopping_bag";
  }
  if (/nightlife|club|party|cocktail|pub|bar/.test(text)) {
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
                <div className="wd-icon-wrap" style={{ width: 64, height: 64, borderRadius: 18, background: "var(--gn-gl)", color: "var(--gn)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", transition: "var(--tr)" }}>
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
        .wd-card-item:hover .wd-icon-span { color: #fff !important; }
        @media (max-width: 1100px) { .wd-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .wd-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
