import type { TicketEvent } from "../types/tickets";
import TradOut from "../assets/tradout/TRADOUT.jpg";

export type EventItem = TicketEvent & {
  description?: string;
  coverImage?: string;
  timeLabel?: string;
};

export const EVENTS: EventItem[] = [
  {
    id: "tradout",
    name: "Tradout",
    currency: "NGN",
    priceNaira: 2000,
    dateLabel: "8th March 2026",
    timeLabel: "5:00 PM",
    venueLabel: "Victor Uwaifo Hub, Benin City, Edo State",
    description:
      "Tradout is a live show experience. Get your ticket and be part of the moment.",
    coverImage: TradOut,
  },
];

export const getEventById = (id: string): EventItem | undefined =>
  EVENTS.find((e) => e.id === id);
