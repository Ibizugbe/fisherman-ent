import emailjs from "@emailjs/browser";
import type { TicketOrder } from "../types/tickets";

function env(name: string): string {
  return (import.meta as any).env?.[name] as string;
}

function buildTicketSummary(order: TicketOrder): string {
  const lines: string[] = [];
  lines.push("Type: Ticket");
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
  const tplAdmin =
    env("VITE_EMAILJS_TEMPLATE_TICKET_ADMIN") ||
    env("VITE_EMAILJS_TEMPLATE_ADMIN");
  const tplCustomer =
    env("VITE_EMAILJS_TEMPLATE_TICKET_CUSTOMER") ||
    env("VITE_EMAILJS_TEMPLATE_CUSTOMER");

  if (!publicKey || !serviceId || !tplAdmin) {
    throw new Error("Missing EmailJS env vars for ticket templates.");
  }

  const summary = buildTicketSummary(order);
  const ticketSection = `Event Details
• Date: ${order.eventDate || "TBA"}
• Time: ${order.eventTime || "TBA"}
• Venue: ${order.eventVenue || "TBA"}

The Experience
TradOut 1.0 is more than just a comedy show; it’s a high-energy experience designed to unite comedy lovers across Benin City.

You can expect a tightly packed lineup featuring a mix of raw, up-and-coming local talent and seasoned industry professionals.

Beyond the stand-up sets, get ready for interactive games and special goodies tailored for you.

Pro-tip: We’ve curated this show to be fast-paced and impactful from the very first minute. Please arrive early to enjoy our interactive experience and play some games, before grabbing a great seat and enjoying the full experience from start to finish.

Don’t Miss this Inside Scoop
The show is just the beginning. To truly get the most out of this experience, you need to be in our Telegram Community.

Now, this isn't one of those broadcast lists; it’s an opportunity to peek behind the curtains. By joining, you get exclusive behind-the-scenes access, instant updates on TradOut 1.0, and first-dibs (plus possible discounts) on all subsequent shows.

We are building a movement of comedy lovers who want to be part of a new breed of comedy in Benin City—don’t get left on the outside.

See you at the Hub!

Best regards,
The TradOut Team`;

  // Admin
  await emailjs.send(
    serviceId,
    tplAdmin,
    {
      to_email: "contact@fishermanent.com",
      subject: `New Ticket Purchase — ${order.eventName} — ${order.reference}`,
      order_reference: order.reference,
      order_type: "Ticket",
      intro_text:
        "We’ve received your payment and your ticket is confirmed. Keep this email for your records.",
      ticket_section: ticketSection,
      ticket_section_display: "display:block;",
      customer_email: order.attendee.email,
      customer_phone: order.attendee.phone || "",
      order_total: `NGN ${order.amountNaira.toLocaleString()}`,
      order_summary: summary,
    },
    { publicKey }
  );

  // Customer
  const customerTpl = tplCustomer || tplAdmin;
  await emailjs.send(
    serviceId,
    customerTpl,
    {
      to_email: order.attendee.email,
      subject: `Your ticket is confirmed — ${order.eventName} — ${order.reference}`,
      order_reference: order.reference,
      order_type: "Ticket",
      intro_text:
        "We’ve received your payment and your ticket is confirmed. Keep this email for your records.",
      ticket_section: ticketSection,
      ticket_section_display: "display:block;",
      order_total: `NGN ${order.amountNaira.toLocaleString()}`,
      order_summary: summary,
    },
    { publicKey }
  );
}
