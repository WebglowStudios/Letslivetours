"use client";

import { useState } from "react";

interface PackageTabsProps {
  pkg: any;
  selectedHotelOptions?: Record<number, string>;
  onSelectHotelOption?: (stayIndex: number, optionId: string) => void;
}

/* ── BADGE STYLES ── */
const badgeStyles: Record<string, React.CSSProperties> = {
  day: { background: "var(--gn)", color: "#fff" },
  activity: { background: "var(--cu-gl)", color: "var(--cu-d)" },
  stay: { background: "rgba(41,196,216,.12)", color: "var(--gn2)" },
  transfer: { background: "var(--gn-gl)", color: "var(--gn)" },
  flight: { background: "#e0e7ff", color: "#4338ca" },
};

/* ── HELPER: Dynamic Vehicle Icon ── */
function getVehicleIcon(type?: string): string {
  const t = (type || "").toLowerCase();
  if (t.includes("flight") || t.includes("plane") || t.includes("air")) return "flight";
  if (t.includes("train") || t.includes("rail")) return "train";
  if (t.includes("boat") || t.includes("ferry") || t.includes("ship") || t.includes("cruise") || t.includes("speed boat") || t.includes("speed-boat")) return "directions_boat";
  if (t.includes("bus") || t.includes("coach")) return "directions_bus";
  return "directions_car"; // default
}

function parseBulletPoints(text: string | null | undefined): { isList: boolean; items: string[] } {
  if (!text) return { isList: false, items: [] };

  const raw = String(text).trim();
  if (!raw) return { isList: false, items: [] };

  const hasBulletChar = /[•●▪■]/.test(raw);
  const hasNewlines = raw.includes("\n") || raw.includes("\\n");

  if (!hasBulletChar && !hasNewlines) {
    return { isList: false, items: [raw] };
  }

  const parts = raw
    .split(/(?:\s*[•●▪■]\s*|\\r\\n|\\n|\\r|[\r\n]+)/)
    .map((s) => s.replace(/^[•\-\*\s–—:]+/, "").trim())
    .filter((s) => s.length > 2);

  if (parts.length > 1 || (parts.length === 1 && (hasBulletChar || raw.startsWith("•")))) {
    return { isList: true, items: parts };
  }

  return { isList: false, items: [raw] };
}

function computeDate(startDate?: string | Date, dayNum: number = 1): string {
  if (!startDate) return "";
  try {
    const d = new Date(startDate);
    if (isNaN(d.getTime())) return "";
    d.setDate(d.getDate() + Math.max(0, dayNum - 1));
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
}

export interface StayDateInfo {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  checkInStr: string;
  checkOutStr: string;
  checkInShort: string;
  checkOutShort: string;
  startDay: number;
  endDay: number;
  nights: number;
  hasDates: boolean;
}

export function resolveStayDates(stay: any, accumulatedNights: number, startDate?: string | Date): StayDateInfo {
  const nights = Math.max(1, stay?.nights || 1);
  const startDay = stay?.day || (accumulatedNights + 1);
  const endDay = startDay + nights;

  let checkInDate: Date | null = null;
  let checkOutDate: Date | null = null;

  // 1. Check if stay has explicit checkIn & checkOut
  if (stay?.checkIn) {
    const parsed = new Date(stay.checkIn);
    if (!isNaN(parsed.getTime())) {
      checkInDate = parsed;
    }
  }
  if (stay?.checkOut) {
    const parsed = new Date(stay.checkOut);
    if (!isNaN(parsed.getTime())) {
      checkOutDate = parsed;
    }
  }

  // 2. If no explicit dates, calculate from package travel startDate
  if (!checkInDate && startDate) {
    const s = new Date(startDate);
    if (!isNaN(s.getTime())) {
      const offsetDays = stay?.day ? Math.max(0, stay.day - 1) : accumulatedNights;
      s.setDate(s.getDate() + offsetDays);
      checkInDate = s;
    }
  }

  if (checkInDate && !checkOutDate) {
    const e = new Date(checkInDate);
    e.setDate(e.getDate() + nights);
    checkOutDate = e;
  }

  if (checkInDate && checkOutDate) {
    const inShort = checkInDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    const outShort = checkOutDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    const inFull = checkInDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    const outFull = checkOutDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

    return {
      checkInDate,
      checkOutDate,
      checkInStr: inFull,
      checkOutStr: outFull,
      checkInShort: inShort,
      checkOutShort: outShort,
      startDay,
      endDay,
      nights,
      hasDates: true,
    };
  }

  return {
    checkInDate: null,
    checkOutDate: null,
    checkInStr: "",
    checkOutStr: "",
    checkInShort: "",
    checkOutShort: "",
    startDay,
    endDay,
    nights,
    hasDates: false,
  };
}

function computeStayDateRange(startDate?: string | Date, startOffsetDays: number = 0, nights: number = 1): string {
  const info = resolveStayDates({ nights }, startOffsetDays, startDate);
  if (info.hasDates) {
    return `${info.checkInShort} – ${info.checkOutShort} (${nights}N)`;
  }
  return `Day ${info.startDay} – Day ${info.endDay} (${nights}N)`;
}

/* ── ACCORDION ITEM ── */
function AccordionItem({
  item,
  isOpen,
  onToggle,
  onImageClick,
}: {
  item: { badge: string; badgeType?: string; title: string; content: string; dateStr?: string };
  isOpen: boolean;
  onToggle: () => void;
  onImageClick?: (images: string[], idx: number) => void;
}) {
  const handleBodyClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG" && target.hasAttribute("data-lightbox")) {
      // Day-level slider images
      const daySlider = target.closest("[id^='day-sl-']");
      if (daySlider && onImageClick) {
        const imgs = Array.from(daySlider.querySelectorAll(".day-sl-img")).map((img) => img.getAttribute("src") || "");
        const src = target.getAttribute("src") || "";
        const idx = imgs.indexOf(src);
        onImageClick(imgs, idx >= 0 ? idx : 0);
        return;
      }
      // Legacy image containers
      const container = target.closest(".acc-images") || target.closest(".act-images");
      if (container && onImageClick) {
        const imgs = Array.from(container.querySelectorAll("img")).map((img) => img.getAttribute("src") || "");
        const idx = imgs.indexOf(target.getAttribute("src") || "");
        onImageClick(imgs, idx >= 0 ? idx : 0);
      } else if (onImageClick) {
        const src = target.getAttribute("src") || "";
        onImageClick([src], 0);
      }
    }
  };
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--r)",
        border: `1.5px solid ${isOpen ? "var(--gn3)" : "var(--line)"}`,
        overflow: "hidden",
        transition: "var(--tr)",
        boxShadow: isOpen ? "var(--sh)" : "none",
        minWidth: 0,
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={onToggle}
        className="itin-card-header"
      >
        <div className="itin-card-meta">
          <div className="itin-card-badges">
            <span
              className="syne"
              style={{
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                padding: "3.5px 11px",
                borderRadius: 50,
                whiteSpace: "nowrap",
                flexShrink: 0,
                ...(badgeStyles[item.badgeType || "day"] || badgeStyles.day),
              }}
            >
              {item.badge}
            </span>
            {item.dateStr && (
              <span
                className="syne"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#0284c7",
                  background: "rgba(14, 165, 233, 0.09)",
                  border: "1px solid rgba(14, 165, 233, 0.22)",
                  padding: "2.5px 9px",
                  borderRadius: 50,
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 13, color: "#0284c7" }}>calendar_month</span>
                {item.dateStr}
              </span>
            )}
          </div>
          <span
            className="syne itin-card-title"
            style={{
              color: isOpen ? "var(--gn)" : "var(--ink)",
            }}
          >
            {item.badgeType === 'flight' && (
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn3)", flexShrink: 0 }}>flight_takeoff</span>
            )}
            <span style={{ flex: 1, minWidth: 0, wordBreak: "break-word", overflowWrap: "anywhere" }}>
              {item.title}
            </span>
          </span>
        </div>
        <div
          className="itin-card-toggle"
          style={{
            background: isOpen ? "var(--gn)" : "var(--gn-gl)",
            transform: isOpen ? "rotate(45deg)" : "none",
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 16, color: isOpen ? "#fff" : "var(--gn)", transition: "var(--tr)" }}
          >
            add
          </span>
        </div>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows .35s ease",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div
            style={{
              padding: "0 18px 18px",
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--ink2)",
              borderTop: "1px solid var(--line2)",
              paddingTop: 14,
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              minWidth: 0,
            }}
            onClick={handleBodyClick}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Shared: styled bullet list ── */
