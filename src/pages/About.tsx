import { motion } from "framer-motion";
import { Dot } from "lucide-react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { BRANDS } from "../constants/brands";

export default function About() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          >
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
                About us
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                About Us
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
              Fisherman Entertainment is a creative powerhouse that encompasses
              every facet of production in film, music, comedy founded by{" "}
              <strong className="text-gray-900 font-semibold">
                Netete Asowata
              </strong>{" "}
              in 2025.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl bg-gray-50/80 ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] p-6 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#739AD4]/10 rounded-full">
                <Dot className="w-8 h-8 text-[#739AD4]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Our Mission
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed text-base sm:text-[17px]">
              Our mission is to create, produce, and promote world-class
              entertainment that inspires laughter, connection, and creativity.
              We aim to amplify unique voices, deliver unforgettable stories
              across film, television, digital media, and live experiences, and
              provide the tools, talent, and platforms that bring ideas to life.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="rounded-3xl bg-gray-50/80 ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] p-6 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#739AD4]/10 rounded-full">
                <Dot className="w-8 h-8 text-[#739AD4]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Our Vision
              </h3>
            </div>

            <p className="text-gray-700 leading-relaxed text-base sm:text-[17px]">
              To become a leading force in global entertainment — a home for
              creativity, excellence, and originality — where comedy and
              storytelling spark cultural impact, shape the future of
              entertainment, and bring people together through shared moments of
              joy and inspiration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-10 sm:mb-14">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
                Partners
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Brands We have worked with.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
              Fisherman Entertainment is always open to collaborating with
              likeminded brands that wish to sponsor any of our shows or support
              the business in any way, shape or form. On our end, we are
              committed to strategically positioning our sponsors to optimize
              brand visibility and customer engagement. To sponsor or
              collaborate with us, shoot us a message on our socials, give us a
              call or send an email. We are always active.
            </p>
          </div>

          {/* Brand Cards */}
          <div className="flex justify-center">
            <div className="grid w-fit grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {BRANDS.map((brand, i) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                    delay: i * 0.03,
                  }}
                  className="group"
                >
                  <div className="rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_22px_70px_rgba(0,0,0,0.12)]">
                    <div className="aspect-[4/3] flex items-center justify-center p-6 sm:p-8 bg-white">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-44 sm:max-h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
