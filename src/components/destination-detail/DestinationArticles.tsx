"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Article {
  img: string;
  cat: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface Props {
  destinationName: string;
  destinationId?: string;
}

export default function DestinationArticles({ destinationName, destinationId }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!destinationName && !destinationId) {
      setLoading(false);
      return;
    }

    async function fetchArticles() {
      try {
        // Prefer destination ID (exact match) over tag name (fuzzy)
        const query = destinationId
          ? `/articles?destination=${encodeURIComponent(destinationId)}&limit=5`
          : `/articles?tag=${encodeURIComponent(destinationName)}&limit=5`;
        const res = await api.get(query);
        if (res.status === "success" && res.data && res.data.length > 0) {
          setArticles(
            res.data.map((a: { coverImage?: string; category: string; title: string; excerpt: string; readTime: number; slug: string }) => ({
              img: a.coverImage || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
              cat: a.category,
              title: a.title,
              excerpt: a.excerpt,
              date: `${a.readTime} min`,
              slug: a.slug,
            }))
          );
        }
      } catch {
        // No articles found — component won't render
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [destinationName]);

  // Don't render the section if no articles or still loading
  if (loading || articles.length === 0) return null;

  return (
    <section style={{ padding: "96px 0", background: "var(--iv)", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        {/* Head */}
        <div className="rv dest-art-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative" }}>
          <div>
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--cu)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--cu)" }} />
              Travel Journal
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginTop: 10 }}>
              Stories from <em style={{ fontStyle: "italic", color: "var(--cu)" }}>{destinationName}</em>
            </h2>
          </div>
          <Link href="/articles" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--gn2)", borderBottom: "1.5px solid var(--gn-gl)", paddingBottom: 2, textDecoration: "none" }}>
            Read all posts <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_forward</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="rv dest-art-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginTop: 52 }}>
          {articles.map((a, i) => (
            <Link
              key={i}
              href={`/articles/${a.slug}`}
              className="dest-art-card"
              style={{
                background: "var(--iv2)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "var(--tr)",
                textDecoration: "none",
                ...(i === 0 && articles.length > 2 ? { gridColumn: "1 / 3" } : {}),
              }}
            >
              <div style={{ position: "relative", overflow: "hidden", height: i === 0 && articles.length > 2 ? 340 : 200 }}>
                <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s", filter: "brightness(.8)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.6) 0%, transparent 60%)" }} />
              </div>
              <div style={{ padding: 24 }}>
                <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--cu)", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "block", width: 13, height: 1.5, background: "var(--cu)" }} />
                  {a.cat}
                </div>
                <div className="serif" style={{ fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, marginBottom: 10 }}>{a.title}</div>
                <div style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.65, marginBottom: 16 }}>{a.excerpt}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14, fontSize: 12, color: "var(--ink4)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>calendar_today</span>{a.date}
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--gn2)", display: "flex", alignItems: "center", gap: 4 }}>
                    Read more <span className="material-symbols-rounded" style={{ fontSize: 14 }}>arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dest-art-card:hover {
          transform: translateY(-7px);
          box-shadow: var(--sh-lg);
          border-color: var(--cu) !important;
        }
        .dest-art-card:hover img {
          transform: scale(1.06);
          filter: brightness(.92) !important;
        }
        @media (max-width: 768px) {
          .dest-art-grid { grid-template-columns: 1fr !important; }
          .dest-art-grid > :first-child { grid-column: auto !important; }
          .dest-art-head {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .dest-art-card > div:first-child {
            height: 220px !important;
          }
        }
      `}</style>
    </section>
  );
}
