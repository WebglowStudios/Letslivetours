"use client";

import { useState } from "react";

interface PackageTabsProps {
  pkg: any;
}

/* ── BADGE STYLES ── */
const badgeStyles: Record<string, React.CSSProperties> = {
  day: { background: "var(--gn)", color: "#fff" },
  activity: { background: "var(--cu-gl)", color: "var(--cu-d)" },
  stay: { background: "rgba(41,196,216,.12)", color: "var(--gn2)" },
  transfer: { background: "var(--gn-gl)", color: "var(--gn)" },
};

/* ── ACCORDION ITEM ── */
function AccordionItem({
  item,
  isOpen,
  onToggle,
  onImageClick,
}: {
  item: { badge: string; badgeType?: string; title: string; content: string };
  isOpen: boolean;
  onToggle: () => void;
  onImageClick?: (images: string[], idx: number) => void;
}) {
  const handleBodyClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG" && target.hasAttribute("data-lightbox")) {
      const container = target.closest(".acc-images");
      if (container && onImageClick) {
        const imgs = Array.from(container.querySelectorAll("img")).map((img) => img.getAttribute("src") || "");
        const idx = imgs.indexOf(target.getAttribute("src") || "");
        onImageClick(imgs, idx >= 0 ? idx : 0);
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
      }}
    >
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          cursor: "pointer",
          gap: 14,
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            className="syne"
            style={{
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 50,
              whiteSpace: "nowrap",
              flexShrink: 0,
              ...(badgeStyles[item.badgeType || "day"] || badgeStyles.day),
            }}
          >
            {item.badge}
          </span>
          <span
            className="syne"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: isOpen ? "var(--gn)" : "var(--ink)",
              lineHeight: 1.4,
            }}
          >
            {item.title}
          </span>
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: isOpen ? "var(--gn)" : "var(--gn-gl)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "var(--tr)",
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
          maxHeight: isOpen ? 1200 : 0,
          overflow: "hidden",
          transition: "max-height .4s ease",
        }}
      >
        <div
          style={{
            padding: "0 18px 18px",
            borderTop: "1px solid var(--line)",
            paddingTop: 14,
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: 13.5,
            color: "var(--ink3)",
            lineHeight: 1.75,
          }}
          onClick={handleBodyClick}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
    </div>
  );
}

/* ── Shared: styled bullet list ── */
function buildBulletList(items: string[], accentColor = "var(--cu)"): string {
  return `<ul style="display:flex;flex-direction:column;gap:8px;margin:10px 0 4px">${items
    .map(
      (item) =>
        `<li style="display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--ink2);line-height:1.65">
          <span style="width:7px;height:7px;border-radius:50%;background:${accentColor};flex-shrink:0;margin-top:6px"></span>
          <span>${item}</span>
        </li>`
    )
    .join("")}</ul>`;
}

/* ── Shared: section label ── */
function sectionLabel(icon: string, text: string): string {
  return `<div style="display:flex;align-items:center;gap:7px;margin:14px 0 6px">
    <span class="material-symbols-rounded" style="font-size:15px;color:var(--gn3)">${icon}</span>
    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--ink3)">${text}</span>
  </div>`;
}

