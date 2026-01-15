import type { TicketEvent } from "../types/tickets";

export type EventItem = TicketEvent & {
  description?: string;
  coverImage?: string;
};

export const EVENTS: EventItem[] = [
  {
    id: "tradout",
    name: "Tradout",
    currency: "NGN",
    priceNaira: 15000,
    dateLabel: "TBA",
    venueLabel: "TBA",
    description:
      "Tradout is a live experience under the brand. Secure your ticket to attend the show.",
    // coverImage: "/events/tradout-cover.jpg",
  },
];

export const getEventById = (id: string): EventItem | undefined =>
  EVENTS.find((e) => e.id === id);
