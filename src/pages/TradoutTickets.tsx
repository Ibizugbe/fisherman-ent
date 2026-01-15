import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import TicketCheckoutModal from "../components/tickets/TicketCheckoutModal";
import { getEventById } from "../constants/events";
import type { TicketOrder } from "../types/tickets";
import { saveTicketOrder, updateTicketOrder } from "../utils/ticketsStorage";
import { sendTicketEmails } from "../lib/ticketsEmail";

export default function TradoutTickets() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const event = getEventById("tradout");
  if (!event) return null;

  const handlePaid = (order: TicketOrder) => {
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
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black text-neutral-900">
            {event.name} Tickets
          </h1>

          <p className="mt-3 text-neutral-700">
            Flat fee:{" "}
            <span className="font-semibold">
              NGN {event.priceNaira.toLocaleString()}
            </span>
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-8 h-12 px-8 rounded-full bg-[#739AD4] text-white font-semibold hover:brightness-95"
          >
            Buy ticket
          </button>
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
