"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { openRazorpayCheckout } from "@/lib/razorpay";

export default function PayInstallmentPage() {
  const params = useParams();
  const paymentId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [customAmountToPay, setCustomAmountToPay] = useState<string>("");

  useEffect(() => {
    if (!paymentId) return;

    api.get(`/operations/public-payments/${paymentId}/details`)
      .then((res) => {
        if (res.status === "success") {
          setDetails(res.data);
          setCustomAmountToPay(res.data.amountDue > 0 ? res.data.amountDue.toString() : "");
          if (res.data.status === "paid" || res.data.amountDue <= 0) {
            setSuccess(true);
          }
        } else {
          setError(res.message || "Failed to load payment details.");
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load payment details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paymentId]);

  const handlePay = async () => {
    if (!details) return;
    const finalAmount = Number(customAmountToPay);
    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter a valid amount to pay.");
      return;
    }
    if (finalAmount > details.amountDue) {
      alert("Amount cannot exceed the total due.");
      return;
    }

    setPaying(true);
    try {
      const orderRes = await api.post(`/operations/public-payments/${paymentId}/create-order`, { customAmount: finalAmount });
      if (orderRes.status !== "success") {
        alert(orderRes.message || "Could not initiate payment.");
        setPaying(false);
        return;
      }
      
      const { orderId, amount: amountPaise } = orderRes.data;

      await openRazorpayCheckout({
        key: details.keyId,
        amount: amountPaise,
        currency: "INR",
        name: "LetsLive Tours",
        description: `${details.packageName} - ${details.milestone}`,
        order_id: orderId,
        prefill: {
          name: details.customerName || "",
          email: details.customerEmail || "",
          contact: details.customerPhone || "",
        },
        theme: { color: "#00AECC" },
        handler: async (response) => {
          try {
            await api.post(`/operations/public-payments/${paymentId}/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setSuccess(true);
            setDetails({ ...details, amountDue: 0, status: 'paid' });
            alert("Payment successful!");
          } catch {
            alert("Payment received but verification failed. Please contact support.");
          }
          setPaying(false);
        },
      });
    } catch (err: any) {
      alert("Failed to open payment gateway.");
      setPaying(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .installment-page {
          min-height: 100vh;
          background-color: #f0fafa;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
        }
        .installment-main {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
        }
        .installment-card {
          width: 100%;
          max-width: 480px;
          background-color: #fff;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 77, 94, 0.1);
          overflow: hidden;
        }
        .installment-header {
          background-color: #00AECC;
          padding: 1.5rem 2rem;
          text-align: center;
          color: white;
        }
        .installment-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }
        .installment-header p {
          font-size: 0.875rem;
          opacity: 0.9;
          margin: 0;
        }
        .installment-body {
          padding: 2rem;
        }
        .installment-info-group {
          margin-bottom: 1.5rem;
        }
        .installment-label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-bottom: 0.25rem;
          display: block;
        }
        .installment-value {
          font-size: 1.125rem;
          color: #111827;
          font-weight: 500;
          margin: 0;
        }
        .installment-box {
          background-color: #f9fafb;
          border: 1px solid #f3f4f6;
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .installment-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .installment-row:last-child {
          margin-bottom: 0;
        }
        .installment-row.total {
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
        }
        .installment-row.due {
          padding-top: 0.75rem;
        }
        .installment-row-label {
          color: #4b5563;
          font-size: 0.95rem;
        }
        .installment-row-val {
          font-weight: 600;
          color: #111827;
          font-size: 0.95rem;
        }
        .installment-due-label {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
        }
        .installment-due-val {
          font-size: 1.5rem;
          font-weight: 700;
          color: #00AECC;
        }
        .installment-billed {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .installment-billed span {
          font-weight: 500;
          color: #111827;
        }
        .installment-btn {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          background-color: #00AECC;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .installment-btn:hover {
          background-color: #0099b3;
        }
        .installment-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .installment-footer {
          text-align: center;
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 1rem;
        }
        .installment-status {
          text-align: center;
          padding: 2rem 0;
        }
        .status-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
          font-size: 2rem;
          font-weight: bold;
        }
        .status-icon.loading { color: #00AECC; }
        .status-icon.error { background: #fee2e2; color: #ef4444; }
        .status-icon.success { background: #dcfce7; color: #22c55e; }
        .status-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }
        .status-desc {
          color: #6b7280;
          margin: 0;
        }
      `}} />
      <div className="installment-page">
        <main className="installment-main">
          <div className="installment-card">
            <div className="installment-header">
              <h2>Secure Payment</h2>
              <p>Letslive Tours</p>
            </div>

            <div className="installment-body">
              {loading ? (
                <div className="installment-status">
                  <div className="status-icon loading">...</div>
                  <p className="status-desc">Loading payment details...</p>
                </div>
              ) : error ? (
                <div className="installment-status">
                  <div className="status-icon error">!</div>
                  <h3 className="status-title">Error</h3>
                  <p className="status-desc">{error}</p>
                </div>
              ) : success ? (
                <div className="installment-status">
                  <div className="status-icon success">✓</div>
                  <h3 className="status-title">Payment Complete!</h3>
                  <p className="status-desc">
                    This installment has been fully paid. Thank you!
                  </p>
                </div>
              ) : details ? (
                <div>
                  <div className="installment-info-group">
                    <span className="installment-label">For Package</span>
                    <h3 className="installment-value">{details.packageName}</h3>
                  </div>

                  <div className="installment-box">
                    <div className="installment-row">
                      <span className="installment-row-label">Milestone</span>
                      <span className="installment-row-val">{details.milestone || 'Installment'}</span>
                    </div>
                    <div className="installment-row total">
                      <span className="installment-row-label">Total Amount</span>
                      <span className="installment-row-val">₹{details.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="installment-row due">
                      <span className="installment-due-label">Amount Due</span>
                      <span className="installment-due-val">₹{details.amountDue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {details.customerName && (
                    <div className="installment-billed">
                      Billed to: <span>{details.customerName}</span><br/>
                      {details.customerEmail && <>{details.customerEmail}</>}
                    </div>
                  )}

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label className="installment-label" style={{ marginBottom: "0.5rem" }}>Amount you wish to pay now (₹)</label>
                    <input 
                      type="number" 
                      value={customAmountToPay} 
                      onChange={(e) => setCustomAmountToPay(e.target.value)}
                      style={{ 
                        width: "100%", 
                        padding: "0.875rem", 
                        borderRadius: "12px", 
                        border: "1px solid #d1d5db", 
                        fontSize: "1.125rem", 
                        fontWeight: "600",
                        color: "#111827",
                        outline: "none"
                      }}
                    />
                  </div>

                  <button
                    onClick={handlePay}
                    disabled={paying}
                    className="installment-btn"
                  >
                    {paying ? "Processing..." : `Pay ₹${Number(customAmountToPay || 0).toLocaleString('en-IN')}`}
                  </button>
                  <div className="installment-footer">
                    Secured by Razorpay
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
