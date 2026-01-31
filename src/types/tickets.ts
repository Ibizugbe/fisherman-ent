export type TicketEvent = {
  id: string;
  name: string;
  currency: "NGN";
  priceNaira: number; // 15000
  dateLabel?: string;
  timeLabel?: string;
  venueLabel?: string;
};

export type TicketAttendee = {
  fullName: string;
  email: string;
  phone?: string;
};

export type EmailStatus = {
  admin?: "pending" | "sent" | "failed";
  customer?: "pending" | "sent" | "failed";
  lastError?: string;
  lastSentAtISO?: string;
};

export type TicketOrder = {
  reference: string;
  createdAtISO: string;

  eventId: string;
  eventName: string;
  eventDate?: string;
  eventTime?: string;
  eventVenue?: string;

  currency: "NGN";
  unitPriceNaira: number;
  quantity: number;
  amountNaira: number;

  attendee: TicketAttendee;
  emailStatus?: EmailStatus;
};
