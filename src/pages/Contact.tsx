import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-[#739AD4]" />
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
              Contact
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight"
          >
            Get in touch with us.
            <span className="block mt-2 text-[#739AD4]">
              We’re here to assist you.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you’re an artist looking to join our family, a brand seeking
            collaboration, or a fan with questions — we’d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl shadow-xl p-10"
          >
            <form className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-6 py-4 rounded-xl bg-white border border-gray-200 
                           focus:outline-none focus:border-[#739AD4] focus:ring-4 focus:ring-[#739AD4]/20
                           transition-all duration-300 text-lg"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 rounded-xl bg-white border border-gray-200 
                           focus:outline-none focus:border-[#739AD4] focus:ring-4 focus:ring-[#739AD4]/20
                           transition-all duration-300 text-lg"
                />
              </div>
              <div>
                <textarea
                  rows={6}
                  placeholder="Message"
                  className="w-full px-6 py-4 rounded-xl bg-white border border-gray-200 
                           focus:outline-none focus:border-[#739AD4] focus:ring-4 focus:ring-[#739AD4]/20
                           transition-all duration-300 text-lg resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-[#739AD4] text-white font-bold text-lg rounded-xl
                         hover:bg-[#5a7bb8] active:scale-98 shadow-lg hover:shadow-xl
                         transition-all duration-300"
              >
                Leave us a Message
              </button>
            </form>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 flex-col justify-center items-center"
          >
            {[
              {
                icon: Phone,
                title: "Call us today",
                value: "+234 8146921721",
                href: "tel:+2348146921721",
              },
              {
                icon: Mail,
                title: "Send an Email",
                value: "contact@fishermanent.com",
                href: "mailto:contact@fishermanent.com",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                value: "+234 8146921721",
                href: "https://wa.me/2348146921721",
                color: "text-green-600",
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.title === "WhatsApp" ? "_blank" : undefined}
                rel={
                  item.title === "WhatsApp" ? "noopener noreferrer" : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="block bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl 
                         transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`p-4 rounded-full bg-gray-100 group-hover:bg-[#739AD4]/10 
                                 transition-colors ${
                                   item.color || "text-[#739AD4]"
                                 }`}
                  >
                    <item.icon
                      size={32}
                      className={item.color || "text-[#739AD4]"}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.title}</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
