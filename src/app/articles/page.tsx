"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  readTime: number;
  publishedAt?: string;
  author?: { firstName: string; lastName: string };
}

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/articles?limit=20`)
      .then((r) => r.json())
      .then((res) => setArticles(res?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", marginBottom: 10 }}>Travel Journal</div>
          <h1 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "var(--ink)" }}>
            Stories from the <em style={{ fontStyle: "italic", color: "var(--cu)" }}>Road</em>
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink3)", marginTop: 10, maxWidth: 500, margin: "10px auto 0" }}>
            Travel tips, destination guides, and stories from our community of explorers.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div style={{ width: 40, height: 40, border: "4px solid var(--line2)", borderTopColor: "var(--cu)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : articles.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--ink3)", fontSize: 15 }}>No articles published yet. Check back soon!</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {articles.map((a) => (
              <Link key={a._id} href={`/articles/${a.slug}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", overflow: "hidden", transition: "var(--tr)" }}>
                {a.coverImage && (
                  <img src={a.coverImage} alt={a.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                )}
                <div style={{ padding: 20 }}>
                  <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--cu)", marginBottom: 8 }}>{a.category}</div>
                  <h3 className="serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.6, marginBottom: 12 }}>{a.excerpt}</p>
                  <div style={{ fontSize: 12, color: "var(--ink4)", display: "flex", justifyContent: "space-between" }}>
                    <span>{a.readTime} min read</span>
                    {a.author && <span>{a.author.firstName} {a.author.lastName}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
