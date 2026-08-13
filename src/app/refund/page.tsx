"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--iv)", minHeight: "100vh" }}>
        {/* Hero Banner */}
        <section style={{ background: "var(--gn)", padding: "140px 0 56px", textAlign: "center" }}>
          <div className="container">
            <button onClick={() => window.history.back()} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--gd)", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 16, justifyContent: "center" }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>arrow_back</span>
              Back
            </button>
            <h1 className="playfair" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--iv)", marginBottom: 12 }}>
              Refund &amp; Cancellation Policy
            </h1>
            <p style={{ fontSize: 15, color: "rgba(249,246,240,.5)", maxWidth: 520, margin: "0 auto" }}>
              Payment terms, cancellation fees and refund timelines
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "64px 0 80px" }}>
          <div className="container" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", padding: "48px 52px", boxShadow: "var(--sh)" }} className="policy-card">

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>1. Confirmation Policy</h2>
                <p>Once payment is completed, you will receive a confirmation email from LetsLive Tours. Please ensure that any remaining balance is paid in full before the travel date.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>2. Refund Policy</h2>
                <p>Refunds will be processed within <strong>10 business days</strong>. The applicable refund amount depends on the cancellation terms below.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>3. Cancellation Policy</h2>
                <div className="cancel-table">
                  <div className="cancel-row">
                    <div className="cancel-timing">30 days or more before travel</div>
                    <div className="cancel-fee">25% cancellation fee</div>
                  </div>
                  <div className="cancel-row">
                    <div className="cancel-timing">15 to 30 days before travel</div>
                    <div className="cancel-fee">50% cancellation fee</div>
                  </div>
                  <div className="cancel-row cancel-full">
                    <div className="cancel-timing">0 to 15 days before travel</div>
                    <div className="cancel-fee">100% cancellation fee</div>
                  </div>
                </div>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>4. Payment Terms Policy</h2>
                <p>The total tour cost must be paid in full <strong>7 days before the travel date</strong> to confirm your booking.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>5. Flight Booking Terms and Conditions</h2>
                
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink2)", marginBottom: 12, marginTop: 20 }}>5.1 Flight Booking Policy</h3>
                <p>100% payment is required at the time of flight booking. The flight ticket will be issued within 1 to 6 hours of receiving payment.</p>

                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink2)", marginBottom: 12, marginTop: 20 }}>5.2 Trains / Flight Cancellation Policy</h3>
                <ul>
                  <li>Any cancellations, delays, or changes to flight schedules are the responsibility of the airline.</li>
                  <li>Refunds for flight cancellations or rescheduling are subject to the airline&apos;s terms and conditions.</li>
                </ul>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>6. Contact Us</h2>
                <p>If you have any questions about our refund or cancellation policy, please contact us by email: <a href="mailto:info@letslivetours.com" style={{ color: "var(--gn2)", textDecoration: "underline" }}>info@letslivetours.com</a></p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .policy-section {
          margin-bottom: 36px;
          padding-bottom: 36px;
          border-bottom: 1px solid var(--line);
        }
        .policy-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .policy-section p {
          font-size: 14.5px;
          line-height: 1.8;
          color: var(--ink2);
          margin-bottom: 12px;
        }
        .policy-section ul, .policy-section ol {
          padding-left: 24px;
          margin: 12px 0 16px;
        }
        .policy-section li {
          font-size: 14px;
          line-height: 1.8;
          color: var(--ink2);
          margin-bottom: 6px;
        }
        .policy-section ul { list-style: disc; }
        .policy-section ol { list-style: decimal; }
        .cancel-table {
          border-radius: var(--r);
          overflow: hidden;
          border: 1px solid var(--line);
          margin: 16px 0;
        }
        .cancel-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid var(--line);
        }
        .cancel-row:last-child {
          border-bottom: none;
        }
        .cancel-timing {
          font-size: 14px;
          color: var(--ink2);
          font-weight: 500;
        }
        .cancel-fee {
          font-size: 14px;
          font-weight: 700;
          color: var(--gn);
          background: var(--gn-gl);
          padding: 4px 14px;
          border-radius: 20px;
        }
        .cancel-full .cancel-fee {
          color: #c07d10;
          background: var(--cu-gl);
        }
        @media (max-width: 768px) {
          .policy-card { padding: 28px 20px !important; }
          .cancel-row { flex-direction: column; gap: 8px; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
