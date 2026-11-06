import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function AboutPreviewSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-start"
      >
        <div>
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
            About Fisherman Entertainment
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Entertainment that brings people together.
          </h2>
        </div>

        <div>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Fisherman Entertainment is an entertainment production house
            creating experiences across film, music, comedy, and the performing
            arts. TradOut is one of our flagship live events—and just one of the
            ways we bring entertainment to life.
          </p>
          <button
            onClick={() => navigate("/about")}
            className="mt-7 h-12 px-7 rounded-full bg-[#0B1220] text-white font-semibold hover:brightness-110 active:scale-[0.99] transition"
          >
            Discover Fisherman Entertainment
          </button>
        </div>
      </motion.div>
    </section>
  );
}
