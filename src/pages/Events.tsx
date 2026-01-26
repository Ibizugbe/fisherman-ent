import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { EVENTS } from "../constants/events";

function FeaturedEvent({ e }: { e: (typeof EVENTS)[number] }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch"
    >
      {/* Poster Card */}
      <div className="relative rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
        <div className="absolute top-4 left-4 z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm px-4 py-2 text-white text-xs sm:text-sm font-semibold">
            Featured event
          </div>
        </div>

        {/* Keep poster fully visible */}
        <div className="relative bg-[#0B1220] min-h-[520px] sm:min-h-[640px] lg:min-h-0 lg:flex-1">
          <div className="absolute inset-0 p-4 sm:p-6">
            <div className="h-full w-full rounded-2xl bg-black/20 ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
              {e.coverImage ? (
                <img
                  src={e.coverImage}
                  alt={`${e.name} poster`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#739AD4]/30 via-white/10 to-black/10" />
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-black/5 bg-white/85">
          <p className="text-sm font-semibold text-[#111827]">{e.name}</p>
          <p className="text-xs text-gray-500 mt-1">
            {e.dateLabel || "TBA"} {e.timeLabel ? `• ${e.timeLabel}` : ""} •{" "}
            {e.venueLabel || "TBA"}
          </p>
        </div>
      </div>

      {/* Details Card */}
      <div className="rounded-3xl bg-white/80 ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.10)] p-6 sm:p-8 flex flex-col">
        <div>
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
            Upcoming
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            {e.name}
          </h2>

          <p className="mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">
            {e.description ||
              "Secure your ticket to attend the show. Limited slots available."}
          </p>

          {/* Event details block */}
          <div className="mt-6 rounded-2xl bg-[#F9FAFF] ring-1 ring-black/5 p-4 sm:p-5">
            <div className="grid gap-3">
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-gray-500">Date</span>
                <span className="text-sm font-semibold text-[#111827] text-right">
                  {e.dateLabel || "TBA"}
                </span>
              </div>

              {e.timeLabel ? (
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-gray-500">Time</span>
                  <span className="text-sm font-semibold text-[#111827] text-right">
                    {e.timeLabel}
                  </span>
                </div>
              ) : null}

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-gray-500">Venue</span>
                <span className="text-sm font-semibold text-[#111827] text-right max-w-[260px] sm:max-w-none">
                  {e.venueLabel || "TBA"}
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-xl bg-[#0B1220] px-4 py-2 text-white text-sm font-semibold">
              NGN {e.priceNaira.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">Entry ticket</span>
          </div>
        </div>

        {/* CTA bottom */}
        <div className="mt-auto pt-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(`/events/${e.id}`)}
              className="h-12 px-8 rounded-full bg-[#739AD4] text-white font-semibold
                         shadow-[0_14px_40px_rgba(115,154,212,0.35)]
                         hover:brightness-95 active:scale-[0.99] transition"
            >
              Get tickets
            </button>

            <Link
              to={`/events/${e.id}`}
              className="h-12 px-8 rounded-full bg-transparent border border-[#739AD4] text-[#739AD4] font-semibold
                         hover:bg-[#739AD4]/10 active:scale-[0.99] transition grid place-items-center"
            >
              View details
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            You’ll complete payment on-site via Paystack popup.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CompactEventCard({ e }: { e: (typeof EVENTS)[number] }) {
  return (
    <Link to={`/events/${e.id}`} className="group block">
      <div className="rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)]">
        <div className="aspect-[16/9] bg-neutral-200/60">
          {e.coverImage ? (
            <img
              src={e.coverImage}
              alt={e.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
        <div className="p-5">
          <p className="text-sm font-extrabold text-neutral-900">{e.name}</p>
          <p className="mt-2 text-sm text-neutral-600">
            {e.dateLabel || "TBA"} {e.timeLabel ? `• ${e.timeLabel}` : ""}
          </p>
          <p className="mt-1 text-sm text-neutral-600 truncate">
            {e.venueLabel || "TBA"}
          </p>

          <div className="mt-4 inline-flex items-center rounded-lg bg-[#0B1220] px-3 py-2 text-white text-sm font-semibold">
            NGN {e.priceNaira.toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Events() {
  const featured = EVENTS[0];
  const rest = EVENTS.slice(1);

  return (
    <>
      <Navbar />

      <div className="bg-[#F4F1EF] pt-28 pb-16 overflow-hidden">
        {/* subtle accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#739AD4]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
              Events
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-black text-neutral-900">
              Upcoming shows
            </h1>
            <p className="mt-3 text-neutral-700 text-base sm:text-lg leading-relaxed">
              Browse events and purchase tickets.
            </p>
          </motion.div>

          {/* Featured */}
          <div className="mt-10">
            {featured ? <FeaturedEvent e={featured} /> : null}
          </div>

          {/* More events (only shows if you add more later) */}
          {rest.length > 0 ? (
            <div className="mt-14">
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
                More events
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((e) => (
                  <CompactEventCard key={e.id} e={e} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  );
}
