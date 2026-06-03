"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author?: { firstName: string; lastName: string };
  readTime: number;
  publishedAt?: string;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/articles/${slug}`)
      .then((r) => r.json())
      .then((res) => { if (res.data) setArticle(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ width: 40, height: 40, border: "4px solid var(--line2)", borderTopColor: "var(--cu)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column", gap: 16 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 48, color: "var(--ink4)" }}>article</span>
          <p style={{ fontSize: 16, color: "var(--ink3)" }}>Article not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <>
      <Navbar />
      <article style={{ maxWidth: 780, margin: "0 auto", padding: "100px 24px 60px" }}>
        {/* Category + Read time */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--cu)", background: "var(--cu-gl)", padding: "4px 12px", borderRadius: 50 }}>
            {article.category}
          </span>
          <span style={{ fontSize: 12, color: "var(--ink4)" }}>{article.readTime} min read</span>
          {formattedDate && <span style={{ fontSize: 12, color: "var(--ink4)" }}>• {formattedDate}</span>}
        </div>

        {/* Title */}
        <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 16 }}>
          {article.title}
        </h1>

        {/* Author */}
        {article.author && (
          <p style={{ fontSize: 14, color: "var(--ink3)", marginBottom: 32 }}>
            By <strong style={{ color: "var(--ink2)" }}>{article.author.firstName} {article.author.lastName}</strong>
          </p>
        )}

        {/* Cover image */}
        {article.coverImage && (
          <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", marginBottom: 36 }}>
            <img src={article.coverImage} alt={article.title} style={{ width: "100%", height: 420, objectFit: "cover" }} />
          </div>
        )}

        {/* Content */}
        <div
          className="article-content"
          style={{ fontSize: 16, color: "var(--ink2)", lineHeight: 1.85 }}
          dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br/><br/>") }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
            {article.tags.map((tag, i) => (
              <span key={i} style={{ fontSize: 12, color: "var(--ink3)", background: "var(--iv2)", padding: "4px 12px", borderRadius: 50 }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
      <Footer />
    </>
  );
}
