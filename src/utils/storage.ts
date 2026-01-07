import type { MerchOrder } from "../types/merch";

const KEY = "merch:orders";

export function getOrders(): MerchOrder[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order: MerchOrder) {
  const existing = getOrders();
  localStorage.setItem(KEY, JSON.stringify([order, ...existing]));
}

export function updateOrder(reference: string, patch: Partial<MerchOrder>) {
  const orders = getOrders();
  const updated = orders.map((o) =>
    o.reference === reference ? { ...o, ...patch } : o
  );
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getOrderByReference(reference: string): MerchOrder | null {
  const orders = getOrders();
  return orders.find((o) => o.reference === reference) || null;
}
