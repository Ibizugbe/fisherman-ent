import { Link } from "react-router-dom";
import type { MerchProduct } from "../../types/merch";

export function StarRow({
  rating = 4.8,
  reviews = 120,
}: {
  rating?: number;
  reviews?: number;
}) {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={[
              "text-base",
              i < fullStars ? "text-amber-400" : "text-neutral-300",
            ].join(" ")}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-neutral-500">({reviews} reviews)</span>
    </div>
  );
}

export function ColourDots({
  colours,
  selected,
  onSelect,
}: {
  colours: string[];
  selected: string;
  onSelect: (c: string) => void;
}) {
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
              ? "outline outline-2 outline-neutral-900 outline-offset-2"
              : "",
          ].join(" ")}
          style={{ backgroundColor: c }}
          aria-label={`Select colour ${c}`}
        />
      ))}
    </div>
  );
}

export function SizePills({
  sizes,
  selectedSize,
  onSelect,
}: {
  sizes: string[];
  selectedSize: string;
  onSelect: (s: string) => void;
}) {
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

export function QtyPicker({
  value,
  onDec,
  onInc,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
}) {
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

export function ProductCardMini({ product }: { product: MerchProduct }) {
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
        <div className="aspect-[5/4] w-full overflow-hidden">
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
