"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarouselModal from "@/components/gallery/CarouselModal";
import ProgressBar from "@/components/ProgressBar";

interface GalleryImage {
  _id: string;
  url: string;
  caption: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${baseUrl}/gallery?activeOnly=true`);
        const data = await res.json();
        if (data.status === "success" && Array.isArray(data.data)) {
          setImages(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <ProgressBar />
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "var(--iv)",
          paddingTop: 130,
          paddingBottom: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "0 24px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 48,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="syne"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3.5,
                textTransform: "uppercase",
                color: "var(--cu)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <span style={{ display: "block", width: 24, height: 1.5, background: "var(--cu)" }} />
              Our Memories
              <span style={{ display: "block", width: 24, height: 1.5, background: "var(--cu)" }} />
            </div>

            <h1
              className="serif"
              style={{
                fontSize: "clamp(34px, 4.5vw, 54px)",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.15,
                letterSpacing: -1,
                margin: 0,
              }}
            >
              Trip Gallery
            </h1>

            <p
              style={{
                maxWidth: 620,
                fontSize: 16,
                color: "var(--ink3)",
                lineHeight: 1.7,
                marginTop: 14,
                marginBottom: 0,
                textAlign: "center",
              }}
            >
              Explore moments captured from our past trips and get inspired for your next adventure with LetsLive.
            </p>
          </div>

          {/* Body Section */}
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "80px 0",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  border: "3px solid rgba(0, 77, 94, 0.15)",
                  borderTopColor: "var(--gn)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <p style={{ color: "var(--ink3)", fontSize: 14 }}>Loading memories...</p>
            </div>
          ) : images.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "90px 24px",
                background: "#fff",
                borderRadius: "var(--r-xl)",
                border: "1px solid var(--line2)",
                boxShadow: "var(--sh)",
                maxWidth: 580,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--iv2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "var(--gn)",
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 32 }}>
                  photo_library
                </span>
              </div>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                No Photos Yet
              </h3>
              <p style={{ color: "var(--ink3)", fontSize: 15, margin: 0 }}>
                Check back soon for new memories and photos from our latest group tours!
              </p>
            </div>
          ) : (
            <div
              className="gallery-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 24,
              }}
            >
              {images.map((img, index) => (
                <div
                  key={img._id}
                  className="gallery-card group"
                  onClick={() => setSelectedIndex(index)}
                  style={{
                    position: "relative",
                    height: 290,
                    borderRadius: "var(--r-xl)",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "var(--iv2)",
                    boxShadow: "0 6px 24px rgba(0, 77, 94, 0.07)",
                    border: "1px solid rgba(0, 77, 94, 0.08)",
                  }}
                >
                  {/* Photo */}
                  <img
                    src={img.url}
                    alt={img.caption || "Trip photo"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0, 20, 28, 0.88) 0%, rgba(0, 20, 28, 0.25) 50%, transparent 80%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Expand Icon on Hover */}
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(0, 20, 28, 0.65)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      transition: "all 0.3s ease",
                    }}
                    className="opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                      zoom_in
                    </span>
                  </div>

                  {/* Bottom Caption */}
                  {img.caption && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "16px 18px",
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <div
                        style={{
                          background: "rgba(0, 20, 28, 0.7)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.16)",
                          borderRadius: 10,
                          padding: "6px 12px",
                          color: "#fff",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          maxWidth: "100%",
                          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                        }}
                      >
                        <span
                          className="material-symbols-rounded"
                          style={{ fontSize: 16, color: "var(--cu)", flexShrink: 0 }}
                        >
                          location_on
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            fontFamily: "var(--font-jakarta), sans-serif",
                            letterSpacing: "0.01em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {img.caption}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {selectedIndex !== null && (
        <CarouselModal
          images={images}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .gallery-card {
            height: 240px !important;
          }
        }
      `}</style>
    </>
  );
}
