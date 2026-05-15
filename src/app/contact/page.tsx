import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/contact/ContactHero";
import ContactMarquee from "@/components/contact/ContactMarquee";
import ContactMain from "@/components/contact/ContactMain";
import MapSection from "@/components/contact/MapSection";
import Offices from "@/components/contact/Offices";
import ContactFaq from "@/components/contact/ContactFaq";
import SocialStrip from "@/components/contact/SocialStrip";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <ContactHero />
      <ContactMarquee />
      <ContactMain />
      <MapSection />
      <Offices />
      <ContactFaq />
      <SocialStrip />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
