// src/components/sections/MerchSection.tsx
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import merch from "../../assets/merch.png";

export function MerchSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-600 mb-4">
            Official Fisherman Merch.
          </p>
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Wear the
            <br />
            brand. Live
            <br />
            the lifestyle.
          </h2>
          <Button className="mt-10 bg-[#739AD4] text-white px-8 py-6 text-lg">
            Shop Now
          </Button>
        </motion.div>

        {/* T-shirt Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src={merch}
            alt="Fisherman Merch"
            className="w-full max-w-md drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
