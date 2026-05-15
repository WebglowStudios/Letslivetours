"use client";

import { useState, useEffect, useCallback } from "react";

const galleryImages = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
  "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
  "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
];

const cellLabels = [
  { icon: "location_on", text: "Destination" },
  { icon: "hotel", text: "Stay" },
  { icon: "paragliding", text: "Activities" },
];

export default function PackageGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);

  const openModal = (idx: number) => {
    setModalIdx(idx);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
  };

  const modalNav = useCallback(
    (dir: number) => {
      setModalIdx((prev) => (prev + dir + galleryImages.length) % galleryImages.length);
    },
    []
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
            alt="Dubai Luxury Escape Main"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* 2x2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[1, 2, 3, 4].map((i) => (
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
              onClick={() => (i < 4 ? openModal(i) : openModal(0))}
            >
              <img
                src={galleryImages[i] || galleryImages[0]}
                alt={cellLabels[i - 1]?.text || "View All"}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,20,28,.5) 0%, transparent 55%)",
                }}
              />
              {i < 4 ? (
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
                    {cellLabels[i - 1]?.icon}
                  </span>
                  {cellLabels[i - 1]?.text}
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
              src={galleryImages[modalIdx]}
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
              {modalIdx + 1} / {galleryImages.length}
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
              {galleryImages.map((src, i) => (
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
                    src={src.replace("w=1200", "w=120")}
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
