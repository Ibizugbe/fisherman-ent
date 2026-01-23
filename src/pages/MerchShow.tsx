import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTruck } from "react-icons/fi";

import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { products } from "../api/api";

import MerchCheckoutModal from "../components/merch/MerchCheckoutModal";
import {
  ColourDots,
  QtyPicker,
  SizePills,
  StarRow,
  ProductCardMini,
} from "../components/merch/merchUI";

import type { MerchProduct, MerchOrder } from "../types/merch";
import { saveOrder, updateOrder } from "../utils/storage";
import { sendOrderEmails } from "../lib/email";

const DEFAULT_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];

export default function MerchShow() {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = useMemo(
    () => products.find((p: MerchProduct) => String(p.id) === String(id)),
    [id],
  );

  const fallbackColours = ["#E5E7EB", "#111827", "#6B7280"];
  const colours = product?.colours?.length ? product.colours : fallbackColours;

  const [selectedColour, setSelectedColour] = useState(colours[0]);
  const [selectedSize, setSelectedSize] = useState(DEFAULT_SIZES[1]);
  const [qty, setQty] = useState(1);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const youMayAlsoLike = useMemo(() => {
    const others = products.filter((p: MerchProduct) => p.id !== product?.id);
    return others.slice(0, 3);
  }, [product?.id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] bg-[#F4F1EF] pt-28 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-neutral-700">Product not found.</p>
            <Link
              to="/merch"
              className="inline-block mt-4 text-neutral-900 underline underline-offset-4"
            >
              Back to merch
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const rating = product.rating ?? 4.8;
  const reviews = product.reviews ?? 120;
  const material = product.material ?? "100% cotton";
  const deliveryLabel = product.deliveryLabel ?? "Free Delivery";

  const handlePaid = (order: MerchOrder) => {
    // 1) Save immediately (source of truth for success page)
    saveOrder(order);
    sessionStorage.setItem("merch:lastPaidOrderRef", order.reference);

    // 2) Fire email sending (don’t block navigation; allow resend on success page)
    (async () => {
      try {
        updateOrder(order.reference, {
          emailStatus: {
            ...order.emailStatus,
            admin: "pending",
            customer: "pending",
          },
        });

        await sendOrderEmails(order);

        updateOrder(order.reference, {
          emailStatus: {
            admin: "sent",
            customer: "sent",
            lastSentAtISO: new Date().toISOString(),
          },
        });
      } catch (e: any) {
        updateOrder(order.reference, {
          emailStatus: {
            admin: "failed",
            customer: "failed",
            lastError: e?.message || "Email failed",
          },
        });
      }
    })();

    setCheckoutOpen(false);
    navigate(`/merch/order-success?ref=${encodeURIComponent(order.reference)}`);
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#F4F1EF]">
        <section className="pt-28 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
            >
              {/* Left */}
              <div className="rounded-2xl overflow-hidden bg-neutral-200/70 ring-1 ring-black/5 shadow-[0_18px_55px_rgba(0,0,0,0.12)]">
                <div className="aspect-[4/3] sm:aspect-[5/4] w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Right */}
              <div className="lg:pt-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
                  {product.name}
                </h1>

                <div className="mt-5 flex items-center gap-4">
                  <span className="text-sm text-neutral-600">Colours:</span>
                  <ColourDots
                    colours={colours}
                    selected={selectedColour}
                    onSelect={setSelectedColour}
                  />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-lg bg-[#0B1220] px-4 py-2 text-white text-sm font-semibold">
                    {product.price}
                  </span>
                  <span className="text-xs text-neutral-500">{material}</span>
                </div>

                <div className="mt-6">
                  <StarRow rating={rating} reviews={reviews} />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-white ring-1 ring-black/5 grid place-items-center">
                      <FiTruck className="text-neutral-700" />
                    </span>
                    <span className="text-sm text-neutral-700">
                      {deliveryLabel}
                    </span>
                  </div>

                  {/* <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-white ring-1 ring-black/5 grid place-items-center">
                      <MdOutlineVerified className="text-neutral-700 text-lg" />
                    </span>
                    <span className="text-sm text-neutral-700">
                      {warrantyMonths} month warranty
                    </span>
                  </div> */}
                </div>

                <div className="mt-7">
                  <p className="text-sm text-neutral-600 mb-3">Size Chart</p>
                  <SizePills
                    sizes={DEFAULT_SIZES}
                    selectedSize={selectedSize}
                    onSelect={setSelectedSize}
                  />
                </div>

                <div className="mt-6">
                  <p className="text-sm text-neutral-600 mb-3">Quantity:</p>
                  <QtyPicker
                    value={qty}
                    onDec={() => setQty((q) => Math.max(1, q - 1))}
                    onInc={() => setQty((q) => q + 1)}
                  />
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="h-12 rounded-full bg-[#739AD4] text-white font-semibold shadow-[0_12px_30px_rgba(115,154,212,0.35)] hover:brightness-95 active:scale-[0.99] transition"
                    onClick={() => setCheckoutOpen(true)}
                  >
                    Buy Now
                  </button>

                  {/* <button
                    type="button"
                    className="h-12 rounded-full bg-transparent border border-[#739AD4] text-[#739AD4] font-semibold hover:bg-white/60 active:scale-[0.99] transition"
                    onClick={() =>
                      console.log("Add to cart later (RTK)", {
                        productId: product.id,
                        selectedColour,
                        selectedSize,
                        qty,
                      })
                    }
                  >
                    Add to cart
                  </button> */}
                </div>

                <div className="mt-6">
                  <Link
                    to="/merch"
                    className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
                  >
                    Back to merch
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-10">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12">
              {youMayAlsoLike.map((p: MerchProduct) => (
                <ProductCardMini key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <MerchCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        product={product}
        qty={qty}
        selectedColour={selectedColour}
        selectedSize={selectedSize}
        onPaid={handlePaid}
      />

      <Footer />
    </>
  );
}
