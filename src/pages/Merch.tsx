import { motion } from "framer-motion";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { products } from "../api/api";
import { Link } from "react-router-dom";

export default function Merch() {
  return (
    <>
      <Navbar />

      {/* Page / Hero */}
      <section className="pt-28 pb-10 bg-[#F4F1EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-neutral-900">
              Official Merch
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Cop our cool merch before e finish — we’ve got t-shirts, tank
              tops, tote bags, and baseball caps in cool colors. We stay fishy
              all day!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 sm:py-16 bg-[#F4F1EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                className="w-full max-w-[520px] mx-auto"
              >
                <Link
                  to={`/merch/${product.id}`}
                  className="group block cursor-pointer"
                >
                  <div className="rounded-2xl overflow-hidden bg-neutral-200/70 ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-shadow duration-300 group-hover:shadow-[0_14px_45px_rgba(0,0,0,0.14)]">
                    <div className="aspect-5/4 w-full overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-neutral-900 italic">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-700 tracking-wide">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-linear-to-r from-[#739AD4] to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black mb-5"
          >
            Wear the Movement.
          </motion.h2>
          <p className="text-base sm:text-xl mb-8 sm:mb-10 opacity-90">
            Every piece tells a story. Join the family — stay fishy.
          </p>
          <button className="px-8 sm:px-12 py-4 sm:py-6 bg-white text-[#739AD4] font-bold text-base sm:text-lg rounded-full shadow-2xl hover:bg-gray-50 transition-all duration-300 active:scale-95">
            Shop All Merch
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
