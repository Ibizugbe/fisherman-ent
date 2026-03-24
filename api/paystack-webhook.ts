import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

type TicketOrder = {
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
  attendee: {
    fullName: string;
    email: string;
    phone?: string | null;
  };
};

const readRawBody = async (req: any): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => {
      data += chunk.toString("utf8");
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

const getEnv = (name: string) => process.env[name];

const emailEnv = (name: string) =>
  getEnv(name) || getEnv(name.replace("EMAILJS_", "VITE_EMAILJS_"));

const buildTicketSummary = (order: TicketOrder): string => {
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
};

const sendEmailJs = async (payload: Record<string, any>) => {
  const publicKey = emailEnv("EMAILJS_PUBLIC_KEY");
  if (!publicKey) throw new Error("Missing EmailJS public key");

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, user_id: publicKey }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`EmailJS failed: ${text}`);
  }
};

const sendTicketEmails = async (order: TicketOrder) => {
  const serviceId = emailEnv("EMAILJS_SERVICE_ID");
  const tplAdmin =
    emailEnv("EMAILJS_TEMPLATE_TICKET_ADMIN") ||
    emailEnv("EMAILJS_TEMPLATE_ADMIN");
  const tplCustomer =
    emailEnv("EMAILJS_TEMPLATE_TICKET_CUSTOMER") ||
    emailEnv("EMAILJS_TEMPLATE_CUSTOMER");

  if (!serviceId || !tplAdmin) {
    throw new Error("Missing EmailJS env vars for ticket templates.");
  }

  const summary = buildTicketSummary(order);
  const ticketSection = `

The Experience
TradOut 1.0 is a high-energy comedy experience designed for you. Expect a lineup featuring a mix of up-and-coming and seasoned industry professionals.
 
Pro-tip: Please arrive early to enjoy our interactive experience.
 
Join Our Community
To truly get the most out of this experience, you need to be in our Telegram Community. By joining, you get exclusive behind-the-scenes access, instant updates on TradOut 1.0, and first-dibs (plus possible discounts) on all subsequent shows.
  
Need help or have questions? Reply to this email or reach us at contact@fishermanent.com.

See you at the Hub!
 
Best regards,
The TradOut Team`;

  const telegramUrl =
    process.env.TELEGRAM_URL || "https://t.me/fishermanent";
  const telegramCta = "Click here to join the Telegram Community";

  await sendEmailJs({
    service_id: serviceId,
    template_id: tplAdmin,
    template_params: {
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
  });

  const customerTpl = tplCustomer || tplAdmin;
  await sendEmailJs({
    service_id: serviceId,
    template_id: customerTpl,
    template_params: {
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
  });
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secret || !supabaseUrl || !supabaseServiceRoleKey) {
    res.status(500).json({ error: "Missing server env vars" });
    return;
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers["x-paystack-signature"];
  const expected = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");

  if (signature !== expected) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  let payload: any = null;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    res.status(400).json({ error: "Invalid JSON" });
    return;
  }

  if (!payload || payload.event !== "charge.success") {
    res.status(200).json({ ok: true });
    return;
  }

  const data = payload.data;
  const metadata = data?.metadata ?? {};

  if (metadata?.type !== "ticket") {
    res.status(200).json({ ok: true });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const reference = String(data?.reference ?? "");
  const amountNaira = Math.round((data?.amount ?? 0) / 100);
  const quantity = Number(metadata?.quantity ?? 1);

  const order: TicketOrder = {
    reference,
    createdAtISO: metadata?.createdAtISO ?? new Date().toISOString(),
    eventId: String(metadata?.eventId ?? ""),
    eventName: String(metadata?.eventName ?? ""),
    eventDate: metadata?.eventDate ?? null,
    eventTime: metadata?.eventTime ?? null,
    eventVenue: metadata?.eventVenue ?? null,
    currency: "NGN",
    unitPriceNaira: Number(metadata?.unitPriceNaira ?? 0),
    quantity,
    amountNaira: Number(metadata?.amountNaira ?? amountNaira),
    attendee: {
      fullName: String(metadata?.attendee?.fullName ?? ""),
      email: String(metadata?.attendee?.email ?? ""),
      phone: metadata?.attendee?.phone ?? null,
    },
  };

  const row = {
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
  };

  const { error } = await supabase
    .from("ticket_guests")
    .upsert(row, { onConflict: "reference" });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  try {
    await sendTicketEmails(order);
  } catch (err) {
    console.error("Email send failed:", err);
  }

  res.status(200).json({ ok: true });
}
