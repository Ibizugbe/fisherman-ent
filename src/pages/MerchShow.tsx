import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTruck } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { products } from "../api/api";

const DEFAULT_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];

function StarRow({ rating = 4.8, reviews = 120 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalf;
          return (
            <span
              key={i}
              className={[
                "text-base",
                isFull ? "text-amber-400" : "text-neutral-300",
              ].join(" ")}
              aria-hidden="true"
            >
              {isHalf ? "★" : "★"}
            </span>
          );
        })}
      </div>

      <span className="text-sm text-neutral-500">({reviews} reviews)</span>
    </div>
  );
}
type ColourDotsProps = {
  colours: string[];
  selected: string;
  onSelect: (colour: string) => void;
};

export function ColourDots({ colours, selected, onSelect }: ColourDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {colours.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onSelect(c)}
          className={[
            "h-4 w-4 rounded-full",
            "ring-1 ring-black/20",
            selected === c
              ? "outline outline-neutral-900 outline-offset-2"
              : "",
          ].join(" ")}
          style={{ backgroundColor: c }}
          aria-label={`Select colour ${c}`}
        />
      ))}
    </div>
  );
}

type SizePillsProps = {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
};

export function SizePills({ sizes, selectedSize, onSelect }: SizePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const active = selectedSize === s;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            className={[
              "h-10 min-w-10 px-4 rounded-full text-sm font-medium",
              "border transition-all",
              active
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500",
            ].join(" ")}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

type QtyPickerProps = {
  value: number;
  onDec: () => void;
  onInc: () => void;
};

export function QtyPicker({ value, onDec, onInc }: QtyPickerProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1">
      <button
        type="button"
        onClick={onDec}
        className="h-9 w-9 rounded-full grid place-items-center text-neutral-700 hover:bg-neutral-100"
        aria-label="Decrease quantity"
      >
        –
      </button>

      <span className="w-10 text-center text-sm font-semibold text-neutral-900">
        {value}
      </span>

      <button
        type="button"
        onClick={onInc}
        className="h-9 w-9 rounded-full grid place-items-center text-neutral-700 hover:bg-neutral-100"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

/** Match your product shape (extend as needed) */
export type MerchProduct = {
  id: number;
  name: string;
  price: string;
  image: string;
  colours?: string[];
  material?: string;
  rating?: number;
  reviews?: number;
  warrantyMonths?: number;
  deliveryLabel?: string;
};

type ProductCardMiniProps = {
  product: MerchProduct;
};

export function ProductCardMini({ product }: ProductCardMiniProps) {
  return (
    <Link to={`/merch/${product.id}`} className="group block">
      <div
        className={[
          "rounded-2xl overflow-hidden",
          "bg-neutral-200/70 ring-1 ring-black/5",
          "shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
          "transition-shadow duration-300",
          "group-hover:shadow-[0_14px_45px_rgba(0,0,0,0.14)]",
        ].join(" ")}
      >
        <div className="aspect-5/4 w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-neutral-900 italic">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-neutral-700 tracking-wide">
          {product.price}
        </p>
      </div>
    </Link>
  );
}

export default function MerchShow() {
  const { id } = useParams();
  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id]
  );

  const fallbackColours = ["#E5E7EB", "#111827", "#6B7280"];
  const colours = product?.colours?.length ? product.colours : fallbackColours;

  const [selectedColour, setSelectedColour] = useState(colours[0]);
  const [selectedSize, setSelectedSize] = useState(DEFAULT_SIZES[1]); // M
  const [qty, setQty] = useState(1);

  const youMayAlsoLike = useMemo(() => {
    const others = products.filter((p) => p.id !== product?.id);
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
  const warrantyMonths = product.warrantyMonths ?? 6;
  const deliveryLabel = product.deliveryLabel ?? "Free Delivery";

  return (
    <>
      <Navbar />

      <div className="bg-[#F4F1EF]">
        {/* Main show section */}
        <section className="pt-28 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
            >
              {/* Left: Image */}
              <div
                className={[
                  "rounded-2xl overflow-hidden",
                  "bg-neutral-200/70 ring-1 ring-black/5",
                  "shadow-[0_18px_55px_rgba(0,0,0,0.12)]",
                ].join(" ")}
              >
                <div className="aspect-4/3 sm:aspect-5/4 w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Right: Details */}
              <div className="lg:pt-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
                  {product.name}
                </h1>

                {/* Colours */}
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-sm text-neutral-600">Colours:</span>
                  <ColourDots
                    colours={colours}
                    selected={selectedColour}
                    onSelect={setSelectedColour}
                  />
                </div>

                {/* Price + material */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-lg bg-[#0B1220] px-4 py-2 text-white text-sm font-semibold">
                    {product.price}
                  </span>
                  <span className="text-xs text-neutral-500">{material}</span>
                </div>

                {/* Rating */}
                <div className="mt-6">
                  <StarRow rating={rating} reviews={reviews} />
                </div>

                {/* Perks */}
                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-white ring-1 ring-black/5 grid place-items-center">
                      <FiTruck className="text-neutral-700" />
                    </span>
                    <span className="text-sm text-neutral-700">
                      {deliveryLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-white ring-1 ring-black/5 grid place-items-center">
                      <MdOutlineVerified className="text-neutral-700 text-lg" />
                    </span>
                    <span className="text-sm text-neutral-700">
                      {warrantyMonths} month warranty
                    </span>
                  </div>
                </div>

                {/* Size chart */}
                <div className="mt-7">
                  <p className="text-sm text-neutral-600 mb-3">Size Chart</p>
                  <SizePills
                    sizes={DEFAULT_SIZES}
                    selectedSize={selectedSize}
                    onSelect={setSelectedSize}
                  />
                </div>

                {/* Quantity */}
                <div className="mt-6">
                  <p className="text-sm text-neutral-600 mb-3">Quantity:</p>
                  <QtyPicker
                    value={qty}
                    onDec={() => setQty((q) => Math.max(1, q - 1))}
                    onInc={() => setQty((q) => q + 1)}
                  />
                </div>

                {/* Actions */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="h-12 rounded-full bg-[#739AD4] text-white font-semibold shadow-[0_12px_30px_rgba(115,154,212,0.35)] hover:brightness-95 active:scale-[0.99] transition"
                    onClick={() => {
                      // Replace with your checkout logic later
                      console.log("Buy Now", {
                        productId: product.id,
                        selectedColour,
                        selectedSize,
                        qty,
                      });
                    }}
                  >
                    Buy Now
                  </button>

                  <button
                    type="button"
                    className="h-12 rounded-full bg-transparent border border-[#739AD4] text-[#739AD4] font-semibold hover:bg-white/60 active:scale-[0.99] transition"
                    onClick={() => {
                      // Replace with your cart logic later
                      console.log("Add to cart", {
                        productId: product.id,
                        selectedColour,
                        selectedSize,
                        qty,
                      });
                    }}
                  >
                    Add to cart
                  </button>
                </div>

                {/* Optional: back link */}
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

        {/* You may also like */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-10">
              You may also like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12">
              {youMayAlsoLike.map((p) => (
                <ProductCardMini key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
