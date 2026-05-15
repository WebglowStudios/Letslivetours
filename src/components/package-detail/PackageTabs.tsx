"use client";

import { useState } from "react";

/* ── DATA ── */
const itineraryDays = [
  {
    badge: "Day 1", badgeType: "day",
    title: "Arrival in Dubai — Check-in & Welcome Dinner",
    content: `<p>Arrive at Dubai International Airport where our representative will greet you with a warm welcome. Transfer to your 5-star hotel in a private air-conditioned vehicle.</p><p>After check-in and freshening up, enjoy a welcome dinner at a rooftop restaurant with stunning views of the Dubai skyline. Rest and prepare for the adventures ahead.</p><ul><li>Private airport pickup included</li><li>Hotel check-in from 3:00 PM</li><li>Welcome dinner at rooftop restaurant</li><li>Overnight at 5-star hotel</li></ul>`,
  },
  {
    badge: "Day 2", badgeType: "day",
    title: "Burj Khalifa At the Top + Dubai Mall & Fountain Show",
    content: `<p>Start your day with a sumptuous breakfast at the hotel. Head to the iconic <strong>Burj Khalifa</strong> for the "At the Top" experience — ascend to the 124th floor observation deck for panoramic views of the city, desert, and Arabian Gulf.</p><p>Spend the afternoon exploring the <strong>Dubai Mall</strong> — the world's largest shopping mall with over 1,200 stores, an indoor ice rink, and the Dubai Aquarium. In the evening, witness the spectacular <strong>Dubai Fountain Show</strong> — the world's largest choreographed fountain system.</p><ul><li>Burj Khalifa At the Top (124th floor) tickets included</li><li>Dubai Mall exploration</li><li>Dubai Fountain Show viewing</li><li>Dinner at Dubai Mall food court or restaurant of choice</li></ul>`,
  },
  {
    badge: "Day 3", badgeType: "day",
    title: "Desert Safari — Dune Bashing, Camel Ride & BBQ Dinner",
    content: `<p>Morning at leisure. In the afternoon, embark on the most thrilling experience of your trip — the <strong>Desert Safari</strong>. Board a 4x4 Land Cruiser for heart-pumping dune bashing across the golden sand dunes of the Arabian Desert.</p><p>Arrive at a traditional Bedouin camp for camel riding, sandboarding, henna painting, and a stunning sunset. Enjoy a lavish BBQ dinner with live entertainment including belly dancing and Tanoura shows under a canopy of stars.</p><ul><li>Hotel pickup and drop-off included</li><li>Dune bashing in 4x4 Land Cruiser</li><li>Camel riding & sandboarding</li><li>Henna painting & traditional costumes</li><li>BBQ dinner with live entertainment</li></ul>`,
  },
  {
    badge: "Day 4", badgeType: "day",
    title: "Old Dubai — Creek, Gold Souk, Spice Souk & Abra Ride",
    content: `<p>Discover the soul of old Dubai on a guided heritage tour. Cross the historic <strong>Dubai Creek</strong> on a traditional wooden Abra (water taxi) and explore the vibrant <strong>Gold Souk</strong> — home to over 300 jewellery shops — and the aromatic <strong>Spice Souk</strong>.</p><p>Visit the <strong>Al Fahidi Historical Neighbourhood</strong> with its wind-tower architecture and the Dubai Museum. Lunch at a traditional Emirati restaurant before returning to the hotel.</p><ul><li>Guided heritage tour with English-speaking guide</li><li>Abra (water taxi) ride across Dubai Creek</li><li>Gold Souk & Spice Souk visit</li><li>Al Fahidi Historical Neighbourhood</li><li>Traditional Emirati lunch included</li></ul>`,
  },
  {
    badge: "Day 5", badgeType: "day",
    title: "Palm Jumeirah & Atlantis + Dubai Marina Dhow Cruise",
    content: `<p>Visit the iconic <strong>Palm Jumeirah</strong> — the world's largest man-made island — via the Palm Monorail. Explore the legendary <strong>Atlantis The Palm</strong> resort and enjoy optional access to the Aquaventure Waterpark.</p><p>In the evening, board a traditional <strong>Dhow Cruise</strong> along the glittering Dubai Marina. Enjoy a live dinner buffet with international cuisine, live music, and entertainment as the city's skyline reflects on the water.</p><ul><li>Palm Monorail tickets included</li><li>Atlantis The Palm visit</li><li>Optional Aquaventure Waterpark (at extra cost)</li><li>Dubai Marina Dhow Cruise with dinner</li></ul>`,
  },
  {
    badge: "Day 6", badgeType: "day",
    title: "Dubai Frame, Miracle Garden & Global Village",
    content: `<p>Visit the <strong>Dubai Frame</strong> — a 150-metre tall picture frame structure offering views of both old and new Dubai simultaneously. Then head to the stunning <strong>Miracle Garden</strong> (seasonal, Oct–Apr) — the world's largest natural flower garden with over 150 million blooms.</p><p>In the evening, explore the <strong>Global Village</strong> — a multicultural festival park featuring pavilions from 90+ countries with food, shopping, and entertainment.</p><ul><li>Dubai Frame tickets included</li><li>Miracle Garden visit (seasonal)</li><li>Global Village evening visit</li><li>Dinner at Global Village food court</li></ul>`,
  },
  {
    badge: "Day 7", badgeType: "day",
    title: "Leisure Day — Shopping, Spa or Optional Add-ons",
    content: `<p>Enjoy a free day to explore Dubai at your own pace. Options include a visit to <strong>Ibn Battuta Mall</strong>, a relaxing spa session at the hotel, or optional add-ons like a helicopter tour over the Palm Jumeirah or a hot air balloon ride over the desert.</p><p>In the evening, enjoy a farewell dinner at a restaurant of your choice — we recommend the stunning <strong>At.mosphere</strong> restaurant on the 122nd floor of Burj Khalifa.</p><ul><li>Day at leisure</li><li>Optional helicopter tour (at extra cost)</li><li>Optional hot air balloon ride (at extra cost)</li><li>Farewell dinner (own expense or upgrade available)</li></ul>`,
  },
  {
    badge: "Day 8", badgeType: "day",
    title: "Departure — Airport Transfer & Fond Farewell",
    content: `<p>Enjoy a final breakfast at the hotel. Check out and transfer to Dubai International Airport in a private vehicle for your onward journey. Our representative will assist with check-in formalities.</p><p>Carry home memories of golden deserts, glittering skylines, and the warmth of Arabian hospitality. Until next time!</p><ul><li>Breakfast at hotel included</li><li>Hotel checkout by 12:00 PM</li><li>Private airport transfer included</li><li>Assistance with airport check-in</li></ul>`,
  },
];

