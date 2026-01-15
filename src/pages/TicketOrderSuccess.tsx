import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { getTicketOrderByReference } from "../utils/ticketsStorage";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function TicketOrderSuccess() {
  const q = useQuery();
  const ref = q.get("ref") || "";
  const order = ref ? getTicketOrderByReference(ref) : null;

  return (
    <>
      <Navbar />

      <div className="bg-[#F4F1EF] pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
            Ticket confirmed
          </h1>

          <p className="mt-3 text-neutral-700">
            Reference: <span className="font-semibold">{ref || "—"}</span>
          </p>

          {!order ? (
            <p className="mt-6 text-neutral-700">
              Could not find this ticket order locally.{" "}
              <Link className="underline" to="/tickets/tradout">
                Go back
              </Link>
              .
            </p>
          ) : (
            <div className="mt-6 rounded-2xl bg-white ring-1 ring-black/5 p-5">
              <p className="font-semibold text-neutral-900">
                {order.eventName}
              </p>

              <p className="mt-2 text-sm text-neutral-700">
                Tickets: <span className="font-semibold">{order.quantity}</span>
              </p>

              <p className="mt-1 text-sm text-neutral-700">
                Total:{" "}
                <span className="font-semibold">
                  NGN {order.amountNaira.toLocaleString()}
                </span>
              </p>

              <div className="mt-4 border border-neutral-200 rounded-xl p-4">
                <p className="font-semibold text-neutral-900">Attendee</p>
                <p className="text-sm text-neutral-700 mt-2">
                  {order.attendee.fullName}
                </p>
                <p className="text-sm text-neutral-700">
                  {order.attendee.email}
                </p>
                {order.attendee.phone ? (
                  <p className="text-sm text-neutral-700">
                    {order.attendee.phone}
                  </p>
                ) : null}
              </div>

              <div className="mt-4 border border-neutral-200 rounded-xl p-4">
                <p className="font-semibold text-neutral-900">Email status</p>
                <p className="text-sm text-neutral-700 mt-2">
                  Admin:{" "}
                  <span className="font-medium">
                    {order.emailStatus?.admin || "unknown"}
                  </span>{" "}
                  • Customer:{" "}
                  <span className="font-medium">
                    {order.emailStatus?.customer || "unknown"}
                  </span>
                </p>
                {order.emailStatus?.lastError ? (
                  <p className="text-xs text-red-600 mt-2">
                    {order.emailStatus.lastError}
                  </p>
                ) : null}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              to="/events"
              className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
            >
              Back to events
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
