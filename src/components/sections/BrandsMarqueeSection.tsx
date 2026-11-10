type Brand = {
  name: string;
  logo?: string;
};

type Props = {
  brands: Brand[];
};

export function BrandMarquee({
  brands,
  reverse = false,
}: {
  brands: Brand[];
  reverse?: boolean;
}) {
  const brandsWithLogos = brands.filter(
    (brand): brand is Brand & { logo: string } => Boolean(brand.logo),
  );
  const items = [...brandsWithLogos, ...brandsWithLogos];

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
              className="h-8 w-24 object-contain opacity-80 hover:opacity-100 transition"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#F4F1EF] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#F4F1EF] to-transparent" />
    </div>
  );
}

export default function BrandsMarqueeSection({ brands }: Props) {
  return (
    <section className="relative py-16 sm:py-20 bg-[#F4F1EF] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#739AD4]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-600 uppercase">
            Brands We Have Worked With
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            From entertainment and hospitality to fashion, food, and real
            estate, we&apos;ve had the privilege of working with brands across
            Benin City and beyond.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex text-[#436da9] font-bold underline underline-offset-4"
          >
            Want to work with us? Become a sponsor.
          </a>
        </div>

        <div className="mt-10 sm:mt-12 space-y-4">
          <BrandMarquee brands={brands} />
          <div className="hidden sm:block">
            <BrandMarquee brands={brands} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
