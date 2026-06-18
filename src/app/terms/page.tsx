"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p style={{ fontSize: 15, color: "rgba(249,246,240,.5)", maxWidth: 520, margin: "0 auto" }}>
              Financial Year 2025–2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "64px 0 80px" }}>
          <div className="container" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", padding: "48px 52px", boxShadow: "var(--sh)" }} className="policy-card">

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>1. Introduction</h2>
                <p>Welcome to LetsLive Tours! (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)!</p>
                <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website located at letslivetours.com (together or individually &ldquo;Service&rdquo;) operated by LetsLive Tours.</p>
                <p>Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</p>
                <p>Your agreement with us includes these Terms and our Privacy Policy (&ldquo;Agreements&rdquo;). You acknowledge that you have read and understood the Agreements, and agree to be bound by them.</p>
                <p>If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at info@letslivetours.com so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>2. Communications</h2>
                <p>By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at info@letslivetours.com.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>3. Purchases</h2>
                <p>If you wish to purchase any product or service made available through Service, you may be asked to supply certain information relevant to your Purchase including but not limited to:</p>
                <ul>
                  <li>Your credit or debit card number</li>
                  <li>The expiration date of your card</li>
                  <li>Your billing address</li>
                  <li>Your shipping information</li>
                </ul>
                <p>You represent and warrant that:</p>
                <ol>
                  <li>You have the legal right to use any card(s) or other payment method(s) in connection with any Purchase.</li>
                  <li>The information you supply to us is true, correct and complete.</li>
                </ol>
                <p>We may employ the use of third party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.</p>
                <p>We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price, error in your order, or other reasons.</p>
                <p>We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>4. Contests, Sweepstakes and Promotions</h2>
                <p>Any contests, sweepstakes or other promotions made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>5. Subscriptions</h2>
                <p>Some parts of Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. At the end of each Billing Cycle, your Subscription will automatically renew unless you cancel it or LetsLive Tours cancels it.</p>
                <p>You may cancel your Subscription renewal either through your online account management page or by contacting info@letslivetours.com.</p>
                <p>Should automatic billing fail to occur for any reason, LetsLive Tours reserves the right to terminate your access to the Service with immediate effect.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>6. Fee Changes</h2>
                <p>LetsLive Tours, in its sole discretion and at any time, may modify Subscription fees. Any fee change will become effective at the end of the then-current Billing Cycle.</p>
                <p>We will provide you with reasonable prior notice of any change in fees to give you an opportunity to terminate your Subscription before such change becomes effective.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>7. Content</h2>
                <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (&ldquo;Content&rdquo;). You are responsible for Content that you post on or through Service, including its legality, reliability, and appropriateness.</p>
                <p>You retain any and all of your rights to any Content you submit, post or display on or through Service and you are responsible for protecting those rights.</p>
                <p>LetsLive Tours has the right but not the obligation to monitor and edit all Content provided by users.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>8. Prohibited Uses</h2>
                <p>You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
                <ol>
                  <li>In any way that violates any applicable national or international law or regulation.</li>
                  <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                  <li>To transmit any advertising or promotional material, including &ldquo;junk mail&rdquo;, &ldquo;spam&rdquo;, or any other similar solicitation.</li>
                  <li>To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.</li>
                  <li>In any way that infringes upon the rights of others, or is illegal, threatening, fraudulent, or harmful.</li>
                  <li>To engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of Service.</li>
                </ol>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>9. Analytics</h2>
                <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>10. No Use By Minors</h2>
                <p>Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>11. Accounts</h2>
                <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times.</p>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for any and all activities or actions that occur under your account.</p>
                <p>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>12. Intellectual Property</h2>
                <p>Service and its original content, features and functionality are and will remain the exclusive property of LetsLive Tours and its licensors. Service is protected by copyright, trademark, and other laws of India and foreign countries.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>13. Copyright Policy</h2>
                <p>We respect the intellectual property rights of others. If you are a copyright owner and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to info@letslivetours.com with the subject line: &ldquo;Copyright Infringement&rdquo;.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>14. Disclaimer Of Warranty</h2>
                <p style={{ textTransform: "uppercase", fontWeight: 600, fontSize: 13 }}>THESE SERVICES ARE PROVIDED BY COMPANY ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES IS AT YOUR SOLE RISK.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>15. Limitation Of Liability</h2>
                <p style={{ textTransform: "uppercase", fontWeight: 600, fontSize: 13 }}>EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE. IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>16. Termination</h2>
                <p>We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever including but not limited to a breach of Terms.</p>
                <p>If you wish to terminate your account, you may simply discontinue using Service.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>17. Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of India. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>18. Changes To Service</h2>
                <p>We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>19. Amendments To Terms</h2>
                <p>We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically. Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>20. Acknowledgement</h2>
                <p style={{ textTransform: "uppercase", fontWeight: 600, fontSize: 13 }}>BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>21. Contact Us</h2>
                <p>Please send your feedback, comments, requests for technical support by email: <a href="mailto:info@letslivetours.com" style={{ color: "var(--gn2)", textDecoration: "underline" }}>info@letslivetours.com</a></p>
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
        @media (max-width: 768px) {
          .policy-card { padding: 28px 20px !important; }
        }
      `}</style>
    </>
  );
}
