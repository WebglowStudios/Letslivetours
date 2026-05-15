import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import CareersHero from "@/components/careers/CareersHero";
import CareersMarquee from "@/components/careers/CareersMarquee";
import WhyJoin from "@/components/careers/WhyJoin";
import LifeAtLetsLive from "@/components/careers/LifeAtLetsLive";
import OpenRoles from "@/components/careers/OpenRoles";
import HiringProcess from "@/components/careers/HiringProcess";
import EmployeeTestimonials from "@/components/careers/EmployeeTestimonials";
import Perks from "@/components/careers/Perks";
import CareersCta from "@/components/careers/CareersCta";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

export default function CareersPage() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <CareersHero />
      <CareersMarquee />
      <WhyJoin />
      <LifeAtLetsLive />
      <OpenRoles />
      <HiringProcess />
      <EmployeeTestimonials />
      <Perks />
      <CareersCta />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
