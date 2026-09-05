"use client";

import { useState, useEffect, useCallback } from "react";

interface PackageGalleryProps {
  images: string[];
  heroImage?: string;
  destinationImages?: string[];
  stayImages?: string[];
  activityImages?: string[];
  imageMap?: Record<string, string>;
}

export default function PackageGallery({ images, heroImage, destinationImages, stayImages, activityImages, imageMap }: PackageGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [modalFilter, setModalFilter] = useState("all");

  const getImageName = (url?: string): string => {
    if (!url) return "";
    return imageMap?.[url] || "";
  };

  // Build gallery: heroImage first, then category images, then general
  const allImages = [
    ...(heroImage ? [heroImage] : []),
    ...(destinationImages || []),
    ...(stayImages || []),
    ...(activityImages || []),
    ...images,
  ].filter((img, i, arr) => arr.indexOf(img) === i); // deduplicate

  // Build labeled sections — only include categories that actually have images
  const sections: { img: string; icon: string; label: string }[] = [];
  if (destinationImages && destinationImages.length > 0) {
    sections.push({ img: destinationImages[0], icon: "location_on", label: "Destination" });
  }
  if (stayImages && stayImages.length > 0) {
    sections.push({ img: stayImages[0], icon: "hotel", label: "Stay" });
  }
  if (activityImages && activityImages.length > 0) {
    sections.push({ img: activityImages[0], icon: "paragliding", label: "Activities" });
  }

  // galleryImages must be declared BEFORE the cell-building logic that references it
  const galleryImages = allImages.length > 0 ? allImages : (heroImage ? [heroImage] : []);

  // Build a pool of RIGHT-SIDE cells from:
  //   1. Labeled category images (destination, stay, activities)
  //   2. Extra general images (not already used as hero)
  // Never reuse the hero image. Never repeat the same URL.
  const usedUrls = new Set<string>(galleryImages[0] ? [galleryImages[0]] : []);
  const rightCells: { img: string; icon?: string; label?: string }[] = [];

  // Add labeled sections first (max 3)
  for (const s of sections) {
    if (rightCells.length >= 3) break;
    if (!usedUrls.has(s.img)) {
      rightCells.push(s);
      usedUrls.add(s.img);
    }
  }

  // Fill remaining slots (up to 3 total) with general images
  for (const img of allImages) {
    if (rightCells.length >= 3) break;
    if (!usedUrls.has(img)) {
      rightCells.push({ img });
      usedUrls.add(img);
    }
  }

  // How many right cells we actually show (max 3)
  const cellCount = rightCells.length;

  // Filtered images for lightbox
  const getFilteredImages = () => {
    switch (modalFilter) {
      case "destination": return destinationImages || [];
      case "stay": return stayImages || [];
      case "activities": return activityImages || [];
      default: return galleryImages;
    }
  };
  const filteredImages = getFilteredImages();

  const openModal = (idx: number) => {
    setModalIdx(idx);
    setModalFilter("all");
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
  };

  const modalNav = useCallback(
    (dir: number) => {
      setModalIdx((prev) => (prev + dir + filteredImages.length) % filteredImages.length);
    },
    [filteredImages.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === "ArrowRight") modalNav(1);
      if (e.key === "ArrowLeft") modalNav(-1);
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [modalOpen, modalNav]);

  // Placeholder if no images
  if (!galleryImages.length) {
    return (
      <div
        style={{
          height: 460,
          borderRadius: "var(--r-xl)",
          background: "var(--iv)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
          border: "1.5px solid var(--line)",
        }}
      >
        <div style={{ textAlign: "center", color: "var(--ink4)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 48, display: "block", marginBottom: 8 }}>
            photo_library
          </span>
          <span className="syne" style={{ fontSize: 14, fontWeight: 600 }}>No photos available</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="pkg-gallery"
        style={{
          display: "grid",
          // If there are right-side cells: 2-column layout. Otherwise: single column.
          gridTemplateColumns: cellCount > 0 ? "1fr 1fr" : "1fr",
          gap: 12,
          marginBottom: 32,
          borderRadius: "var(--r-xl)",
          overflow: "hidden",
        }}
      >
        {/* Main image — spans 2 rows only when there are right cells */}
        <div
          className="gallery-main"
          style={{
            gridRow: cellCount > 0 ? "span 2" : "span 1",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => openModal(0)}
        >
          <img
            src={galleryImages[0]}
            alt={getImageName(galleryImages[0]) || "Package Main"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {getImageName(galleryImages[0]) && (
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "rgba(0, 20, 28, 0.72)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  borderRadius: 10,
                  padding: "7px 14px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  maxWidth: "90%",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)" }}>location_on</span>
                <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-jakarta), sans-serif", letterSpacing: "0.01em", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {getImageName(galleryImages[0])}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right side: adaptive grid based on actual cell count */}
        {cellCount > 0 && (
          <div
            style={{
              display: "grid",
              // 1 cell → single row
              // 2 cells → 2 rows stacked
              // 3+ cells → top cell full width + bottom row splits into 2 columns
              gridTemplateRows: cellCount === 1 ? "1fr" : cellCount === 2 ? "1fr 1fr" : "1fr 1fr",
              gridTemplateColumns: "1fr",
              gap: 12,
            }}
          >
            {/* Top cell (or only cell for count 1-2): always full width */}
            {rightCells[0] && (
              <div
                className="gallery-cell"
                style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r)", cursor: "pointer" }}
                onClick={() => openModal(1)}
              >
                <img src={rightCells[0].img} alt={getImageName(rightCells[0].img) || rightCells[0].label || "Photo 2"} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.65) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, pointerEvents: "none", display: "flex", flexDirection: "column", gap: 3 }}>
                  {rightCells[0].label && (
                    <div style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "var(--cu)", textShadow: "0 1px 6px rgba(0,0,0,.6)", display: "flex", alignItems: "center", gap: 4 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 14 }}>{rightCells[0].icon}</span>
                      {rightCells[0].label}
                    </div>
                  )}
                  {getImageName(rightCells[0].img) && (
                    <div style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.7)", display: "flex", alignItems: "center", gap: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--cu)" }}>location_on</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{getImageName(rightCells[0].img)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Second row: if 2 cells → single cell; if 3+ → two cells side by side */}
            {cellCount === 2 && rightCells[1] && (
              <div
                className="gallery-cell"
                style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r)", cursor: "pointer" }}
                onClick={() => openModal(2)}
              >
                <img src={rightCells[1].img} alt={getImageName(rightCells[1].img) || rightCells[1].label || "Photo 3"} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.65) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, pointerEvents: "none", display: "flex", flexDirection: "column", gap: 3 }}>
                  {rightCells[1].label && (
                    <div style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "var(--cu)", textShadow: "0 1px 6px rgba(0,0,0,.6)", display: "flex", alignItems: "center", gap: 4 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 14 }}>{rightCells[1].icon}</span>
                      {rightCells[1].label}
                    </div>
                  )}
                  {getImageName(rightCells[1].img) && (
                    <div style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.7)", display: "flex", alignItems: "center", gap: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--cu)" }}>location_on</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{getImageName(rightCells[1].img)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3+ images: bottom row is a 2-column split (cells 2 & 3 side by side) */}
            {cellCount >= 3 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {/* Always show cells at index 1 and 2 side by side */}
                {rightCells.slice(1, 3).map((cell, idx) => {
                  const cellIdx = idx + 1;
                  // "View All" appears on rightmost bottom cell when there are more images than visible
                  const isRightmost = idx === 1;
                  const showViewAll = isRightmost && allImages.length > (cellCount + 1);
                  return (
                    <div
                      key={cellIdx}
                      className="gallery-cell"
                      style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r)", cursor: "pointer" }}
                      onClick={() => openModal(cellIdx + 1)}
                    >
                      <img src={cell.img} alt={getImageName(cell.img) || cell.label || `Photo ${cellIdx + 2}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,28,.65) 0%, transparent 55%)" }} />
                      {!showViewAll && (
                        <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, pointerEvents: "none", display: "flex", flexDirection: "column", gap: 3 }}>
                          {cell.label && (
                            <div style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "var(--cu)", textShadow: "0 1px 6px rgba(0,0,0,.6)", display: "flex", alignItems: "center", gap: 4 }}>
                              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>{cell.icon}</span>
                              {cell.label}
                            </div>
                          )}
                          {getImageName(cell.img) && (
                            <div style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.7)", display: "flex", alignItems: "center", gap: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--cu)" }}>location_on</span>
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{getImageName(cell.img)}</span>
                            </div>
                          )}
                        </div>
                      )}
                      {showViewAll && (
                        <button
                          onClick={(e) => { e.stopPropagation(); openModal(0); }}
                          style={{ position: "absolute", bottom: 12, left: 14, fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", background: "rgba(0,20,28,.65)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 8, padding: "6px 14px", transition: "var(--tr)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
                        >
                          <span className="material-symbols-rounded" style={{ fontSize: 16 }}>photo_library</span>
                          View All Photos
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "rgba(0,10,14,.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div style={{ position: "relative", maxWidth: 1000, width: "100%" }}>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: -44,
                right: 0,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                transition: "var(--tr)",
              }}
            >
              <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 20 }}>close</span>
            </button>

            <img
              src={filteredImages[modalIdx] || galleryImages[0]}
              alt=""
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "var(--r)",
              }}
            />

            <button
              onClick={() => modalNav(-1)}
              className="lb-nav lb-nav-l"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: -60,
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                transition: "var(--tr)",
              }}
            >
              <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 26 }}>chevron_left</span>
            </button>

            <button
              onClick={() => modalNav(1)}
              className="lb-nav lb-nav-r"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: -60,
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                transition: "var(--tr)",
              }}
            >
              <span className="material-symbols-rounded" style={{ color: "#fff", fontSize: 26 }}>chevron_right</span>
            </button>

            {/* Location / Place Name & Counter */}
            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              {getImageName(filteredImages[modalIdx] || galleryImages[0]) && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 50,
                    padding: "6px 18px",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)" }}>location_on</span>
                  <span style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>
                    {getImageName(filteredImages[modalIdx] || galleryImages[0])}
                  </span>
                </div>
              )}
              <div
                style={{
                  fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,.5)",
                }}
              >
                {modalIdx + 1} / {filteredImages.length}
              </div>
            </div>

            {/* Filter buttons */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
              {[
                { id: "all", label: "All", count: galleryImages.length },
                { id: "destination", label: "Destination", count: (destinationImages || []).length },
                { id: "stay", label: "Stay", count: (stayImages || []).length },
                { id: "activities", label: "Activities", count: (activityImages || []).length },
              ].filter(f => f.count > 0 || f.id === "all").map((f) => (
                <button
                  key={f.id}
                  onClick={() => { setModalFilter(f.id); setModalIdx(0); }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 50,
                    fontSize: 11,
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    transition: "all .2s",
                    background: modalFilter === f.id ? "var(--cu)" : "rgba(255,255,255,.12)",
                    color: modalFilter === f.id ? "#fff" : "rgba(255,255,255,.6)",
                  }}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginTop: 14,
                overflowX: "auto",
                paddingBottom: 4,
              }}
            >
              {filteredImages.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setModalIdx(i)}
                  title={getImageName(src) || `Photo ${i + 1}`}
                  style={{
                    width: 60,
                    height: 44,
                    borderRadius: 8,
                    overflow: "hidden",
                    flexShrink: 0,
                    cursor: "pointer",
                    border: `2px solid ${i === modalIdx ? "var(--cu)" : "transparent"}`,
                    transition: "var(--tr)",
                  }}
                >
                  <img
                    src={src}
                    alt={getImageName(src) || `Photo ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-cell:hover img {
          transform: scale(1.04);
        }
        /* Desktop: main image tall, sub-cells smaller */
        .gallery-main {
          height: 460px;
        }
        .gallery-cell {
          height: 224px;
        }
        /* Lightbox arrows: outside on desktop, inside on mobile */
        .lb-nav-l { left: -60px; }
        .lb-nav-r { right: -60px; }

        @media (max-width: 768px) {
          /* Stack gallery to single column */
          .pkg-gallery {
            grid-template-columns: 1fr !important;
          }
          /* Main image shorter on mobile */
          .gallery-main {
            height: 260px !important;
            grid-row: span 1 !important;
          }
          /* Sub-cells in a 2-col row below */
          .gallery-cell {
            height: 130px !important;
          }
          /* Lightbox arrows inside the image on mobile */
          .lb-nav-l { left: 8px !important; }
          .lb-nav-r { right: 8px !important; }
        }

        @media (max-width: 480px) {
          .gallery-main {
            height: 220px !important;
          }
          .gallery-cell {
            height: 110px !important;
          }
        }
      `}</style>
    </>
  );
}
