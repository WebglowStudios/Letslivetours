"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { openRazorpayCheckout } from "@/lib/razorpay";
import Navbar from "@/components/Navbar";
import PhoneInput from "@/components/ui/PhoneInput";

interface PackageData {
  _id: string;
  name: string;
  slug: string;
  priceUnit?: string;
  extraPersonPrice?: number;
  adultCount?: number;
  childCount?: number;
  destination?: { name: string };
  duration: { nights: number; days: number } | string;
  price: number;
  images: string[];
  description?: string;
  isGroupTour?: boolean;
  travelDates?: { startDate: string; endDate?: string };
  departures?: {
    _id: string;
    startDate: string;
    endDate?: string;
    price: number;
    totalSlots: number;
    bookedSlots?: number;
  }[];
}

interface PaymentConfig {
  mode: "full" | "partial";
  depositType: "percent" | "fixed";
  depositValue: number;
  depositLabel: string | null;
  balanceDueDays: number;
  depositAmount: number;
  keyId: string;
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
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const slug = params.slug as string;

  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState(searchParams?.get("travelDate") || "");
  const [departureId, setDepartureId] = useState(searchParams?.get("departureId") || "");
  const [departurePrice, setDeparturePrice] = useState<number | null>(null);
  const [specialRequests, setSpecialRequests] = useState("");
  const [travellers, setTravellers] = useState<TravellerEntry[]>([]);

  // payment option chosen by user (full or deposit) — only relevant when mode=partial
  const [chosenPayment, setChosenPayment] = useState<"full" | "deposit">("full");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [success, setSuccess] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; type: string; value: number; discountAmount: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/packages/${slug}`);
        if (res.status === "success" && res.data) {
          const fetchedPkg = res.data;
          setPkg(fetchedPkg);
          
          if (fetchedPkg.isGroupTour && departureId && fetchedPkg.departures) {
            const dep = fetchedPkg.departures.find((d: any) => String(d._id) === departureId);
            if (dep) {
              setTravelDate(dep.startDate.split('T')[0]);
              if (dep.price > 0) setDeparturePrice(dep.price);
            }
          } else if (fetchedPkg.travelDates?.startDate) {
            setTravelDate(fetchedPkg.travelDates.startDate.split('T')[0]);
          }
          
          // fetch payment config
          const cfgRes = await api.get(`/payments/config/${fetchedPkg._id}`);
          if (cfgRes.status === "success") {
            setPaymentConfig(cfgRes.data);
            // default to full unless partial is required
            setChosenPayment("full");
          }
        } else {
          setError("Package not found");
        }
      } catch {
        setError("Failed to load package details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, departureId]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => router.push("/dashboard/bookings"), 3500);
      return () => clearTimeout(t);
    }
  }, [success, router]);

  const addTraveller = (type: "adult" | "child" | "infant") =>
    setTravellers([...travellers, { name: "", age: "", phone: "", type }]);

  const removeTraveller = (i: number) =>
    setTravellers(travellers.filter((_, idx) => idx !== i));

  const updateTraveller = (i: number, field: keyof TravellerEntry, value: string) => {
    const u = [...travellers];
    u[i] = { ...u[i], [field]: value };
    setTravellers(u);
  };

  const adultsCount = 1 + travellers.filter((t) => t.type === "adult").length;
  const childrenCount = travellers.filter((t) => t.type === "child").length;

  const basePrice = useMemo(() => {
    if (!pkg) return 0;
    return departurePrice !== null ? departurePrice : pkg.price;
  }, [pkg, departurePrice]);

  const priceBreakdown = useMemo(() => {
    if (!pkg) return { adultTotal: 0, childTotal: 0, extraPaxTotal: 0, extraPaxCount: 0, includedPax: 0, total: 0 };
    if (pkg.priceUnit === "group") {
      const includedPax = (pkg.adultCount || 0) + (pkg.childCount || 0) || 1;
      const totalPax = adultsCount + childrenCount;
      if (totalPax > includedPax && pkg.extraPersonPrice) {
        const extraPaxCount = totalPax - includedPax;
        const extraPaxTotal = extraPaxCount * pkg.extraPersonPrice;
        return { adultTotal: basePrice, childTotal: 0, extraPaxTotal, extraPaxCount, includedPax, total: basePrice + extraPaxTotal };
      }
      return { adultTotal: basePrice, childTotal: 0, extraPaxTotal: 0, extraPaxCount: 0, includedPax, total: basePrice };
    }
    const adultTotal = basePrice * adultsCount;
    const childTotal = basePrice * childrenCount;
    return { adultTotal, childTotal, extraPaxTotal: 0, extraPaxCount: 0, includedPax: 0, total: adultTotal + childTotal };
  }, [pkg, adultsCount, childrenCount, basePrice]);

  // how much the user will actually pay right now
  const chargeNow = useMemo(() => {
    let finalTotal = priceBreakdown.total;
    if (appliedCoupon) {
      finalTotal -= appliedCoupon.discountAmount;
    }
    
    if (!paymentConfig || !pkg) return finalTotal;
    if (paymentConfig.mode === "full" || chosenPayment === "full") return finalTotal;
    // partial deposit — scale deposit to actual total
    if (paymentConfig.depositType === "percent") {
      return Math.round((paymentConfig.depositValue / 100) * finalTotal);
    }
    return paymentConfig.depositValue;
  }, [paymentConfig, chosenPayment, priceBreakdown.total, pkg, appliedCoupon]);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await api.post("/coupons/validate", {
        code: couponInput.trim(),
        packageId: pkg?._id,
        totalAmount: priceBreakdown.total,
      });
      if (res.status === "success") {
        setAppliedCoupon(res.data);
      }
    } catch (err: any) {
      setCouponError(err.response?.data?.message || "Invalid discount code");
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pkg) return;
    if (!user) {
      const currentQuery = searchParams?.toString();
      const redirectUrl = `/book/${slug}${currentQuery ? `?${currentQuery}` : ""}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    // ── Client-side validation ──────────────────────────────────────────────
    if (!firstName.trim()) { setSubmitError("First name is required."); return; }
    if (!lastName.trim()) { setSubmitError("Last name is required."); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setSubmitError("A valid email address is required."); return; }
    if (!phone.trim()) { setSubmitError("Phone number is required."); return; }
    if (!travelDate) { setSubmitError("Please select a travel date."); return; }
    // ────────────────────────────────────────────────────────────────────────