function buildBulletList(items: string[], accentColor = "var(--cu)"): string {
  return `<ul style="display:flex;flex-direction:column;gap:8px;margin:10px 0 4px;padding:0;list-style:none">${items
    .map(
      (item) =>
        `<li style="display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--ink2);line-height:1.65;min-width:0">
          <span style="width:7px;height:7px;border-radius:50%;background:${accentColor};flex-shrink:0;margin-top:6px"></span>
          <span style="flex:1;min-width:0;word-break:break-word;overflow-wrap:anywhere">${item}</span>
        </li>`
    )
    .join("")}</ul>`;
}

/* ── Shared: styled activities list with linked images ── */
function buildActivitiesList(
  activities: (string | any)[],
  accentColor = "var(--cu)",
  imageMap?: Record<string, string>
): string {
  if (!activities || activities.length === 0) return "";

  return `<div class="act-list" style="display:flex;flex-direction:column;gap:10px;margin:10px 0 6px">${activities
    .map((act) => {
      const isString = typeof act === "string";
      const title = isString ? act : (act.title || act.name || "");
      const desc = !isString ? act.description : undefined;
      const rawImages: string[] = !isString
        ? (act.images && act.images.length > 0 ? act.images : (act.image ? [act.image] : []))
        : [];
      const img = rawImages.filter(Boolean)[0] || "";

      // Shared card shell — no image (images are in the day slider)
      return `<div style="display:flex;align-items:flex-start;gap:8px;padding:6px 2px;min-width:0">
        <span style="width:7px;height:7px;border-radius:50%;background:${accentColor};flex-shrink:0;margin-top:5px"></span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13.5px;font-weight:600;color:var(--ink);line-height:1.4;word-break:break-word;overflow-wrap:anywhere">${title}</div>
          ${desc ? `<p style="font-size:12.5px;color:var(--ink3);margin-top:3px;line-height:1.5;word-break:break-word;overflow-wrap:anywhere">${desc}</p>` : ""}
        </div>
      </div>`;
    })
    .join("")}</div>`;
}

/* ── Shared: styled recommendations in an orange thought bubble with mascot bird ── */
function buildRecommendationsList(
  recommendations: (string | any)[]
): string {
  if (!recommendations || recommendations.length === 0) return "";

  const items = recommendations
    .map((rec) => (typeof rec === "string" ? rec : (rec.title || rec.name || "")).trim())
    .filter(Boolean);

  if (items.length === 0) return "";

  // Collect images with labels for the carousel
  const recImages: { src: string; label?: string }[] = [];
  recommendations.forEach((rec) => {
    if (typeof rec !== "string") {
      const label = (rec.title || rec.name || "").trim() || undefined;
      if (rec.images && rec.images.length > 0) {
        rec.images.filter(Boolean).forEach((src: string) => recImages.push({ src, label }));
      } else if (rec.image) {
        recImages.push({ src: rec.image, label });
      }
    }
  });

  return `
  <div class="recommendations-thought-wrap" style="margin: 20px 0 16px; position: relative;">
    <!-- Orange Thought Bubble Box -->
    <div style="background: #fffaf5; border: 2px solid #f97316; border-radius: 22px; padding: 18px 22px 14px; box-shadow: 0 4px 18px rgba(249, 115, 22, 0.08); position: relative;">
      <!-- Title -->
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 16px; line-height: 1;">&#x1F4AD;</span>
        <span style="font-size: 13px; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 0.8px;">
          Recommended for this Day
        </span>
      </div>

      ${recImages.length > 0 ? buildDayImageSlider(recImages) : ""}

      <!-- Bullet Points List -->
      <ul style="margin: 0 0 14px 0; padding-left: 20px; list-style-type: disc;">
        ${items
          .map(
            (item) =>
              `<li style="font-size: 13.5px; color: var(--ink, #1e293b); line-height: 1.6; margin-bottom: 6px;">${item}</li>`
          )
          .join("")}
      </ul>

      <!-- Disclaimer at the bottom -->
      <div style="font-size: 11px; color: #9a3412; border-top: 1px dashed #fed7aa; padding-top: 8px; line-height: 1.45; display: flex; align-items: flex-start; gap: 6px;">
        <span class="material-symbols-rounded" style="font-size: 14px; color: #ea580c; flex-shrink: 0; margin-top: 1px;">info</span>
        <span>These recommendations are not included in the package. We are just listing them for your free time.</span>
      </div>
    </div>

    <!-- Bottom-Left Thought Trail & Mascot Bird (Thinking) -->
    <div style="display: flex; align-items: flex-start; gap: 10px; margin-left: 24px; margin-top: -3px;">
      <!-- Trailing Thought Circles from Bubble to Bird -->
      <div style="display: flex; flex-direction: column; align-items: center; gap: 3px;">
        <span style="width: 14px; height: 14px; border-radius: 50%; background: #fffaf5; border: 2px solid #f97316; display: block; box-shadow: 0 2px 4px rgba(249, 115, 22, 0.08);"></span>
        <span style="width: 9px; height: 9px; border-radius: 50%; background: #fffaf5; border: 2px solid #f97316; display: block;"></span>
        <span style="width: 5px; height: 5px; border-radius: 50%; background: #f97316; display: block; margin-bottom: 2px;"></span>

        <!-- Mascot Bird Image -->
        <img
          src="/bird.png"
          alt="Company Mascot Bird"
          class="mascot-bird"
          style="width: 52px; height: 52px; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.12)); display: block;"
          onerror="this.onerror=null; this.src='/bird.png';"
        />
      </div>
      <div style="margin-top: 36px;">
        <span style="font-size: 11px; font-weight: 700; color: #ea580c; letter-spacing: 0.3px; font-style: italic; opacity: 0.9;">
          Mascot's Thoughts
        </span>
      </div>
    </div>
  </div>`;
}

/* ── Shared: section label ── */
function sectionLabel(icon: string, text: string): string {
  return `<div style="display:flex;align-items:center;gap:7px;margin:14px 0 6px">
    <span class="material-symbols-rounded" style="font-size:15px;color:var(--gn3)">${icon}</span>
    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--ink3)">${text}</span>
  </div>`;
}

/* ── Day-level horizontal image slider ── */
let _daySliderIdx = 0;
function buildDayImageSlider(images: { src: string; label?: string }[]): string {
  if (!images || images.length === 0) return "";
  const id = `day-sl-${_daySliderIdx++}`;
  const trackId = `${id}-track`;
  const total = images.length;

  const nav = (dir: 1 | -1) =>
    `(function(){
      var wrap=document.getElementById('${id}');
      var track=document.getElementById('${trackId}');
      if(!wrap||!track)return;
      var total=${total};
      var cur=parseInt(wrap.getAttribute('data-cur')||'0');
      var next=Math.min(Math.max(cur+${dir},0),total-1);
      wrap.setAttribute('data-cur',next);
      var slideW=track.children[0]?track.children[0].offsetWidth+10:150;
      track.style.transform='translateX(-'+(next*slideW)+'px)';
      var ctr=wrap.querySelector('.day-sl-ctr');
      if(ctr)ctr.textContent=(next+1)+'/${total}';
    })()`;

  return `<div id="${id}" data-cur="0" style="position:relative;margin:10px 0 16px;overflow:hidden;border-radius:12px">
    <div id="${trackId}" style="display:flex;gap:10px;padding:0 4px;transition:transform .35s ease;will-change:transform">
      ${images.map(({ src, label }, i) =>
        `<div style="position:relative;min-width:calc(45% - 6px);max-width:calc(45% - 6px);flex-shrink:0;border-radius:12px;overflow:hidden">
          <img src="${src}" alt="${label || 'Day photo'}" class="day-sl-img" data-lightbox data-idx="${i}"
            style="width:100%;height:180px;object-fit:cover;display:block;cursor:pointer;" />
          ${label ? `<div style="position:absolute;bottom:0;left:0;right:0;
            background:linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 100%);
            padding:20px 10px 8px;pointer-events:none">
            <span style="color:#fff;font-size:11.5px;font-weight:600;line-height:1.3;display:block;
              text-shadow:0 1px 3px rgba(0,0,0,.4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${label}</span>
          </div>` : ""}
        </div>`
      ).join("")}
    </div>
    ${total > 1 ? `
    <button style="position:absolute;left:8px;top:50%;transform:translateY(-50%);width:30px;height:30px;
      border-radius:50%;background:rgba(0,0,0,.6);border:none;cursor:pointer;display:flex;
      align-items:center;justify-content:center;color:#fff;backdrop-filter:blur(4px);z-index:2;"
      onclick="${nav(-1)}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);width:30px;height:30px;
      border-radius:50%;background:rgba(0,0,0,.6);border:none;cursor:pointer;display:flex;
      align-items:center;justify-content:center;color:#fff;backdrop-filter:blur(4px);z-index:2;"
      onclick="${nav(1)}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <span style="position:absolute;top:8px;right:10px;background:rgba(0,0,0,.6);color:#fff;font-size:10px;
      font-weight:600;padding:2px 8px;border-radius:20px;backdrop-filter:blur(4px);pointer-events:none;z-index:2">
      <span class="day-sl-ctr">1/${total}</span>
    </span>` : ""}
  </div>`;
}

