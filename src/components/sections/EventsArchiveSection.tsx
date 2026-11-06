import { motion } from "framer-motion";
import tradOutOnePoster from "../../assets/tradout/TRADOUT.jpg";
import tradOutTwoPoster from "../../assets/tradout/TRADEOUT 2.0.jpg";
import gallery1 from "../../assets/gallery/galary1.png";
import gallery2 from "../../assets/gallery/galary2.png";
import gallery3 from "../../assets/gallery/galary3.png";
import gallery4 from "../../assets/gallery/galary4.png";
import gallery5 from "../../assets/gallery/galary5.png";
import gallery6 from "../../assets/gallery/galary6.png";
import gallery7 from "../../assets/gallery/galary7.png";
import gallery8 from "../../assets/gallery/galary8.png";
import gallery9 from "../../assets/gallery/galary9.png";
import gallery10 from "../../assets/gallery/galary10.png";

const PAST_EVENTS = [
  {
    name: "TradOut 2.0",
    date: "June 21, 2026",
    location: "Benin City",
    image: tradOutTwoPoster,
    galleryId: "tradout-2-gallery",
  },
  {
    name: "TradOut 1.0",
    date: "March 8, 2026",
    location: "Benin City",
    image: tradOutOnePoster,
    galleryId: "tradout-1-gallery",
  },
];

const GALLERIES = [
  {
    id: "tradout-1-gallery",
    title: "TradOut 1.0",
    images: [gallery1, gallery2, gallery3, gallery4, gallery5],
  },
  {
    id: "tradout-2-gallery",
    title: "TradOut 2.0",
    images: [gallery6, gallery7, gallery8, gallery9, gallery10],
  },
];

export function EventsArchiveSection() {
  return (
    <>
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
            Past Events
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-gray-900">
            Missed a show? Catch up on the highlights.
          </h2>

          <div className="mt-9 grid md:grid-cols-2 gap-7">
            {PAST_EVENTS.map((event, index) => (
              <motion.article
                key={event.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="rounded-3xl overflow-hidden bg-gray-50 ring-1 ring-black/5 shadow-[0_14px_45px_rgba(0,0,0,0.08)]"
              >
                <img
                  src={event.image}
                  alt={`${event.name} poster`}
                  className="w-full aspect-[16/10] object-cover object-top"
                  loading="lazy"
                />
                <div className="p-6 sm:p-7">
                  <h3 className="text-2xl font-black text-gray-900">
                    {event.name}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {event.date} · {event.location}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://youtube.com/@fishermanent?si=2e_mdWvFVggfrAl_"
                      target="_blank"
                      rel="noreferrer"
                      className="h-11 px-5 rounded-full bg-[#0B1220] text-white font-semibold grid place-items-center"
                    >
                      Watch the Show
                    </a>
                    <a
                      href={`#${event.galleryId}`}
                      className="h-11 px-5 rounded-full border border-[#739AD4] text-[#557db8] font-semibold grid place-items-center"
                    >
                      View Gallery
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
            Gallery
          </p>
          {GALLERIES.map((gallery) => (
            <div key={gallery.id} id={gallery.id} className="pt-10 scroll-mt-24">
              <h2 className="text-3xl font-black text-gray-900">
                {gallery.title}
              </h2>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {gallery.images.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${gallery.title} event moment ${index + 1}`}
                    className="w-full aspect-[4/5] object-cover rounded-2xl shadow-sm"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#0B1220] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black">
            Don&apos;t Miss the Next One
          </h2>
          <p className="mt-4 text-white/75 text-base sm:text-lg">
            Follow Fisherman Entertainment for upcoming shows, announcements,
            and more.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="https://www.instagram.com/fishermanent?igsh=NnZjaW82ZjQ1amYw"
              target="_blank"
              rel="noreferrer"
              className="h-12 px-7 rounded-full bg-white text-[#0B1220] font-semibold grid place-items-center"
            >
              Follow Us
            </a>
            <a
              href="https://t.me/FishermanEnt"
              target="_blank"
              rel="noreferrer"
              className="h-12 px-7 rounded-full bg-[#739AD4] text-white font-semibold grid place-items-center"
            >
              Join Our Telegram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
