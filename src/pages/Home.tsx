import { Hero } from "../components/sections/Hero";
import { MerchSection } from "../components/sections/MerchSection";
import { GallerySection } from "../components/sections/GallerySection";
import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MerchSection />
      <GallerySection />
      <Footer />
    </>
  );
}
