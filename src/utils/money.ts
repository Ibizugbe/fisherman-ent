export function parseNGNPrice(price: string): number {
  // "NGN 20,000" -> 20000
  const digits = price.replace(/[^\d]/g, "");
  const naira = Number(digits || 0);
  return Number.isFinite(naira) ? naira : 0;
}

export function toKobo(naira: number): number {
  return Math.round(naira * 100);
}
