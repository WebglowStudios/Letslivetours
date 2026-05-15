"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface UserItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      const data = res?.data?.users || res?.data || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) return;
    try {
      await api.del(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
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
      <h1 className="serif" style={{ fontSize: 28, marginBottom: 28, color: "var(--ink)" }}>
        Users
      </h1>

      <div className="admin-table">
        <div className="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Verified</span>
          <span>Joined</span>
          <span>Actions</span>
        </div>
        {users.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: "var(--ink3)" }}>
            No users found
          </div>
        )}
        {users.map((user) => (
          <div key={user._id} className="table-row">
            <span style={{ fontWeight: 600 }}>
              {user.firstName} {user.lastName}
            </span>
            <span style={{ fontSize: 13, color: "var(--ink3)" }}>{user.email}</span>
            <span>
              <span className={`role-badge role-${user.role}`}>{user.role}</span>
            </span>
            <span>
              {user.isVerified ? (
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "#16a34a" }}>verified</span>
              ) : (
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: "#d97706" }}>pending</span>
              )}
            </span>
            <span style={{ fontSize: 13, color: "var(--ink3)" }}>
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
            <span>
              <button
                onClick={() => handleDelete(user._id, `${user.firstName} ${user.lastName}`)}
                className="icon-btn danger"
                title="Delete user"
              >
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>delete</span>
              </button>
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .admin-table {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r);
          overflow: hidden;
        }
        .table-header {
          display: grid;
          grid-template-columns: 1.3fr 1.5fr 0.8fr 0.8fr 1fr 0.7fr;
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
          grid-template-columns: 1.3fr 1.5fr 0.8fr 0.8fr 1fr 0.7fr;
          padding: 16px 20px;
          border-bottom: 1px solid var(--line);
          align-items: center;
          font-size: 14px;
        }
        .table-row:last-child { border-bottom: none; }
        .table-row:hover { background: var(--iv); }
        .role-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .role-admin { background: #ccfbf1; color: #0d9488; }
        .role-user { background: #f3f4f6; color: #6b7280; }
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
            grid-template-columns: 1.3fr 1.5fr 0.8fr 0.7fr;
          }
          .table-header span:nth-child(4),
          .table-header span:nth-child(5),
          .table-row span:nth-child(4),
          .table-row span:nth-child(5) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