const summaryDays = [
  { badge: "Day 1", title: "Arrival & Welcome Dinner", content: "<p>Airport pickup → Hotel check-in → Welcome rooftop dinner → Overnight stay.</p>" },
  { badge: "Day 2", title: "Burj Khalifa + Dubai Mall", content: "<p>Breakfast → Burj Khalifa 124F observation deck → Dubai Mall → Dubai Fountain Show → Dinner.</p>" },
  { badge: "Day 3", title: "Desert Safari & BBQ", content: "<p>Morning leisure → Afternoon desert safari → Dune bashing → Camel ride → BBQ dinner with live shows.</p>" },
  { badge: "Day 4", title: "Old Dubai Heritage Tour", content: "<p>Breakfast → Dubai Creek Abra ride → Gold Souk → Spice Souk → Al Fahidi → Emirati lunch → Hotel.</p>" },
  { badge: "Day 5", title: "Palm Jumeirah + Marina Cruise", content: "<p>Breakfast → Palm Monorail → Atlantis visit → Evening Dubai Marina Dhow Cruise with dinner.</p>" },
  { badge: "Day 6", title: "Dubai Frame + Global Village", content: "<p>Breakfast → Dubai Frame → Miracle Garden → Evening Global Village → Dinner.</p>" },
  { badge: "Day 7", title: "Leisure + Farewell Dinner", content: "<p>Free day → Optional helicopter/balloon tour → Farewell dinner at restaurant of choice.</p>" },
  { badge: "Day 8", title: "Departure", content: "<p>Breakfast → Hotel checkout → Private airport transfer → Departure.</p>" },
];

