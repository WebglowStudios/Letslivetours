"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

interface WishlistPackage {
  _id: string;
  name: string;
  destination?: { name: string };
  images?: string[];
  price: number;
  rating?: number;
  reviewCount?: number;
}

export default function WishlistPage() {
  const [packages, setPackages] = useState<WishlistPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const res = await api.get("/users/wishlist");
      const data = res?.data?.wishlist || res?.data || [];
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(packageId: string) {
    setRemovingId(packageId);
    try {
      await api.del(`/users/wishlist/${packageId}`);
      setPackages((prev) => prev.filter((p) => p._id !== packageId));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    } finally {
      setRemovingId(null);
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 32, color: "var(--gn2)", animation: "spin 1s linear infinite" }}>
          progress_activity
        </span>
        <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 32 }}>
        My Wishlist
      </h1>

      {packages.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-xl)",
            padding: 60,
            textAlign: "center",
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 56, color: "#e91e63" }}>
            favorite
          </span>
          <p className="syne" style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: "var(--ink2)" }}>
            Your wishlist is empty
          </p>
          <p style={{ marginTop: 8, fontSize: 14, color: "var(--ink3)" }}>
            Save packages you love and come back to them later.
          </p>
          <Link
            href="/destinations"
            className="syne"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 24,
              padding: "14px 28px",
              background: "var(--gn)",
              color: "#fff",
              borderRadius: "var(--r)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Browse Destinations
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="wishlist-card"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                transition: "var(--tr)",
              }}
            >
              {/* Image */}
              <div style={{ height: 180, position: "relative", background: "var(--iv2)" }}>
                {pkg.images?.[0] ? (
                  <img
                    src={pkg.images[0]}
                    alt={pkg.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 48, color: "var(--ink4)" }}>
                      image
                    </span>
                  </div>
                )}
                {/* Remove button */}
                <button
                  onClick={() => handleRemove(pkg._id)}
                  disabled={removingId === pkg._id}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "var(--sh)",
                    opacity: removingId === pkg._id ? 0.5 : 1,
                  }}
                  title="Remove from wishlist"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: "#e91e63" }}>
                    favorite
                  </span>
                </button>
              </div>

              {/* Content */}
              <div style={{ padding: 20 }}>
                <p className="syne" style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", marginBottom: 6 }}>
                  {pkg.name}
                </p>
                <p style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 12 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 4 }}>
                    location_on
                  </span>
                  {pkg.destination?.name || "—"}
                </p>

                {/* Rating */}
                {pkg.rating !== undefined && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)" }}>
                      star
                    </span>
                    <span className="syne" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)" }}>
                      {pkg.rating.toFixed(1)}
                    </span>
                    {pkg.reviewCount !== undefined && (
                      <span style={{ fontSize: 12, color: "var(--ink3)" }}>
                        ({pkg.reviewCount})
                      </span>
                    )}
                  </div>
                )}

                {/* Price + Link */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--gn)" }}>
                    ${pkg.price?.toLocaleString()}
                  </p>
                  <Link
                    href={`/packages/${pkg._id}`}
                    className="syne"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--gn2)",
                      padding: "6px 14px",
                      background: "var(--gn-gl)",
                      borderRadius: "var(--r)",
                    }}
                  >
                    View Package
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .wishlist-card:hover {
          box-shadow: var(--sh);
          border-color: var(--line2);
        }
        @media (max-width: 1024px) {
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .wishlist-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
