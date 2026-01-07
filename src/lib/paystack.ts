import Paystack from "@paystack/inline-js";

type Args = {
  key: string;
  email: string;
  amount: number; // kobo
  reference: string;
  metadata?: Record<string, any>;
  phone?: string;
  onSuccess: (trx: any) => void;
  onCancel?: () => void;
  onError?: (err: any) => void;
};

export function startPaystackPayment({
  key,
  email,
  amount,
  reference,
  metadata,
  phone,
  onSuccess,
  onCancel,
  onError,
}: Args) {
  const popup = new Paystack();
  popup.newTransaction({
    key,
    email,
    amount,
    reference,
    phone,
    metadata,
    onSuccess,
    onCancel: onCancel || (() => {}),
    onError: onError || (() => {}),
  });
}
