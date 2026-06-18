"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p style={{ fontSize: 15, color: "rgba(249,246,240,.5)", maxWidth: 520, margin: "0 auto" }}>
              How we collect, use and protect your information
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "64px 0 80px" }}>
          <div className="container" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ background: "#fff", borderRadius: "var(--r-xl)", padding: "48px 52px", boxShadow: "var(--sh)" }} className="policy-card">

              <div className="policy-section">
                <p>This privacy policy for <strong>www.letslivetours.com</strong> served by LetsLive Tours Experiences and Adventures Pvt. Ltd. governs the privacy of its users who choose to use it.</p>
                <p>The policy sets out the different areas where user privacy is concerned and outlines the obligations &amp; requirements of the users, the website, and website owners. Furthermore, the way this website processes, stores and protects user data and information will also be detailed within this policy.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>The Website</h2>
                <p>This website and its owners take a proactive approach to user privacy and ensure the necessary steps are taken to protect the privacy of its users throughout their visiting experience. This website complies with all India&apos;s national laws and requirements for user privacy.</p>
                <p>We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy.</p>
                <p>Our Terms and Conditions govern all use of our Service and together with the Privacy Policy constitutes your agreement with us.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>Use of Cookies</h2>
                <p>This website uses cookies to better the users experience while visiting the website. Where applicable this website uses a cookie control system allowing the user on their first visit to the website to allow or disallow the use of cookies on their computer/device.</p>
                <p>Cookies are small files saved to the user&apos;s computer&apos;s hard drive that track, save and store information about the user&apos;s interactions and usage of the website. This allows the website, through its server, to provide the users with a tailored experience within this website.</p>
                <p>Users are advised that if they wish to deny the use and saving of cookies from this website on to their computers hard drive, they should take necessary steps within their web browser&apos;s security settings to block all cookies from this website.</p>
                <p>This website uses tracking software to monitor its visitors to better understand how they use it. This software is provided by Google Analytics which uses cookies to track visitor usage. The software will save a cookie to your computer&apos;s hard drive in order to track and monitor your engagement and usage of the website, but will not store, save or collect personal information.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>External Links &amp; Email Newsletter</h2>
                <p>Although this website only looks to include quality, safe and relevant external links, users are advised to adopt a policy of caution before clicking any external web links mentioned throughout this website.</p>
                <p>The owners of this website cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>Adverts and Sponsored Links</h2>
                <p>This website may contain sponsored links and adverts. These will typically be served through our advertising partners, who may have detailed privacy policies relating directly to the adverts they serve.</p>
                <p>Clicking on any such adverts will send you to the advertiser&apos;s website through a referral program which may use cookies and will track the number of referrals sent from this website.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>Social Media Platforms</h2>
                <p>Communication, engagement and actions taken through external social media platforms that this website and its owners participate on are custom to the terms and conditions as well as the privacy policies held with each social media platform respectively.</p>
                <p>Users are advised to use social media platforms wisely and communicate/engage upon them with due care and caution in regard to their own privacy and personal details. This website nor its owners will ever ask for personal or sensitive information through social media platforms.</p>
                <p>This website may use social sharing buttons which help share web content directly from web pages to the social media platform in question. Users are advised before using such social sharing buttons that they do so at their own discretion.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>1. Data Collection: What Information We Collect</h2>
                <p>Depending on the purpose of the processing, we may collect the following categories of personal data about you:</p>
                <ul>
                  <li>Your personal details (first name, last name, where you are from) and your contact details (your e-mail address)</li>
                  <li>Information relating to your idea, in writing or in video depending on what you choose to submit</li>
                  <li>Information about the location of your device, including GPS location, when you activate geolocation</li>
                  <li>Connection and/or browsing data that we collect by using cookies and similar tracking technologies</li>
                </ul>
                <p>We will not collect sensitive personal data from you in the context of the Website. When we ask you to fill in your personal data, we will mark certain fields as compulsory, since this information is necessary to be able to identify you and to contact you.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>2. For Which Purposes Do We Use Your Information</h2>
                <p>We will process your personal data for the following purposes:</p>
                <ul>
                  <li>To provide the Services, i.e., to collect your ideas and to contact you to follow-up on the idea you submitted.</li>
                  <li>For analytic and statistic purposes, i.e., to understand the manner in which you interact with our Website and thus be capable of introducing improvements.</li>
                  <li>To protect the rights of the services and others.</li>
                </ul>
                <p>We will only process your personal data for specified, explicit and legitimate purposes and we will not process your personal data further in a way that goes beyond or is incompatible with those purposes.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>3. How We Share Your Information</h2>
                <p>We may disclose your personal data to the following categories of recipients:</p>
                <ol>
                  <li>Authorized staff members who access your personal data on a need-to-know basis</li>
                  <li>Affiliates and subsidiary companies, primarily for business and operational purposes</li>
                  <li>Service providers: suppliers and service providers that perform functions on our behalf</li>
                  <li>Other parties when required by law to comply with regulatory requests, court orders, or legal processes</li>
                  <li>Other parties in connection with corporate transactions such as a merger, acquisition, or sale of assets</li>
                </ol>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>4. How Long Do We Retain Your Personal Data</h2>
                <p>For personal data that we collect and process, we will typically retain such personal data for as long as it is necessary to fulfil each of the purposes outlined above.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>5. What Are Your Rights</h2>
                <p>Where applicable and under the conditions set forth under applicable data protection laws, you may have the following rights:</p>
                <ul>
                  <li>Confirmation and information</li>
                  <li>Access</li>
                  <li>Rectification</li>
                  <li>Deletion</li>
                  <li>Restriction</li>
                  <li>Portability</li>
                  <li>Objection</li>
                  <li>Withdrawing Consent</li>
                </ul>
                <p>You can exercise these rights by sending a written request to our data protection contact.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>6. Cookies And Similar Technologies</h2>
                <p><strong>Strictly Necessary Cookies:</strong> These cookies are necessary for the Website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for Services.</p>
                <p><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
                <p><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant adverts on other sites.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>7. Security</h2>
                <p>We ensure that appropriate technical and organizational security measures are taken against unlawful or unauthorized access or use of your personal data, as well as against accidental loss or damage to the integrity of your personal data.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>8. Children&apos;s Privacy</h2>
                <p>Our Website and Services are not intended for individuals under the age of 18. If we learn that an individual under 18 has provided us with personal information, we will delete it.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>9. Changes To This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>10. Confirmation Policy</h2>
                <p>As soon as you pay, you will receive a confirmation email from LetsLive Tours. The remaining amount needs to be paid before the date of travel.</p>
              </div>

              <div className="policy-section">
                <h2 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 16 }}>11. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us by email: <a href="mailto:info@letslivetours.com" style={{ color: "var(--gn2)", textDecoration: "underline" }}>info@letslivetours.com</a></p>
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
