"use client";

import { useState, useEffect, useMemo, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";

interface PackageData {
  _id: string;
  name: string;
  slug: string;
  destination?: { name: string };
  duration: { nights: number; days: number } | string;
  price: number;
  images: string[];
  description?: string;
}

interface TravellerEntry {
  name: string;
  age: string;
  phone: string;
  type: "adult" | "child" | "infant";
}

function BookingContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = params.slug as string;

  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Primary traveller (pre-filled from user)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Travel details
  const [travelDate, setTravelDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Travellers list
  const [travellers, setTravellers] = useState<TravellerEntry[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [success, setSuccess] = useState(false);

  // Pre-fill from user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const res = await api.get(`/packages/${slug}`);
        if (res.status === "success" && res.data) {
          setPkg(res.data);
        } else {
          setError("Package not found");
        }
      } catch {
        setError("Failed to load package details");
      } finally {
        setLoading(false);
      }
    }
    fetchPackage();
  }, [slug]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push("/dashboard/bookings"), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  // Add traveller
  const addTraveller = (type: "adult" | "child" | "infant") => {
    setTravellers([...travellers, { name: "", age: "", phone: "", type }]);
  };

  const removeTraveller = (index: number) => {
    setTravellers(travellers.filter((_, i) => i !== index));
  };

  const updateTraveller = (index: number, field: keyof TravellerEntry, value: string) => {
    const updated = [...travellers];
    updated[index] = { ...updated[index], [field]: value };
    setTravellers(updated);
  };

  // Count travellers
  const adultsCount = 1 + travellers.filter((t) => t.type === "adult").length; // +1 for primary
  const childrenCount = travellers.filter((t) => t.type === "child").length;

  const priceBreakdown = useMemo(() => {
    if (!pkg) return { adultTotal: 0, childTotal: 0, total: 0 };
    const adultTotal = pkg.price * adultsCount;
    const childTotal = pkg.price * 0.7 * childrenCount;
    return { adultTotal, childTotal, total: adultTotal + childTotal };
  }, [pkg, adultsCount, childrenCount]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!pkg) return;

    if (!user) {
      router.push(`/login?redirect=/book/${slug}`);
      return;
    }

    setSubmitError("");
    setSubmitting(true);

    try {
      const res = await api.post("/bookings", {
        package: pkg._id,
        travelDate,
        travellers: { adults: adultsCount, children: childrenCount, infants: travellers.filter((t) => t.type === "infant").length },
        travellersDetails: travellers.filter((t) => t.name).map((t) => ({ name: t.name, age: t.age ? Number(t.age) : undefined, phone: t.phone || undefined, type: t.type })),
        primaryTraveller: { firstName, lastName, email, phone },
        specialRequests,
        contactPhone: phone,
        contactEmail: email,
      });

      if (res.status === "success" && res.data) {
        setBookingId(res.data.bookingId || res.data._id);
        setSuccess(true);
      } else {
        setSubmitError(res.message || "Failed to create booking.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  // ─── States ───
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)" }}>
        <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--gn2)", animation: "spin 1s linear infinite" }}>progress_activity</span>
        <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)", flexDirection: "column", gap: 16 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--ink4)" }}>error_outline</span>
        <h2 className="serif" style={{ fontSize: 24, color: "var(--ink)" }}>{error || "Package not found"}</h2>
        <button onClick={() => router.back()} className="syne" style={{ padding: "10px 24px", background: "var(--gn)", border: "none", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Go Back</button>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)" }}>
        <div style={{ textAlign: "center", maxWidth: 420, padding: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(74,194,138,.12)", border: "2px solid rgba(74,194,138,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <span className="material-symbols-rounded" style={{ fontSize: 36, color: "#4AC28A" }}>check_circle</span>
          </div>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Booking Confirmed!</h2>
          <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.6 }}>Your booking ID: <strong style={{ color: "var(--gn)" }}>{bookingId}</strong></p>
          <p style={{ fontSize: 12, color: "var(--ink4)", marginTop: 12 }}>Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <section style={{ minHeight: "100vh", background: "var(--iv)", padding: "100px 0 80px" }}>
      <Navbar />
      <div className="container">
        <div className="booking-layout" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
          {/* ─── FORM ─── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {submitError && (
              <div style={{ padding: "12px 16px", background: "rgba(220,53,69,.08)", border: "1px solid rgba(220,53,69,.2)", borderRadius: 12, fontSize: 13, color: "#dc3545", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>error</span>{submitError}
              </div>
            )}

            {/* Primary Traveller */}
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
              <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>person</span>
                Primary Traveller
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>First Name *</label>
                  <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" style={{ width: "100%", padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }} />
                </div>
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Last Name *</label>
                  <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" style={{ width: "100%", padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }} />
                </div>
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Email *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@email.com" style={{ width: "100%", padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }} />
                </div>
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Phone</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" style={{ width: "100%", padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }} />
                </div>
              </div>
            </div>

            {/* Travel Date */}
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
              <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>calendar_today</span>
                Travel Date
              </h3>
              <input type="date" required min={tomorrow} value={travelDate} onChange={(e) => setTravelDate(e.target.value)} style={{ width: "100%", padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }} />
            </div>

            {/* Additional Travellers */}
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>groups</span>
                  Additional Travellers
                </h3>
              </div>
              <p style={{ fontSize: 12, color: "var(--ink4)", marginBottom: 16 }}>Add details for each co-traveller (primary traveller is already counted)</p>

              {/* Add buttons */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <button type="button" onClick={() => addTraveller("adult")} className="syne" style={{ padding: "8px 16px", background: "var(--gn-gl)", border: "1px solid var(--line2)", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "var(--gn)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>add</span>Adult
                </button>
                <button type="button" onClick={() => addTraveller("child")} className="syne" style={{ padding: "8px 16px", background: "rgba(245,166,35,.08)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "var(--cu-d)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>add</span>Child (2-11)
                </button>
                <button type="button" onClick={() => addTraveller("infant")} className="syne" style={{ padding: "8px 16px", background: "rgba(0,174,204,.08)", border: "1px solid rgba(0,174,204,.2)", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "var(--gn2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>add</span>Infant (0-2)
                </button>
              </div>

              {/* Traveller list */}
              {travellers.length === 0 ? (
                <div style={{ padding: "24px 16px", background: "var(--iv)", borderRadius: 12, textAlign: "center" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 28, color: "var(--ink4)", marginBottom: 8, display: "block" }}>person_add</span>
                  <p style={{ fontSize: 12, color: "var(--ink4)" }}>No additional travellers added. Click above to add.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {travellers.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "var(--iv)", borderRadius: 10, border: "1px solid var(--line)", flexWrap: "wrap" }}>
                      <span className="syne" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: t.type === "adult" ? "var(--gn)" : t.type === "child" ? "var(--cu-d)" : "var(--gn2)", background: t.type === "adult" ? "var(--gn-gl)" : t.type === "child" ? "rgba(245,166,35,.1)" : "rgba(0,174,204,.1)", padding: "3px 8px", borderRadius: 4, flexShrink: 0 }}>
                        {t.type}
                      </span>
                      <input type="text" placeholder="Full name" value={t.name} onChange={(e) => updateTraveller(i, "name", e.target.value)} style={{ flex: "1 1 120px", padding: "8px 12px", background: "#fff", border: "1px solid var(--line2)", borderRadius: 8, fontSize: 13, color: "var(--ink)", outline: "none" }} />
                      <input type="number" placeholder="Age" value={t.age} onChange={(e) => updateTraveller(i, "age", e.target.value)} style={{ width: 56, padding: "8px 8px", background: "#fff", border: "1px solid var(--line2)", borderRadius: 8, fontSize: 13, color: "var(--ink)", outline: "none", textAlign: "center" }} />
                      <input type="tel" placeholder="Phone (optional)" value={t.phone} onChange={(e) => updateTraveller(i, "phone", e.target.value)} style={{ flex: "1 1 130px", padding: "8px 12px", background: "#fff", border: "1px solid var(--line2)", borderRadius: 8, fontSize: 13, color: "var(--ink)", outline: "none" }} />
                      <button type="button" onClick={() => removeTraveller(i)} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(220,53,69,.08)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 16, color: "#dc3545" }}>close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Special Requests */}
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
              <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>edit_note</span>
                Special Requests
              </h3>
              <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Any dietary needs, accessibility requirements, or special occasions..." rows={3} style={{ width: "100%", padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none", resize: "vertical" }} />
            </div>

            {/* Submit (mobile only - desktop has it in sidebar) */}
            <button type="submit" disabled={submitting} className="syne book-submit-mobile" style={{ display: "none", width: "100%", padding: 16, background: submitting ? "var(--ink4)" : "var(--gn)", border: "none", borderRadius: 50, color: "#fff", fontSize: 15, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 24px rgba(0,77,94,.2)" }}>
              {submitting ? "Processing..." : "Confirm Booking"}
            </button>
          </form>

          {/* ─── SIDEBAR (Price + Summary) ─── */}
          <div style={{ position: "sticky", top: 84 }}>
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 24, boxShadow: "var(--sh)" }}>
              {/* Package preview */}
              <div style={{ marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                {pkg.images?.[0] && <div style={{ height: 140, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}><img src={pkg.images[0]} alt={pkg.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
                <h3 className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>{pkg.name}</h3>
                {pkg.destination && <p style={{ fontSize: 12, color: "var(--ink3)", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>location_on</span>{pkg.destination.name}</p>}
                {typeof pkg.duration === "object" && <p style={{ fontSize: 12, color: "var(--ink3)", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--gn2)" }}>schedule</span>{pkg.duration.nights}N / {pkg.duration.days}D</p>}
              </div>

              {/* Price breakdown */}
              <div style={{ marginBottom: 16 }}>
                <div className="syne" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 10 }}>Price Breakdown</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink3)", marginBottom: 6 }}>
                  <span>Adults ({adultsCount} x {formatCurrency(pkg.price)})</span>
                  <span style={{ fontWeight: 600, color: "var(--ink)" }}>{formatCurrency(priceBreakdown.adultTotal)}</span>
                </div>
                {childrenCount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink3)", marginBottom: 6 }}>
                    <span>Children ({childrenCount} x {formatCurrency(pkg.price * 0.7)})</span>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>{formatCurrency(priceBreakdown.childTotal)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, marginTop: 6, borderTop: "1px solid var(--line)" }}>
                  <span className="syne" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>Total</span>
                  <span className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--gn)" }}>{formatCurrency(priceBreakdown.total)}</span>
                </div>
              </div>

              {/* Book button */}
              <button type="submit" form="booking-form-id" disabled={submitting} onClick={handleSubmit} className="syne" style={{ width: "100%", padding: 14, background: submitting ? "var(--ink4)" : "var(--gn)", border: "none", borderRadius: 50, color: "#fff", fontSize: 14, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 20px rgba(0,77,94,.2)", transition: "var(--tr)" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{submitting ? "hourglass_empty" : "check_circle"}</span>
                {submitting ? "Processing..." : "Confirm Booking"}
              </button>

              {/* Trust */}
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                {[{ icon: "lock", t: "Secure" }, { icon: "cached", t: "Free cancel" }, { icon: "support_agent", t: "24/7" }].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--ink4)" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--gn3)" }}>{b.icon}</span>{b.t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .booking-layout { grid-template-columns: 1fr !important; }
          .book-submit-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}

export default function BookPage() {
  return <BookingContent />;
}
