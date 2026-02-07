import type { TicketOrder } from "../types/tickets";
import { supabase } from "./supabase";

const GUEST_LIST_TABLE = "ticket_guests";

type GuestListRow = {
  reference: string;
  created_at_iso: string;
  event_id: string;
  event_name: string;
  event_date: string | null;
  event_time: string | null;
  event_venue: string | null;
  currency: string;
  unit_price_naira: number;
  quantity: number;
  amount_naira: number;
  attendee_full_name: string;
  attendee_email: string;
  attendee_phone: string | null;
};

const toGuestListRow = (order: TicketOrder): GuestListRow => ({
  reference: order.reference,
  created_at_iso: order.createdAtISO,
  event_id: order.eventId,
  event_name: order.eventName,
  event_date: order.eventDate ?? null,
  event_time: order.eventTime ?? null,
  event_venue: order.eventVenue ?? null,
  currency: order.currency,
  unit_price_naira: order.unitPriceNaira,
  quantity: order.quantity,
  amount_naira: order.amountNaira,
  attendee_full_name: order.attendee.fullName,
  attendee_email: order.attendee.email,
  attendee_phone: order.attendee.phone ?? null,
});

export const logGuestListEntry = async (order: TicketOrder) => {
  const row = toGuestListRow(order);
  const { error } = await supabase.from(GUEST_LIST_TABLE).insert(row);

  if (error) {
    throw error;
  }
};
