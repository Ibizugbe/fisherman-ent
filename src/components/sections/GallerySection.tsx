import { motion } from "framer-motion";
import galary2 from "../../assets/gallery/galary2.png";
import galary1 from "../../assets/gallery/galary1.png";
import galary3 from "../../assets/gallery/galary3.png";
import galary4 from "../../assets/gallery/galary4.png";
import galary5 from "../../assets/gallery/galary5.png";
import galary6 from "../../assets/gallery/galary6.png";
import galary7 from "../../assets/gallery/galary7.png";
import galary8 from "../../assets/gallery/galary8.png";
import galary9 from "../../assets/gallery/galary9.png";
import galary10 from "../../assets/gallery/galary10.png";

const images = [
  galary1,
  galary2,
  galary3,
  galary4,
  galary5,
  galary6,
  galary7,
  galary8,
  galary9,
  galary10,
];

export function GallerySection() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-5xl font-bold">Gallery</h2>
          <p className="text-gray-600 max-w-md text-right">
            Moments that made waves. Every frame tells our story, from the
            studio to the stage
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-6 break-inside-avoid group relative overflow-hidden rounded-lg"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
