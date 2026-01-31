import emailjs from "@emailjs/browser";
import type { MerchOrder } from "../types/merch";

function buildOrderSummary(order: MerchOrder) {
  const lines: string[] = [];
  lines.push("Type: Merch");
  lines.push(`Reference: ${order.reference}`);
  lines.push(`Date: ${order.createdAtISO}`);
  lines.push(`Total: NGN ${order.amountNaira.toLocaleString()}`);
  lines.push("");
  lines.push("Items:");
  order.items.forEach((it) => {
    lines.push(
      `- ${it.name} | Size: ${it.selectedSize} | Colour: ${
        it.selectedColour
      } | Qty: ${it.qty} | Unit: NGN ${it.unitPriceNaira.toLocaleString()}`
    );
  });
  lines.push("");
  lines.push("Delivery:");
  lines.push(`Name: ${order.delivery.fullName}`);
  lines.push(`Phone: ${order.delivery.phone}`);
  lines.push(
    `Address: ${order.delivery.address}, ${order.delivery.city}, ${order.delivery.state}`
  );
  lines.push("");
  lines.push("Customer:");
  lines.push(`Email: ${order.customer.email}`);
  lines.push(`Phone: ${order.customer.phone}`);
  return lines.join("\n");
}

function env(name: string) {
  return (import.meta as any).env?.[name] as string;
}

export async function sendOrderEmails(order: MerchOrder) {
  const publicKey = env("VITE_EMAILJS_PUBLIC_KEY");
  const serviceId = env("VITE_EMAILJS_SERVICE_ID");
  const tplAdmin = env("VITE_EMAILJS_TEMPLATE_ADMIN");
  const tplCustomer = env("VITE_EMAILJS_TEMPLATE_CUSTOMER");

  if (!publicKey || !serviceId || !tplAdmin) {
    throw new Error("Missing EmailJS env vars.");
  }

  const summary = buildOrderSummary(order);

  // Admin email
  await emailjs.send(
    serviceId,
    tplAdmin,
    {
      to_email: "contact@fishermanent.com",
      subject: `New Merch Order — ${order.reference}`,
      order_reference: order.reference,
      order_type: "Merch",
      intro_text:
        "We’ve received your payment and your merch is now queued for fulfilment. Keep this email for your records.",
      ticket_section: "",
      ticket_section_display: "display:none;",
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      order_total: `NGN ${order.amountNaira.toLocaleString()}`,
      order_summary: summary,
    },
    { publicKey }
  );

  // Customer email
  const customerTpl = tplCustomer || tplAdmin;
  await emailjs.send(
    serviceId,
    customerTpl,
    {
      to_email: order.customer.email,
      subject: `Your order is confirmed — ${order.reference}`,
      order_reference: order.reference,
      order_type: "Merch",
      intro_text:
        "We’ve received your payment and your merch is now queued for fulfilment. Keep this email for your records.",
      ticket_section: "",
      ticket_section_display: "display:none;",
      order_total: `NGN ${order.amountNaira.toLocaleString()}`,
      order_summary: summary,
    },
    { publicKey }
  );
}
