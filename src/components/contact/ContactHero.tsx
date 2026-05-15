"use client";

export default function ContactHero() {
  return (
    <section style={{ height: "80vh", minHeight: 560, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=1600&q=80" alt="Contact" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.5)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(0,77,94,.97) 0%, rgba(0,77,94,.5) 50%, rgba(0,77,94,.1) 80%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="container" style={{ position: "relative", zIndex: 5, width: "100%" }}>
        <div style={{ padding: "0 0 80px 0", maxWidth: 760 }}>
          <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "var(--cu)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 28, height: 1.5, background: "var(--cu)" }} />
            We&apos;d Love to Hear From You
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(52px, 7.5vw, 100px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: -3, color: "#fff", marginBottom: 24 }}>
            Let&apos;s Plan Your<br /><em style={{ fontStyle: "italic", color: "var(--gd)" }}>Dream Trip</em>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(249,246,240,.6)", lineHeight: 1.72, maxWidth: 520 }}>
            Whether you have a question, need a custom itinerary, or just want to say hello — our team of travel experts is ready to help.
          </p>
        </div>
      </div>
    </section>
  );
}
