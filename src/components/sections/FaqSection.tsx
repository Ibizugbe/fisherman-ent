import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What is Fisherman Entertainment?",
    answer:
      "We are an entertainment production house specializing in film, music, comedy, and the performance arts.",
  },
  {
    question: "What is TradOut?",
    answer:
      "TradOut is a live event featuring comedy, music, and the arts, hosted three times a year in Benin City.",
  },
  {
    question: "How can I get information about the next TradOut event?",
    answer:
      "Follow us on social media (we are on Instagram) and join our Telegram group.",
  },
  {
    question: "Does TradOut only hold in Benin City?",
    answer:
      "For now, yes. But we will let you know when (and it is a when) that changes.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-600">
          FAQs
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black text-gray-900">
          A few things you may want to know.
        </h2>

        <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 flex items-center justify-between gap-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`shrink-0 text-[#739AD4] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p className="pb-6 pr-12 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
