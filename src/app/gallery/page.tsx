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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery?activeOnly=true`);
        const data = await res.json();
        if (data.status === 'success') {
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

      <main style={{ minHeight: "100vh", background: "var(--iv)", paddingTop: 140, paddingBottom: 100 }}>
        <div className="container">
          <div className="text-center mb-16">
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              Our Memories
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
            </div>
            <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.1, letterSpacing: -1 }}>
              Trip Gallery
            </h1>
            <p className="mt-6 mx-auto" style={{ maxWidth: 600, fontSize: 16, color: "var(--ink3)", lineHeight: 1.7 }}>
              Explore moments captured from our past trips and get inspired for your next adventure with LetsLive.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004d5e]"></div>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-32 text-gray-500">
              Check back soon for new memories!
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, index) => (
                <div 
                  key={img._id}
                  className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer relative group"
                  onClick={() => setSelectedIndex(index)}
                >
                  <img 
                    src={img.url} 
                    alt={img.caption || "Trip photo"} 
                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {img.caption && (
                      <p className="text-white font-medium syne tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {img.caption}
                      </p>
                    )}
                  </div>
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
    </>
  );
}
