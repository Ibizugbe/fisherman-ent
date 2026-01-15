import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import TicketCheckoutModal from "../components/tickets/TicketCheckoutModal";

import { getEventById } from "../constants/events";
import type { TicketOrder } from "../types/tickets";
import { saveTicketOrder, updateTicketOrder } from "../utils/ticketsStorage";
import { sendTicketEmails } from "../lib/ticketsEmail";

export default function EventShow() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const event = eventId ? getEventById(eventId) : undefined;

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="bg-[#F4F1EF] pt-28 pb-16 min-h-[70vh]">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-neutral-700">Event not found.</p>
            <Link
              to="/events"
              className="inline-block mt-4 text-neutral-900 underline underline-offset-4"
            >
              Back to events
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handlePaid = (order: TicketOrder) => {
    // Save first (so success page can read it)
    saveTicketOrder(order);

    (async () => {
      try {
        await sendTicketEmails(order);
        updateTicketOrder(order.reference, {
          emailStatus: {
            admin: "sent",
            customer: "sent",
            lastSentAtISO: new Date().toISOString(),
          },
        });
      } catch (e: any) {
        updateTicketOrder(order.reference, {
          emailStatus: {
            admin: "failed",
            customer: "failed",
            lastError: e?.message || "Email failed",
          },
        });
      }
    })();

    setOpen(false);
    navigate(`/tickets/success?ref=${encodeURIComponent(order.reference)}`);
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#F4F1EF] pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            to="/events"
            className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
          >
            Back to events
          </Link>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left: Cover */}
            <div className="rounded-2xl overflow-hidden bg-neutral-200/70 ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.12)]">
              <div className="aspect-[4/3] sm:aspect-[5/4] w-full">
                {event.coverImage ? (
                  <img
                    src={event.coverImage}
                    alt={event.name}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#739AD4]/40 via-white/40 to-black/5" />
                )}
              </div>
            </div>

            {/* Right: Details + Buy */}
            <div className="lg:pt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
                {event.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                <span>{event.dateLabel || "TBA"}</span>
                <span className="opacity-60">•</span>
                <span>{event.venueLabel || "TBA"}</span>
              </div>

              <p className="mt-5 text-neutral-700 leading-relaxed">
                {event.description ||
                  "Purchase a ticket to secure your spot for this event."}
              </p>

              <div className="mt-6 inline-flex items-center rounded-lg bg-[#0B1220] px-4 py-2 text-white text-sm font-semibold">
                Ticket fee: NGN {event.priceNaira.toLocaleString()}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setOpen(true)}
                  className="h-12 px-8 rounded-full bg-[#739AD4] text-white font-semibold shadow-[0_12px_30px_rgba(115,154,212,0.35)] hover:brightness-95 active:scale-[0.99] transition"
                >
                  Buy ticket
                </button>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Payment will open in a secure Paystack popup and you will remain
                on this site.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TicketCheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        event={event}
        onPaid={handlePaid}
      />

      <Footer />
    </>
  );
}
