"use client";

import { useState, useEffect, useMemo, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

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

function BookingContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = params.slug as string;

  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [travelDate, setTravelDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");
  const [contactPhone, setContactPhone] = useState(user?.phone || "");
  const [contactEmail, setContactEmail] = useState(user?.email || "");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      if (!contactPhone && user.phone) setContactPhone(user.phone);
      if (!contactEmail && user.email) setContactEmail(user.email);
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

  // Redirect on success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/dashboard/bookings");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const priceBreakdown = useMemo(() => {
    if (!pkg) return { adultTotal: 0, childTotal: 0, total: 0 };
    const adultTotal = pkg.price * adults;
    const childTotal = pkg.price * 0.7 * children;
    return { adultTotal, childTotal, total: adultTotal + childTotal };
  }, [pkg, adults, children]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!pkg) return;

    // Check if user is logged in before booking
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
        travellers: { adults, children },
        specialRequests,
        contactPhone,
        contactEmail,
      });

      if (res.status === "success" && res.data) {
        setBookingId(res.data._id);
        setSuccess(true);
      } else {
        setSubmitError(res.message || "Failed to create booking. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)" }}>
        <div style={{ textAlign: "center" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--gn2)", animation: "spin 1s linear infinite" }}>progress_activity</span>
          <p className="syne" style={{ marginTop: 16, fontSize: 14, color: "var(--ink3)" }}>Loading package...</p>
        </div>
        <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)" }}>
        <div style={{ textAlign: "center" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--ink4)", marginBottom: 16 }}>error_outline</span>
          <h2 className="serif" style={{ fontSize: 24, color: "var(--ink)", marginBottom: 8 }}>{error || "Package not found"}</h2>
          <button onClick={() => router.back()} className="syne" style={{ padding: "10px 24px", background: "var(--gn)", border: "none", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Go Back</button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)" }}>
        <div style={{ textAlign: "center", maxWidth: 440, padding: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(74,194,138,.12)", border: "2px solid rgba(74,194,138,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <span className="material-symbols-rounded" style={{ fontSize: 40, color: "#4AC28A" }}>check_circle</span>
          </div>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Booking Confirmed!</h2>
          <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 8 }}>Your booking has been placed successfully.</p>
          <p className="syne" style={{ fontSize: 12, color: "var(--ink4)", marginBottom: 20 }}>Booking ID: <strong style={{ color: "var(--gn)" }}>{bookingId}</strong></p>
          <p style={{ fontSize: 13, color: "var(--ink4)" }}>Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <section style={{ minHeight: "100vh", background: "var(--iv)", padding: "40px 0 80px" }}>
      <div className="container">
        <div className="booking-layout" style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 32, alignItems: "start" }}>
          {/* Package Summary Card */}
          <div style={{ background: "#fff", borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--line)", position: "sticky", top: 100 }}>
            <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
              <img
                src={pkg.images?.[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"}
                alt={pkg.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,94,.6) 0%, transparent 50%)" }} />
            </div>
            <div style={{ padding: 24 }}>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>{pkg.name}</h3>
              {pkg.destination && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--ink3)", marginBottom: 6 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--cu)" }}>location_on</span>
                  {pkg.destination.name}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--ink3)", marginBottom: 16 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 14, color: "var(--gn2)" }}>schedule</span>
                {typeof pkg.duration === "object" ? `${pkg.duration.nights}N / ${pkg.duration.days}D` : pkg.duration}
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
                <div className="syne" style={{ fontSize: 10, color: "var(--ink4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Price per person</div>
                <div className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--gn)" }}>{formatCurrency(pkg.price)}</div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div style={{ padding: "0 24px 24px" }}>
              <div style={{ background: "var(--iv)", borderRadius: 12, padding: 16 }}>
                <div className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 12 }}>Price Breakdown</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink3)", marginBottom: 8 }}>
                  <span>Adults ({adults} × {formatCurrency(pkg.price)})</span>
                  <span style={{ fontWeight: 600, color: "var(--ink)" }}>{formatCurrency(priceBreakdown.adultTotal)}</span>
                </div>
                {children > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink3)", marginBottom: 8 }}>
                    <span>Children ({children} × {formatCurrency(pkg.price * 0.7)})</span>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>{formatCurrency(priceBreakdown.childTotal)}</span>
                  </div>
                )}
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="syne" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Total</span>
                  <span className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--gn)" }}>{formatCurrency(priceBreakdown.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div style={{ background: "#fff", borderRadius: "var(--r-xl)", padding: 36, border: "1px solid var(--line)" }}>
            <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Complete Your Booking</h2>
            <p style={{ fontSize: 14, color: "var(--ink3)", marginBottom: 28, lineHeight: 1.6 }}>Fill in the details below to confirm your trip.</p>

            {submitError && (
              <div style={{ padding: "12px 16px", background: "rgba(229,57,53,.08)", border: "1px solid rgba(229,57,53,.2)", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#e53935", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>error</span>
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Travel Date */}
              <div style={{ marginBottom: 20 }}>
                <label className="syne" style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 8 }}>Travel Date *</label>
                <input
                  type="date"
                  required
                  min={tomorrow}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  style={{ width: "100%", padding: "14px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }}
                />
              </div>

              {/* Travellers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 8 }}>Adults *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={10}
                    value={adults}
                    onChange={(e) => setAdults(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    style={{ width: "100%", padding: "14px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }}
                  />
                </div>
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 8 }}>Children</label>
                  <input
                    type="number"
                    min={0}
                    max={8}
                    value={children}
                    onChange={(e) => setChildren(Math.max(0, Math.min(8, parseInt(e.target.value) || 0)))}
                    style={{ width: "100%", padding: "14px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 8 }}>Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={{ width: "100%", padding: "14px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }}
                  />
                </div>
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 8 }}>Contact Phone</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{ width: "100%", padding: "14px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }}
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div style={{ marginBottom: 28 }}>
                <label className="syne" style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 8 }}>Special Requests</label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                  rows={4}
                  style={{ width: "100%", padding: "14px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none", resize: "vertical" }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="syne"
                style={{
                  width: "100%",
                  padding: 16,
                  background: submitting ? "var(--ink4)" : "var(--gn)",
                  border: "none",
                  borderRadius: 50,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "var(--tr)",
                  boxShadow: "0 8px 24px rgba(0,77,94,.2)",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 20 }}>{submitting ? "hourglass_empty" : "check_circle"}</span>
                {submitting ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .booking-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export default function BookPage() {
  return <BookingContent />;
}
