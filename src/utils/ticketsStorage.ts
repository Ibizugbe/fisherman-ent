import type { TicketOrder } from "../types/tickets";

const KEY = "tickets:orders";

export function getTicketOrders(): TicketOrder[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as TicketOrder[];
  } catch {
    return [];
  }
}

export function saveTicketOrder(order: TicketOrder) {
  const existing = getTicketOrders();
  localStorage.setItem(KEY, JSON.stringify([order, ...existing]));
}

export function getTicketOrderByReference(
  reference: string
): TicketOrder | null {
  return getTicketOrders().find((o) => o.reference === reference) || null;
}

export function updateTicketOrder(
  reference: string,
  patch: Partial<TicketOrder>
) {
  const orders = getTicketOrders();
  const updated = orders.map((o) =>
    o.reference === reference ? { ...o, ...patch } : o
  );
  localStorage.setItem(KEY, JSON.stringify(updated));
}
