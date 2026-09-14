import emailjs from "@emailjs/browser";
import type { TicketOrder } from "../types/tickets";
import { tradoutTelegramCta, tradoutTicketSection } from "../../shared/tradoutEmail";

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
  const ticketSection = tradoutTicketSection;

  const telegramUrl = "https://t.me/fishermanent";
  const telegramCta = tradoutTelegramCta;

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
      telegram_url: telegramUrl,
      telegram_cta: telegramCta,
      customer_email: order.attendee.email,
      customer_phone: order.attendee.phone || "",
      order_total: `NGN ${order.amountNaira.toLocaleString()}`,
      order_summary: summary,
    },
    { publicKey },
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
      telegram_url: telegramUrl,
      telegram_cta: telegramCta,
      order_total: `NGN ${order.amountNaira.toLocaleString()}`,
      order_summary: summary,
    },
    { publicKey },
  );
}
