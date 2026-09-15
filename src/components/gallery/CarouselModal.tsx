"use client";

import { useEffect, useState } from "react";

interface GalleryImage {
  _id: string;
  url: string;
  caption?: string;
}

interface CarouselModalProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function CarouselModal({ images, initialIndex, onClose }: CarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  const currentImg = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 rounded-full p-2.5 transition-all z-20 border border-white/15 cursor-pointer shadow-lg"
        title="Close (Esc)"
      >
        <span className="material-symbols-rounded" style={{ fontSize: 26, display: "block" }}>
          close
        </span>
      </button>

      {/* Prev Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 md:left-8 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 rounded-full p-3 transition-all z-20 border border-white/15 cursor-pointer shadow-lg hover:scale-105"
          title="Previous (Left Arrow)"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 30, display: "block" }}>
            chevron_left
          </span>
        </button>
      )}

      {/* Main Image Container */}
      <div className="relative max-w-[92vw] max-h-[86vh] flex flex-col items-center justify-center p-2">
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            key={currentImg._id || currentImg.url}
            src={currentImg.url}
            alt={currentImg.caption || "Gallery image"}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "88vw",
              maxHeight: "75vh",
              objectFit: "contain",
              borderRadius: "14px",
              boxShadow: "0 24px 72px rgba(0,0,0,0.6)",
              display: "block",
            }}
          />
        </div>

        {/* Caption */}
        {currentImg.caption && (
          <div
            style={{
              marginTop: 16,
              background: "rgba(0, 20, 28, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 12,
              padding: "10px 22px",
              maxWidth: 700,
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "var(--font-jakarta), sans-serif",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {currentImg.caption}
            </p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 md:right-8 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 rounded-full p-3 transition-all z-20 border border-white/15 cursor-pointer shadow-lg hover:scale-105"
          title="Next (Right Arrow)"
        >
          <span className="material-symbols-rounded" style={{ fontSize: 30, display: "block" }}>
            chevron_right
          </span>
        </button>
      )}

      {/* Bottom Index Counter */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "5px 16px",
            borderRadius: 20,
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 12,
            fontFamily: "monospace",
            letterSpacing: 1.5,
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
