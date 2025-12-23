import { Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "../../assets/FisherManLogo.png";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-gray-50">
      {/* Newsletter Section */}
      <div className="bg-[#739AD4] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between gap-10 text-white"
          >
            {/* Left Text */}
            <h3 className="text-4xl md:text-5xl font-bold leading-tight text-left md:text-left">
              Subscribe to Fisherman’s
              <br />
              mailing list to receive
              <br />
              <span className="text-white">updates</span>
            </h3>

            {/* Right Form */}
            <form className="w-full bg-white/30 rounded-md  text-white placeholder-white/60  border-white/20  md:w-auto flex flex-col sm:flex-row gap-4 max-w-lg">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 px-8 py-4 text-lg focus-outline-none bg-transparent border-none"
              />
              <button
                type="submit"
                className="px-10 bg-white m-2 text-[#739AD4] font-semibold rounded-md 
                         hover:bg-gray-100 active:scale-95 transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section with Logo & Socials */}
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
            href="#"
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Instagram"
          >
            <Instagram size={28} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Twitter"
          >
            <Twitter size={28} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="YouTube"
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
