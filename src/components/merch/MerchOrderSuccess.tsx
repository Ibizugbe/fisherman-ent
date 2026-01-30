import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import type { MerchOrder } from "../../types/merch";
import { getOrderByReference } from "../../utils/storage";
import { Navbar } from "../layouts/Navbar";
import { Footer } from "../layouts/Footer";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function MerchOrderSuccess() {
  const q = useQuery();
  const ref = q.get("ref") || "";
  const order: MerchOrder | null = ref ? getOrderByReference(ref) : null;

  return (
    <>
      <Navbar />

      <div className="bg-[#F4F1EF] pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
            Payment received
          </h1>

          <p className="mt-3 text-neutral-700">
            Reference: <span className="font-semibold">{ref || "—"}</span>
          </p>

          {!order ? (
            <p className="mt-6 text-neutral-700">
              Could not find this order in local storage.{" "}
              <Link className="underline" to="/merch">
                Go back to merch
              </Link>
              .
            </p>
          ) : (
            <div className="mt-6 rounded-2xl bg-white ring-1 ring-black/5 p-5">
              <p className="font-semibold text-neutral-900">Order summary</p>

              <div className="mt-4 grid gap-3">
                <p className="text-sm text-neutral-700">
                  Total:{" "}
                  <span className="font-semibold">
                    NGN {order.amountNaira.toLocaleString()}
                  </span>
                </p>

                <div className="border border-neutral-200 rounded-xl p-4">
                  {order.items.map((it) => (
                    <div key={it.productId} className="flex gap-4">
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-neutral-200">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-neutral-900 truncate">
                          {it.name}
                        </p>
                        <p className="text-sm text-neutral-600 mt-1">
                          Size:{" "}
                          <span className="font-medium">{it.selectedSize}</span>{" "}
                          • Colour:{" "}
                          <span className="font-medium">
                            {it.selectedColour}
                          </span>{" "}
                          • Qty: <span className="font-medium">{it.qty}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border border-neutral-200 rounded-xl p-4">
                  <p className="font-semibold text-neutral-900">Delivery</p>
                  <p className="text-sm text-neutral-700 mt-2">
                    {order.delivery.fullName}
                  </p>
                  <p className="text-sm text-neutral-700">
                    {order.delivery.phone}
                  </p>
                  <p className="text-sm text-neutral-700">
                    {order.delivery.address}, {order.delivery.city},{" "}
                    {order.delivery.state}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              to="/merch"
              className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