/* ── Helper: build HTML content for a flight or train ── */
function buildFlightContent(flight: any, hideHeader: boolean = false, flightDate?: string): string {
  const isTrain = (flight.type ?? "flight") === "train";
  const icon = isTrain ? "train" : "flight_takeoff";
  const iconColor = isTrain ? "#c2410c" : "#4338ca";
  let html = `<div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px">`;
  
  if (!hideHeader) {
    html += `<span class="material-symbols-rounded" style="font-size:24px;color:${iconColor}">${icon}</span>`;
    html += `<div style="flex:1">`;
    html += `<p style="font-size:15px;font-weight:700;color:var(--ink)">${flight.airline || (isTrain ? "Train" : "Flight")} <span style="color:var(--ink3);font-weight:500">${flight.flightNumber || ""}</span>${flightDate ? ` <span style="font-size:11.5px;font-weight:700;color:var(--cu-d);background:rgba(245,166,35,.12);padding:2px 8px;border-radius:6px;margin-left:8px">📅 ${flightDate}</span>` : ""}</p>`;
  } else {
    html += `<div style="flex:1">`;
    if (flightDate) {
      html += `<p style="font-size:11.5px;font-weight:700;color:var(--cu-d);margin-bottom:6px">📅 Travel Date: ${flightDate}</p>`;
    }
  }
  
  if (flight.class) html += `<p style="font-size:12px;color:var(--ink4)">${isTrain ? "Train Class" : "Cabin Class"}: <strong>${flight.class}</strong></p>`;

  html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;background:var(--iv);border-radius:10px;padding:12px 14px;border:1px solid var(--line);flex-wrap:wrap;gap:10px;min-width:0">`;
  html += `<div style="flex:1;min-width:110px"><p style="font-size:10px;color:var(--ink4);text-transform:uppercase;letter-spacing:1px;font-weight:700">Departure</p><p style="font-size:15px;font-weight:700;color:var(--ink);word-break:break-word;margin:2px 0">${flight.departure || "Scheduled"}</p><p style="font-size:12.5px;font-weight:500;color:var(--ink2);word-break:break-word">${flight.from}</p></div>`;
  
  html += `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;min-width:50px"><span class="material-symbols-rounded" style="font-size:18px;color:${iconColor}">${icon}</span><span style="font-size:9.5px;font-weight:700;color:var(--ink4);text-transform:uppercase">Transit</span></div>`;

  html += `<div style="text-align:right;flex:1;min-width:110px"><p style="font-size:10px;color:var(--ink4);text-transform:uppercase;letter-spacing:1px;font-weight:700">Arrival</p><p style="font-size:15px;font-weight:700;color:var(--ink);word-break:break-word;margin:2px 0">${flight.arrival || "Scheduled"}</p><p style="font-size:12.5px;font-weight:500;color:var(--ink2);word-break:break-word">${flight.to}</p></div>`;
  html += `</div>`;

  if (flight.pnr) {
    html += `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,.12);color:#065f46;border:1px solid rgba(16,185,129,.25);padding:4px 10px;border-radius:6px;font-size:12px;font-weight:700;margin-top:12px;margin-bottom:0;max-width:100%;word-break:break-word">PNR: ${flight.pnr}</div>`;
  }
  if (flight.notes) {
    html += `<p style="font-size:12px;color:var(--ink2);margin-top:8px;word-break:break-word;line-height:1.5">🧳 <strong>Baggage & Notes:</strong> ${flight.notes}</p>`;
  }
  html += `</div></div>`;
  return html;
}

