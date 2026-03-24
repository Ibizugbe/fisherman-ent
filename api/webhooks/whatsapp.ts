import { createClient } from "@supabase/supabase-js";
import { EVENTS, getEventById } from "../../shared/events";

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
  };
};

const {
  WHATSAPP_VERIFY_TOKEN,
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  PAYSTACK_SECRET_KEY,
  PUBLIC_SITE_URL,
  TELEGRAM_URL,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} = process.env;

const TELEGRAM_LINK = TELEGRAM_URL || "https://t.me/fishermanent";

const normalize = (value: string) => value.trim().toLowerCase();

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

const SESSION_TABLE = "whatsapp_sessions";

const toSessionRow = (from: string, session: Session) => ({
  phone: from,
  step: session.step,
  event_id: session.eventId ?? null,
  quantity: session.quantity ?? null,
  full_name: session.fullName ?? null,
  email: session.email ?? null,
  phone_number: session.phone ?? null,
  updated_at: new Date().toISOString(),
});

const fromSessionRow = (row: any): Session => ({
  step: (row?.step as SessionStep) ?? "idle",
  eventId: row?.event_id ?? undefined,
  quantity: row?.quantity ?? undefined,
  fullName: row?.full_name ?? undefined,
  email: row?.email ?? undefined,
  phone: row?.phone_number ?? undefined,
});

const getOrCreateSession = async (from: string): Promise<Session> => {
  if (!supabase) return { step: "idle" };
  const { data, error } = await supabase
    .from(SESSION_TABLE)
    .select("*")
    .eq("phone", from)
    .maybeSingle();
  if (error) {
    console.error("Session read failed:", error.message);
    return { step: "idle" };
  }
  if (!data) {
    const created: Session = { step: "idle" };
    await supabase.from(SESSION_TABLE).upsert(toSessionRow(from, created), {
      onConflict: "phone",
    });
    return created;
  }
  return fromSessionRow(data);
};

const saveSession = async (from: string, session: Session) => {
  if (!supabase) return;
  const { error } = await supabase
    .from(SESSION_TABLE)
    .upsert(toSessionRow(from, session), { onConflict: "phone" });
  if (error) {
    console.error("Session save failed:", error.message);
  }
};

const resetSession = async (from: string) => {
  const session: Session = { step: "idle" };
  await saveSession(from, session);
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

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
      res.status(200).send(challenge);
      return;
    }

    res.sendStatus(403);
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.sendStatus(200);

  const entry = req.body?.entry?.[0];
  const change = entry?.changes?.[0];
  const message = change?.value?.messages?.[0];
  const from = message?.from;

  if (!from) return;

  const session = await getOrCreateSession(from);
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
    await resetSession(from);
    await sendMenu(from);
    return;
  }

  if (actionId === "menu_events" || normalizedText === "events") {
    await resetSession(from);
    await sendText(
      from,
      `Upcoming events:\n${getEventListText()}\n\nReply "buy" to purchase a ticket.`
    );
    return;
  }

  if (actionId === "menu_telegram" || normalizedText.includes("telegram")) {
    await resetSession(from);
    await sendText(
      from,
      `Join our Telegram community for more info and updates:\n${TELEGRAM_LINK}`
    );
    return;
  }

  if (actionId === "menu_buy" || normalizedText === "buy") {
    session.step = "await_event";
    await saveSession(from, session);
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
    await saveSession(from, session);
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
    await saveSession(from, session);
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
    await saveSession(from, session);
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
    await saveSession(from, session);
    await sendText(from, 'Phone number? Reply "skip" to continue without.');
    return;
  }

  if (session.step === "await_phone") {
    const phone = normalizedText === "skip" ? "" : text?.trim() || "";
    session.phone = phone;
    await saveSession(from, session);

    const event = session.eventId ? getEventById(session.eventId) : undefined;
    if (!event || !session.quantity || !session.fullName || !session.email) {
      await resetSession(from);
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
      await resetSession(from);
    }

    return;
  }

  await sendMenu(from);
}
