import emailjs from "@emailjs/browser";
import type { TicketOrder } from "../types/tickets";

function env(name: string): string {
  return (import.meta as any).env?.[name] as string;
}

function buildTicketSummary(order: TicketOrder): string {
  const lines: string[] = [];
  lines.push(`Event: ${order.eventName}`);
  if (order.eventDate) lines.push(`Date: ${order.eventDate}`);
  if (order.eventVenue) lines.push(`Venue: ${order.eventVenue}`);
  lines.push(`Reference: ${order.reference}`);
  lines.push(`Tickets: ${order.quantity}`);
  lines.push(`Unit price: NGN ${order.unitPriceNaira.toLocaleString()}`);
  lines.push(`Total: NGN ${order.amountNaira.toLocaleString()}`);
  lines.push("");
  lines.push("Attendee:");
  lines.push(`Name: ${order.attendee.fullName}`);
  lines.push(`Email: ${order.attendee.email}`);
  lines.push(`Phone: ${order.attendee.phone || "—"}`);
  return lines.join("\n");
}

export async function sendTicketEmails(order: TicketOrder) {
  const publicKey = env("VITE_EMAILJS_PUBLIC_KEY");
  const serviceId = env("VITE_EMAILJS_SERVICE_ID");
  const tplAdmin = env("VITE_EMAILJS_TEMPLATE_TICKET_ADMIN");
  const tplCustomer = env("VITE_EMAILJS_TEMPLATE_TICKET_CUSTOMER");

  if (!publicKey || !serviceId || !tplAdmin || !tplCustomer) {
    throw new Error("Missing EmailJS env vars for ticket templates.");
  }

  const summary = buildTicketSummary(order);

  // Admin
  await emailjs.send(
    serviceId,
    tplAdmin,
    {
      to_email: "contact@fishermanent.com",
      subject: `New Ticket Purchase — ${order.eventName} — ${order.reference}`,
      order_reference: order.reference,
      customer_email: order.attendee.email,
      customer_phone: order.attendee.phone || "",
      order_total: `NGN ${order.amountNaira.toLocaleString()}`,
      order_summary: summary,
    },
    { publicKey }
  );

  // Customer
  await emailjs.send(
    serviceId,
    tplCustomer,
    {
      to_email: order.attendee.email,
      subject: `Your ticket is confirmed — ${order.eventName} — ${order.reference}`,
      order_reference: order.reference,
      order_total: `NGN ${order.amountNaira.toLocaleString()}`,
      order_summary: summary,
    },
    { publicKey }
  );
}
