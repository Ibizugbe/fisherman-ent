import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { MerchOrder, MerchProduct } from "../../types/merch";
import { parseNGNPrice, toKobo } from "../../utils/money";
import { makePaystackReference } from "../../utils/ref";
import { startPaystackPayment } from "../../lib/paystack";

type Props = {
  open: boolean;
  onClose: () => void;

  product: MerchProduct;
  qty: number;
  selectedColour: string;
  selectedSize: string;

  onPaid: (order: MerchOrder) => void;
};

export default function MerchCheckoutModal({
  open,
  onClose,
  product,
  qty,
  selectedColour,
  selectedSize,
  onPaid,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [delivery, setDelivery] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

  const unitPriceNaira = useMemo(
    () => parseNGNPrice(product.price),
    [product.price],
  );
  const totalNaira = useMemo(() => unitPriceNaira * qty, [unitPriceNaira, qty]);

  const validate = () => {
    if (!email.trim()) return "Please enter your email.";
    if (!delivery.fullName.trim()) return "Please enter delivery full name.";
    if (!delivery.phone.trim()) return "Please enter delivery phone.";
    if (!delivery.address.trim()) return "Please enter delivery address.";
    if (!delivery.city.trim()) return "Please enter delivery city.";
    if (!delivery.state.trim()) return "Please enter delivery state.";
    if (!publicKey) return "Missing Paystack public key.";
    if (totalNaira <= 0) return "Invalid amount.";
    return null;
  };

  const handlePay = () => {
    setErr(null);
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    setSubmitting(true);
    const reference = makePaystackReference("MERCH");

    startPaystackPayment({
      key: publicKey,
      email: email.trim(),
      phone: customerPhone.trim(),
      amount: toKobo(totalNaira),
      reference,
      metadata: {
        type: "merch",
        productId: product.id,
        productName: product.name,
        qty,
        selectedSize,
        selectedColour,
        delivery,
      },
      onSuccess: (trx) => {
        setSubmitting(false);

        const finalRef = trx?.reference || reference;

        const order: MerchOrder = {
          reference: finalRef,
          createdAtISO: new Date().toISOString(),
          currency: "NGN",
          amountNaira: totalNaira,
          customer: {
            email: email.trim(),
            phone: customerPhone.trim(),
            fullName: delivery.fullName.trim(),
          },
          delivery: {
            fullName: delivery.fullName.trim(),
            phone: delivery.phone.trim(),
            address: delivery.address.trim(),
            city: delivery.city.trim(),
            state: delivery.state.trim(),
          },
          items: [
            {
              productId: product.id,
              name: product.name,
              image: product.image,
              unitPriceLabel: product.price,
              unitPriceNaira,
              qty,
              selectedColour,
              selectedSize,
            },
          ],
          emailStatus: { admin: "pending", customer: "pending" },
        };

        onPaid(order);
      },
      onCancel: () => setSubmitting(false),
      onError: (e) => {
        setSubmitting(false);
        setErr(e?.message || "Payment failed. Please try again.");
      },
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[61] overflow-y-auto p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="min-h-full flex items-start sm:items-center justify-center">
              <div className="w-full max-w-2xl rounded-2xl bg-white shadow-[0_20px_80px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col max-h-[calc(100vh-2rem)]">
                {/* Header (fixed) */}
                <div className="p-5 border-b border-black/5 flex items-center justify-between shrink-0">
                  <p className="text-lg font-semibold text-neutral-900">
                    Checkout
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-10 w-10 rounded-full hover:bg-black/5"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Body (scrollable) */}
                <div className="p-5 overflow-y-auto flex-1">
                  {/* Summary */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-neutral-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-neutral-600 mt-1">
                        Size:{" "}
                        <span className="font-medium">{selectedSize}</span> •
                        Colour:{" "}
                        <span className="font-medium">{selectedColour}</span> •
                        Qty: <span className="font-medium">{qty}</span>
                      </p>
                      <p className="text-sm text-neutral-700 mt-2">
                        Total:{" "}
                        <span className="font-semibold">
                          NGN {totalNaira.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Forms */}
                  <div className="mt-6 grid gap-5">
                    <div className="grid gap-3">
                      <p className="font-semibold text-neutral-900">Contact</p>

                      <label className="grid gap-1">
                        <span className="text-sm text-neutral-700">Email</span>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="h-12 rounded-xl border border-neutral-200 px-4 outline-none focus:border-neutral-400"
                          placeholder="you@example.com"
                        />
                      </label>

                      <label className="grid gap-1">
                        <span className="text-sm text-neutral-700">
                          Phone (optional)
                        </span>
                        <input
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          type="tel"
                          className="h-12 rounded-xl border border-neutral-200 px-4 outline-none focus:border-neutral-400"
                          placeholder="+234..."
                        />
                      </label>
                    </div>

                    <div className="grid gap-3">
                      <p className="font-semibold text-neutral-900">Delivery</p>

                      {[
                        ["Full name", "fullName"],
                        ["Phone", "phone"],
                        ["Address", "address"],
                        ["City", "city"],
                        ["State", "state"],
                      ].map(([label, key]) => (
                        <label key={key} className="grid gap-1">
                          <span className="text-sm text-neutral-700">
                            {label}
                          </span>
                          <input
                            value={(delivery as any)[key]}
                            onChange={(e) =>
                              setDelivery((p) => ({
                                ...p,
                                [key]: e.target.value,
                              }))
                            }
                            className="h-12 rounded-xl border border-neutral-200 px-4 outline-none focus:border-neutral-400"
                          />
                        </label>
                      ))}
                    </div>

                    {err && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                        {err}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer (always visible) */}
                <div className="p-5 border-t border-black/5 bg-white shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    Payment opens in a secure Paystack popup. You remain on this
                    site.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
