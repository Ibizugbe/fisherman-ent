import { Hero } from "../components/sections/Hero";
import { MerchSection } from "../components/sections/MerchSection";
import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/Navbar";
import BrandsMarqueeSection from "../components/sections/BrandsMarqueeSection";
import UpcomingEventsSection from "../components/sections/UpcomingEventsSection";
import { AboutPreviewSection } from "../components/sections/AboutPreviewSection";
import { FaqSection } from "../components/sections/FaqSection";
import { BRANDS } from "../constants/brands";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutPreviewSection />
      <UpcomingEventsSection />
      <MerchSection />
      <BrandsMarqueeSection brands={BRANDS} />
      <FaqSection />
      <Footer />
    </>
  );
}
