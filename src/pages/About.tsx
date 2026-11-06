import { motion } from "framer-motion";
import { Dot } from "lucide-react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { BRANDS } from "../constants/brands";
import netete from "../assets/team/netete.png";
import { Link } from "react-router-dom";

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
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
                About us
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                What is Fisherman Entertainment?
              </h1>
            </div>

            <div>
              <div className="rounded-3xl overflow-hidden bg-[#0B1220] shadow-[0_18px_55px_rgba(0,0,0,0.14)]">
                <img
                  src={netete}
                  alt="Netete Asowata, founder of Fisherman Entertainment"
                  className="w-full max-h-[520px] object-cover object-top"
                />
              </div>
              <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed">
                Fisherman Entertainment is a production house working in film,
                music, comedy, and live events.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#F4F1EF]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4 sm:px-6"
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
            Our Story
          </p>
          <p className="mt-4 text-xl sm:text-2xl text-gray-800 leading-relaxed font-medium">
            Fisherman Entertainment was founded by Netete Asowata (nicknamed
            the Fisherman) in 2025 to give up-and-coming entertainers,
            especially those living in Benin City, a platform to showcase their
            talent. Netete had experienced the utter lack of opportunities for
            young up-and-comers and sought to change that.
          </p>
        </motion.div>
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
              entertainment that gives talents a platform while inspiring
              laughter, connection, and creativity.
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
              To become a global entertainment company where comedy and
              storytelling bring people together, inspire creativity, and
              create shared moments of joy.
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
                Our Partners
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Building meaningful partnerships.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
              We love working with brands that believe in what we&apos;re
              building. Whether you want to sponsor a show, collaborate on a
              project, or support what we do in another way, we&apos;re open to
              the conversation.
              <span className="block mt-4">
                And when you work with us, we want your brand to get something
                out of it too—from visibility to meaningful audience engagement.
              </span>
              <Link
                to="/contact"
                className="mt-6 inline-flex h-12 px-7 rounded-full bg-[#739AD4] text-white font-semibold items-center hover:brightness-95 transition"
              >
                Become a Partner
              </Link>
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
