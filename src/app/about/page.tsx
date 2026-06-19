import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import Story from "@/components/about/Story";
import Mission from "@/components/about/Mission";
import Numbers from "@/components/about/Numbers";
import Services from "@/components/about/Services";
import CtaBanner from "@/components/about/CtaBanner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <AboutHero />
      <Story />
      <Mission />
      <Numbers />
      <Services />
      <CtaBanner />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
