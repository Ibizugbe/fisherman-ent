type Brand = {
  name: string;
  logo: string; // path to image (imported or public url)
};

type Props = {
  brands: Brand[];
};

function MarqueeRow({
  brands,
  reverse = false,
}: {
  brands: Brand[];
  reverse?: boolean;
}) {
  // Duplicate list for seamless looping
  const items = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden">
      <div
        className={[
          "flex w-max items-center gap-10 sm:gap-14 py-4",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        ].join(" ")}
      >
        {items.map((b, idx) => (
          <div
            key={`${b.name}-${idx}`}
            className="flex items-center justify-center px-6 sm:px-6 py-4 rounded-2xl bg-white/70 ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            title={b.name}
          >
            <img
              src={b.logo}
              alt={b.name}
              className="h-7 w-16 sm:h-8  opacity-80 hover:opacity-100 transition"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#F4F1EF] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#F4F1EF] to-transparent" />
    </div>
  );
}

export default function BrandsMarqueeSection({ brands }: Props) {
  return (
    <section className="relative py-16 sm:py-20 bg-[#F4F1EF] overflow-hidden">
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#739AD4]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-600 uppercase">
            Brands we have worked with
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-gray-900">
            Trusted by teams and partners
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            A few of the brands and collaborators we’ve supported.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 space-y-4">
          <MarqueeRow brands={brands} />
          {/* second row in opposite direction for a richer look */}
          <MarqueeRow brands={brands} reverse />
        </div>
      </div>
    </section>
  );
}
