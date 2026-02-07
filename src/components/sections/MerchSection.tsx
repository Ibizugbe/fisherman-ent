import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import merch from "../../assets/merch/merch8.jpeg";
import { useNavigate } from "react-router-dom";

export function MerchSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#739AD4]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#739AD4]" />
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-600 uppercase">
                Official Fisherman Merch
              </p>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-gray-900">
              Check out our <span className="text-[#739AD4]">“Fishy”</span>{" "}
              merch store — we’ve got something special for you.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Fresh drops, clean fits, and signature pieces you can wear
              anywhere. Limited quantities. Stay fishy.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <Button
                className="w-full sm:w-auto bg-[#739AD4] text-white px-8 py-6 text-base sm:text-lg rounded-full shadow-[0_12px_30px_rgba(115,154,212,0.35)] hover:brightness-95 active:scale-[0.99] transition"
                onClick={() => navigate("/merch")}
              >
                Shop Now
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* card backdrop */}
              <div className="absolute inset-0 -rotate-2 rounded-3xl bg-white/70 ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.10)]" />
              <div className="relative rounded-3xl bg-white/80 ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] overflow-hidden">
                <div className="p-6 sm:p-8">
                  <img
                    src={merch}
                    alt="Fisherman Merch"
                    className="w-full drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* small badge */}
              <div className="absolute -top-3 left-6 rounded-full bg-[#0B1220] text-white text-xs font-semibold px-4 py-2 shadow-lg">
                New drop
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
