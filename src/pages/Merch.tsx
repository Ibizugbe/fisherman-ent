import { motion } from "framer-motion";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import merch1 from "../assets/merch/merch1.png";
import merch2 from "../assets/merch/merch2.png";
import merch3 from "../assets/merch/merch3.png";
import merch4 from "../assets/merch/merch4.png";
import merch5 from "../assets/merch/merch5.png";
import merch6 from "../assets/merch/merch6.png";
import merch7 from "../assets/merch/merch7.png";
import merch8 from "../assets/merch/merch8.png";
import merch9 from "../assets/merch/merch9.png";

export default function Merch() {
  const products = [
    {
      id: 1,
      name: '"Stay Fishy" T-Shirt',
      price: "NGN 20,000",
      image: merch1,
    },
    {
      id: 2,
      name: '"Stay Fishy" T-Shirt',
      price: "NGN 20,000",
      image: merch2,
    },
    {
      id: 3,
      name: '"Stay Fishy" T-Shirt',
      price: "NGN 20,000",
      image: merch3,
    },
    {
      id: 4,
      name: '"Stay Fishy" Tank Top',
      price: "NGN 20,000",
      image: merch2,
    },
    {
      id: 5,
      name: '"Stay Fishy" Tank Top',
      price: "NGN 20,000",
      image: merch4,
    },
    {
      id: 6,
      name: '"Stay Fishy" Tank Top',
      price: "NGN 20,000",
      image: merch5,
    },
    {
      id: 7,
      name: '"Stay Fishy" Tote Bag',
      price: "NGN 10,000",
      image: merch6,
    },
    {
      id: 8,
      name: '"Stay Fishy" Tote Bag',
      price: "NGN 10,000",
      image: merch7,
    },
    {
      id: 9,
      name: '"Stay Fishy" Tote Bag',
      price: "NGN 10,000",
      image: merch8,
    },
    {
      id: 10,
      name: '"Stay Fishy" Tote Bag',
      price: "NGN 10,000",
      image: merch9,
    },
    {
      id: 11,
      name: '"Stay Fishy" Tote Bag',
      price: "NGN 10,000",
      image: merch7,
    },
    {
      id: 12,
      name: '"Stay Fishy" Tote Bag',
      price: "NGN 10,000",
      image: merch6,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
              Official Merch
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Cop our cool merch before e finish — we’ve got t-shirts, tank
              tops, tote bags, and baseball caps in cool colors. We stay fishy
              all day!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Optional: Add a "Sold Out" badge later */}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xl font-bold text-[#739AD4]">
                      {product.price}
                    </p>
                  </div>
                </div>

                {/* Hover CTA */}
                {/* <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <ShoppingBag size={48} className="mx-auto mb-4" />
                    <p className="text-xl font-bold">Add to Cart</p>
                  </div>
                </motion.div> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#739AD4] to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Wear the Movement.
          </motion.h2>
          <p className="text-xl mb-10 opacity-90">
            Every piece tells a story. Join the family — stay fishy.
          </p>
          <button className="px-12 py-6 bg-white text-[#739AD4] font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl hover:bg-gray-50 transition-all duration-300 active:scale-95">
            Shop All Merch
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
