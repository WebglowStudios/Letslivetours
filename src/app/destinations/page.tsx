import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import DestinationsMain from "@/components/destinations/DestinationsMain";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

export default function DestinationsPage() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <DestinationsMain />
      <Footer />
      <ScrollToTop />
      <ScrollReveal />
    </>
  );
}
