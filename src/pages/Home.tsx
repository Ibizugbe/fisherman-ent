import { Hero } from "../components/sections/Hero";
import { MerchSection } from "../components/sections/MerchSection";
import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/Navbar";
import BrandsMarqueeSection from "../components/sections/BrandsMarqueeSection";
import chefG from "../assets/brands/ChefG.png";
import simplex from "../assets/brands/simplex_exchange.png";
import bamawo from "../assets/brands/bamawo.jpeg";
import UpcomingEventsSection from "../components/sections/UpcomingEventsSection";
import { AboutPreviewSection } from "../components/sections/AboutPreviewSection";
import { FaqSection } from "../components/sections/FaqSection";

const brands = [
  { name: "Traffik Lounge" },
  { name: "Simplex Exchange", logo: simplex },
  { name: "Chef Giwa", logo: chefG },
  { name: "E Bamawo Signature Hotel", logo: bamawo },
  { name: "HomeVibes Content Studio" },
  { name: "Shalompee Apparel" },
  { name: "Lahor Printing and Publishing" },
  { name: "Proton Real Estate Development" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutPreviewSection />
      <UpcomingEventsSection />
      <MerchSection />
      <BrandsMarqueeSection brands={brands} />
      <FaqSection />
      <Footer />
    </>
  );
}
