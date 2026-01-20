import { Hero } from "../components/sections/Hero";
import { MerchSection } from "../components/sections/MerchSection";
import { GallerySection } from "../components/sections/GallerySection";
import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/Navbar";
import BrandsMarqueeSection from "../components/sections/BrandsMarqueeSection";
import chefG from "../assets/brands/ChefG.png";
import simplex from "../assets/brands/simplex_exchange.png";
import bamawo from "../assets/brands/bamawo.jpeg";
import UpcomingEventsSection from "../components/sections/UpcomingEventsSection";

const brands = [
  { name: "Chef Giwa", logo: chefG },
  { name: "Simplex Exchange", logo: simplex },
  { name: "E Bamawo", logo: bamawo },
  { name: "Simplex Exchange", logo: simplex },
  { name: "Chef Giwa", logo: chefG },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <UpcomingEventsSection />
      <MerchSection />
      <GallerySection />
      <BrandsMarqueeSection brands={brands} />
      <Footer />
    </>
  );
}
