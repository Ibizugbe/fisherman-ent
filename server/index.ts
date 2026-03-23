import "dotenv/config";
import crypto from "crypto";
import express from "express";
import { createClient } from "@supabase/supabase-js";
import { EVENTS, getEventById } from "../shared/events";

type SessionStep =
  | "idle"
  | "await_event"
  | "await_quantity"
  | "await_name"
  | "await_email"
  | "await_phone";

type Session = {
  step: SessionStep;
  eventId?: string;
  quantity?: number;
  fullName?: string;
  email?: string;
  phone?: string;
};

type PaystackInitResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url?: string;
    reference?: string;
  };
};

const app = express();
const sessions = new Map<string, Session>();

app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf.toString("utf8");
    },
  })
);

const {
  WHATSAPP_VERIFY_TOKEN,
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  PAYSTACK_SECRET_KEY,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  PUBLIC_SITE_URL,
  TELEGRAM_URL,
} = process.env;

const TELEGRAM_LINK = TELEGRAM_URL || "https://t.me/fishermanent";

const normalize = (value: string) => value.trim().toLowerCase();

const getOrCreateSession = (from: string): Session => {
  const existing = sessions.get(from);
  if (existing) return existing;
  const created: Session = { step: "idle" };
  sessions.set(from, created);
  return created;
};

const resetSession = (from: string) => {
  sessions.set(from, { step: "idle" });
};

const getEventListText = () =>
  EVENTS.map(
    (event, idx) =>
      `${idx + 1}. ${event.name} (${event.id}) - NGN ${event.priceNaira.toLocaleString()}${
        event.dateLabel ? ` - ${event.dateLabel}` : ""
      }`
  ).join("\n");

const findEventByInput = (input: string) => {
  const value = normalize(input);
  return (
    EVENTS.find((event) => normalize(event.id) === value) ||
    EVENTS.find((event) => normalize(event.name) === value) ||
    EVENTS.find((event) => normalize(event.name).includes(value))
  );
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sendWhatsAppMessage = async (
  to: string,
  payload: Record<string, any>
) => {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.warn("Missing WhatsApp env vars");
    return;
  }

  const response = await fetch(
    `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        ...payload,
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("WhatsApp send failed:", response.status, text);
  }
};

const sendText = (to: string, body: string) =>
  sendWhatsAppMessage(to, { type: "text", text: { body } });

const sendMenu = (to: string) =>
  sendWhatsAppMessage(to, {
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: "Hi! What would you like to do?" },
      action: {
        buttons: [
          {
            type: "reply",
            reply: { id: "menu_events", title: "Upcoming events" },
          },
          {
            type: "reply",
            reply: { id: "menu_buy", title: "Buy ticket" },
          },
          {
            type: "reply",
            reply: { id: "menu_telegram", title: "Telegram community" },
          },
        ],
      },
    },
  });

const createPaystackPayment = async (options: {
  email: string;
  amountNaira: number;
  metadata: Record<string, any>;
}) => {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Missing PAYSTACK_SECRET_KEY");
  }

  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: options.email,
        amount: Math.round(options.amountNaira * 100),
        metadata: options.metadata,
        callback_url: PUBLIC_SITE_URL
          ? `${PUBLIC_SITE_URL}/tickets/success`
          : undefined,
      }),
    }
  );

  const json = (await response.json()) as PaystackInitResponse;
  if (!json.status || !json.data?.authorization_url) {
    throw new Error(json.message || "Failed to initialize payment");
  }

  return json.data.authorization_url;
};

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/webhooks/whatsapp", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
    res.status(200).send(challenge);
    return;
  }

  res.sendStatus(403);
});

app.post("/webhooks/whatsapp", async (req, res) => {
  res.sendStatus(200);

  const entry = req.body?.entry?.[0];
  const change = entry?.changes?.[0];
  const message = change?.value?.messages?.[0];
  const from = message?.from;

  if (!from) return;

  const session = getOrCreateSession(from);
  const type = message?.type;

  let text: string | null = null;
  let actionId: string | null = null;

  if (type === "text") {
    text = message.text?.body ?? null;
  } else if (type === "interactive") {
    const interactive = message.interactive;
    if (interactive?.type === "button_reply") {
      actionId = interactive.button_reply?.id ?? null;
    } else if (interactive?.type === "list_reply") {
      actionId = interactive.list_reply?.id ?? null;
    }
  }

  const normalizedText = text ? normalize(text) : "";

  if (
    normalizedText === "hi" ||
    normalizedText === "hello" ||
    normalizedText === "menu" ||
    normalizedText === "start"
  ) {
    resetSession(from);
    await sendMenu(from);
    return;
  }

  if (actionId === "menu_events" || normalizedText === "events") {
    resetSession(from);
    await sendText(
      from,
      `Upcoming events:\n${getEventListText()}\n\nReply "buy" to purchase a ticket.`
    );
    return;
  }

  if (actionId === "menu_telegram" || normalizedText.includes("telegram")) {
    resetSession(from);
    await sendText(
      from,
      `Join our Telegram community for more info and updates:\n${TELEGRAM_LINK}`
    );
    return;
  }

  if (actionId === "menu_buy" || normalizedText === "buy") {
    session.step = "await_event";
    await sendText(
      from,
      `Which event do you want?\n${getEventListText()}\n\nReply with the event id (e.g., "tradout").`
    );
    return;
  }

  if (session.step === "await_event") {
    const event = text ? findEventByInput(text) : null;
    if (!event) {
      await sendText(
        from,
        `Sorry, I couldn't find that event. Reply with one of these ids:\n${getEventListText()}`
      );
      return;
    }

    session.eventId = event.id;
    session.step = "await_quantity";
    await sendText(
      from,
      `How many tickets for ${event.name}? Reply with a number.`
    );
    return;
  }

  if (session.step === "await_quantity") {
    const quantity = Number.parseInt(normalizedText, 10);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      await sendText(from, "Please reply with a valid ticket quantity.");
      return;
    }

    session.quantity = quantity;
    session.step = "await_name";
    await sendText(from, "What is your full name?");
    return;
  }

  if (session.step === "await_name") {
    if (!text || text.trim().length < 2) {
      await sendText(from, "Please reply with your full name.");
      return;
    }

    session.fullName = text.trim();
    session.step = "await_email";
    await sendText(from, "What is your email address?");
    return;
  }

  if (session.step === "await_email") {
    if (!text || !isValidEmail(text)) {
      await sendText(from, "Please reply with a valid email address.");
      return;
    }

    session.email = text.trim();
    session.step = "await_phone";
    await sendText(from, 'Phone number? Reply "skip" to continue without.');
    return;
  }

  if (session.step === "await_phone") {
    const phone = normalizedText === "skip" ? "" : text?.trim() || "";
    session.phone = phone;

    const event = session.eventId ? getEventById(session.eventId) : undefined;
    if (!event || !session.quantity || !session.fullName || !session.email) {
      resetSession(from);
      await sendText(from, "Something went wrong. Please type 'buy' to restart.");
      return;
    }

    try {
      const amountNaira = event.priceNaira * session.quantity;
      const createdAtISO = new Date().toISOString();
      const paymentUrl = await createPaystackPayment({
        email: session.email,
        amountNaira,
        metadata: {
          type: "ticket",
          createdAtISO,
          eventId: event.id,
          eventName: event.name,
          eventDate: event.dateLabel ?? "",
          eventTime: event.timeLabel ?? "",
          eventVenue: event.venueLabel ?? "",
          unitPriceNaira: event.priceNaira,
          quantity: session.quantity,
          amountNaira,
          currency: event.currency,
          attendee: {
            fullName: session.fullName,
            email: session.email,
            phone: session.phone || null,
          },
        },
      });

      await sendText(
        from,
        `Great! Here is your payment link:\n${paymentUrl}\n\nAfter payment, your ticket will be confirmed.`
      );
      await sendText(
        from,
        `Need more info? Join our Telegram community:\n${TELEGRAM_LINK}`
      );
    } catch (error) {
      console.error("Paystack init error", error);
      await sendText(
        from,
        "Payment setup failed. Please try again in a few minutes."
      );
    } finally {
      resetSession(from);
    }

    return;
  }

  await sendMenu(from);
});

