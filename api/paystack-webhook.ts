import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

type PaystackEvent = {
  event: string;
  data?: {
    reference?: string;
    amount?: number;
    currency?: string;
    metadata?: Record<string, any>;
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

  let payload: PaystackEvent | null = null;
  try {
    payload = JSON.parse(rawBody);
  } catch (e) {
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
}