/* ── Helper: build HTML content for an itinerary day ── */
function buildItineraryContent(day: any, dayFlights: any[] = [], imageMap?: Record<string, string>, dateStr?: string): string {
  let html = "";
  if (dateStr) {
    html += `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(14,165,233,.09);color:#0284c7;border:1px solid rgba(14,165,233,.22);padding:4px 12px;border-radius:50px;font-size:11.5px;font-weight:700;margin-bottom:14px">
      <span class="material-symbols-rounded" style="font-size:14px;color:#0284c7">calendar_month</span>
      <span>${dateStr}</span>
    </div>`;
  }
  const dayActualFlights = dayFlights.filter((f: any) => (f.type ?? "flight") === "flight");
  const dayTrains = dayFlights.filter((f: any) => f.type === "train");
  if (dayActualFlights.length > 0) {
    html += sectionLabel("flight_takeoff", "Scheduled Flights");
    html += `<div style="margin-bottom:16px">`;
    dayActualFlights.forEach((flight) => {
      html += `<div style="border:1.5px solid #e0e7ff;border-radius:12px;padding:12px;margin-bottom:10px;background:#fff">`;
      html += buildFlightContent(flight, false, dateStr);
      html += `</div>`;
    });
    html += `</div>`;
  }
  if (dayTrains.length > 0) {
    html += sectionLabel("train", "Scheduled Trains");
    html += `<div style="margin-bottom:16px">`;
    dayTrains.forEach((train) => {
      html += `<div style="border:1.5px solid #fed7aa;border-radius:12px;padding:12px;margin-bottom:10px;background:#fff">`;
      html += buildFlightContent(train, false, dateStr);
      html += `</div>`;
    });
    html += `</div>`;
  }
  if (day.description) {
    const { isList, items } = parseBulletPoints(day.description);
    if (isList && items.length > 1) {
      html += `<ul style="display:flex;flex-direction:column;gap:8px;margin:8px 0 14px;padding:0;list-style:none">`;
      items.forEach((item) => {
        html += `<li style="display:flex;align-items:flex-start;gap:9px;font-size:13.5px;color:var(--ink3);line-height:1.6">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--cu);flex-shrink:0;margin-top:7px"></span>
          <span style="flex:1;min-width:0">${item}</span>
        </li>`;
      });
      html += `</ul>`;
    } else {
      html += `<p style="margin-bottom:10px">${items[0] || day.description}</p>`;
    }
  }
  // Collect all activity images + day.images for the slider (with labels)
  const allDayImages: { src: string; label?: string }[] = [];
  if (day.activities && day.activities.length > 0) {
    day.activities.forEach((act: any) => {
      if (typeof act !== "string") {
        const label = act.title || act.name || undefined;
        if (act.images && act.images.length > 0) {
          act.images.filter(Boolean).forEach((src: string) => allDayImages.push({ src, label }));
        } else if (act.image) {
          allDayImages.push({ src: act.image, label });
        }
      }
    });
  }
  if (day.images && day.images.length > 0) {
    day.images.filter(Boolean).forEach((src: string) => allDayImages.push({ src }));
  }

  if (day.activities && day.activities.length > 0) {
    html += sectionLabel("directions_walk", "Activities");
    if (allDayImages.length > 0) {
      html += buildDayImageSlider(allDayImages);
    }
    html += buildActivitiesList(day.activities, "var(--cu)", imageMap);
  }
  if (day.recommendations && day.recommendations.length > 0) {
    html += buildRecommendationsList(day.recommendations);
  }
  if (day.meals && day.meals.length > 0) {
    html += sectionLabel("restaurant", "Meals Included");
    html += `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px">${day.meals
      .map(
        (m: string) =>
          `<span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;background:rgba(41,196,216,.1);color:var(--gn2);padding:5px 12px;border-radius:6px">${m}</span>`
      )
      .join("")}</div>`;
  }
  if (day.accommodation) {
    html += sectionLabel("hotel", "Accommodation");
    html += `<p style="font-size:13.5px;color:var(--ink2);margin-bottom:4px">${day.accommodation}</p>`;
  }
  return html;
}


/* ── Helper: build HTML content for stays ── */
function buildStayContent(stay: any, dateInfo?: StayDateInfo): string {
  let html = "";
  html += `<p style="font-size:15px;font-weight:600;color:var(--ink);margin-bottom:6px">${stay.name}</p>`;
  const stayAddress = stay.address || stay.location || stay.city || "";
  if (stayAddress) {
    html += `<p style="font-size:13px;color:var(--ink3);margin-bottom:8px;display:flex;align-items:center;gap:4px">
      <span class="material-symbols-rounded" style="font-size:15px;color:var(--gn2)">location_on</span>${stayAddress}
    </p>`;
  }
  if (stay.rating) {
    html += `<div style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;background:rgba(41,196,216,.1);color:var(--gn2);padding:5px 14px;border-radius:6px;margin-bottom:10px">
      <span class="material-symbols-rounded" style="font-size:14px">star</span>${stay.rating}
    </div>`;
  }

  // Check-in & Check-out banner in content
  if (dateInfo) {
    html += `<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(170px, 1fr));gap:10px;background:linear-gradient(135deg, rgba(41,196,216,0.05) 0%, rgba(245,166,35,0.06) 100%);border:1px solid rgba(41,196,216,0.18);border-radius:10px;padding:10px 14px;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:30px;height:30px;border-radius:50%;background:rgba(16,185,129,0.12);color:#059669;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span class="material-symbols-rounded" style="font-size:16px">login</span>
        </div>
        <div>
          <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--ink4)">Check-in Date</div>
          <div style="font-size:12.5px;font-weight:700;color:var(--ink);margin-top:1px">${dateInfo.checkInStr || (dateInfo.hasDates ? dateInfo.checkInShort : 'Day ' + dateInfo.startDay)}</div>
          <div style="font-size:10.5px;color:var(--ink3)">${stay.checkInTime ? 'Time: ' + stay.checkInTime : 'Standard: 2:00 PM'}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:30px;height:30px;border-radius:50%;background:rgba(239,68,68,0.1);color:#dc2626;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span class="material-symbols-rounded" style="font-size:16px">logout</span>
        </div>
        <div>
          <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--ink4)">Check-out Date</div>
          <div style="font-size:12.5px;font-weight:700;color:var(--ink);margin-top:1px">${dateInfo.checkOutStr || (dateInfo.hasDates ? dateInfo.checkOutShort : 'Day ' + dateInfo.endDay)}</div>
          <div style="font-size:10.5px;color:var(--ink3)">${stay.checkOutTime ? 'Time: ' + stay.checkOutTime : 'Standard: 11:00 AM'}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:30px;height:30px;border-radius:50%;background:rgba(79,70,229,0.1);color:#4f46e5;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span class="material-symbols-rounded" style="font-size:16px">bed</span>
        </div>
        <div>
          <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--ink4)">Duration of Stay</div>
          <div style="font-size:12.5px;font-weight:700;color:var(--ink);margin-top:1px">${dateInfo.nights} ${dateInfo.nights > 1 ? 'Nights' : 'Night'}</div>
          <div style="font-size:10.5px;color:var(--ink3)">${
            stay.roomCategories && stay.roomCategories.length > 0
              ? stay.roomCategories.map((rc: any) => `${rc.rooms ? rc.rooms + '× ' : ''}${rc.roomType}`).join(' | ')
              : (stay.roomType || 'Standard Room')
          }</div>
        </div>
      </div>
    </div>`;
  }
  const meta: string[] = [];
  if (stay.nights) meta.push(`${stay.nights} Night${stay.nights > 1 ? "s" : ""}`);
  if (stay.roomCategories && stay.roomCategories.length > 0) {
    const roomLabel = stay.roomCategories.map((rc: any) => `${rc.rooms ? rc.rooms + '× ' : ''}${rc.roomType}`).join(' · ');
    meta.push(roomLabel);
  } else if (stay.roomType) {
    meta.push(stay.roomType);
  }
  if (meta.length > 0) {
    html += `<p style="font-size:13px;color:var(--ink3);margin-bottom:10px">${meta.join(" · ")}</p>`;
  }
  if (stay.amenities && stay.amenities.length > 0) {
    html += sectionLabel("wifi", "Amenities");
    html += buildBulletList(stay.amenities, "var(--gn3)");
  }
  if (stay.remark && stay.showRemarkToCustomer) {
    html += `<div style="margin-top:12px;padding:10px 14px;background:#f0fdf4;border-left:3px solid #10b981;border-radius:6px;font-size:12.5px;color:#1e293b;line-height:1.5">
      <span style="font-weight:700;color:#047857">Note: </span>${stay.remark}
    </div>`;
  }
  return html;
}

/* ── Helper: build HTML for a single leg route visual ── */
function buildLegRouteHtml(leg: { from?: string; to?: string; stops?: string[]; transferType?: string; vehicleType?: string }): string {
  let html = "";

  // Transfer type & vehicle badge for this leg
  if (leg.transferType || leg.vehicleType) {
    html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap">`;
    if (leg.transferType) {
      const icon1 = getVehicleIcon(leg.transferType);
      html += `<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;background:var(--gn-gl);color:var(--gn);padding:4px 12px;border-radius:6px"><span class="material-symbols-rounded" style="font-size:13px">${icon1}</span>${leg.transferType}</span>`;
    }
    if (leg.vehicleType) {
      const icon2 = getVehicleIcon(leg.vehicleType);
      html += `<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;background:rgba(41,196,216,.08);color:var(--gn2);padding:4px 12px;border-radius:6px"><span class="material-symbols-rounded" style="font-size:13px">${icon2}</span>${leg.vehicleType}</span>`;
    }
    html += `</div>`;
  }

  // Route visual: from → stops → to
  if (leg.from || leg.to) {
    let stopsHtml = "";
    if (leg.stops && leg.stops.length > 0) {
      stopsHtml = leg.stops.map((stop: string) =>
        `<div style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:12px;color:var(--ink3)">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--ink4);flex-shrink:0"></span>
          ${stop}
        </div>`
      ).join("");
    }

    html += `<div style="display:flex;gap:12px;align-items:stretch;min-width:0;max-width:100%">`;
    // Left spine
    html += `<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:12px">
      <div style="width:12px;height:12px;border-radius:50%;border:2.5px solid var(--cu);background:#fff;flex-shrink:0"></div>
      <div style="flex:1;width:0;border-left:2px dotted var(--cu);margin:3px 0;min-height:24px"></div>
      <div style="width:12px;height:12px;border-radius:50%;background:var(--cu);flex-shrink:0"></div>
    </div>`;
    // Right content
    html += `<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:4px">`;
    if (leg.from) {
      html += `<div style="background:#fffbf0;border:1px solid #fde68a;border-radius:8px;padding:8px 12px;min-width:0">
        <div style="font-size:9px;font-weight:700;color:var(--cu);text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">From</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:var(--ink);min-width:0;word-break:break-word;overflow-wrap:anywhere">
          <span class="material-symbols-rounded" style="font-size:15px;color:var(--ink3);flex-shrink:0">location_on</span>
          <span style="flex:1;min-width:0;word-break:break-word;overflow-wrap:anywhere">${leg.from}</span>
        </div>
      </div>`;
    }
    if (stopsHtml) {
      html += `<div style="padding:2px 10px;min-width:0;word-break:break-word;overflow-wrap:anywhere">${stopsHtml}</div>`;
    }
    if (leg.to) {
      html += `<div style="background:#fffbf0;border:1px solid #fde68a;border-radius:8px;padding:8px 12px;min-width:0">
        <div style="font-size:9px;font-weight:700;color:var(--cu);text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">To</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:var(--ink);min-width:0;word-break:break-word;overflow-wrap:anywhere">
          <span class="material-symbols-rounded" style="font-size:15px;color:var(--ink3);flex-shrink:0">location_on</span>
          <span style="flex:1;min-width:0;word-break:break-word;overflow-wrap:anywhere">${leg.to}</span>
        </div>
      </div>`;
    }
    html += `</div></div>`;
  }

  return html;
}

