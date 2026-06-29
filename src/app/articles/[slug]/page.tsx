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
          dangerouslySetInnerHTML={{ __html: article.content.includes("<") ? article.content : article.content.replace(/\n/g, "<br/><br/>") }}
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

      <style jsx global>{`
        .article-content h1 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: var(--ink); line-height: 1.3; }
        .article-content h2 { font-size: 1.6rem; font-weight: 700; margin: 1.5rem 0 0.6rem; color: var(--ink); line-height: 1.3; }
        .article-content h3 { font-size: 1.25rem; font-weight: 600; margin: 1.2rem 0 0.5rem; color: var(--ink2); line-height: 1.4; }
        .article-content p { margin: 0.75rem 0; }
        .article-content ul, .article-content ol { padding-left: 1.5rem; margin: 0.75rem 0; }
        .article-content li { margin: 0.4rem 0; }
        .article-content blockquote { border-left: 4px solid var(--cu); padding: 1rem 1.25rem; margin: 1.5rem 0; background: var(--cu-gl); border-radius: 0 var(--r) var(--r) 0; font-style: italic; color: var(--ink3); }
        .article-content img { max-width: 100%; height: auto; border-radius: var(--r); margin: 1.5rem 0; box-shadow: var(--sh); }
        .article-content a { color: var(--gn2); text-decoration: underline; text-underline-offset: 3px; }
        .article-content a:hover { color: var(--gn); }
        .article-content code { background: var(--iv2); padding: 2px 7px; border-radius: 5px; font-size: 0.9em; color: #be185d; }
        .article-content pre { background: var(--gn); color: #e0f5f7; padding: 1.25rem; border-radius: var(--r); overflow-x: auto; margin: 1.5rem 0; font-size: 0.85rem; line-height: 1.6; }
        .article-content hr { border: none; border-top: 2px solid var(--line2); margin: 2rem 0; }
        .article-content table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; border-radius: var(--r); overflow: hidden; border: 1px solid var(--line2); }
        .article-content th { background: var(--iv2); padding: 12px 16px; text-align: left; font-weight: 600; font-size: 0.875rem; color: var(--ink); border: 1px solid var(--line2); }
        .article-content td { padding: 10px 16px; font-size: 0.9rem; border: 1px solid var(--line); color: var(--ink2); }
        .article-content tr:nth-child(even) td { background: var(--iv); }
        .article-content mark { background: #fef08a; padding: 1px 4px; border-radius: 3px; }
        .article-content strong { color: var(--ink); }
      `}</style>

      <Footer />
    </>
  );
}
