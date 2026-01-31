import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { TicketEvent, TicketOrder } from "../../types/tickets";
import { makePaystackReference } from "../../utils/ref";
import { toKobo } from "../../utils/money";
import { startPaystackPayment } from "../../lib/paystack";

type Props = {
  open: boolean;
  onClose: () => void;
  event: TicketEvent;
  onPaid: (order: TicketOrder) => void;
};

export default function TicketCheckoutModal({
  open,
  onClose,
  event,
  onPaid,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [attendee, setAttendee] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [qty, setQty] = useState<number>(1);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

  const quantity = useMemo(() => Math.max(1, Number(qty) || 1), [qty]);
  const totalNaira = useMemo(
    () => event.priceNaira * quantity,
    [event.priceNaira, quantity],
  );

  const validate = (): string | null => {
    if (!attendee.fullName.trim()) return "Please enter full name.";
    if (!attendee.email.trim()) return "Please enter email.";
    if (!publicKey) return "Missing Paystack public key.";
    if (totalNaira <= 0) return "Invalid amount.";
    return null;
  };

  const handlePay = () => {
    setErr(null);
    const v = validate();
    if (v) return setErr(v);

    setSubmitting(true);
    const reference = makePaystackReference("TICKET");

    startPaystackPayment({
      key: publicKey,
      email: attendee.email.trim(),
      phone: attendee.phone.trim(),
      amount: toKobo(totalNaira),
      reference,
      metadata: {
        type: "ticket",
        eventId: event.id,
        eventName: event.name,
        quantity,
        attendee,
      },
      onSuccess: (trx: any) => {
        setSubmitting(false);
        const finalRef = trx?.reference || reference;

        const order: TicketOrder = {
          reference: finalRef,
          createdAtISO: new Date().toISOString(),
          eventId: event.id,
          eventName: event.name,
          eventDate: event.dateLabel || "",
          eventTime: event.timeLabel || "",
          eventVenue: event.venueLabel || "",
          currency: "NGN",
          unitPriceNaira: event.priceNaira,
          quantity,
          amountNaira: totalNaira,
          attendee: {
            fullName: attendee.fullName.trim(),
            email: attendee.email.trim(),
            phone: attendee.phone.trim(),
          },
          emailStatus: { admin: "pending", customer: "pending" },
        };

        onPaid(order);
      },
      onCancel: () => setSubmitting(false),
      onError: (e: any) => {
        setSubmitting(false);
        setErr(e?.message || "Payment failed. Please try again.");
      },
    });
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-0 z-[61] grid place-items-center p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-[0_20px_80px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="p-5 border-b border-black/5 flex items-center justify-between">
            <p className="text-lg font-semibold text-neutral-900">Buy ticket</p>
            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-black/5"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="p-5">
            <div className="rounded-xl bg-[#F4F1EF] p-4">
              <p className="font-semibold text-[#0B1220]">{event.name}</p>

              <p className="text-sm text-neutral-600 mt-1">
                Price:{" "}
                <span className="font-semibold">
                  NGN {event.priceNaira.toLocaleString()}
                </span>
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-neutral-600">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-9 w-9 rounded-full border border-neutral-200 hover:bg-white"
                    onClick={() => setQty((q) => Math.max(1, Number(q) - 1))}
                    disabled={submitting}
                  >
                    –
                  </button>
                  <span className="w-10 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="h-9 w-9 rounded-full border border-neutral-200 hover:bg-white"
                    onClick={() => setQty((q) => Math.max(1, Number(q) + 1))}
                    disabled={submitting}
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm text-neutral-700">
                Total:{" "}
                <span className="font-semibold">
                  NGN {totalNaira.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              <label className="grid gap-1">
                <span className="text-sm text-neutral-700">Full name</span>
                <input
                  className="h-12 rounded-xl border border-neutral-200 px-4 outline-none focus:border-neutral-400"
                  value={attendee.fullName}
                  onChange={(e) =>
                    setAttendee((p) => ({ ...p, fullName: e.target.value }))
                  }
                  disabled={submitting}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm text-neutral-700">Email</span>
                <input
                  type="email"
                  className="h-12 rounded-xl border border-neutral-200 px-4 outline-none focus:border-neutral-400"
                  value={attendee.email}
                  onChange={(e) =>
                    setAttendee((p) => ({ ...p, email: e.target.value }))
                  }
                  disabled={submitting}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm text-neutral-700">Phone</span>
                <input
                  type="tel"
                  className="h-12 rounded-xl border border-neutral-200 px-4 outline-none focus:border-neutral-400"
                  value={attendee.phone}
                  onChange={(e) =>
                    setAttendee((p) => ({ ...p, phone: e.target.value }))
                  }
                  disabled={submitting}
                />
              </label>

              {err && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                  {err}
                </p>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-12 rounded-full border border-neutral-300 text-neutral-800 font-semibold hover:bg-neutral-50 disabled:opacity-60"
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePay}
                className="h-12 rounded-full bg-[#739AD4] text-white font-semibold hover:brightness-95 disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Opening payment..." : "Pay now"}
              </button>
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              Payment opens in a secure Paystack popup. You remain on this site.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