/* ── Helper: build HTML content for transfers ── */
function buildTransferContent(transfer: any): string {
  let html = "";

  // Check if we have the new legs format
  const legs = transfer.legs && transfer.legs.length > 0 ? transfer.legs : null;

  if (legs) {
    // New format: render each leg separately
    if (legs.length === 1) {
      // Single leg — render inline (no numbering)
      html += buildLegRouteHtml(legs[0]);
    } else {
      // Multiple legs — render each with a separator
      html += `<div style="display:flex;flex-direction:column;gap:16px">`;
      legs.forEach((leg: any, idx: number) => {
        html += `<div style="border:1px solid var(--line);border-radius:12px;padding:14px;${idx > 0 ? "" : ""}">`;
        html += `<div class="syne" style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink4);margin-bottom:8px">Leg ${idx + 1}</div>`;
        html += buildLegRouteHtml(leg);
        html += `</div>`;
      });
      html += `</div>`;
    }
  } else {
    // Old format: use top-level from/to/transferType/vehicleType/stops
    if (transfer.transferType || transfer.vehicleType) {
      html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">`;
      if (transfer.transferType) {
        const tIcon = getVehicleIcon(transfer.transferType);
        html += `<span style="display:inline-flex;align-items:center;gap:5px;font-size:13px;color:var(--ink3)"><span class="material-symbols-rounded" style="font-size:16px;color:var(--gn3)">${tIcon}</span>${transfer.transferType}</span>`;
      }
      html += `</div>`;
      if (transfer.vehicleType) {
        html += `<p style="font-size:14px;font-weight:600;color:var(--ink);margin-bottom:16px">Transfer in ${transfer.vehicleType}</p>`;
      }
    }

    if (transfer.from || transfer.to) {
      html += `<div style="border-top:1px dashed var(--line2);padding-top:14px;margin-bottom:14px">`;

      let stopsHtml = "";
      if (transfer.stops && transfer.stops.length > 0) {
        stopsHtml = transfer.stops.map((stop: string) =>
          `<div style="display:flex;align-items:center;gap:6px;padding:6px 0;font-size:13px;color:var(--ink3)">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--ink4);flex-shrink:0"></span>
            ${stop}
          </div>`
        ).join("");
      }

      html += `<div style="display:flex;gap:14px;align-items:stretch;min-width:0;max-width:100%">`;
      html += `<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:14px">
        <div style="width:14px;height:14px;border-radius:50%;border:2.5px solid var(--cu);background:#fff;flex-shrink:0"></div>
        <div style="flex:1;width:0;border-left:2px dotted var(--cu);margin:4px 0;min-height:40px"></div>
        <div style="width:14px;height:14px;border-radius:50%;background:var(--cu);flex-shrink:0"></div>
      </div>`;
      html += `<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:8px">`;
      if (transfer.from) {
        html += `<div style="background:#fffbf0;border:1px solid #fde68a;border-radius:10px;padding:10px 14px;min-width:0">
          <div style="font-size:10px;font-weight:700;color:var(--cu);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">From</div>
          <div style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--ink);min-width:0;word-break:break-word;overflow-wrap:anywhere">
            <span class="material-symbols-rounded" style="font-size:18px;color:var(--ink3);flex-shrink:0">location_on</span>
            <span style="flex:1;min-width:0;word-break:break-word;overflow-wrap:anywhere">${transfer.from}</span>
          </div>
        </div>`;
      }
      if (stopsHtml) {
        html += `<div style="padding:2px 12px;min-width:0;word-break:break-word;overflow-wrap:anywhere">${stopsHtml}</div>`;
      }
      if (transfer.to) {
        html += `<div style="background:#fffbf0;border:1px solid #fde68a;border-radius:10px;padding:10px 14px;min-width:0">
          <div style="font-size:10px;font-weight:700;color:var(--cu);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">To</div>
          <div style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--ink);min-width:0;word-break:break-word;overflow-wrap:anywhere">
            <span class="material-symbols-rounded" style="font-size:18px;color:var(--ink3);flex-shrink:0">location_on</span>
            <span style="flex:1;min-width:0;word-break:break-word;overflow-wrap:anywhere">${transfer.to}</span>
          </div>
        </div>`;
      }
      html += `</div></div>`;
      html += `</div>`;
    }
  }

  if (transfer.description) {
    html += `<p style="margin-top:12px">${transfer.description}</p>`;
  }
  if (transfer.details && transfer.details.length > 0) {
    html += sectionLabel("info", "Transfer Details");
    html += buildBulletList(transfer.details, "var(--gn)");
  }
  if (transfer.images && transfer.images.length > 0) {
    html += `<div class="acc-images">${transfer.images.map((img: string) => `<img src="${img}" alt="" class="acc-thumb" data-lightbox />`).join("")}</div>`;
  }
  return html;
}

/* ── Helper: build activities-from-itinerary content for a day ── */
function buildDayActivitiesContent(day: any, imageMap?: Record<string, string>): string {
  if ((!day.activities || day.activities.length === 0) && (!day.recommendations || day.recommendations.length === 0)) return "";

  let html = "";

  // Collect all activity images + day.images for the slider (with labels)
  const allDayImages: { src: string; label?: string }[] = [];
  if (day.activities && day.activities.length > 0) {
    day.activities.forEach((act: any) => {
      if (typeof act !== "string") {
        const label = act.title || act.name || undefined;
        if (act.images && act.images.length > 0) {
          act.images.filter(Boolean).forEach((src: string) => allDayImages.push({ src, label }));
        } else if (act.image) {
          allDayImages.push({ src: act.image, label });
        }
      }
    });
  }
  if (day.images && day.images.length > 0) {
    day.images.filter(Boolean).forEach((src: string) => allDayImages.push({ src }));
  }

  if (day.activities && day.activities.length > 0) {
    if (allDayImages.length > 0) {
      html += buildDayImageSlider(allDayImages);
    }
    html += buildActivitiesList(day.activities, "var(--cu)", imageMap);
  }

  if (day.recommendations && day.recommendations.length > 0) {
    html += buildRecommendationsList(day.recommendations);
  }

  return html;
}

// Tabs definition removed from here, moved inside the component to be dynamic

