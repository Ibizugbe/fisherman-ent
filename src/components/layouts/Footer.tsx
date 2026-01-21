import { Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "../../assets/FisherManLogo.png";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-gray-50">
      {/* Newsletter Section */}
      <div className="relative py-16 sm:py-20 bg-[#739AD4] overflow-hidden">
        {/* subtle accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 text-white"
          >
            {/* Left Text */}
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/80">
                <span className="h-2 w-2 rounded-full bg-white" />
                Mailing list
              </p>

              <h3 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                Subscribe to Fisherman’s mailing list to receive updates
              </h3>

              <p className="mt-4 text-white/85 text-base sm:text-lg leading-relaxed">
                Get early access to new drops, event announcements, and special
                releases.
              </p>
            </div>

            {/* Right Form */}
            <div className="w-full lg:max-w-xl">
              <form className="w-full flex items-center bg-white/20 rounded-2xl border border-white/25 p-2 backdrop-blur-sm">
                <input
                  type="email"
                  placeholder="Your email..."
                  className="flex-1 min-w-0 px-4 sm:px-6 py-3.5 text-base sm:text-lg bg-transparent text-white placeholder-white/70 border-none outline-none"
                />

                <button
                  type="submit"
                  className="shrink-0 px-5 sm:px-8 py-3.5 rounded-xl bg-white text-[#739AD4] font-semibold
                       hover:bg-gray-100 active:scale-[0.99] transition-all duration-200"
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-3 text-xs sm:text-sm text-white/75">
                No spam. You can unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <img
            src={Logo}
            alt="Fisherman Entertainment"
            className="mx-auto w-96 md:w-[500px] object-contain"
          />
        </motion.div>

        <div className="flex justify-center gap-8 mt-1">
          <a
            href="https://www.instagram.com/fishermanent?igsh=NnZjaW82ZjQ1amYw"
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Instagram"
            target="_blank"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://x.com/skinyfisherman?s=21"
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Twitter"
            target="_blank"
          >
            <Twitter size={28} />
          </a>
          <a
            href="https://www.youtube.com/@netete_tv"
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="YouTube"
            target="_blank"
          >
            <Youtube size={28} />
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-5">
          © 2025 All Rights Reserved by Fisherman Entertainment
        </p>
      </div>
    </footer>
  );
}