const activities = [
  { badge: "Activity 1", badgeType: "activity", title: "Burj Khalifa — At the Top (124th Floor)", content: `<p>Ascend to the 124th floor of the world's tallest building in a high-speed elevator. The observation deck offers 360° panoramic views of Dubai's skyline, the Arabian Gulf, and the surrounding desert. Best experienced at sunset.</p><ul><li>Duration: ~2 hours</li><li>Tickets included in package</li><li>Best time: Sunset (5:30–7:00 PM)</li><li>Dress code: Smart casual</li></ul>` },
  { badge: "Activity 2", badgeType: "activity", title: "Desert Safari — Dune Bashing & Bedouin Camp", content: `<p>The quintessential Dubai experience. Board a 4x4 Land Cruiser for exhilarating dune bashing across the red sand dunes. Arrive at a traditional Bedouin camp for camel riding, sandboarding, henna painting, and a BBQ dinner with belly dancing and Tanoura shows.</p><ul><li>Duration: ~6 hours (3 PM – 9 PM)</li><li>Pickup and drop-off from hotel included</li><li>BBQ dinner included</li><li>Suitable for all ages (not recommended for pregnant women)</li></ul>` },
  { badge: "Activity 3", badgeType: "activity", title: "Dubai Marina Dhow Cruise with Dinner", content: `<p>Sail along the stunning Dubai Marina on a traditional wooden dhow. Enjoy a live dinner buffet with international and Emirati cuisine, live music, and entertainment as the city's glittering skyline reflects on the calm waters.</p><ul><li>Duration: ~2.5 hours</li><li>Dinner buffet included</li><li>Live entertainment on board</li><li>Departure: 8:30 PM</li></ul>` },
  { badge: "Activity 4", badgeType: "activity", title: "Dubai Creek Abra Ride & Heritage Walk", content: `<p>Cross the historic Dubai Creek on a traditional wooden Abra (water taxi) — one of the most authentic experiences in Dubai. Explore the Gold Souk, Spice Souk, and the Al Fahidi Historical Neighbourhood with a knowledgeable guide.</p><ul><li>Duration: ~4 hours</li><li>English-speaking guide included</li><li>Abra ride included</li><li>Traditional Emirati lunch included</li></ul>` },
];

const stays = [
  { badge: "Stay 1", badgeType: "stay", title: "Jumeirah Emirates Towers — 5-Star Luxury (Nights 1–4)", content: `<p>Stay at the iconic <strong>Jumeirah Emirates Towers</strong> — one of Dubai's most recognisable landmarks. Located in the heart of the city on Sheikh Zayed Road, this 5-star hotel offers stunning views of the Dubai skyline and easy access to all major attractions.</p><ul><li>Room type: Deluxe King Room</li><li>Breakfast included daily</li><li>Swimming pool, spa & fitness centre access</li><li>Check-in: Day 1 | Check-out: Day 5</li><li>4 nights</li></ul>` },
  { badge: "Stay 2", badgeType: "stay", title: "Atlantis The Palm — 5-Star Resort (Nights 5–7)", content: `<p>Upgrade your stay to the legendary <strong>Atlantis The Palm</strong> on the iconic Palm Jumeirah. This world-famous resort offers direct beach access, multiple pools, and the Aquaventure Waterpark right at your doorstep.</p><ul><li>Room type: Ocean Premier Room</li><li>Breakfast included daily</li><li>Aquaventure Waterpark access included</li><li>Private beach access</li><li>Check-in: Day 5 | Check-out: Day 8</li><li>3 nights</li></ul>` },
];

const transfers = [
  { badge: "Transfer 1", badgeType: "transfer", title: "Dubai International Airport → Hotel (Day 1)", content: `<p>Private air-conditioned vehicle transfer from Dubai International Airport (DXB) to your hotel. Our representative will meet you at the arrivals hall with a name board.</p><ul><li>Vehicle: Toyota Camry or equivalent</li><li>Duration: ~30–45 minutes</li><li>Meet & greet service included</li><li>Available 24/7</li></ul>` },
  { badge: "Transfer 2", badgeType: "transfer", title: "All Sightseeing Transfers (Days 2–7)", content: `<p>All transfers between hotel and sightseeing locations are included in the package. Private air-conditioned vehicles are used for all transfers throughout the trip.</p><ul><li>All transfers in private AC vehicles</li><li>Includes desert safari pickup/drop-off</li><li>Includes dhow cruise pickup/drop-off</li><li>Includes all guided tour transfers</li></ul>` },
  { badge: "Transfer 3", badgeType: "transfer", title: "Hotel → Dubai International Airport (Day 8)", content: `<p>Private air-conditioned vehicle transfer from your hotel to Dubai International Airport for your departure flight. Please ensure you are ready at least 3 hours before your flight.</p><ul><li>Vehicle: Toyota Camry or equivalent</li><li>Duration: ~30–45 minutes</li><li>Luggage assistance included</li><li>Departure assistance at airport</li></ul>` },
];

const itinImages = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&q=80",
  "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1000&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000&q=80",
  "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1000&q=80",
];

const tabs = [
  { id: "itinerary", label: "Itinerary" },
  { id: "summary", label: "Summarised View" },
  { id: "activities", label: "Activities" },
  { id: "stay", label: "Stay" },
  { id: "transfers", label: "Transfers" },
];

