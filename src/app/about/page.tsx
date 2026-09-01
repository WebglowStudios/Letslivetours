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

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let aboutContent = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`, { cache: 'no-store' });
    const data = await res.json();
    if (data.status === 'success') {
      aboutContent = data.data;
    }
  } catch (error) {
    console.error("Failed to fetch about content:", error);
  }

  return (
    <>
      <ProgressBar />
      <Navbar />
      <AboutHero data={aboutContent?.hero} />
      <Story data={aboutContent?.story} vision={aboutContent?.vision} mission={aboutContent?.mission} />
      <Mission />
      <Numbers data={aboutContent?.stats} />
      <Services />
      <CtaBanner />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
