import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Destinations from "@/components/Destinations";
import Packages from "@/components/Packages";
import Deals from "@/components/Deals";
import WhyUs from "@/components/WhyUs";
import VisaFree from "@/components/VisaFree";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Articles from "@/components/Articles";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <Hero />
      <Marquee />
      <Destinations />
      <Packages />
      <Deals />
      <WhyUs />
      <VisaFree />
      <Testimonials />
      <Newsletter />
      <Articles />
      <Partners />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