/* ── Helper: build HTML content for an itinerary day ── */
function buildItineraryContent(day: any): string {
  let html = "";
  if (day.description) {
    html += `<p style="margin-bottom:10px">${day.description}</p>`;
  }
  if (day.activities && day.activities.length > 0) {
    html += sectionLabel("directions_walk", "Activities");
    html += buildBulletList(day.activities, "var(--cu)");
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
  if (day.images && day.images.length > 0) {
    html += `<div class="acc-images">${day.images.map((img: string) => `<img src="${img}" alt="" class="acc-thumb" data-lightbox />`).join("")}</div>`;
  }
  return html;
}

/* ── Helper: build HTML content for activities ── */
function buildActivityContent(activity: any): string {
  let html = "";
  if (activity.description) {
    html += `<p style="margin-bottom:10px">${activity.description}</p>`;
  }
  if (activity.duration) {
    html += `<div style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;background:var(--gn-gl);color:var(--gn);padding:5px 14px;border-radius:6px;margin-bottom:12px">
      <span class="material-symbols-rounded" style="font-size:14px">schedule</span>
      ${activity.duration}
    </div>`;
  }
  if (activity.details && activity.details.length > 0) {
    html += sectionLabel("checklist", "Activity Details");
    html += buildBulletList(activity.details, "var(--cu)");
  }
  if (activity.images && activity.images.length > 0) {
    html += `<div class="acc-images">${activity.images.map((img: string) => `<img src="${img}" alt="" class="acc-thumb" data-lightbox />`).join("")}</div>`;
  }
  return html;
}

/* ── Helper: build HTML content for stays ── */
function buildStayContent(stay: any): string {
  let html = "";
  html += `<p style="font-size:15px;font-weight:600;color:var(--ink);margin-bottom:8px">${stay.name}</p>`;
  if (stay.rating) {
    html += `<div style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;background:rgba(41,196,216,.1);color:var(--gn2);padding:5px 14px;border-radius:6px;margin-bottom:10px">
      <span class="material-symbols-rounded" style="font-size:14px">star</span>${stay.rating}
    </div>`;
  }
  const meta: string[] = [];
  if (stay.nights) meta.push(`${stay.nights} Night${stay.nights > 1 ? "s" : ""}`);
  if (stay.roomType) meta.push(stay.roomType);
  if (meta.length > 0) {
    html += `<p style="font-size:13px;color:var(--ink3);margin-bottom:10px">${meta.join(" · ")}</p>`;
  }
  if (stay.amenities && stay.amenities.length > 0) {
    html += sectionLabel("wifi", "Amenities");
    html += buildBulletList(stay.amenities, "var(--gn3)");
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
      html += `<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;background:var(--gn-gl);color:var(--gn);padding:4px 12px;border-radius:6px"><span class="material-symbols-rounded" style="font-size:13px">directions_bus</span>${leg.transferType}</span>`;
    }
    if (leg.vehicleType) {
      html += `<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;background:rgba(41,196,216,.08);color:var(--gn2);padding:4px 12px;border-radius:6px"><span class="material-symbols-rounded" style="font-size:13px">directions_car</span>${leg.vehicleType}</span>`;
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

    html += `<div style="display:flex;gap:12px;align-items:stretch">`;
    // Left spine
    html += `<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:12px">
      <div style="width:12px;height:12px;border-radius:50%;border:2.5px solid var(--cu);background:#fff;flex-shrink:0"></div>
      <div style="flex:1;width:0;border-left:2px dotted var(--cu);margin:3px 0;min-height:24px"></div>
      <div style="width:12px;height:12px;border-radius:50%;background:var(--cu);flex-shrink:0"></div>
    </div>`;
    // Right content
    html += `<div style="flex:1;display:flex;flex-direction:column;gap:4px">`;
    if (leg.from) {
      html += `<div style="background:#fffbf0;border:1px solid #fde68a;border-radius:8px;padding:8px 12px">
        <div style="font-size:9px;font-weight:700;color:var(--cu);text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">From</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:var(--ink)">
          <span class="material-symbols-rounded" style="font-size:15px;color:var(--ink3)">location_on</span>${leg.from}
        </div>
      </div>`;
    }
    if (stopsHtml) {
      html += `<div style="padding:2px 10px">${stopsHtml}</div>`;
    }
    if (leg.to) {
      html += `<div style="background:#fffbf0;border:1px solid #fde68a;border-radius:8px;padding:8px 12px">
        <div style="font-size:9px;font-weight:700;color:var(--cu);text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">To</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:var(--ink)">
          <span class="material-symbols-rounded" style="font-size:15px;color:var(--ink3)">location_on</span>${leg.to}
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
        html += `<span style="display:inline-flex;align-items:center;gap:5px;font-size:13px;color:var(--ink3)"><span class="material-symbols-rounded" style="font-size:16px;color:var(--gn3)">directions_bus</span>${transfer.transferType}</span>`;
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

      html += `<div style="display:flex;gap:14px;align-items:stretch">`;
      html += `<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:14px">
        <div style="width:14px;height:14px;border-radius:50%;border:2.5px solid var(--cu);background:#fff;flex-shrink:0"></div>
        <div style="flex:1;width:0;border-left:2px dotted var(--cu);margin:4px 0;min-height:40px"></div>
        <div style="width:14px;height:14px;border-radius:50%;background:var(--cu);flex-shrink:0"></div>
      </div>`;
      html += `<div style="flex:1;display:flex;flex-direction:column;gap:8px">`;
      if (transfer.from) {
        html += `<div style="background:#fffbf0;border:1px solid #fde68a;border-radius:10px;padding:10px 14px">
          <div style="font-size:10px;font-weight:700;color:var(--cu);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">From</div>
          <div style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--ink)">
            <span class="material-symbols-rounded" style="font-size:18px;color:var(--ink3)">location_on</span>${transfer.from}
          </div>
        </div>`;
      }
      if (stopsHtml) {
        html += `<div style="padding:2px 12px">${stopsHtml}</div>`;
      }
      if (transfer.to) {
        html += `<div style="background:#fffbf0;border:1px solid #fde68a;border-radius:10px;padding:10px 14px">
          <div style="font-size:10px;font-weight:700;color:var(--cu);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">To</div>
          <div style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--ink)">
            <span class="material-symbols-rounded" style="font-size:18px;color:var(--ink3)">location_on</span>${transfer.to}
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

const tabs = [
  { id: "itinerary", label: "Itinerary" },
  { id: "activities", label: "Activities" },
  { id: "stay", label: "Stay" },
  { id: "transfers", label: "Transfers" },
];

export default function PackageTabs({ pkg }: PackageTabsProps) {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({
    itinerary: null,
    activities: null,
    stay: null,
    transfers: null,
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
  const activities = pkg?.activities || [];
  const stays = pkg?.stays || [];
  const transfers = pkg?.transfers || [];
  const images = pkg?.images || [];
  const duration = pkg?.duration;
  const destination = pkg?.destination;

  const itinImages = images.slice(0, 5);

  const itinNav = (dir: number) => {
    if (itinImages.length === 0) return;
    setItinIdx((prev) => (prev + dir + itinImages.length) % itinImages.length);
  };

  const getTabData = (tabId: string) => {
    switch (tabId) {
      case "itinerary":
        return itinerary.map((day: any) => ({
          badge: `Day ${day.day}`,
          badgeType: "day",
          title: day.title,
          content: buildItineraryContent(day),
        }));
      case "activities":
        return activities.map((act: any, i: number) => ({
          badge: `Activity ${i + 1}`,
          badgeType: "activity",
          title: act.title,
          content: buildActivityContent(act),
        }));
      case "stay":
        return stays.map((s: any, i: number) => ({
          badge: `Stay ${i + 1}`,
          badgeType: "stay",
          title: s.name,
          content: buildStayContent(s),
        }));
      case "transfers":
        return transfers.map((t: any, i: number) => ({
          badge: t.day ? `Day ${t.day}` : `Transfer ${i + 1}`,
          badgeType: "transfer",
          title: t.title,
          content: buildTransferContent(t),
        }));
      default:
        return [];
    }
  };

  const tabData = getTabData(activeTab);

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: 0,
          overflowX: "auto",
          borderBottom: "2px solid var(--line)",
          marginBottom: 0,
        }}
      >
        {tabs.map((tab) => (
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
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div style={{ paddingTop: 20 }}>
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
                Days in {destination?.name || "your destination"}
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

        {/* Accordion List or Empty State */}
        {tabData.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tabData.map((item: any, idx: number) => (
              <AccordionItem
                key={`${activeTab}-${idx}`}
                item={item}
                isOpen={openItems[activeTab] === idx}
                onToggle={() => toggleItem(activeTab, idx)}
                onImageClick={(imgs, i) => { setLightboxImages(imgs); setLightboxIdx(i); setLightboxOpen(true); }}
              />
            ))}
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
        @media (max-width: 600px) {
          .itin-hero {
            height: 200px !important;
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