    setSubmitError("");
    setSubmitting(true);

    try {
      // Step 1: Create booking (no payment yet)
      const bookingRes = await api.post("/bookings", {
        package: pkg._id,
        travelDate,
        travellers: {
          adults: adultsCount,
          children: childrenCount,
          infants: travellers.filter((t) => t.type === "infant").length,
        },
        travellersDetails: travellers
          .filter((t) => t.name)
          .map((t) => ({ name: t.name, age: t.age ? Number(t.age) : undefined, phone: t.phone || undefined, type: t.type })),
        primaryTraveller: { firstName, lastName, email, phone },
        specialRequests,
        contactPhone: phone,
        contactEmail: email,
        couponCode: appliedCoupon?.code,
        departureId: searchParams?.get("departureId") || undefined,
        enquiryId: searchParams?.get("enquiryId") || undefined,
      });

      if (bookingRes.status !== "success" || !bookingRes.data) {
        setSubmitError(bookingRes.message || "Failed to create booking.");
        setSubmitting(false);
        return;
      }

      const createdBooking = bookingRes.data;
      const paymentType = (paymentConfig?.mode === "partial" && chosenPayment === "deposit") ? "deposit" : "full";

      // Step 2: Create Razorpay order
      const orderRes = await api.post("/payments/create-order", {
        bookingId: createdBooking._id,
        paymentType,
      });

      if (orderRes.status !== "success" || !orderRes.data) {
        setSubmitError("Could not initiate payment. Please try again.");
        setSubmitting(false);
        return;
      }

      const { orderId, amountPaise, keyId, internalBookingId } = orderRes.data;

      // Step 3: Open Razorpay checkout
      await openRazorpayCheckout({
        key: keyId,
        amount: amountPaise,
        currency: "INR",
        name: "LetsLive Tours",
        description: pkg.name,
        order_id: orderId,
        prefill: { name: `${firstName} ${lastName}`, email, contact: phone },
        theme: { color: "#00AECC" },
        handler: async (response) => {
          // Step 4: Verify on backend
          try {
            await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: createdBooking._id,
              paymentType,
              amount: chargeNow,
            });
            setBookingId(internalBookingId || createdBooking._id);
            setSuccess(true);
          } catch {
            setSubmitError("Payment received but verification failed. Contact support with your payment ID: " + response.razorpay_payment_id);
          }
          setSubmitting(false);
        },
        modal: {
          ondismiss: () => {
            setSubmitError("Payment was cancelled. Your booking has been saved — complete payment from your dashboard.");
            setBookingId(internalBookingId || createdBooking._id);
            setSubmitting(false);
          },
        },
      });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)" }}>
      <span className="material-symbols-rounded" style={{ fontSize: 36, color: "var(--gn2)", animation: "spin 1s linear infinite" }}>progress_activity</span>
      <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error || !pkg) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)", flexDirection: "column", gap: 16 }}>
      <span className="material-symbols-rounded" style={{ fontSize: 56, color: "var(--ink4)" }}>error_outline</span>
      <h2 className="serif" style={{ fontSize: 24, color: "var(--ink)" }}>{error || "Package not found"}</h2>
      <button onClick={() => router.back()} className="syne" style={{ padding: "10px 24px", background: "var(--gn)", border: "none", borderRadius: 50, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Go Back</button>
    </div>
  );

  if (success) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--iv)" }}>
      <div style={{ textAlign: "center", maxWidth: 440, padding: 40 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(74,194,138,.12)", border: "2px solid rgba(74,194,138,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: 36, color: "#4AC28A" }}>check_circle</span>
        </div>
        <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>
          {paymentConfig?.mode === "partial" && chosenPayment === "deposit" ? "Booking Confirmed — Deposit Paid!" : "Booking Confirmed!"}
        </h2>
        <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.7, marginBottom: 6 }}>Booking ID: <strong style={{ color: "var(--gn)" }}>{bookingId}</strong></p>
        {paymentConfig?.mode === "partial" && chosenPayment === "deposit" && (
          <p style={{ fontSize: 13, color: "var(--ink4)", background: "rgba(245,166,35,.08)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 10, padding: "10px 16px", marginTop: 12 }}>
            Balance due <strong>{paymentConfig.balanceDueDays} days</strong> before travel. Pay it from your dashboard.
          </p>
        )}
        <p style={{ fontSize: 12, color: "var(--ink4)", marginTop: 16 }}>Redirecting to your bookings…</p>
      </div>
    </div>
  );

  return (
    <section style={{ minHeight: "100vh", background: "var(--iv)", padding: "100px 0 80px" }}>
      <Navbar />
      <div className="container">
        <div className="booking-layout" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {submitError && (
              <div style={{ padding: "12px 16px", background: "rgba(220,53,69,.08)", border: "1px solid rgba(220,53,69,.2)", borderRadius: 12, fontSize: 13, color: "#dc3545", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>error</span>{submitError}
              </div>
            )}

            {/* Primary Traveller */}
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
              <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>person</span>Primary Traveller
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { label: "First Name *", val: firstName, set: setFirstName, type: "text", ph: "John", req: true },
                  { label: "Last Name *", val: lastName, set: setLastName, type: "text", ph: "Doe", req: true },
                  { label: "Email *", val: email, set: setEmail, type: "email", ph: "john@email.com", req: true },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="syne" style={{ display: "block", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} required={f.req} value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph}
                      style={{ width: "100%", padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none" }} />
                  </div>
                ))}
                <div>
                  <label className="syne" style={{ display: "block", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Phone</label>
                  <PhoneInput value={phone} onChange={setPhone} placeholder="98765 43210" style={{ padding: "4px 4px" }} />
                </div>
              </div>
            </div>

            {/* Travel Date */}
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
              <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>calendar_today</span>Travel Date
              </h3>
              {(() => {
                const isDateLocked = !!searchParams?.get("travelDate") || !!departureId || !!pkg?.travelDates?.startDate;
                return (
                  <>
                    <input type="date" required min={tomorrow} value={travelDate} onChange={(e) => setTravelDate(e.target.value)}
                      disabled={isDateLocked}
                      style={{ width: "100%", padding: "13px 16px", background: isDateLocked ? "var(--line)" : "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: isDateLocked ? "var(--ink3)" : "var(--ink)", outline: "none", cursor: isDateLocked ? "not-allowed" : "auto" }} />
                    {isDateLocked && (
                      <p style={{ fontSize: 11, color: "var(--gn2)", marginTop: 8, fontWeight: 600 }}>
                        ✓ Date locked in for your selected itinerary.
                      </p>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Additional Travellers */}
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
              <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>groups</span>Additional Travellers
              </h3>
              <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                {(["adult", "child", "infant"] as const).map((type) => (
                  <button key={type} type="button" onClick={() => addTraveller(type)} className="syne"
                    style={{ padding: "7px 14px", background: type === "adult" ? "var(--gn-gl)" : type === "child" ? "rgba(245,166,35,.08)" : "rgba(0,174,204,.08)", border: `1px solid ${type === "adult" ? "var(--line2)" : type === "child" ? "rgba(245,166,35,.2)" : "rgba(0,174,204,.2)"}`, borderRadius: 8, fontSize: 11, fontWeight: 700, color: type === "adult" ? "var(--gn)" : type === "child" ? "var(--cu-d)" : "var(--gn2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    + {type === "adult" ? "Adult" : type === "child" ? "Child (2-11)" : "Infant (0-2)"}
                  </button>
                ))}
              </div>
              {travellers.length === 0 ? (
                <p style={{ fontSize: 12, color: "var(--ink4)", textAlign: "center", padding: "16px 0" }}>No additional travellers added. Primary traveller is already counted.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {travellers.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--iv)", borderRadius: 10, border: "1px solid var(--line)", flexWrap: "wrap" }}>
                      <span className="syne" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: t.type === "adult" ? "var(--gn)" : t.type === "child" ? "var(--cu-d)" : "var(--gn2)", padding: "3px 8px", background: t.type === "adult" ? "var(--gn-gl)" : t.type === "child" ? "rgba(245,166,35,.1)" : "rgba(0,174,204,.1)", borderRadius: 4, flexShrink: 0 }}>{t.type}</span>
                      <input type="text" placeholder="Full name" value={t.name} onChange={(e) => updateTraveller(i, "name", e.target.value)} style={{ flex: "1 1 110px", padding: "7px 10px", background: "#fff", border: "1px solid var(--line2)", borderRadius: 8, fontSize: 13, outline: "none" }} />
                      <input type="number" placeholder="Age" value={t.age} onChange={(e) => updateTraveller(i, "age", e.target.value)} style={{ width: 52, padding: "7px 6px", background: "#fff", border: "1px solid var(--line2)", borderRadius: 8, fontSize: 13, outline: "none", textAlign: "center" }} />
                      <button type="button" onClick={() => removeTraveller(i)} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(220,53,69,.08)", border: "none", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 15, color: "#dc3545" }}>close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Special Requests */}
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
              <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>edit_note</span>Special Requests
              </h3>
              <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Dietary needs, accessibility requirements, special occasions…" rows={3}
                style={{ width: "100%", padding: "13px 16px", background: "var(--iv)", border: "1.5px solid var(--line2)", borderRadius: 12, fontSize: 14, color: "var(--ink)", outline: "none", resize: "vertical" }} />
            </div>

            {/* Payment option selector — only shown for partial packages */}
            {paymentConfig?.mode === "partial" && (
              <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 28 }}>
                <h3 className="syne" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 18, color: "var(--gn2)" }}>payments</span>Payment Option
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Deposit option */}
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", border: `2px solid ${chosenPayment === "deposit" ? "var(--gn2)" : "var(--line2)"}`, borderRadius: 14, cursor: "pointer", background: chosenPayment === "deposit" ? "rgba(0,174,204,.04)" : "#fff", transition: "all .2s" }}>
                    <input type="radio" name="payOpt" value="deposit" checked={chosenPayment === "deposit"} onChange={() => setChosenPayment("deposit")} style={{ marginTop: 3, accentColor: "var(--gn2)" }} />
                    <div style={{ flex: 1 }}>
                      <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>
                        {paymentConfig.depositLabel || `Pay Deposit — ${fmt(paymentConfig.depositType === "percent" ? Math.round(paymentConfig.depositValue / 100 * priceBreakdown.total) : paymentConfig.depositValue)} now`}
                      </div>
                      <p style={{ fontSize: 12, color: "var(--ink3)", lineHeight: 1.5 }}>
                        Reserve your spot with a {paymentConfig.depositType === "percent" ? `${paymentConfig.depositValue}%` : fmt(paymentConfig.depositValue)} deposit. Pay the balance {paymentConfig.balanceDueDays} days before travel.
                      </p>
                    </div>
                    <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--gn)", flexShrink: 0 }}>
                      {fmt(paymentConfig.depositType === "percent" ? Math.round(paymentConfig.depositValue / 100 * priceBreakdown.total) : paymentConfig.depositValue)}
                    </div>
                  </label>
                  {/* Full option */}
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", border: `2px solid ${chosenPayment === "full" ? "var(--gn2)" : "var(--line2)"}`, borderRadius: 14, cursor: "pointer", background: chosenPayment === "full" ? "rgba(0,174,204,.04)" : "#fff", transition: "all .2s" }}>
                    <input type="radio" name="payOpt" value="full" checked={chosenPayment === "full"} onChange={() => setChosenPayment("full")} style={{ marginTop: 3, accentColor: "var(--gn2)" }} />
                    <div style={{ flex: 1 }}>
                      <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Pay Full Amount Now</div>
                      <p style={{ fontSize: 12, color: "var(--ink3)", lineHeight: 1.5 }}>Pay the complete package price in one go. No balance due later.</p>
                    </div>
                    <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--gn)", flexShrink: 0 }}>{fmt(priceBreakdown.total)}</div>
                  </label>
                </div>
              </div>
            )}

            {/* Mobile submit */}
            <button type="submit" disabled={submitting} className="syne book-submit-mobile"
              style={{ display: "none", width: "100%", padding: 16, background: submitting ? "var(--ink4)" : "var(--gn)", border: "none", borderRadius: 50, color: "#fff", fontSize: 15, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{submitting ? "hourglass_empty" : "lock"}</span>
              {submitting ? "Processing…" : `Pay ${fmt(chargeNow)} & Confirm`}
            </button>
          </form>

          {/* ── SIDEBAR ── */}
          <div style={{ position: "sticky", top: 84 }}>
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", border: "1px solid var(--line)", padding: 24, boxShadow: "var(--sh)" }}>
              {pkg.images?.[0] && <div style={{ height: 140, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}><img src={pkg.images[0]} alt={pkg.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
              <h3 className="serif" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3, marginBottom: 6 }}>{pkg.name}</h3>
              {pkg.destination && <p style={{ fontSize: 12, color: "var(--ink3)", display: "flex", alignItems: "center", gap: 4, marginBottom: 14 }}><span className="material-symbols-rounded" style={{ fontSize: 13, color: "var(--cu)" }}>location_on</span>{pkg.destination.name}</p>}

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, marginBottom: 14 }}>
                <div className="syne" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink4)", marginBottom: 10 }}>Price Breakdown</div>
                {pkg.priceUnit === "group" ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink3)", marginBottom: 5 }}>
                      <span>Group Total (up to {priceBreakdown.includedPax || 1} pax)</span>
                      <span style={{ fontWeight: 600, color: "var(--ink)" }}>{fmt(basePrice)}</span>
                    </div>
                    {priceBreakdown.extraPaxCount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink3)", marginBottom: 5 }}>
                        <span>Extra Persons ({priceBreakdown.extraPaxCount} × {fmt(pkg.extraPersonPrice || 0)})</span>
                        <span style={{ fontWeight: 600, color: "var(--ink)" }}>{fmt(priceBreakdown.extraPaxTotal)}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink3)", marginBottom: 5 }}>
                      <span>Adults ({adultsCount} × {fmt(basePrice)})</span>
                      <span style={{ fontWeight: 600, color: "var(--ink)" }}>{fmt(priceBreakdown.adultTotal)}</span>
                    </div>
                    {childrenCount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink3)", marginBottom: 5 }}>
                        <span>Children ({childrenCount} × {fmt(basePrice)})</span>
                        <span style={{ fontWeight: 600, color: "var(--ink)" }}>{fmt(priceBreakdown.childTotal)}</span>
                      </div>
                    )}
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--line)" }}>
                  <span className="syne" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>Package Total</span>
                  <span className="serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", textDecoration: appliedCoupon ? "line-through" : "none", opacity: appliedCoupon ? 0.5 : 1 }}>{fmt(priceBreakdown.total)}</span>
                </div>
                {appliedCoupon && (
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 5 }}>
                    <span className="syne" style={{ fontSize: 11, fontWeight: 700, color: "var(--gn2)" }}>Discount ({appliedCoupon.code})</span>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--gn2)" }}>-{fmt(appliedCoupon.discountAmount)}</span>
                  </div>
                )}
                {appliedCoupon && (
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
                    <span className="syne" style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>Final Total</span>
                    <span className="serif" style={{ fontSize: 22, fontWeight: 800, color: "var(--gn)" }}>{fmt(priceBreakdown.total - appliedCoupon.discountAmount)}</span>
                  </div>
                )}
                {paymentConfig?.mode === "partial" && chosenPayment === "deposit" && (
                  <div style={{ marginTop: 10, padding: "10px 12px", background: "rgba(245,166,35,.08)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 10, fontSize: 12, color: "var(--cu-d)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span>Due now (deposit)</span>
                      <strong>{fmt(chargeNow)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink4)" }}>
                      <span>Balance due ({paymentConfig.balanceDueDays}d before travel)</span>
                      <strong>{fmt((priceBreakdown.total - (appliedCoupon ? appliedCoupon.discountAmount : 0)) - chargeNow)}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Discount Code Input */}
              <div style={{ marginBottom: 16 }}>
                {!appliedCoupon ? (
                  <div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input
                        type="text"
                        placeholder="Discount code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="syne"
                        style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 13, outline: "none", textTransform: "uppercase" }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponInput.trim()}
                        className="syne"
                        style={{ padding: "10px 16px", background: "var(--ink2)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: (couponLoading || !couponInput.trim()) ? "not-allowed" : "pointer" }}
                      >
                        {couponLoading ? "…" : "Apply"}
                      </button>
                    </div>
                    {couponError && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6 }}>{couponError}</p>}
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(41,196,216,.1)", border: "1px dashed var(--gn2)", padding: "10px 14px", borderRadius: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 16, color: "var(--gn2)" }}>sell</span>
                      <span className="syne" style={{ fontSize: 13, fontWeight: 700, color: "var(--gn2)" }}>{appliedCoupon.code} applied</span>
                    </div>
                    <button type="button" onClick={removeCoupon} style={{ background: "none", border: "none", color: "var(--ink4)", cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>Remove</button>
                  </div>
                )}
              </div>

              <button type="submit" disabled={submitting} onClick={handleSubmit} className="syne"
                style={{ width: "100%", padding: 14, background: submitting ? "var(--ink4)" : "var(--gn)", border: "none", borderRadius: 50, color: "#fff", fontSize: 14, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 20px rgba(0,77,94,.2)", transition: "var(--tr)" }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{submitting ? "hourglass_empty" : "lock"}</span>
                {submitting ? "Processing…" : `Pay ${fmt(chargeNow)} & Confirm`}
              </button>

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
