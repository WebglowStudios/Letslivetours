export default function CareersMarquee() {
  const items = [
    "Travel Experts", "Remote Friendly", "Annual Travel Perks", "Fast Growth",
    "Inclusive Culture", "Health Insurance", "Learning Budget", "Flexible Hours",
    "Travel Experts", "Remote Friendly", "Annual Travel Perks", "Fast Growth",
    "Inclusive Culture", "Health Insurance", "Learning Budget", "Flexible Hours",
  ];

  return (
    <div id="marquee" style={{ background: "var(--gn)", overflow: "hidden", padding: "14px 0" }}>
      <div style={{ display: "flex", width: "max-content", animation: "mq 38s linear infinite" }}>
        {items.map((item, i) => (
          <div key={i} className="syne" style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 38px", fontSize: 11.5, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(249,246,240,.5)", whiteSpace: "nowrap" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cu)", flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
