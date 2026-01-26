import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import tradout from "../../assets/tradout/TRADOUT.jpg";

export default function UpcomingEventsSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 sm:py-20 bg-[#F4F1EF] overflow-hidden">
      {/* subtle accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#739AD4]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
              Upcoming events
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-gray-900">
              What’s Next at Fisherman?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
              Get tickets early and stay in the loop for new drops, shows, and
              releases.
            </p>
          </div>

          <button
            onClick={() => navigate("/events")}
            className="w-full sm:w-auto h-12 px-6 rounded-full bg-white/70 border border-black/10 text-gray-900 font-semibold
                       hover:bg-white transition shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            View all events →
          </button>
        </div>

        {/* Featured Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Poster Card */}
            <div className="relative rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm px-4 py-2 text-white text-xs sm:text-sm font-semibold">
                  Featured event
                </div>
              </div>

              <div className="relative bg-[#0B1220] min-h-[520px] sm:min-h-[620px] lg:min-h-0 lg:flex-1">
                <div className="absolute inset-0 p-4 sm:p-6">
                  <div className="h-full w-full rounded-2xl bg-black/20 ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
                    <img
                      src={tradout}
                      alt="Tradout event poster"
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 border-t border-black/5 bg-white/80">
                <p className="text-sm font-semibold text-[#111827]">Tradout</p>
                <p className="text-xs text-gray-500 mt-1">
                  8th March 2026 • 5:00 PM • Victor Uwaifo Hub
                </p>
              </div>
            </div>

            {/* Details Card */}
            <div className="rounded-3xl bg-white/75 ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.10)] p-6 sm:p-8 flex flex-col">
              {/* Top */}
              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#739AD4]" />
                  <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
                    Upcoming event
                  </p>
                </div>

                <h3 className="mt-4 text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                  Tradout is coming. <br className="hidden sm:block" />
                  Secure your ticket now.
                </h3>

                {/* Event details */}
                <div className="mt-6 rounded-2xl bg-[#F9FAFF] ring-1 ring-black/5 p-4 sm:p-5">
                  <div className="grid gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-gray-500">Date</span>
                      <span className="text-sm font-semibold text-[#111827] text-right">
                        8th March 2026
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-gray-500">Time</span>
                      <span className="text-sm font-semibold text-[#111827] text-right">
                        5:00 PM
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-gray-500">Venue</span>
                      <span className="text-sm font-semibold text-[#111827] text-right max-w-[260px] sm:max-w-none">
                        Victor Uwaifo Hub, Benin City, Edo State
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-xl bg-[#0B1220] px-4 py-2 text-white text-sm font-semibold">
                    NGN 15,000
                  </span>
                  <span className="text-sm text-gray-500">
                    Entry ticket (flat fee)
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate("/events/tradout")}
                    className="h-12 px-8 rounded-full bg-[#739AD4] text-white font-semibold
                     shadow-[0_14px_40px_rgba(115,154,212,0.35)]
                     hover:brightness-95 active:scale-[0.99] transition"
                  >
                    Get tickets
                  </button>

                  <button
                    onClick={() => navigate("/events/tradout")}
                    className="h-12 px-8 rounded-full bg-transparent border border-[#739AD4] text-[#739AD4] font-semibold
                     hover:bg-[#739AD4]/10 active:scale-[0.99] transition"
                  >
                    Learn more
                  </button>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  You’ll complete payment on-site via Paystack popup.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
