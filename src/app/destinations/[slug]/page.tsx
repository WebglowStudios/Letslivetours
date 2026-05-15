"use client";

import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import DetailHero from "@/components/destination-detail/DetailHero";
import FilterBar from "@/components/destination-detail/FilterBar";
import PackageRow from "@/components/destination-detail/PackageRow";
import Highlights from "@/components/destination-detail/Highlights";
import GroupDeal from "@/components/destination-detail/GroupDeal";
import WhyDubai from "@/components/destination-detail/WhyDubai";
import TravelTips from "@/components/destination-detail/TravelTips";
import DetailPartners from "@/components/destination-detail/DetailPartners";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

const handpickedCards = [
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Bestseller", badgeCls: "bestseller", name: "Dubai Luxury Escape \u2014 Burj Khalifa & Desert Safari", duration: "7N / 8D", hotel: "5-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.9 \u00B7 312 reviews", origPrice: "\u20B91,74,999", price: "\u20B91,24,999", perUnit: "/person", type: "luxury" },
  { img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80", badge: "Hot Deal", badgeCls: "hot", name: "Desert Dunes & Dune Bashing Adventure Package", duration: "5N / 6D", hotel: "4-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.8 \u00B7 198 reviews", origPrice: "\u20B999,999", price: "\u20B974,999", perUnit: "/person", type: "adventure" },
  { img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80", badge: "New", badgeCls: "new", name: "Dubai Marina & Palm Jumeirah Luxury Stay", duration: "6N / 7D", hotel: "5-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.9 \u00B7 245 reviews", origPrice: "\u20B91,49,999", price: "\u20B91,09,999", perUnit: "/person", type: "luxury" },
  { img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", badge: "Bestseller", badgeCls: "bestseller", name: "Dubai City Highlights \u2014 Group Tour Special", duration: "4N / 5D", hotel: "4-Star", stars: "\u2605\u2605\u2605\u2605\u2606", reviews: "4.7 \u00B7 421 reviews", origPrice: "\u20B979,999", price: "\u20B959,999", perUnit: "/person", type: "group" },
  { img: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&q=80", badge: "Hot Deal", badgeCls: "hot", name: "Burj Al Arab Experience \u2014 Ultra Luxury Getaway", duration: "3N / 4D", hotel: "7-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "5.0 \u00B7 87 reviews", origPrice: "\u20B92,49,999", price: "\u20B91,99,999", perUnit: "/person", type: "luxury" },
];

const honeymoonCards = [
  { img: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&q=80", badge: "Honeymoon Special", badgeCls: "honeymoon", name: "Romantic Dubai \u2014 Burj Al Arab & Sunset Cruise", duration: "6N / 7D", hotel: "5-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.9 \u00B7 178 reviews", origPrice: "\u20B91,89,999", price: "\u20B91,39,999", perUnit: "/couple", type: "honeymoon" },
  { img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80", badge: "Honeymoon Special", badgeCls: "honeymoon", name: "Dubai Marina Bliss \u2014 Private Yacht & Spa Retreat", duration: "5N / 6D", hotel: "5-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.8 \u00B7 134 reviews", origPrice: "\u20B91,59,999", price: "\u20B91,19,999", perUnit: "/couple", type: "honeymoon" },
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Honeymoon Special", badgeCls: "honeymoon", name: "Skyline Romance \u2014 At the Top & Desert Stargazing", duration: "4N / 5D", hotel: "5-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.9 \u00B7 96 reviews", origPrice: "\u20B91,29,999", price: "\u20B994,999", perUnit: "/couple", type: "honeymoon" },
  { img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", badge: "Honeymoon Special", badgeCls: "honeymoon", name: "Ultimate Dubai Honeymoon \u2014 7 Nights All Inclusive", duration: "7N / 8D", hotel: "5-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "5.0 \u00B7 62 reviews", origPrice: "\u20B92,19,999", price: "\u20B91,69,999", perUnit: "/couple", type: "honeymoon" },
];

const familyCards = [
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge: "Family Friendly", badgeCls: "family", name: "Dubai Family Fun \u2014 Aquaventure, IMG & City Tour", duration: "6N / 7D", hotel: "4-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.8 \u00B7 267 reviews", origPrice: "\u20B92,49,999", price: "\u20B91,89,999", perUnit: "/family", type: "family" },
  { img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", badge: "Family Friendly", badgeCls: "family", name: "Kids\u2019 Dubai Adventure \u2014 Theme Parks & Desert Camp", duration: "5N / 6D", hotel: "4-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.9 \u00B7 189 reviews", origPrice: "\u20B91,99,999", price: "\u20B91,54,999", perUnit: "/family", type: "family" },
  { img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80", badge: "Bestseller", badgeCls: "bestseller", name: "Dubai Family Luxury \u2014 Atlantis Stay & Water Park", duration: "7N / 8D", hotel: "5-Star", stars: "\u2605\u2605\u2605\u2605\u2605", reviews: "4.9 \u00B7 312 reviews", origPrice: "\u20B93,49,999", price: "\u20B92,79,999", perUnit: "/family", type: "family" },
  { img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80", badge: "Family Friendly", badgeCls: "family", name: "Desert & City Family Combo \u2014 Camel Ride Included", duration: "4N / 5D", hotel: "4-Star", stars: "\u2605\u2605\u2605\u2605\u2606", reviews: "4.7 \u00B7 143 reviews", origPrice: "\u20B91,49,999", price: "\u20B91,14,999", perUnit: "/family", type: "family" },
];

export default function DestinationDetailPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterCards = (cards: typeof handpickedCards) => {
    if (activeFilter === "all") return cards;
    return cards.filter((c) => c.type === activeFilter);
  };

  return (
    <>
      <ProgressBar />
      <Navbar />
      <DetailHero />

      {/* Marquee */}
      <div style={{ background: "var(--gn)", overflow: "hidden", padding: "14px 0" }}>
        <div style={{ display: "flex", width: "max-content", animation: "mq 38s linear infinite" }}>
          {["Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah", "Dubai Creek", "Gold Souk", "Atlantis Resort", "Dubai Frame", "Miracle Garden", "Burj Al Arab", "Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah", "Dubai Creek", "Gold Souk", "Atlantis Resort", "Dubai Frame", "Miracle Garden", "Burj Al Arab"].map((item, i) => (
            <div key={i} className="syne" style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 38px", fontSize: 11.5, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(249,246,240,.5)", whiteSpace: "nowrap" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cu)" }} />{item}
            </div>
          ))}
        </div>
      </div>

      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <PackageRow
        eyebrow="Staff Picks"
        title="Handpicked"
        titleEm="Packages"
        subtitle="Curated by our Dubai travel experts \u2014 the best experiences at unbeatable prices."
        cards={filterCards(handpickedCards)}
      />

      <Highlights />

      <PackageRow
        eyebrow="Romance Awaits"
        title="Honeymoon"
        titleEm="Packages"
        subtitle="Crafted for couples \u2014 intimate escapes with luxury stays and unforgettable moments."
        cards={filterCards(honeymoonCards)}
        alt
      />

      <GroupDeal />

      <PackageRow
        eyebrow="For the Whole Family"
        title="Family"
        titleEm="Tours"
        subtitle="Kid-friendly adventures and family memories that last a lifetime \u2014 all stress-free."
        cards={filterCards(familyCards)}
      />

      <WhyDubai />
      <TravelTips />
      <DetailPartners />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
