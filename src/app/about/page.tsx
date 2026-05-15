import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import AboutMarquee from "@/components/about/AboutMarquee";
import Story from "@/components/about/Story";
import Mission from "@/components/about/Mission";
import Team from "@/components/about/Team";
import Timeline from "@/components/about/Timeline";
import Numbers from "@/components/about/Numbers";
import Awards from "@/components/about/Awards";
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
      <AboutMarquee />
      <Story />
      <Mission />
      <Team />
      <Timeline />
      <Numbers />
      <Awards />
      <CtaBanner />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
