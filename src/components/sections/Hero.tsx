import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/hero.jpeg";
import { Typewriter } from "react-simple-typewriter";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[92vh] min-h-[640px] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />

      {/* Subtle accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#739AD4]/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-[#739AD4]" />
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/80">
                Fisherman Entertainment
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white"
            >
              <Typewriter
                words={["Entertainment the "]}
                loop={1}
                typeSpeed={60}
                deleteSpeed={0}
                delaySpeed={0}
                cursor={false}
              />

              <span className="text-[#739AD4]">
                <Typewriter
                  words={["right way."]}
                  loop={1}
                  typeSpeed={60}
                  deleteSpeed={0}
                  delaySpeed={900}
                  cursor
                  cursorStyle="|"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
              className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed"
            >
              At Fisherman Entertainment, we are particular about fresh and
              inventive ways of entertainment. Love comedy, movies, art? We’ve
              got you. Watch out for our upcoming project; we dey cook!
            </motion.p>
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center"
            >
              <button
                onClick={() => navigate("/events")}
                className="h-12 px-8 rounded-full bg-[#739AD4] text-white font-semibold
                           shadow-[0_14px_40px_rgba(115,154,212,0.35)]
                           hover:brightness-95 active:scale-[0.99] transition"
              >
                Explore Events
              </button>

              <button
                onClick={() => navigate("/tickets/tradout")}
                className="h-12 px-8 rounded-full bg-white/10 text-white font-semibold
                           border border-white/20 backdrop-blur-sm
                           hover:bg-white/15 active:scale-[0.99] transition"
              >
                Buy Tradout Ticket
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="mt-8 text-sm text-white/70"
            >
              New drops • Live shows • Fresh stories
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="h-10 w-6 rounded-full border border-white/35 flex items-start justify-center p-1">
          <motion.span
            className="h-2 w-2 rounded-full bg-white/80"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
