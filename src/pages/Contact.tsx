import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/mnppkazw", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

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
      <section className="py-14 sm:py-20 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-gray-50 rounded-3xl shadow-[0_18px_55px_rgba(0,0,0,0.08)] p-6 sm:p-10 overflow-hidden"
            >
              <h2 className="mb-6 text-2xl sm:text-3xl font-black text-gray-900">
                Send us a Message
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-5 sm:space-y-8"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Fisherman Entertainment website message"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  autoComplete="name"
                  required
                  className="w-full px-5 sm:px-6 py-4 rounded-xl bg-white border border-gray-200
                       focus:outline-none focus:border-[#739AD4] focus:ring-4 focus:ring-[#739AD4]/20
                       transition-all duration-300 text-base sm:text-lg"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  className="w-full px-5 sm:px-6 py-4 rounded-xl bg-white border border-gray-200
                       focus:outline-none focus:border-[#739AD4] focus:ring-4 focus:ring-[#739AD4]/20
                       transition-all duration-300 text-base sm:text-lg"
                />

                <textarea
                  rows={6}
                  name="message"
                  placeholder="Message"
                  required
                  className="w-full px-5 sm:px-6 py-4 rounded-xl bg-white border border-gray-200
                       focus:outline-none focus:border-[#739AD4] focus:ring-4 focus:ring-[#739AD4]/20
                       transition-all duration-300 text-base sm:text-lg resize-none"
                />

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-4 sm:py-5 bg-[#739AD4] text-white font-bold text-base sm:text-lg rounded-xl
                       hover:bg-[#5a7bb8] active:scale-[0.99]
                       shadow-[0_14px_40px_rgba(115,154,212,0.35)]
                       transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {formStatus === "submitting"
                    ? "Sending Message…"
                    : "Leave us a Message"}
                </button>

                {formStatus === "error" ? (
                  <p
                    role="alert"
                    className="text-sm text-red-700 text-center leading-relaxed"
                  >
                    We couldn&apos;t send your message. Please try again or email
                    us directly at contact@fishermanent.com.
                  </p>
                ) : null}
              </form>
            </motion.div>

            {/* Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-5 sm:gap-8 min-w-0"
            >
              {[
                {
                  icon: Phone,
                  title: "Call us today",
                  value: "+2348146921721",
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
                  external: true,
                },
                {
                  icon: Send,
                  title: "Telegram",
                  value: "FishermanEnt",
                  href: "https://t.me/FishermanEnt",
                  color: "text-sky-600",
                  external: true,
                },
              ].map((item, i) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="block rounded-2xl bg-white ring-1 ring-black/5
                       shadow-[0_18px_55px_rgba(0,0,0,0.08)]
                       p-6 sm:p-8 transition-all duration-300
                       hover:shadow-[0_22px_70px_rgba(0,0,0,0.12)]
                       sm:hover:-translate-y-1 overflow-hidden"
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <div
                      className={[
                        "p-4 rounded-full bg-gray-100",
                        "transition-colors group-hover:bg-[#739AD4]/10",
                      ].join(" ")}
                    >
                      <item.icon
                        size={30}
                        className={item.color || "text-[#739AD4]"}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">{item.title}</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-gray-900 break-all">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {formStatus === "success" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/55 px-4 backdrop-blur-sm"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setFormStatus("idle");
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-success-title"
              className="w-full max-w-md rounded-3xl bg-white p-7 sm:p-9 text-center shadow-2xl"
            >
              <div className="mx-auto h-16 w-16 rounded-full bg-green-50 grid place-items-center">
                <CheckCircle2 className="h-9 w-9 text-green-600" />
              </div>
              <h2
                id="contact-success-title"
                className="mt-5 text-2xl sm:text-3xl font-black text-gray-900"
              >
                Message sent successfully
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Thank you for reaching out. We&apos;ve received your message and
                will get back to you soon.
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => setFormStatus("idle")}
                className="mt-7 h-12 w-full rounded-full bg-[#739AD4] text-white font-semibold hover:brightness-95 transition"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Footer />
    </>
  );
}
