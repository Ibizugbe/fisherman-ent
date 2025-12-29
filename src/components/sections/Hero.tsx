// src/components/sections/Hero.tsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "../../assets/Hero-section.png";

const slides = [
  {
    id: 1,
    image: heroImage, // put your images in public/hero/1.jpg, 2.jpg, etc.
  },
  {
    id: 2,
    image: heroImage,
  },
  // Add more slides here as needed
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${currentSlide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center text-white max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* <h1 className="text-7xl md:text-9xl font-bold leading-none tracking-tight">
                {currentSlide.titleTop}
              </h1> */}

              {/* <p className="text-lg md:text-2xl max-w-3xl mx-auto opacity-90 font-light leading-relaxed">
                {currentSlide.subtitle}
              </p> */}

              {/* <h1 className="text-7xl md:text-9xl font-bold leading-none tracking-tight">
                {currentSlide.titleBottom}
              </h1> */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={52} strokeWidth={1.5} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={52} strokeWidth={1.5} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-10"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
