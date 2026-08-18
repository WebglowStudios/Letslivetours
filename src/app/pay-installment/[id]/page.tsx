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

  useEffect(() => {
    if (!paymentId) return;

    api.get(`/operations/public-payments/${paymentId}/details`)
      .then((res) => {
        if (res.status === "success") {
          setDetails(res.data);
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
    setPaying(true);
    try {
      const orderRes = await api.post(`/operations/public-payments/${paymentId}/create-order`, {});
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#00AECC] py-6 px-8 text-center text-white">
            <h2 className="text-2xl font-bold font-heading">Secure Payment</h2>
            <p className="text-sm opacity-90 mt-1">Letslive Tours</p>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <span className="text-2xl mb-4 font-bold text-[#00AECC]">...</span>
                <p className="text-gray-500">Loading payment details...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-2xl">!</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
                <p className="text-gray-500">{error}</p>
              </div>
            ) : success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-500 text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Complete!</h3>
                <p className="text-gray-500">
                  This installment has been fully paid. Thank you!
                </p>
              </div>
            ) : details ? (
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-500 uppercase tracking-wider font-semibold">For Package</label>
                  <p className="text-gray-900 font-medium text-lg mt-1">{details.packageName}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Milestone</span>
                    <span className="font-semibold text-gray-900">{details.milestone || 'Installment'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-medium">₹{details.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-900 font-bold text-lg">Amount Due</span>
                    <span className="font-bold text-xl text-[#00AECC]">₹{details.amountDue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {details.customerName && (
                  <div className="text-sm text-gray-500">
                    <p>Billed to: <span className="font-medium text-gray-900">{details.customerName}</span></p>
                    {details.customerEmail && <p>{details.customerEmail}</p>}
                  </div>
                )}

                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#00AECC] hover:bg-[#008ba3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AECC] transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium text-lg"
                >
                  {paying ? (
                    <>Processing...</>
                  ) : (
                    <>Pay ₹{details.amountDue.toLocaleString('en-IN')}</>
                  )}
                </button>
                <p className="text-xs text-center text-gray-400">
                  Secured by Razorpay
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
