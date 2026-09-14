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
    name: "TradOut 3.0",
    currency: "NGN",
    priceNaira: 15000,
    dateLabel: "Sunday, November 29th, 2026",
    timeLabel: "5:00 PM",
    venueLabel: "The Thames Event Centre, Benin City",
    description:
      "A night of comedy and music you will never forget. Please arrive early. E get why.",
  },
];

export const getEventById = (id: string): EventCore | undefined =>
  EVENTS.find((e) => e.id === id);
