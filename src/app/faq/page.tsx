"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { id: "all", label: "All Questions", icon: "quiz" },
  { id: "services", label: "Services & Destinations", icon: "explore" },
  { id: "booking", label: "Booking & Customization", icon: "calendar_today" },
  { id: "payments", label: "Payments & Pricing", icon: "payments" },
  { id: "hotels", label: "Hotels & Accommodation", icon: "hotel" },
  { id: "cancellations", label: "Changes & Cancellations", icon: "sync" },
  { id: "support", label: "Travel Support", icon: "support_agent" },
];

const faqs: Record<string, { q: string; a: string }[]> = {
  services: [
    { q: "What services does LetsLive Tours offer?", a: "We offer end-to-end travel management services, including customized itinerary planning, flight bookings, hotel reservations, transportation arrangements, sightseeing tours, visa guidance, and dedicated travel support for both domestic and international trips." },
    { q: "What are your best-selling international tour packages?", a: "Our most popular international destinations include Singapore, Bali, Malaysia, Thailand, Vietnam, Azerbaijan, Japan, Europe, and the UAE." },
    { q: "What are your best-selling domestic tour packages?", a: "Popular domestic destinations include Himachal Pradesh, Uttarakhand, Kerala, Andaman Islands, Ladakh, and many other destinations across India." },
    { q: "Do you offer honeymoon packages?", a: "Yes. We create customized honeymoon experiences including romantic stays, private excursions, and special arrangements such as beachside candlelight dinners." },
    { q: "Do you arrange group tours and corporate trips?", a: "Yes. We organize group tours, corporate travel, incentive trips, and customized group departures." },
    { q: "Do you offer women-only, senior citizen, or special interest tours?", a: "Yes. We organize tours for couples, families, senior citizens, men-only groups, women-only groups, and customized travel groups." },
    { q: "What is the typical group size for group tours?", a: "Our average group size is around 20 travelers, although this may vary depending on the destination and package." },
    { q: "Can you help me plan a trip within my budget?", a: "Absolutely. Our travel consultants recommend destinations, hotels, and experiences based on your budget and preferences." },
    { q: "Do you offer cruise bookings?", a: "Yes. We have direct partnerships with leading cruise operators and can assist with cruise vacations." },
  ],
  booking: [
    { q: "Can I customize my travel itinerary?", a: "Yes. All itineraries can be customized according to your preferences, travel style, budget, and special requests." },
    { q: "Do you assist with visa applications?", a: "Yes. We assist with visa applications and documentation. Final approval remains at the discretion of the respective embassy or consulate." },
    { q: "Is my visa guaranteed if I apply through LetsLive Tours?", a: "No. While we provide complete assistance, visa approval decisions are made solely by the embassy or consulate." },
    { q: "What documents are required for international travel?", a: "Generally, you will need a passport with at least 6 months validity, flight tickets, hotel confirmations, and a travel itinerary. Additional documents may be required depending on the destination." },
    { q: "How do I book a trip with LetsLive Tours?", a: "Simply share your destination, travel dates, and requirements. We will provide a customized quote and handle all bookings after confirmation." },
    { q: "How far in advance should I book my trip?", a: "International trips: at least 2 months in advance. Domestic trips: preferably at least 1 month before departure." },
    { q: "Do you book group flight tickets?", a: "Yes. We arrange group flight bookings for leisure groups, corporate groups, and special departures." },
  ],
  payments: [
    { q: "What payment options are available?", a: "We accept UPI, Credit Cards, Debit Cards, Net Banking, Razorpay, and CCAvenue. EMI options are available on eligible credit cards." },
    { q: "What is your payment policy?", a: "Flight Bookings: 100% payment at the time of booking. Ground Package: 30% advance payment for confirmation, remaining balance payable at least 10 days before departure." },
    { q: "Are there any hidden charges in the package?", a: "No. We maintain complete transparency and clearly mention all inclusions, exclusions, and costs." },
    { q: "What is included in your tour packages?", a: "Packages typically include accommodation, transportation, sightseeing, and services specified in the itinerary." },
    { q: "Will package prices change after I receive a quote?", a: "Travel prices are subject to airline and hotel dynamic pricing. Delayed confirmations may result in price revisions." },
  ],
  hotels: [
    { q: "Are the hotels mentioned in the itinerary guaranteed?", a: "Yes. Confirmed hotels are guaranteed at booking. In rare operational situations, an equivalent or higher-category property will be provided." },
    { q: "Can I choose my room number, floor, or view?", a: "Room allocation, floor preferences, and views are assigned by the hotel at check-in and cannot be guaranteed in advance." },
  ],
  cancellations: [
    { q: "Can I make changes to my booking after confirmation?", a: "Yes, wherever possible. Please contact us as early as possible." },
    { q: "What is your cancellation policy?", a: "More than 30 days before departure: 20% of package cost. 15–30 days before departure: 50% of package cost. Less than 15 days before departure: 100% cancellation charges." },
    { q: "What happens if my flight ticket is cancelled?", a: "A processing fee of ₹500 per ticket will be deducted. The remaining eligible refund amount will be processed." },
    { q: "What happens if my train ticket is cancelled?", a: "A processing fee of ₹300 per ticket will be deducted. The remaining eligible refund amount will be processed." },
  ],
  support: [
    { q: "Will I receive support during my trip?", a: "Yes. We provide 24/7 travel assistance throughout your journey." },
    { q: "How will I receive my travel documents and itinerary?", a: "You will receive digital travel vouchers, booking confirmations, and detailed itineraries via email and WhatsApp." },
    { q: "Do you provide travel insurance?", a: "Yes. We can assist and guide you in obtaining suitable travel insurance coverage." },
    { q: "Can you arrange airport transfers?", a: "Yes. Airport transfers are generally included in packages and can also be booked separately." },
    { q: "Do you assist with foreign exchange (Forex)?", a: "Yes. We assist with foreign currency exchange and can facilitate doorstep delivery in major cities." },
    { q: "Can you arrange Jain or vegetarian meals?", a: "Yes. We can accommodate Jain and vegetarian meal preferences wherever possible with prior notice." },
    { q: "Are my personal and payment details secure?", a: "Yes. Customer information is stored securely and is never shared with third parties for marketing or sales purposes." },
    { q: "Why should I book through LetsLive Tours instead of planning the trip myself?", a: "We provide expert planning, competitive pricing, trusted travel partners, personalized itineraries, 24/7 support, and a hassle-free travel experience so you can focus on enjoying your trip." },
  ],
};

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const allFaqs = Object.entries(faqs).flatMap(([cat, items]) => items.map(item => ({ ...item, cat })));

  const currentFaqs = (() => {
    let filtered = activeCategory === "all" ? allFaqs : (faqs[activeCategory] || []).map(item => ({ ...item, cat: activeCategory }));
    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = allFaqs.filter(f => f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term));
    }
    return filtered;
  })();

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--iv)", minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ background: "var(--gn)", padding: "140px 0 56px", textAlign: "center" }}>
          <div className="container">
            <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--gd)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 16 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "var(--gd)" }} />
              Help Center
            </div>
            <h1 className="serif" style={{ fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 700, color: "var(--iv)", marginBottom: 12 }}>
              Frequently Asked <em style={{ fontStyle: "italic", color: "var(--gd)" }}>Questions</em>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(249,246,240,.5)", maxWidth: 520, margin: "0 auto" }}>
              Everything you need to know about booking, payments, and traveling with LetsLive Tours.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "64px 0 80px" }}>
          <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="faq-layout" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 40 }}>
              {/* Sidebar */}
              <div className="faq-sidebar">
                {/* Search bar */}
              <div style={{ position: "sticky", top: 100 }}>
                <div style={{ position: "relative", marginBottom: 20 }}>
                  <span className="material-symbols-rounded" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "var(--ink4)" }}>search</span>
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setOpenIndex(0); }}
                    style={{ width: "100%", padding: "13px 16px 13px 42px", background: "#fff", border: "1.5px solid var(--line2)", borderRadius: 14, fontSize: 13.5, color: "var(--ink)", outline: "none", transition: "border-color .2s" }}
                  />
                  {search && (
                    <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--ink4)" }}>close</span>
                    </button>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setOpenIndex(0); }}
                      className="syne"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "14px 18px",
                        background: activeCategory === cat.id ? "#fff" : "transparent",
                        border: activeCategory === cat.id ? "1px solid var(--line)" : "1px solid transparent",
                        borderRadius: 14,
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: activeCategory === cat.id ? "var(--gn)" : "var(--ink3)",
                        cursor: "pointer",
                        transition: "var(--tr)",
                        textAlign: "left",
                        boxShadow: activeCategory === cat.id ? "var(--sh)" : "none",
                      }}
                    >
                      <span className="material-symbols-rounded" style={{ fontSize: 18, color: activeCategory === cat.id ? "var(--cu)" : "var(--ink4)" }}>{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              </div>

              {/* FAQ List */}
              <div>
                <div className="syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--cu)", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>{categories.find(c => c.id === activeCategory)?.icon}</span>
                  {categories.find(c => c.id === activeCategory)?.label}
                  <span style={{ marginLeft: 8, background: "var(--cu-gl)", color: "var(--cu-d)", padding: "2px 10px", borderRadius: 50, fontSize: 10, fontWeight: 700 }}>{currentFaqs.length}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {currentFaqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <div key={i} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r)", overflow: "hidden", transition: "var(--tr)", boxShadow: isOpen ? "var(--sh)" : "none" }}>
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 16,
                            padding: "20px 24px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span style={{ fontSize: 14.5, fontWeight: 600, color: isOpen ? "var(--gn)" : "var(--ink)", lineHeight: 1.5, flex: 1 }}>{faq.q}</span>
                          <span className="material-symbols-rounded" style={{ fontSize: 20, color: isOpen ? "var(--cu)" : "var(--ink4)", transition: "transform .3s, color .3s", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}>expand_more</span>
                        </button>
                        <div style={{ maxHeight: isOpen ? 300 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                          <div style={{ padding: "0 24px 20px", fontSize: 14, color: "var(--ink3)", lineHeight: 1.75, borderTop: "1px solid var(--line)" }}>
                            <div style={{ paddingTop: 16 }}>{faq.a}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "56px 0", background: "var(--gn)", textAlign: "center" }}>
          <div className="container">
            <h3 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--iv)", marginBottom: 10 }}>Still have questions?</h3>
            <p style={{ fontSize: 14, color: "rgba(249,246,240,.5)", marginBottom: 24 }}>Our travel experts are just a call or message away.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/contact" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "var(--cu)", color: "#fff", borderRadius: 50, fontSize: 12, fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 20px rgba(245,166,35,.3)" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>mail</span>Contact Us
              </a>
              <a href="tel:+917770088299" className="syne" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 26px", background: "transparent", color: "rgba(249,246,240,.8)", border: "1.5px solid rgba(249,246,240,.25)", borderRadius: 50, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>phone</span>+91 77700 88299
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .faq-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .faq-sidebar > div {
            position: static !important;
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
        }
        @media (max-width: 600px) {
          .faq-sidebar > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