/* ── BADGE STYLES ── */
const badgeStyles: Record<string, React.CSSProperties> = {
  day: { background: "var(--gn)", color: "#fff" },
  activity: { background: "var(--cu-gl)", color: "var(--cu-d)" },
  stay: { background: "rgba(41,196,216,.12)", color: "var(--gn2)" },
  transfer: { background: "var(--gn-gl)", color: "var(--gn)" },
};

/* ── ACCORDION ITEM ── */
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { badge: string; badgeType?: string; title: string; content: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--r)",
        border: `1.5px solid ${isOpen ? "var(--gn3)" : "var(--line)"}`,
        overflow: "hidden",
        transition: "var(--tr)",
        boxShadow: isOpen ? "var(--sh)" : "none",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          cursor: "pointer",
          gap: 14,
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            className="syne"
            style={{
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 50,
              whiteSpace: "nowrap",
              flexShrink: 0,
              ...(badgeStyles[item.badgeType || "day"] || badgeStyles.day),
            }}
          >
            {item.badge}
          </span>
          <span
            className="syne"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: isOpen ? "var(--gn)" : "var(--ink)",
              lineHeight: 1.4,
            }}
          >
            {item.title}
          </span>
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: isOpen ? "var(--gn)" : "var(--gn-gl)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "var(--tr)",
            transform: isOpen ? "rotate(45deg)" : "none",
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 16, color: isOpen ? "#fff" : "var(--gn)", transition: "var(--tr)" }}
          >
            add
          </span>
        </div>
      </button>
      <div
        style={{
          maxHeight: isOpen ? 1200 : 0,
          overflow: "hidden",
          transition: "max-height .4s ease",
        }}
      >
        <div
          style={{
            padding: "0 18px 18px",
            borderTop: "1px solid var(--line)",
            paddingTop: 14,
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: 13.5,
            color: "var(--ink3)",
            lineHeight: 1.75,
          }}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
    </div>
  );
}

export default function PackageTabs() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({
    itinerary: null,
    summary: null,
    activities: null,
    stay: null,
    transfers: null,
  });
  const [itinIdx, setItinIdx] = useState(0);

  const toggleItem = (tab: string, idx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [tab]: prev[tab] === idx ? null : idx,
    }));
  };

  const itinNav = (dir: number) => {
    setItinIdx((prev) => (prev + dir + itinImages.length) % itinImages.length);
  };

  const getTabData = (tabId: string) => {
    switch (tabId) {
      case "itinerary": return itineraryDays;
      case "summary": return summaryDays.map((d) => ({ ...d, badgeType: "day" }));
      case "activities": return activities;
      case "stay": return stays;
      case "transfers": return transfers;
      default: return [];
    }
  };

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: 0,
          overflowX: "auto",
          borderBottom: "2px solid var(--line)",
          marginBottom: 0,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="syne"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: activeTab === tab.id ? "var(--gn)" : "var(--ink3)",
              padding: "12px 20px",
              whiteSpace: "nowrap",
              borderBottom: `2.5px solid ${activeTab === tab.id ? "var(--cu)" : "transparent"}`,
              marginBottom: -2,
              transition: "var(--tr)",
              cursor: "pointer",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div style={{ paddingTop: 20 }}>
        {/* Itinerary Hero (only for itinerary tab) */}
        {activeTab === "itinerary" && (
          <div
            style={{
              position: "relative",
              height: 340,
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <img
              src={itinImages[itinIdx]}
              alt="Dubai Itinerary"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity .3s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,20,28,.7) 0%, transparent 55%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 20, left: 22, color: "#fff" }}>
              <div className="serif" style={{ fontSize: 42, fontWeight: 700, lineHeight: 1 }}>8</div>
              <div
                className="syne"
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.8)", marginTop: 4 }}
              >
                Days in Dubai, UAE
              </div>
            </div>
            <button
              onClick={() => itinNav(-1)}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: 14,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                transition: "var(--tr)",
                boxShadow: "var(--sh)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--gn)" }}>
                chevron_left
              </span>
            </button>
            <button
              onClick={() => itinNav(1)}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: 14,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                transition: "var(--tr)",
                boxShadow: "var(--sh)",
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 22, color: "var(--gn)" }}>
                chevron_right
              </span>
            </button>
          </div>
        )}

        {/* Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {getTabData(activeTab).map((item, idx) => (
            <AccordionItem
              key={`${activeTab}-${idx}`}
              item={item}
              isOpen={activeTab === "summary" ? true : openItems[activeTab] === idx}
              onToggle={() => toggleItem(activeTab, idx)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        button:hover {
          color: var(--gn);
        }
      `}</style>
    </div>
  );
}
