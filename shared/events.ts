export type EventCore = {
  id: string;
  name: string;
  currency: "NGN";
  priceNaira: number;
  dateLabel?: string;
  timeLabel?: string;
  venueLabel?: string;
  description?: string;
};

export const EVENTS: EventCore[] = [
  {
    id: "tradout",
    name: "Tradout 2.0",
    currency: "NGN",
    priceNaira: 15000,
    dateLabel: "Sunday, June 21st, 2026",
    timeLabel: "5:00 PM",
    venueLabel: "The Thames Event Center",
    description:
      "Tradout is a live show experience. Get your ticket and be part of the moment.",
  },
];

export const getEventById = (id: string): EventCore | undefined =>
  EVENTS.find((e) => e.id === id);