export default function PackageTabs({ pkg, selectedHotelOptions, onSelectHotelOption }: PackageTabsProps) {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({
    itinerary: null,
    activities: null,
    stay: 0,
    transfers: null,
    policies: null,
  });
  const [itinIdx, setItinIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const toggleItem = (tab: string, idx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [tab]: prev[tab] === idx ? null : idx,
    }));
  };

  const itinerary = pkg?.itinerary || [];
  const stays = pkg?.stays || [];
  const transfers = pkg?.transfers || [];
  const images = pkg?.images || [];
  const duration = pkg?.duration;
  const destinationName = pkg?.destination?.name || pkg?.customDestinationText;

  const hasItinerary = itinerary.length > 0;
  const hasActivities = itinerary.some(
    (day: any) => (day.activities && day.activities.length > 0) || (day.recommendations && day.recommendations.length > 0)
  );
  const hasStays = stays.length > 0;
  const flights = pkg?.flights || [];
  const hasFlights = flights.some((f: any) => (f.type ?? "flight") === "flight");
  const hasTrains = flights.some((f: any) => f.type === "train");
  const hasAnyFlightOrTrain = flights.length > 0 || Boolean(pkg?.flightsIncluded);
  const hasTransfers = transfers.length > 0 || !!pkg?.transferSummary;
  const hasPolicies = (pkg?.paymentPolicy?.length > 0) || (pkg?.cancellationPolicy?.length > 0) || (pkg?.flightCancellationPolicy?.length > 0);

  // Build contextual tab label
  const flightTrainLabel = hasFlights && hasTrains ? "Flights & Trains" : hasTrains ? "Trains" : "Flights";

  const availableTabs = [
    ...(hasItinerary ? [{ id: "itinerary", label: "Itinerary" }] : []),
    ...(hasActivities ? [{ id: "activities", label: "Activities" }] : []),
    ...(hasAnyFlightOrTrain ? [{ id: "flights", label: flightTrainLabel }] : []),
    ...(hasStays ? [{ id: "stay", label: "Stay" }] : []),
    ...(hasTransfers ? [{ id: "transfers", label: "Transfers" }] : []),
    ...(hasPolicies ? [{ id: "policies", label: "Policies" }] : []),
  ];

  // If the active tab is not in the available tabs, switch to the first available one
  if (availableTabs.length > 0 && !availableTabs.some((t) => t.id === activeTab)) {
    setActiveTab(availableTabs[0].id);
  }

  const itinImages = images.slice(0, 5);

  const itinNav = (dir: number) => {
    if (itinImages.length === 0) return;
    setItinIdx((prev) => (prev + dir + itinImages.length) % itinImages.length);
  };

  const getTabData = (tabId: string) => {
    switch (tabId) {
      case "itinerary":
        return [...itinerary].sort((a: any, b: any) => (a.day || 0) - (b.day || 0)).map((day: any) => {
          const dayFlights = flights.filter((f: any) => f.day == day.day || (day.day === 1 && (!f.day || f.day === 0)));
          const dateStr = pkg?.travelDates?.startDate ? computeDate(pkg.travelDates.startDate, day.day) : undefined;
          return {
            badge: `Day ${day.day}`,
            badgeType: "day",
            dateStr,
            title: day.title,
            content: buildItineraryContent(day, dayFlights, pkg?.imageMap, dateStr),
          };
        });
      case "activities":
        // Show activity and recommendation entries from each itinerary day
        return [...itinerary].sort((a: any, b: any) => (a.day || 0) - (b.day || 0))
          .filter((day: any) => (day.activities && day.activities.length > 0) || (day.recommendations && day.recommendations.length > 0))
          .map((day: any) => {
            const dateStr = pkg?.travelDates?.startDate ? computeDate(pkg.travelDates.startDate, day.day) : undefined;
            return {
              badge: `Day ${day.day}`,
              badgeType: "activity",
              dateStr,
              title: day.title || `Day ${day.day}`,
              content: buildDayActivitiesContent(day, pkg?.imageMap),
            };
          });
      case "flights": {
        // Separate flights and trains into two groups, sorted by day
        const flightEntries = [...flights].filter((f: any) => (f.type ?? "flight") === "flight").sort((a: any, b: any) => (a.day || 999) - (b.day || 999));
        const trainEntries = [...flights].filter((f: any) => f.type === "train").sort((a: any, b: any) => (a.day || 999) - (b.day || 999));
        const result: any[] = [];
        flightEntries.forEach((f: any, i: number) => {
          const dayNum = f.day || (i + 1);
          const dateStr = pkg?.travelDates?.startDate ? computeDate(pkg.travelDates.startDate, dayNum) : undefined;
          result.push({
            badge: f.day ? `Day ${f.day}` : `Flight ${i + 1}`,
            badgeType: "flight",
            dateStr,
            title: `${f.airline || "Flight"} ${f.flightNumber ? `• ${f.flightNumber}` : ""} (${f.from || "Origin"} → ${f.to || "Destination"})`,
            content: buildFlightContent(f, true, dateStr),
          });
        });
        trainEntries.forEach((f: any, i: number) => {
          const dayNum = f.day || (i + 1);
          const dateStr = pkg?.travelDates?.startDate ? computeDate(pkg.travelDates.startDate, dayNum) : undefined;
          result.push({
            badge: f.day ? `Day ${f.day}` : `Train ${i + 1}`,
            badgeType: "train",
            dateStr,
            title: `${f.airline || "Train"} ${f.flightNumber ? `• ${f.flightNumber}` : ""} (${f.from || "Origin"} → ${f.to || "Destination"})`,
            content: buildFlightContent(f, true, dateStr),
          });
        });
        if (result.length === 0 && pkg?.flightsIncluded) {
          result.push({
            badge: "Airfare",
            badgeType: "flight",
            title: "Round-Trip Flights Included in Package",
            content: `<div style="padding:16px;background:var(--iv);border-radius:12px;border:1px solid var(--line)">
              <p style="font-size:15px;font-weight:700;color:var(--ink);margin:0 0 6px">✈️ Round-Trip Airfare Bundled</p>
              <p style="font-size:13px;color:var(--ink3);line-height:1.6;margin:0">
                All round-trip flights and airline transit are covered in your package quote. Flight timings, seat allocations, and boarding passes will be issued based on your travel dates${pkg?.travelDates?.startDate ? ` (${new Date(pkg.travelDates.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}${pkg.travelDates.endDate ? ` – ${new Date(pkg.travelDates.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : ""})` : ""} upon booking confirmation.
              </p>
            </div>`,
          });
        }
        return result;
      }
      case "stay": {
        let accumulatedNights = 0;
        return stays.map((s: any, i: number) => {
          const dateInfo = resolveStayDates(s, accumulatedNights, pkg?.travelDates?.startDate);
          accumulatedNights += (s.nights || 1);
          return {
            badge: `Stay ${i + 1}`,
            badgeType: "stay",
            dateStr: dateInfo.hasDates ? `In: ${dateInfo.checkInShort} → Out: ${dateInfo.checkOutShort}` : `Day ${dateInfo.startDay} – Day ${dateInfo.endDay}`,
            title: s.name,
            content: buildStayContent(s, dateInfo),
          };
        });
      }
      case "transfers": {
        return [...transfers].sort((a: any, b: any) => (a.day || 0) - (b.day || 0)).map((t: any, i: number) => {
          const dateStr = t.day && pkg?.travelDates?.startDate ? computeDate(pkg.travelDates.startDate, t.day) : undefined;
          return {
            badge: t.day ? `Day ${t.day}` : `Transfer ${i + 1}`,
            badgeType: "transfer",
            dateStr,
            title: t.title,
            content: buildTransferContent(t),
          };
        });
      }
      case "policies":
        return [
          ...(pkg?.paymentPolicy?.length ? [{
            badge: "Policy",
            badgeType: "transfer",
            title: "Payment Policy",
            content: buildBulletList(pkg.paymentPolicy, "var(--cu)")
          }] : []),
          ...(pkg?.cancellationPolicy?.length ? [{
            badge: "Policy",
            badgeType: "transfer",
            title: "Cancellation Policy",
            content: buildBulletList(pkg.cancellationPolicy, "var(--cu)")
          }] : []),
          ...(pkg?.flightCancellationPolicy?.length ? [{
            badge: "Policy",
            badgeType: "transfer",
            title: "Trains / Flight Cancellation Policy",
            content: buildBulletList(pkg.flightCancellationPolicy, "var(--cu)")
          }] : [])
        ];
      default:
        return [];
    }
  };

  const tabData = getTabData(activeTab);

  if (availableTabs.length === 0) {
    return null; // Don't render anything if there's no data for any tab
  }

  return (
    <div style={{ marginBottom: 28, maxWidth: "100%", minWidth: 0, width: "100%", boxSizing: "border-box" }}>
      {/* Tab Navigation */}
      {availableTabs.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 0,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            borderBottom: "2px solid var(--line)",
            marginBottom: 0,
            maxWidth: "100%",
            minWidth: 0,
            scrollbarWidth: "none",
          }}
        >
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="syne"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: activeTab === tab.id ? "var(--gn)" : "var(--ink3)",
                padding: "12px 20px",
                whiteSpace: "nowrap",
                borderBottom: `2.5px solid ${activeTab === tab.id ? "var(--cu)" : "transparent"}`,
                marginBottom: -2,
                transition: "var(--tr)",
                cursor: "pointer",
                background: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                flexShrink: 0,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Tab Panels */}
      <div style={{ paddingTop: 20, maxWidth: "100%", minWidth: 0 }}>
        {/* Itinerary Hero (only for itinerary tab) */}
        {activeTab === "itinerary" && itinImages.length > 0 && (
          <div
            className="itin-hero"
            style={{
              position: "relative",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <img
              src={itinImages[itinIdx]}
              alt="Itinerary"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity .3s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,20,28,.7) 0%, transparent 55%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 20, left: 22, color: "#fff" }}>
              <div className="serif" style={{ fontSize: 42, fontWeight: 700, lineHeight: 1 }}>
                {duration?.days || itinerary.length}
              </div>
              <div
                className="syne"
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.8)", marginTop: 4 }}
              >
                Days in {destinationName || "your destination"}
              </div>
            </div>
            {itinImages.length > 1 && (
              <>
                <button
                  onClick={() => itinNav(-1)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: 14,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                    transition: "var(--tr)",
                    boxShadow: "var(--sh)",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--gn)" }}>
                    chevron_left
                  </span>
                </button>
                <button
                  onClick={() => itinNav(1)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: 14,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                    transition: "var(--tr)",
                    boxShadow: "var(--sh)",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--gn)" }}>
                    chevron_right
                  </span>
                </button>
              </>
            )}
          </div>
        )}

        {/* Accordion List or Stay Options or Empty State */}
        {tabData.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activeTab === "stay" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Banner if any stay has multiple options */}
                {stays.some((s: any) => s.hasOptions && s.options && s.options.length > 1) && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      padding: "16px 20px",
                      background: "linear-gradient(135deg, rgba(0,77,94,0.06) 0%, rgba(245,166,35,0.08) 100%)",
                      borderRadius: "var(--r)",
                      border: "1.5px solid rgba(0,77,94,0.12)",
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 26, color: "var(--cu)" }}>
                        hotel_class
                      </span>
                      <div>
                        <div className="syne" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--gn)" }}>
                          Choose Your Hotel Preference
                        </div>
                        <div style={{ fontSize: 12, color: "var(--ink2)", marginTop: 2 }}>
                          Select your desired hotel for each stay. Price updates automatically in real-time.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(() => {
                  let accumulatedNights = 0;
                  const stayDateInfos = stays.map((s: any) => {
                    const info = resolveStayDates(s, accumulatedNights, pkg?.travelDates?.startDate);
                    accumulatedNights += (s.nights || 1);
                    return info;
                  });

                  return stays.map((stay: any, idx: number) => {
                    const hasOptions = stay.hasOptions && stay.options && stay.options.length > 1;
                    const currentChosenOptionId = selectedHotelOptions?.[idx];
                    const isOpen = openItems["stay"] === idx;
                    const dateInfo = stayDateInfos[idx];

                    // Find chosen option or default
                    const chosenOpt = hasOptions
                      ? (stay.options.find((o: any) => o.optionId === currentChosenOptionId) ||
                         stay.options.find((o: any) => o.isDefault) ||
                         stay.options[0])
                      : null;

                    return (
                      <div
                        key={`stay-${idx}`}
                        style={{
                          background: "#fff",
                          borderRadius: "var(--r)",
                          border: `1.5px solid ${isOpen ? "var(--gn3)" : "var(--line)"}`,
                          overflow: "hidden",
                          transition: "var(--tr)",
                          boxShadow: isOpen ? "var(--sh)" : "none",
                          minWidth: 0,
                          maxWidth: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Stay Accordion Header */}
                        <button
                          onClick={() => toggleItem("stay", idx)}
                          className="itin-card-header"
                        >
                          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
                              <span
                                className="syne"
                                style={{
                                  fontSize: 10.5,
                                  fontWeight: 800,
                                  letterSpacing: 1,
                                  textTransform: "uppercase",
                                  padding: "3.5px 11px",
                                  borderRadius: 50,
                                  whiteSpace: "nowrap",
                                  flexShrink: 0,
                                  background: "rgba(41,196,216,.12)",
                                  color: "var(--gn2)",
                                }}
                              >
                                Stay {idx + 1}
                              </span>
                              <span
                                className="syne"
                                style={{
                                  fontSize: 14.5,
                                  fontWeight: 600,
                                  color: isOpen ? "var(--gn)" : "var(--ink)",
                                  lineHeight: 1.4,
                                  minWidth: 0,
                                  wordBreak: "break-word",
                                  overflowWrap: "anywhere",
                                }}
                              >
                                {stay.name || stay.stayLocation || `Location ${idx + 1}`}
                              </span>
                              {stay.nights && (
                                <span style={{ fontSize: 12, color: "var(--ink4)", flexShrink: 0 }}>
                                  • {stay.nights} {stay.nights > 1 ? "Nights" : "Night"}
                                </span>
                              )}
                              {chosenOpt && (
                                <span
                                  style={{
                                    fontSize: 11.5,
                                    fontWeight: 700,
                                    background: chosenOpt.priceDifference > 0 ? "rgba(245,166,35,0.12)" : "rgba(16,185,129,0.1)",
                                    color: chosenOpt.priceDifference > 0 ? "var(--cu-d)" : "#059669",
                                    padding: "2.5px 9px",
                                    borderRadius: 50,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    maxWidth: "100%",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  <span className="material-symbols-rounded" style={{ fontSize: 13, flexShrink: 0 }}>hotel</span>
                                  <span>{chosenOpt.name || chosenOpt.hotelName}</span>
                                  <span style={{ whiteSpace: "nowrap" }}>{chosenOpt.priceDifference > 0 ? ` (+₹${chosenOpt.priceDifference.toLocaleString()})` : " (Included)"}</span>
                                </span>
                              )}
                            </div>

                            {/* Check-in & Check-out Date Pill in Header */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <span
                                className="syne"
                                style={{
                                  fontSize: 11,
                                  fontWeight: 700,
                                  background: "rgba(245, 166, 35, 0.09)",
                                  color: "var(--cu-d)",
                                  padding: "3px 10px",
                                  borderRadius: 6,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  border: "1px solid rgba(245, 166, 35, 0.22)",
                                }}
                              >
                                <span className="material-symbols-rounded" style={{ fontSize: 13, color: "#16a34a" }}>login</span>
                                <span>Check-in: <strong style={{ color: "var(--ink)" }}>{dateInfo.checkInShort || `Day ${dateInfo.startDay}`}</strong></span>
                                <span style={{ color: "var(--ink4)" }}>→</span>
                                <span className="material-symbols-rounded" style={{ fontSize: 13, color: "#dc2626" }}>logout</span>
                                <span>Check-out: <strong style={{ color: "var(--ink)" }}>{dateInfo.checkOutShort || `Day ${dateInfo.endDay}`}</strong></span>
                              </span>
                            </div>
                          </div>
                          <div
                            className="itin-card-toggle"
                            style={{
                              background: isOpen ? "var(--gn)" : "var(--gn-gl)",
                              transform: isOpen ? "rotate(45deg)" : "none",
                            }}
                          >
                            <span
                              className="material-symbols-rounded"
                              style={{ fontSize: 16, color: isOpen ? "#fff" : "var(--gn)", transition: "var(--tr)" }}
                            >
                              add
                            </span>
                          </div>
                        </button>

                        {/* Stay Accordion Content */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: isOpen ? "1fr" : "0fr",
                            transition: "grid-template-rows .35s ease",
                          }}
                        >
                          <div style={{ overflow: "hidden", minHeight: 0 }}>
                            <div
                              style={{
                                padding: "0 18px 18px",
                                fontSize: 13,
                                lineHeight: 1.6,
                                color: "var(--ink2)",
                                borderTop: "1px solid var(--line2)",
                                paddingTop: 14,
                              }}
                            >
                              {hasOptions ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                  {/* Check-in & Check-out Date Banner for Options */}
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                                      gap: 10,
                                      background: "linear-gradient(135deg, rgba(41,196,216,0.05) 0%, rgba(245,166,35,0.06) 100%)",
                                      border: "1px solid rgba(41,196,216,0.18)",
                                      borderRadius: 10,
                                      padding: "10px 14px",
                                      marginBottom: 6,
                                    }}
                                  >
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(16,185,129,0.12)", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>login</span>
                                      </div>
                                      <div>
                                        <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--ink4)" }}>Check-in Date</div>
                                        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginTop: 1 }}>{dateInfo.checkInStr || (dateInfo.hasDates ? dateInfo.checkInShort : `Day ${dateInfo.startDay}`)}</div>
                                        <div style={{ fontSize: 10.5, color: "var(--ink3)" }}>{stay.checkInTime ? `Time: ${stay.checkInTime}` : "Standard: 2:00 PM"}</div>
                                      </div>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(239,68,68,0.1)", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>logout</span>
                                      </div>
                                      <div>
                                        <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--ink4)" }}>Check-out Date</div>
                                        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginTop: 1 }}>{dateInfo.checkOutStr || (dateInfo.hasDates ? dateInfo.checkOutShort : `Day ${dateInfo.endDay}`)}</div>
                                        <div style={{ fontSize: 10.5, color: "var(--ink3)" }}>{stay.checkOutTime ? `Time: ${stay.checkOutTime}` : "Standard: 11:00 AM"}</div>
                                      </div>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(79,70,229,0.1)", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>bed</span>
                                      </div>
                                      <div>
                                        <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--ink4)" }}>Duration of Stay</div>
                                        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginTop: 1 }}>{dateInfo.nights} {dateInfo.nights > 1 ? "Nights" : "Night"}</div>
                                        <div style={{ fontSize: 10.5, color: "var(--ink3)" }}>
                                          {stay.roomCategories && stay.roomCategories.length > 0
                                            ? stay.roomCategories.map((rc: any) => `${rc.rooms ? rc.rooms + '× ' : ''}${rc.roomType}`).join(' | ')
                                            : (stay.roomType || "Standard Room")}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink3)", marginBottom: 4 }}>
                                    Select an option below to apply to your package:
                                  </p>
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                                      gap: 12,
                                    }}
                                  >
                                    {stay.options.map((opt: any) => {
                                      const isSelected =
                                        currentChosenOptionId === opt.optionId ||
                                        (!currentChosenOptionId && (opt.isDefault || opt === stay.options[0]));
                                      return (
                                        <div
                                          key={opt.optionId}
                                          onClick={() => onSelectHotelOption && onSelectHotelOption(idx, opt.optionId)}
                                          style={{
                                            background: isSelected ? "rgba(41,196,216,0.06)" : "#fafafa",
                                            border: `1.5px solid ${isSelected ? "var(--gn2)" : "var(--line)"}`,
                                            borderRadius: 14,
                                            padding: "14px 16px",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            position: "relative",
                                            boxShadow: isSelected ? "0 4px 16px rgba(41,196,216,0.15)" : "none",
                                          }}
                                        >
                                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                              <div
                                                style={{
                                                  width: 18,
                                                  height: 18,
                                                  borderRadius: "50%",
                                                  border: `2px solid ${isSelected ? "var(--gn2)" : "var(--ink4)"}`,
                                                  background: isSelected ? "var(--gn2)" : "#fff",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  flexShrink: 0,
                                                }}
                                              >
                                                {isSelected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                                              </div>
                                              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
                                                {opt.name || opt.hotelName}
                                              </div>
                                            </div>
                                            <div>
                                              {opt.priceDifference > 0 ? (
                                                <span
                                                  style={{
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    background: "rgba(245,166,35,0.15)",
                                                    color: "var(--cu-d)",
                                                    padding: "3px 8px",
                                                    borderRadius: 50,
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  +₹{opt.priceDifference.toLocaleString()} / pax
                                                </span>
                                              ) : (
                                                <span
                                                  style={{
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    background: "rgba(16,185,129,0.12)",
                                                    color: "#059669",
                                                    padding: "3px 8px",
                                                    borderRadius: 50,
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  Included (₹0)
                                                </span>
                                              )}
                                            </div>
                                          </div>

                                          {/* Details row */}
                                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, fontSize: 12, color: "var(--ink3)" }}>
                                            {opt.rating && (
                                              <span style={{ display: "flex", alignItems: "center", gap: 2, color: "var(--cu)", fontWeight: 700 }}>
                                                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>star</span>
                                                {opt.rating}
                                              </span>
                                            )}
                                            {opt.roomType && (
                                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--ink4)" }}>bed</span>
                                                {opt.roomType}
                                              </span>
                                            )}
                                          </div>

                                          {(opt.address || opt.remark) && (
                                            <div style={{ fontSize: 12, color: "var(--ink4)", marginTop: 6, lineHeight: 1.4 }}>
                                              {opt.address || opt.remark}
                                            </div>
                                          )}

                                          {isSelected && (
                                            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "var(--gn2)" }}>
                                              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>check_circle</span>
                                              Active Selection
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : (
                                /* Standard Stay content when single option */
                                <div dangerouslySetInnerHTML={{ __html: buildStayContent(stay, dateInfo) }} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            ) : (
              tabData.map((item: any, idx: number) => (
                <AccordionItem
                  key={`${activeTab}-${idx}`}
                  item={item}
                  isOpen={openItems[activeTab] === idx}
                  onToggle={() => toggleItem(activeTab, idx)}
                  onImageClick={(imgs, i) => { setLightboxImages(imgs); setLightboxIdx(i); setLightboxOpen(true); }}
                />
              ))
            )}

            {/* End Of Trip tagline — itinerary tab only */}
            {activeTab === "itinerary" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  margin: "28px 0 8px",
                }}
              >
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #f59e0b55)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#f59e0b",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    letterSpacing: 1,
                  }}
                >
                  End Of Trip
                </span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #f59e0b55)" }} />
              </div>
            )}
          </div>
        ) : (
          /* Transfers tab: show summary card if no day-wise entries but summary text exists */
          activeTab === "transfers" && !transfers.length && pkg?.transferSummary ? (
            <div
              style={{
                background: "#fff",
                borderRadius: "var(--r)",
                border: "1.5px solid var(--line)",
                padding: "20px 22px",
                boxShadow: "var(--sh-sm, none)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "var(--gn-gl)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn)" }}>directions_bus</span>
                </div>
                <div>
                  <p className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>Transfer Details</p>
                  <p style={{ fontSize: 11, color: "var(--ink4)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>Overall arrangements for this trip</p>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontSize: 13.5,
                  color: "var(--ink2)",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {pkg.transferSummary}
              </p>
            </div>
          ) : (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "var(--ink4)",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: 14,
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 36, display: "block", marginBottom: 8, color: "var(--ink4)" }}>
                info
              </span>
              No information available
            </div>
          )
        )}
      </div>

      <style jsx>{`
        button:hover {
          color: var(--gn);
        }
        .itin-hero {
          height: 340px;
        }
        :global(.acc-images) {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 12px;
        }
        :global(.acc-thumb) {
          width: 72px;
          height: 52px;
          object-fit: cover;
          border-radius: 8px;
          border: 1.5px solid var(--line);
          cursor: pointer;
          transition: var(--tr);
        }
        :global(.acc-thumb:hover) {
          border-color: var(--cu);
          transform: scale(1.05);
        }
        /* ── Activity carousel styles ── */
        :global(.act-car-img) {
          width: 100%;
          height: 240px;
          object-fit: cover;
          display: block;
          cursor: pointer;
        }
        :global(.act-car-btn) {
          opacity: 0.85;
          transition: opacity 0.2s ease, background 0.2s ease;
        }
        :global(.act-car-btn:hover) {
          opacity: 1;
          background: rgba(0,0,0,0.75) !important;
        }
        :global(.act-car-thumb:hover) {
          transform: scale(1.12);
          z-index: 10 !important;
        }
        @media (max-width: 600px) {
          .itin-hero {
            height: 200px !important;
          }
          :global(.act-car-img) {
            height: 200px;
          }
        }
      `}</style>

      {/* Lightbox */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,10,14,.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setLightboxOpen(false)}
        >
          <div style={{ position: "relative", maxWidth: 900, width: "100%" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightboxOpen(false)} style={{ position: "absolute", top: -44, right: 0, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
              <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 20 }}>close</span>
            </button>
            <img src={lightboxImages[lightboxIdx]} alt="" style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", borderRadius: "var(--r)" }} />
            {pkg?.imageMap?.[lightboxImages[lightboxIdx]] && (
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: 0.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)" }}>location_on</span>
                {pkg.imageMap[lightboxImages[lightboxIdx]]}
              </div>
            )}
            {lightboxImages.length > 1 && (
              <>
                <button onClick={() => setLightboxIdx((lightboxIdx - 1 + lightboxImages.length) % lightboxImages.length)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: -50, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
                  <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 24 }}>chevron_left</span>
                </button>
                <button onClick={() => setLightboxIdx((lightboxIdx + 1) % lightboxImages.length)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: -50, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
                  <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 24 }}>chevron_right</span>
                </button>
              </>
            )}
            <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "rgba(255,255,255,.5)" }}>{lightboxIdx + 1} / {lightboxImages.length}</div>
          </div>
        </div>
      )}
    </div>
  );
}
