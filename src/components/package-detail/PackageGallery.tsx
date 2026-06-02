"use client";

import { useState, useEffect, useCallback } from "react";

interface PackageGalleryProps {
  images: string[];
  heroImage?: string;
  destinationImages?: string[];
  stayImages?: string[];
  activityImages?: string[];
}

const cellLabels = [
  { icon: "location_on", text: "Destination" },
  { icon: "hotel", text: "Stay" },
  { icon: "paragliding", text: "Activities" },
];

export default function PackageGallery({ images, heroImage, destinationImages, stayImages, activityImages }: PackageGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [modalFilter, setModalFilter] = useState("all");

  // Build gallery: heroImage first, then category images, then general
  const allImages = [
    ...(heroImage ? [heroImage] : []),
    ...(destinationImages || []),
    ...(stayImages || []),
    ...(activityImages || []),
    ...images,
  ].filter((img, i, arr) => arr.indexOf(img) === i); // deduplicate

  // Grid cell images: destination[0], stay[0], activity[0], or fallback to general
  const gridCellImages = [
    destinationImages?.[0] || allImages[1] || allImages[0] || "",
    stayImages?.[0] || allImages[2] || allImages[0] || "",
    activityImages?.[0] || allImages[3] || allImages[0] || "",
  ];

  const galleryImages = allImages.length > 0 ? allImages : (heroImage ? [heroImage] : []);

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
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 32,
          borderRadius: "var(--r-xl)",
          overflow: "hidden",
        }}
      >
        {/* Main image */}
        <div
          style={{ gridRow: "span 2", position: "relative", height: 460, cursor: "pointer" }}
          onClick={() => openModal(0)}
        >
          <img
            src={galleryImages[0]}
            alt="Package Main"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* 2x2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="gallery-cell"
              style={{
                position: "relative",
                height: 224,
                overflow: "hidden",
                borderRadius: "var(--r)",
                cursor: "pointer",
              }}
              onClick={() => (i < 3 ? openModal(i + 1) : openModal(0))}
            >
              <img
                src={i < 3 ? (gridCellImages[i] || galleryImages[0]) : (galleryImages[4] || galleryImages[0])}
                alt={cellLabels[i]?.text || "View All"}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,20,28,.5) 0%, transparent 55%)",
                }}
              />
              {i < 3 ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 14,
                    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "0 1px 6px rgba(0,0,0,.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 15 }}>
                    {cellLabels[i]?.icon}
                  </span>
                  {cellLabels[i]?.text}
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(0);
                  }}
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 14,
                    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    background: "rgba(0,20,28,.55)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,.2)",
                    borderRadius: 8,
                    padding: "6px 14px",
                    transition: "var(--tr)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>photo_library</span>
                  View All Photos
                </button>
              )}
            </div>
          ))}
        </div>
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

            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,.5)",
              }}
            >
              {modalIdx + 1} / {filteredImages.length}
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
                    alt=""
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
        @media (max-width: 900px) {
          div:first-child {
            grid-template-columns: 1fr !important;
          }
          div:first-child > div:first-child {
            height: 280px !important;
            grid-row: span 1 !important;
          }
          .gallery-cell {
            height: 160px !important;
          }
        }
      `}</style>
    </>
  );
}
