import { Link } from "react-router-dom";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { EVENTS } from "../constants/events";

function EventCard({ e }: { e: (typeof EVENTS)[number] }) {
  return (
    <Link to={`/events/${e.id}`} className="group block">
      <div
        className={[
          "rounded-2xl overflow-hidden",
          "bg-neutral-200/70 ring-1 ring-black/5",
          "shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
          "transition-shadow duration-300",
          "group-hover:shadow-[0_14px_45px_rgba(0,0,0,0.14)]",
        ].join(" ")}
      >
        <div className="aspect-[5/3] w-full overflow-hidden">
          {e.coverImage ? (
            <img
              src={e.coverImage}
              alt={e.name}
              className="h-full w-full object-center transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#739AD4]/40 via-white/40 to-black/5" />
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-extrabold text-neutral-900">{e.name}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
          <span>{e.dateLabel || "TBA"}</span>
          <span className="opacity-60">•</span>
          <span>{e.venueLabel || "TBA"}</span>
        </div>

        <div className="mt-3 inline-flex items-center rounded-lg bg-[#0B1220] px-3 py-2 text-white text-sm font-semibold">
          NGN {e.priceNaira.toLocaleString()}
        </div>
      </div>
    </Link>
  );
}

export default function Events() {
  return (
    <>
      <Navbar />

      <div className="bg-[#F4F1EF] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-black text-neutral-900">
              Events
            </h1>
            <p className="mt-3 text-neutral-700">
              Browse upcoming events and purchase tickets directly on the site.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12">
            {EVENTS.map((e) => (
              <EventCard key={e.id} e={e} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
