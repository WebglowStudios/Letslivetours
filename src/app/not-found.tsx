import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--iv)",
        padding: 20,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div
          className="serif"
          style={{
            fontSize: "clamp(100px, 15vw, 180px)",
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--gn)",
            opacity: 0.12,
            letterSpacing: -5,
          }}
        >
          404
        </div>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            color: "var(--ink)",
            marginTop: -30,
            lineHeight: 1.2,
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--ink3)",
            lineHeight: 1.72,
            marginTop: 14,
            maxWidth: 400,
            marginInline: "auto",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            className="syne"
            style={{
              padding: "12px 28px",
              background: "var(--cu)",
              color: "#fff",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
              textDecoration: "none",
              transition: "var(--tr)",
            }}
          >
            Go Home
          </Link>
          <Link
            href="/destinations"
            className="syne"
            style={{
              padding: "12px 28px",
              background: "transparent",
              color: "var(--gn)",
              border: "1.5px solid var(--line2)",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
              textDecoration: "none",
              transition: "var(--tr)",
            }}
          >
            Browse Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
