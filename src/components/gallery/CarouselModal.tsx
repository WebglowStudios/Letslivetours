"use client";

import { useEffect, useState } from "react";

interface GalleryImage {
  _id: string;
  url: string;
  caption: string;
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
    document.body.style.overflow = "hidden"; // Prevent scrolling

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-10"
      >
        <span className="material-symbols-rounded" style={{ fontSize: 28 }}>close</span>
      </button>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-10"
      >
        <span className="material-symbols-rounded" style={{ fontSize: 32 }}>chevron_left</span>
      </button>

      {/* Main Image */}
      <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].caption || "Gallery image"}
          className="max-w-full max-h-[80vh] object-contain select-none shadow-2xl"
        />
        {images[currentIndex].caption && (
          <p className="text-white/90 text-center mt-6 text-lg font-medium syne tracking-wide max-w-2xl">
            {images[currentIndex].caption}
          </p>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-10"
      >
        <span className="material-symbols-rounded" style={{ fontSize: 32 }}>chevron_right</span>
      </button>
      
      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest font-mono">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
