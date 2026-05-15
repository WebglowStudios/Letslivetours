"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Destination {
  _id: string;
  name: string;
  category: string;
  region: string;
  rating: number;
  isFeatured: boolean;
  packages?: string[];
}

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDestinations = async () => {
    try {
      const res = await api.get("/destinations?limit=50");
      const data = res?.data?.destinations || res?.data || [];
      setDestinations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;
    try {
      await api.del(`/destinations/${id}`);
      setDestinations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Failed to delete destination:", err);
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      await api.put(`/destinations/${id}`, { isFeatured: !current });
      setDestinations((prev) =>
        prev.map((d) => (d._id === id ? { ...d, isFeatured: !current } : d))
      );
    } catch (err) {
      console.error("Failed to toggle featured:", err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--gn)", animation: "spin 1s linear infinite" }}>
          progress_activity
        </span>
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <h1 className="serif" style={{ fontSize: 28, color: "var(--ink)" }}>
          Manage Destinations
        </h1>
        <button onClick={() => alert("Coming soon")} className="add-btn">
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>add</span>
          Add New
        </button>
      </div>

      <div className="admin-table">
        <div className="table-header">
          <span>Name</span>
          <span>Category</span>
          <span>Region</span>
          <span>Packages</span>
          <span>Rating</span>
          <span>Featured</span>
          <span>Actions</span>
        </div>
        {destinations.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: "var(--ink3)" }}>
            No destinations found
          </div>
        )}
        {destinations.map((dest) => (
          <div key={dest._id} className="table-row">
            <span style={{ fontWeight: 600 }}>{dest.name}</span>
            <span>
              <span className="category-badge">{dest.category}</span>
            </span>
            <span>{dest.region || "—"}</span>
            <span>{dest.packages?.length || 0}</span>
            <span>
              <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--cu)", verticalAlign: "middle" }}>star</span>
              {" "}{dest.rating?.toFixed(1) || "—"}
            </span>
            <span>
              <button
                onClick={() => toggleFeatured(dest._id, dest.isFeatured)}
                className={`toggle-btn ${dest.isFeatured ? "active" : ""}`}
              >
                <span className="toggle-dot" />
              </button>
            </span>
            <span className="action-btns">
              <button onClick={() => alert("Coming soon")} className="icon-btn" title="Edit">
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>edit</span>
              </button>
              <button onClick={() => handleDelete(dest._id, dest.name)} className="icon-btn danger" title="Delete">
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>delete</span>
              </button>
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--gn);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--tr);
        }
        .add-btn:hover { background: var(--gn2); }
        .admin-table {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .table-header {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 0.8fr 0.8fr 0.8fr 1fr;
          padding: 14px 20px;
          background: var(--iv2);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--ink3);
        }
        .table-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 0.8fr 0.8fr 0.8fr 1fr;
          padding: 16px 20px;
          border-bottom: 1px solid var(--line);
          align-items: center;
          font-size: 14px;
        }
        .table-row:last-child { border-bottom: none; }
        .table-row:hover { background: var(--iv); }
        .category-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          background: var(--iv2);
          color: var(--gn);
          text-transform: capitalize;
        }
        .toggle-btn {
          width: 40px;
          height: 22px;
          border-radius: 11px;
          border: none;
          background: #ddd;
          position: relative;
          cursor: pointer;
          transition: background .2s;
        }
        .toggle-btn.active { background: var(--gn); }
        .toggle-dot {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          transition: transform .2s;
        }
        .toggle-btn.active .toggle-dot { transform: translateX(18px); }
        .action-btns {
          display: flex;
          gap: 8px;
        }
        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid var(--line2);
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          color: var(--ink3);
          transition: var(--tr);
        }
        .icon-btn:hover { background: var(--iv2); color: var(--gn); }
        .icon-btn.danger:hover { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
        @media (max-width: 900px) {
          .table-header, .table-row {
            grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 1fr;
          }
          .table-header span:nth-child(3),
          .table-header span:nth-child(4),
          .table-row span:nth-child(3),
          .table-row span:nth-child(4) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
