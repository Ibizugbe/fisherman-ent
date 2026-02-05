export type MerchProduct = {
  id: number;
  name: string;
  price: string; // e.g. "NGN 20,000"
  image: string;
  images?: string[];
  colours?: string[];
  material?: string;
  rating?: number;
  reviews?: number;
  warrantyMonths?: number;
  deliveryLabel?: string;
};

export type DeliveryInfo = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
};

export type CustomerInfo = {
  email: string;
  phone: string;
  fullName: string;
};

export type OrderItem = {
  productId: number;
  name: string;
  image: string;
  unitPriceLabel: string; // "NGN 20,000"
  unitPriceNaira: number; // 20000
  qty: number;
  selectedColour: string;
  selectedSize: string;
};

export type MerchOrder = {
  reference: string;
  createdAtISO: string;

  currency: "NGN";
  amountNaira: number;

  customer: CustomerInfo;
  delivery: DeliveryInfo;
  items: OrderItem[];

  emailStatus?: {
    admin?: "pending" | "sent" | "failed";
    customer?: "pending" | "sent" | "failed";
    lastError?: string;
    lastSentAtISO?: string;
  };
};