app.post("/api/paystack/webhook", async (req, res) => {
  if (!PAYSTACK_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    res.status(500).json({ error: "Missing server env vars" });
    return;
  }

  const rawBody = (req as any).rawBody as string | undefined;
  if (!rawBody) {
    res.status(400).json({ error: "Missing raw body" });
    return;
  }

  const signature = req.headers["x-paystack-signature"];
  const expected = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
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

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const reference = String(data?.reference ?? "");
  const amountNaira = Math.round((data?.amount ?? 0) / 100);
  const quantity = Number(metadata?.quantity ?? 1);

  const row = {
    reference,
    created_at_iso: metadata?.createdAtISO ?? new Date().toISOString(),
    event_id: String(metadata?.eventId ?? ""),
    event_name: String(metadata?.eventName ?? ""),
    event_date: metadata?.eventDate ?? null,
    event_time: metadata?.eventTime ?? null,
    event_venue: metadata?.eventVenue ?? null,
    currency: String(data?.currency ?? metadata?.currency ?? "NGN"),
    unit_price_naira: Number(metadata?.unitPriceNaira ?? 0),
    quantity,
    amount_naira: Number(metadata?.amountNaira ?? amountNaira),
    attendee_full_name: String(metadata?.attendee?.fullName ?? ""),
    attendee_email: String(metadata?.attendee?.email ?? ""),
    attendee_phone: metadata?.attendee?.phone ?? null,
  };

  const { error } = await supabase
    .from("ticket_guests")
    .upsert(row, { onConflict: "reference" });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ ok: true });
});

app.get("/api/events", (_req, res) => {
  res.status(200).json({ events: EVENTS });
});

const port = Number(process.env.PORT || 5050);
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
